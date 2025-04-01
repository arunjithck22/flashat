"use client";
import { v1 as uuidv1 } from "uuid";
import CryptoJS from "crypto-js";

export function getUrlWithParam(url: string, params: Record<string, string>) {
  let newUrl = url;
  Object.keys(params).forEach((key: string) => {
    newUrl = `${newUrl.split(`:${key}`).join(params[key])}`;
  });

  console.log("new url", newUrl, params);
  return newUrl;
}
export function encryptId(id: string): string {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";
  const encryptedId = CryptoJS.AES.encrypt(String(id), secretKey).toString();
  return encodeURIComponent(encryptedId); // Encode for URL safety
}

export function decryptId(encryptedId: string): string | null {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";
  try {
    const decodedId = decodeURIComponent(encryptedId); // Decode before decrypting
    const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
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

export function getTimeBasedUUID(): string {
  // Generate a time-based UUID using the v1 function from the uuid library
  const uuid = uuidv1();

  return uuid;
}

export const formatDate = (newDate: string, seperator?: string) => {
  const date = new Date(newDate?.endsWith("Z") ? newDate : `${newDate}Z`);
  const day = String(date?.getDate()).padStart(2, "0");
  const month = String(date?.getMonth() + 1).padStart(2, "0"); // months are zero-indexed
  const year = date?.getFullYear();
  const formattedDate = seperator
    ? `${day}${seperator}${month}${seperator}${year}`
    : `${day}-${month}-${year}`;
  return formattedDate;
};

export function convertToAmPmFormat(
  dateTime: string,
  timeZone: string
): string {
  // Ensure the dateTime is treated as UTC
  const utcDate = new Date(dateTime.endsWith("Z") ? dateTime : `${dateTime}Z`);

  // Format the date object with the specified timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone, // Timezone-aware formatting
  });

  return formatter.format(utcDate);
}

export const convertDateToGMT = (inputDate: string) => {
  const [day, month, year] = inputDate.split("-");

  const date = new Date(`${year}-${month}-${day}`);

  return date;
};

export const getCroppedImg = (
  imageSrc: string,
  croppedAreaPixels: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get 2D context"));
        return;
      }

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          reject(new Error("Canvas is empty"));
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    };

    image.onerror = (error) => reject(error);
  });
};

export function getBrowserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
