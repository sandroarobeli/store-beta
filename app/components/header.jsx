import Link from "next/link";

import QuantityBadge from "./QuantityBadge";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 font-orbitron shadow-md">
        <Link href="/" className="text-lg font-bold">
          Internet Store
        </Link>
        <div>
          <Link href="/cart" className="p-2">
            Cart
            <QuantityBadge />
          </Link>
          <Link href="/login" className="p-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
