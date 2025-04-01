export interface Nickname {
    time_created: string;
    time_updated: string;
    created_by_id: number;
    created_for_id: number;
    nick_name: string;
    id: number;
  }
  
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
  
  export interface ProfileResponse {
      id: number;
      name: string;
      username: string;
      has_password: boolean;
      nicknames: Nickname[];
      verified: boolean;
      empowerments: Empowerments;
      created_on: string;
      email: string;
      phone: string;
      country_code_iso: string;
      country_code: string;
      country: string;
      dob: string;
      gender: string;
      about: string;
      profile_photo: string;
      thumbnail: string;
      device: string | null;
      blocked: boolean;
      account_status: string;
      payment_date: string | null;
      membership: string;
      subscription_status: string;
      active_points: number;
      inactive_points: number;
      fans: number;
      dears: number;
      stars: number;
      likers: number;
      total_performance_points: number;
      is_premium: boolean;
      pp_rate: number;
      is_referrer: boolean;
      location_skipped: boolean;
      referral_link: string;
      longitude: number;
      latitude: number;
      profile_complete_percentage: number;
      subscription_expiration_date: string;
      broadcast_delete_timeout: number;
      huddle_message_delete_timeout: number;
      private_message_delete_timeout: number;
      video_duration_limit: number;
      total_broadcasts: number;
      total_likes: number;
      huddle_participants_limit_for_free: number;
      flax_rate: number;
      flax_rate_percentage: number;
      flax_increment: boolean;
      citizenship: string;
      flash_duration: number;
      allow_change_location: boolean;
      allow_hide_country_flag: boolean;
      total_gift_points: number;
      total_received_points: number;
      total_received_points_thismonth: number;
      user_gift_sum: number;
      remaining_days_for_resident: number;
      show_country_flag: boolean;
      is_country_flag_enabled: boolean;
      contributor_level: string;
      player_level: string;
      subscription_expiry_date: string;
      total_flash_published: number;
      total_public_podiums: number;
      issue_date: string;
      is_birthday_today: boolean;
      flash_block: boolean;
      user_functionality_blocks: UserFunctionalityBlocks;
      user_uuid: string;
      user_level_animation_url: string;
      citizenship_priority: number;
      is_flix_subscription_renewed: boolean | null;
      location_changed: boolean;
      total_postat_posts: number;
      diamond_likes: number;
      coins_needed_next_contributor_level: number;
      games_needed_next_player_level: number;

  }
  

  export interface Profile {
    time_created: string;
    time_updated: string;
    name: string;
    gender: string;
    date_of_birth: string;
    subscription_expiration_date: string;
    profile_photo: string;
    about: string;
    thumbnail: string;
    referral_code: string;
    total_performance_points: number;
    referral_link: string;
    verified: boolean;
    last_payment_date: string;
    user_language: string;
    user_flax_rate: number;
    allow_change_location: boolean;
    allow_hide_country_flag: boolean;
    is_premium: boolean;
  }
  
  export interface AppReview {
    time_created: string;
    time_updated: string;
    id: number;
    screenshot_url: string;
    user_id: number;
    name: string;
    user_name: string;
    citizenship: string;
    reviewed_id: number;
    reviewed_by: string;
    status: string;
  }
  
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
  
  export interface UpdateProfileResponse {
    time_created: string;
    time_updated: string;
    id: number;
    username: string;
    email: string;
    has_password: boolean;
    phone: string;
    email_verified: boolean;
    phone_verified: boolean;
    blocked_by_admin: boolean;
    active: boolean;
    role: Record<string, unknown>;
    profile: Profile;
    app_review: AppReview;
    profile_checkpoint: number;
    membership: string;
    profile_complete_percentage: number;
    country_code: string;
    verified: boolean;
    citizenship: string;
    is_leader: boolean;
    blocked_by_leader: boolean;
    empowerments: Empowerments;
    is_country_flag_enabled: boolean;
  }