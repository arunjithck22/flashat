"use client";
import { UNFOLLOW_USERS_URL } from "@/common/constant";
import { QKEY_UNFOLLOW_USER } from "@/constants/queryKeys";

import { post } from "@/service/http.service";

import { useMutation } from "@tanstack/react-query";

function followQueryFn({
  body,
  
}: {
  body?: Record<string, unknown>;
  
  
}) {
  const url = UNFOLLOW_USERS_URL;

  return post(`${url}`, body);
}

export const useUnFollowUser = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_UNFOLLOW_USER],
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
