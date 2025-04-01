"use client";
import React, { useState } from "react";
import Heading from "@/components/Headers/AuthHeading";
import InputBox from "@/components/ui/inputBox/InputBox";
import ValidationList from "@/components/ui/ValidationList/ValidationList";
import Button from "@/components/ui/Button/Button";
import SignIn from "../SignIn";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import { createNewPassword } from "@/service/signIn.service";
import { ApiResponse } from "@/types/apiResponse";
import { PasswordResetResponse } from "@/types/signIn";
import { showToast } from "@/utils/toast";

interface NewPasswordProps{
  email:string
}

const NewPassword:React.FC<NewPasswordProps> = ({email}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading,setIsLoading]=useState(false)
  const { accessToken } = useSignUp(); 


  // Password Validation
  const isLengthValid = password.length >= 6;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumberOrSpecial = /[0-9]/.test(password) || /[!@#$%^&*]/.test(password);
  const isMatching = password === confirmPassword && password !== "";

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (!isMatching) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!accessToken) {
      setErrorMessage("No access token available.");
      return;
    }
    try {
      setIsLoading(true);
      const response: ApiResponse<PasswordResetResponse> = await createNewPassword({
        email,
        password,
        confirm_password: confirmPassword,
        accessToken,
      });
      setIsLoading(false);

      if (response?.result?.user) {
        showToast(response?.message || "Password successfully reset!", "success");
        setIsPasswordChanged(true);
      } else {
        setErrorMessage(response?.message || "Something went wrong");
      }
    
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message || "Error updating password. Please try again.");
        console.error("Error updating password:", error);
      } else {
        setErrorMessage("Error updating password. Please try again.");
      }
    }
    
  };

  return (
    <>
      {!isPasswordChanged && (
        <div className="w-72 md:w-96">
          <Heading text="New Password" />
          <InputBox
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter New Password"
            required
          />

          <InputBox
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter Password"
            required
          />
          <ErrorMessage message={errorMessage} />
          <ValidationList
            conditions={[
              { isValid: isLengthValid, label: "At least six characters" },
              {
                isValid: hasUpperLower,
                label: "Mix of uppercase and lowercase characters",
              },
              {
                isValid: hasNumberOrSpecial,
                label: "At least one number or special character",
              },
              { isValid: isMatching, label: "Passwords match" },
            ]}
          />

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Changing..." : "CHANGE PASSWORD"}
          </Button>
        </div>
      )}

      {isPasswordChanged && <SignIn />}
    </>
  );
};

export default NewPassword;
