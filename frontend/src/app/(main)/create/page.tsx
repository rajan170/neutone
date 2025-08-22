import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

import { SongPanel } from "~/app/components/create/song-panel";
import { Suspense } from "react";
import TrackListFetcher from "~/app/components/create/track-list-fetcher";
import { LoaderFive as Loader } from "~/components/ui/loader";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <SongPanel />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader text="Loading Tracks..."/>
          </div>
        }
      >
        <TrackListFetcher />
      </Suspense>
    </div>
  );
}
