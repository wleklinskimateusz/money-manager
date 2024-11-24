import { BondsTable } from "@/features/bonds/components/BondsTable";
import { getUserBonds } from "@/features/bonds/drizzle/get-user-bonds";
import { getBondsTranslation } from "@/features/bonds/locale/get-bonds-translation";
import type { Locale } from "@/locale/locale";

const addMonths = (date: Date, months: number) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

const addYears = (date: Date, years: number) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

export default async function BondsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const { bonds: bondsTranslation } = await getBondsTranslation(lang);
  const bonds = await getUserBonds();

  const data = bonds.map((bond) => {
    const interestAmount = bond.amount * bond.interestRate;
    const costOfWithdrawal = Math.min(bond.costOfWithdrawal, interestAmount);
    return {
      seriesName: bond.seriesName,
      maturityDate:
        bond.lengthUnit === "months"
          ? addMonths(new Date(bond.purchaseDate), bond.length).getTime()
          : addYears(new Date(bond.purchaseDate), bond.length).getTime(),
      nominalValue: bond.amount,
      interestAmount,
      actualValue: bond.amount,
      interestRate: bond.interestRate,
      costOfWithdrawal,
      valueAfterCost: bond.amount - costOfWithdrawal,
    };
  });

  return (
    <div>
      <h1>{bondsTranslation}</h1>
      <BondsTable rows={data} />
    </div>
  );
}
