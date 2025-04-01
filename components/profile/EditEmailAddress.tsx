"use client";
import useUpdateAccount from "@/app/hooks/account/useUpdateAccountDetails";
import { QKEY_GET_USER_PROFILE } from "@/app/hooks/account/useUserProfile";
import useVerifyOtp from "@/app/hooks/account/useVerifyOtp";
import { useLanguage } from "@/contexts/LanguageContext";
import { commonToast } from "@/utils/commonToast";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OTPVerification from "../shared/otp/OTPVerification";
import Image from "next/image";

interface EditEmailAddressProps {
  email: string;
  setEditEmail: (value: boolean) => void;
}

interface ApiResponse {
  result?: {
    wait_time: number;
  };
}

const EditEmailAddress = ({ email, setEditEmail }: EditEmailAddressProps) => {
  const otp = useTranslations("otp");
  const common = useTranslations("common");
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [OTPWaitTime, setOTPWaitTime] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const editAccountMutation = useUpdateAccount();
  const verifyOTPMutation = useVerifyOtp("email");
  const queryClient = useQueryClient();
  const { locale } = useLanguage();

  useEffect(() => {
    return () => {
      // Cleanup any active toasts on unmount
      toast.dismiss();
    };
  }, []);

  const handleSubmitOtp = () => {
    verifyOTPMutation.mutate(
      {
        data: {
          email: updatedEmail,
          otp: Number(otpCode),
        },
      },
      {
        onSuccess: () => {
          setOtpErr("");
          queryClient.invalidateQueries({
            queryKey: [QKEY_GET_USER_PROFILE],
          });
          setOpenOTPModal(false);
          setEditEmail(false);
        },
        onError: (err: { message?: string }) => {
          setOtpErr(err?.message || "");
        },
      }
    );
  };

  const verificationFn = ({ resend }: { resend: boolean }) => {
    editAccountMutation.mutate(
      {
        data: {
          email: updatedEmail,
          resend: resend,
        },
      },
      {
        onSuccess: (data: void | Response) => {
          console.log("message success full", data);
          if (data && "result" in data) {
            setOTPWaitTime((data as ApiResponse).result?.wait_time || 0);
          }
          setOpenOTPModal(true);

          commonToast({
            message: `An otp has been send to ${updatedEmail}`,
            rtl: locale === "ar",
            icon: (
              <Image
                src="/logo/flashat-logo.png"
                alt="Custom Icon"
                width={30}
                height={30}
              />
            ),
          });
          setErrMessage("");
        },
        onError: (err: { message?: string }) => {
          setErrMessage(err?.message || "");
        },
      }
    );
  };
  return (
    <div className="flex justify-between w-full mt-4 ">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center ">
          <label className="text-xs text-tsecond  " htmlFor="">
            {common("email")}
          </label>
          <div className="flex items-center justify-center gap-2">
            <span
              onClick={() => {
                setEditEmail(false);
              }}
              className="text-red-500 uppercase text-xs base-bold cursor-pointer"
            >
              {common("cancel")}
            </span>
            <OTPVerification
              openOTPModal={openOTPModal}
              setOpenOTPModal={setOpenOTPModal}
              submitFn={handleSubmitOtp}
              headerImage="/bg/verify-email.svg"
              firstCaption={otp("header1")}
              secondCaption={`${otp("we_have_send_an_otp_to")} ${updatedEmail}`}
              type="email"
              verificationFn={verificationFn}
              OTPWaitTime={OTPWaitTime}
              setOTPWaitTime={setOTPWaitTime}
              setOtpCode={setOtpCode}
              otpCode={otpCode}
              otpErr={otpErr}
              setOtpErr={setOtpErr}
            />
          </div>
        </div>
        <input
          className="w-full border border-1 text-sm rounded-md px-2 py-2"
          type="email"
          value={updatedEmail}
          onChange={(e) => {
            setUpdatedEmail(e.target.value);
          }}
        />
        {errMessage && (
          <p
            className="w-full text-start px-2 text-xs"
            style={{ color: "red" }}
          >
            {errMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditEmailAddress;
