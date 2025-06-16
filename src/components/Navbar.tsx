import React from "react";

function Navbar() {
  return (
    <header className="bg-transparent">
      <nav className="flex justify-between">
        <a href="/">[logo] Brand</a>

        {/* <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul> */}

        <div className="flex gap-8">
          <a href="/">Login</a>
          <a href="/">Signup</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
