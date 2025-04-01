import { IAgoraRTCClient } from "agora-rtc-react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ActiveSpeakerContextType {
  activeSpeakers: { [uid: string]: boolean };
}

const ActiveSpeakerContext =
  createContext<ActiveSpeakerContextType | null>(null);

export const ActiveSpeakerProvider: React.FC<{
  client: IAgoraRTCClient;
  children: React.ReactNode;
}> = ({ client, children }) => {
  const [activeSpeakers, setActiveSpeakers] = useState<{
    [uid: string]: boolean;
  }>({});

  useEffect(() => {
    if (!client) return;

    client.enableAudioVolumeIndicator(); // Enable volume tracking

    client.on("volume-indicator", (volumes) => {
      const newSpeakers: { [uid: string]: boolean } = {};

      volumes.forEach((user) => {
        newSpeakers[user.uid] = user.level > 5; // If level > 5, user is speaking
      });

      setActiveSpeakers(newSpeakers);
    });

    return () => {
      client.off("volume-indicator", () => {});
    };
  }, [client]);

  return (
    <ActiveSpeakerContext.Provider value={{ activeSpeakers }}>
      {children}
    </ActiveSpeakerContext.Provider>
  );
};

// Custom hook to use active speakers
export const useActiveSpeakers = () => {
  const context = useContext(ActiveSpeakerContext);
  if (!context)
    throw new Error(
      "useActiveSpeakers must be used within ActiveSpeakerProvider"
    );
  return context;
};
