import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Parse the locale from the URL query parameters
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en"; // Default to 'en' if no locale is provided

  // Full language name mapping
  const languageNames: { [key: string]: string } = {
    en: "english",
    ar: "arabic",
    fr: "french",
    // Add more mappings here as needed
  };

  const languageName = languageNames[locale] || "English"; // Default to "English" if not found

  // Create a response with the JSON message
  const response = NextResponse.json({
    message: "Locale cookie set successfully",
  });

  // Set the locale and languageName cookies for 30 days
  response.cookies.set({
    name: "locale",
    value: locale,
    maxAge: 315360000, // 30 days in seconds
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  response.cookies.set({
    name: "languageName",
    value: languageName,
    maxAge: 315360000, // 30 days in seconds
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
