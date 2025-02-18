import { Metadata } from "next";
import { BudgetPage } from "@/features/budget/components/BudgetPage";
import type { Locale } from "@/locale/locale";

export const metadata: Metadata = {
  title: "Budget Management",
};

export default async function Budget({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <BudgetPage lang={lang} />;
}
