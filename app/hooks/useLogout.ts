"use client";
import { logout } from "@/actions/actions";
import { clearIndexedDB } from "@/indexedDB/clearDB";

export const useLogout = () => {
  // Function to handle the logout logic
  const logoutUser = async () => {
    try {
      await clearIndexedDB(); // Clear IndexedDB on the client side
      await logout(); // Call the logout function to clear cookies, etc.
      // Optionally log the result or message
    } catch (error) {
      console.error("Logout failed:", error); // Handle any errors during logout
    }
  };

  return { logoutUser };
};
