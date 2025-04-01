"use client";
import { UPDATE_PROFILE_URL } from "@/constants/account";
import { put } from "@/service/http.service";

import { useMutation } from "@tanstack/react-query";

function updateProfileQueryFn({ body }: { body: Record<string, unknown> }) {
  const url = UPDATE_PROFILE_URL;
  return put(url, body);
}

const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      updateProfileQueryFn({ body: data }),
  });
  return mutation;
};

export default useUpdateProfile;
