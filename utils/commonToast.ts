"use client";

import { toast, ToastPosition, ToastOptions } from "react-toastify";

export const commonToast = ({
  message,
  type = "success", // Default type
  position = "bottom-right", // Default position
  icon,
  rtl,
}: {
  message: string;
  type?: "success" | "error" | "info" | "warning"; // Define toast types
  position?: ToastPosition; // Define position
  icon?: JSX.Element; // Optional custom icon
  rtl: boolean;
}) => {
  console.log("rtl ", rtl);
  const toastOptions: ToastOptions = {
    position: !rtl ? `bottom-right` : "bottom-left",
    icon: icon || undefined,
    hideProgressBar: true,
    closeOnClick: true,
    style: {
      backgroundColor: "#d5d2d2", // Background color
      color: "black",
      fontSize: "14px",
      display: "flex",
    },

    rtl: rtl, // Use the passed icon or default to none
  };

  switch (type) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "info":
      return toast.info(message, toastOptions);
    case "warning":
      return toast.warning(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};
