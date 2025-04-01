export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
  activeImgURL: string;
}

export interface HuddleLastMessage {
  activity_meta: string | null | undefined; // Adjust type if you know its structure
  color: string | null;
  created: string; // ISO date string
  deleted: boolean;
  delivered: string | null; // ISO date string or null
  forward_id: string | null;
  has_mention: boolean | null;
  huddle_id: string;
  huddle_type: "public" | "private"; // Adjust if there are more types
  is_activity: boolean;
  is_edited: boolean | null;
  media: string | null; // URL or media reference
  media_meta: MediaMeta | null | undefined; // Adjust type if you know its structure
  message: string;
  message_id: string;
  message_type: string | null; // Define possible types if applicable
  read: string | null; // ISO date string or null
  receiver: number;
  remover: number | null;
  reply_to: string | null;
  sender: number;
  sent: string; // ISO date string
  total_likes: number;
}

export interface Huddles {
  id: number;
  name: string;
  about: string;
  activity: string;
  admin_status: string;
  group_photo: string;
  thumbnail: string;
  total_members: number;
  unread_count: number;
  huddle_role: string;
  is_admin: boolean;
  is_manager: boolean;
  last_message: HuddleLastMessage;

  online_participants: number;
  total_requests: number;
  join_requests_count: number;
  invitations_count: number;
  is_premium: boolean;
  manager_premium_status: boolean;
  status: string;
  private: boolean;
  tribe: boolean;
  user_status?: string;
  request_to_join: boolean;
  empowered_user_blocked: boolean;
  sender_details: SenderDetails;
  report_count?: string;
}

export interface RequestsInvitesHuddles {
  about: string;
  category: string;
  category_id: number;
  comment_privacy: string;
  created_by: string;
  group_photo: string;
  huddle_participants_limit_for_free: number;
  huddle_participants_limit_for_premium: number;
  huddle_role: string;
  id: number;
  invitations_count: number;
  invite_code: string;
  invite_link: string;
  is_admin: boolean;
  is_manager: boolean;
  is_muted: boolean | null;
  is_premium: boolean;
  join_requests_count: number;
  language: string;
  manager_id: number;
  manager_premium_status: boolean;
  name: string;
  online_participants: number;
  participant_share: boolean;
  pinned: boolean;
  post_privacy: string;
  private: boolean;
  reply_privacy: string;
  report_count: number;
  request_to_join: boolean;
  status: string;
  thumbnail: string;
  time_created: string;
  time_updated: string;
  total_members: number;
  total_requests: number;
  tribe: boolean;
  user_status: string;
  last_message: HuddleLastMessage;
  sender_details: SenderDetails;
}

export interface HuddleMessage {
  huddle_id: string;
  message_id: string;
  activity_meta: string | null;
  color: string | null;
  created: string;
  deleted: boolean;
  delivered: boolean;
  forward_id: string;
  has_mention: boolean;
  huddle_type: string;
  is_activity: boolean;
  is_edited: boolean;
  media: string;
  media_meta?: MediaMeta;
  message: string;
  message_type: string | null;
  read: boolean;
  remover: string | null;
  reply_to: ReplyMessage;
  sender: number | undefined;
  total_likes: number;
  room_id: string;
  pinned: boolean;
  sender_broadcastType?: string;
  star_type: string;
  receiver: number;
  sent: string;
  sender_details?: SenderDetails;
  sender_name: string;
  sender_thumbnail_url: string;
  sender_user_role: string;
  sender_account_type: string;
  total_comments: number;
  s3_key: string;
  thumbnail: string;
  media_width: string;
  media_height: string;
  media_duration: string;
  media_size: string;
  pinned_post: PinnedPost;
}
export interface MediaMeta {
  media_duration: string;
  media_height: string;
  media_name: string;
  media_size: string;
  media_type: string;
  media_width: string;
  mime_type: string;
  s3_key: string;
  thumbnail: string;
}

export interface SenderDetails {
  user_id?: string;
  name?: string;
  deleted_account?: boolean;
  is_premium?: boolean | undefined;
  role?: string;
  profile_url?: string;
  thumbnail_url?: string;
  verified?: boolean;
  country_name?: string;
  country_code?: string;
  blocked_by_admin?: boolean;
  blocked_by_leader?: boolean;
  huddle_admin_blocked?: boolean;
  user_citizenship?: string;
  user_priority?: string;
  flash_blocked?: boolean;
  id?: string;
  is_banned?: boolean;
  is_blacklisted?: boolean;
}

export interface Members {
  admin_status: string;
  can_comment: boolean;
  can_post: boolean;
  can_reply: boolean;
  is_admin: boolean;
  is_manager: boolean;
  member_id: number;
  membership: string;
  name: string;
  relationship?: string;
  role: string;
  status: string;
  thumbnail: string;
  user_blocked: boolean;
  username: string;
  verified: boolean;
}

export interface LikersDearsFans {
  broadcast_likers_privacy: boolean;
  dears: number;
  fans: number;
  id: number;
  is_followed: boolean;
  likers: number;
  membership: string;
  name: string;
  stars: number;
  thumbnail: string;
  username: string;
  verified: boolean;
}

