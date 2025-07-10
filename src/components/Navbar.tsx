import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header className="bg-transparent h-[10vh] items-center flex ">
      <nav className="flex justify-between w-full mx-16">
        <Link href="/">[logo] Brand</Link>

        {/* <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul> */}

        <div className="flex gap-8">
          <Link
            href="/"
            className="hover_animation text-muted-foreground hover:text-primary transition-all ease-in-out duration-300"
          >
            Login
          </Link>
          <Link
            href="/"
            className="hover_animation text-muted-foreground hover:text-primary transition-all ease-in-out duration-300"
          >
            Signup
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
