"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn, stringIsEmail } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/auth/functions";
import { useState } from "react";
import { redirect } from "next/navigation";
import { AlertComponent } from "./alert-component";

const formSchema = z.object({
  email: z
    .string()
    .min(4)
    .max(50)
    .refine((value) => stringIsEmail(value), "Not a valid Email"),
  password: z.string().min(8).max(32),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signUp(values).then(({ success, error }) => {
      if (success) {
        setError("");
        redirect("/");
      }
      setError(error?.message || "");
      setLoading(false);
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error !== "" && (
        <AlertComponent description={error} title="Login Error" type="error" />
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="" disabled={loading} {...field} />
                        </FormControl>
                        <FormDescription>This is your Email</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            type="password"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This is your Password</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
