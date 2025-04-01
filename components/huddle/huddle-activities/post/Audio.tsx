"use client";

import { useMedia } from "@/app/hooks/useMedia";
import { API_STATUS } from "@/common/constant";
import { useOnlineStatus } from "@/contexts/OnlineStatusContext";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../../HuddleSkelton";
import { MediaMeta } from "@/types/huddles";

const Audio = ({
  messageId,
  roomId,
  ...rest
}: {
  messageId: string;
  roomId: string;
} & MediaMeta) => {
  const { data, status, fetchFromAPI, fetchFromCache } = useMedia(
    messageId,
    roomId
  );
  const { inView, ref } = useInView();
  const { isOnline } = useOnlineStatus();

  useEffect(() => {
    if (inView && !data) {
      if (isOnline) {
        fetchFromAPI();
      } else {
        fetchFromCache();
      }
    }
  }, [inView, data, isOnline, fetchFromAPI, fetchFromCache]);

  return (
    <div ref={ref} className="audio-container">
      {status === API_STATUS.SUCCESS && data ? (
        <audio controls src={data} {...rest}>
          Your browser does not support the audio element.{" "}
          <a href={data} download>
            Download audio
          </a>
        </audio>
      ) : (
        status === API_STATUS.LOADING && (
          <>
            <HuddleSkelton />
          </>
        )
      )}
      {status === API_STATUS.ERROR && <p>Failed to load audio.</p>}
    </div>
  );
};

export default Audio;
