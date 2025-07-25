"use client";

import React from "react";
import { useEffect, useState } from "react";

import GoogleSignInButton from "@/components/custom/GoogleSignInButton";
import { useIsDark } from "@/components/theme-provider";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const [backgroundImage, setBackgroundImage] = useState("second");

  const isDark = useIsDark();

  useEffect(() => {
    if (isDark) {
      setBackgroundImage("/bg10.png");
    } else {
      setBackgroundImage("/bg10_light.png");
    }
  }, [isDark]);

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
          <h2 className="text-2xl mb-4 text-center">Login</h2>

          <LoginForm />

          {/* google signin */}
          <div className="w-full flex flex-col justify-center items-center mt-2">
            {/*divider  */}
            <div className="w-full flex items-center gap-2 mt-5 justify-center mb-4">
              <div className="h-0.5 w-24 bg-muted-foreground" />
              <span>Or</span>
              <div className="h-0.5 w-24 bg-muted-foreground" />
            </div>

            <GoogleSignInButton
              variant="medium"
              displayText="Login in with Google"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
