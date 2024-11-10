import { FormLayout } from "@/components/form-layout";

export default function BondsFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormLayout>{children}</FormLayout>;
}
