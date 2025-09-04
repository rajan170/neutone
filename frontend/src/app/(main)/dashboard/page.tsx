import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardRedirect from "~/app/components/dashboard-redirect";

// Use Node.js runtime for better-auth compatibility
export const runtime = "nodejs"


export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <DashboardRedirect />;
}
