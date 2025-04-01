"use server";

import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value || "";

  const isRootOrHuddles =
    request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/huddle";

  const isPublicHuddles =
    request.nextUrl.pathname.startsWith("/huddle/huddle");

  const isSpecificPublicHuddle = request.nextUrl.pathname.match(
    /^\/huddles\/public\/\d+$/
  ); // Matches /huddles/public/[id] pattern

  // Redirect to /huddles/public if no token and requesting the root or /huddles
  if (!token && (isRootOrHuddles || !isPublicHuddles)) {
    return NextResponse.redirect(new URL("/huddle/huddle", request.url));
  }

  // Redirect to /huddles/user_managed if token exists and requesting root, /huddles, or /huddles/public
  if (token && (isRootOrHuddles || isPublicHuddles)) {
    return NextResponse.redirect(new URL("/huddles/user_managed", request.url));
  }
  if (token && request.nextUrl.pathname === "/podiums") {
    return NextResponse.redirect(new URL("/podiums/live-podiums", request.url));
  }

  // Additional redirect if token exists and user requests /huddles/public/[id]
  if (token && isSpecificPublicHuddle) {
    return NextResponse.redirect(new URL("/huddles/user_managed", request.url));
  }

  // No redirection otherwise
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/huddles",
    "/huddles/(.*)",
    "/huddles/public/(.*)",
    "/buy-COiNS",
    "/buy-FLiX",
    "/FLiX-purchase-history",
    "/COiNS-purchase-history",
    "/profile",
    "/user-relations/(.*)",
    "/podiums",
    "/podiums/(.*)",
    "/dashboard",
    "/huddle/(.*)",


    
  ], // Matches root path and /huddles/public
};
