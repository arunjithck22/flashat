import { STRIPE_PAYMENT_INTENT_URL } from "@/constants/buyFlixCoins";
import { post } from "@/service/http.service";

import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPaymentIntent({ body }: { body: any }) {
  const url = STRIPE_PAYMENT_INTENT_URL;
  return post(
    url,
    body
    // { auth: true, responseType: "text" }
  );
}

const useStripePaymentIntent = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      createPaymentIntent({ body: data }),
  });
  return mutation;
};

export default useStripePaymentIntent;
