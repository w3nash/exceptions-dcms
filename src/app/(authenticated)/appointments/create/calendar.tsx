"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Calendar } from "~/app/components/ui/calendar";

export default function AppointmentCalendar() {
  const today = new Date();
  const currentHour = today.getHours();
  if (currentHour >= 16) {
    today.setDate(today.getDate() + 1);
  }
  const searchParams = useSearchParams();
  const queryDate = searchParams.get("date");
  const selectedDate = queryDate ? new Date(queryDate) : undefined;

  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? selectedDate : today,
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      disabled={[{ before: today }, { dayOfWeek: [0, 4] }]}
    />
  );
}
