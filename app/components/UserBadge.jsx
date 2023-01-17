"use client";

import { useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";

import { StoreContext } from "./StoreProvider";

export default function UserBadge() {
  const { status, data: session } = useSession(); // data: session, signOut
  const { dispatch } = useContext(StoreContext);

  const logoutHandler = () => {
    // Reset cart content on client
    dispatch({ type: "CART_RESET" });
    // Empty local memory
    Cookies.remove("cart");
    // Sign out and return to login page
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {status === "loading" ? (
        "Loading.."
      ) : session?.user ? (
        <Menu
          as="div"
          className="relative inline-block border rounded shadow px-1 hover:shadow-inner active:shadow"
        >
          <Menu.Button className="text-blue-600">
            {session.user.name}
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
            <Menu.Item>
              <Link href="/profile" className="dropdown-link">
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/order-history" className="dropdown-link">
                Order History
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="#" className="dropdown-link" onClick={logoutHandler}>
                Logout
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      ) : (
        <Link href="/login" className="p-2">
          Login
        </Link>
      )}
    </>
  );
}
