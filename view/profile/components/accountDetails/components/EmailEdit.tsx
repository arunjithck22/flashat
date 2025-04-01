import EditableDropdown from "@/components/ui/DropdownBox/EditableDropdown";
import AuthHeading from "@/components/Headers/AuthHeading";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import SuccessMessage from "@/components/ui/messages/SuccessMessage";
import Modal from "@/components/ui/modal/Modal";
import OtpInput from "@/components/ui/OtpInput/OtpInput";
import { useProfileContext } from "@/contexts/ProfileContext";
import { getEmailOtp, verifyEmail } from "@/service/profile.service"; 
import { ApiResponse } from "@/types/apiResponse";
import { RegisterResponse } from "@/types/signup";
import React, { useState } from "react";

interface EmailEditProps {
  value: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

const EmailEdit: React.FC<EmailEditProps> = ({ value, onSave, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updatedValue, setUpdatedValue] = useState<string>(value);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [waitTime, setWaitTime] = useState<number>(0);
  const [otpError, setOtpError] = useState<string>(""); 
  const { refreshProfile } = useProfileContext(); 


  const handleSave = async (newValue: string) => {
    setUpdatedValue(newValue);
    setLoading(true);
    setErrorMessage("");

    try {
      const response: ApiResponse<RegisterResponse> = await getEmailOtp({ email: newValue, resend: "false" });
      if (response?.result) {
        setWaitTime(response?.result?.wait_time);
        setIsModalOpen(true); 
      } else {
        setErrorMessage(response?.message || "Something went wrong!");
        console.error("❌ Error sending OTP:", response?.message);
      }
    } catch (error: unknown) {
      console.error("❌ API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit OTP for verification
  const handleOTPSubmit = async (otp: string) => {
    setOtpError(""); 
    setLoading(true);

    try {
      const verifyResponse: ApiResponse<RegisterResponse> = await verifyEmail({
        email: updatedValue,
        otp: Number(otp),
      });

      if (verifyResponse?.result) {
        setTimeout(()=>{
          setSuccessMessage(verifyResponse.message ||"Successfully update email")
          setIsModalOpen(false);
          onSave(updatedValue); 
        
        },2000)
        await refreshProfile();
      } else {
        setOtpError(
          verifyResponse?.message || "Invalid OTP! Please try again."
        ); 
      }
    } catch (error: unknown) {
      setOtpError("Something went wrong! Please try again.");
      console.error("❌ OTP Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EditableDropdown
        label="Email Address"
        value={value}
        onSave={handleSave} 
        onCancel={onCancel}
        loading={loading} 
        responseError={errorMessage}
        
      />
      {/* OTP Verification Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <AuthHeading text="Verification" />
          {otpError && <ErrorMessage message={otpError} />} 
          {successMessage&&<SuccessMessage message={successMessage}/>}
          <OtpInput
            email={updatedValue}
            waitTime={waitTime} 
            handleOtpSubmit={handleOTPSubmit} 
            onResend={() => getEmailOtp({ email: updatedValue, resend: "true" })}
            onBack={() => setIsModalOpen(false)}
          />
        
        </>
      </Modal>
    </>
  );
};

export default EmailEdit;
