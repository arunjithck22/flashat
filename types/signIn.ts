export interface LoginResponse {
    user: {
        time_created: string;
        time_updated: string;
        id: string;
        username: string;
        email: string;
        has_password: boolean;
        phone: string;
        email_verified: boolean;
        phone_verified: boolean;
        blocked_by_admin: boolean;
        active: boolean;
        role: Record<string, unknown>;
        profile: {
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
        };
        app_review: {
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
        };
        profile_checkpoint: number;
        membership: string;
        profile_complete_percentage: number;
        country_code: string;
        verified: boolean;
        citizenship: string;
        is_leader: boolean;
        blocked_by_leader: boolean;
        empowerments: {
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
        };
        is_country_flag_enabled: boolean;
    };
    access_token: string;
    refresh_token: string;
    unread_private_chats: number;
    unread_private_huddles: number;
    my_huddles_count: number;
    my_admin_huddles_count: number;
    my_joined_huddles_count: number;
}
export type LogoutResponse = {
    result: boolean;
    message: string;
};
export interface ForgotResponse {
     wait_time: number;
    next_timestamp: number;
}

export interface VerifyOTPResponse {
      access_token: string;
      refresh_token: string;
      user: {
        active: boolean;
        app_review: Record<string, unknown>;
        blocked_by_admin: boolean;
        blocked_by_leader: boolean;
        citizenship: string;
        country_code: string | null;
        email: string;
        email_verified: boolean;
        empowerments: Record<string, unknown>;
        has_password: boolean;
        id: number;
        is_country_flag_enabled: boolean;
        is_leader: boolean;
        membership: string;
        phone: string | null;
        phone_verified: boolean;
        profile: {
          is_premium: boolean;
        };
        profile_checkpoint: number;
        profile_complete_percentage: number;
        role: Record<string, unknown>;
        time_created: string;
        time_updated: string;
        username: string | null;
        verified: boolean;
    };
  }

  export interface PasswordResetResponse {
    message: string;
    result: {
      user: {
        active: boolean;
        app_review: Record<string, unknown>;
        blocked_by_admin: boolean;
        blocked_by_leader: boolean;
        citizenship: string;
        country_code: string | null;
        email: string;
        email_verified: boolean;
        empowerments: Record<string, unknown>;
        has_password: boolean;
        id: number;
        is_country_flag_enabled: boolean;
        is_leader: boolean;
        membership: string;
        phone: string | null;
        phone_verified: boolean;
        profile: {
          is_premium: boolean;
        };
        profile_checkpoint: number;
        profile_complete_percentage: number;
        role: Record<string, unknown>;
        time_created: string;
        time_updated: string;
        username: string | null;
        verified: boolean;
      };
    };
  }

  export interface PasswordResetResponse {
      user: {
        active: boolean;
        app_review: Record<string, unknown>;
        blocked_by_admin: boolean;
        blocked_by_leader: boolean;
        citizenship: string;
        country_code: string | null;
        email: string;
        email_verified: boolean;
        empowerments: Record<string, unknown>;
        has_password: boolean;
        id: number;
        is_country_flag_enabled: boolean;
        is_leader: boolean;
        membership: string;
        phone: string | null;
        phone_verified: boolean;
        profile: {
          is_premium: boolean;
        };
        profile_checkpoint: number;
        profile_complete_percentage: number;
        role: Record<string, unknown>;
        time_created: string;
        time_updated: string;
        username: string | null;
        verified: boolean;
      };
    };
  
    export interface GoogleLoginResponse {
        access_token: string;
        refresh_token: string;
        unread_private_chats: number;
        unread_private_huddles: number;
        my_huddles_count: number;
        my_admin_huddles_count: number;
        my_joined_huddles_count: number;
        is_new_social_connection: boolean;
        is_new_user_account: boolean;
        is_new_user_profile: boolean;
        google_user_info: {
          aud: string;
          azp: string;
          email: string;
          email_verified: boolean;
          exp: number;
          family_name: string;
          given_name: string;
          hd?: string; 
          iat: number;
          iss: string;
          jti: string;
          name: string;
          nbf: number;
          picture: string;
          sub: string;
        };
        user: {
          id: number;
          username: string;
          email: string;
          email_verified: boolean;
          phone: string | null;
          phone_verified: boolean;
          blocked_by_admin: boolean;
          blocked_by_leader: boolean;
          active: boolean;
          verified: boolean;
          membership: string;
          profile_checkpoint: number;
          profile_complete_percentage: number;
          country_code: string | null;
          citizenship: string;
          is_leader: boolean;
          is_country_flag_enabled: boolean;
          profile: {
            time_created: string;
            time_updated: string;
            name: string;
            gender: string;
            date_of_birth: string;
            subscription_expiration_date: string | null;
            profile_photo: string | null;
            about: string | null;
            thumbnail: string | null;
            referral_code: string;
            total_performance_points: number;
            referral_link: string;
            verified: boolean;
            last_payment_date: string | null;
            user_language: string;
            user_flax_rate: number;
            allow_change_location: boolean;
            allow_hide_country_flag: boolean;
            is_premium: boolean;
          };
          empowerments?: {
            allow_hide_flag?: boolean;
            allow_change_location?: boolean;
            allow_block_user_huddle?: boolean;
            allow_block_user_flashat?: boolean;
            allow_delete_post_huddle?: boolean;
            allow_enter_huddle?: boolean;
            allow_delete_flash_video?: boolean;
            allow_end_podium?: boolean;
            allow_join_hidden_podium?: boolean | null;
            allow_end_speaking_session_podium?: boolean;
            allow_delete_comments_podium?: boolean;
            allow_block_user_speaking_podium?: boolean;
            allow_block_user_podium?: boolean | null;
            allow_block_user_comments_podium?: boolean;
            allow_hide_online_status?: boolean | null;
            allow_freeze_user_comments_podium?: boolean | null;
            allow_delete_postat_post?: boolean | null;
            allow_block_user_posting_postat?: boolean;
            allow_block_user_posting_flash?: boolean;
            allow_block_user_posting_huddle?: boolean;
            allow_see_hidden_users_podium?: boolean | null;
          };
          app_review?: {
            time_created?: string;
            time_updated?: string;
            id?: number;
            screenshot_url?: string;
            user_id?: number;
            name?: string;
            user_name?: string;
            citizenship?: string;
            reviewed_id?: number;
            reviewed_by?: string;
            status?: string;
          };
          time_created: string;
          time_updated: string;
          role: Record<string, unknown>;
        };
      };

    