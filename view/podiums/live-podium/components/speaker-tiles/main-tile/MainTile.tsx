/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Speaker } from "@/types/podiums";

import AgoraRTC, {
  LocalUser,
  RemoteUser,
  useCurrentUID,
  useIsConnected,
  
  usePublish,
  useRemoteUsers,
  
} from "agora-rtc-react";

import SpeakerTileCover from "../SpeakerTileCover";
import SpeakerTileFooter from "../SpeakerTileFooter";
import SpeakerTileHeader from "../SpeakerTileHeader";

import { useActiveSpeakers } from "@/contexts/podium/ActiveSpeakerProvider";  
import { useTrack } from "@/contexts/podium/TrackProvider";

const MainTile: React.FC<{
  speaker: Speaker;
  cameraOn: boolean;
  micOn: boolean;
  setCamera?: React.Dispatch<React.SetStateAction<boolean>>;
  setMic?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ speaker, cameraOn, micOn }) => {
  const currentUID = useCurrentUID();

  
  console.log("current UID", AgoraRTC);
  const isConnected = useIsConnected();

  const { localCameraTrack, localMicrophoneTrack } = useTrack();
  usePublish([localMicrophoneTrack, localCameraTrack]);
  const remoteUsers = useRemoteUsers();
  const [filteredRemoteUsers, setFilteredRemoteUsers] = useState<any>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    if (cameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [cameraOn, isConnected]);
  useEffect(() => {
    setFilteredRemoteUsers(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      remoteUsers.filter((user: any) => user.uid === speaker.id)
    );
  }, [remoteUsers, speaker]);
  console.log("main speaker", filteredRemoteUsers, remoteUsers, speaker);

  console.log("camera on", cameraOn, localCameraTrack);

  const { activeSpeakers } = useActiveSpeakers();

  console.log("Active speakers", activeSpeakers);

  console.log("localMicrophoneTrack-main", localCameraTrack);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-between 
      
      `}
    >
      <div
        className={`relative w-full h-full flex justify-center items-center ${
          activeSpeakers[speaker?.id?.toString()] &&
          "border border-4 border-animate-pulse border-yellow-500"
        }`}
      >
        <div className="relative  flex items-center justify-center w-full h-full ">
          <SpeakerTileHeader speaker={speaker} />
          {!cameraOn && !filteredRemoteUsers[0]?.hasVideo && (
            <SpeakerTileCover
              speaker_id={speaker?.id.toString()}
              num={2}
              profile_url={speaker?.profile_url || "/icons/user-default.svg"}
            />
          )}
          {!isConnected && cameraOn && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {isConnected && currentUID === speaker?.id ? (
            <div className={`w-full h-full  ${!cameraOn && "hidden"}`}>
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                // cover={speaker?.profile_url || "/podiums/sample.jpg"}
              ></LocalUser>
            </div>
          ) : (
            filteredRemoteUsers?.length > 0 &&
            filteredRemoteUsers
              ?.filter((user: any) => user.uid === speaker.id)
              .map((user: any) => (
                <div
                  id="remote-camera"
                  className={`w-full h-full ${!user.hasVideo && "hidden"} `}
                  key={user.uid}
                >
                  <RemoteUser
                    cover={speaker?.profile_url || "/icons/user-default.svg"}
                    user={user}
                  >
                    <samp className="user-name  text-white">
                      {user.hasVideo ? "camera-on" : "camera-off"}
                    </samp>
                  </RemoteUser>
                </div>
              ))
          )}
          <SpeakerTileFooter speaker={speaker} />
        </div>
      </div>

      {/* <div className=" text-md w-full p-1 px-2 bg-gradient-to-t from-black to-transparent flex items-center justify-between">
        <span className="text-white">{speaker?.name}</span>
        <span className="">
          <Image
            src={speaker?.mute ? "/podiums/muted.svg" : "/podiums/unmuted.svg"}
            alt="empty"
            width={20}
            height={20}
          />
        </span>
      </div> */}
    </div>
  );
};

export default MainTile;
