import { FormLayout } from "@/components/form-layout";

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormLayout>{children}</FormLayout>;
}
