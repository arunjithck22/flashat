"use client";

import PaymentStatus from "@/view/payment-status";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
      );
      setStripePromise(stripe);
    };

    initializeStripe();
  }, []);

  return (
    <div className="w-full min-h-screen ">
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <PaymentStatus />
        </Elements>
      )}
    </div>
  );
};

export default Page;
