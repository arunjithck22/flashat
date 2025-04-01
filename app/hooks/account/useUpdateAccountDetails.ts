"use client";

import { PROFILE_URL } from "@/constants/account";
import { put } from "@/service/http.service";

import { useMutation } from "@tanstack/react-query";

function updateAccountQueryFn({ body }: { body: Record<string, unknown> }) {
  const url = PROFILE_URL;
  return put(url, body);
}

const useUpdateAccount = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      updateAccountQueryFn({ body: data }),
  });
  return mutation;
};

export default useUpdateAccount;
