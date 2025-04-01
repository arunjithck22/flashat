"use server";

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getAccessToken,  removeTokens } from "../auth/tokenService";
import { BASE_URL, API_TIMEOUT, HEADERS } from "../config/apiConfig";
import { refreshToken } from "../auth/RefreshTokens";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create Axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: HEADERS,
});

// Request Interceptor (Attach Token)
api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const token = await getAccessToken();
    console.log(`\n🚀 [Axios Request]`);
    console.log(`URL: [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
    console.log("Query Params:", config.params);
    console.log(`Headers:`, { ...config.headers, Authorization: `Bearer ${token}` });
    console.log(`Body:`, config.data);

    console.log("🔍 Access Token Before Request:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }else{
      console.error("🚨 No access token found!");
    }
    config._retry = config._retry ?? false;
    return config;
  },
  (error) => {
    console.error("❌ Request Setup Error:", error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor (Auto Refresh Token)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`\n✅ [Axios Response Success]`);
    console.log(`URL: ${response.config.url}`);
    console.log(`Status:`, response.status);
    console.log(`Response Data:`, response.data);
    return response
  },
  
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Handle Unauthorized Errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the failed request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        removeTokens(); // Clear tokens if refresh fails
        return Promise.reject(refreshError);
      }
    }

    console.error(
      "API response error:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject(error);
  }
);

export default api;
