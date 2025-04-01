export interface RegisterResponse {
      wait_time: number;
      next_timestamp: number
}
export interface VerifyEmailResponse {
      access_token: string;
      refresh_token: string;
      user: {
        id: number;
        email: string;
        email_verified: boolean;
        phone: string | null;
        phone_verified: boolean;
        name: string;
        username: string;
        verified: boolean;
        membership: string;
        citizenship: string;
        is_leader: boolean;
        is_country_flag_enabled: boolean;
        has_password: boolean;
        profile_complete_percentage: number;
        profile_checkpoint: number;
        active: boolean;
        blocked_by_admin: boolean;
        blocked_by_leader: boolean;
        role: object;
        time_created: string;
        time_updated: string;
        referral_code: string;
        referral_link: string;
        total_performance_points: number;
        user_language: string;
        user_flax_rate: number | null;
        app_review: object;
        empowerments: object;
        profile: {
          about: string | null;
          allow_change_location: boolean;
          allow_hide_country_flag: boolean;
          date_of_birth: string;
          gender: string;
          is_premium: boolean;
          last_payment_date: string | null;
          profile_photo: string | null;
          subscription_expiration_date: string | null;
          thumbnail: string | null;
          time_created: string;
          time_updated: string;
        };
      };
    
  }
  
  export interface CreatePasswordResponse {
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
  }
  
  export interface CreateProfileResponse {
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
        about: string | null;
        allow_change_location: boolean;
        allow_hide_country_flag: boolean;
        date_of_birth: string;
        gender: "Male" | "Female" | "Prefer Not to Say";
        is_premium: boolean;
        last_payment_date: string | null;
        name: string;
        profile_photo: string | null;
        referral_code: string | null;
        referral_link: string | null;
        subscription_expiration_date: string | null;
        thumbnail: string | null;
        time_created: string;
        time_updated: string;
        total_performance_points: number;
        user_flax_rate: number | null;
        user_language: string | null;
        verified: boolean;
      };
      profile_checkpoint: number;
      profile_complete_percentage: number;
      role: Record<string, unknown>;
      time_created: string;
      time_updated: string;
      username: string | null;
      verified: boolean;
  }

  export interface CreateUserNameResponse {
    message: string;
  }

  export interface SuperStarResponse {
      country_offset: number;
      current_page: number;
      next_page: boolean;
      no_country_offset: number;
      total: number;
      users: SuperStar[];
  }
  export interface SuperStar {
    id: number;
    name: string;
    username: string;
    stars: number;
    likers: number;
    thumbnail?: string | null; 
    membership: "Premium" | "Free" | string;
    citizenship?: string;
    verified: boolean;
    blocked?: boolean; 
    dears: number; 
    fans: number;  
  }


  export interface EmailAvailabilityResponse {
    message: string;
  }

  export interface ConfirmSuperStarResponse {
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
        user_language: string | null;
        user_flax_rate: string | null;
        allow_change_location: boolean;
        allow_hide_country_flag: boolean;
        is_premium: boolean;
      };
      profile_checkpoint: number;
      profile_complete_percentage: number;
      role: Record<string, unknown>;
      time_created: string;
      time_updated: string;
      username: string | null;
      verified: boolean;
    
}