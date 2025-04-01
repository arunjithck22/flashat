/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);

  // Fetch token from the API on component mount
  const { token, fetchAuth } = useAuth();
  useEffect(() => {
    fetchAuth();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchAccess = async () => {
        try {
          const response = await fetch("/api/cookies");

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setAccessToken(data?.token);
          // Handle the fetched data as needed
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error in post:", error.message);
            throw new Error(error.message); // Re-throw the error for upstream handling
          } else {
            console.error("An unexpected error occurred", error);
            throw new Error("An unknown error occurred");
          }
        }
      };

      fetchAccess(); // Call the async function to fetch data
    }
  }, [token]);

  useEffect(() => {
    if (accessToken) {
      const newSocket = io(URL, {
        auth: { token: `Bearer ${accessToken}` },
        path: "/messej",
        transports: ["websocket"],
        forceNew: true,
        secure: URL.startsWith("https"),
        reconnection: true,
        reconnectionAttempts: 5,
        autoConnect: true,
        withCredentials: true,
      });
      newSocket.connect();

      setSocket(newSocket);

      // Handle reconnections
      newSocket.on("connect_error", (err: unknown) => {
        if(err instanceof Error)
        console.error("Socket connection error:", err.message);
      });

      return () => {
        newSocket.disconnect(); // Cleanup socket on unmount
      };
    }
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.connect();

      // Handle socket connection errors
      socket.on("connect_error", (err: unknown) => {
        if(err instanceof Error)
        console.error("Socket connect_error:", err.message);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  return { socket };
};
