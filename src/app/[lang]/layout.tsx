import { Locale, locales } from "@/locale/locale";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
