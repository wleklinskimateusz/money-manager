import { Toaster } from "@/components/ui/sonner";

import { Locale } from "@/locale/locale";
import "./globals.css";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang = "en" } = await params;
  return (
    <html lang={lang}>
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
