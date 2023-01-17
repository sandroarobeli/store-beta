"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

import { StoreContext } from "../../components/StoreProvider";
import DialogModal from "../../components/DialogModal";

export default function PaymentScreen() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState("");
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping-address");
    }
    setSelectPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!selectPaymentMethod) {
      return setModalOpen(true);
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectPaymentMethod });
    // As usual, we save this state.cart.paymentMethod in the cookies
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectPaymentMethod,
      })
    );
    // Redirection to payment-method selection screen
    router.push("/place-order");
  };

  return (
    <>
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["Card Payment", "PayPal", "Cash on delivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectPaymentMethod === payment}
              onChange={() => setSelectPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <Link
            href="/shipping-address"
            className="default-button text-black hover:text-black active:text-black"
          >
            Back
          </Link>
          <button className="primary-button">Next</button>
        </div>
      </form>
      <DialogModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Selection Fail"
        description="Payment method is required" // This message is not dynamic, so we hard code it..
        className="inline-flex justify-center border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-900 error-button"
      />
    </>
  );
}
