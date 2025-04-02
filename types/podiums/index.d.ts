import { SenderDetails } from "../huddles";

export interface Empowerments {
  time_created: string;
  time_updated: string;
  id: number;
  user_id: number;
  allow_hide_flag: boolean;
  allow_change_location: boolean;
  allow_block_user_huddle: boolean;
  allow_block_user_flashat: boolean;
  allow_delete_post_huddle: boolean;
  allow_enter_huddle: boolean;
  allow_delete_flash_video: boolean;
  allow_end_podium: boolean;
  allow_join_hidden_podium: boolean | null;
  allow_end_speaking_session_podium: boolean;
  allow_delete_comments_podium: boolean;
  allow_block_user_speaking_podium: boolean;
  allow_block_user_podium: boolean | null;
  allow_block_user_comments_podium: boolean;
  allow_hide_online_status: boolean | null;
  allow_freeze_user_comments_podium: boolean | null;
  allow_delete_postat_post: boolean | null;
  allow_block_user_posting_postat: boolean;
  allow_block_user_posting_flash: boolean;
  allow_block_user_posting_huddle: boolean;
  allow_see_hidden_users_podium: boolean | null;
}

interface Category {
  id: number;
  name: string;
}

interface SinglePodium {
  about: string;
  agora_channel_id: string;
  audience_fee: number;
  category: Category;
  chat_disabled: boolean;
  chat_disabled_by: string | null;
  competitor_name: string;
  competitor_user_id: string | null;
  created: string;
  current_live_session_id: string;
  deleted: boolean;
  hide_live_users: boolean;
  id: string;
  invite_code: string;
  is_invited: boolean;
  is_premium: boolean;
  is_private: boolean;
  kind: string;
  last_go_live_time: string;
  likes_disabled: boolean;
  likes_disabled_by: string | null;
  live: boolean;
  live_users: number;
  manager_id: number;
  manager_name: string;
  manager_profile_thumbnail: string;
  mic_disabled: boolean;
  mic_disabled_by: string | null;
  name: string;
  parent_id: string | null;
  podium_gift_paused: boolean;
  profile_pic: string | null;
  role: string;
  stage_fee: number;
  started: string;
  talk_time_duration: number | null;
  talk_time_start: string | null;
  temp_id: string;
  thumbnail: string;
  total_likes: number;
  type: string;
  updated: string;
  speakers?: Speaker[];
  gift_paused_participants?: number[];
  likes?: number;
  invited_to_be_admin?: boolean;
  freeze?: boolean;
}

interface LiveFriends {
  hide_live_list: boolean;
  is_premium: boolean;
  name: string;
  podium_id: string;
  podium_kind: string; // Adjust values based on actual possible types
  podium_live_users_count: number;
  podium_name: string;
  podium_type: string; // Adjust if more types exist
  profile_url: string;
  role: string;
  thumbnail: string;
  user_id: number;
  username: string;
}

export interface UserFunctionalityBlocks {
  time_created: string;
  time_updated: string;
  id: number;
  user_id: number;
  flash_block: boolean;
  podium_block: boolean | null;
  podium_speaking_block: boolean | null;
  podium_write_comments_block: boolean | null;
  postat_posts_block: boolean | null;
  huddle_posts_block: boolean | null;
}

export interface Speaker {
  id: number | string;
  name: string;
  username: string;
  membership: string;
  profile_url: string;
  thumbnail: string;
  verified: boolean;
  citizenship: string;
  country_code: string | null;
  enable_camera: boolean;
  camera_expiry: string | null;
  camera_violation: boolean;
  gender: string;
  join_hidden: boolean;
  user_rating: number;
  user_functionality_blocks: UserFunctionalityBlocks;
  mute: boolean;
  role: string;
  podium_id: string;
  likes: number;
  add_to_main_screen: boolean;
  add_to_stage: boolean;
  unmute_video: boolean;
  is_online: boolean;
  stage_blocked: boolean;
  audience_blocked: boolean;
  coins_received: number;
  user_likes: number;
}
export interface SyncEventData {
  admin_list: Admin[];
  likes: number;
  live_users: number;
  inactive_since: number;
  speaker_list: Speaker[];
  paused_time: number | null;
  total_users: number;
  gifts_count: number;
  live_user_hide: boolean;
  competitor_muted: boolean;
  podium_gift_paused: boolean;
  gift_paused_participants: unknown[];
  total_coins: number;
  speaker_invites: unknown[];
  podium_id: string;
}

