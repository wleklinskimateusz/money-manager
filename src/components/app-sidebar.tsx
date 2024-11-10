import { Home, Sigma } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { logout } from "@/features/authentication/actions/logout";
import { getSharedTranslation } from "@/locale/get-shared-translation";
import type { Locale } from "@/locale/locale";
import { LocaleSwitcher } from "./locale-switcher";
import { SidebarLink } from "./sidebar-link";
import { navigation } from "@/navigation/url";

export async function AppSidebar({ lang }: { lang: Locale }) {
  const { sidebar } = await getSharedTranslation(lang);
  const items = [
    {
      title: sidebar.items.dashboard,
      url: navigation.dashboard,
      icon: Home,
    },
    {
      title: sidebar.items.bonds,
      url: navigation.bonds,
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
                  <SidebarLink href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarLink>
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
