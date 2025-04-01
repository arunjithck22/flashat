export const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST;

export const API_TIMEOUT = 10000; 

export const HEADERS = {
  "Content-Type": "application/json",
};
