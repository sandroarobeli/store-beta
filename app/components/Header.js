import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center h-12 w-auto px-4 font-orbitron shadow-md">
        <Link href="/" className="text-lg font-bold">
          Internet Store
        </Link>
        <div>
          <Link href="/cart" className="p-2">
            Cart
          </Link>
          <Link href="/login" className="p-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
