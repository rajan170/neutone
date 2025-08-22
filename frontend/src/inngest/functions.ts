import { db } from "~/server/db";
import { inngest } from "./client";
import { z } from "zod";
import type { PrismaClient } from "@prisma/client";
import { env } from "~/env";

const generateSongSchema = z.object({
    songId: z.string(),
    userId: z.string(),
})

export const generateSong = inngest.createFunction(
    {
        id: "generate-song",
        concurrency: { limit: 1, key: "event.data.userId" },
        onFailure: async ({ event, error }) => {
            // Best-effort extraction of songId
            const songId = (event as unknown as { data?: { songId?: string } })?.data?.songId;
            if (songId) {
                return await db.song.update({
                    where: { id: songId },
                    data: { status: "failed" },
                });
            }
        },
    },

    { event: "generate-song-event" },
    async ({ event, step }) => {
        const { songId } = generateSongSchema.parse(event.data)

        const { userId, credits, endpoint, body } = await step.run("check-credits", async () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const song = await (db as PrismaClient).song.findUniqueOrThrow({
                where: {
                    id: songId
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            credits: true,
                        }
                    },
                    prompt: true,
                    lyrics: true,
                    fullDescribedSong: true,
                    describedLyrics: true,
                    instrumental: true,
                    guidanceScale: true,
                    inferStep: true,
                    audioDuration: true,
                    seed: true,
                },
            });

            type RequestBody = {
                guidance_scale?: number;
                infer_step?: number;
                audio_duration?: number;
                seed?: number;
                prompt?: string;
                lyrics?: string;
                full_described_song?: string;
                described_lyrics?: string;
                instrumental?: boolean;
            }

            let body: RequestBody = {}

            let endpoint = ""

            const commonParams = {
                guidanceScale: song.guidanceScale ?? undefined,
                inferStep: song.inferStep ?? undefined,
                audioDuration: song.audioDuration ?? undefined,
                seed: song.seed ?? undefined,
                instrumental: song.instrumental ?? undefined,
            };

            //Description of a Song
            if (song.fullDescribedSong) {
                endpoint = String(env.GENERATE_FROM_DESCRIPTION_ENDPOINT);
                body = {
                    full_described_song: song.fullDescribedSong,
                    ...commonParams,
                };
            }
            //Custom mode: prompt + described lyrics
            else if (song.lyrics && song.prompt) {
                endpoint = String(env.GENERATE_FROM_LYRICS_ENDPOINT);
                body = {
                    lyrics: song.lyrics,
                    prompt: song.prompt,
                    ...commonParams
                };
            }
            //Custom mode: prompt + lyrics
            else if (song.describedLyrics && song.prompt) {
                endpoint = String(env.GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT);
                body = {
                    described_lyrics: song.describedLyrics,
                    prompt: song.prompt,
                    ...commonParams
                };
            }

            return {
                userId: song.user.id,
                credits: song.user.credits,
                endpoint: endpoint,
                body: body,
            }
        })
        if (credits > 0) {
            //Generate song
            await step.run("set-status-processing", async () => {
                return await db.song.update({
                    where: {
                        id: songId,
                    },
                    data: {
                        status: "processing",
                    },
                })
            });

            const response = await step.fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Modal-Key": env.MODAL_KEY,
                    "Modal-Secret": env.MODAL_SECRET,
                }
            });



            await step.run("update-song-result", async () => {
                const responseData = response.ok ? ((await response.json()) as {
                    s3_key?: string;
                    cover_img_s3_key?: string;
                    categories?: string[];
                }) : null;

                await db.song.update({
                    where: {
                        id: songId,
                    }, data: {
                        s3key: responseData?.s3_key ?? null,
                        thumbnail_s3_key: responseData?.cover_img_s3_key ?? null,
                        status: response.ok ? "processed" : "failed",
                    }
                });

                if (responseData?.categories && responseData.categories.length > 0) {
                    await db.song.update({
                        where: { id: songId },
                        data: {
                            categories: {
                                connectOrCreate: responseData.categories.map((categoryName) => ({
                                    where: { name: categoryName },
                                    create: { name: categoryName },
                                }),
                                ),
                            }
                        },

                    })
                }
            });


            return await step.run("deduct-user-credits", async () => {
                if (!response.ok) {
                    return;
                }

                return await db.user.update({
                    where: { id: userId },
                    data: {
                        credits: {
                            decrement: 10,
                        }
                    }
                })
            })
        } else {
            //Not enough credits
            await step.run("set-status-no-credits", async () => {
                return await db.song.update({
                    where: {
                        id: songId
                    },
                    data: {
                        status: "no-credits",
                    },
                });
            });
        }
    },
);