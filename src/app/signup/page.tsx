"use client";

import { toast } from "sonner";
import { z } from "zod";

import GoogleSignInButton from "@/components/custom/GoogleSignInButton";
import { useIsDark } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import SignupForm from "./components/SignupForm";
import { SignupFormSchema } from "./components/SignupForm";

function Signup() {
  const [backgroundImage, setBackgroundImage] = useState("second");

  const isDark = useIsDark();

  useEffect(() => {
    if (isDark) {
      setBackgroundImage("/bg10.png");
    } else {
      setBackgroundImage("/bg10_light.png");
    }
  }, [isDark]);

  // function onSubmit(data: z.infer<typeof SignupFormSchema>) {
  //   toast("You submitted the following values", {
  //     description: (
  //       <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  return (
    <main className="flex justify-center items-center h-[90vh] pb-[5vh]">
      <section className="w-full md:w-2/3 lg:w-1/2 mx-6 h-[90%] xl:w-[90%] flex items-center justify-center flex-col bg-secondary rounded-md xl:grid grid-cols-2 overflow-hidden">
        {/* background image */}
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

          <SignupForm />

          {/* google signin */}
          <div className="w-full flex flex-col justify-center items-center mt-2">
            {/*divider  */}
            <div className="w-full flex items-center gap-2 mt-5 justify-center mb-4">
              <div className="h-0.5 w-24 bg-muted-foreground" />
              <span>Or</span>
              <div className="h-0.5 w-24 bg-muted-foreground" />
            </div>

            <GoogleSignInButton variant="medium" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
