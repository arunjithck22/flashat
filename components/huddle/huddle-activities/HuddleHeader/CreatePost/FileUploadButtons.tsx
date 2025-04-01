"use client";

import React from "react";
import Image from "next/image";


interface FileUploadButtonsProps {
  onFileChange: (files: File[]) => void;
}

const FileUploadButtons: React.FC<FileUploadButtonsProps> = ({
  onFileChange,
}) => {
  // Handle file selection for each button type
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileChange(files); // Pass selected files to the parent
  };

  return (
    <div className="flex space-x-2">
      {/* Camera Button */}
      {/* <label
        htmlFor="upload-camera"
        className="bg-primary p-2 px-3 flex justify-center items-center rounded cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="upload-camera"
        />
        <Image alt="camera" src="/icons/camera.svg" width={12} height={12} />
      </label> */}

      {/* Gallery Button */}
      <label
        htmlFor="upload-gallery"
        className="bg-primary p-2 px-3 flex justify-center items-center rounded cursor-pointer"
      >
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
          id="upload-gallery"
        />
        <Image alt="gallery" src="/icons/gallery.svg" width={12} height={12} />
      </label>

      {/* Voice Button */}
      {/* <label
        htmlFor="upload-voice"
        className="bg-primary p-2 px-3 flex justify-center items-center rounded cursor-pointer"
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
          id="upload-voice"
        />
        <Image alt="voice" src="/icons/voice.svg" width={12} height={12} />
      </label> */}
    </div>
  );
};

export default FileUploadButtons;
