import { useActiveSpeakers } from "@/contexts/podium/ActiveSpeakerProvider";
import Image from "next/image";
import React from "react";

const SpeakerTileCover = ({
  profile_url,
  type,
  num,
  speaker_id,
}: {
  profile_url: string | undefined;
  type?: string | undefined;
  num?: number;
  speaker_id: string;
}) => {
  const { activeSpeakers } = useActiveSpeakers();
  console.log("speakerTilecover", speaker_id, activeSpeakers[speaker_id]);
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Blurred Background Image */}
      <div className=" relative w-full bg-black overflow-hidden h-full  flex justify-center items-center">
        {profile_url && (
          <Image
            src={profile_url}
            alt="empty"
            // layout="fill"
            width={1000}
            height={1000}
            objectFit="cover"
            className="opacity-50 blur-md  object-cover w-full h-full bg-cover"
          />
        )}
      </div>

      {/* Clear Centered Image */}
      <div className="absolute">
        <div
          className={`${type === "sub" ? "w-20 h-20 " : "w-32 h-32"} z-10 ${
            !profile_url && "bg-gray-500 p-8"
          } relative rounded-full ${
            activeSpeakers[speaker_id] && "border border-yellow-500 border-4"
          } `}
        >
          <Image
            src="/tw/post/premium.svg"
            alt="premium"
            width={24}
            height={24}
            className={`rounded-full object-cover bg-cover absolute left-2 top-0 `}
          />
          <Image
            src={profile_url || "/icons/user-default.svg"}
            alt="empty"
            width={200}
            height={200}
            className={` rounded-full   w-full h-full`}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeakerTileCover;
