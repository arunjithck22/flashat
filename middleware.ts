"use server";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value || "";
  const path = request.nextUrl.pathname;

  const isRoot = path === "/";
  const isHuddleRoot = path === "/huddle";
  const isProtectedRoute =
    path.startsWith("/huddle/my_huddles") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/podiums") ||
    path.startsWith("/profile") ||
    path.startsWith("/user-relations");

  // 🛑 If user is NOT logged in and trying to access a protected route
  if (!token && (isRoot || isProtectedRoute)) {
    return NextResponse.redirect(new URL("/huddle", request.url));
  }

  // ✅ If user IS logged in and is on root or public huddle, send to my_huddles
  if (token && (isRoot || isHuddleRoot)) {
    return NextResponse.redirect(new URL("/huddle/my_huddles", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/huddle",
    "/huddle/(.*)",
    "/dashboard",
    "/profile",
    "/user-relations/(.*)",
    "/podiums",
    "/podiums/(.*)",
  ],
};
