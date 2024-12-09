"use client";
import { UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import { deletePatient } from "~/app/lib/server-actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await deletePatient(id);
        router.push("/patient-records");
      }}
    >
      <UserMinus /> Delete Patient
    </Button>
  );
}
