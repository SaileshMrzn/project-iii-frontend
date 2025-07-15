"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoogleSignInButton from "@/components/custom/GoogleSignInButton";
import { useIsDark } from "@/components/theme-provider";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function Signup() {
  const [backgroundImage, setBackgroundImage] = useState("second");

  const isDark = useIsDark();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isDark) {
      setBackgroundImage("/bg10.png");
    } else {
      setBackgroundImage("/bg10_light.png");
    }
  }, [isDark]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  console.log(isDark);

  return (
    <div className="flex justify-center items-center h-[90vh] pb-[5vh]">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-6 h-[90%] xl:w-[90%] flex items-center justify-center flex-col bg-secondary rounded-md xl:grid grid-cols-2 overflow-hidden">
        {/* image */}
        <div
          className="xl:col-span-1 h-full justify-center items-center hidden xl:flex relative bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            objectFit: "cover",
          }}
        >
          <h1 className="text-4xl text-gray-100">Welcome</h1>
        </div>

        {/* form */}
        <div className="xl:col-span-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4 text-center">Signup</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col w-64 md:w-72"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Username"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
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
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
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
                      <Input
                        placeholder="Enter Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-brand cursor-pointer w-full mt-2 text-gray-100 hover:bg-brand/90"
              >
                Submit
              </Button>
            </form>
          </Form>

          <div className="w-full flex flex-col justify-center items-center mt-2">
            <div className="w-full flex items-center gap-2 mt-5 justify-center mb-4">
              <div className="h-0.5 w-24 bg-muted-foreground" />
              <span>Or</span>
              <div className="h-0.5 w-24 bg-muted-foreground" />
            </div>
            <GoogleSignInButton variant="medium" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
