import { BASE_URL } from "@/common/constant";

export const GET_PODIUMS_URL = `${BASE_URL}/podium`;

export const GET_LIVE_FRIENDS_URL = `${BASE_URL}/podium/live-friends`;

export const PODIUM_JOIN_URL = `${BASE_URL}/podium/:podiumId/join`;

export const PODIUM_GO_LIVE_URL = `${BASE_URL}/podium/:podiumId/go-live`;

export const GET_PODIUM_DETAILS_URL = `${BASE_URL}/podium/:podiumId`;
export const GET_PODIUM_STATS_URL = `${BASE_URL}/podium/:podiumId/stats/about`;
export const GET_PODIUM_RECORDS_URL = `${BASE_URL}/podium/:podiumId/stats/records`;

export const PODIUM_LEAVE_URL = `${BASE_URL}/podium/:podiumId/leave`;
export const PODIUM_CLOSE_URL = `${BASE_URL}/podium/:podiumId/close`;
export const PODIUM_EXIT_URL = `${BASE_URL}/podium/:podiumId/exit`;

export const GET_WAITING_LIST_URL = `${BASE_URL}/podium/:podiumId/waiting-participant`;

export const SEND_SPEAK_REQUEST_URL = `${BASE_URL}/podium/:podiumId/request-to-speak`;

export const SELF_MUTE_URL = `${BASE_URL}/podium/:podiumId/mute`;

export const GET_ADMINS_AND_REQUESTS_URL = `${BASE_URL}/podium/:podiumId/admins`;

export const PODIUM_DISMISS_FROM_ADMIN_URL = `${BASE_URL}/podium/:podiumId/admins/:participantId/dismiss`;

export const GET_PODIUM_BLOCKED_USERS = `${BASE_URL}/podium/:podiumId/block`;

export const GET_PODIUM_FROZEN_USERS = `${BASE_URL}/podium/:podiumId/freeze`;

export const BLOCK_OR_UNBLOCK_PODIUM_PARTICIPANT_URL = `${BASE_URL}/podium/:podiumId/block/:participantId`;

export const FREEZE_OR_UNFREEZE_PODIUM_PARTICIPANT_URL = `${BASE_URL}/podium/:podiumId/freeze/:participantId`;

export const PAUSE_OR_RESUME_COMMENTS_PODIUM_URL = `${BASE_URL}/podium/:podiumId/settings`;

export const SEND_PODIUM_INVITATIONS_URL = `${BASE_URL}/podium/:podiumId/invite`;

export const MAKE_PODIUM_ADMIN_URL = `${BASE_URL}/podium/:podiumId/admins/:participantId/request`;

export const CANCEL_PODIUM_ADMIN_INVITE_URL = `${BASE_URL}/podium/:podiumId/admins/:participantId/cancel`;

export const DISMISS_PODIUM_ADMIN_URL = `${BASE_URL}/podium/:podiumId/admins/:participantId/dismiss`;

export const PODIUM_INVITE_TO_SPEAK_URL = `${BASE_URL}/podium/:podiumId/speaker/invite/:participantId`;

export const PODIUM_ACCEPT_SPEAK_INVITE_URL = `${BASE_URL}/podium/:podiumId/speaker/invite/reply`;

export const PODIUM_CANCEL_SPEAK_INVITE_URL = `${BASE_URL}/podium/:podiumId/speaker/invite/:inviteeId/cancel`;

export const PODIUM_ACCEPT_OR_DECLINE_ADMIN_INVITE = `${BASE_URL}/podium/:podiumId/admins/:participantId/confirm`;

export const PODIUM_PAUSE_GIFT_URL = `${BASE_URL}/podium/:podiumId/pause-gift`;

export const PODIUM_PARTICIPANT_PAUSE_GIFT_URL = `${BASE_URL}/podium/:podiumId/pause-gift/:participantId`;

export const PODIUM_USERS_DETAILS_URL = `${BASE_URL}/podium/:podiumId/users/:participantId`;
