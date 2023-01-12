"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

import { getErrorMessage } from "../utils/getErrorMessage";
import DialogModal from "../components/DialogModal";
import GoogleButton from "../components/GoogleButton";

export default function LoginScreen() {
  const { data: session } = useSession(); // data: session means - renaming data into session!
  const searchParams = useSearchParams();
  const whence = searchParams.get("redirect");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // IF LOGGED IN (THERE IS ACTIVE SESSION), ==> REDIRECT TO whence (IF COMING FRO CART),
  // OTHERWISE, ==> REDIRECT TO HOME (IF COMING FROM SOMEWHERE ELSE)
  useEffect(() => {
    if (session?.user) {
      console.log("session.user: ", session.user); // test
      redirect(whence || "/"); // OR router.push(whence || '/')
    }
  }, [session, whence]);

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (result.error) {
        // Returns an error from signIn call
        setErrorMessage(result.error);
        setModalOpen(true);
      }
    } catch (error) {
      // Returns an error from submitHandler call
      setErrorMessage(getErrorMessage(error));
      setModalOpen(true);
    }
  };

  // ALSO, TRY THROWING AN ERROR IF REDIRECT WORKS LIKE LAST TIME
  // AS IN DIALOG MODAL POPS UP INSTEAD OF UNAUTHORIZED PAGE
  // TRY PUSH INSTEAD OF REDIRECT FIRST...

  return (
    <>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`w-full focus:ring ${
              errors.email ? "ring-red-500" : "ring-indigo-300"
            }`}
            id="email"
            autoFocus
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type={`${passwordVisible ? "text" : "password"}`}
            className={`w-full focus:ring ${
              errors.password ? "ring-red-500" : "ring-indigo-300"
            }`}
            id="password"
            autoFocus
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password must be minimum 6 characters long",
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            onChange={() =>
              setPasswordVisible((passwordVisible) => !passwordVisible)
            }
            id="showPassword"
            className="w-5 h-5 mr-2 cursor-pointer"
            autoFocus
          />{" "}
          <label htmlFor="showPassword">Show password</label>
        </div>
        <div className="mb-4">
          <button className="primary-button w-full">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
      <div className="mx-auto max-w-screen-md mb-4 flex justify-between items-center">
        <span className="h-0.5 w-1/2 mr-3 bg-gray-200"></span>
        <span>or</span>
        <span className="h-0.5 w-1/2 ml-3 bg-gray-200"></span>
      </div>
      <div className="mx-auto mt-6 max-w-screen-md">
        <GoogleButton />
      </div>
      <DialogModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Authentication Fail"
        description={errorMessage}
        className="inline-flex justify-center border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-900 error-button"
      />
    </>
  );
}
