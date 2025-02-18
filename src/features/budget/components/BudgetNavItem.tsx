import { Wallet } from "lucide-react";

import { SidebarLink } from "@/components/sidebar-link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigation } from "@/navigation/url";
import { getBudgetTranslation } from "../locale/get-budget-translation";
import { Locale } from "@/locale/locale";

export async function BudgetNavItem({ lang }: { lang: Locale }) {
  const { title } = await getBudgetTranslation(lang);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarLink href={navigation.budget}>
              <Wallet />
              <span>{title}</span>
            </SidebarLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
