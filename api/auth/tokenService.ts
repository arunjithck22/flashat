"use server";
import { cookies } from "next/headers";
import Cryptr from "cryptr";
import { SECRET } from "@/common/constant"; 
const cryptr = new Cryptr(SECRET);

// 🔐 Encrypt and Store Access & Refresh Tokens
export const setTokens = async (
  accessToken: string,
  refreshToken: string,
  userId?: string,
  profilePhoto?: string,
  membership?: string,
  citizenship?: string,
  username?: string
): Promise<void> => {
  try {
    const encryptedAccessToken = cryptr.encrypt(accessToken);
    const encryptedRefreshToken = cryptr.encrypt(refreshToken);

    const cookieOptions = {
      httpOnly: true,
      maxAge: 315360000,
    };
    await cookies().set("accessToken", encryptedAccessToken, cookieOptions);
    await cookies().set("refreshToken", encryptedRefreshToken, cookieOptions);
  
    if (userId) {
      const encryptedUserId = cryptr.encrypt(userId);
      await cookies().set("user", encryptedUserId, cookieOptions);
    }
    if (profilePhoto)await cookies().set("profile", profilePhoto, cookieOptions);
    if (membership) await cookies().set("type", membership, cookieOptions);
    if (citizenship) await cookies().set("citizenship", citizenship, cookieOptions);
    if (username) await cookies().set("name", username, cookieOptions);
  } catch (error) {
    console.error("Error setting tokens and user data:", error);
  }
};

// 🔓 Get and Decrypt Access Token
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const encryptedToken = await cookies().get("accessToken")?.value;
    if (!encryptedToken) return null;

    const decryptedToken = cryptr.decrypt(encryptedToken);
    return typeof decryptedToken === "string" ? decryptedToken : null;
  } catch (error) {
    console.error("Error decrypting access token:", error);
    return null;
  }
};
// 🔓 Get and Decrypt Refresh Token
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const encryptedToken = await cookies().get("refreshToken")?.value;
    if (!encryptedToken) return null;

    return cryptr.decrypt(encryptedToken);
  } catch (error) {
    console.error("Error decrypting refresh token:", error);
    return null;
  }
};
// ❌ Remove Tokens (Logout)
export const removeTokens = async (): Promise<void> => {
  try {
    await cookies().delete("accessToken");
    await cookies().delete("refreshToken");
    await cookies().delete("user");
    await cookies().delete("profile");
    await cookies().delete("type");
    await cookies().delete("citizenship");
    await cookies().delete("name");
  } catch (error) {
    console.error("Error removing tokens:", error);
  }
};
