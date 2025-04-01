import { PODIUM_EVENTS } from "@/constants/events";
import { SyncEventData } from "@/types/podiums";
import { createContext, useContext, useEffect, useState } from "react";
import { usePodiumSocket } from "../PodiumSocketContext";
// Update with actual import

// Define the context type
interface SyncEventContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  syncEventData: any;
}

// Create context with a default value
const SyncEventContext =
  createContext<SyncEventContextType | undefined>(undefined);

// Context Provider
export const SyncEventProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [syncEventData, setSyncEventData] =
    useState<SyncEventData | null>(null);
  const { socket } = usePodiumSocket();

  useEffect(() => {
    if (socket) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleSyncEvent = (payload: any) => {
        console.log("payload sync", payload);
        setSyncEventData(payload);
      };

      socket.on(PODIUM_EVENTS.SYNC, handleSyncEvent);

      return () => {
        socket.off(PODIUM_EVENTS.SYNC, handleSyncEvent);
      };
    }
  }, [socket]);

  return (
    <SyncEventContext.Provider value={{ syncEventData }}>
      {children}
    </SyncEventContext.Provider>
  );
};

// Custom hook for using sync event data
export const useSyncEvent = () => {
  const context = useContext(SyncEventContext);
  if (!context) {
    throw new Error("useSyncEvent must be used within a SyncEventProvider");
  }
  return context;
};
