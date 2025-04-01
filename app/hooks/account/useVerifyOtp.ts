import {
  VERIFY_OTP_EMAIL_URL,
  VERIFY_OTP_MOBILE_URL,
} from "@/constants/account";
import { post } from "@/service/http.service";
import { useMutation } from "@tanstack/react-query";

function verifyOtpQueryFn({
  body,
  type,
}: {
  body: Record<string, unknown>;
  type: string;
}) {
  const url = type === "mobile" ? VERIFY_OTP_MOBILE_URL : VERIFY_OTP_EMAIL_URL;
  return post(url, body);
}

const useVerifyOtp = (type: string) => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      verifyOtpQueryFn({ body: data, type: type }),
  });
  return mutation;
};

export default useVerifyOtp;
