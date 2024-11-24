import { LoginPage } from "@/features/authentication/components/LoginPage";
import type { Locale } from "@/locale/locale";

export default async function Login({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <LoginPage lang={lang} />;
}
