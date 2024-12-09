"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CalendarPlus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/app/lib/utils";
import { Button } from "~/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/app/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import { Calendar } from "~/app/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { updateAppointment } from "~/app/lib/server-actions";

const FormSchema = z.object({
  date: z.date({
    required_error: "Please select a date.",
  }),
  hour: z.string({
    required_error: "Please select an hour.",
  }),
  minute: z.string({
    required_error: "Please select a minute.",
  }),
  type: z.enum(["Consultation", "Treatment"], {
    required_error: "Please select a type.",
  }),
  status: z.enum(["pending", "processing", "done", "cancelled"], {
    required_error: "Please select a status.",
  }),
});

export type Patient = {
  address: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  birthday: Date;
  sex: string;
  contactNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
  nationality: string;
  occupation: string;
  referredBy: string | null;
};

export type Dentist = {
  UserDetails: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    birthday: Date;
    sex: string;
    address: string | null;
    contactNumber: string | null;
    position: string;
    monthlySalary: string | null;
  } | null;
  id: string;
  email: string;
  image: string | null;
  username: string;
  role: number;
};

export function UpdateAppointmentForm({ appointment }: { appointment: any }) {
  const router = useRouter();
  const today = new Date();
  const currentHour = today.getHours();
  if (currentHour >= 16) {
    today.setDate(today.getDate() + 1);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(appointment.schedule),
      hour: String(new Date(appointment.schedule).getHours()).padStart(2, "0"),
      minute: String(new Date(appointment.schedule).getMinutes()).padStart(
        2,
        "0",
      ),
      type: appointment.type,
      status: appointment.status,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const schedule = new Date(data.date);
    schedule.setHours(parseInt(data.hour));
    schedule.setMinutes(parseInt(data.minute));
    const payload = {
      id: appointment.id,
      data: {
        schedule: schedule,
        type: data.type,
        status: data.status,
      },
    };
    try {
      await updateAppointment(payload);
      router.push("/appointments");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 px-6 md:w-[50%]"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={[{ before: today }, { dayOfWeek: [0, 4] }]}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date of the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hour</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hour" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["09", "10", "11", "12", "13", "14", "15"].map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the hour for the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minute</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select minute" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["00", "10", "20", "30", "40", "50"].map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the minute for the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Treatment">Treatment</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the type of appointment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the status of the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">
            <CalendarPlus /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
