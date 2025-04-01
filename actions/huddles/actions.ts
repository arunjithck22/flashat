"use server";
import { BASE_URL, CREATE_POST_URL, SIGNED_URL } from "@/common/constant";
import { post, get, put } from "@/service/http.service";

export async function getHuddle(id: string) {
  try {
    const res = await get({ url: `${BASE_URL}/huddles/${id}` });
    console.log("resp", res);

    if (res) {
      return res;
    } else {
      console.log(`Failed to fetch huddle. Status: ${res.status}`);
    }
  } catch (error) {
    console.error(`Error fetching huddle with id ${id}:`, error);
  }
  return;
}

export const getHuddlePost = async ({
  url,
  params,
}: {
  url: string;
  params?: Record<string, string | unknown>;
}) => {
  try {
    const response = await get({
      url: url,
      params,
    });
    // const data = await response.json();
    // console.log("download response ", data);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in delete:", error.message);
      throw new Error(error.message); // Re-throw the error for upstream handling
    } else {
      console.error("An unexpected error occurred", error);
      throw new Error("An unknown error occurred");
    }
  }
};

export async function createHuddlePost({
  huddleId,
  body,
}: {
  huddleId: string | null;
  body: Record<string, string | unknown>;
  type?: string;
  id?: string;
}) {
  const url = getUrlWithParam(CREATE_POST_URL, { huddleId });
  console.log("huddles-url", url);
  const reponse = await post(url, body);
  console.log("create post res", reponse);

  if (reponse) {
    console.log("created post");
    // revalidatePath(`/huddles/${type}/${id}`);
  } else {
    return reponse;
  }
}
export async function editHuddlePost({
  huddleId,
  body,
}: {
  huddleId: string | null;
  body: Record<string, string | unknown>;
}) {
  const url = getUrlWithParam(CREATE_POST_URL, { huddleId });
  console.log("huddles-url", url);
  const reponse = await put(url, body);
  console.log("edit post res", reponse);

  if (reponse?.status === 200) {
    console.log("created post");
    // revalidatePath(`/huddles/${type}/${id}`);
  } else {
    return reponse;
  }
}

export const getMedia = async (messageId: string, room_id: string) => {
  try {
    const url = getUrlWithParam(SIGNED_URL, { messageId });
    const response = await get({
      url: url,
      params: {
        room_id: room_id,
      },
    });
    // const data = await response.json();
    // console.log("download response ", data);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUrlWithParam(url: string, params: any) {
  let newUrl = url;
  Object.keys(params).forEach((key: string) => {
    newUrl = `${newUrl.split(`:${key}`).join(params[key])}`;
  });
  return newUrl;
}
