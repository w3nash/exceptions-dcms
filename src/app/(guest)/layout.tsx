export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-screen items-center justify-center bg-[url('/login-bg.svg')] bg-cover bg-center bg-no-repeat">
      {children}
    </main>
  );
}
