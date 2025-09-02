import {
Sidebar,
SidebarContent,
SidebarFooter,
SidebarGroup,
SidebarGroupContent,
SidebarGroupLabel,
SidebarMenu,
} from "~/components/ui/sidebar"
import SidebarMenuItems from "./sidebar-menu-items"
import { Credits } from "./credits"
import { UserButton } from "@daveyplate/better-auth-ui"
import { User } from "lucide-react"
import Upgrade from "./upgrade"
import Logo from "./logo"


export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-7 mb-10 flex items-center justify-center px-2">
            <Logo size={36} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-2 flex w-full items-center justify-center gap-3 text-xs">
            <Credits />
            <Upgrade />
        </div>
        <UserButton variant="outline" 
        additionalLinks={
            [
                {label: "Dashboard", 
                href: "/dashboard", 
                icon:<User/>,
                },
                ]}/>
       </SidebarFooter>
    </Sidebar>
  )
}