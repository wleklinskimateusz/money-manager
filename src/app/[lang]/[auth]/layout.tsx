import { FormLayout } from "@/features/authentication/components/FormLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormLayout>{children}</FormLayout>;
}
