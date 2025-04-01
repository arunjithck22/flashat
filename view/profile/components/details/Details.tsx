"use client";
import { ProfileResponse } from "@/types/profile";
import { useTranslations } from "next-intl";
import ProfilePhoto from "./components/ProfilePhoto";
import Button from "@/components/ui/Button/Button";
import { useState } from "react";
import Images from "@/components/ui/Images/Images";
import Modal from "@/components/ui/modal/Modal";
import ProfileEdit from "./components/ProfileEdit";
import { Icons } from "@/components/ui/icons/icons";

const items = [
  { id: 1, label: "stars", imageSrc: "/icons/profile/Stars.png" },
  { id: 2, label: "dears", imageSrc: "/icons/profile/Dears.png" },
  { id: 3, label: "fans", imageSrc: "/icons/profile/Fans.png" },
  { id: 4, label: "likers", imageSrc: "/icons/profile/Likers.png" },
];
interface DetailsProps {
  profileData: ProfileResponse;
}

const Details: React.FC<DetailsProps> = ({ profileData }) => {
  const common = useTranslations("common");
  const [isModalOpen,setIsModalOpen]=useState<boolean>(false)

  return (
    <section className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 border-b  p-normal">
      <div>
        <ProfilePhoto
          photo={profileData.profile_photo}
          is_premium={profileData.is_premium}
        />
      </div>
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <div className="sm:flex flex flex-col sm:flex-row justify-between items-center">
          <div>
            <div className="flex items-center text-center gap-5">
              <h1 className="base-bold text-lg sm:text-xl">
                {profileData.name}
              </h1>
              <Button
                bgNone
                textColor="text-black"
                width="w-10"
                onClick={() => setIsModalOpen(true)}
              >
                <Icons.Edit size={24} />
              </Button>
            </div>
            <p className="text-sm sm:text-base text-tsecond">
              {profileData.email}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {items.map((item) => (
            <div key={item.id} className="md:flex gap-1 ">
              <Images
                src={item.imageSrc}
                alt={item.label}
                width={30}
                height={30}
              />
              <div className="flex flex-col sm:flex-row gap-1 items-center">
                <p className="text-md base-semibold">
                  {item.id === 1 && profileData.stars}
                  {item.id === 2 && profileData.dears}
                  {item.id === 3 && profileData.fans}
                  {item.id === 4 && profileData.likers}
                </p>
                <p className="text-xs text-gray-500">{common(item.label)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <ProfileEdit
          username={profileData.name}
          email={profileData.email}
          dob={profileData.dob}
          gender={profileData.gender}
          about={profileData.about}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </section>
  );
};

export default Details;
