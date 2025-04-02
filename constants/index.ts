import { SidebarLink } from "@/types/huddles/index";
// import { useTranslations } from "next-intl";

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/sidebar/huddle.svg",
    activeImgURL: "/sidebar/huddle-active.svg",
    route: "/huddle",
    label: "huddle",
  },
  {
    imgURL: "/sidebar/dears.svg",
    activeImgURL: "/sidebar/dears-active.svg",
    route: "/user-relations/dears",
    label: "dears",
  },
  {
    imgURL: "/sidebar/fans.svg",
    activeImgURL: "/sidebar/fans-active.svg",
    route: "/user-relations/fans",
    label: "fans",
  },
  {
    imgURL: "/sidebar/likers.svg",
    activeImgURL: "/sidebar/likers-active.svg",
    route: "/user-relations/likers",
    label: "likers",
  },
  {
    imgURL: "/sidebar/stars.svg",
    activeImgURL: "/sidebar/stars-active.svg",
    route: "/user-relations/stars",
    label: "stars",
  },
  {
    imgURL: "/sidebar/flix.svg",
    activeImgURL: "/sidebar/flix.svg",
    route: "/buy-FLiX",
    label: "buy_flix",
  },
  {
    imgURL: "/sidebar/coins.svg",
    activeImgURL: "/sidebar/coins.svg",
    route: "/buy-COiNS",
    label: "buy_coins",
  },
  {
    imgURL: "/sidebar/coins.svg",
    activeImgURL: "/sidebar/coins.svg",
    route: "/podiums",
    label: "podiums",
  },
];

export const HUDDLE_HEADER_OPTIONS = {
  REQUESTS_AND_INVITES: "requests_and_invites",
  SHARE_HUDDLE_LINK: "Share Huddle Link",
  PARTICIPATION_PRIVACY: "Participation Privacy",
  SCHEDULED_POLLS: "Scheduled Polls",
  PAST_POLLS: "Past Polls",
  CREATE_POLL: "Create Poll",
  EXIT: "Exit",
} as const;

export const myHuddleHeaderOptions = [
  HUDDLE_HEADER_OPTIONS.REQUESTS_AND_INVITES,
  // HUDDLE_HEADER_OPTIONS.SHARE_HUDDLE_LINK,
  // HUDDLE_HEADER_OPTIONS.PARTICIPATION_PRIVACY,
  // HUDDLE_HEADER_OPTIONS.SCHEDULED_POLLS,
  // HUDDLE_HEADER_OPTIONS.PAST_POLLS,
  // HUDDLE_HEADER_OPTIONS.CREATE_POLL,
];
export const adminHuddleHeaderOptions = [
  HUDDLE_HEADER_OPTIONS.REQUESTS_AND_INVITES,
  // HUDDLE_HEADER_OPTIONS.SHARE_HUDDLE_LINK,
  // HUDDLE_HEADER_OPTIONS.PAST_POLLS,
];

export const joinedHuddleHeaderOptions = [
  // HUDDLE_HEADER_OPTIONS.EXIT,
  // HUDDLE_HEADER_OPTIONS.PAST_POLLS,
];

export const othersHuddleHeaderOptions = [
  // HUDDLE_HEADER_OPTIONS.SHARE_HUDDLE_LINK,
];
