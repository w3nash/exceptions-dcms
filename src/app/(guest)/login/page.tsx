import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { LoginForm } from "~/app/(guest)/login/login-form";
import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <img
        src="/logo.svg"
        alt="Santos Dental Clinic logo"
        className="fixed right-0"
        draggable="false"
      />
      <Card className="z-50 mx-6 w-full sm:w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl">LOGIN</CardTitle>
          <CardDescription className="text-center">
            <p>Welcome back, please login to use this system.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center text-muted-foreground">
          <p className="text-sm font-medium">
            Smile Factory by Santos Dental Clinic
          </p>
          <p className="text-xs">&#169; Copyright 2024. All rights reserved.</p>
        </CardFooter>
      </Card>
    </HydrateClient>
  );
}
