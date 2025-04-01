export const MESSAGE = "message";
export const HUDDLE_EVENTS = {
  HUDDLE_PUBIC_CHAT: "huddle_public_chat", // to get new messages
};

export const COMMON_EVENTS = {
  BLOCK_USER_EVENT: "block_account",
  USER_EMPOWERMENT_UPDATE: "user_empowerment_update",
};

export const PODIUM_EVENTS = {
  SYNC: "sync",
  JOIN: "join",
  LEAVE: "leave",
  CLOSE: "close",
  LIKE: "like",
  ENTER_WAITING_LIST: "enter_wait_list",
  EXIT_WAITING_LIST: "exit_wait_list",
  ENTER_SPEAKER_LIST: "enter_speaker_list",
  EXIT_SPEAKER_LIST: "exit_speaker_list",
  LIVE_CHAT: "message",
  ADD_TO_MAIN_SCREEN: "add_to_main_screen",
  ATTENDANCE: "attendance",
  MUTE: "mute",
  UNMUTE: "unmute",
  CHAT_DISABLED: "chat_disabled",
  CHAT_ENABLED: "chat_enabled",
  LIKES_DISABLED: "likes_disabled",
  LIKES_ENABLED: "likes_enabled",
  MIC_DISABLED: "mic_disabled",
  MIC_ENABLED: "mic_enabled",
  APPOINT_ADMIN: "appoint_admin",
  CANCEL_ADMIN_REQUEST: "cancel_admin_request",
  NEW_ADMIN: "new_admin",
  DISMISS_ADMIN: "dismiss_admin",
  PODIUM_SPEAKER_INVITE: "podium_speaker_invite",
  UNFREEZE: "unfreeze",
  FREEZE: "freeze",
  BLOCK: "block",
  EXIT_ADMIN_LIST: "exit_admin_list",
  PAUSE_PODIUM_GIFTS:"pause_podium_gifts",
  RESUME_PODIUM_GIFTS:"resume_podium_gifts"
} as const;
