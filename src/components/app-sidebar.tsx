import { Home, Plus, Sigma } from "lucide-react";

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
  const {
    sidebar: {
      items: { dashboard, bonds },
      localeSwitcher,
      logout: logoutText,
    },
  } = await getSharedTranslation(lang);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{dashboard}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarLink href={navigation.dashboard}>
                  <Home />
                  <span>{dashboard}</span>
                </SidebarLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{bonds.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarLink href={navigation.bonds}>
                  <Sigma />
                  <span>{bonds.title}</span>
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink href={navigation.bondsAddPurchase}>
                  <Plus />
                  <span>{bonds.addPurchase}</span>
                </SidebarLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LocaleSwitcher
          currentLocale={lang}
          label={localeSwitcher.label}
          placeholder={localeSwitcher.placeholder}
        />
        <Button type="button" variant="destructive" onClick={logout}>
          {logoutText}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
