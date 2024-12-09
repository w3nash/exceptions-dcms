"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/app/lib/utils";
import { Button } from "~/app/components/ui/button";
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
import { updateProfile } from "~/app/lib/server-actions";

const FormSchema = z.object({
  firstName: z.string({
    required_error: "Enter a first name.",
  }),
  lastName: z.string({
    required_error: "Enter a last name.",
  }),
  middleName: z.string().nullable().optional(),
  birthday: z.date({
    required_error: "Enter a birthday.",
  }),
  sex: z.string({
    required_error: "Please select a sex.",
  }),
  address: z.string().nullable().optional(),
  contactNumber: z.string({
    required_error: "Enter a contact number.",
  }),
});

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  birthday: Date | null;
  sex: string;
  address: string | null;
  contactNumber: string | null;
};

export function EditCurrentUserForm({
  currentUser,
}: {
  currentUser: CurrentUser;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      middleName: currentUser.middleName,
      birthday: currentUser.birthday
        ? new Date(currentUser.birthday)
        : undefined,
      sex: currentUser.sex,
      address: currentUser.address,
      contactNumber: currentUser.contactNumber || "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      details: {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthday: data.birthday,
        sex: data.sex,
        address: data.address,
        contactNumber: data.contactNumber,
      },
    };
    await updateProfile(newData);
    router.push("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 px-6 md:w-[50%]"
      >
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
              <FormDescription>Enter a contact number.</FormDescription>
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
