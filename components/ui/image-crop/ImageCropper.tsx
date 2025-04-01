"use client";
import React, { useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

import { getCroppedImg } from "@/utils/clientUtils";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

const ImageCropper = ({
  setSelectedProfile,
  selectedProfile,
  croppedImage,
  setCroppedImage,
  handleUpload,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const [isCropModalOpen, setIsCropModalOpen] = useState(
    Boolean(selectedProfile)
  );
  const t: TranslationFunction = useTranslations("profile");
  const common: TranslationFunction = useTranslations("common");
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (croppedImage) {
      handleUpload();
      setIsCropModalOpen(false);
      setSelectedProfile("");
    }
  }, [croppedImage]);
  const handleCrop = useCallback(async () => {
    if (!selectedProfile || !croppedAreaPixels) return;
    try {
      const croppedImg = await getCroppedImg(
        selectedProfile,
        croppedAreaPixels
      );
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [selectedProfile, croppedAreaPixels]);

  return (
    <Dialog open={isCropModalOpen}>
      <div>
        <DialogContent className="w-full  p-0 bg-white overflow-y-auto custom-scrollbar">
          <div className="flex flex-col">
            <div className="w-full bg-gray-600 h-12 flex items-center p-2">
              <DialogHeader className="w-full">
                <DialogTitle className="bg-gray-600 flex justify-between w-full ">
                  <div className="flex justify-center  gap-1 items-center text-sm font-medium text-white">
                    <Image
                      onClick={() => {
                        setSelectedProfile(null);
                        setIsCropModalOpen(false);
                        setSelectedProfile("");
                        setCroppedImage(null);
                        setCrop({ x: 0, y: 0 });
                        setCroppedAreaPixels(null);
                        setZoom(1);
                      }}
                      src="/icons/close-2.svg"
                      alt="upload"
                      width={20}
                      height={20}
                    />
                    {t("drag_the_image_to_adjust")}
                  </div>
                  <div
                    onClick={handleCrop}
                    className="flex justify-center cursor-pointer  gap-1 items-center text-sm font-medium text-white"
                  >
                    <Image
                      src="/icons/upload.svg"
                      alt="upload"
                      width={20}
                      height={20}
                    />
                    {common("upload")}
                  </div>
                </DialogTitle>
              </DialogHeader>
            </div>
            <div className="relative w-full h-96 overflow-hidden">
              <Cropper
                image={selectedProfile}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                objectFit="horizontal-cover"
              />
              {/* <div className="rounded-full w-12 h-12 p-2 bg-primary absolute z-50 right-2 bottom-2 cursor-pointer">
                <Image
                  alt="tick"
                  src="/icons/crop-tick.svg"
                  width={100}
                  height={100}
                />
              </div> */}
            </div>
            {/* <DialogFooter className="p-2">
              <Button className="w-full base-bold">UPDATE</Button>
            </DialogFooter> */}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ImageCropper;
