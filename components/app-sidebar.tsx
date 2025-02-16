import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Shield } from "lucide-react";
import AppSidebarUser from "./app-sidebar-user";
import { currentUserisAdmin } from "@/lib/auth/functions";
import { headers } from "next/headers";

export async function AppSidebar() {
  const isAdmin = await currentUserisAdmin(headers);
  const DefaultItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
  ];

  const AdminItems = [
    {
      title: "Admin",
      url: "/admin",
      icon: Shield,
    },
  ];

  const Items = isAdmin ? DefaultItems.concat(AdminItems) : DefaultItems;

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
