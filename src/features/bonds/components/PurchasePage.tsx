import { NewPurchaseForm } from "./NewPurchaseForm";
import { getBondTypes } from "../drizzle/get-bond-types";
import { getBondsTranslation } from "../locale/get-bonds-translation";
import type { Locale } from "@/locale/locale";

export async function PurchasePage({ lang }: { lang: Locale }) {
  const availableTypes = await getBondTypes();
  const translation = await getBondsTranslation(lang);
  return (
    <NewPurchaseForm
      availableTypes={availableTypes}
      translation={translation}
    />
  );
}
