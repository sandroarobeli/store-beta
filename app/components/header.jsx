import Link from "next/link";

import QuantityBadge from "./QuantityBadge";
import UserBadge from "./UserBadge";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 text-xs md:text-lg font-orbitron shadow-md">
        <Link href="/" className="font-bold">
          Internet Store
        </Link>
        <div>
          <Link href="/cart" className="p-2">
            Cart
            <QuantityBadge />
          </Link>
          <UserBadge />
        </div>
      </nav>
    </header>
  );
}

/*
<Link href="/login" className="p-2">
            Login
          </Link>
*/
