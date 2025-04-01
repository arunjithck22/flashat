"use server";

import {
  AWS_S3_CONFIG_URL,
  VERIFY_USER_FROM_REDIRECT_URL,
} from "@/common/constant";
import { get, verifyToken } from "@/service/http.service";
import { cookies } from "next/headers";

export const verifyUser = async (token: string) => {
  try {
    const url = VERIFY_USER_FROM_REDIRECT_URL;
    const response = await verifyToken({
      url: url,
      access_token: token,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAwsCredentials = async () => {
  try {
    const response = await get({
      url: `${AWS_S3_CONFIG_URL}/user/video_secrets`,
    });

    // const data = await response.json();
    // console.log("aws credentials", data);

    return response;
  } catch (error) {
    console.error("Failed to fetch AWS credentials", error);
    throw error;
  }
};

export const logout = async () => {
  // Clear all cookies on the server
  const allCookies = cookies().getAll();

  for (const cookie of allCookies) {
    if (cookie.name !== "locale" && cookie.name !== "language") {
      cookies().set(cookie.name, "", { maxAge: -1 }); // Remove cookie by setting maxAge to -1
    }
  }

  return {
    success: true,
    message: "Logged out successfully",
  };
};
