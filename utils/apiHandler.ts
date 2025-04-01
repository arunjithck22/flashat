'use server'
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";

/**
 * Generic function to handle API requests with error handling
 * @param requestFunction Function that makes an API request
 * @returns Promise<ApiResponse<T>>
 */
export const handleApiRequest = async <T>(
  requestFunction: () => Promise<{ data: ApiResponse<T> }>
): Promise<ApiResponse<T>> => {
  try {
    const response = await requestFunction();
    // Ensure at least one expected field exists before treating it as an error
    if (!response.data.result && !response.data.message && !response.data.error) {
      throw new Error("Invalid API response: missing expected fields");
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("❌ API request failed:", error.response?.data || error.message);
      return (
        error.response?.data || {
          statusCode: 500,
          error: "Request failed. Please try again.",
        }
      );
    } else {
      console.error("❌ Unexpected error:", error);
      return { statusCode: 500, error: "An unexpected error occurred. Please try again." };
    }
  }
};
