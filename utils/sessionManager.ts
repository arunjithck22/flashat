"use server";
import { cookies } from "next/headers";
import Cryptr from "cryptr";
import { SECRET } from "@/common/constant";

const cryptr = new Cryptr(SECRET);

// 🔐 Encrypt session data
export async function encryptSession(data: string): Promise<string> {
  return cryptr.encrypt(data);
}

// 🔓 Decrypt session data
export async function decryptSession(data: string): Promise<string> {
  try {
    return cryptr.decrypt(data);
  } catch (error) {
    console.error("Error decrypting session:", error);
    return "";
  }
}

// ✅ Set multiple session cookies
export async function setSession({
  accessToken,
  refreshToken,
  userData,
}: {
  accessToken: string;
  refreshToken: string;
  userData: {
    user: number;
    profile: string | null;
    type: string;
    name: string;
    citizenShip: string;
  };
}) {
  const encryptedAccessToken = await encryptSession(accessToken);
  const encryptedRefreshToken = await encryptSession(refreshToken);
  const encryptedUser = await encryptSession(userData.user.toString());
  const encryptedProfile = userData.profile ? await encryptSession(userData.profile) : "";
  const encryptedType = await encryptSession(userData.type);
  const encryptedCitizenShip = await encryptSession(userData.citizenShip);
  const encryptedName = await encryptSession(userData.name);

  // ✅ Define cookie options
  const cookieOptions:any= {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000, // 10 years
  };

  // ✅ Set cookies correctly
  cookies().set("token", encryptedAccessToken, cookieOptions);
  cookies().set("refreshToken", encryptedRefreshToken, cookieOptions);
  cookies().set("user", encryptedUser, cookieOptions);
  cookies().set("profile", encryptedProfile ?? "default_profile_value", cookieOptions);
  cookies().set("type", encryptedType, cookieOptions);
  cookies().set("citizenShip", encryptedCitizenShip, cookieOptions);
  cookies().set("name", encryptedName, cookieOptions);

  console.log("✅ Session successfully set in cookies");
}

// 🛑 Clear all session cookies
export async function clearSession() {
  const sessionKeys = ["token", "refreshToken", "user", "profile", "type", "citizenShip", "name"];
  sessionKeys.forEach((key) => cookies().delete(key));
  console.log("✅ User session cleared successfully");
}

// 🟢 Retrieve stored session data
export async function getSession(): Promise<Record<string, string | null>> {
  return {
    token: cookies().get("token")?.value || null,
    refreshToken: cookies().get("refreshToken")?.value || null,
    user: cookies().get("user")?.value || null,
    profile: cookies().get("profile")?.value || null,
    type: cookies().get("type")?.value || null,
    citizenShip: cookies().get("citizenShip")?.value || null,
    name: cookies().get("name")?.value || null,
  };
}
