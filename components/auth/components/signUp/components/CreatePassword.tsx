"use client";
import React, { useState, useEffect } from "react";
import Heading from "@/components/Headers/AuthHeading";
import InputBox from "@/components/ui/inputBox/InputBox";
import NextButton from "@/components/ui/Button/NextButton";
import CreateProfile from "./CreateProfile";
import ValidationList from "@/components/ui/ValidationList/ValidationList";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import SignIn from "../../signIn/SignIn";
import { ApiResponse } from "@/types/apiResponse";
import { createPassword } from "@/service/signUp.service";
import { CreatePasswordResponse } from "@/types/signup";

interface CreatePasswordProps {
  email: string;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({ email }) => {
  const { accessToken, setShowCloseBtn } = useSignUp();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<number>(0); 
  const [showCreateProfile, setShowCreateProfile] = useState<boolean>(false);
  const [showPasswordAlready, setShowPasswordAlready] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Validation rules
  const isLengthValid = password.length >= 6;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumberOrSpecial = /[0-9]/.test(password) || /[!@#$%^&*]/.test(password);
  const isPasswordValid = isLengthValid && hasUpperLower && hasNumberOrSpecial;
  const isMatching = password === confirmPassword && password !== "";

  const handleSubmit = async () => {
    if (!accessToken) {
      setPasswordError("Session expired. Please verify again.");
      setErrorKey((prev) => prev + 1); 
      return;
    }

    if (!isMatching) {
      setPasswordError("Passwords do not match.");
      setErrorKey((prev) => prev + 1); 
      return;
    }
    setLoading(true);
    setPasswordError(null); 

    try {
      const response: ApiResponse<CreatePasswordResponse> = await createPassword({
        email,
        password,
        confirm_password: confirmPassword,
        accessToken,
      });

      console.log("Password Response:", response);

      if (response.message === "Your Password is successfully saved") {
        setShowCreateProfile(true);
      } else {
        setPasswordError(response.message || "Failed to create password. Please try again.");
        setErrorKey((prev) => prev + 1); // 🔹 Ensure error message always updates
        if (response.message === "Password already set. Please Login") {
          setTimeout(() => setShowPasswordAlready(true), 2000);
        }
      }
    } catch (error: unknown) {
      console.error("Create Password Error:", error);
      setPasswordError("Something went wrong. Please try again.");
      setErrorKey((prev) => prev + 1);
    } finally {
      setLoading(false); // 🔹 Re-enable the Next button after API call completes
    }
  };

  useEffect(() => {
    setShowCloseBtn(false);
  }, [setShowCloseBtn]);

  return (
    <div>
      {!showCreateProfile && !showPasswordAlready && (
        <div className="mt-medium">
          <Heading text="Create Password" />
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

          {/* 🔹 Unique key ensures error message always updates */}
          {passwordError && <ErrorMessage key={errorKey} message={passwordError} />}

          <ValidationList
            conditions={[
              { isValid: isLengthValid, label: "At least six characters" },
              { isValid: hasUpperLower, label: "Mix of uppercase and lowercase characters" },
              { isValid: hasNumberOrSpecial, label: "At least one number or a special character" },
              { isValid: isMatching, label: "Passwords match" },
            ]}
          />
          <NextButton disabled={!isPasswordValid || !isMatching || loading} onClick={handleSubmit} loading={loading} />
        </div>
      )}
      {showCreateProfile && !showPasswordAlready && <CreateProfile />}
      {showPasswordAlready && <SignIn />}
    </div>
  );
};

export default CreatePassword;
