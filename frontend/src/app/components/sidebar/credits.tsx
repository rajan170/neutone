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
        <div className="group relative overflow-hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-50/80 via-green-50/60 to-teal-50/80 border border-emerald-200/40 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] dark:from-emerald-950/40 dark:via-green-950/30 dark:to-teal-950/40 dark:border-emerald-700/40 dark:hover:border-emerald-600/60">
            <div className="relative">
                <Coins className="w-4 h-4 text-emerald-600 drop-shadow-sm group-hover:text-emerald-500 transition-colors duration-300 dark:text-emerald-400" />
            </div>

            <div className="relative flex items-baseline gap-1">
                <span className="font-bold text-emerald-900 text-sm drop-shadow-sm group-hover:text-emerald-800 transition-colors duration-300 dark:text-emerald-100">
                    {user.credits}
                </span>
                <span className="text-emerald-700/80 text-xs font-medium group-hover:text-emerald-600/90 transition-colors duration-300 dark:text-emerald-300/80">
                    Credits
                </span>
            </div>
        </div>
    )
}
