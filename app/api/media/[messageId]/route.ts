import { SIGNED_URL } from "@/common/constant";
import { get, getUrlWithParam } from "@/service/http.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
  const { params } = context;
  console.log(request);
  const url = await getUrlWithParam(SIGNED_URL, {
    messageId: params.messageId,
  });
  return get({ url });
}
