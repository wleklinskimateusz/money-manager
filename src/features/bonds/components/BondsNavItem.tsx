import { Plus } from "lucide-react";

import { SidebarLink } from "@/components/sidebar-link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigation } from "@/navigation/url";
import { Sigma } from "lucide-react";
import { getBondsTranslation } from "../locale/get-bonds-translation";
import { Locale } from "@/locale/locale";

export async function BondsNavItem({ lang }: { lang: Locale }) {
  const { bonds, purchaseBond } = await getBondsTranslation(lang);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{bonds}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarLink href={navigation.bonds}>
              <Sigma />
              <span>{bonds}</span>
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink href={navigation.bondsAddPurchase}>
              <Plus />
              <span>{purchaseBond}</span>
            </SidebarLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
