"use server"

import { headers } from "next/headers"
import { auth } from "~/lib/auth"
import { db } from "~/server/db";
import { Coins } from "lucide-react";

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
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors duration-200">
            <Coins className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-baseline gap-1">
                <span className="font-semibold text-foreground text-sm">{user.credits}</span>
                <span className="text-muted-foreground text-xs">Credits</span>
            </div>
        </div>
    )
}
