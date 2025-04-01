"use server";
import { cookies } from "next/headers";
import Cryptr from "cryptr";
import { BASE_URL, SECRET } from "@/common/constant";
import { post } from "@/service/http.service";
import { LoginResponse } from "@/types/register";
const cryptr = new Cryptr(SECRET);
export async function login(
  formData: FormData
) {
  const data = {
    email: formData.get("name") || "",
    password: formData.get("password") || "",
    phone: formData.get("phone") || "",
    country_code: formData.get("countryCode") || "",
  };
  try {
    const response = (await post(`${BASE_URL}/web-login`, data)) as LoginResponse;
    if (!response || !response.result) {
      console.error("API Error:", response);
      return { message: response?.message || "Login failed. Please check your credentials." };
    }
    if (response?.result?.user?.profile_checkpoint === 0) {
      const encryptedToken = await encryptSession(response.result.access_token);
      const encryptedRefreshToken = await encryptSession(response.result.refresh_token);
      const encryptedUserId = await encryptSession(response.result.user.id.toString());
      cookies().set("token", encryptedToken, { httpOnly: true, maxAge: 315360000 });
      cookies().set("refreshToken", encryptedRefreshToken, { httpOnly: true, maxAge: 315360000 });
      cookies().set("user", encryptedUserId, { httpOnly: true, maxAge: 315360000 });
      cookies().set("profile", response.result.user.profile.profile_photo, { httpOnly: true, maxAge: 315360000 });
      cookies().set("type", response.result.user.membership, { httpOnly: true, maxAge: 315360000 });
      cookies().set("citizenShip", response.result.user.citizenship, { httpOnly: true, maxAge: 315360000 });
      cookies().set("name", response.result.user.username, { httpOnly: true, maxAge: 315360000 });
    }
    return response; 
  } catch (err) {
    let errorMessage = "Network error. Please try again later.";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMessage = (err as { message: string }).message;
    }
console.log(err);

    return { message: errorMessage };
  }
}

export async function encryptSession(session: string) {
  return cryptr.encrypt(session);
}

export async function decryptSession(session: string) {
  try {
    console.log("Decrypting session:", session);
    return cryptr.decrypt(session);
  } catch (error) {
    console.error("Error decrypting session:", error);
    throw error;
  }
}
