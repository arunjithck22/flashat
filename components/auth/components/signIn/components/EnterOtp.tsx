import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import AuthHeading from "@/components/Headers/AuthHeading";
import OtpInput from "@/components/ui/OtpInput/OtpInput";
import React, { useEffect, useState } from "react";
import NewPassword from "./NewPassword";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { forgotPassword, verifyOtp } from "@/service/signIn.service";
import { ForgotResponse, VerifyOTPResponse } from "@/types/signIn";
import { ApiResponse } from "@/types/apiResponse";

interface OtpProps {
  email: string;
  waitTime: number;
  setIsOtpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnterOtp: React.FC<OtpProps> = ({ email, waitTime, setIsOtpVisible }) => {
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isCreatePassword, setIsCreatePassword] = useState(false);
  const [currentWaitTime, setCurrentWaitTime] = useState(waitTime);
  const { setAccessToken, setRefreshToken, setShowCloseBtn } = useSignUp(); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowCloseBtn(false);
  }, [setShowCloseBtn]);

  /** Handle Resend OTP */
  const handleResendOtp = async () => {
    if (!email) return;

    try {
      setError(null);

      const response: ApiResponse<ForgotResponse> = await forgotPassword({
        email,
        resend: true,
      });

      if (response?.result?.wait_time) {
        setCurrentWaitTime(response.result.wait_time);
        setIsOtpVisible(true);
      }
    } catch (err) {
      console.error("Error in forgot password request:", err);
      setError(err instanceof Error ? err.message : "Error resending OTP. Please try again.");
    } 
  };

  /** Handle OTP Submit */
  const handleOtpSubmit = async (otp: string) => {
    try {
      setOtpError(null);
      const otpNumber = parseInt(otp, 10);
      const response: ApiResponse<VerifyOTPResponse> = await verifyOtp({ email, otp: otpNumber });

      console.log("OTP verification response:", response);

      if (response?.result?.access_token) {
        console.log("OTP Verified Successfully! Redirecting...");
        setAccessToken(response.result.access_token);
        setRefreshToken(response.result.refresh_token || "");
        setIsCreatePassword(true);
      } else {
        console.error("OTP Verification Failed: No access token found in response");
        setOtpError(response?.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      setOtpError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    }
  };

  /** Handle Back Navigation */
  const handleBack = () => {
    setIsOtpVisible(false);
  };

  return (
    <>
      {!isCreatePassword ? (
        <div>
          <AuthHeading text="Enter OTP" />
          {otpError && <ErrorMessage message={otpError} />}
          {error && <ErrorMessage message={error} />}
          <OtpInput
            email={email}
            waitTime={currentWaitTime}
            handleOtpSubmit={handleOtpSubmit}
            onResend={handleResendOtp}
            onBack={handleBack}
          />
        </div>
      ) : (
        <NewPassword email={email} />
      )}
    </>
  );
};

export default EnterOtp;
