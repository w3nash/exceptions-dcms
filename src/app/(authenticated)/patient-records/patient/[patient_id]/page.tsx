import { UserPen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/app/components/ui/breadcrumb";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";
import { getPatient } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { DeleteButton } from "./delete-button";

export async function generateMetadata({
  params,
}: {
  params: { patient_id: string };
}) {
  const { patient_id } = params;

  const patient = await getPatient(patient_id);

  return {
    title: `Patient: ${patient?.firstName} ${patient?.lastName}`,
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
          <BreadcrumbPage>{`Patient: ${patient?.firstName} ${patient?.lastName}`}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>
              Patient Details: {patient.firstName} {patient.lastName}
            </CardTitle>
            <CardDescription>Showing the patient information.</CardDescription>
          </div>
          <Button>
            <Link
              className="flex items-center gap-2"
              href={`/patient-records/patient/${patient_id}/edit`}
            >
              <UserPen /> Edit Patient
            </Link>
          </Button>
          <DeleteButton id={patient_id} />
        </CardHeader>
        <CardContent className="grid w-full grid-cols-1 gap-4 px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="patient-info w-full space-y-4 rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">ID:</p>
              <p className="text-sm">
                {patient.id || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Email:</p>
              <p className="text-sm">
                {patient.email || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">First Name:</p>
              <p className="text-sm">
                {patient.firstName || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Last Name:</p>
              <p className="text-sm">
                {patient.lastName || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Middle Name:</p>
              <p className="text-sm">
                {patient.middleName || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Sex:</p>
              <p className="text-sm capitalize">
                {patient.sex || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Address:</p>
              <p className="text-sm">
                {patient.address || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Contact Number:</p>
              <p className="text-sm">
                {patient.contactNumber || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Birthday:</p>
              <p className="text-sm">
                {patient.birthday ? (
                  new Date(patient.birthday).toLocaleDateString("en-US")
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Nationality:</p>
              <p className="text-sm">
                {patient.nationality || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Occupation:</p>
              <p className="text-sm">
                {patient.occupation || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Referred By:</p>
              <p className="text-sm">
                {patient.referredBy || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Created At:</p>
              <p className="text-sm">
                {new Date(patient.createdAt).toLocaleString("en-US")}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Updated At:</p>
              <p className="text-sm">
                {new Date(patient.updatedAt).toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
