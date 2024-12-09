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
import { useRouter } from "next/navigation";
import { updateUser } from "~/app/lib/server-actions";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Enter a valid email address.",
    })
    .email("Enter a valid email address."),
  username: z.string({
    required_error: "Enter a username.",
  }),
  role: z.number({
    required_error: "Enter a role.",
  }),
  lastName: z.string({
    required_error: "Enter a last name.",
  }),
  firstName: z.string({
    required_error: "Enter a first name.",
  }),
  middleName: z.string().nullable().optional(),
  birthday: z.date().nullable().optional(),
  sex: z.string({
    required_error: "Please select a sex.",
  }),
  address: z.string().nullable().optional(),
  contactNumber: z.string().nullable().optional(),
  position: z.string({
    required_error: "Enter a position.",
  }),
  monthlySalary: z.string().nullable().optional(),
});

export type Staff = {
  id: string;
  email: string;
  username: string;
  role: number;
  image: string | null;
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthday: Date | null;
  sex: string;
  address: string | null;
  contactNumber: string | null;
  position: string;
  monthlySalary: string | null;
};

export function EditStaffForm({ staff }: { staff: Staff }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: staff.email,
      username: staff.username,
      role: staff.role,
      lastName: staff.lastName,
      firstName: staff.firstName,
      middleName: staff.middleName,
      birthday: staff.birthday ? new Date(staff.birthday) : null,
      sex: staff.sex,
      address: staff.address,
      contactNumber: staff.contactNumber,
      position: staff.position,
      monthlySalary: staff.monthlySalary,
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      id: staff.id,
      data: {
        user: {
          email: data.email,
          username: data.username,
          role: data.role,
        },
        details: {
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          birthday: data.birthday,
          sex: data.sex,
          address: data.address,
          contactNumber: data.contactNumber,
          position: data.position,
          monthlySalary: data.monthlySalary,
        },
      },
    };
    await updateUser(newData);
    router.push("/staff/" + staff.id);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter username" />
              </FormControl>
              <FormDescription>Enter a username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Admin</SelectItem>
                  <SelectItem value="1">Staff</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select a role.</FormDescription>
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
                    selected={field.value ?? undefined}
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
                <Input
                  {...field}
                  placeholder="Enter address"
                  value={field.value ?? ""}
                />
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
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Dentist">Dentist</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select a position.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlySalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Salary</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter monthly salary"
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>Monthly salary is optional.</FormDescription>
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
