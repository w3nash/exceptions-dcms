import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import { BreadcrumbItem, BreadcrumbPage } from "~/app/components/ui/breadcrumb";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import { AppointmentTable } from "./table";
import { getAppointments } from "~/app/lib/server-actions";

export const revalidate = 3600;

export const metadata = {
  title: "Appointments",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const appointmentsData = await getAppointments();

  if (!appointmentsData || "error" in appointmentsData) {
    return redirect("/404");
  }

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>Appointments</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Showing all the appointments.</CardDescription>
          </div>
          <Button>
            <Link
              className="flex items-center gap-2"
              href="/appointments/create"
            >
              <CalendarPlus /> Create Appointment
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <AppointmentTable appointmentsData={appointmentsData} />
        </CardContent>
      </Card>
    </>
  );
}
