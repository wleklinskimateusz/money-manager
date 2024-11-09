import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Locale } from "@/locale/locale";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang = "en" } = await params;
  return (
    <SidebarProvider>
      <AppSidebar lang={lang} />
      <main className="relative">
        <SidebarTrigger className="absolute left-4 top-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}
