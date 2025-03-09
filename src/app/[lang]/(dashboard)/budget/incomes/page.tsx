import { Metadata } from "next";
import { IncomesPage } from "@/features/budget/components/incomes/IncomesPage";
import type { Locale } from "@/locale/locale";

export const metadata: Metadata = {
  title: "Income History",
};

export default async function Incomes({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ year: string }>;
}) {
  const { lang } = await params;
  const { year } = await searchParams;
  return <IncomesPage lang={lang} year={year} />;
}
