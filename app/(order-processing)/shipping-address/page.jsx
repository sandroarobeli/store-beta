"use client";

import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { usStates } from "../../utils/usStates";
import { phoneFormatter } from "../../utils/phoneFormatter";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { StoreContext } from "../../components/StoreProvider";

export default function ShippingScreen() {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    // getFieldState,
    setValue,
    // reset,
  } = useForm();

  useEffect(() => {
    // Pre populate the fields with user's existing data for convenience
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("state", shippingAddress.state);
    setValue("zip", shippingAddress.zip);
    setValue("phone", shippingAddress.phone);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, state, zip, phone }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, state, zip: zip.toString(), phone },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          state,
          zip: zip.toString(),
          phone,
        },
      })
    );
    // Redirection to payment-method selection screen
    router.push("/payment-method");
  };

  return (
    <form
      className="mx-auto max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="mb-4 text-xl">Shipping Address</h1>
      <div className="mb-4">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className={`w-full focus:ring ${
            errors.fullName ? "ring-red-500" : "ring-indigo-300"
          }`}
          id="fullName"
          autoFocus
          {...register("fullName", {
            required: "Please enter full name",
          })}
        />
        {errors.fullName && (
          <div className="text-red-500">{errors.fullName.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className={`w-full focus:ring ${
            errors.address ? "ring-red-500" : "ring-indigo-300"
          }`}
          id="address"
          autoFocus
          {...register("address", {
            required: "Please enter address",
            minLength: {
              value: 3,
              message: "Address must be more than 3 characters",
            },
          })}
        />
        {errors.address && (
          <div className="text-red-500">{errors.address.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className={`w-full focus:ring ${
            errors.city ? "ring-red-500" : "ring-indigo-300"
          }`}
          id="city"
          autoFocus
          {...register("city", {
            required: "Please enter city",
          })}
        />
        {errors.city && (
          <div className="text-red-500">{errors.city.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="state">State</label>
        <select
          className={`w-full focus:ring ${
            errors.state ? "ring-red-500" : "ring-indigo-300"
          }`}
          name="state"
          id="state"
          {...register("state", {
            required: "Please select a state",
          })}
        >
          <option value="" className="bg-amber-300 text-gray-300 md:text-lg">
            Please select a state
          </option>
          {usStates.map((state) => (
            <option
              key={state}
              value={state}
              className="bg-amber-300 text-gray-900 md:text-lg"
            >
              {state}
            </option>
          ))}
        </select>
        {errors.state && (
          <div className="text-red-500">{errors.state.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="zip">Zip Code</label>
        <input
          type="number"
          placeholder="XXXXX"
          className={`w-full focus:ring ${
            errors.zip ? "ring-red-500" : "ring-indigo-300"
          }`}
          id="zip"
          autoFocus
          {...register("zip", {
            required: "Please enter zip code",
            validate: (value) => value.length === 5 || "Must contain 5 digits",
          })}
        />
        {errors.zip && <div className="text-red-500">{errors.zip.message}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          placeholder="XXX XXX XXXX"
          className={`w-full focus:ring ${
            errors.phone ? "ring-red-500" : "ring-indigo-300"
          }`}
          id="phone"
          autoFocus
          {...register("phone", {
            required: "Please enter a phone number",
            onChange: (e) => setValue("phone", phoneFormatter(e.target.value)),
            minLength: {
              value: 14,
              message: "Please enter a valid phone number",
            },
          })}
        />
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
      </div>
      <div className="mb-4 flex justify-between">
        <button className="primary-button">Next</button>
      </div>
    </form>
  );
}
