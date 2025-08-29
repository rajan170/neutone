"use client";

import { Music } from "lucide-react";
import { Card } from "~/components/ui/card";
import { usePlayerStore } from "~/stores/use-player-store";


export default function SoundBar() {
  const { track } = usePlayerStore();
  return (
    <div className="px-2 pb-2 ">
    <Card className="bg-background/60 relative w-full shrink-0 border-t px-4 backdrop-blur">
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex px-2 h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-pink-500">
              {track?.artwork ? (
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <Music className="h-5 w-5 text-white" />
              )}
            </div>
            <div className="max-w-24 min-w-0 flex-1 md:max-w-full">
                <p className="truncate text-sm font-medium">
                    {track?.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                    {track?.author}
                </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}
