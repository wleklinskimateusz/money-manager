import { NewPurchaseForm } from "@/features/bonds/components/NewPurchaseForm";
import { getBondTypes } from "@/features/bonds/drizzle/get-bond-types";

export default async function AddBondPage() {
  const availableTypes = await getBondTypes();
  return <NewPurchaseForm availableTypes={availableTypes} />;
}
