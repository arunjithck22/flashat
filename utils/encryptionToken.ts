"use server";
import Cryptr from "cryptr";
import { SECRET } from "@/common/constant";

const cryptr = new Cryptr(SECRET);

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
