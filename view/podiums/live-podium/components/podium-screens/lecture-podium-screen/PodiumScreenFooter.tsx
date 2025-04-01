/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { SinglePodium, Speaker } from "@/types/podiums";
import { useCurrentUID} from "agora-rtc-react";

import React, { useEffect, useState } from "react";
import ControlButtons from "../../ControlButtons";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";


import { useSelfMute } from "@/app/hooks/podiums/useSelfMute";
import { useTrack } from "@/contexts/podium/TrackProvider";
import { muteLocalAudio, unmuteLocalAudio } from "@/utils/podiums/utils";

const PodiumScreenFooter = ({
  podiumData,
  micOn,
  cameraOn,
  setCamera,
  setMic,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
{
  podiumData: SinglePodium | undefined;
  micOn: boolean;
  cameraOn: boolean;
  setCamera: any;
  setMic: any;
}) => {
  
  const currentUID = useCurrentUID();

  const { localMicrophoneTrack } = useTrack();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { speakerList, setSpeakerList } = usePodiumContext();
  // const { syncEventData } = useSyncEvent();
  const [showControls, setShowControls] = useState(false);

  const [mainScreenUser, setMainScreenUser] = useState<Speaker | null>(null);
  // const { socket } = usePodiumSocket();

  const selfMuteMutation = useSelfMute();

  console.log("footer speaker list", podiumData);

  useEffect(() => {
    if (speakerList?.length > 0) {
      const filteredUser =
        speakerList?.length > 0 &&
        speakerList?.filter((item: Speaker) => item?.add_to_main_screen);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      filteredUser && setMainScreenUser(filteredUser[0]);

      const currentUserMatches =
        speakerList?.length > 0 &&
        speakerList?.some((item: Speaker) => item?.id === currentUID);

      // Set the state based on the check
      console.log("current user matches", currentUserMatches);
      setShowControls(currentUserMatches);
    }
  }, [speakerList]);

  // This useffect used for off the camera i fthe local user leaves main screen with camera on state
  useEffect(() => {
    if (mainScreenUser?.id !== currentUID) {
      setCamera(false);
    }
  }, [mainScreenUser]);

  console.log("video hidden", mainScreenUser?.id !== currentUID);
 

  const controls = [
    {
      icon: micOn ? "/podiums/audio-unmute.svg" : "/podiums/audio-mute.svg",
      onClick: () => {
        handleAudio();
      },
      hidden: false,
      disabled: false,
    },
    {
      icon: "/podiums/camera-control.svg",
      onClick: () => {
        handleVideo();
      },
      hidden: mainScreenUser?.id !== currentUID,
      disabled: false,
    },
    {
      icon: "/podiums/share.svg",
      onClick: () => {},
      hidden: false,
      disabled: false,
    },
  ];

  console.log("localMicrophoneTrack-footer", localMicrophoneTrack);

  const handleVideo = () => {
    setCamera(!cameraOn);
  };

  const handleAudio = () => {
    setMic((prev: boolean) => !prev);
  };

  console.log("localmic1", micOn, localMicrophoneTrack);

  useEffect(() => {
    selfMuteMutation.mutate(
      {
        data: {},
        action: micOn ? "unmute" : "mute",
        podiumId: podiumData?.id?.toString() || "",
      },
      {
        onSuccess: (data) => {
          console.log("Mute/Unmute Success:", data);
        },
        onError: (error) => {
          console.error("Mute/Unmute Error:", error);
        },
      }
    );
  }, [micOn]);

  useEffect(() => {
    if (micOn) {
      unmuteLocalAudio(localMicrophoneTrack);
    } else {
      muteLocalAudio(localMicrophoneTrack);
    }
  }, [micOn, localMicrophoneTrack]);

  return (
    <div className="w-full bg-white flex justify-center items-center gap-10">
      {showControls &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        controls.map((control: any, index: any) => (
          <ControlButtons
            key={index}
            image={control.icon}
            onClick={control.onClick}
            hidden={control.hidden}
            disabled={control.disabled}
          />
        ))}
    </div>
  );
};

export default PodiumScreenFooter;
