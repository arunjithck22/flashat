"use server";

import Cryptr from "cryptr";

import { signIn } from "@/auth";
import { SECRET } from "@/common/constant";

const cryptr = new Cryptr(SECRET);

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

export async function signinWithGoogle() {
  const response = await signIn("google", { callbackUrl: "/huddles/public" });
  console.log("223333Response:", response);
  // You may also inspect if response.ok is true or handle errors
}

// export async function login(
//   prevState: {
//     message: string;
//     phone?: string;
//     countryCode?: string;
//     result?: {
//       user?: User;
//     };
//   },
//   formData: FormData
// ) {
//   console.log("formdata", formData);
//   const data = {
//     email: formData.get("name") || "",
//     password: formData.get("password") || "",
//     phone: formData.get("phone") || "",
//     country_code: formData.get("countryCode") || "",
//   };
//   try {
//     const json = await post(`${BASE_URL}/login`, data);

//     if (json?.result) {
//       const token = await encryptSession(json.result?.access_token);
//       const refreshToken = await encryptSession(json.result?.refresh_token);
//       const user = await encryptSession(JSON.stringify(json?.result?.user?.id));
//       const name = await json?.result?.user?.user_name;
//       const profile = await json?.result?.user?.profile.user_profile_photo;
//       const type = await json?.result?.user?.user_membership;
//       const citizenShip = await json?.result?.user?.user_citizenship;
//       cookies().set("token", token, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       cookies().set("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       cookies().set("user", user, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       cookies().set("profile", profile, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       cookies().set("type", type, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       cookies().set("citizenShip", citizenShip, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       cookies().set("name", name, {
//         httpOnly: true,
//         maxAge: 315360000,
//       });
//       console.log("response profile", json?.result?.user?.profile);
//       return { ...prevState, message: "" };
//     } else {
//       return {
//         ...prevState,
//         message: json?.message || "Incorrect Username or Password",
//       };
//     }
//   } catch (err) {
//     console.log("login error", err);
//     return {
//       ...prevState,
//       message: "Incorrect Username or Password",
//     };
//   }
// }

export async function encryptSession(session: string) {
  return cryptr.encrypt(session);
}

export async function decryptSession(session: string) {
  try {
    console.log("121212Decrypting session:", session);
    const decrypted = cryptr.decrypt(session);
    console.log("121212Decrypted session:", decrypted);
    return decrypted;
  } catch (error) {
    console.error("121212Error decrypting session:", error);
    // await clearCookies();
    // redirect("/");
    throw error; // Re-throw error to be handled in calling code
  }
}
