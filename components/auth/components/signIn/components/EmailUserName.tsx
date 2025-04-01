"use client";
import React, { useState } from "react";
import InputBox from "@/components/ui/inputBox/InputBox";
import Button from "@/components/ui/Button/Button";
import { showToast } from "@/utils/toast";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { ApiResponse } from "@/types/apiResponse";
import { login } from "@/service/signIn.service";
import { LoginResponse } from "@/types/signIn";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";
import { setTokens } from "@/api/auth/tokenService";

interface EmailProps {
  setCheckPoint: (checkPoint: number) => void;
}

const EmailUserName: React.FC<EmailProps> = ({ setCheckPoint }) => {
  const {setIsAuthenticated}=useAuth()
  const { setIsModalOpen, setAccessToken,setRefreshToken } = useSignUp();
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);
    if (!emailOrUsername || !password) {
      setErrorMessage("Please enter email/username and password.");
      return;
    }
    setLoading(true);
    try {
      const response: ApiResponse<LoginResponse> = await login({ email: emailOrUsername, password });
   
      
     if (response?.message === "OK" && response.result) {
      setAccessToken(response.result.access_token);
      setRefreshToken(response.result.refresh_token);
      setCheckPoint(response.result.user.profile_checkpoint);
      if (response.result.user.profile_checkpoint === 0) {
        const user = response.result.user;
        setTokens(
          response.result.access_token,
          response.result.refresh_token,
          user.id,
          user.profile?.profile_photo || "",
          user.membership || "",
          user.citizenship || "",
          user.username || ""
        );
        setIsModalOpen(false);
        setIsAuthenticated(true)
      } else {
        console.warn("profile_checkpoint is missing in response.");
      }
    } else {
      setErrorMessage(response?.message || "Something went wrong");
      showToast(response?.message || "Something went wrong", "error");
    }
    } catch (error: unknown) {
      console.error("Login error:", error);
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmailOrUsername = (input: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernamePattern = /^[a-zA-Z0-9._-]{3,20}$/;

    if (emailPattern.test(input)) {
      return "email";
    } else if (usernamePattern.test(input)) {
      return "username";
    } else {
      return null;
    }
  };

  // Password validation regex
  // const passwordPattern = /^(?=.*[a-z])(?=.*[\d!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;



  return (
    <div>
      <div className="mt-4">
        <InputBox
          label="Email / Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Enter your email or username"
          required
          pattern={
            validateEmailOrUsername(emailOrUsername) === "email"
              ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              : /^[a-zA-Z0-9._-]{3,20}$/
          }
          errorMessage="Please enter a valid email or username"
        />
      </div>
      <div className="mt-4 relative">
      <InputBox
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          pattern={/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/}
          errorMessage="Password must be at least 6 characters, contain at least one letter, and one number OR one special character."
          required
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className="mt-medium">
        <Button height="h-12" onClick={handleLogin} loading={loading}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default EmailUserName;
