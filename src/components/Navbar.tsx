import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header className="bg-transparent">
      <nav className="flex justify-between">
        <Link href="/">[logo] Brand</Link>

        {/* <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul> */}

        <div className="flex gap-8">
          <Link href="/">Login</Link>
          <Link href="/">Signup</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
