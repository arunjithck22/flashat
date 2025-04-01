"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDone } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
import ConfirmSuperStarCard from "@/components/cards/confirmSuperStar/ConfirmSuperStarCard";
import Button from "@/components/ui/Button/Button";
import Heading from "@/components/Headers/AuthHeading";
import SelectSuperStar from "./SelectSuperStar/SelectSuperStar";
import { SuperStar } from "@/types/register"; 
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { useAuth } from "@/contexts/AuthContext";
import { confirmSuperStar } from "@/service/signUp.service";
import { ApiResponse } from "@/types/apiResponse";
import { ConfirmSuperStarResponse } from "@/types/signup";
import { setTokens } from "@/api/auth/tokenService";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import SuccessMessage from "@/components/ui/messages/SuccessMessage";

interface ConfirmSuperStarProps {
  selectedSuperstar?: SuperStar | null;
}
const ConfirmSuperStar: React.FC<ConfirmSuperStarProps> = ({ selectedSuperstar }) => {
  const { accessToken, refreshToken, setIsModalOpen } = useSignUp();
  const { setIsAuthenticated } = useAuth();
  const [back, setBack] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (!selectedSuperstar) {
      setErrorMessage("No superstar selected");
      return;
    }

    if (!accessToken || !refreshToken) {
      setErrorMessage("Authentication tokens are missing");
      return;
    }
    
    try {
      setErrorMessage(null);
      setLoading(true);
      
      const response: ApiResponse<ConfirmSuperStarResponse> = await confirmSuperStar({
        superstar_id: selectedSuperstar.id.toString(),
        accessToken,
      });
      
      if (response?.result) {
        const user = response.result;
        await setTokens(
          accessToken,
          refreshToken,
          user.id.toString(),
          user.profile?.profile_photo || "",
          user.membership || "",
          user.citizenship || "",
          user.username || ""
        );

        setSuccessMessage(response.message || "SignUp Successfully");
        
        setTimeout(() => {
          setIsAuthenticated(true);
          setIsModalOpen(false);
          router.push("/huddles/public");
        }, 2000);
      } else {
        setErrorMessage(response?.message || "Something went wrong confirming superstar.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error confirming superstar:", error.message);
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setBack(true);
  };

  return (
    <>
      {!back && selectedSuperstar && (
        <div className="w-96 m-3">
          <Heading text="Confirm SuperStar" />
          <div className="mt-6">
            <ConfirmSuperStarCard data={selectedSuperstar} />
          </div>
          <SuccessMessage message={successMessage} />
          <div className="mt-medium">
            <div className="flex items-center">
              <MdDone className="text-visitorText text-2xl border border-visitorText rounded-full p-1 mr-2 font-bold" />
              <p className="text-sm">A Superstar once confirmed cannot be changed.</p>
            </div>
            <div className="flex items-center gap-2">
              <BsExclamationCircle className="text-visitorText text-3xl font-bold" />
              <p className="text-sm">Click on Change to select another user as your Superstar from the list.</p>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <Button
              onClick={handleBack}
              bgColor="bg-none"
              textColor="text-primary"
              borderColor="border-primary"
              borderWidth="border-[1px]"
              border
            >
              CHANGE
            </Button>
            <Button onClick={handleConfirm}  loading={loading}>CONFIRM</Button>
          </div>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      {back && <SelectSuperStar />}
    </>
  );
};

export default ConfirmSuperStar;
