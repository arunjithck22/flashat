/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useUpdateProfilePhoto from "@/app/hooks/account/useUpdateProfilePhoto";
import { QKEY_GET_USER_PROFILE } from "@/app/hooks/account/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";

import Image from "next/image";
import React, { useState } from "react";

import ImageCropper from "../shared/image-crop/ImageCropper";

const ProfilePhoto = ({ photo, is_premium }: any) => {
  const [profile, setProfile] = useState(photo);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const photoUpdateMutation = useUpdateProfilePhoto();
  const queryClient = useQueryClient();

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedFile(e.target.files?.[0]);
    const file = e.target.files?.[0]; // Safely access the first file
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

    // Create a FormData instance to send the cropped image
    const formData = new FormData();

    // Convert the cropped image into a file object
    const blob = await fetch(croppedImage).then((res) => res.blob());
    const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedFile && formData.append("file", file);
    photoUpdateMutation.mutate(formData, {
      onSuccess: (data: any) => {
        setProfile(data?.result?.profile?.profile_photo);
        setSelectedProfile(null);
        setCroppedImage(null);
        queryClient.invalidateQueries({
          queryKey: [QKEY_GET_USER_PROFILE],
        });
      },
      onError: (err: any) => {
        console.log(err);
      },
    });
  };
  return (
    <div className="relative">
      {/* Spinner overlay */}
      {photoUpdateMutation?.isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <figure
        className={`rounded-full  bg-gray-300 relative ${photo ? "" : "p-4"} `}
      >
        {is_premium && (
          <Image
            src="/tw/post/premium.svg"
            width={30}
            height={30}
            className="absolute -top-1 left-0"
            alt="premium"
          />
        )}
        <label
          htmlFor="file-upload"
          className="absolute bottom-0 right-0 cursor-pointer"
        >
          <Image
            src="/icons/camera-upload.svg"
            alt="camera"
            width={30}
            height={30}
          />
        </label>

        <input
          id="file-upload"
          onChange={handleProfilePicChange}
          type="file"
          className="hidden"
        />
        <Image
          src={profile || "/icons/user-default.svg"}
          width={100}
          height={100}
          alt="profile_photo"
          className="rounded-full w-28 h-28 bg-gray-300"
        />
        {selectedProfile && (
          <ImageCropper
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            handleUpload={handleUpload}
          />
        )}
      </figure>
    </div>
  );
};

export default ProfilePhoto;
