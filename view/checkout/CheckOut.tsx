"use client";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { clear } from "console";
import { useClientSecret } from "@/contexts/buy-flix-coins/ClientSecretProvider";
import { useRouter } from "next/navigation";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

stripePromise.then((data) => console.log("prmise data", data));

const CheckOut = () => {
  // const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { clientSecret } = useClientSecret();
  console.log("client secret", clientSecret);

  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    if (!clientSecret) router.push("/buy-FLiX");
  }, []);

  return (
    <>
      {clientSecret !== "" && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default CheckOut;
