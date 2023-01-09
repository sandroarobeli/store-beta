"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { StoreContext } from "../utils/storeProvider";
import { XCircleIcon } from "@heroicons/react/24/outline";

function CartScreen() {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;

  const router = useRouter();

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = (item, quantity) => {
    const quantityAdded = Number(quantity);
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: quantityAdded },
    });
  };

  return (
    <>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cart.cartItems.length === 0 ? (
        <h4>
          Cart is empty. <Link href="/">Go shopping</Link>
        </h4>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto mt-4 md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(event) =>
                          updateCartHandler(item, event.target.value)
                        }
                      >
                        {
                          // Create an array based on the number of selected items
                          // Then create options per element of the array
                          [...Array(item.inStock).keys()].map((number) => (
                            <option
                              key={number + 1}
                              value={number + 1}
                              className="bg-amber-300 text-gray-900 font-bold text-right md:text-lg"
                            >
                              {number + 1}
                            </option>
                          ))
                        }
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  ) : $
                  {cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className="primary-button mt-2 w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(CartScreen));
// Doesn't need explicit { ssr: false }, because it already uses 'use client'
//export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
