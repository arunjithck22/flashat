export interface MediaMeta {
    media_height?: string;
    media_width?: string;
    media_name?: string;
    media_type?: "IMAGE" | "VIDEO" | "AUDIO" | string;
    mime_type?: string;
    s3_key?: string;
    thumbnail?: string;
    media_duration?: string;
    media_size?: string;
    publish_to_flash?: string;
  }
  
  export interface LastMessage {
    activity_meta: null;
    color: string | null;
    created: string;
    deleted: boolean;
    delivered: null;
    forward_id: string | null;
    has_mention: boolean | null;
    huddle_id: string;
    huddle_type: "public" | "private" | string;
    is_activity: boolean;
    is_edited: boolean | null;
    last_updated: string | null;
    media: string | null;
    media_meta: MediaMeta | null;
    message: string;
    message_id: string;
    message_type: string | null;
    read: boolean | null;
    remover: null;
    reply_to: string | null;
    sender: number;
    sent: string;
    total_likes: number;
  }
  
  export interface SenderDetails {
    deleted_account: boolean;
    name: string;
    user_id: number;
  }
  
  export interface Huddle {
    id: number;
    name: string;
    about: string;
    category: string;
    private: boolean;
    post_privacy: "Anyone" | "MembersOnly" | string;
    comment_privacy: "Anyone" | "MembersOnly" | string;
    reply_privacy: "Anyone" | "MembersOnly" | string;
    request_to_join: boolean;
    requested_invited_count: number;
    participant_share: boolean;
    manager_id: number;
    manager_premium_status: boolean;
    created_by: string;
    group_photo: string | null;
    thumbnail: string | null;
    status: "active" | "inactive" | string;
    tribe: boolean;
    time_created: string;
    time_updated: string;
    online_participants: number;
    total_members: number;
    unread_count: number;
    activity: string | null;
    last_message: LastMessage | null;
    sender_details: SenderDetails | null;
  }
  

  export interface PaginatedHuddles {
    current_page: number;
    next_page: number;
    total: number;
    huddles: Huddle[];
  }



  export interface SenderDetails {
    name: string;
    deleted_account: boolean;
    is_premium: boolean;
    role: 'user' | 'admin';
    profile_url: string;
    thumbnail_url: string;
    verified: boolean;
    country_name: string;
    country_code: string;
    blocked_by_admin: boolean;
    blocked_by_leader: boolean;
    huddle_admin_blocked: boolean;
    user_citizenship: 'PRESIDENT' | 'MINISTER' | string;
    is_banned: boolean;
    is_blacklisted: boolean;
    user_priority?: 'ADMIN' | string;
  }
  
  export interface HuddleMessage {
    huddle_id: string;
    message_id: string;
    activity_meta: unknown | null;
    color: string | null;
    created: string;
    deleted: boolean;
    delivered: string | null;
    forward_id: string | null;
    has_mention: boolean | null;
    huddle_type: 'public' | 'private' | string;
    is_activity: boolean;
    is_edited: boolean | null;
    last_updated: string | null;
    media: string | null;
    media_meta: unknown | null;
    message: string;
    message_type: string | null;
    read: boolean | null;
    remover: string | null;
    reply_to: string | null;
    sender: number;
    total_likes: number;
    room_id: string;
    pinned: boolean;
    sent: string;
    sender_details: SenderDetails;
    sender_name: string;
    sender_thumbnail_url: string;
    sender_user_role: string;
    sender_account_type: 'Premium' | string;
    total_comments: number;
    total_gifts: number;
  }
  
  // ✅ This is now just the "result" part of the response
  export interface HuddleMessagesResult {
    messages: HuddleMessage[];
  }
  