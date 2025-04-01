"use server";

import api from "@/api/config/axios";
import { SIGNIN_ENDPOINTS } from "@/constants/endpoints/auth";
import {  getAccessToken, getRefreshToken, removeTokens } from "@/api/auth/tokenService";
import { ApiResponse } from "@/types/apiResponse";
import { ForgotResponse, GoogleLoginResponse, LoginResponse, LogoutResponse, PasswordResetResponse, VerifyOTPResponse } from "@/types/signIn";
import { handleApiRequest } from "@/utils/apiHandler";
import axios from "axios";
import { BASE_URL } from "@/api/config/apiConfig";


/**
 * Login Function
 * @param email 
 * @param phone 
 * @param country_code
 * @param password 
 * @returns {Promise<ApiResponse<LoginResponse>>}
 */
export const login = async ({
  email,
  phone,
  country_code,
  password,
}: {
  email?: string;
  phone?: string;
  country_code?: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> => {
  const payload: Record<string, string> = { password };
  if (email) payload.email = email;
  if (phone && country_code) {
    payload.phone = phone;
    payload.country_code = country_code;
  }
  return await handleApiRequest<LoginResponse>(() =>
    api.post(SIGNIN_ENDPOINTS.LOGIN, payload)
  );
};

/**
 * Logout Function
 * @returns {Promise<ApiResponse<LogoutResponse>>} 
 */
export const logout = async (): Promise<ApiResponse<LogoutResponse>> => {
  const accessToken = await getAccessToken(); 
    const refreshToken = await getRefreshToken(); 
  const response = await handleApiRequest<LogoutResponse>(() =>
    axios.post(
      `${BASE_URL}${SIGNIN_ENDPOINTS.LOGOUT}`,
      { access_token: accessToken },
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    )
  );
  if (response.result) {
    await removeTokens();
  }
  return response;
};

/**
 * forgot password
 * @param {Object} payload
 * @param {string} payload.email
 * @param {boolean} payload.resend
 * @returns {Promise<ApiResponse<RegisterResponse>>}
 */
export const forgotPassword = async (payload: {
  email: string;
  resend: boolean;
}): Promise<ApiResponse<ForgotResponse>> => {
  return await handleApiRequest<ForgotResponse>(() =>
    api.post(SIGNIN_ENDPOINTS.FORGOT_PASSWORD, payload)
  );
};

/**
 * verifyOtp
 * @param {Object} payload
 * @param {string} payload.email - The user's email address
 * @param {number} payload.otp - The one-time password (OTP)
 * @returns {Promise<ApiResponse<VerifyOTPResponse>>}
 */
export const verifyOtp = async (payload: {
  email: string;
  otp: number;
}): Promise<ApiResponse<VerifyOTPResponse>> => {
  return await handleApiRequest<VerifyOTPResponse>(() =>
    api.post(SIGNIN_ENDPOINTS.PASSWORD_VERIFY, payload)
  );
};

/**
 * Reset a user's password.
 * @param {Object} payload
 * @param {string} payload.email 
 * @param {string} payload.password
 * @param {string} payload.confirm_password 
 * @param {string} payload.accessToken 
 * @returns {Promise<ApiResponse<PasswordResetResponse>>}
 */
export const createNewPassword = async (payload: {
  email: string;
  password: string;
  confirm_password: string;
  accessToken: string;
}): Promise<ApiResponse<PasswordResetResponse>> => {
  const { accessToken, ...body } = payload;

  return handleApiRequest<PasswordResetResponse>(() =>
    api.post(SIGNIN_ENDPOINTS.PASSWORD_RESET, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
};


/**
 * GOOGLE LOGIN
 * @param {Object} payload
 * @param {boolean} payload.id_token
 * @returns {Promise<ApiResponse<GoogleLoginResponse>>}
 */
export const googleLogin = async (payload: {
  id_token: string;
}): Promise<ApiResponse<GoogleLoginResponse>> => {
  return await handleApiRequest<GoogleLoginResponse>(() =>
    api.post(SIGNIN_ENDPOINTS.GOOGLE_LOGIN, payload)
  );
};