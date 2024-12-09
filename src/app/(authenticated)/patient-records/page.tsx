import { UserPlus } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import { BreadcrumbItem, BreadcrumbPage } from "~/app/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { getPatients } from "~/app/lib/server-actions";
import { PatientRecordsTable } from "./table";

export const metadata = {
  title: "Patient Records",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const patientsData = await getPatients();

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>Patient Records</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card className="overflow-auto">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>Showing all the patients.</CardDescription>
          </div>
          <Button>
            <Link
              className="flex items-center gap-2"
              href="/patient-records/create"
            >
              <UserPlus /> Create Patient
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <PatientRecordsTable patientsData={patientsData} />
        </CardContent>
      </Card>
    </>
  );
}
