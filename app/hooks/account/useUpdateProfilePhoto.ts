import { UPDATE_PROFILE_PHOTO_URL } from "@/constants/account";
import { post } from "@/service/http.service";
import { useMutation } from "@tanstack/react-query";

function updateProfilePhotoQueryFn(data: FormData) {
  return post(UPDATE_PROFILE_PHOTO_URL, data);
}

// React Query Mutation Hook
const useUpdateProfilePhoto = () => {
  return useMutation({
    mutationFn: (data: FormData) => updateProfilePhotoQueryFn(data),
  });
};

export default useUpdateProfilePhoto;
