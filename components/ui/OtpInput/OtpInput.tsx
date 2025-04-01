/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import NextButton from "../Button/NextButton";

interface OtpInputProps {
  email?: string;
  mobile?: string | undefined;
  length?: number;
  waitTime: number; // waitTime in minutes from API
  handleOtpSubmit: (otp: string) => void;
  onResend?: () => void;
  onBack?: () => void;
  type?: "email" | "mobile";
}

const OtpInput: React.FC<OtpInputProps> = ({
  email,
  mobile,
  length = 6,
  waitTime,
  handleOtpSubmit,
  onResend,
  onBack,
  type = "email",
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(waitTime);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    setTimeLeft(waitTime);
  }, [waitTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResend = async () => {
    setOtp(new Array(length).fill(""));
    setTimeLeft(waitTime);
    if (onResend) {
      await onResend();
    }
  };

  const handleSubmit = async () => {
    if (otp.join("").length === length) {
      handleOtpSubmit(otp.join(""));
    }
  };

  return (
    <div className="w-52 md:w-72 rounded-md">
      <p className="text-gray-500 text-small md:text-sm mt-medium">
        We have sent an OTP to <span className="font-semibold">{email ? email : mobile}</span>
      </p>
      {onBack && (
        <span
          className="text-primary text-small md:text-sm mt-s2 text-left font-medium cursor-pointer"
          onClick={onBack}
        >
          CHANGE {type === "email" ? "EMAIL" : "MOBILE"}
        </span>
      )}

      <div className="flex justify-between mt-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-8 h-8 md:w-10 md:h-12 border-b-2 border-[#8F8F8F] text-center text-lg font-semibold focus:border-primary focus:outline-none"
          />
        ))}
      </div>

      {timeLeft > 0 ? (
        <div className="mt-4 text-sm text-gray-500 text-center">
          RESEND OTP in <span className="font-semibold text-visitorText">{formatTime(timeLeft)}</span>
        </div>
      ) : (
        <div className="mt-4 text-sm text-center">
          <button onClick={handleResend} className="text-primary font-semibold">
            Resend Code
          </button>
        </div>
      )}

      <div className="mt-6">
        <NextButton onClick={handleSubmit} disabled={otp.includes("")} />
      </div>
    </div>
  );
};

export default OtpInput;
