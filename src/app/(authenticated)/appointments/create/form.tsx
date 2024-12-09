"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CalendarPlus,
  Check,
  ChevronsUpDown,
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
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "~/app/components/ui/calendar";
import { format } from "date-fns";
import { createAppointment } from "~/app/lib/server-actions";

const FormSchema = z.object({
  patient: z.string({
    required_error: "Please select a patient.",
  }),
  dentist: z.string({
    required_error: "Please select a dentist.",
  }),
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

export function AppointmentForm({
  patients,
  dentists,
}: {
  patients: Patient[];
  dentists: Dentist[];
}) {
  const router = useRouter();
  const today = new Date();
  const currentHour = today.getHours();
  if (currentHour >= 16) {
    today.setDate(today.getDate() + 1);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const patientOptions = patients.map((patient) => ({
    value: patient.id,
    label: `${patient.firstName} ${patient.lastName}`,
  }));

  const dentistOptions = dentists.map((dentist) => ({
    value: dentist.id,
    label: `${dentist.UserDetails?.firstName} ${dentist.UserDetails?.lastName}`,
  }));

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const schedule = new Date(data.date);
    schedule.setHours(parseInt(data.hour));
    schedule.setMinutes(parseInt(data.minute));
    const payload = {
      schedule,
      patientId: data.patient,
      dentistId: data.dentist,
      type: data.type,
      status: data.status,
    };
    try {
      await createAppointment(payload);
      router.push("/appointments");
    } catch (error) {
      console.error(error);
    }
  }

  const searchParams = useSearchParams();
  const hour = searchParams.get("hour");
  const minute = searchParams.get("minute");
  const date = searchParams.get("date");

  if (hour) {
    form.setValue("hour", hour);
  }

  if (minute) {
    form.setValue("minute", minute);
  }

  if (date) {
    form.setValue("date", new Date(date));
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
          name="patient"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Patient</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? patientOptions.find(
                            (patient) => patient.value === field.value,
                          )?.label
                        : "Select patient"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search patient..." />
                    <CommandList>
                      <CommandEmpty>No patient found.</CommandEmpty>
                      <CommandGroup>
                        {patientOptions.map((patient) => (
                          <CommandItem
                            value={patient.label}
                            key={patient.value}
                            onSelect={() => {
                              form.setValue("patient", patient.value);
                            }}
                          >
                            {patient.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                patient.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the patient for the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dentist"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dentist</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? dentistOptions.find(
                            (dentist) => dentist.value === field.value,
                          )?.label
                        : "Select dentist"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search dentist..." />
                    <CommandList>
                      <CommandEmpty>No dentist found.</CommandEmpty>
                      <CommandGroup>
                        {dentistOptions.map((dentist) => (
                          <CommandItem
                            value={dentist.label}
                            key={dentist.value}
                            onSelect={() => {
                              form.setValue("dentist", dentist.value);
                            }}
                          >
                            {dentist.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                dentist.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the dentist for the appointment.
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
