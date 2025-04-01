/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { decryptSession } from "@/app/(auth)/signin/actions";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const URL = process.env.NEXT_PUBLIC_PODIUM_SOCKET_URL || "";

const PodiumSocketContext = createContext<any>(null);

export const PodiumSocketProvider = ({ children }: any) => {
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
            console.error("Error in podium socket:", error.message);
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
        path: "",
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
      console.log("new socket", newSocket);

      // Handle reconnections
      newSocket.on("connect_error", (err: any) => {
        console.error("Socket connection error:", err.message);
      });
      newSocket.on("connect", () => {
        console.log("Socket connected pdoium:", newSocket);
      });

      // return () => {
      //   newSocket.disconnect(); // Cleanup socket on unmount
      // };
    }
  }, [accessToken]);

  return (
    <PodiumSocketContext.Provider value={socket}>
      {children}
    </PodiumSocketContext.Provider>
  );
};

export const usePodiumSocket = () => {
  const socket = useContext(PodiumSocketContext);

  useEffect(() => {
    if (socket) {
      socket.connect();

      // Handle socket connection errors
      socket.on("connect_error", (err: any) => {
        console.error("Socket connect_error:", err.message);
      });

      // return () => {
      //   socket.disconnect();
      // };
    }
  }, [socket]);

  return { socket };
};
