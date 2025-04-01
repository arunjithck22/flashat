"use client";
import { HUDDLES_CATEGORIES_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

const getHuddleCategories = () => {
  return get({
    url: HUDDLES_CATEGORIES_URL,
    params: { huddle_type: "public" },
  });
};

export const QKEY_HUDDLE_CATEGORIES = "huddle-categories";

export const useHuddleCategories = () => {
  const response = useQuery({
    queryKey: [QKEY_HUDDLE_CATEGORIES],
    queryFn: () => getHuddleCategories(),
  });

  return response;
};
