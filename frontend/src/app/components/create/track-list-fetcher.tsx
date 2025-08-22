"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { getPresignedUrl } from "~/actions/generate";

export default async function TrackListFetcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session){
    redirect("/auth/sign-in");
  }
  const songs = await db.song.findMany({
    where: {
        userId: session?.user?.id,
    },
    include:{
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
        createdAt: "desc",
    }
  });

  const songsWithThumbnail = await Promise.all(
    songs.map(async (song) => {
        const thumbnailUrl = song.thumbnail_s3_key ? getPresignedUrl(song.thumbnail_s3_key) :null;
        
        return{
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
            

        }
    })
  )

  return (<p>Loaded Tracks</p>);
}
