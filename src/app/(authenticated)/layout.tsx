import { SidebarProvider, SidebarTrigger } from "~/app/components/ui/sidebar";
import { AppSidebar } from "~/app/components/app-sidebar";
import { cookies } from "next/headers";
import DateTime from "~/app/components/app-date-time";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <section className="w-full">
        <header className="flex w-full items-center justify-between border-b bg-sidebar px-4 py-2">
          <SidebarTrigger />
          <DateTime />
        </header>
        <main>
          <div className="m-4">{children}</div>
        </main>
      </section>
    </SidebarProvider>
  );
}
