"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OnlineStatusContextType {
  isOnline: boolean;
}

const OnlineStatusContext =
  createContext<OnlineStatusContextType | undefined>(undefined);

export const OnlineStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(window.navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      // Attach event listeners for online/offline status
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return (
    <OnlineStatusContext.Provider value={{ isOnline }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = (): OnlineStatusContextType => {
  const context = useContext(OnlineStatusContext);
  if (!context) {
    throw new Error(
      "useOnlineStatus must be used within an OnlineStatusProvider"
    );
  }
  return context;
};
