import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/app/components/ui/breadcrumb";
import { getAppointment } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";
import { DeleteButton } from "./delete-button";

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
    title: `Appointment - ${format(new Date(appointment.schedule), "MMMM dd, yyyy - hh:mm a")}`,
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
          <BreadcrumbPage>
            {`${format(new Date(appointment.schedule), "MMMM dd, yyyy - hh:mm a")} - ${appointment.Patient.firstName} ${appointment.Patient.lastName}`}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Showing the appointment information.
            </CardDescription>
          </div>
          <Button>
            <Link
              className="flex items-center gap-2"
              href={`/appointments/${appointment.id}/edit`}
            >
              <CalendarDays /> Edit Appointment
            </Link>
          </Button>
          <DeleteButton id={appointment.id} />
        </CardHeader>
        <CardContent className="grid w-full grid-cols-1 gap-4 px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="appointment-info w-full space-y-4 rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">ID:</p>
              <p className="text-sm">
                {appointment.id || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Schedule:</p>
              <p className="text-sm">
                {appointment.schedule ? (
                  format(
                    new Date(appointment.schedule),
                    "MMMM dd, yyyy - hh:mm a",
                  )
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Status:</p>
              <p className="text-sm capitalize">
                {appointment.status ? (
                  appointment.status
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Type:</p>
              <p className="text-sm">
                {appointment.type || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Patient:</p>
              <p className="text-sm">
                {appointment.Patient ? (
                  `${appointment.Patient.firstName} ${appointment.Patient.lastName}`
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Dentist:</p>
              <p className="text-sm">
                {appointment.Dentist && appointment.Dentist.UserDetails ? (
                  `${appointment.Dentist.UserDetails.firstName} ${appointment.Dentist.UserDetails.lastName}`
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Created At:</p>
              <p className="text-sm">
                {new Date(appointment.createdAt).toLocaleString("en-US")}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Updated At:</p>
              <p className="text-sm">
                {new Date(appointment.updatedAt).toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
