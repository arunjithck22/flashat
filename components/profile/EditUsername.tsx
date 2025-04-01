import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCheckUsernameAvailability } from "@/app/hooks/account/useCheckUsernameAvailability";
import useUpdateAccount from "@/app/hooks/account/useUpdateAccountDetails";
import { QKEY_GET_USER_PROFILE } from "@/app/hooks/account/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

interface EditUsernameProps {
  openUsernameModal: boolean;
  setOpenUsernameModal: (open: boolean) => void;
  username: string;
}

const EditUsername = ({
  openUsernameModal,
  setOpenUsernameModal,
  username,
}: EditUsernameProps) => {
  const t = useTranslations("profile");
  const common = useTranslations("common");
  const [updatedUsername, setUpdatedUsername] = useState(username);
  const usernameCheckMutation = useCheckUsernameAvailability();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const queryClient = useQueryClient();

  const editAccountMutation = useUpdateAccount();

  const [isValid, setIsValid] = useState({
    noSpaceOrAt: false,
    hasAlphaNumeric: false,
    length: false,
    notSameAsInitial: false,
  });
  useEffect(() => {
    setUsernameAvailable(false);
    setErrorMessage("");
    setSuccessMessage("");
  }, [updatedUsername]);

  // Validate the username whenever it changes
  useEffect(() => {
    setIsValid({
      noSpaceOrAt:
        !updatedUsername.includes(" ") && !updatedUsername.includes("@"),
      hasAlphaNumeric: /[a-zA-Z0-9]/.test(username),
      length: updatedUsername.length >= 3 && updatedUsername.length <= 15,
      notSameAsInitial: updatedUsername !== username,
    });
  }, [username, updatedUsername]);

  const isAllValid = Object.values(isValid).every((val) => val);

  const handleUsernameCheck = (e: React.FormEvent) => {
    e.preventDefault();
    usernameCheckMutation.mutate(
      {
        username: updatedUsername,
      },
      {
        onSuccess: (data) => {
          setSuccessMessage(data?.message || '');
          setUsernameAvailable(true);
          setErrorMessage('');
        },
        onError: (error) => {
          setErrorMessage(error?.message || '');
          setUsernameAvailable(false);
          setSuccessMessage('');
        },
      }
    );
  };

  const handleSubmitChangedUsername = () => {
    editAccountMutation.mutate(
      {
        data: {
          username: updatedUsername,
        },
      },
      {
        onSuccess: (data: void | Response) => {
          console.log("message success full", data);
          queryClient.invalidateQueries({
            queryKey: [QKEY_GET_USER_PROFILE],
          });
          setOpenUsernameModal(false);
          setSubmissionError("");
          setSuccessMessage("");
          setErrorMessage("");
          setUsernameAvailable(false);
        },
        onError: (err: { message?: string }) => {
          setSubmissionError(err?.message || '');
        },
      }
    );
  };
  return (
    <Dialog open={openUsernameModal}>
      <DialogTrigger
        onClick={() => {
          setOpenUsernameModal(true);
        }}
        asChild
      >
        <Image
          width={15}
          height={15}
          src="/tw/HuddleInfo/edit-icon.svg"
          alt="edit"
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="     bg-white flex flex-col justify-center items-center">
        <DialogTitle>{t("edit_username")}</DialogTitle>
        <Image
          src="/tw/HuddleInfo/close.svg"
          className="cursor-pointer absolute top-2 right-2"
          onClick={() => {
            setOpenUsernameModal(false);
            setSubmissionError("");
            setSuccessMessage("");
            setErrorMessage("");
            setUsernameAvailable(false);
            setUpdatedUsername(username);
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
        <div className="pt-5 pb-3 flex flex-col gap-4 w-full">
          <div>
            <label className="text-gray-500 text-xs" htmlFor="username">
              {t("username")}
            </label>
            <input
              id="username"
              value={updatedUsername}
              onChange={(e) => {
                e.preventDefault();
                setUpdatedUsername(e.target.value);
              }}
              type="text"
              className="bg-gray-300 outline-none w-full py-2 px-2 rounded-lg text-sm"
              placeholder="Enter your username"
            />
          </div>

          {errorMessage || successMessage ? (
            <div
              className={`text-xs text-left ${
                errorMessage ? "text-red" : "text-gray-400"
              } `}
            >
              {errorMessage || successMessage}
            </div>
          ) : (
            <div className="text-xs text-center base-semi-bold font-bold uppercase">
              <button
                className={`text-primary uppercase ${
                  !isAllValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isAllValid}
                onClick={handleUsernameCheck}
              >
                {common("check_availability")}
              </button>
            </div>
          )}

          <ul className="w-full flex flex-col gap-2 text-xs text-gray-600">
            <li className="flex items-center">
              <span
                className={`mr-2 ${
                  isValid.noSpaceOrAt ? "text-green-500" : "text-red-500"
                }`}
              >
                {isValid.noSpaceOrAt ? "✔" : "✖"}
              </span>
              {common("username_condition1")}
            </li>
            <li className="flex items-center">
              <span
                className={`mr-2 ${
                  isValid.hasAlphaNumeric ? "text-green-500" : "text-red-500"
                }`}
              >
                {isValid.hasAlphaNumeric ? "✔" : "✖"}
              </span>
              {common("username_condition2")}
            </li>
            <li className="flex items-center">
              <span
                className={`mr-2 ${
                  isValid.length ? "text-green-500" : "text-red-500"
                }`}
              >
                {isValid.length ? "✔" : "✖"}
              </span>
              {common("username_condition3")}
            </li>
          </ul>
        </div>

        <div className="w-full">
          <button
            disabled={!usernameAvailable}
            onClick={handleSubmitChangedUsername}
            className={`text-sm base-bold  uppercase
             ${
               usernameAvailable
                 ? "text-white bg-primary"
                 : "bg-gray-300 text-white"
             }
            w-full py-2 rounded-lg`}
          >
            {common("change_username")}
          </button>
        </div>
        {editAccountMutation.isError && (
          <p className="py-2">{submissionError}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUsername;
