import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Locale } from "@/locale/locale";

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
      <AppSidebar lang={lang} />
      <main className="relative w-full">
        <SidebarTrigger className="absolute left-4 top-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}
