import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
 
  ILocalVideoTrack,
  IMicrophoneAudioTrack
} from "agora-rtc-react";

// Define the context type
interface TrackContextType {
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  localCameraTrack: ILocalVideoTrack | null;
  micOn: boolean;
  setMic: React.Dispatch<React.SetStateAction<boolean>>;
  cameraOn: boolean;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default value as null
const TrackContext = createContext<TrackContextType | null>(null);

// Track Provider Component
export const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [micOn, setMic] = useState<boolean>(false);
  const [cameraOn, setCamera] = useState<boolean>(false);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn, {
    ANS: true,
    AEC: true,
    AGC: true,
  });

  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  

  return (
    <TrackContext.Provider
      value={{
        localMicrophoneTrack,
        localCameraTrack,
        micOn,
        setMic,
        cameraOn,
        setCamera,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

// Custom hook for accessing the track context
export const useTrack = (): TrackContextType => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error("useTrack must be used within a TrackProvider");
  }
  return context;
};
