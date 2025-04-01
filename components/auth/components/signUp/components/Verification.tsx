import React, { useEffect, useState } from "react";
import Heading from "@/components/Headers/AuthHeading";
import CreatePassword from "./CreatePassword"; 
import OtpInput from "@/components/ui/OtpInput/OtpInput";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import { RegisterResponse, VerifyEmailResponse } from "@/types/signup";
import { ApiResponse } from "@/types/apiResponse";
import { registerEmail, verifySignupEmailOtp } from "@/service/signUp.service";
import { Devicetype } from "@/constants/enums";

interface VerificationProps {
  email: string;  
  onBack: () => void;
  waitTime: number;
  encryptedEmail: string;
}

const Verification: React.FC<VerificationProps> = ({ email, onBack, waitTime, encryptedEmail }) => {
  const { setAccessToken, setRefreshToken, accessToken ,setShowCloseBtn} = useSignUp();
  const [isCreatePassword, setIsCreatePassword] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [currentWaitTime, setCurrentWaitTime] = useState(waitTime);

  const handleResendOtp = async () => {
    try {
      setOtpError(null);
      const response: ApiResponse<RegisterResponse> = await registerEmail({
        email,
        identity: encryptedEmail,
        resend: true,
        referral_code: "",
        device: Devicetype.WEB,
      });
  
      if (response.result?.wait_time !== undefined) {
        setCurrentWaitTime(response.result.wait_time);
      }else{
        setOtpError(response?.message|| "somthing went wrong")
      }
    } catch (error: unknown) {
      console.error("Failed to resend OTP:", error);
      if (error instanceof Error) {
        setOtpError(error.message);
      } else {
        setOtpError("Error resending OTP. Please try again.");
      }
    }
  };
  
  const handleOtpSubmit = async (otp: string) => {
    try {
      setOtpError(null);
      const otpNumber = parseInt(otp, 10);
      const response: ApiResponse<VerifyEmailResponse> = await verifySignupEmailOtp({
        email,
        otp: otpNumber,
      });
      if (response.result?.access_token) {
        setAccessToken(response.result.access_token);
        setRefreshToken(response.result.refresh_token || "");
        setIsCreatePassword(true);
      } else {
        console.error("OTP Verification Failed: No access token found in response");
        setOtpError(response.message || "OTP verification failed. Please try again.");
      }
    } catch (error: unknown) {
      console.error("OTP Verification Failed:", error);

      if (error instanceof Error) {
        if (error.message.includes("Invalid code")) {
          setOtpError("Invalid OTP. Please try again.");
        } else {
          setOtpError(error.message || "Something went wrong. Please try again.");
        }
      } else {
        setOtpError("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    setShowCloseBtn(false);
  }, [setShowCloseBtn]);

  const handleBack = () => {
    onBack();
  };
 
  return (
    <>
      {isCreatePassword && accessToken ? (
        <CreatePassword email={email} />
      ) : (
        <>
          <Heading text="Verification" />
          {otpError && <ErrorMessage message={otpError}/>}
          <OtpInput
            email={email}
            handleOtpSubmit={handleOtpSubmit}
            onResend={handleResendOtp}
            onBack={handleBack}
            waitTime={currentWaitTime}
          />
        </>
      )}
    </>
  );
};

export default Verification;
