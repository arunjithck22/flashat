import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

import { BASE_URL } from "./common/constant";
import { encryptSession } from "./service/auth/signIn";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      try {
        // Make the API call to your backend with the Google ID token
        const response = await fetch(`${BASE_URL}/login/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_token: account?.id_token,
          }),
        });

        // Check if the response was successful
        if (!response.ok) {
          throw new Error("Failed to save user data to the database");
        }

        // Parse the response JSON
        const responseData = await response.json();
        const token = await encryptSession(responseData.result?.access_token);
        const userId = await encryptSession(
          JSON.stringify(responseData?.result?.user?.id)
        );
        const profile = responseData?.result?.user?.profile.user_profile_photo;

        // Set the cookies with encrypted values
        cookies().set("token", token, { httpOnly: true, maxAge: 86400 });
        cookies().set("user", userId, { httpOnly: true });
        cookies().set("profile", profile, { httpOnly: true });

        return true; // Allow sign-in to proceed
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Deny sign-in if an error occurs
      }
    },
  },
});
