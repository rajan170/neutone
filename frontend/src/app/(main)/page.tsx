import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";


export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div></div>
  );
}
