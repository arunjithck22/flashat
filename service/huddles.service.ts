'use server'
import { ApiResponse } from "@/types/apiResponse";
import { HuddleMessagesResult, PaginatedHuddles } from "@/types/huddles";
import { handleApiRequest } from "@/utils/apiHandler";
import api from "@/api/config/axios";
import { HUDDLES_ENDPOINTS } from "@/constants/endpoints/huddles";

/**
 * Get public huddles
 * @param {Object} queryParams
 * @param {number} queryParams.page - Page number
 * @param {number | string} queryParams.page_size - Items per page
 * @returns {Promise<ApiResponse<PaginatedHuddles>>}
 */
export const getPublicHuddles = async (
  queryParams: {
    page: number;
    page_size: number | string;
  }
): Promise<ApiResponse<PaginatedHuddles>> => {
  return handleApiRequest<PaginatedHuddles>(() =>
    api.get(HUDDLES_ENDPOINTS.GET_PUBLIC_HUDDLES, {
      params: queryParams,
    })
  );
};

/**
 * Get messages from a public huddle by ID
 * @param {number} id - Huddle ID
 * @returns {Promise<ApiResponse<HuddleMessagesResult>>}
 */
export const getPublicHuddlesMessages = async (
    id: number
  ): Promise<ApiResponse<HuddleMessagesResult>> => {
    return handleApiRequest<HuddleMessagesResult>(() =>
      api.get(HUDDLES_ENDPOINTS.GET_PUBLIC_HUDDLES_MESSAGES(id))
    );
  };
