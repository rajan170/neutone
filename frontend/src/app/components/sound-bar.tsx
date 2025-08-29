"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Download, MoreHorizontal, Music, Pause, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { usePlayerStore } from "~/stores/use-player-store";

export default function SoundBar() {
  const { track } = usePlayerStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(()=>{
    const audio = audioRef.current;
    if (!audio) return;
  },[track])


  useEffect(() => {
    if (audioRef.current && track?.url) {
      setCurrentTime(0);
      setDuration(0);

      audioRef.current.src = track.url;
      audioRef.current.load()

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined){
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error("Failed to play audio", error);
          setIsPlaying(false);
        })
      } else {
        setIsPlaying(true);
      }
    }
  },[track])

  const formatTime = (time: number) =>{
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const togglePlay = () => {
    if (!track?.url || !audioRef.current) return;

    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  const handleSeek = (value: number[]) => {
    if (!track?.url) return;
    const next = value?.[0] ?? 0;
    if (audioRef.current){
      audioRef.current.currentTime = next;
    }
    setCurrentTime(next);
  }

  return (
    <div className="px-2 pb-2">
      <Card className="bg-background/60 relative w-full shrink-0 border-t px-4 backdrop-blur">
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-purple-500 to-pink-500">
                {track?.artwork ? (
                  <Image
                    src={track.artwork}
                    alt={track.title}
                    fill
                    sizes="40px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Music className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="max-w-24 min-w-0 flex-1 md:max-w-full">
                <p className="truncate text-sm font-medium">{track?.title}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {track?.author}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={volume}
                  max={100}
                  min={0}
                  step={5}
                  onValueChange={setVolume}
                  className="w-16"
                />
              </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-muted/60" aria-label="More options">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={6} className="min-w-36">
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        disabled={!track?.url}
                        onClick={() => {
                          if (!track?.url) return;
                          window.open(track?.url, "_blank");
                        }}
                       >
                        <Download className="font-semibold h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
          </div>

          {/* Track Seeker */}
          <div className="flex items-center gap-1">
            <span className="w-8 text-right text-[10px] text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              min={0}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="w-8 text-left text-[10px] text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>
          {
            track?.url &&(
              <audio src={track?.url} ref={audioRef} preload="metadata"/>
            )
          }
      </Card>
    </div>
  );
}
