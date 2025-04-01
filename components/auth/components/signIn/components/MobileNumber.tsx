"use client";
import React, { useState } from "react";
import InputBox from "@/components/ui/inputBox/InputBox";
import { showToast } from "@/utils/toast";
import Button from "@/components/ui/Button/Button";
import CountrySelector from "@/components/ui/CountrySelector/CountrySelector";
import { login } from "@/service/signIn.service";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { useAuth } from "@/contexts/AuthContext";
import { setTokens } from "@/api/auth/tokenService";
import { ApiResponse } from "@/types/apiResponse";
import { LoginResponse } from "@/types/signIn";

interface MobileNumberProps {
  setCheckPoint: (checkPoint: number) => void;
}

const MobileNumber = ({ setCheckPoint }: MobileNumberProps) => {
  const {setIsAuthenticated}=useAuth()
  const { setIsModalOpen ,setAccessToken} = useSignUp();
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;
    setPhoneError(null);
    setPasswordError(null);
    setCountryError(null);
    setErrorMessage(null);

    if (!countryCode) {
      setCountryError("Please select your country.");
      isValid = false;
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!phoneNumber.match(phonePattern)) {
      setPhoneError("Mobile number must be 10-15 digits.");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      showToast("Please correct the errors before submitting.", "error");
      return;
    }
    setLoading(true);
    try {
      const response:ApiResponse<LoginResponse> = await login({ phone: phoneNumber, country_code: countryCode, password });
      if (response?.message === "OK" && response.result) {
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
          setAccessToken(response.result.access_token);
          console.warn("profile_checkpoint is missing in response.");
        }
      } else {
        setErrorMessage(response?.message || "Something went wrong");
        showToast(response?.message || "Something went wrong", "error");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
      showToast("Login failed, please try again", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {/* Mobile Number Section */}
      <div className="flex items-center space-x-2">
        <div className="mt-2">
          <CountrySelector onCountryChange={setCountryCode} defaultCountry="ae" />
          {countryError && <ErrorMessage message={countryError} />}
        </div>
        <div className="w-full">
          <InputBox
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your mobile number"
            required
            maxLength={10}
          />
          {phoneError && <ErrorMessage message={phoneError} />}
        </div>
      </div>
      {/* Password Input */}
      <div>
        <InputBox
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        {passwordError && <ErrorMessage message={passwordError} />}
      </div>

      {/* Login Button */}
      <Button height="h-12" onClick={handleLogin} loading={loading} className="w-full">
        Login
      </Button>
    </div>
  );
};

export default MobileNumber;
