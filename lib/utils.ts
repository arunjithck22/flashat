import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  // Optional: Include hours if duration is longer
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(
      remainingMinutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }
};
