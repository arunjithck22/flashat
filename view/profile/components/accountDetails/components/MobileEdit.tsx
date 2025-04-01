import React, { useState } from "react";
import CountrySelector from "@/components/ui/CountrySelector/CountrySelector";
import EditableDropdown from "@/components/ui/DropdownBox/EditableDropdown";
import Modal from "@/components/ui/modal/Modal";
import AuthHeading from "@/components/Headers/AuthHeading";
import OtpInput from "@/components/ui/OtpInput/OtpInput";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import SuccessMessage from "@/components/ui/messages/SuccessMessage";
import { checkMobileAvailable, updateMobileNumber, verifyMobileNumber } from "@/service/profile.service";
import { useProfileContext } from "@/contexts/ProfileContext";
import { parsePhoneNumberFromString } from 'libphonenumber-js';




interface MobileEditProps {
  value: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

const MobileEdit: React.FC<MobileEditProps> = ({ value, onSave, onCancel }) => {
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [mobileNumber, setMobileNumber] = useState<string>(value);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [waitTime, setWaitTime] = useState<number>(0);
  const [otpError, setOtpError] = useState<string>("");
  const { refreshProfile } = useProfileContext();

  const handleSave = async (newValue: string) => {
    setErrorMessage("");
    setSuccessMessage("");
    setMobileNumber(newValue)
    
    const fullNumber = `${countryCode} ${newValue}`;

  const isValidNumber = (number: string) => {
    try {
      const phoneNumber = parsePhoneNumberFromString(number);
      return phoneNumber?.isValid() || false;
    } catch (error:unknown) {
      if (error instanceof Error) return false;
    }
  };

  if (newValue.length < 5) {
    setErrorMessage("Mobile number is too short.");
    return;
  }

  if (!isValidNumber(fullNumber)) {
    setErrorMessage("Invalid mobile number. Please check the country code and number.");
    return;
  }

  setSuccessMessage("Valid number. Proceeding...");
  setLoading(true);
   
  
    try {
      const checkResponse = await checkMobileAvailable({
        country_code: Number(countryCode.replace("+", "")),
        phone: Number(mobileNumber),
        is_edit: false,
      });


      if (checkResponse?.message === "Available") {
        const updateResponse = await updateMobileNumber({
          country_code: Number(countryCode),
          phone: Number(mobileNumber),
          resend: false,
        });

        if (updateResponse?.result) {
          
          setWaitTime(updateResponse.result.wait_time);
          setIsModalOpen(true);
        } else {
          setErrorMessage(updateResponse?.message || "Something went wrong!");
        }
      } else {
        setErrorMessage(checkResponse?.message || "Number not available");
      }
    } catch (error) {
      console.error("❌ Mobile Update Error:", error);
      setErrorMessage("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    setOtpError("");
    setLoading(true);

    try {
      const verifyResponse = await verifyMobileNumber({
        country_code: Number(countryCode.replace('+', '')),
        phone: Number(mobileNumber),
        otp: Number(otp),
      });

      if (verifyResponse?.result) {
        await refreshProfile();
        setSuccessMessage(verifyResponse.message || "Mobile number verified successfully");
        setTimeout(() => {
          onSave(mobileNumber);
          setIsModalOpen(false);
        }, 2000);
      } else {
        setOtpError(verifyResponse?.message || "Invalid OTP! Please try again.");
      }
    } catch (error) {
      console.error("❌ OTP Verification Error:", error);
      setOtpError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-2 w-full">
        <CountrySelector
          onCountryChange={setCountryCode}
          defaultCountry="ae"
          width="w-24"
          height="h-10"
          marginTop="mt-5"
        />
        <EditableDropdown
          label="Mobile Number"
          value={mobileNumber}
          onChange={setMobileNumber}
          onSave={handleSave}
          onCancel={onCancel}
          loading={loading}
          type="number"
          responseError={errorMessage}
          responseSuccess={successMessage}
          maxLength={15}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-72">
          <AuthHeading text="Verification" />
          <OtpInput
            mobile={mobileNumber}
            waitTime={waitTime}
            handleOtpSubmit={handleOTPSubmit}
            onResend={() => handleSave(mobileNumber)}
            onBack={() => setIsModalOpen(false)}
            type="mobile"
          />
          {otpError && <ErrorMessage message={otpError} />}
          <SuccessMessage message={successMessage} />
        </div>
      </Modal>
    </>
  );
};

export default MobileEdit;
