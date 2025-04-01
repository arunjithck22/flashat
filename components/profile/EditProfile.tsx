/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

import DatePicker from "../shared/calendar/DatePicker";
import CustomDropdown from "../shared/dropdown/CustomDropdown";
import useUpdateProfile from "@/app/hooks/account/useUpdateProfile";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_GET_USER_PROFILE } from "@/app/hooks/account/useUserProfile";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

interface EditProfileProps {
  username: string;
  email: string;
  dob: string;
  gender: string;
  about: string | null;
}

const EditProfile = ({
  username,
  email,
  dob,
  gender,
  about,
}: EditProfileProps) => {
  const t: TranslationFunction = useTranslations("profile");
  const common: TranslationFunction = useTranslations("common");
  const idCard: TranslationFunction = useTranslations("id_card");
  const [formState, setFormState] = useState({
    username,
    about,
  });

  const queryClient = useQueryClient();
  const [updatedGender, setUpdatedGender] = useState(gender);
  const [date, setDate] = useState(dob);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { id, value } = e?.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (
      formState.about !== about ||
      formState.username !== username ||
      date !== dob ||
      updatedGender !== gender
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [formState, date, updatedGender]);

  const editProfileMutation = useUpdateProfile();

  const handleProfileUpdate = () => {
    editProfileMutation.mutate(
      {
        data: {
          about: formState.about,
          date_of_birth: date,
          gender: updatedGender,
          name: formState.username,
        },
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QKEY_GET_USER_PROFILE],
          });
          setEditModalOpen(false);
        },
      }
    );
  };

  return (
    <div>
      <Dialog open={editModalOpen}>
        <DialogTrigger
          onClick={() => {
            setEditModalOpen(true);
          }}
          asChild
        >
          <Button variant="outline">
            <Image
              width={20}
              height={20}
              src="/tw/HuddleInfo/edit-icon.svg"
              alt="edit"
              className="cursor-pointer"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white overflow-y-auto custom-scrollbar">
          <Image
            src="/tw/HuddleInfo/close.svg"
            className="cursor-pointer absolute top-2 right-2"
            onClick={() => {
              setEditModalOpen(false);
              setUpdatedGender(gender);
              setDate(dob);
              setFormState((prevState) => ({
                ...prevState,
                username: username,
                about: about,
              }));
            }}
            width={25}
            height={25}
            alt="close-icon"
          />
          <DialogHeader>
            <DialogTitle>{t("edit_profile")}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="grid items-center gap-1">
              <label
                htmlFor="username"
                className="ltr:text-left rtl:text-right px-1 text-gray-500 text-xs"
              >
                {idCard("name")}
              </label>
              <input
                id="username"
                value={formState.username}
                onChange={handleInputChange}
                className="col-span-3 py-2 px-2 text-sm outline-none bg-gray-200 rounded-md"
              />
            </div>
            <div className="grid items-center gap-1">
              <label
                htmlFor="gender"
                className="ltr:text-left rtl:text-right px-1 text-gray-500 text-xs"
              >
                {t("gender")}
              </label>
              {/* <input
                id="gender"
                type=""
                value={formState.gender}
                onChange={handleInputChange}
                className="col-span-3 py-2 px-2 text-sm outline-none bg-gray-200 rounded-md"
              /> */}
              <CustomDropdown
                options={["Male", "Female", "Prefer not to say"]}
                value={updatedGender}
                onChange={setUpdatedGender}
                placeholder="Select Gender"
              />
            </div>
            <div className="grid items-center gap-1">
              <label
                htmlFor="dob"
                className="ltr:text-left rtl:text-right px-1 text-gray-500 text-xs"
              >
                {t("date_of_birth")}
              </label>
              <div className="col-span-3 relative  px-2 text-sm outline-none bg-gray-200 rounded-md">
                <input
                  id="dob"
                  onClick={() => {
                    setOpenCalendar(!openCalendar);
                  }}
                  readOnly
                  value={date}
                  onChange={handleInputChange}
                  className="  col-span-3 py-2 px-2 text-sm outline-none bg-gray-200 rounded-md"
                />
                <Image
                  className="absolute top-2 right-2"
                  src="/icons/calendar.svg"
                  alt="calendar"
                  width={15}
                  height={15}
                  onClick={() => {
                    setOpenCalendar(!openCalendar);
                  }}
                />
              </div>
              {openCalendar && (
                <DatePicker placeholder="" date={date} setDate={setDate} />
              )}
            </div>
            <div className="grid items-center gap-1">
              <label
                htmlFor="about"
                className="ltr:text-left rtl:text-right px-1 text-gray-500 text-xs"
              >
                {idCard("about")}
              </label>
              <textarea
                id="about"
                rows={5}
                value={formState.about || ""}
                onChange={handleInputChange}
                className="col-span-3 py-2 px-2 text-sm outline-none bg-gray-200 rounded-md"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className={`${
                disableButton
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-400 text-white"
              } base-bold w-full `}
              disabled={editProfileMutation.isPending || disableButton}
              onClick={handleProfileUpdate}
            >
              {editProfileMutation?.isPending
                ? common("updating")
                : common("update")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