interface Admin {
  camera_expiry: string | null;
  camera_violation: boolean;
  citizenship: string;
  country_code: string;
  enable_camera: boolean;
  gender: "Male" | "Female" | "Other"; // Adjust if needed
  id: number;
  join_hidden: boolean;
  membership: string;
  name: string;
  profile_url: string;
  role: "ADMIN" | "MANAGER" | "USER"; // Adjust roles if needed
  thumbnail: string;
  user_functionality_blocks: UserFunctionalityBlocks;
  user_rating: number;
  username: string;
  verified: boolean;
}

interface PodiumStats {
  admins: Admin[];
  description: string;
  id: string;
  manager: User;
  name: string;
  profile_url: string | null;
  thumbnail: string;
  time_published: string;
  total_duration: string;
  total_likes: number;
  total_sessions: number;
  total_speakers: number;
  total_users: number;
  about: string | null;
  live: boolean;
}

export interface PodiumSessions {
  duration: string;
  ended: string;
  id: string;
  likes: number;
  podium_id: string;
  started: string;
  started_by: {
    camera_expiry: string | null;
    camera_violation: boolean;
    citizenship: string;
    country_code: string;
    enable_camera: boolean;
    gender: string;
    id: number;
    join_hidden: boolean;
    membership: string;
    name: string;
    profile_url: string;
    role: string;
    thumbnail: string;
    user_functionality_blocks: UserFunctionalityBlocks;
    user_rating: number;
    username: string;
    verified: boolean;
  };
  total_speakers: number;
  total_users: number;
}

export interface JoinPodiumResponse {
  agora_channel_id: string;
  agora_token: string;
  generosity: string;
  join_hidden: boolean;
  skills: string;
}

export interface WaitList {
  camera_expiry: string | null;
  camera_violation: boolean;
  citizenship: string;
  country_code: string;
  enable_camera: boolean;
  gender: string;
  id: number;
  join_hidden: boolean;
  membership: string;
  mute: boolean;
  name: string;
  podium_id: string;
  profile_url: string;
  role: string;
  thumbnail: string;
  user_functionality_blocks: UserFunctionalityBlocks;
  user_rating: number;
  username: string;
  verified: boolean;
}
export interface RemoveWLSocketPayload {
  podium_id: string;
  user_id: number;
}

export interface UserStats {
  generosity: string | null;
  skills: string | null;
  rating: number;
}

interface PodiumLiveChatPayload {
  chat_type: string;
  chatFrozenForUser: boolean;
  chat_id: string;
  country_code: string;
  created: string;
  message: string;
  podium_id: string;
  sender_detail: SenderDetails;
  user_id: number | undefined;
  user_stats: UserStats;
  role?: string;
  invited_to_be_admin?: boolean;
}

interface AdminRequestUser {
  camera_expiry: string | null;
  camera_violation: boolean;
  citizenship: string;
  country_code: string;
  enable_camera: boolean;
  gender: string;
  id: number;
  invited_to_be_admin: boolean;
  join_hidden: boolean;
  membership: string;
  name: string;
  podium_id: string;
  profile_url: string;
  role: string; // Add more roles if necessary
  thumbnail: string;
  user_functionality_blocks: UserFunctionalityBlocks;
  user_rating: number;
  username: string;
  verified: boolean;
}

interface PodiumBlockedUsersList {
  audience_blocked: boolean;
  camera_expiry: string | null;
  camera_violation: boolean;
  citizenship: string;
  country_code: string;
  enable_camera: boolean;
  gender: string;
  id: number;
  join_hidden: boolean;
  membership: string;
  name: string;
  podium_blocked: boolean;
  podium_id: string;
  profile_url: string;
  role: string;
  stage_blocked: boolean;
  thumbnail: string;
  user_functionality_blocks: UserFunctionalityBlocks;
  user_rating: number;
  username: string;
  verified: boolean;
}

interface FrozenUser {
  camera_expiry: string | null;
  camera_violation: boolean;
  citizenship: string;
  country_code: string;
  enable_camera: boolean;
  frozen_by: number;
  gender: string;
  id: number;
  join_hidden: boolean;
  membership: string;
  name: string;
  podium_id: string;
  profile_url: string;
  role: string;
  thumbnail: string;
  user_functionality_blocks: UserFunctionalityBlocks;
  user_rating: number;
  username: string;
  verified: boolean;
}

export interface PodiumUserDetails {
  citizenship: string;
  coins_received: number;
  flix_rate: number;
  is_followed: boolean;
  is_superstar: boolean;
  membership: string;
  relation: string;
  total_likes: number;
  
}
