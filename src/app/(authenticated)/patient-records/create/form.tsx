"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown, UserPlus } from "lucide-react";
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
import { Input } from "~/app/components/ui/input";
import nationalities from "./nationalities";
import { useRouter } from "next/navigation";
import { createPatient } from "~/app/lib/server-actions";

const FormSchema = z.object({
  address: z.string({
    required_error: "Enter an address.",
  }),
  email: z
    .string({
      required_error: "Enter a valid email address.",
    })
    .email("Enter a valid email address."),
  firstName: z.string({
    required_error: "Enter a first name.",
  }),
  lastName: z.string({
    required_error: "Enter a last name.",
  }),
  middleName: z.string().nullable().optional(),
  birthday: z.date({
    required_error: "Enter your birthday.",
  }),
  sex: z.string({
    required_error: "Please select a sex.",
  }),
  contactNumber: z.string().nullable().optional(),
  nationality: z.string({
    required_error: "Enter a nationality.",
  }),
  occupation: z.string({
    required_error: "Enter an occupation.",
  }),
  referredBy: z.string().nullable().optional(),
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
  nationality: string;
  occupation: string;
  referredBy: string | null;
};

export function PatientForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createPatient(data);
    router.push("/patient-records");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 px-6 md:w-[50%]"
      >
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter last name" />
              </FormControl>
              <FormDescription>Enter a last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter middle name"
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>Middle name is optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter first name" />
              </FormControl>
              <FormDescription>Enter a first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter email" />
              </FormControl>
              <FormDescription>Enter a valid email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Birthday</FormLabel>
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
                    toYear={new Date().getFullYear() - 18}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Enter birthday.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter address" />
              </FormControl>
              <FormDescription>Enter an address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Please select a sex.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter contact number"
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>Contact number is optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nationality</FormLabel>
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
                      {field.value ? field.value : "Select nationality"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search nationality..." />
                    <CommandList>
                      <CommandEmpty>No nationality found.</CommandEmpty>
                      <CommandGroup>
                        {nationalities.map((nationality) => (
                          <CommandItem
                            value={nationality}
                            key={nationality}
                            onSelect={() => {
                              form.setValue("nationality", nationality);
                            }}
                          >
                            {nationality}
                            <Check
                              className={cn(
                                "ml-auto",
                                nationality === field.value
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
              <FormDescription>Enter a nationality.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter occupation" />
              </FormControl>
              <FormDescription>Enter an occupation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referredBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referred By</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter referred by"
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>Referred by is optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">
            <UserPlus /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
