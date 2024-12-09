import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/app/components/ui/breadcrumb";
import { getUser } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { EditStaffForm } from "./form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const staff = await getUser(id);

  return {
    title: `Edit Staff: ${staff?.firstName} ${staff?.lastName}`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { id } = params;

  const staff = await getUser(id);

  if (!staff) {
    redirect("/404");
  }

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/staff">Staff Management</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={"/staff/" + id}>
            Staff: {staff.firstName} {staff.lastName}
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
              Edit Staff - {staff.firstName} {staff.lastName}
            </CardTitle>
            <CardDescription>Edit the staff information.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-2 pt-4 sm:px-6 sm:pt-6 md:flex-row md:items-start">
          <EditStaffForm staff={staff} />
        </CardContent>
      </Card>
    </>
  );
}
