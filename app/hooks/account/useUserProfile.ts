"use client";

import { PROFILE_URL } from "@/constants/account";
import { get } from "@/service/http.service";
import { HttpResponse } from "@/types";
import { ProfileDataInterface } from "@/types/profile/index";
import { useQuery } from "@tanstack/react-query";

export const QKEY_GET_USER_PROFILE = "get-user-profile";
const getProfile = () => {
  return get({
    url: PROFILE_URL,
  });
};

// to prevent api call if the user is unauthenticated,beacuse we need to call the api in the common left side bar

export const useProfile = (isAuthenticated?: boolean) => {
  const response = useQuery<HttpResponse<ProfileDataInterface>>({
    queryKey: [QKEY_GET_USER_PROFILE, isAuthenticated],
    queryFn: () => getProfile(),
    enabled: !!isAuthenticated,
  });
  return response;
};
