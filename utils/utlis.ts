"use server";
import { refreshToken } from "@/actions/auth/actions";
import { decryptSession } from "@/app/(auth)/signin/actions";
import { deleteDB } from "idb";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export async function authenticatedFetch(
  url: string,
  options: FetchOptions = {}
): Promise<Response | void> {
  try {
    let session = cookies().get("token")?.value;

    if (!session) {
      console.error("No session token found. Redirecting to login.");
      window.location.href = "/";
      return;
    }

    let token = await decryptSession(session);

    if (!token) {
      console.error("Failed to decrypt session token. Redirecting to login.");
      redirect("/");
      return;
    }

    // Proceed with the API call using the valid token
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error in authenticated fetch:", error);
    clearCookies();

    redirect("/");
  }
}

export async function fetchWithAutoRefresh(
  url: string,
  options: FetchOptions = {}
): Promise<Response | void> {
  const response = await authenticatedFetch(url, options);

  if (response && response.status === 401) {
    try {
      await refreshToken();
      return authenticatedFetch(url, options); // Retry with new token
    } catch (error) {
      console.error("Failed to refresh token after 401:", error);
      throw error; // Re-throw error to handle upstream
    }
  }

  return response;
}

export async function clearCookies(): Promise<void> {
  // **Clear all cookies except 'locale' and 'language'**
  const allCookies = cookies().getAll();

  for (const cookie of allCookies) {
    if (cookie.name !== "locale" && cookie.name !== "language") {
      cookies().set(cookie.name, "", { maxAge: -1 }); // Remove cookie by setting maxAge to -1
    }
  }
}
