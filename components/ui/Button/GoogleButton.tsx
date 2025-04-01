"use client";
import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { ProfileCheckpoints } from "@/constants/enums";
import { googleLogin } from "@/service/signIn.service";
import { ApiResponse } from "@/types/apiResponse";
import { GoogleLoginResponse } from "@/types/signIn";
import { setTokens } from "@/api/auth/tokenService";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface GoogleButtonProps {
  setCheckPoint?: (checkpoint: ProfileCheckpoints | null) => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ setCheckPoint }) => {
  const { setIsModalOpen,setAccessToken } = useSignUp();
  const {setIsAuthenticated}=useAuth()
  const router = useRouter();


  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const response: ApiResponse<GoogleLoginResponse> = await googleLogin({
          id_token: credentialResponse.credential,
        });
        if (response?.result?.user) {
          const { profile_checkpoint, id, profile, membership, citizenship, username } = response.result.user;
          const { access_token, refresh_token } = response.result;

          if (setCheckPoint) {
            setCheckPoint(profile_checkpoint);
          }
          if (profile_checkpoint === 0) {
            if (access_token && refresh_token) {
              setTokens(
                access_token,
                refresh_token,
                id.toString(),
                profile?.profile_photo || "",
                membership || "",
                citizenship || "",
                username || ""
              );
              setIsAuthenticated(true)
              setIsModalOpen(false)
              router.push("/huddles/public");
            }
          }else{
            setAccessToken(access_token);
          }
        }
      } catch (error:unknown) {
        if(error instanceof Error)
        console.error("Google Login API Error:", error);
      }
    }
  };
  const handleLoginError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
      useOneTap
      theme="outline"
      size="large"
      shape="rectangular"
      text="continue_with"
      logo_alignment="center"
    />
  );
};

export default GoogleButton;
