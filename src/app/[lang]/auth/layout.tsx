import { FormLayout } from "@/components/form-layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormLayout>{children}</FormLayout>;
}
