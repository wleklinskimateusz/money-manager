export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex h-screen max-w-4xl flex-col items-center justify-center gap-4">
      {children}
    </main>
  );
}
