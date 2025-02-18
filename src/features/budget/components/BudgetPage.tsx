import { BudgetOverview } from "./BudgetOverview";
import { getBudgetTranslation } from "../locale/get-budget-translation";
import type { Locale } from "@/locale/locale";

export async function BudgetPage({ lang }: { lang: Locale }) {
  const translation = await getBudgetTranslation(lang);
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">{translation.title}</h1>
      <BudgetOverview translation={translation} />
    </div>
  );
}
