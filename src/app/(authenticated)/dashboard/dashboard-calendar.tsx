"use client";

import { useState } from "react";
import { Calendar } from "~/app/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CalendarPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import Link from "next/link";

export default function DashboardCalendar() {
  const today = new Date();
  const currentHour = today.getHours();
  if (currentHour >= 16) {
    today.setDate(today.getDate() + 1);
  }

  const [date, setDate] = useState<Date | undefined>(today);
  const [hour, setHour] = useState<string | undefined>(
    (currentHour + 1).toString(),
  );
  const [minute, setMinute] = useState<string | undefined>("00");

  const hours = Array.from({ length: 7 }, (_, i) =>
    (i + 9).toString().padStart(2, "0"),
  ).filter(
    (h) =>
      parseInt(h) > currentHour || today.getDate() !== new Date().getDate(),
  );

  const minutes = Array.from({ length: 6 }, (_, i) =>
    (i * 10).toString().padStart(2, "0"),
  );

  const formatDateToLocalString = (date: Date | undefined) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle className="text-center">Create Appointment</CardTitle>
        <CardDescription className="text-center">
          Select the date and time for your appointment.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={[{ before: today }, { dayOfWeek: [0, 4] }]}
        />
        <div className="grid grid-cols-2 gap-2">
          <Select defaultValue={hour} onValueChange={setHour}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue={minute} onValueChange={setMinute}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link
            className="flex w-full items-center justify-center gap-2"
            href={`/appointments/create?date=${formatDateToLocalString(date)}&hour=${hour}&minute=${minute}`}
          >
            <CalendarPlus /> Next
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
