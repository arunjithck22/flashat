export const HUDDLES_ENDPOINTS = {
  GET_PUBLIC_HUDDLES: "/huddles/public-huddles",
  GET_PUBLIC_HUDDLES_MESSAGES: (id: number) => `/huddles/public-huddles/${id}/messages`,
};
