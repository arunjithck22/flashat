"use client";

import { FLIX_OR_COIN_BALANCE_URL } from "@/constants/buyFlixCoins";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

export const QKEY_FLIX_COIN_BALANCE = "flix-coin-balance";
const getFlixAndCoinBalance = () => {
  const url = FLIX_OR_COIN_BALANCE_URL;
  return get({
    url: url,
  });
};

export const useCoinsOrFlixBalance = () => {
  const response = useQuery({
    queryKey: [QKEY_FLIX_COIN_BALANCE],
    queryFn: () => getFlixAndCoinBalance(),
  });
  return response;
};
