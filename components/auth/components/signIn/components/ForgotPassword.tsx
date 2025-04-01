import BackButton from "@/components/ui/Button/BackButton";
import NextButton from "@/components/ui/Button/NextButton";
import Heading from "@/components/Headers/AuthHeading";
import InputBox from "@/components/ui/inputBox/InputBox";
import React, { useState } from "react";
import Otp from "./EnterOtp";
import { ApiResponse } from "@/types/apiResponse";
import { ForgotResponse } from "@/types/signIn";
import { forgotPassword } from "@/service/signIn.service";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!email) return;
    try {
      
      const response: ApiResponse<ForgotResponse> = await forgotPassword({
        email,
        resend: false,
      });

      if (response?.result?.wait_time) {
        setWaitTime(response.result.wait_time);
        setIsOtpVisible(true);
      }
      if (response.result) setIsOtpVisible(true);
    } catch (error: unknown) {
      console.error("Error in forgot password request:", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      {!isOtpVisible ? (
        <div className="w-72 md:w-96">
          <Heading text="Forgot Password" />
          <InputBox
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
            errorMessage="Please enter a valid email address"
          />
          <ErrorMessage message={error} />
          <div className="mt-medium">
            <NextButton
              onClick={handleNext}
              disabled={!email }
            />
            <BackButton onClick={onBack} />
          </div>
        </div>
      ) : (
        <Otp
          email={email}
          waitTime={waitTime ?? 0}
          setIsOtpVisible={setIsOtpVisible}
        />
      )}
    </>
  );
};

export default ForgotPassword;
