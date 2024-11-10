import { getUserBonds } from "@/features/bonds/drizzle/get-user-bonds";
import { getBondsTranslation } from "@/features/bonds/locale/get-bonds-translation";
import type { Locale } from "@/locale/locale";

export default async function BondsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const bonds = await getUserBonds();
  const { lang } = await params;
  const { bonds: bondsTranslation } = await getBondsTranslation(lang);

  return (
    <div>
      <h1>{bondsTranslation}</h1>
      <ul>
        {bonds.map((bond) => (
          <li key={bond.id}>
            {bond.seriesName} -{" "}
            {Intl.DateTimeFormat(lang, { dateStyle: "medium" }).format(
              bond.purchaseDate,
            )}
            - {bond.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
