"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Please enter your username.",
    })
    .max(255, {
      message: "Username can't be longer than 255 characters",
    }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password.",
    })
    .max(255, {
      message: "Password can't be longer than 255 characters",
    }),
});

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);

    const toastId = toast.loading("Logging in...", {
      description: "We are authenticating your credentials.",
    });

    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if (result?.status === 200) {
      router.push("/dashboard");
      toast.success("Login", {
        description: "You have successfully logged in.",
        duration: 3000,
      });
    }

    if (result?.error) {
      setError(result.error);
      toast.error("Login", {
        description: result.error,
        duration: 3000,
      });
    }

    toast.dismiss(toastId);

    setIsProcessing(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="admin" autoComplete="off" {...field} />
              </FormControl>
              <FormDescription>Enter your unique username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your secure password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage className="text-center">{error}</FormMessage>}
        <Button type="submit" className="w-full" disabled={isProcessing}>
          <LogIn /> Login
        </Button>
      </form>
    </Form>
  );
}
