"use server"

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { inngest } from "~/inngest/client";
import { auth } from "~/lib/auth"
import { db } from "~/server/db";


export async function queueSong() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) redirect("/auth/sign-in");

        const song = await db.song.create({
            data: {
                userId: session.user.id,
                title: "Test Song-1",
                fullDescribedSong: "A song about a cat's life in the city",
            },
        });

        await inngest.send({
            name: "generate-song-event",
            data: {
                songId: song.id,
                userId: song.userId,
            }
        });

        console.log("Event sent successfully");
    } catch (error) {
        console.error(error);
    }
}