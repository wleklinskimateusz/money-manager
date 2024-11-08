export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center justify-center">
      {children}
    </main>
  );
}
