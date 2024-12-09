import { format } from "date-fns";
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
import { getAppointment } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { UpdateAppointmentForm } from "./form";

export async function generateMetadata({
  params,
}: {
  params: { appointment_id: string };
}) {
  const { appointment_id } = params;
  const appointment = await getAppointment(appointment_id);
  if (!appointment || "error" in appointment) {
    return {
      title: "Appointment Not Found",
    };
  }
  return {
    title: `Edit Appointment: ${format(new Date(appointment.schedule), "MMMM dd, yyyy - hh:mm a")}`,
  };
}

export default async function Page({
  params,
}: {
  params: { appointment_id: string };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { appointment_id } = params;
  const appointment = await getAppointment(appointment_id);

  if (!appointment || "error" in appointment) {
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
          <BreadcrumbLink href={"/appointments/" + appointment_id}>
            {`${format(new Date(appointment.schedule), "MMMM dd, yyyy - hh:mm a")} - ${appointment.Patient.firstName} ${appointment.Patient.lastName}`}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Edit</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Edit Appointment: {appointment.id}</CardTitle>
            <CardDescription>Edit the appointment details.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-2 pt-4 sm:px-6 sm:pt-6 md:flex-row md:items-start">
          <UpdateAppointmentForm appointment={appointment} />
        </CardContent>
      </Card>
    </>
  );
}
