// export const BASE_URL = "https://api.dev.eu.flashat.com";
export const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

export const SECRET = "hello-world";

export const AWS_S3_CONFIG_URL = process.env.NEXT_PUBLIC_AWS_S3_CONFIG_URL;

const LOGIN_URL = `${BASE_URL}/login`;
const HUDDLES_URL = `${BASE_URL}/huddles`;
const PUBLIC_HUDDLES_URL = `${BASE_URL}/huddles/public-huddles`;
const HUDDLES_CATEGORIES_URL = `${BASE_URL}/huddles/categories`;
const USER_LANGUAGES_URL = `${BASE_URL}/user/languages`;
const HUDDLE_MESSAGE_URL = `${BASE_URL}/huddles/:id/messages`;
const PUBLIC_HUDDLE_MESSAGE_URL = `${BASE_URL}/huddles/public-huddles/:id/messages`;
const SIGNED_URL = `${BASE_URL}/chat/chats/messages/:messageId/signed_url`;
const STATEMENTS_URL = `${BASE_URL}/user/homeapp/pp_statement`;
const CREATE_POST_URL = `${BASE_URL}/huddles/:huddleId/feeds`;
const DELETE_HUDDLE_URL = `${BASE_URL}/huddles`;
const LEAVE_HUDDLE_URL = `${BASE_URL}/huddles/:huddleId/members`;
const PARTICIPANTS_URL = `${BASE_URL}/huddles/:huddleId/members`;
const INVITED_URL = `${BASE_URL}/huddles/:huddleId/invitations`;
const REQUEST_URL = `${BASE_URL}/huddles/:huddleId/requests`;

const HUDDLE_REPORTS_MESSAGE_URL = `${BASE_URL}/huddles/:huddleId/reports`;
const HUDDLE_REPORTS_COMMENTS_URL = `${BASE_URL}/huddles/:huddleId/reported_comments`;
const DELETE_REPORTED_COMMENT_URL = `${BASE_URL}/huddles/:huddleId/:messageId/comments`;
const JOIN_HUDDLE_URL = `${BASE_URL}/huddles/:huddleId/join`;
const REQUEST_TO_JOIN_HUDDLE_URL = `${BASE_URL}/huddles/:huddleId/requests`;
const HUDDLE_INVITE_REQUESTS_URL = `${BASE_URL}/huddles/:huddleId/invitations`;
const LIKERS_URL = `${BASE_URL}/user/account/likers`;
const FANS_URL = `${BASE_URL}/user/account/fans`;
const DEARS_URL = `${BASE_URL}/user/account/dears`;
const HUDDLE_COMMENTS_URL = `${BASE_URL}/huddles/:huddleId/:message_id/comments`;
const USER_ACCOUNT_URL = `${BASE_URL}/user/users/:id`;
const BLOCK_FROM_HUDDLE_URL = `${BASE_URL}/huddles/:huddleId/block`;
const PIN_HUDDLE_POST = `${BASE_URL}/huddles/:huddleId/pin`;
const HUDDLE_APPOINT_ADMIN_URL = `${BASE_URL}/huddles/:huddleId/invitations/admin`;

export const VERIFY_USER_FROM_REDIRECT_URL = `${BASE_URL}/get_usertkn_details`;
const STARS_URL = `${BASE_URL}/user/account/stars`;

export const FOLLOW_USERS_URL = `${BASE_URL}/user/star/follow`

export const UNFOLLOW_USERS_URL = `${BASE_URL}/user/star/unfollow`



const API_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending",
} as const;

const PAGINATION_DEFAULT = {
  SIZE: 20,
  PAGE: 1,
} as const;

export {
  LOGIN_URL,
  HUDDLES_URL,
  HUDDLE_MESSAGE_URL,
  API_STATUS,
  PAGINATION_DEFAULT,
  SIGNED_URL,
  STATEMENTS_URL,
  CREATE_POST_URL,
  DELETE_HUDDLE_URL,
  PARTICIPANTS_URL,
  INVITED_URL,
  REQUEST_URL,
  LEAVE_HUDDLE_URL,
  HUDDLE_REPORTS_MESSAGE_URL,
  HUDDLE_REPORTS_COMMENTS_URL,
  DELETE_REPORTED_COMMENT_URL,
  JOIN_HUDDLE_URL,
  REQUEST_TO_JOIN_HUDDLE_URL,
  HUDDLE_INVITE_REQUESTS_URL,
  HUDDLES_CATEGORIES_URL,
  USER_LANGUAGES_URL,
  DEARS_URL,
  LIKERS_URL,
  FANS_URL,
  HUDDLE_COMMENTS_URL,
  USER_ACCOUNT_URL,
  BLOCK_FROM_HUDDLE_URL,
  PIN_HUDDLE_POST,
  HUDDLE_APPOINT_ADMIN_URL,
  STARS_URL,
  PUBLIC_HUDDLES_URL,
  PUBLIC_HUDDLE_MESSAGE_URL,
};

export const HUDDLES_TABS = {
  USER_PARTICIPATED: "user_participated",
  USER_MANAGED: "user_managed",
  REQUEST: "requests_and_invites",
  ADMIN: "user_admin",
  SEARCH: "search",
  PUBLIC: "public",
} as const;

export const USER_CITIZENSHIP = {
  VISITOR: "VISITOR",
  AMBASSADOR: "AMBASSADOR",
  RESIDENT: "RESIDENT",
  CITIZEN: "CITIZEN",
  LEADER: "LEADER",
  OFFICER: "OFFICER",
  PRESIDENT: "PRESIDENT",
  MINISTER: "MINISTER",
};

export const HUDDLE_USER_STATUS = {
  USER_ACCEPTED: "user_accepted",
  ADMIN_ACCEPTED: "admin_accepted",
  ADMIN_BLOCKED: "admin_blocked",
};

export const MEDIA_TYPES = {
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  AUDIO: "AUDIO",
};

export const MESSAGE_TYPE = {
  STICKER: "sticker",
};

export const STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  EERROR: "error",
};

export const USER_RELAITONS = {
  STAR:"STAR",
  LIKER:"LIKER",
  FAN:"FAN",
  DEAR:"DEAR"
}
