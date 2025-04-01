import { verifyUser } from "@/actions/actions";

import { useQuery } from "@tanstack/react-query";

export const QKEY_FLIX_COIN_BALANCE = "flix-coin-balance";
const tokenVerification = (token: string) => {
  return verifyUser(token);
};

export const useVerifyUserRedirect = (token: string) => {
  const response = useQuery({
    queryKey: ["token-verify"],
    queryFn: () => tokenVerification(token),
  });
  return response;
};
