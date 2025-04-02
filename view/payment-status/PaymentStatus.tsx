"use client";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import { useClientSecret } from "@/contexts/buy-flix-coins/ClientSecretProvider";
import Success from "./components/Success";
import Failure from "./components/Failure";
import Cancel from "./components/Cancel";
import { useRouter } from "next/navigation";


interface PaymentIntentInterface {
  id: string;
  object: "payment_intent";
  amount: number;
  amount_capturable: number;
  amount_details: {
    tip: Record<string, unknown>;
  };
  amount_received: number;
  application: string | null;
  application_fee_amount: number | null;
  automatic_payment_methods: {
    allow_redirects: "always" | "never" | "if_required";
    enabled: boolean;
  };
  canceled_at: number | null;
  cancellation_reason: string | null;
  capture_method: "automatic" | "manual" | "automatic_async";
  client_secret: string;
  confirmation_method: "automatic" | "manual";
  created: number;
  currency: string;
  customer: string | null;
  description: string;
  invoice: string | null;
  last_payment_error: {
    message: string;
  };
  latest_charge: string;
  livemode: boolean;
  metadata: {
    customer: string;
    order_id: string;
    type: string;
    name: string;
  };
  next_action: unknown | null;
  on_behalf_of: string | null;
  payment_method: string;
  payment_method_configuration_details: {
    id: string;
    parent: string | null;
  };
  payment_method_options: {
    card: {
      installments: unknown | null;
      mandate_options: unknown | null;
      network: string | null;
      request_three_d_secure: "automatic" | "any";
    };
    link: {
      persistent_token: string | null;
    };
  };
  payment_method_types: string[];
  processing: unknown | null;
  receipt_email: string | null;
  review: string | null;
  setup_future_usage: string | null;
  shipping: unknown | null;
  source: string | null;
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded";
  transfer_data: unknown | null;
  transfer_group: string | null;
}

const PaymentStatus = () => {
  const stripe = useStripe();
  const [paymentIntent, setPaymentIntent] =
    useState<PaymentIntentInterface | null>(null);
  const [loading, setLoading] = useState(true);
  // const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  // const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState("");
  const { setClientSecret } = useClientSecret();
  const router = useRouter();

  const query = new URLSearchParams(window.location.search);
  console.log("status query", query);

  const paymentIntentId = query.get("payment_intent_client_secret");

  const paymentStatus = query.get("redirect_status");
  console.log("12", paymentIntentId);
  console.log("wwd", paymentIntent);

  const fetchPaymentIntent = async () => {
    try {
      setLoading(true);
      const result = await fetch(
        `https://api.stripe.com/v1/payment_intents/${
          paymentIntentId?.split("_secret_")[0]
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          // body: new URLSearchParams({
          //   cancellation_reason: "you have cancelled the payment",
          // }).toString(),
        }
      );

      const data = await result?.json();
      console.log("res", data);
      if (data?.id) {
        setPaymentIntent(data);
      } else {
        setError("Payment intent not found.");
      }
    } catch (error) {
      setError("Failed to retrieve payment details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Stripe object:", stripe);
    console.log("Payment Intent ID:", paymentIntentId);
    setClientSecret("");
    fetchPaymentIntent();
    if (stripe && paymentIntentId) {
      fetchPaymentIntent();
    } else {
      console.log("errroro");
      setError("No payment intent ID found.");
    }
  }, [stripe, paymentIntentId]);

  // Handle direct access to /home/payment-status
  useEffect(() => {
    if (!paymentIntentId || !paymentStatus) {
      router.push("/buy-FLiX");
    }
  }, [paymentIntentId, paymentStatus]);

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case "succeeded":
        return (
          <Success
            coins={paymentIntent?.description || ""}
            amount={paymentIntent?.amount}
            currency={paymentIntent?.currency || ""}
            tracking_id={paymentIntent?.id}
            purchase_type={paymentIntent?.metadata?.type}
            user={paymentIntent?.metadata?.name}
          />
        );
      case "failed":
        return (
          <Failure
            message={paymentIntent?.last_payment_error?.message || ""}
            coins={paymentIntent?.description || ""}
            amount={paymentIntent?.amount}
            currency={paymentIntent?.currency || ""}
            tracking_id={paymentIntent?.id}
            purchase_type={paymentIntent?.metadata?.type}
          />
        );
      case "cancelled":
        return <Cancel message={paymentIntent?.cancellation_reason} />;
      case "processing":
        return <div>Processing...</div>;
      default:
        router.push("/buy-FLiX");
    }
  };

  if (loading) {
    return <>Loading</>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return <>{!loading && paymentIntent && <div>{renderPaymentStatus()}</div>}</>;
};

export default PaymentStatus;
