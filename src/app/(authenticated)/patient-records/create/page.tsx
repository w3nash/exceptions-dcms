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

import { PatientForm } from "./form";

export const metadata = {
  title: "Create Patient",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/patient-records">
            Patient Record
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Create</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Create Patient</CardTitle>
            <CardDescription>Create a new patient.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-2 pt-4 sm:px-6 sm:pt-6 md:flex-row md:items-start">
          <PatientForm />
        </CardContent>
      </Card>
    </>
  );
}
