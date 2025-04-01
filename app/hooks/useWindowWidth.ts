"use client"; // This line ensures the hook runs in client components

import { useState, useEffect } from "react";

// Custom hook to get the window width
export const useWindowWidth = () => {
  // State to hold the current window width
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Function to update the window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set the initial window width
    handleResize();

    // Add event listener for resize event
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Run once on mount

  return windowWidth; // Return the current window width
};
