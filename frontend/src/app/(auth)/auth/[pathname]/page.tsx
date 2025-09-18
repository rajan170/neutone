import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "~/lib/auth"
// import { AuthView } from "./view"
import SignOutClient from "../sign-out-client"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(authViewPaths).map((pathname) => ({ pathname }))
}

export default async function AuthPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params
    const session = await auth.api.getSession({ headers: await headers() })
    if (session && (pathname === "sign-in" || pathname === "sign-up")) {
        redirect("/")
    }

    if (pathname === "sign-out") {
        return <SignOutClient />
    }

    return <AuthView pathname={pathname} />
}
