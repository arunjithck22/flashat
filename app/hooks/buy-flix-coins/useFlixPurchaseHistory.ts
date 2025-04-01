import { FLIX_PURCHASE_URL } from "@/constants/buyFlixCoins";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

export const QKEY_FLIX_PURCHASE_HISTORY = "flix-purchase-history";
export const QKEY_FLIX_PURCHASE_HISTORY_FOR_OTHER_USERS =
  "flix-purchase-history-for-others";
const getFlixPurchase = (nextPage: number) => {
  const url = FLIX_PURCHASE_URL;
  return get({
    url: url,
    params: { page: nextPage, limit: 20, purchased_for: "self" },
  });
};

const getFlixPurchaseForOtherUsers = (nextPage: number) => {
  const url = FLIX_PURCHASE_URL;
  return get({
    url: url,
    params: { page: nextPage, limit: 20, purchased_for: "others" },
  });
};
export const useFlixPurchaseHistory = (nextPage: number) => {
  const response = useQuery({
    queryKey: [QKEY_FLIX_PURCHASE_HISTORY, nextPage],
    queryFn: () => getFlixPurchase(nextPage),
  });
  return response;
};

export const useFlixUsersPurchaseHistory = (nextPage: number) => {
  const response = useQuery({
    queryKey: [QKEY_FLIX_PURCHASE_HISTORY_FOR_OTHER_USERS, nextPage],
    queryFn: () => getFlixPurchaseForOtherUsers(nextPage),
  });
  return response;
};
