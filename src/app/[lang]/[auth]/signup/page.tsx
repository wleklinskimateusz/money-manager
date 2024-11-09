import type { Locale } from "@/locale/locale";
import { SignupPage } from "@/features/authentication/components/SignupPage";

export default async function Signup({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <SignupPage lang={lang} />;
}
