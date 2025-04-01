"use client";
import React, { useState } from "react";
import GoogleButton from "@/components/ui/Button/GoogleButton";
import InputBox from "@/components/ui/inputBox/InputBox";
import Heading from "@/components/Headers/AuthHeading";
import Verification from "./components/Verification";
import NextButton from "@/components/ui/Button/NextButton";
import BackButton from "@/components/ui/Button/BackButton";
import { encryptAES } from "@/utils/encryption";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import { checkEmailAlreadyExists, registerEmail } from "@/service/signUp.service";
import { RegisterResponse } from "@/types/signup";
import { ApiResponse } from "@/types/apiResponse";
import { Devicetype } from "@/constants/enums";

type SignUpProps = {
  onBack: () => void;  
 
};

const SignUp = ({ onBack }: SignUpProps) => {
  const [email, setEmail] = useState<string>("");
  const [encryptedEmail, setEncryptedEmail] = useState<string>("");
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [verificationData, setVerificationData] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loader state
  const [errorMessage,setErrorMessage]=useState("")


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleNext = async () => {
    if (!isEmailValid) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const checkEmailResponse = await checkEmailAlreadyExists({
        email,
        is_edit: false,
      });
      if (checkEmailResponse.message === "Available") {
        const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        const encryptedEmail = await encryptAES(email, key);
        setEncryptedEmail(encryptedEmail);

        const response: ApiResponse<RegisterResponse> = await registerEmail({
          email,
          identity: encryptedEmail,
          resend: false,
          referral_code: "",
          device: Devicetype.WEB,
        });

        if (response?.result) {
          setVerificationData(response.result);
          setShowVerification(true);
        } else {
          setErrorMessage(response.message || "Something went wrong");
        }
      } else {
        setErrorMessage(checkEmailResponse.message || "Something went wrong");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error)
        setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowVerification(false);
  };


  return (
    <>
      {!showVerification && (
        <div className="w-52 md:w-72 rounded-md">
          <div className="flex justify-center items-center">
            <Heading text="Sign Up" />
          </div>
          <div className="mt-medium">
            <GoogleButton />
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="mt-medium">
            <InputBox
              label="Email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              errorMessage="Please enter a valid email address"
            />
          </div>
          {errorMessage&&<ErrorMessage message={errorMessage}/>}
          <div className="mt-medium">
            <NextButton
              disabled={!isEmailValid}
              onClick={handleNext}
              loading={loading}
            />
            <BackButton onClick={onBack} />
          </div>
        </div>
      )}
      {showVerification && verificationData && (
        <Verification
          email={email}
          encryptedEmail={encryptedEmail}
          onBack={handleBack}
          waitTime={verificationData?.wait_time}
        />
      )}
    </>
  );
};

export default SignUp;
