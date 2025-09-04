import { AccountViewClient } from "./view"
import { accountViewPaths } from "@daveyplate/better-auth-ui/server"

// Use Node.js runtime for full better-auth compatibility with Polar plugins
export const runtime = "nodejs"

export const dynamicParams = false

export default async function AccountPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params
    
    return <AccountViewClient pathname={pathname} />
}
