"use client";
import React, { useEffect, useState, useMemo } from "react";
import Heading from "@/components/Headers/AuthHeading";
import InputBox from "@/components/ui/inputBox/InputBox";
import NextButton from "@/components/ui/Button/NextButton";
import ValidationList from "@/components/ui/ValidationList/ValidationList";
import ConfirmUserName from "./ConfirmUserName";
import CheckAvailabiltyBtn from "@/components/ui/Button/CheckAvailabiltyBtn";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { ApiResponse } from "@/types/apiResponse";
import { createOrCheckUsername } from "@/service/signUp.service";
import SuccessMessage from "@/components/ui/messages/SuccessMessage";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";


const CreateUserName = () => {
  const { accessToken, setShowCloseBtn } = useSignUp();
  const [userName, setUserName] = useState<string>("");
  const [confirmUserName, setConfirmUserName] = useState(false);
  const [isCheckAvailableActive, setIsCheckAvailableActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sucessMessages,setSucessMessages]= useState<string | null>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const noSpaces = useMemo(() => !/\s/.test(userName), [userName]);
  const validChars = useMemo(() => /^[a-zA-Z0-9._]+$/.test(userName), [userName]);
  const hasAlphaNumeric = useMemo(() => /[a-zA-Z]/.test(userName) || /[0-9]/.test(userName), [userName]);
  const lengthValid = useMemo(() => userName.length >= 5 && userName.length <= 15, [userName]);

  const handleSubmit = async () => {
    if (!isUsernameAvailable) return;

    try {
      setErrorMessage(null);
      const response: ApiResponse<{message:string}> = await createOrCheckUsername({
        username: userName,
        check_available: false,
        accessToken: accessToken ?? "",
      });
      if (response.message === "Your username has been set successfully") {
        setConfirmUserName(true);
      } else {
        setErrorMessage(response.message || "Something went wrong while creating username.");
      }
    } catch (error: unknown) {
      console.error("Error submitting username:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  useEffect(() => {
    setIsCheckAvailableActive(noSpaces && validChars && hasAlphaNumeric && lengthValid);
  }, [noSpaces, validChars, hasAlphaNumeric, lengthValid]);

  const handleCheckAvailability = async () => {
    try {
      if (!accessToken) {
        setErrorMessage("Access token is missing");
        return;
      }
      setErrorMessage(null);
      setIsUsernameAvailable(false);
      const response = await createOrCheckUsername({
        username: userName,
        check_available: true,
        accessToken: accessToken ?? "",
      });
      console.log("Username response",response);
      
      if (response.message === "Username is available") {
        setIsUsernameAvailable(true);
        setSucessMessages(response.message || "Username is available");
      } else {
        setErrorMessage(response.message || "Username is not available");
      }
    } catch (error: unknown) {
      setIsUsernameAvailable(false);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleBack = () => {
    setConfirmUserName(false);
  };

  const handleConfirm = () => {
    setConfirmUserName(true);
  };

  useEffect(() => {
    setShowCloseBtn(false);
  }, [setShowCloseBtn]);

  return (
    <div>
      {!confirmUserName ? (
        <>
          <Heading text="Create Username" />
          <InputBox
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setErrorMessage(null);
              setIsUsernameAvailable(false);
            }}
            placeholder="Enter Your Username"
            required
            showCheckIcon={isUsernameAvailable}
          />
          <SuccessMessage message={sucessMessages}/>
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
              { isValid: validChars, label: "No special characters other than dot or underscore" },
              { isValid: hasAlphaNumeric, label: "1 alphabet or numeric is compulsory" },
              { isValid: lengthValid, label: "Minimum 5 characters (Max:15)" },
            ]}
          />
          <NextButton disabled={!isUsernameAvailable} onClick={handleConfirm} />
        </>
      ) : (
        <ConfirmUserName
          userName={userName}
          onBack={handleBack}
          submit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateUserName;
