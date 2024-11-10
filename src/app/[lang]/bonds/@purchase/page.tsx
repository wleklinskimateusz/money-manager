import { PurchasePage } from "@/features/bonds/components/PurchasePage";
import type { Locale } from "@/locale/locale";

export default async function AddBondPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <PurchasePage lang={lang} />;
}
