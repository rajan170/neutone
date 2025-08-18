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



export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-black text-3xl mt-7 mb-10 flex flex-col items-center justify-center px-2 tracking-widest uppercase font-inter">
            <p>
              Neutone 
            </p> 
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-2 flex w-full items-center justify-center text-xs">
            <Credits />
        <Upgrade />

        </div>
        <UserButton variant="outline" 
        additionalLinks={
            [
                {label: "Dashboard", 
                href: "/customer-portal", 
                icon:<User/>,
                },
                ]}/>
       </SidebarFooter>
    </Sidebar>
  )
}