"use server"

import { headers } from "next/headers"
import { auth } from "~/lib/auth"
import { db } from "~/server/db";

export async function Credits(){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) return null;

    const user = await db.user.findUniqueOrThrow({
        where: {id: session.user.id},
        select: {credits: true},
    });

    return (
        <>
            <p className="font-bold">{user.credits}</p>
            <span className="mx-1">/</span>
            <p className="font-semibold text-muted-foreground">Credits</p>
        </>
    )
}
