"use client";

import { type Song } from "@prisma/client";
import { Heart, Loader2, Music, Music2, Play } from "lucide-react";
import { useState } from "react";
import { getPlayUrl } from "~/actions/generate";
import { toggleLikeSong } from "~/actions/song";
import { usePlayerStore } from "~/stores/use-player-store";

export type SongWithRelations = Song & {
  user: { name: string | null };
  _count: {
    likes: number;
  };
  categories: { name: string }[];
  thumbnailUrl?: string | null;
};

export function SongCard({ song }: { song: SongWithRelations }) {
  const [isLoading, setIsLoading] = useState(false);
  const setTrack = usePlayerStore((state) => state.setTrack);
  const [isLiked, setIsLiked] = useState(song._count.likes > 0 ? true : false);
  const [likesCount, setLikesCount] = useState(song._count.likes);

  const handlePlay = async () => {
    setIsLoading(true);
    const playUrl = await getPlayUrl(song.id);

    setTrack({
      id: song.id,
      title: song.title,
      artwork: song.thumbnailUrl,
      url: playUrl,
      prompt: song.prompt!,
      author: song.user.name!,
    });

    setIsLoading(false);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    await toggleLikeSong(song.id);
  };

  return (
    <div
      onClick={handlePlay}
      className="cursor-pointer rounded-lg border border-gray-400 p-2 shadow-md transition-shadow duration-300 group-hover:shadow-lg hover:shadow-lg"
    >
      <div className="group relative aspect-square overflow-hidden rounded-md bg-gray-200 transition-opacity duration-300 group-hover:opacity-75">
        {song.thumbnailUrl ? (
          <img
            className="h-full w-full object-cover object-center"
            alt={song.title}
            src={song.thumbnailUrl}
          />
        ) : (
          <div className="bg-muted flex h-full w-full items-center justify-center">
            <Music className="text-muted-foreground h-12 w-12" />
          </div>
        )}

        {/* Loader */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-70">
          <div className="tramsition-transform flex h-12 w-12 items-center justify-center rounded-full bg-black/60 group-hover:scale-110">
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : (
              <Play className="h-6 w-6 fill-white text-white" />
            )}
          </div>
        </div>
      </div>
      <h3 className="mt-2 truncate text-sm font-medium text-gray-900">
        {song.title}
      </h3>
      <p className="text-xs text-gray-900">Author: {song.user.name}</p>

      <div className="flex items-center justify-between">
        <div className="mt-1 flex items-center">
          <Music2 className="h-3 w-3 font-bold" />
          <span className="text-muted-foreground text-xs font-semibold">
            {song.listenCount} views
          </span>
        </div>

        <button
          className="border-black-900 flex cursor-pointer items-center gap-1 rounded-md border p-2 transition-shadow duration-300 hover:shadow-md"
          onClick={handleLike}
        >
          <Heart
            className="h-4 w-4 text-red-500"
            fill={isLiked ? "currentColor" : "none"}
          />
          <span className="text-xs">{likesCount} likes</span>
        </button>
      </div>
    </div>
  );
}
