import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "~/lib/auth"
// import { AuthView } from "./view"

// Use Node.js runtime for full better-auth compatibility with Polar plugins
export const runtime = "nodejs"

export const dynamicParams = false

export default async function AuthPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params
    const session = await auth.api.getSession({ headers: await headers() })
    if (session && (pathname === "sign-in" || pathname === "sign-up")) {
        redirect("/")
    }
    
    return <AuthView pathname={pathname} />
}