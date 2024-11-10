export default function BondsLayout({
  children,
  form,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
}) {
  return (
    <>
      {children}
      {form}
    </>
  );
}
