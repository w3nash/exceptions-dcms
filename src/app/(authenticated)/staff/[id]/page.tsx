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
import { getUser } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { DeleteButton } from "./delete-button";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const staff = await getUser(id);

  return {
    title: `Staff: ${staff?.firstName} ${staff?.lastName}`,
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
          <BreadcrumbLink href="/patient-records">
            Staff Manangement
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{`Staff: ${staff?.firstName} ${staff?.lastName}`}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>
              Staff Details: {staff.firstName} {staff.lastName}
            </CardTitle>
            <CardDescription>Showing the staff information.</CardDescription>
          </div>
          <Button>
            <Link
              className="flex items-center gap-2"
              href={`/staff/${id}/edit`}
            >
              <UserPen /> Edit Patient
            </Link>
          </Button>
          <DeleteButton id={id} />
        </CardHeader>
        <CardContent className="grid w-full grid-cols-1 gap-4 px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="staff-info w-full space-y-4 rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">ID:</p>
              <p className="text-sm">
                {staff.id || <span className="text-muted-foreground">N/A</span>}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Email:</p>
              <p className="text-sm">
                {staff.email || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Username:</p>
              <p className="text-sm">
                {staff.username || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Role:</p>
              <p className="text-sm">{staff.role == 0 ? "Admin" : "Staff"}</p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">First Name:</p>
              <p className="text-sm">
                {staff.firstName || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Last Name:</p>
              <p className="text-sm">
                {staff.lastName || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Middle Name:</p>
              <p className="text-sm">
                {staff.middleName || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Sex:</p>
              <p className="text-sm capitalize">
                {staff.sex || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Address:</p>
              <p className="text-sm">
                {staff.address || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Contact Number:</p>
              <p className="text-sm">
                {staff.contactNumber || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Birthday:</p>
              <p className="text-sm">
                {staff.birthday ? (
                  new Date(staff.birthday).toLocaleDateString("en-US")
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Position:</p>
              <p className="text-sm">
                {staff.position || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="font-semibold">Monthly Salary:</p>
              <p className="text-sm">
                {staff.monthlySalary || (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
