export const SIGNIN_ENDPOINTS = {
    LOGIN: "/web-login",
    LOGOUT: "/logout",
    REFRESH_TOKEN: "/refresh-token",
    FORGOT_PASSWORD:"/user/password/forgot",
    PASSWORD_VERIFY:"/user/password/verify",
    PASSWORD_RESET:"/user/password/reset",
    GOOGLE_LOGIN:"/web-google-login"
  };
 

  export const SIGNUP_ENDPOINTS = {
    EMAIL_SIGNUP: "/user/register/email",
    VERIFY_EMAIL: "/user/verify/email",
    FORGOT_PASSWORD: "/user/password/forgot",
    VERIFY_PASSWORD: "/user/password/verify",
    RESET_PASSWORD: "/user/password/reset",
    CREATE_PASSWORD: "/user/password",
    CREATE_PROFILE: "/user/profile",
    PRIVACY_POLICY: "/user/documents",
    LEGAL_DOCUMENTS: (policyType: string) => 
      `/user/legal/documents?policy_type=${encodeURIComponent(policyType)}`,
    CREATE_USERNAME: "/user/username",
    SELECT_SUPERSTAR: "/user/superstars",
    CONFIRM_SUPERSTAR: "/user/superstars",
    GOOGLE_LOGIN: "/web-google-login",
    CHECK_EMAIL_ENDPOINT:"/user/register/check-availability"
  };
  