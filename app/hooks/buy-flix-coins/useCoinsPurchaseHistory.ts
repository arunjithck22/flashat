import { COINS_PURCHASE_URL } from "@/constants/buyFlixCoins";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

export const QKEY_COINS_PURCHASE_HISTORY = "get-coins-purchase-history";

const getCoinPurchase = (nextPage: number) => {
  const url = COINS_PURCHASE_URL;

  return get({
    url: url,
    params: { page: nextPage, limit: 20 },
  });
};

export const useCoinsPurchaseHistory = (nextPage: number) => {
  const response = useQuery({
    queryKey: [QKEY_COINS_PURCHASE_HISTORY, nextPage],
    queryFn: () => getCoinPurchase(nextPage),
  });
  return response;
};
