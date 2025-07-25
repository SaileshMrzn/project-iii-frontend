"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { AnimatePresence, Easing, motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { logout } from "@/actions/auth";
import { Session } from "next-auth";
// import AvatarDropdown from "../custom/AvatarDropdown";

function Navbar({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuVariants = {
    initial: {
      clipPath: "circle(0% at 100% 0)",
    },
    animate: {
      clipPath: "circle(150% at 100% 0)",
      transition: {
        duration: 0.5,
        ease: [0.45, 0, 0.55, 1] as Easing,
      },
    },
    exit: {
      clipPath: "circle(0% at 100% 0)",
      transition: {
        duration: 0.5,
        ease: [0.45, 0, 0.55, 1] as Easing,
      },
    },
  };

  const navLinkVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <header className="bg-transparent h-[10vh] items-center flex px-6 md:px-16 justify-between w-full">
      <Link href="/">[logo] Brand</Link>

      {!session && (
        <nav className="hidden gap-8 md:flex">
          <Link
            href="/login"
            className="hover_animation text-muted-foreground hover:text-primary transition-all ease-in-out duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="hover_animation text-muted-foreground hover:text-primary transition-all ease-in-out duration-300"
          >
            Signup
          </Link>
        </nav>
      )}

      {session && <div className="hidden md:block">{children}</div>}

      <div className="md:hidden z-50">
        {!menuOpen ? (
          <HiMenuAlt3
            size={25}
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer"
          />
        ) : (
          <IoClose size={30} onClick={() => setMenuOpen(false)} />
        )}
      </div>

      {/* mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-brand origin-top-right z-40 flex flex-col items-center justify-center gap-12"
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="md:hidden absolute top-6 left-6">{children}</div>

            {!session && (
              <motion.div
                className="flex flex-col items-center gap-10"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              >
                <motion.div variants={navLinkVariants}>
                  <Link
                    href="/login"
                    className="text-3xl text-brand-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div variants={navLinkVariants}>
                  <Link
                    href="/signup"
                    className="text-3xl text-brand-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {session && (
              <motion.div
                className="flex flex-col items-center gap-10"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              >
                <motion.div variants={navLinkVariants}>
                  <Link
                    href="/login"
                    className="text-3xl text-brand-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </motion.div>

                <motion.div variants={navLinkVariants}>
                  <p
                    className="text-3xl text-brand-foreground cursor-pointer"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
