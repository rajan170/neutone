"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function setPublishedStatus(songId: string, published: boolean) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/sign-in")

    await db.song.update({
        where: {
            id: songId,
            userId: session.user.id,
        },
        data: {
            published
        }
    });

    // revalidate the create page
    revalidatePath("/create");
}

export async function renameSong(songId: string, newTitle: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/sign-in")

    await db.song.update({
        where: {
            id: songId,
            userId: session.user.id,
        },
        data: {
            title: newTitle.trim()
        }
    });

    // revalidate the create page
    revalidatePath("/create");
}