import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Locale } from "@/locale/locale";
import { BondsNavItem } from "@/features/bonds/components/BondsNavItem";
import { BudgetNavItem } from "@/features/budget/components/BudgetNavItem";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <SidebarProvider>
      <AppSidebar lang={lang}>
        <BudgetNavItem lang={lang} />
        <BondsNavItem lang={lang} />
      </AppSidebar>
      <main className="relative w-full">
        <SidebarTrigger className="absolute left-4 top-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}
