/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import UserListSelect from "./UserListSelect";
import { TranslationFunction } from "@/types";

const UserListModal: React.FC<any> = ({
  handleByNowAction,
  handleModalOpenClose,
  userListData,
  keyDataIndex,
  handleSearchUser,
}) => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const common: TranslationFunction = useTranslations("common");

  const [selectedOption, setSelectedOption] = useState<string>("me");
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [flixUsersList, setFlixUsersList] = useState<any>([]);
  const [buttonEnable, setButtonEnable] = useState(true);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setSelectedUser([]); // Reset selected user when switching
    if (event.target.value === "users") setButtonEnable(false);
    else if (event.target.value === "me") setButtonEnable(true);
  };

  useEffect(() => {
    setFlixUsersList(userListData);
  }, [userListData]);

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setButtonEnable(true);
  };

  const handleContinue = () => {
    let userId = null;
    if (selectedOption === "users") {
      userId = selectedUser?.id;
    }
    handleByNowAction(userId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-96 pt-12 pb-6 px-12">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => handleModalOpenClose(false)}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold mb-4">{t("buying_flix_for")}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="me"
              checked={selectedOption === "me"}
              onChange={handleOptionChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{t("me")}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="users"
              checked={selectedOption === "users"}
              onChange={handleOptionChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{t("another_user")}</span>
          </label>
          {selectedOption === "users" && (
            <div className="w-full flex items-end justify-center">
              <UserListSelect
                keyDataIndex={keyDataIndex}
                users={flixUsersList}
                onSelect={handleUserSelect}
                handleSearchUser={handleSearchUser}
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          {buttonEnable ? (
            <button
              className="w-3/4 h-12 bg-primary text-secondary px-3 py-1 text-sm md:text-base rounded"
              onClick={() => handleContinue()}
            >
              {common("continue")}
            </button>
          ) : (
            <button
              className="w-3/4 h-12 bg-gray-300 text-gray-500 px-3 py-1 text-sm md:text-base rounded"
              disabled
            >
              {common("continue")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
