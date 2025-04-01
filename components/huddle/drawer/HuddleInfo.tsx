"use client";
import { useHuddle } from "@/app/hooks/huddles/useHuddle";
import { API_STATUS, HUDDLES_TABS } from "@/common/constant";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import HuddleSkelton from "../HuddleSkelton";
import DrawerHeader from "./Header";
import { TranslationFunction } from "@/types";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";

const HuddleInfo = () => {
  const { actions } = useHuddleProvider();
  const t: TranslationFunction = useTranslations("huddles");
  const common: TranslationFunction = useTranslations("common");
  // const [isEnabled, setIsEnabled] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const params = useParams();

  // const handleJoinToggle = () => {
  //   setIsEnabled(!isEnabled);
  // };
  // const handleToggle = () => {
  //   setIsChecked(!isChecked);
  // };
  const { data, status } = useHuddle(params?.id?.toString());
  return (
    <>
      <DrawerHeader />
      {status === API_STATUS.PENDING && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}
      {status === API_STATUS.SUCCESS && (
        <div>
          <section className="flex flex-col mt-8  items-center justify-center">
            <div className="relative ">
              <Image
                width={24}
                height={24}
                alt="huddle-profile"
                src="/tw/huddle-premium.svg"
                className="absolute -top-3 -right-2"
              />
              <Image
                width={60}
                height={60}
                alt="huddle-profile"
                src={`${
                  data?.result?.thumbnail ||
                  "/tw/placeholder/huddle-default-profile.svg"
                }`}
                className="rounded-lg bg-center object-cover  border-primary border"
              />
            </div>
            <div className="flex gap-2">
              <h2 className=" text-end font-bold text-md">
                {data?.result?.name}{" "}
              </h2>
              {/* <Image
                width={15}
                height={15}
                src="/tw/HuddleInfo/edit-icon.svg"
                alt="edit"
              /> */}
            </div>
            <div className="flex justify-between items-center gap-1.5">
              <Image
                src="/tw/HuddleInfo/particpant-icon.svg"
                width={10}
                height={10}
                alt="participant"
              />
              <span className="text-xs text-tsecond ">
                {data?.result?.total_members}
              </span>
              <span className="w-[1px] h-4 bg-tsecond "></span>
              <Image
                src="/tw/HuddleInfo/online.svg"
                width={10}
                height={10}
                alt="participant"
              />
              <span className=" text-xs text-tsecond">
                {data?.result?.online_participants}
              </span>
              <span className="text-xs  text-tsecond">{common("online")}</span>
            </div>
          </section>
          <ul className="mt-8 px-3 gap-2">
            <li className="flex justify-between border-b border-bgray py-2">
              <div>
                <label className="font-semibold text-sm" htmlFor="">
                  {t("bio")}
                </label>
                <p className="text-xs  text-gray-500 mt-1 ">
                  {data?.result?.about}
                </p>
              </div>
            </li>

            <li
              onClick={() => {
                actions.toggleVisibility("participants", true);
                actions.openFromOutsideOptions(false);
              }}
              className="flex justify-between border-b cursor-pointer border-bgray py-2 "
            >
              <div className="flex flex-col">
                <label className="base-semibold text-sm" htmlFor="">
                  {t("participants")}{" "}
                  <span>({data?.result?.total_members})</span>
                </label>
                <p className="text-xs   text-gray-500 mt-1 ">
                  {t("partcipants_tip")}
                </p>
              </div>
              <Image
                className="cursor-pointer"
                src="/tw/HuddleInfo/chevron-right.svg"
                alt="right"
                width={20}
                height={20}
              />
            </li>
            {(params.type === HUDDLES_TABS.USER_MANAGED ||
              params.type === HUDDLES_TABS.ADMIN) && (
              <li
                onClick={() => {
                  actions.toggleVisibility("reqInvites", true);
                  actions.openFromOutsideOptions(false);
                }}
                className="flex justify-between border-b  cursor-pointer border-bgray py-2"
              >
                <div>
                  <label className="base-semibold  text-sm" htmlFor="">
                    {t("manage_requests_and_invites")}{" "}
                    <span>({data?.result?.total_requests})</span>
                  </label>
                  <p className="text-xs  text-gray-500  mt-1 ">
                    {t("manage_requests_and_invites_tip")}
                  </p>
                </div>
                <Image
                  className="cursor-pointer"
                  src="/tw/HuddleInfo/chevron-right.svg"
                  alt="right"
                  width={20}
                  height={20}
                />
              </li>
            )}
            {/* {params.type !== HUDDLES_TABS.SEARCH && (
              <li className="flex justify-between border-b border-bgray py-2">
                <div>
                  <label className="base-semibold text-sm" htmlFor="">
                    Mute
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ">
                    Disable sound for Huddle notifications
                  </p>
                </div>
                <label
                  htmlFor="toggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="sr-only"
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner transition-colors ${
                        isChecked ? "bg-primary   " : "bg-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`toggle__dot absolute w-5 h-5 bg-white rounded-full shadow transition-transform transform ${
                        isChecked ? "translate-x-6" : "translate-x-0"
                      } inset-y-0 left-0 top-[-2px]`}
                    ></div>
                  </div>
                </label>
              </li>
            )} */}
            {(params.type === HUDDLES_TABS.USER_MANAGED ||
              params.type === HUDDLES_TABS.ADMIN) && (
              <li
                onClick={() => {
                  actions.toggleVisibility("reported", true);
                  actions.openFromOutsideOptions(false);
                }}
                className="flex justify-between  cursor-pointer border-b border-bgray py-2"
              >
                <div>
                  <label className="base-semibold text-sm" htmlFor="">
                    {t("reported_messages_and_comments")}
                    <span>({data?.result?.report_count})</span>
                  </label>
                  <p className="text-xs  text-gray-500  mt-1 ">
                    {t("reported_messages_and_comments_tip")}
                  </p>
                </div>
                <Image
                  className="cursor-pointer"
                  src="/tw/HuddleInfo/chevron-right.svg"
                  alt="right"
                  width={20}
                  height={20}
                />
              </li>
            )}
            {/* {(params.type === HUDDLES_TABS.USER_MANAGED ||
              params.type === HUDDLES_TABS.ADMIN) && (
              <li className="flex justify-between border-b border-bgray py-2">
                <div>
                  <label className="base-semibold text-sm">
                    Enable Request to join
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ">
                    By enabling this, you can limit the user’s to join
                  </p>
                </div>
                <label
                  htmlFor="join-toggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="join-toggle"
                      className="sr-only"
                      checked={isEnabled}
                      onChange={handleJoinToggle}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner transition-colors ${
                        isEnabled ? "bg-primary   " : "bg-gray-400"
                      }`}
                    ></div>
                    <div
                      className={`toggle__dot absolute w-5 h-5 bg-white rounded-full shadow transition-transform transform ${
                        isEnabled ? "translate-x-6" : "translate-x-0"
                      } inset-y-0 left-0 top-[-2px]`}
                    ></div>
                  </div>
                </label>
              </li>
            )} */}
          </ul>
        </div>
      )}
    </>
  );
};

export default HuddleInfo;
