"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "~/app/components/ui/input";
import { useRouter } from "next/navigation";
import { updatePassword } from "~/app/lib/server-actions";
import { toast } from "sonner";

const PasswordSchema = z.object({
  currentPassword: z.string({
    required_error: "Enter your current password.",
  }),
  newPassword: z
    .string({
      required_error: "Enter a new password.",
    })
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character.",
    ),
});

export function UpdatePasswordForm() {
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof PasswordSchema>) {
    const newData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    const result = await updatePassword(newData);

    if (result?.error) {
      return toast.error(result.error);
    } else {
      toast.success("Password updated successfully.");
      router.push("/dashboard");
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter current password"
                />
              </FormControl>
              <FormDescription>Enter your current password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter new password"
                />
              </FormControl>
              <FormDescription>Enter a strong new password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Update Password</Button>
        </div>
      </form>
    </Form>
  );
}
