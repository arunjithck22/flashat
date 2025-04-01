import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import EditEmailAddress from "./EditEmailAddress";
import EditMobileNumber from "./EditMobileNumber";
import EditUsername from "./EditUsername";
import { TranslationFunction } from "@/types";

const AccountDetails = ({
  email,
  mob,
  username,
  country_code,
  country_code_iso,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const t: TranslationFunction = useTranslations("profile");
  const [editEmail, setEditEmail] = useState(false);
  const [mobileEdit, setMobileEdit] = useState(false);
  const [openUsernameModal, setOpenUsernameModal] = useState(false);
  return (
    <>
      <article className="mt-20 flex flex-col shadow-md  p-4  w-full md:w-3/4 lg:w-1/2 border  border-gray-100 ">
        <h2 className="text-primary  text-md font-bold">
          {t("account_details")}
        </h2>
        {editEmail ? (
          <EditEmailAddress email={email} setEditEmail={setEditEmail} />
        ) : (
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <label className="text-sm text-tsecond  mt-4" htmlFor="">
                {t("email_address")}
              </label>
              <b className="text-sm">{email}</b>
            </div>
            <Image
              width={15}
              height={15}
              src="/tw/HuddleInfo/edit-icon.svg"
              alt="edit"
              onClick={() => {
                setEditEmail(true);
                setMobileEdit(false);
              }}
              className="cursor-pointer"
            />
          </div>
        )}
        {mobileEdit ? (
          <EditMobileNumber
            country_code={country_code}
            mob={mob}
            setMobileEdit={setMobileEdit}
            country_code_iso={country_code_iso}
          />
        ) : (
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <label className="text-sm mt-4 text-tsecond" htmlFor="">
                {t("mobile_number")}
              </label>
              <div className="flex justify-center items-center gap-1 text-sm">
                <b>{country_code}</b> <b>{mob}</b>
              </div>
            </div>
            <Image
              width={15}
              height={15}
              src="/tw/HuddleInfo/edit-icon.svg"
              alt="edit"
              onClick={() => {
                setMobileEdit(true);
                setEditEmail(false);
              }}
            />
          </div>
        )}
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <label className="text-sm mt-4 text-tsecond" htmlFor="">
              {t("username")}
            </label>
            <b className="text-sm">{username}</b>
          </div>
          <EditUsername
            openUsernameModal={openUsernameModal}
            setOpenUsernameModal={setOpenUsernameModal}
            username={username}
          />
        </div>
      </article>
    </>
  );
};

export default AccountDetails;
