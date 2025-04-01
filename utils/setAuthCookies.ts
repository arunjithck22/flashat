// pages/api/setAuthCookies.ts
import { NextApiRequest, NextApiResponse } from "next";
import Cryptr from "cryptr";
import { SECRET } from "@/common/constant";

const cryptr = new Cryptr(SECRET);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
      return res.status(400).json({ error: "Missing tokens" });
    }

    const encryptedAccessToken = cryptr.encrypt(accessToken);
    const encryptedRefreshToken = cryptr.encrypt(refreshToken);

    res.setHeader("Set-Cookie", [
      `token=${encryptedAccessToken}; HttpOnly; Path=/; Max-Age=315360000; Secure; SameSite=Strict`,
      `refreshToken=${encryptedRefreshToken}; HttpOnly; Path=/; Max-Age=315360000; Secure; SameSite=Strict`,
    ]);

    console.log("✅ Tokens set in cookies via API");

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error setting auth cookies via API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
