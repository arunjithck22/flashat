"use server";

import api from "@/api/config/axios";
import { SIGNUP_ENDPOINTS } from "@/constants/endpoints/auth";
import { ApiResponse } from "@/types/apiResponse";
import {
  ConfirmSuperStarResponse,
  CreatePasswordResponse,
  CreateProfileResponse,
  RegisterResponse,
  SuperStarResponse,
  VerifyEmailResponse,
} from "@/types/signup";
import { handleApiRequest } from "@/utils/apiHandler";

/**
 * Register Email for Signup
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.identity
 * @param {boolean} payload.resend
 * @param {string} [payload.referral_code]
 * @param {string} payload.device
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const registerEmail = async (payload: {
  email: string;
  identity: string;
  resend: boolean;
  referral_code?: string;
  device: string;
}): Promise<ApiResponse<RegisterResponse>> => {
  return await handleApiRequest<RegisterResponse>(() =>
    api.post(SIGNUP_ENDPOINTS.EMAIL_SIGNUP, payload)
  );
};
/**
 * Check if Email already exists
 * @param {Object} query
 * @param {string} query.email
 * @param {boolean} query.is_edit
 * @returns {Promise<ApiResponse<{ message: string }>>}
 */
export const checkEmailAlreadyExists = async (query: {
  email: string;
  is_edit: boolean;
}): Promise<ApiResponse<{ message: string }>> => {
  return await handleApiRequest<{ message: string }>(() =>
    api.get(SIGNUP_ENDPOINTS.CHECK_EMAIL_ENDPOINT, {
      params: query,
    })
  );
};


/**
 * Verify Email OTP During Signup
 * @param {Object} payload
 * @param {string} payload.email
 * @param {number} payload.otp
 * @returns {Promise<ApiResponse<VerifyEmailResponse>>}
 */
export const verifySignupEmailOtp = async (payload: {
  email: string;
  otp: number;
}): Promise<ApiResponse<VerifyEmailResponse>> => {
  return await handleApiRequest<VerifyEmailResponse>(() =>
    api.post(SIGNUP_ENDPOINTS.VERIFY_EMAIL, payload)
  );
};

/**
 * Create Password After Signup
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.confirm_password
 * @param {string} payload.accessToken
 * @returns {Promise<ApiResponse<CreatePasswordResponse>>}
 */
export const createPassword = async (payload: {
  email: string;
  password: string;
  confirm_password: string;
  accessToken: string;
}): Promise<ApiResponse<CreatePasswordResponse>> => {
  return await handleApiRequest<CreatePasswordResponse>(() =>
    api.post(SIGNUP_ENDPOINTS.CREATE_PASSWORD, payload, {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    })
  );
};

/**
 * Create User Profile After Signup
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.gender
 * @param {string} payload.date_of_birth
 * @param {string} payload.lat
 * @param {string} payload.long
 * @param {string} payload.accessToken
 * @returns {Promise<ApiResponse<CreateProfileResponse>>}
 */
export const createProfile = async (payload: {
  name: string;
  gender: "Male" | "Female" | "Prefer Not to Say";
  date_of_birth: string;
  lat: string;
  long: string;
  accessToken: string;
}): Promise<ApiResponse<CreateProfileResponse>> => {
  const { accessToken, ...bodyData } = payload;
  return await handleApiRequest<CreateProfileResponse>(() =>
    api.post(SIGNUP_ENDPOINTS.CREATE_PROFILE, bodyData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
};

/**
 * Fetch Privacy Policy
 * @param {Object} payload
 * @param {string} payload.policy_type
 * @param {string} payload.accessToken
 * @returns {Promise<ApiResponse<{ legal_document: { description: string } }>>}
 */
export const fetchPrivacyPolicy = async (payload: {
  policy_type: string;
  accessToken: string;
}): Promise<ApiResponse<{ legal_document: { description: string } }>> => {
  return await handleApiRequest<{ legal_document: { description: string } }>(
    () =>
      api.get(SIGNUP_ENDPOINTS.PRIVACY_POLICY, {
        params: { policy_type: payload.policy_type },
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      })
  );
};

/**
 * Create or Check Username Availability
 * @param {Object} payload
 * @param {string} payload.username
 * @param {boolean} payload.check_available
 * @param {string} payload.accessToken
 * @returns {Promise<ApiResponse<{ message: string }>>}
 */
export const createOrCheckUsername = async (payload: {
  username: string;
  check_available: boolean;
  accessToken?: string;
}): Promise<ApiResponse<{ message: string }>> => {
  const { accessToken, ...bodyData } = payload;
  return await handleApiRequest<{ message: string }>(() =>
    api.post(SIGNUP_ENDPOINTS.CREATE_USERNAME, bodyData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  );
}

/**
 * Fetch superstar data based on search criteria.
 * @param {Object} params
 * @param {string} params.user_type
 * @param {number} params.page
 * @param {number | string} params.page_size
 * @param {string} params.keyword
 * @param {"exact_name_match" | "contain_name_match"} [params.search_type]
 * @param {string} [params.filter]
 * @param {string} params.accessToken
 * @returns {Promise<ApiResponse<SuperStarResponse>>}
 */
export const selectSuperStar = async ({ accessToken, ...queryParams }: {
  user_type: string;
  page: number;
  page_size: number | string;
  keyword: string;
  search_type?: "exact_name_match" | "contain_name_match";
  filter?: string;
  accessToken: string | null;
}): Promise<ApiResponse<SuperStarResponse>> => {
  return handleApiRequest<SuperStarResponse>(() =>
    api.get(SIGNUP_ENDPOINTS.SELECT_SUPERSTAR, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
};

/**
 * confirmSuperStar
 * @param {Object} payload
 * @param {number} payload.superstar_id
 * @param {string} payload.accessToken
 * @returns {Promise<ApiResponse<ConfirmSuperStarResponse>>}
 */
export async function confirmSuperStar(
  payload: {
    superstar_id:string,
    accessToken:string
  }
): Promise<ApiResponse<ConfirmSuperStarResponse>> {
  const { accessToken, superstar_id } = payload;

  return handleApiRequest<ConfirmSuperStarResponse>(() =>
    api.post(
      SIGNUP_ENDPOINTS.CONFIRM_SUPERSTAR, 
      { superstar_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  );
}