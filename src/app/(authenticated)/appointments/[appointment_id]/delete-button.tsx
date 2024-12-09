"use client";
import { CalendarMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import { deleteAppointment } from "~/app/lib/server-actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await deleteAppointment(id);
        router.push("/appointments");
      }}
    >
      <CalendarMinus /> Delete Appointment
    </Button>
  );
}
