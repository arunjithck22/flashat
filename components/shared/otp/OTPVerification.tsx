/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import OTPInput from "./OTPInput";
import { useTranslations } from "next-intl";

// interface OTPModalInterface {
//   openOTPModal: boolean;
//   setOpenOTPModal: any;
//   SubmitFn: any;
//   headerImage: string;
//   firstCaption: string;
//   secondCaption: string;
//   type: string;
//   verificationFn: any;
//   OTPWaitTime: any;
//   setOTPWaitTime: any;
//   setOtpCode: any;

//   otpErr: any;
//   setOtpErr: any;
// }

const OTPVerification: React.FC<any> = ({
  openOTPModal,
  setOpenOTPModal,
  submitFn,
  headerImage,
  firstCaption,
  secondCaption,
  type,

  verificationFn,
  OTPWaitTime,
  setOTPWaitTime,
  setOtpCode,
  otpCode,
  otpErr,
  setOtpErr,
}) => {
  const common: any = useTranslations("common");
  const t: any = useTranslations("otp");
  useEffect(() => {
    if (OTPWaitTime > 0) {
      const intervalId = setInterval(() => {
        setOTPWaitTime((prevTime: any) => prevTime - 1);
      }, 1000);

      // Clear the interval when the component unmounts or OTPWaitTime changes
      return () => clearInterval(intervalId);
    }
  }, [OTPWaitTime, setOTPWaitTime]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <Dialog open={openOTPModal}>
      <DialogTrigger
        onClick={() => {
          //   setOpenOTPModal(true);
          verificationFn({ resend: false });
        }}
        asChild
      >
        <Button
          variant="outline"
          className="text-primary uppercase text-xs base-bold font-bold cursor-pointer border-0"
        >
          {common("save")}
        </Button>
      </DialogTrigger>
      <DialogContent className="     bg-white flex flex-col justify-center items-center">
        <DialogTitle>{t("verifcation")}</DialogTitle>
        <Image
          src="/tw/HuddleInfo/close.svg"
          className="cursor-pointer absolute top-2 right-2"
          onClick={() => {
            setOpenOTPModal(false);
            setOtpErr("");
          }}
          width={25}
          height={25}
          alt="close-icon"
        />

        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader> */}

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
        <div>
          <Image src={headerImage} alt="banner" width={200} height={200} />
        </div>
        <div className="py-5">
          <p className="text-xs text-gray-400 ">{firstCaption}</p>
        </div>
        <div>
          <p className="text-sm ">{secondCaption}</p>
        </div>
        <div>
          <p className="text-xs base-bold uppercase text-primary">
            {type === "email" ? t("change_email") : t("change_number")}
          </p>
        </div>
        <OTPInput setOtpCode={setOtpCode} />
        <p className="text-red-500 text-xs  ">{otpErr}</p>
        <div className="py-2">
          {OTPWaitTime === 0 ? (
            <button
              onClick={() => {
                verificationFn({ resend: true });
              }}
              className="text-xs uppercase base-bold text-primary bg-transparent"
            >
              {t("resend_otp")}
            </button>
          ) : (
            <p className="text-black text-xs">
              {" "}
              {t("resend_otp_in")} <span>{formatTime(OTPWaitTime)}</span>{" "}
            </p>
          )}
        </div>
        <div className="w-full">
          <button
            disabled={otpCode ? false : true}
            onClick={submitFn}
            className={`text-sm base-bold ${
              otpCode ? "text-white bg-primary" : "text-white bg-gray-300"
            } w-full py-2 rounded-lg`}
          >
            {common("next")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerification;
