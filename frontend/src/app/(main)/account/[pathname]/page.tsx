import { AccountView } from "@daveyplate/better-auth-ui"
import { accountViewPaths } from "@daveyplate/better-auth-ui/server"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(accountViewPaths).map((pathname) => ({ pathname }))
}

export default async function AccountPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params
    
    return <AccountView pathname={pathname} />
}
