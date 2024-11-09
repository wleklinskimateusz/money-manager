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
import { logout } from "@/features/authentication/actions/logout";
import { getSharedTranslation } from "@/locale/get-shared-translation";
import type { Locale } from "@/locale/locale";
import { LocaleSwitcher } from "./locale-switcher";

export async function AppSidebar({ lang }: { lang: Locale }) {
  const { sidebar } = await getSharedTranslation(lang);
  const items = [
    {
      title: sidebar.items.dashboard,
      url: "/",
      icon: Home,
    },
    {
      title: sidebar.items.bonds,
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
                    <Link href={`/${lang}${item.url}`}>
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
        <LocaleSwitcher
          currentLocale={lang}
          label={sidebar.localeSwitcher.label}
          placeholder={sidebar.localeSwitcher.placeholder}
        />
        <Button type="button" variant="destructive" onClick={logout}>
          {sidebar.logout}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
