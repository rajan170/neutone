import { AccountViewClient } from "./view"
import { accountViewPaths } from "@daveyplate/better-auth-ui/server"

// Use Edge runtime for Cloudflare Pages compatibility
export const runtime = "edge"

export const dynamicParams = false

export default async function AccountPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params
    
    return <AccountViewClient pathname={pathname} />
}
