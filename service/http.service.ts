"use server";
import { refreshToken } from "@/actions/auth/actions";
import { clearCookies } from "@/utils/utlis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptSession, encryptSession } from "./auth/signIn";

export async function post<T>(
  url: string,
  payload?: Record<string, unknown> | FormData,
  headers?: Record<string, string>,
  responseType?: string
): Promise<T | void | string> {
  console.log("privatePost called with URL:", url, "and payload:", payload);
  try {
    const language = cookies().get("languageName")?.value || "english";
    let token = headers?.Authorization?.replace("Bearer ", "") || null;
    if (!token) {
      const session = cookies().get("token")?.value;
      token = session ? await decryptSession(session) : null;
    }
    const requestHeaders: HeadersInit = {
      language: language,
     
      ...(payload instanceof FormData
        ? {}
        : { "content-type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    };
    const body =
      payload instanceof FormData ? payload : JSON.stringify(payload);
    const response = await fetch(url, {
      method: "POST",
      body,
      headers: requestHeaders,
    });

    if (response.ok) {
      return responseType === "text"
        ? await response.text()
        : await response.json();
    }

    if (response.status === 400) {
      const errorResponse = await response.json();
      console.error("POST request failed:", errorResponse);
      throw new Error(errorResponse?.message || "Bad Request");
    }

    if (response.status === 401) {
      console.warn("Token expired. Attempting to refresh token.");
      const newAccessToken = await refreshToken();
      if (!newAccessToken) {
        console.error("Failed to refresh token. Redirecting to login.");
        await clearCookies();
        redirect("/");
      }
      requestHeaders["Authorization"] = `Bearer ${newAccessToken}`;
      const retryResponse = await fetch(url, {
        method: "POST",
        body,
        headers: requestHeaders,
      });

      if (retryResponse.ok) {
        return await retryResponse.json();
      } else {
        console.error(
          "Retry request failed:",
          retryResponse.status,
          retryResponse.statusText
        );
        await clearCookies();
        redirect("/");
      }
    }
    console.error(
      "POST request failed:",
      response,
      response?.status,
      response?.statusText
    );
    if (response.status === 400 && url.includes("/login")) {
      return await response.json();
    }
    if (response && !response.ok) {
      const errorMessage = await response?.json();
      console.log("response error", response);
      throw new Error(JSON?.stringify(errorMessage));
      // Return the response for further handling
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in post:", error.message);
      throw new Error(error.message); // Re-throw the error for upstream handling
    } else {
      console.error("An unexpected error occurred", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function get({
  url,
  params,
  headers = {},
}: {
  url: string;
  params?: Record<string, string | number | unknown>;
  headers?: Record<string, string>;
}) {
  const query = params
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      )}`
    : "";
  const fullUrl = `${url}${query}`;
  try {
    const language = cookies().get("languageName")?.value || "english";
    const session = cookies().get("token")?.value;
    const token = session ? await decryptSession(session) : null;
    const requestHeaders: HeadersInit = {
      language: language, // Always include the language header
    
      ...headers, // Include any optional headers
    };

    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: requestHeaders,
    });

    console.log("response", response);
    if (response.status === 401) {
      console.log("we got unauthorized request");
      console.warn("Token expired. Attempting to refresh token.");
      const newAccessToken = await refreshToken();
      headers["Authorization"] = `Bearer ${newAccessToken}`;

      const retryResponse = await fetch(fullUrl, {
        method: "GET",
        headers: headers,
      });

      if (!retryResponse.ok) {
        console.error(
          "Retry GET request failed:",
          retryResponse.status,
          retryResponse.statusText
        );
        // await clearCookies(); // Clear cookies if retry fails
        // redirect("/");
      }

      return await retryResponse.json();
    }

    if (response && !response.ok) {
      const errorMessage = await response?.json();
      console.log("response error", response);
      throw new Error(JSON?.stringify(errorMessage));
      // Return the response for further handling
    }

    const json = await response.json();
    if (json) {
      console.log("Response from get", json);
    }

    return json; // Return the response for further handling
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in get:", error.message);
      throw new Error(error.message); // Re-throw the error for upstream handling
    } else {
      console.error("An unexpected error occurred", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function put(
  url: string,
  payload: Record<string, unknown>
): Promise<Response | void> {
  console.log("put called with URL:", url, "and payload:", payload);

  try {
    const language = cookies().get("languageName")?.value || "english";

    // Retrieve session token, if it exists
    const session = cookies().get("token")?.value;
    const token = session ? await decryptSession(session) : null;

    const headers: HeadersInit = {
      language: language,
      // Set content-type only for non-FormData payloads
      
      ...(payload instanceof FormData
        ? {}
        : { "content-type": "application/json" }),
    };

    // If token exists, include Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const body =
      payload instanceof FormData ? payload : JSON.stringify(payload);

    // Send the POST request
    const response = await fetch(url, {
      method: "PUT",
      body: body,
      headers: headers,
    });
    console.log("body data", body);
    if (response && response.ok) {
      const json = await response.json();
      console.log("putt response", json);
      return json;
      // Return the response for further handling
    }

    if (response.status === 401) {
      console.log("we got unauthorized request");
      console.warn("Token expired. Attempting to refresh token.");
      // Refresh the token and retry the request
      const newAccessToken = await refreshToken();
      headers["Authorization"] = `Bearer ${newAccessToken}`;

      const retryResponse = await fetch(url, {
        method: "PUT",
        body: body,
        headers: headers,
      });

      if (!retryResponse.ok) {
        console.error(
          "Retry GET request failed:",
          retryResponse.status,
          retryResponse.statusText
        );
        await clearCookies(); // Clear cookies if retry fails
        redirect("/");
      }

      return await retryResponse.json();
    }

    console.error(
      "PUT request failed:",
      response,
      response?.status,
      response?.statusText
    );
    if (response && !response.ok) {
      const errorMessage = await response?.json();
      console.log("response error", errorMessage);
      // throw new Error(errorMessage?.message);
      // Return the response for further handling
      return errorMessage;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in put:", error.message);

      // throw new Error(error.message); // Re-throw the error for upstream handling
    } else {
      console.error("An unexpected error occurred", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function del({
  url,
  params,
}: {
  url: string;
  params: Record<string, string | number | boolean | null | undefined>;
}): Promise<Response | void> {
  console.log("delete called with URL:", url);
  const query = params
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      )}`
    : "";
  const fullUrl = `${url}${query}`; // Complete URL with query parameters
  console.log("full url", fullUrl);

  try {
    const language = cookies().get("languageName")?.value || "english";

    // Retrieve session token, if it exists
    const session = cookies().get("token")?.value;
    const token = session ? await decryptSession(session) : null;

    const headers: HeadersInit = {
      language: language,
    
      // Set content-type only for non-FormData payloads
    };

    // If token exists, include Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Send the DELETE request
    const response = await fetch(fullUrl, {
      method: "DELETE",

      headers: headers,
    });

    if (response && response.ok) {
      const json = await response.json();
      console.log("delete response", json);
      return json; // Return the response for further handling
    }
    if (response.status === 401) {
      console.log("we got unauthorized request");
      console.warn("Token expired. Attempting to refresh token.");
      // Refresh the token and retry the request
      const newAccessToken = await refreshToken();
      headers["Authorization"] = `Bearer ${newAccessToken}`;

      const retryResponse = await fetch(fullUrl, {
        method: "DELETE",

        headers: headers,
      });

      if (!retryResponse.ok) {
        console.error(
          "Retry GET request failed:",
          retryResponse.status,
          retryResponse.statusText
        );
        await clearCookies(); // Clear cookies if retry fails
        redirect("/");
      }

      return await retryResponse.json();
    }

    console.error(
      "DELETE request failed:",
      response,
      response?.status,
      response?.statusText
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in delete:", error.message);
      throw new Error(error.message); // Re-throw the error for upstream handling
    } else {
      console.error("An unexpected error occurred", error);
      throw new Error("An unknown error occurred");
    }
  }
}

// export async function publicGet(url: string, params?: any) {
//   const language = cookies().get("languageName")?.value;
//   const response = fetch(`${url}?${new URLSearchParams(params)}`, {
//     method: "GET",
//     headers: {
//       "content-type": "Application/json",
//       language: language || "en",
//     },
//   });
//   if (!response.ok) {
//     console.error("GET request failed:", response.status, response.statusText);
//     throw new Error(response.statusText);
//   }
//   const json = await response.json();
//   if (json) {
//     console.log("Response from get", json);
//   }

//   return json;
// }

export async function verifyToken({
  url,
  access_token,
}: {
  url: string;
  access_token: string;
}) {
  console.log("fetch url", url);

  try {
    // If token exists, include Authorization header

    // Send the GET request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Check if the response is valid
    if (!response.ok) {
      console.error(
        "GET request failed:",
        response.status,
        response.statusText
      );
      throw new Error(response.statusText);
    }
    const json = await response.json();
    if (json) {
      console.log("login response new", json);
      const token = await encryptSession(access_token);
      const refreshToken = await encryptSession(access_token);
      const user = await encryptSession(JSON.stringify(json?.id));
      const profile = await json?.profile.user_profile_photo;
      const type = await json?.user_membership;
      const name = await json.user_name;
      const citizenShip = await json?.user_citizenship;
      cookies().set("token", token, {
        httpOnly: true,
        maxAge: 315360000,
      });
      cookies().set("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 315360000,
      });
      cookies().set("user", user, {
        httpOnly: true,
        maxAge: 315360000,
      });
      cookies().set("profile", profile, {
        httpOnly: true,
        maxAge: 315360000,
      });
      cookies().set("type", type, {
        httpOnly: true,
        maxAge: 315360000,
      });
      cookies().set("citizenShip", citizenShip, {
        httpOnly: true,
        maxAge: 315360000,
      });
      cookies().set("name", name, {
        httpOnly: true,
        maxAge: 315360000,
      });
      console.log("Response from verify", json);
    }

    return json; // Return the response for further handling
  } catch (error) {
    console.error("Error in   verify token quest:", error);
    throw error; // Re-throw the error for upstream handling
  }
}

export async function getUrlWithParam(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any
) {
  let newUrl = url;
  Object.keys(params).forEach((key: string) => {
    newUrl = `${newUrl.split(`:${key}`).join(params[key])}`;
  });
  return newUrl;
}
