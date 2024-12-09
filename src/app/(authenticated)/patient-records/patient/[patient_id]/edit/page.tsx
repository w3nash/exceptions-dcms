import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/app/components/ui/breadcrumb";
import { getPatient } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { EditPatientForm } from "./form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: { patient_id: string };
}) {
  const { patient_id } = params;

  const patient = await getPatient(patient_id);

  return {
    title: `Edit Patient - ${patient?.firstName} ${patient?.lastName}`,
  };
}

export default async function Page({
  params,
}: {
  params: { patient_id: string };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { patient_id } = params;

  const patient = await getPatient(patient_id);

  if (!patient) {
    redirect("/404");
  }

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/patient-records">
            Patient Records
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={"/patient-records/patient/" + patient_id}>
            Patient: {patient.firstName} {patient.lastName}
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
            <CardTitle>
              Edit Patient - {patient.firstName} {patient.lastName}
            </CardTitle>
            <CardDescription>Edit the patient information.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-2 pt-4 sm:px-6 sm:pt-6 md:flex-row md:items-start">
          <EditPatientForm patient={patient} />
        </CardContent>
      </Card>
    </>
  );
}
