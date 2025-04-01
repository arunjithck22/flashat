import { cookies } from "next/headers"; // Ensure you're using the correct import for cookies
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const cookieStore = cookies(); // Get the cookies object
  const locale = cookieStore.get("locale")?.value || "en";
  const language = cookieStore.get("languageName")?.value || "english"; // Get the locale cookie, default to 'en' if not set

  // You can now use the locale value
  return NextResponse.json(
    { message: "Locale fetched successfully", locale, language },
    { status: 200 }
  );
}
