"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

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
        const thumbnailUrl = song.thumbnail_s3_key ? true :null;
    })
  )

  return (<p>Loaded Tracks</p>);
}
