"use server";
import { cookies } from "next/headers";
import Cryptr from "cryptr";
import { SECRET } from "@/common/constant"; 

const cryptr = new Cryptr(SECRET);

export async function setToken(
  accessToken: string,
  refreshToken: string,
  data: { user: number; profile: string | null; type: string; name: string; citizenShip: string }
) {
  if (!accessToken || !refreshToken || !data) {
    throw new Error("Missing required parameters");
  }

  // Encrypt sensitive data before storing in cookies
  const encryptedAccessToken = await encryptSession(accessToken);
  const encryptedRefreshToken = await encryptSession(refreshToken);
  const encryptedUser = await encryptSession(JSON.stringify(data.user));
  const encryptedProfile = data.profile ? await encryptSession(data.profile) : "";
  const encryptedType = await encryptSession(data.type);
  const encryptedCitizenShip = await encryptSession(data.citizenShip);
  const encryptedName = await encryptSession(data.name);

  // Set encrypted cookies
  cookies().set("token", encryptedAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000, // 10 years
  });

  cookies().set("refreshToken", encryptedRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000,
  });

  cookies().set("user", encryptedUser, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    
    sameSite: "strict",
    maxAge: 315360000,
  });

  cookies().set("profile", encryptedProfile, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000,
  });

  cookies().set("type", encryptedType, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000,
  });

  cookies().set("citizenShip", encryptedCitizenShip, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000,
  });

  cookies().set("name", encryptedName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 315360000,
  });

  console.log("Encrypted tokens and user data successfully set in cookies");
}

// Function to encrypt session data (Converted to async)
export async function encryptSession(session: string): Promise<string> {
  return cryptr.encrypt(session);
}

// Function to decrypt session data (Converted to async)
export async function decryptSession(session: string): Promise<string> {
  try {
    console.log("Decrypting session:", session);
    const decrypted = cryptr.decrypt(session);
    console.log("Decrypted session:", decrypted);
    return decrypted;
  } catch (error) {
    console.error("Error decrypting session:", error);
    throw error;
  }
}
