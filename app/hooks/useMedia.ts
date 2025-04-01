"use client";

import {
  getImageFromCache,
  saveImageToCache,
} from "@/indexedDB/huddles/indexedDB";

import { useState } from "react";
import { getMedia } from "../../actions/huddles/actions";
// const geMedia = (messageId: string, room_id: string): Promise<any> => {
//   const url = getUrlWithParam(SIGNED_URL, { messageId });
//   return fetch(`${url}?room_id=${room_id}`);
// };
export const useMedia = (messageId: string, room_id: string) => {
  const [data, setData] = useState<string | null>(null);
  const [cached, setCached] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fetchFromCache = async () => {
    try {
      const cachedUrl = await getImageFromCache(messageId);
      if (cachedUrl) {
        setData(cachedUrl); // Set cached URL directly
        setStatus("success");
        return true; // Return true if cache is hit
      }
      return false; // Return false if no cache is found
    } catch (error) {
      console.error("Failed to fetch from cache:", error);
      setStatus("error");
      return false; // Return false if cache fetch fails
    }
  };

  // Function to fetch the media URL from the API
  const fetchFromAPI = async () => {
    try {
      setStatus("loading"); // Start loading
      const response = await getMedia(messageId, room_id); // Assuming getMedia is your API call
      console.log("client response ", response.result?.mediaUrl);

      const mediaUrl = response.result?.mediaUrl;
      if (mediaUrl) {
        setData(mediaUrl);
        // Save the URL to the cache using the messageId as the key
        await saveImageToCache(messageId, mediaUrl);
        setStatus("success");
        setCached(true); // Set status to success after data is loaded
      } else {
        setStatus("error"); // If no media URL found
        setCached(false);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
      setStatus("error"); // Set status to error if the request fails
      setCached(false);
    }
  };

  return { data, status, fetchFromAPI, fetchFromCache, cached };
};
