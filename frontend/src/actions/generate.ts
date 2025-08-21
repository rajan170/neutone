"use server"

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { inngest } from "~/inngest/client";
import { auth } from "~/lib/auth"
import { db } from "~/server/db";


export interface GenerateRequest {
    prompt?: string;
    lyrics?: string;
    fullDescribedSong?: string;
    instrumental?: boolean;
    describedLyrics?: string;
}

export async function generateSong(generateRequest: GenerateRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/auth/sign-in");

    await queueSong(generateRequest, 7.5, session.user.id)
    await queueSong(generateRequest, 15, session.user.id)

    revalidatePath("/create");
}


export async function queueSong(generateRequest: GenerateRequest, guidanceScale: number, userId: string) {

    let title = "Untitled"
    if (generateRequest.describedLyrics) title = generateRequest.describedLyrics
    if (generateRequest.fullDescribedSong) title = generateRequest.fullDescribedSong

    title = title.charAt(0).toUpperCase() + title.slice(1)

    const song = await db.song.create({
        data: {
            userId: userId,
            title: title,
            prompt: generateRequest.prompt,
            lyrics: generateRequest.lyrics,
            fullDescribedSong: generateRequest.fullDescribedSong,
            instrumental: generateRequest.instrumental,
            describedLyrics: generateRequest.describedLyrics,
            guidanceScale: guidanceScale,
            audioDuration: 180,
        }
    })


    await inngest.send({
        name: "generate-song-event",
        data: {
            songId: song.id,
            userId: song.userId,
        }
    });
} 
