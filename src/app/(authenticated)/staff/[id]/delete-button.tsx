"use client";
import { UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import { deleteUser } from "~/app/lib/server-actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await deleteUser(id);
        router.push("/staff");
      }}
    >
      <UserMinus /> Delete Staff
    </Button>
  );
}
