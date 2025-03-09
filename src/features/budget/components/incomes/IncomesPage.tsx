import { getBudgetTranslation } from "../../locale/get-budget-translation";
import { getIncomes } from "../../actions/get-incomes";
import { IncomesList } from "./IncomesList";
import { YearSelector } from "./YearSelector";
import type { Locale } from "@/locale/locale";

export async function IncomesPage({
  lang,
  year,
}: {
  lang: Locale;
  year: string | undefined;
}) {
  const translation = await getBudgetTranslation(lang);

  const incomes = await getIncomes(
    year ? Number(year) : new Date().getFullYear(),
  );

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">{translation.incomes.title}</h1>
      <YearSelector translation={translation.incomes} />
      <IncomesList translation={translation.incomes} incomes={incomes} />
    </div>
  );
}
