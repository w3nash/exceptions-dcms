import { redirect } from "next/navigation";
import AppBreadcrumb from "~/app/components/app-breadcrumb";
import { BreadcrumbItem, BreadcrumbPage } from "~/app/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";
import { getCurrentUser } from "~/app/lib/server-actions";
import { getServerAuthSession } from "~/server/auth";
import { UpdatePasswordForm } from "./form";

export const metadata = {
  title: "Update Password",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/404");
  }

  return (
    <>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>Update Password</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Update Password</CardTitle>
            <CardDescription>Update your password.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-2 pt-4 sm:px-6 sm:pt-6 md:flex-row md:items-start">
          <UpdatePasswordForm />
        </CardContent>
      </Card>
    </>
  );
}
