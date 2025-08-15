import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({headers: await headers()})
  
  if (!session){
    redirect("/auth/sign-in")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-600">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-white">Neutone Dashboard</span>
        </h1>
        <p className="text-xl text-white">
          Your music generation platform
        </p>
      </div>
    </main>
  );
}
