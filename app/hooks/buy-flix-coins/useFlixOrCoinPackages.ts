import { COIN_PACKAGES_URL, FLIX_PACKAGES_URL } from "@/constants/buyFlixCoins";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

export const QKEY_FLIX_COIN_BALANCE = "flix-coin-balance";
const getFlixOrCoinPackagesList = ({ type }: { type: string }) => {
  if (type === "flix")
    return get({
      url: FLIX_PACKAGES_URL,
    });
  const url = COIN_PACKAGES_URL;
  return get({
    url: url,
  });
};

export const useFlixOrCoinPackages = (type: string) => {
  const response = useQuery({
    queryKey: [QKEY_FLIX_COIN_BALANCE, type],
    queryFn: () => getFlixOrCoinPackagesList({ type }),
  });
  return response;
};
