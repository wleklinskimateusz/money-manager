import {
  BondsTable,
  BondsTableRow,
} from "@/features/bonds/components/BondsTable";
import { getBondsTranslation } from "@/features/bonds/locale/get-bonds-translation";
import type { Locale } from "@/locale/locale";

export default async function BondsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const { bonds: bondsTranslation } = await getBondsTranslation(lang);

  const data = [
    {
      seriesName: "Series 1",
      maturityDate: new Date().getTime(),
      nominalValue: 1000,
      interestAmount: 100,
      actualValue: 1100,
      interestRate: 10,
      costOfWithdrawal: 10,
      valueAfterCost: 990,
    },
  ] satisfies BondsTableRow[];

  return (
    <div>
      <h1>{bondsTranslation}</h1>
      <BondsTable rows={data} />
    </div>
  );
}
