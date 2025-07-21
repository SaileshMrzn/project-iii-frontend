"use client";

// import { signIn } from "next-auth/react";
import Image from "next/image";
import { login } from "@/actions/auth";

type Variant = "icon" | "small" | "medium";

interface GoogleSignInButtonProps {
  variant?: Variant;
  displayText?: string;
}

const GoogleSignInButton = ({
  variant = "medium",
  displayText,
}: GoogleSignInButtonProps) => {
  const baseStyle =
    "flex items-center justify-center rounded-md transition cursor-pointer";

  const variants = {
    icon: "w-10 h-10 p-2",
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-sm",
  };

  const text = {
    icon: "",
    small: displayText || "Sign in",
    medium: displayText || "Sign in with Google",
  };

  return (
    <button
      onClick={() => login()}
      className={`${baseStyle} bg-white dark:bg-black border border-border shadow-sm hover:shadow-md ${variants[variant]} flex items-center justify-center gap-3`}
    >
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={20}
        height={20}
      />
      <p className="text-accent-foreground">{text[variant]}</p>
    </button>
  );
};

export default GoogleSignInButton;
