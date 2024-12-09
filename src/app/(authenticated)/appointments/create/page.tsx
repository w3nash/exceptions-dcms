import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/app/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";
import { getServerAuthSession } from "~/server/auth";

import { AppointmentForm } from "./form";
import { getDentists, getPatients } from "~/app/lib/server-actions";

export const metadata = {
  title: "Create Appointment",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const dentists = await getDentists();
  const patients = await getPatients();

  if (!dentists || "error" in dentists) {
    redirect("/404");
  }

  if (!patients || "error" in patients) {
    redirect("/404");
  }

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/appointments">Appointments</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Create</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Create Appointment</CardTitle>
            <CardDescription>Create a new appointment.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-2 pt-4 sm:px-6 sm:pt-6 md:flex-row md:items-start">
          <AppointmentForm dentists={dentists} patients={patients} />
        </CardContent>
      </Card>
    </>
  );
}
