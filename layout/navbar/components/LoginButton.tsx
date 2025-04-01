"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useProfileContext } from "@/contexts/ProfileContext";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/Button/Button";
import Authentication from "@/components/auth";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import Premium from "@/components/ui/icons/Premium";

const  LoginButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, fetchAuth } = useAuth();
  const { profileData } = useProfileContext();
  const { isModalOpen, setIsModalOpen ,showCloseBtn} = useSignUp();  

  useEffect(() => {
    fetchAuth();
  }, []);
  useEffect(() => {
  }, [isAuthenticated, pathname, router]);
  return (
    <>
      {isLoading ? (
        <div className="loader"></div> 
      ) : (
        <>
          {/* Only show Login button if user is not authenticated */}
          {!isAuthenticated && (
            <Button onClick={() => setIsModalOpen(true)} width="w-14 md:w-32 " marginTop="mt-0"  >
              Login
            </Button>
          )}

          {/* Show profile only when authenticated */}
          {isAuthenticated && (
            <Link href="/profile" prefetch={true} className="relative ml-4">
              {profileData?.membership === "Premium" && (
                <Premium top="-7px" left="-7px" size={9} />
              )}
              <Image
                className="rounded-full"
                src={`${
                  profileData?.profile_photo ||
                  "/tw/placeholder/huddle-default-profile.svg"
                }`}
                width={40}
                height={40}
                alt="profile-pic"
              />
            </Link>
          )}
        </>
      )}

      {/* Login Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backgroundClickClose={false}
        showCloseButton={showCloseBtn}
      >
        <Authentication  />
      </Modal>
    </>
  );
};

export default LoginButton;
