"use server";
import { SIGNIN_ENDPOINTS } from "@/constants/endpoints/auth";
import api from "../config/axios";
import { getRefreshToken, setTokens, removeTokens } from "./tokenService";

export const refreshToken = async (): Promise<string> => {
  try {
    const refresh = await getRefreshToken();

    if (!refresh) throw new Error("No refresh token available");
    const response = await api.post(
      SIGNIN_ENDPOINTS.REFRESH_TOKEN,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      }
    );

    if (!response.data?.result?.access_token) {
      throw new Error("Invalid refresh token response format");
    }
    const newAccessToken = response.data.result.access_token;
    setTokens(newAccessToken, refresh); 
    console.log("Access token refreshed successfully!");
    return newAccessToken;
  } catch (error) {
    console.error(
      "Failed to refresh token:",
      error instanceof Error ? error.message : error
    );
    removeTokens(); 
    throw error;
  }
};
