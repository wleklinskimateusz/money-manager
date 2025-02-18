import { Home } from "lucide-react";

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
import { getSharedTranslation } from "@/locale/get-shared-translation";
import type { Locale } from "@/locale/locale";
import { LocaleSwitcher } from "./locale-switcher";
import { SidebarLink } from "./sidebar-link";
import { navigation } from "@/navigation/url";
import { LogoutButton } from "@/features/authentication/components/LogoutButton";

export async function AppSidebar({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const {
    sidebar: {
      items: { dashboard },
      localeSwitcher,
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
        {children}
      </SidebarContent>
      <SidebarFooter>
        <LocaleSwitcher
          currentLocale={lang}
          label={localeSwitcher.label}
          placeholder={localeSwitcher.placeholder}
        />
        <LogoutButton lang={lang} />
      </SidebarFooter>
    </Sidebar>
  );
}
