// /app/api/some-endpoint/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/app/(auth)/signin/actions";

// Define the type for the request if needed
export async function GET(): Promise<NextResponse> {
  const cookieStore = cookies(); // Get the cookies object
  const tokenCookieValue = cookieStore.get("accessToken")?.value || null;
  const token = tokenCookieValue
    ? await decryptSession(tokenCookieValue)
    : null; // Get the token cookie
  const userCookieValue = cookieStore.get("user")?.value;
  const user = userCookieValue ? await decryptSession(userCookieValue) : null;
  const profile = cookieStore.get("profile")?.value || "";
  const type = cookieStore.get("type")?.value || "";
  const citizenShip = cookieStore.get("citizenShip")?.value || "";
  const name = cookieStore.get("name")?.value;

  // You can now use the token and user values
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized", user: "", token: "" },
      { status: 401 }
    );
  }

  // Example response
  return NextResponse.json({
    message: "Success",
    token,
    user,
    profile,
    type,
    citizenShip,
    name,
  });
}
