import { PODIUM_EVENTS } from "@/constants/events";
import { PodiumLiveChatPayload, Speaker } from "./podiums";

export interface HttpResponse<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  message: string;
  result: T;
}

export interface SocketEvent<T> {
  eventName: string;
  data: T;
}

export type TranslationFunction = (
  key: string,
  values?: Record<string>
) => string;

export interface PaginatedResult {
  current_page: number;
  total: number;
  next_page: number;
  free_offset: number;
  premium_offset: number;
  has_next?: boolean;
}

export interface QueryContext {
  queryKey: readonly [string, string]; // readonly array
  signal: AbortSignal; // signal for cancellation
  pageParam: string | number; // page parameter (can be string or number)
  direction: "forward" | "backward"; // direction for pagination
  meta?: Record<string, unknown>; // optional metadata
}
export interface PaginatedResponse extends PaginatedResult {
  data: unknown[]; // Adjust this type according to your data structure
}

export interface Params {
  [key: string]: string | string[] | undefined; // This type works for both string and string[]
}

export interface Error {
  message: string;
}

// types/socketEvents.ts
export interface SocketEventMap {
  [PODIUM_EVENTS.LIKE]?: { user_id: string | number; podium_id: string };
  [PODIUM_EVENTS.LIVE_CHAT]?: PodiumLiveChatPayload;
  [PODIUM_EVENTS.LEAVE]?: {
    room_type: string;
    user_id: string;
    podium_id: string;
  };
  [PODIUM_EVENTS.ATTENDANCE]?: {
    user_id: string;
    podium_id: string;
    role?: string;
  };
  [PODIUM_EVENTS.MUTE]?: Speaker;
  [PODIUM_EVENTS.UNMUTE]?: Speaker;
  [PODIUM_EVENTS.CHAT_DISABLED]: any;
  [PODIUM_EVENTS.CHAT_ENABLED]: any;
}

export interface KababOptionsInterface {
  id: number;
  label: string;
  onClick?: () => void;
  condition?: boolean;
}
