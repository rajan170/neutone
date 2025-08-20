"use client";

import { Button } from "~/components/ui/button";
import { Zap } from "lucide-react";

export default function Upgrade() {
    return (
        <Button 
            variant="outline" 
            size="sm" 
            className="px-3 py-2 h-auto bg-gradient-to-r from-slate-900 to-black text-white border-0 hover:from-slate-800 hover:to-slate-900 transition-all duration-300 font-semibold rounded-lg text-sm shadow-md hover:shadow-lg hover:text-white hover:scale-[1.02]"
        >
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            Upgrade
        </Button>
    );
}
