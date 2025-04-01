"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { updateProfilePhoto } from "@/service/profile.service";
import ImageCropper from "@/components/ui/image-crop/ImageCropper";
import { useProfileContext } from "@/contexts/ProfileContext";
import { Icons } from "@/components/ui/icons/icons";
import Uploading from "@/components/ui/uploading/Uploading";
import Premium from "@/components/ui/icons/Premium";


interface ProfilePhotoProps {
  photo: string | null;
  is_premium: boolean;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photo, is_premium }) => {
  const [profile, setProfile] = useState<string | null>(photo);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { profileData, refreshProfile } = useProfileContext();

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedProfile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    try {
      setIsUploading(true);
      const blob = await fetch(croppedImage).then((res) => res.blob());
      const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("file", file);
      const response = await updateProfilePhoto(formData);

      if (response.result) {
        setProfile(response.result.profile_photo);
        setSelectedProfile(null);
        setCroppedImage(null);
        setIsUploaded(true);
        await refreshProfile();
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (isUploaded) {
      setProfile(profileData?.profile_photo || null);
    }
  }, [isUploaded, profileData]);

  return (
    <div className="relative w-28 h-28">
      {/* Uploading Spinner Overlay */}
      {isUploading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <Uploading size={40} />
        </div>
      )}

      {/* Profile Image */}
      <figure className="rounded-full overflow-hidden w-full h-full bg-gray-300 relative">
        {profile ? (
          <Image
            src={profile}
            alt="Profile"
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300">
            <Icons.User size={50} className="text-white" />
          </div>
        )}
      </figure>

      {/* Crown Icon */}
      {is_premium && (
        <div className="absolute  top-1 left-1 rounded-full flex items-center justify-center z-20 shadow-md">
          <Premium size={18}/>
        </div>
      )}

      {/* Camera Icon Upload */}
      <label htmlFor="file-upload">
        <div className="absolute -bottom-2 -right-0 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center cursor-pointer shadow z-20">
          <Icons.Camera className="text-gray-600 w-4 h-4" />
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleProfilePicChange}
        />
      </label>

      {/* Cropper Modal */}
      {selectedProfile && (
        <ImageCropper
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          handleUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;
