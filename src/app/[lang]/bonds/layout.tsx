export default function BondsLayout({
  children,
  purchase,
}: {
  children: React.ReactNode;
  purchase: React.ReactNode;
}) {
  return (
    <>
      {children}
      {purchase}
    </>
  );
}
