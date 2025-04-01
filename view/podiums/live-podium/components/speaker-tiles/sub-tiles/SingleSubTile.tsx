import { Speaker } from "@/types/podiums";

import Image from "next/image";
import React from "react";
// import classNames from "classnames";
import {
  LocalUser,
  RemoteUser,
  useCurrentUID,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import SpeakerTileCover from "../SpeakerTileCover";
import SpeakerTileHeader from "../SpeakerTileHeader";
import SpeakerTileFooter from "../SpeakerTileFooter";
import { useTrack } from "@/contexts/podium/TrackProvider";

const SingleSubTile: React.FC<{
  speaker: Speaker;
  cameraOn: boolean | undefined;
  micOn: boolean | undefined;
  setCamera?: React.Dispatch<React.SetStateAction<boolean>>;
  setMic?: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}> = ({ speaker, cameraOn, micOn, index }) => {
  console.log("sub speaker", speaker);

  const currentUID = useCurrentUID();
  console.log("current UID", currentUID, speaker?.id);

  const { localMicrophoneTrack } = useTrack();

  usePublish([localMicrophoneTrack]);
  const remoteUsers = useRemoteUsers();

  console.log("remoteUsers", remoteUsers);

  return (
    <div
      id={speaker?.id?.toString()}
      className={`w-full h-28 lg:h-40 aspect-square    flex flex-col items-center justify-between `}
    >
      {!speaker && (
        <div className="relative w-full h-full flex justify-center items-center">
          <Image
            src={"/podiums/empty-mic.svg"}
            alt="empty"
            width={15}
            height={15}
            className="rounded-full object-cover relative z-10"
          />
        </div>
      )}

      {speaker && (
        <div className="relative w-full h-full flex items-center justify-center">
          <SpeakerTileHeader speaker={speaker} />
          <SpeakerTileCover
            speaker_id={speaker?.id?.toString()}
            type="sub"
            num={5}
            profile_url={speaker?.profile_url || "/icons/user-default.svg"}
          />
          {currentUID === speaker?.id ? (
            <div className={`w-full h-full  hidden`}>
              <LocalUser audioTrack={localMicrophoneTrack} micOn={micOn} />
            </div>
          ) : (
            remoteUsers
              .filter((user) => user.uid === speaker?.id)
              .map((user) => (
                <div className="w-full hidden h-full" key={user.uid}>
                  <RemoteUser
                    user={user}
                    className="w-full h-full hidden"
                  ></RemoteUser>
                </div>
              ))
          )}
          <SpeakerTileFooter speaker={speaker} />
        </div>
      )}
    </div>
  );
};

export default SingleSubTile;
