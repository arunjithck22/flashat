"use server";

import api from "@/api/config/axios";
import { PROFILE_ENDPOINTS } from "@/constants/endpoints/profile";
import { ApiResponse } from "@/types/apiResponse";
import { ProfileResponse, UpdateProfileResponse } from "@/types/profile";
import { RegisterResponse } from "@/types/signup";
import { handleApiRequest } from "@/utils/apiHandler";

/**
 * get profile 
 * @returns {Promise<ApiResponse<ProfileResponse>>}
 */
export const getProfile = async (
): Promise<ApiResponse<ProfileResponse>> => {
  return await handleApiRequest<ProfileResponse>(() =>
    api.get(PROFILE_ENDPOINTS.PROFILE)
  );
};

/**
 * Update User Profile
 * @param {Object} payload - The updated profile details
 * @returns {Promise<ApiResponse<UpdateProfileResponse>>}
 */
export const updateProfile = async (payload: {
  name?: string;
  gender?: string;
  date_of_birth?: string;
  about?: string;
}): Promise<ApiResponse<UpdateProfileResponse>> => {
  return await handleApiRequest<UpdateProfileResponse>(() =>
    api.put(PROFILE_ENDPOINTS.UPDATE_PROFILE, payload)
  );
};

/**
 * get email otp
 * @param {Object} payload 
 * @param {string} payload.email
 * @param {boolean} payload.resend
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const getEmailOtp = async (payload: {
  email?: string;
  resend?: string;
}): Promise<ApiResponse<RegisterResponse>> => {
  return await handleApiRequest<RegisterResponse>(() =>
    api.put(PROFILE_ENDPOINTS.PROFILE, payload)
  );
};


/**
 * verifyEmail  otp
 * @param {Object} payload 
 * @param {string} payload.email
 * @param {number} payload.otp
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const verifyEmail = async (payload: {
  email?: string;
  otp?: number;
}): Promise<ApiResponse<RegisterResponse>> => {
  return await handleApiRequest<RegisterResponse>(() =>
    api.post(PROFILE_ENDPOINTS.VERIFY_OTP_EMAIL, payload)
  );
};


/**
 * CHECK MOBILE AVAILABLE
 * @param {Object} params 
 * @param {number} params.country_code
 * @param {number} params.phone
 * @param {boolean} params.is_edit
 * @returns {Promise<ApiResponse<message:string>>}
 */
export const checkMobileAvailable = async (params: {
  country_code?: number;
  phone?: number;
  is_edit:boolean
}): Promise<ApiResponse<{message:string}>> => {
  const queryParams = new URLSearchParams({
    country_code: String(params.country_code),
    phone: String(params.phone),
    is_edit: String(params.is_edit),
  }).toString();
  return await handleApiRequest<{message:string}>(() =>
    api.get(`${PROFILE_ENDPOINTS.CHECK_PHONE_AVAILABLE}?${queryParams}`)
  );
};

/**
 * update mobile 
 * @param {Object} payload 
 * @param {number} payload.country_code
 * @param {number} payload.phone
 * @param {boolean} payload.resend
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const updateMobileNumber = async (payload: {
  country_code?: number;
  phone?: number;
  resend: boolean;
}): Promise<ApiResponse<RegisterResponse>> => {
  return await handleApiRequest<RegisterResponse>(() =>
    api.put(PROFILE_ENDPOINTS.PROFILE, payload)
  );
};

/**
 * verify mobile number
 * @param {Object} payload 
 * @param {number} payload.country_code
 * @param {number} payload.phone
 * @param {number} payload.otp
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const verifyMobileNumber = async (payload: {
  country_code?: number;
  phone?: number;
  otp:number
}): Promise<ApiResponse<RegisterResponse>> => {
  return await handleApiRequest<RegisterResponse>(() =>
    api.post(PROFILE_ENDPOINTS.VERIFY_OTP_MOBILE, payload)
  );
};

/**
 * Check username availability
 * @param {Object} params 
 * @param {string} params.username
 * @returns {Promise<ApiResponse<{message: string}>>}
 */
export const checkUserNameAvailable = async (params: {
  username: string;
}): Promise<ApiResponse<{ message: string }>> => {
  return await handleApiRequest<{ message: string }>(() =>
    api.get(`${PROFILE_ENDPOINTS.CHECK_USERNAME_AVAILABLE}?username=${encodeURIComponent(params.username)}`)
  );
};

/**
 * update username
 * @param {Object} payload 
 * @param {number} payload.country_code
 * @param {number} payload.phone
 * @param {number} payload.otp
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const updateUserName = async (payload: {
  username?: string;
}): Promise<ApiResponse<RegisterResponse>> => {
  return await handleApiRequest<RegisterResponse>(() =>
    api.put(PROFILE_ENDPOINTS.PROFILE, payload)
  );
};



/**
 * Update Profile Photo
 * @param {FormData} formData - The new profile photo file
 * @returns {Promise<ApiResponse<{ profile_photo: string }>>}
 */
export const updateProfilePhoto = async (
  formData: FormData
): Promise<ApiResponse<{ profile_photo: string }>> => {
  return await handleApiRequest<{ profile_photo: string }>(() =>
    api.post(PROFILE_ENDPOINTS.UPDATE_PROFILE_PHOTO, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
};

/**
 * Verify Mobile OTP
 * @param {Object} payload - Phone verification details
 * @returns {Promise<ApiResponse<{ success: boolean }>>}
 */
export const verifyMobileOtp = async (payload: {
  phone: string;
  country_code: string;
  otp: string;
}): Promise<ApiResponse<{ success: boolean }>> => {
  return await handleApiRequest<{ success: boolean }>(() =>
    api.post(PROFILE_ENDPOINTS.VERIFY_OTP_MOBILE, payload)
  );
};

/**
 * Verify Email OTP
 * @param {Object} payload - Email verification details
 * @returns {Promise<ApiResponse<{ success: boolean }>>}
 */
export const verifyEmailOtp = async (payload: {
  email: string;
  otp: string;
}): Promise<ApiResponse<{ success: boolean }>> => {
  return await handleApiRequest<{ success: boolean }>(() =>
    api.post(PROFILE_ENDPOINTS.VERIFY_OTP_EMAIL, payload)
  );
};

/**
 * Check Username Availability
 * @param {string} username - Username to check
 * @returns {Promise<ApiResponse<{ available: boolean }>>}
 */
export const checkUsernameAvailability = async (
  username: string
): Promise<ApiResponse<{ available: boolean }>> => {
  return await handleApiRequest<{ available: boolean }>(() =>
    api.get(`${PROFILE_ENDPOINTS.CHECK_USERNAME_AVAILABLE}/${username}`)
  );
};
