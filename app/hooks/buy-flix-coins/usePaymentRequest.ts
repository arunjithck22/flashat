import { PAYMENT_FLIX_REQUEST_URL } from "@/constants/buyFlixCoins";
import { post } from "@/service/http.service";
import { useMutation } from "@tanstack/react-query";

function initiatePayment({ body }: { body: Record<string, unknown> }) {
  const url = PAYMENT_FLIX_REQUEST_URL;
  const responseType = "text";

  return post(url, body, {}, responseType);
}

const usePaymentRequest = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      initiatePayment({ body: data }),
  });
  return mutation;
};

export default usePaymentRequest;
