/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import useUpdateAccount from "@/app/hooks/account/useUpdateAccountDetails";
import { QKEY_GET_USER_PROFILE } from "@/app/hooks/account/useUserProfile";
import useVerifyOtp from "@/app/hooks/account/useVerifyOtp";
import { useQueryClient } from "@tanstack/react-query";
import IntlTelInput, { intlTelInput } from "intl-tel-input/react";
import "intl-tel-input/styles";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Id, toast } from "react-toastify";
import OTPVerification from "../shared/otp/OTPVerification";
import { commonToast } from "../../utils/commonToast";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationFunction } from "@/types";
import Image from "next/image";

type Country = {
  areaCodes: string[] | null;
  dialCode: string;
  iso2: string;
  name: string;
};

const EditMobileNumber = ({
  country_code,
  mob,
  setMobileEdit,
  country_code_iso,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const t: TranslationFunction = useTranslations("profile");
  const otp: TranslationFunction = useTranslations("otp");
  const common: TranslationFunction = useTranslations("common");
  const [selCountry, setSelCountry] = useState<Country | null>(null);
  const [countryCode, setCountryCode] = useState(country_code);
  const [value, setValue] = useState("");
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [OTPWaitTime, setOTPWaitTime] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const editAccountMutation = useUpdateAccount();
  const verifyOTPMutation = useVerifyOtp("mobile");
  const queryClient = useQueryClient();
  const { locale } = useLanguage();

  const toastId: Id = "";

  useEffect(() => {
    return () => {
      toastId && toast.dismiss(toastId);
    };
  }, []);

  const handleSubmitOtp = () => {
    verifyOTPMutation.mutate(
      {
        data: {
          country_code: countryCode,
          phone: value,
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

          setMobileEdit(false);
        },
        onError: (err: any) => {
          setOtpErr(err?.message);
        },
      }
    );
  };

  const verificationFn = ({ resend }: { resend: boolean }) => {
    editAccountMutation.mutate(
      {
        data: {
          country_code: countryCode,
          phone: value,
          resend: resend,
        },
      },
      {
        onSuccess: (data: any) => {
          setOTPWaitTime(data?.result?.wait_time);
          setOpenOTPModal(true);

          commonToast({
            message: `An otp has been send to ${countryCode} ${value}`,
            rtl: locale === "ar",
            icon: (
              <Image
                src="/logo/flashat-logo.png"
                alt="Custom Icon"
                style={{ width: "30px", height: "30px" }}
              />
            ),
          });
          setErrMessage("");
        },
        onError: (err: any) => {
          setErrMessage(err?.message);
        },
      }
    );
  };

  const countryData = useMemo(() => intlTelInput.getCountryData(), []);

  const handleCountryChange = useCallback(
    (countryIso2: string) => {
      const selectedCountry = countryData.find((c) => c.iso2 === countryIso2);

      setSelCountry(selectedCountry || null);
      const newDialCode = selectedCountry?.dialCode || "";

      // Check if dialCode is different from the current state
      if ("+" + newDialCode !== countryCode) {
        setCountryCode("+" + newDialCode);
      }
    },
    [countryData, countryCode]
  );
  const handleNumberChange = useCallback((value: string) => {
    const phoneNumber = intlTelInput?.utils?.getCoreNumber(
      value,
      selCountry?.iso2
    );

    setValue(phoneNumber || mob);
  }, []);
  const handleChangeErrorCode = (errorCode: number | null) => {
    setErrorCode(errorCode);
    // You can add more logic here if needed
  };

  useEffect(() => {
    if (value) {
      setErrMessage("");
    }
  }, [value]);

  return (
    <div className="flex justify-between w-full mt-4 ">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center ">
          <label className="text-xs text-tsecond  " htmlFor="">
            {t("mobile_number")}
          </label>
          <div className="flex items-center justify-center gap-2">
            <span
              onClick={() => {
                setMobileEdit(false);
              }}
              className="text-red-500 uppercase text-xs base-bold cursor-pointer"
            >
              {common("cancel")}
            </span>
            <OTPVerification
              openOTPModal={openOTPModal}
              setOpenOTPModal={setOpenOTPModal}
              submitFn={handleSubmitOtp}
              headerImage="/bg/verify-mobile.svg"
              firstCaption={otp("header2")}
              secondCaption={`${otp(
                "we_have_send_an_otp_to"
              )} ${countryCode} ${value}`}
              type="mobile"
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
        <div className="formgroup">
          <div className="formgroup mt-2">
            <div
              className="formgroup__item"
              style={{ width: "100%", height: "55px" }}
            >
              <div>
                <IntlTelInput
                  initOptions={{
                    initialCountry: country_code_iso,

                    nationalMode: true,
                    containerClass: ` iti iti__country_container custom-scrollbar `,
                    // useFullscreenPopup: true,

                    separateDialCode: true,
                    loadUtilsOnInit:
                      "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.12/build/js/utils.js",
                  }}
                  onChangeCountry={handleCountryChange}
                  onChangeNumber={handleNumberChange}
                  onChangeErrorCode={handleChangeErrorCode}
                  initialValue={value}
                  inputProps={{
                    className: ` border border-1 border-gray-200 rounded-lg`,
                    style: {
                      width: "100%",
                      height: "35px",
                      borderRadius: "5px",
                      fontSize: "15px",
                    },
                    placeholder: t("enter_mobile_number"),
                  }}
                />
              </div>
            </div>
            {errorCode !== null ? (
              <p
                className="w-full text-start px-2 text-xs"
                style={{ color: "red" }}
              >
                {t("mob_error")}
              </p>
            ) : (
              errMessage && (
                <p
                  className="w-full text-start px-2 text-xs"
                  style={{ color: "red" }}
                >
                  {errMessage}
                </p>
              )
            )}
            <input type="hidden" name="phone" value={value} />
            <input type="hidden" name="countryCode" value={countryCode} />
            {/* <div className="formgroup__item mt-2">
                                <input
                                  type="number"
                                  placeholder="Enter mobile number"
                                  name="phone"
                                  onChange={onChangeHandler}
                                  value={state.phone}
                                />
                              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMobileNumber;
