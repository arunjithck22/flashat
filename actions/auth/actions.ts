"use server";

import { BASE_URL } from "@/common/constant";
import { decryptSession, encryptSession } from "@/service/auth/signIn";

import { cookies } from "next/headers";

export async function refreshToken() {
  try {
    const session = cookies().get("refreshToken")?.value;
    const refreshToken = await decryptSession(session?.toString() || "");
    if (!refreshToken) {
      throw new Error("No refresh token found.");
    }

    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      body: "",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token.");
    }

    const json = await response.json();
    console.log("we got json", json);

    const newAccessToken = await encryptSession(json.result?.access_token);
    // const newRefreshToken = await encryptSession(json.result?.refresh_token);

    cookies().set("token", newAccessToken, {
      httpOnly: true,
      maxAge: 315360000,
    });
    // cookies().set("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   maxAge: 315360000,
    // });

    // console.log("Token refreshed successfully.");
    return json.result?.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // await clearCookies();

    throw error;
  }
}
