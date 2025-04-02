"use client";
import { FOLLOW_USERS_URL } from "@/common/constant";
import { QKEY_FOLLOW_USER } from "@/constants/queryKeys";

import { post } from "@/service/http.service";

import { useMutation } from "@tanstack/react-query";

function followQueryFn({
  body,
  
}: {
  body?: Record<string, unknown>;
  
  
}) {
  const url = FOLLOW_USERS_URL;

  return post(url, body);
}

export const useFollowUser = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_FOLLOW_USER],
    onSuccess: () => {},
    mutationFn: ({
      data,
      
    }: {
      data: Record<string, unknown>;
      
    }) =>
        followQueryFn({
        body: data,
       
      }),
  });
  return mutation;
};
