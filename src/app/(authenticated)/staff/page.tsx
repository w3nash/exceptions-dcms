import { UserPlus } from "lucide-react";
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
import { getUsers } from "~/app/lib/server-actions";
import { StaffTable } from "./table";

export const metadata = {
  title: "Staff Management",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== 0) {
    redirect("/dashboard");
  }

  const staffData = await getUsers();

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>Staff Management</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card className="overflow-auto">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Staff Management</CardTitle>
            <CardDescription>Showing all the staffs.</CardDescription>
          </div>
          <Button>
            <Link className="flex items-center gap-2" href="/staff/create">
              <UserPlus /> Create Staff
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <StaffTable usersData={staffData} />
        </CardContent>
      </Card>
    </>
  );
}