export interface HuddlePublicChatData {
  unread_count: number;
  huddle_id: string;
  room_id: string;
  liked: boolean;
  sent: string; // ISO date string
  sender_details: SenderDetails;
  sender_account_type: "Premium" | "Free"; // Adjust based on possible values
  sender_name: string;
  sender_thumbnail_url: string;
  sender_user_role: string;
  private: boolean;
  sender: number;
  message: string;
  created: string; // ISO date string
  delivered: string | null; // ISO date string or null
  read: string | null; // ISO date string or null
  message_id: string;
  deleted: boolean;
  is_activity: boolean;
  huddle_type: "public" | "private"; // Adjust if there are more types
  reply_to: string | null;
  message_type: string | null; // Define possible types if applicable
  media_meta: MediaMeta;
}

export interface CreatePostPayload {
  huddle_id: string;
  message: string;
  media?: string; // optional because it seems conditional
  media_height?: number | null; // optional as it's only assigned if fileType is video or image
  media_name?: string; // optional as it might not always be provided
  media_type?: string; // optional
  media_width?: number | null; // optional
  media_duration?: string; // optional for videos
  mime_type?: string; // optional
  s3_key?: string; // optional
  thumbnail?: string; // optional
  color?: string; // optional for media of type video (or image if color is set)
}

export interface PinnedPost {
  huddle_id: string;
  message_id: string;
  activity_meta: unknown | null;
  color: string | null;
  created: string; // ISO date string
  deleted: boolean;
  delivered: boolean | null;
  forward_id: string | null;
  has_mention: boolean | null;
  huddle_type: "public" | "private";
  is_activity: boolean;
  is_edited: boolean | null;
  media: string | null;
  media_meta: unknown | null;
  message: string;
  message_type: string | null;
  read: boolean | null;
  remover: number | null;
  reply_to: string | null;
  sender: number;
  total_likes: number;
  room_id: string;
  pinned: boolean;
  sender_broadcastType: string | null;
  star_type: string | null;
  receiver: number;
  sent: string; // ISO date string
  sender_details: SenderDetails;
  sender_name: string;
  sender_thumbnail_url: string;
  sender_user_role: string;
  sender_account_type: string;
  total_comments: number;
  total_gifts: number;
}

interface ReplyMessage {
  message_id: string;
  reply_id: string;
  message: string;
  media: string | null;
  media_meta: MediaMeta;
  media_type: string | null;
  message_type: string | null;
  mime_type: string | null;
  sender_name: string;
  sender_role: string;
  sender_id: number;
  is_premium: boolean;
  deleted: boolean;
  remover: boolean;
  reported: boolean;
  media_duration: number | null;
  profile_url: string;
  thumbnail_url: string;
  verified: boolean;
  display_country_flag: boolean;
  country_name: string;
  country_code: string;
  total_likes: number;
  total_comments: number;
  liked: boolean;
  created: string; // ISO date string
  sent: string | null;
  sender?: number | undefined;
  sender_broadcastType: string | null;
  display_name: string | null;
  color: string | null;
  has_mention: boolean;
  sender_details?: SenderDetails;
}

export interface Invitation {
  invitation_id: number;
  is_premium: boolean;
  member_id: number;
  member_name: string;
  member_thumbnail: string | null;
  member_username: string;
  status: string;
  verified: boolean;
}

export interface MemberRequest {
  is_premium: boolean;
  member_id: number;
  member_name: string;
  member_thumbnail: string | null;
  member_username: string;
  request_id: number;
  status: string;
  verified: boolean;
}

export interface Report {
  deletedUser: boolean;
  huddle_id: number;
  is_mention: boolean | null;
  media: string | null;
  media_meta: MediaMeta | null;
  message: string;
  message_id: string;
  message_sent: string;
  report_id: number;
  reports_count: number;
  room_id: string;
  sender_id: number;
  sender_membership: string;
  sender_name: string;
  sender_role: string;
  sender_username: string;
  status: string;
  thumbnail: string;
  time_created: string;
  time_updated: string;
  verified: boolean;
}

export interface CommentReport {
  comment: string;
  comment_id: string;
  deletedUser: boolean;
  huddle_id: number;
  media: string | null;
  media_meta: MediaMeta;
  message_sent: string;
  post_id: string;
  report_id: number;
  reports_count: number;
  room_id: string;
  sender_id: number;
  sender_membership: string | null;
  sender_name: string;
  sender_username: string;
  status: string;
  thumbnail: string | null;
  time_created: string;
  time_updated: string;
  verified: boolean;
}

interface HuddleComment {
  huddle_id: number;
  message_id: string;
  id: string;
  created: string; // ISO date string
  is_reported: boolean | null;
  media: string | null;
  media_meta: MediaMeta; // Adjust if media_meta has a known structure
  message: string;
  message_type: string | null;
  // reporters_list: any[] | null; // Adjust type if reporters_list has a known structure
  sender: number;
  sender_details: SenderDetails;
}
