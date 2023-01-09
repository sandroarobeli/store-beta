"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { StoreContext } from "../utils/storeProvider";
import DialogModal from "./DialogModal";

export default function AddToCartButton({ product }) {
  const { state, dispatch } = useContext(StoreContext);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const addToCartHandler = () => {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    // If item is already in the cart, we increment, otherwise we add 1
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    // Quantity chosen cannot exceed available stock
    if (product.inStock < quantity) {
      setModalOpen(true);
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
    router.push("/cart"); // Redirect user to cart page
  };

  return (
    <>
      <button className="primary-button w-full" onClick={addToCartHandler}>
        Add to Cart
      </button>
      <DialogModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Out of Stock!"
        description="Order exceeded currently available quantity"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-900 primary-button"
      />
    </>
  );
}
