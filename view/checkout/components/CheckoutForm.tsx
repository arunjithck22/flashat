import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeError, StripeElements } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useClientSecret } from "@/contexts/buy-flix-coins/ClientSecretProvider";
import { notification } from "@/utils/toastService";

interface ShippingAddress {
  name: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

interface CreateConfirmationTokenParams {
  elements: StripeElements;
  params: {
    shipping: ShippingAddress;
  };
}

interface ConfirmationToken {
  id: string;
}

interface CreateConfirmationTokenResult {
  error?: StripeError;
  confirmationToken?: ConfirmationToken;
}

interface HandleServerResponse {
  // Define the structure of the server response
}

export default function CheckoutForm() {
  const { clientSecret, setClientSecret } = useClientSecret();
  const stripe = useStripe();
  const elements = useElements();
  console.log("elemennts", elements);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeElementsLoading, setIsStripeElementsLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    if (clientSecret === "") {
      router.push("/buy-FLiX");
    }

    // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //   switch (paymentIntent?.status) {
    //     case "succeeded":
    //       setMessage("Payment succeeded!");
    //       break;
    //     case "processing":
    //       setMessage("Your payment is processing.");
    //       break;
    //     case "requires_payment_method":
    //       setMessage("");
    //       break;
    //     default:
    //       setMessage("Something went wrong.");
    //       break;
    //   }
    // });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-status`,
      },
    });
    console.log("result111", result);

    if (result?.error.type === "card_error") {
      console.log("type", result?.error.type);
      setIsLoading(false);
      setMessage("");
      // window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-status?payment_intent_client_secret=${result.error.payment_intent?.client_secret}&redirect_status=failed`;
      router.push(
        `/payment-status?payment_intent_client_secret=${result.error.payment_intent?.client_secret}&redirect_status=failed`
      );
    } else {
      setIsLoading(false);
      setMessage(result?.error?.message || "");
    }

    setIsLoading(false);
  };
  // const handleEmailChange = (event: any) => {
  //   setEmail(event.value.email);
  // };

  function extractPaymentIntentId(clientSecret: any) {
    const [paymentIntentId] = clientSecret.split("_secret_");
    return paymentIntentId;
  }

  const handleCancelPaymentIntent = async (clientSecret: any) => {
    try {
      setCancelLoading(true);
      const response = await fetch(
        `https://api.stripe.com/v1/payment_intents/${extractPaymentIntentId(
          clientSecret
        )}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          // body: new URLSearchParams({
          //   cancellation_reason: "you have cancelled the payment",
          // }).toString(),
        }
      );
      const data = await response.json();
      if (data) {
        router.push(`/buy-FLiX`);
        setCancelLoading(false);
      }
    } catch (error) {
      setCancelLoading(false);
      notification?.error({ message: "Something went wrong" });
    }
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
    mode: "payment" as const,
  };
  const AddressElementOptions = {
    layout: "tabs" as const, // Keep this as it is valid
    mode: "billing" as const, // Change this from "payment" to "billing" or "shipping"
  };

  return (
    <>
      {stripe && (
        <div className="checkout-parent flex justify-center items-center p-4 md:p-8 lg:p-12">
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
          >
            {/* <LinkAuthenticationElement
      id="link-authentication-element"
      onChange={handleEmailChange}
    /> */}
            {/* <AddressElement options={AddressElementOptions} /> */}
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
              onReady={() => setIsStripeElementsLoading(false)}
            />
            <div className="flex flex-col md:flex-row gap-2 mt-4">
              <button
                className="pay-now-btn bg-red-500 w-full py-2 rounded text-white"
                disabled={
                  cancelLoading ||
                  isLoading ||
                  !stripe ||
                  !elements ||
                  isStripeElementsLoading
                }
                id="cancel"
                type="button"
                onClick={() => {
                  handleCancelPaymentIntent(clientSecret);
                }}
              >
                <span id="button-text">
                  {cancelLoading ? (
                    <div className="flex items-center justify-center h-auto">
                      <div className="w-8 h-8  border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Cancel"
                  )}
                </span>
              </button>
              <button
                className="pay-now-btn bg-blue-500 w-full py-2 rounded text-white"
                disabled={
                  cancelLoading ||
                  isLoading ||
                  !stripe ||
                  !elements ||
                  isStripeElementsLoading
                }
                id="submit"
                type="submit"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-auto">
                      <div className="w-8 h-8  border-4 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </div>

            {/* Show any error or success messages */}
            {message && (
              <div
                id="payment-message"
                className="text-center py-2 mt-4 text-red-500"
              >
                {message}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
