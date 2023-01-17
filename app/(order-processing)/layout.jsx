"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import "../globals.css";

export default function OrderLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // If there is no session, user gets redirected to /unauthorized page
  // Layout remains in place, but becomes invisible
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });

  const paths = {
    steps: ["User Login", "Shipping Address", "Payment Method", "Place Order"],
    routes: ["/login", "/shipping-address", "/payment-method", "/place-order"],
  };
  return (
    <section className={`${session ? "block" : "hidden"}`}>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* MAKE NAV INTO DISPLAY: NONE WHEN NOT AUTHORIZED VIA SESSION */}
      <nav className="mb-5 flex flex-wrap">
        {paths.steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= paths.routes.indexOf(pathname)
                ? "border-indigo-500 text-indigo-500"
                : "border-gray-400 text-gray-400"
            }`}
          >
            {step}
          </div>
        ))}
      </nav>
      {children}
    </section>
  );
}
