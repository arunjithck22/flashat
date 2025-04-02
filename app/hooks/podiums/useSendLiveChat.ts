import { v4 as uuidv4 } from "uuid";

import { useProfileContext } from "@/contexts/ProfileContext";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { PodiumLiveChatPayload } from "@/types/podiums";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { useSocketEvents } from "../sockets/useSocketEvents";
import { PODIUM_EVENTS } from "@/constants/events";
import { SocketEventMap } from "@/types";
import { USER_CITIZENSHIP } from "@/constants/enums";


export const useSendMessage = (podiumId: string) => {
  const { socket } = usePodiumSocket();
  const { profileData } = useProfileContext();
  const { userStats } = usePodiumContext();
  
  const { emitEvent } = useSocketEvents<keyof SocketEventMap>(socket);

  const sendMessage = ({
    chatType,
    message,
    extraData,
  }: {
    chatType: string;
    message?: string;
    extraData?: Partial<PodiumLiveChatPayload>;
  }) => {
    const payload: PodiumLiveChatPayload = {
      podium_id: podiumId,
      chat_id: uuidv4(),
      chatFrozenForUser: true,
      user_stats: userStats,
      message: message || "",
      created: new Date().toISOString(),
      sender_detail: {
        name: profileData?.name || profileData?.username || "Anonymous",
        thumbnail_url: profileData?.profile_photo || "/default/profile.png",
        is_premium: profileData?.is_premium || false,
        deleted_account: false,
        user_id: profileData?.id || 0,
        role: "user",
        profile_url: profileData?.profile_photo || "/default/profile.png",
        verified: false,
        country_name: "United States",
        country_code: profileData?.country_code_iso || "US",
        blocked_by_admin: false,
        blocked_by_leader: false,
        huddle_admin_blocked: false,
        user_citizenship: USER_CITIZENSHIP.CITIZEN,
        is_banned: false,
        is_blacklisted: false
      },
      user_id: profileData?.id,
      country_code: profileData?.country_code_iso || "US",
      chat_type: chatType,
      ...extraData, // Merge additional properties
    };

    emitEvent(PODIUM_EVENTS.LIVE_CHAT, payload);
  };

  return { sendMessage };
};
