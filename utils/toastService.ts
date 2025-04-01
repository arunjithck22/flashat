/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ToastPosition, toast } from "react-toastify";
import { ReactNode } from "react";

function success({
  message,
  position,
  icon,
  hideProgressBar = true,
}: {
  message: string;
  position?: ToastPosition;
  icon?: any;
  hideProgressBar?: boolean;
}) {
  const toastId = toast.success(message, {
    position,
    icon: icon,
    hideProgressBar: hideProgressBar, // Force type assertion to bypass TS error
  });
  return toastId;
}

function error({
  message,
  position,
  icon,
  hideProgressBar = true,
}: {
  message: string;
  position?: ToastPosition;
  icon?: ReactNode;
  hideProgressBar?: boolean;
}) {
  const toastId = toast.error(message, {
    position,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: icon as any, // Force type assertion
    hideProgressBar: hideProgressBar,
  });
  return toastId;
}

function dismiss(toastId: string) {
  toast.dismiss(toastId);
}

export const notification = {
  success,
  error,
  dismiss,
};
