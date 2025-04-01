/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFlixPurchasedUsers } from "@/app/hooks/buy-flix-coins/useFlixUsers";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  profile_image: string;
  email: string;
  username: string;
};

type UserSelectProps = {
  users: User[];
  handleSearchUser: (searchTerm: string) => void;
  keyDataIndex?: any;
  onSelect: (user: User | null) => void;
};

const UserListSelect: React.FC<UserSelectProps> = ({
  users,
  onSelect,
  handleSearchUser,
}) => {
  const placeHolder: any = useTranslations("common_placeholders");
  const t: any = useTranslations("buy_flix_coins");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: list,
    // isLoading: usersListLoading,
    // isError: userError,
  } = useFlixPurchasedUsers({ searchKey: searchTerm });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [usersList, setUsersList] = useState(users);

  const filteredUsers = usersList?.filter((user) =>
    user.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    handleSearchUser(inputValue);
  };

  const handleUserSelect = (user: User) => {
    onSelect(user);
    setSearchTerm(user.name);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    setUsersList(list?.result?.users);
  }, [list]);

  return (
    <div className="relative w-11/12 max-w-sm">
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeHolder("item5")}
        className="w-full h-10 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-2 w-full max-h-60 custom-scrollbar-hidden overflow-y-auto">
          {filteredUsers?.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={user.profile_image || "/icons/user-default.svg"}
                  alt={user.name}
                  width={20}
                  height={20}
                  className={`w-8 h-8 rounded-full ${
                    !user.profile_image && "p-2"
                  } bg-gray-200 object-cover`}
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">{t("no_users_found")}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserListSelect;
