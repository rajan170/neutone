import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardRedirect from "~/app/components/dashboard-redirect";

// Use Edge runtime for Cloudflare Pages compatibility
export const runtime = "edge"


export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <DashboardRedirect />;
}
