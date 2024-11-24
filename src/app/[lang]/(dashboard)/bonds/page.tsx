import { BondsTable } from "@/features/bonds/components/BondsTable";
import { getUserBonds } from "@/features/bonds/drizzle/get-user-bonds";
import { getBondsTranslation } from "@/features/bonds/locale/get-bonds-translation";
import { calculateBonds } from "@/features/bonds/server/calculate-bonds";
import type { Locale } from "@/locale/locale";

export default async function BondsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const { bonds: bondsTranslation } = await getBondsTranslation(lang);
  const bonds = await getUserBonds();
  const data = await calculateBonds(bonds);

  return (
    <div>
      <h1>{bondsTranslation}</h1>
      <BondsTable rows={data} />
    </div>
  );
}
