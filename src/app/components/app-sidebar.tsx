import { Sidebar, SidebarHeader } from "~/app/components/ui/sidebar";
import { getServerAuthSession } from "~/server/auth";
import { AppSidebarContent } from "./app-sidebar-content";

export async function AppSidebar() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-start gap-2 p-4">
          <img src="/icon.png" className="h-16 w-16" alt="" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Smile Factory</h1>
            <h2 className="text-xs">
              by{" "}
              <span className="font-medium italic">Santos Dental Clinic</span>
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <AppSidebarContent session={session} />
    </Sidebar>
  );
}
