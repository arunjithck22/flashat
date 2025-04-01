

import { toast } from "react-toastify";

export const showToast = (message: string, type: "success" | "error" | "info") => {
  toast(message, {
    type, // success, error, info
    position: "top-right", // Position of the toast
    autoClose: 3000, // Time after which the toast will close (3 seconds)
    hideProgressBar: true, // Hide progress bar
    closeOnClick: true, // Close on click
    pauseOnHover: true, // Pause the toast on hover
  });
};
