import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import AppCalendar from "~/app/(authenticated)/dashboard/dashboard-calendar";
import DashboardCards from "./dashboard-cards";
import { DashboardChart } from "./dashboard-chart";
import { DashboardTable } from "./dashboard-table";
import { BreadcrumbItem, BreadcrumbPage } from "~/app/components/ui/breadcrumb";
import { getServerAuthSession } from "~/server/auth";
import {
  getDashboardCounts,
  getDashboardChartData,
  getDashboardTodayAppointments,
} from "~/app/lib/server-actions";

export const revalidate = 3600;


export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const countsData = await getDashboardCounts();
  const chartData = await getDashboardChartData();
  const appointmentsData = await getDashboardTodayAppointments();

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <DashboardCards countsData={countsData} />
      <div className="my-4 flex flex-col gap-4">
        <DashboardChart chartData={chartData} />
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex flex-1">
            <DashboardTable appointmentsData={appointmentsData} />
          </div>
          <div className="flex items-center justify-end">
            <AppCalendar />
          </div>
        </div>
      </div>
    </>
  );
}
