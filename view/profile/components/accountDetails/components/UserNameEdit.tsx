"use client";
import React, { useEffect, useState, useMemo } from "react";
import Heading from "@/components/Headers/AuthHeading";
import InputBox from "@/components/ui/inputBox/InputBox";
import NextButton from "@/components/ui/Button/NextButton";
import ValidationList from "@/components/ui/ValidationList/ValidationList";
import CheckAvailabiltyBtn from "@/components/ui/Button/CheckAvailabiltyBtn";
import { ApiResponse } from "@/types/apiResponse";
import { checkUserNameAvailable, updateUserName } from "@/service/profile.service";
import SuccessMessage from "@/components/ui/messages/SuccessMessage";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import { RegisterResponse } from "@/types/signup";
import { useProfileContext } from "@/contexts/ProfileContext";

interface UserNameProps {
  useName?: string | undefined;
 onClose?: (value: string | null ) => void; 
}

const UserNameEdit: React.FC<UserNameProps> = ({ useName, onClose }) => {
  const [userName, setUserName] = useState<string>(useName ?? "");
  const [isCheckAvailableActive, setIsCheckAvailableActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const { refreshProfile } = useProfileContext();

  const noSpaces = useMemo(() => !/\s/.test(userName), [userName]);
  const validChars = useMemo(
    () => /^[a-zA-Z0-9._]+$/.test(userName),
    [userName]
  );
  const hasAlphaNumeric = useMemo(
    () => /[a-zA-Z]/.test(userName) || /[0-9]/.test(userName),
    [userName]
  );
  const lengthValid = useMemo(
    () => userName.length >= 5 && userName.length <= 15,
    [userName]
  );

  useEffect(() => {
    setIsCheckAvailableActive(
      noSpaces && validChars && hasAlphaNumeric && lengthValid
    );
  }, [noSpaces, validChars, hasAlphaNumeric, lengthValid]);

  const handleCheckAvailability = async () => {
    try {
      setErrorMessage(null);
      setIsUsernameAvailable(false);
      const response: ApiResponse<{ message: string }> =
        await checkUserNameAvailable({ username: userName });
      if (response.message === "Username is available") {
        setIsUsernameAvailable(true);
        setSuccessMessage(response.message)
        await refreshProfile();
      } else {
        setErrorMessage(response.message || "Username is not available");
      }
    } catch (error: unknown) {
      setIsUsernameAvailable(false);
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleConfirm = async () => {
    if (!isUsernameAvailable) return;
    try {
      setErrorMessage(null);
      const response: ApiResponse<RegisterResponse> = await updateUserName({
        username: userName,
      });
      if (response.message === "username updated") {
        setTimeout(()=>{
          setSuccessMessage(response.message || "Username updated successfully");
        },2000)
        setSuccessMessage(response.message);
        await refreshProfile();
        if (onClose) onClose(null);
      } else {
        setErrorMessage(
          response.message || "Something went wrong while updating username."
        );
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div>
      <>
        <Heading text="Update Username" />
        <InputBox
          label="Username"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            setErrorMessage(null);
            setIsUsernameAvailable(false);
            setSuccessMessage(null);
          }}
          placeholder="Enter Your Username"
          required
          showCheckIcon={isUsernameAvailable}
        />
        <SuccessMessage message={successMessage} />
        <ErrorMessage message={errorMessage} />
        {!isUsernameAvailable && (
          <div className="flex justify-center">
            <CheckAvailabiltyBtn
              onClick={handleCheckAvailability}
              disabled={!isCheckAvailableActive}
              isAvailable={isUsernameAvailable}
            />
          </div>
        )}
        <ValidationList
          conditions={[
            { isValid: noSpaces, label: "Space is not allowed" },
            {
              isValid: validChars,
              label: "No special characters other than dot or underscore",
            },
            {
              isValid: hasAlphaNumeric,
              label: "1 alphabet or numeric is compulsory",
            },
            { isValid: lengthValid, label: "Minimum 5 characters (Max:15)" },
          ]}
        />
        <NextButton disabled={!isUsernameAvailable} onClick={handleConfirm} />
      </>
    </div>
  );
};

export default UserNameEdit;
