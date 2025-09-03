"use client";

import { Button } from "~/components/ui/button";
import { Zap } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { smallCreditsProductId, mediumCreditsProductId, largeCreditsProductId } from "~/lib/auth-constants";

export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
            products: [
                smallCreditsProductId,
                mediumCreditsProductId,
                largeCreditsProductId
            ]
        });
    }
    return (
        <Button
            variant="outline"
            onClick={upgrade}
            size="sm"
            className="group relative overflow-hidden px-2 py-2 h-auto text-black border-0 transition-all duration-300 font-semibold rounded-lg text-sm shadow-md hover:shadow-lg hover:text-black hover:scale-[1.02] bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 dark:from-amber-950/50 dark:to-yellow-950/50 dark:hover:from-amber-900/60 dark:hover:to-yellow-900/60"
        >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

            {/* Electric spark effects */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping" />
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping [animation-delay:200ms]" />

            <div className="relative flex items-center gap-2">
                {/* Enhanced Zap icon with glow effect */}
                <div className="relative">
                    <Zap className="w-4 h-4 text-yellow-500 drop-shadow-sm group-hover:text-yellow-400 transition-colors duration-300" />
                    {/* Glow ring */}
                    <div className="absolute inset-0 w-4 h-4 bg-yellow-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                </div>
                <span className="relative z-10">Upgrade</span>
            </div>
        </Button>
    );
}
