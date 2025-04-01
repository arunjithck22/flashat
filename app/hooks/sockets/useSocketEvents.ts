import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketEventMap } from "@/types";

export const useSocketEvents = <T extends keyof SocketEventMap>(
  socket: Socket | null,
  eventNames?: T[]
) => {
  const [eventData, setEventData] = useState<
    Partial<Record<T, SocketEventMap[T]>>
  >({});

  const emitEvent = <K extends keyof SocketEventMap>(
    eventName: K,
    payload: SocketEventMap[K]
  ) => {
    if (!socket) {
      console.error("Socket not connected");
      return;
    }
    socket.emit(eventName, payload);
  };

  useEffect(() => {
    if (!socket || !eventNames) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlers = {} as Record<T, (...args: any[]) => void>;

    eventNames.forEach((eventName) => {
      const handleEvent = (...args: [SocketEventMap[T]]) => {
        setEventData((prev) => ({ ...prev, [eventName]: args[0] }));
      };

      socket.on(eventName as string, handleEvent);
      handlers[eventName] = handleEvent;
    });

    return () => {
      eventNames.forEach((eventName) => {
        if (handlers[eventName]) {
          socket.off(eventName as string, handlers[eventName]);
        }
      });
    };
  }, [socket, eventNames]);

  return { emitEvent, eventData };
};
