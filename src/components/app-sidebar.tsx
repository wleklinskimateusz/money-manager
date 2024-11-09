import { Home, Sigma } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { logout } from "@/server/auth/logout";
import { getDictionary } from "@/locale/dictionaries";
import { Locale } from "@/locale/locale";

export async function AppSidebar({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const items = [
    {
      title: dict.sidebar.items.dashboard,
      url: "/",
      icon: Home,
    },
    {
      title: dict.sidebar.items.bonds,
      url: "/bonds",
      icon: Sigma,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link locale={lang} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button type="button" variant="destructive" onClick={logout}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
