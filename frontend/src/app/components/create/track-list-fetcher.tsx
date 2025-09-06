"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { getPresignedUrl } from "~/actions/generate";
import TracksList from "./tracks-list";

export default async function TrackListFetcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  // Check if database is available (skip during build if DATABASE_URL is not set)
  if (!process.env.DATABASE_URL) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Database not available
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Database connection is not configured. Please check your environment variables.
        </p>
      </div>
    );
  }

  const songs = await db.song.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const songsWithThumbnail = await Promise.all(
    songs.map(async (song) => {
      const thumbnailUrl = song.thumbnail_s3_key
        ? await getPresignedUrl(song.thumbnail_s3_key)
        : null;

      return {
        id: song.id,
        title: song.title,
        createdAt: song.createdAt,
        prompt: song.prompt,
        instrumental: song.instrumental,
        lyrics: song.lyrics,
        describedLyrics: song.describedLyrics,
        fullDescribedSong: song.fullDescribedSong,
        thumbnailUrl,
        playUrl: null,
        status: song.status,
        createdByUserName: song.user.name,
        published: song.published,
      };
    }),
  );

  return <TracksList tracks={songsWithThumbnail} />;
}
