import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
