export const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-4">
      {children}
    </main>
  );
};
