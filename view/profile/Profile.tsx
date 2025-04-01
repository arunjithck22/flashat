"use client";

import { useState, useEffect } from "react";
import PersonalDetails from "./components/PersonalDetails";
import AccountDetails from "./components/accountDetails/AccountDetails";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import Details from "./components/details/Details";
import Progress from "./components/Progress";
import { useProfileContext } from "@/contexts/ProfileContext";
import ProfileLoader from "@/components/SkeltonLoaders/ProfileLoader";
import Button from "@/components/ui/Button/Button";
import Broadcasts from "./components/Broadcasts";
import { showToast } from "@/utils/toast";
import { logout } from "@/service/signIn.service";
import Empty from "@/components/ui/Empty/Empty";
import Modal from "@/components/ui/modal/Modal";
import LogoutCard from "@/components/cards/common/LogoutCard";

const Profile = () => {
  const t: TranslationFunction = useTranslations("profile");
  const { profileData, loading, refreshProfile } = useProfileContext();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
      showToast("Logged out successfully", "success");
    } catch (error) {
      console.error("Error during logout:", error);
      showToast("Something went wrong", "error");
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <main
      className="overflow-y-auto flex flex-col w-full"
      style={{ height: "calc(100vh - 110px)" }}
    >
      {loading && <ProfileLoader />}

      {!loading && profileData && (
        <div>
          <Details profileData={profileData} />
          <Progress profileData={profileData} />
          <Broadcasts profileData={profileData} />
          <div className="p-normal lg:flex lg:justify-between gap-5 xl:w-8/12">
            <AccountDetails
              email={profileData.email}
              mob={profileData.phone}
              username={profileData.username}
              is_premium={profileData.is_premium}
            />
            <PersonalDetails
              gender={profileData.gender}
              dob={profileData.dob}
              about={profileData.about || ""}
            />
          </div>
          <div className="flex justify-end px-medium xl:w-8/12">
            <Button onClick={handleLogoutClick} width="w-32">
              {t("logout")}
            </Button>
          </div>
        </div>
      )}

      {!loading && !profileData && <Empty />}

      {/* Logout Confirmation Modal */}
      <Modal isOpen={showLogoutModal} onClose={handleCancelLogout} showCloseButton={false}>
        <LogoutCard onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      </Modal>
    </main>
  );
};

export default Profile;
