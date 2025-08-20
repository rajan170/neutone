import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

import { SongPanel } from "~/app/components/create/song-panel";

export default async function HomePage() {
  const session = await auth.api.getSession({headers: await headers()})
  
  if (!session){
    redirect("/auth/sign-in")
  }

  return (
   <div className="flex lg:flex-row flex-col h-full">
    <SongPanel />
   </div>
  );
}
