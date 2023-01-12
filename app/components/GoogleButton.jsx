"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// import { getErrorMessage } from "../utils/getErrorMessage";

export default function GoogleButton() {
  const searchParams = useSearchParams();
  const whence = searchParams.get("redirect") || "/";

  // const googleSignInHandler = async () => {
  //   try {
  //     const result = await signIn("google", { callbackUrl: whence });
  //     if (result.error) {
  //       // Returns an error from signIn call
  //       throw new Error(result.error);
  //     }
  //   } catch (error) {
  //     // Returns an error from googleSignInHandler call
  //     throw new Error(getErrorMessage(error));
  //   }
  // };

  // async function handleGoogleSignIn() {
  //   try {
  //     await signIn("google", {
  //       callbackUrl: "http://localhost:3333",
  //     });
  //   } catch (error) {
  //     return console.log(error);
  //   }
  // }

  return (
    <>
      <button
        onClick={() => signIn("google", { callbackUrl: whence })}
        //onClick={googleSignInHandler}
        className="google-button"
        type="button"
      >
        <Image
          src={"/images/google.svg"}
          alt="styling logo"
          width={20}
          height={20}
        />{" "}
        Sign in with Google
      </button>
    </>
  );
}
