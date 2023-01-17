"use client";

import { useContext, useState, useEffect } from "react";

import { StoreContext } from "./StoreProvider";

export default function QuantityBadge() {
  const { state } = useContext(StoreContext);
  // Set the state so to server side doesn't cause mismatch
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { cart } = state;

  // Here also, server doesn't show what client shows and to avoid mismatch in hydration we use Effect
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      {cartItemsCount > 0 && (
        <span className="ml-1 rounded-full bg-red-600 px-4 py-1 text-xs font-bold text-white">
          {cartItemsCount}
        </span>
      )}
    </>
  );
}
