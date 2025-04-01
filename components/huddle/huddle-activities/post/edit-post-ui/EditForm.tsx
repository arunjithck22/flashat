/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import FileUploadButtons from "../../HuddleHeader/CreatePost/FileUploadButtons";
import Image from "next/image";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";

const EditForm = () => {
  const { actions } = useHuddleProvider();
  // const queryClient = useQueryClient();
  // const [loading, setLoading] = useState<boolean>(false);
  const [errormessage, setErrorMessage] = useState<string>("");
  const [textMessage, SetTextMessage] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [credentials, setCredentials] = useState<Credentials | null>(null);
  // const [mediaHeight, setMediaHeight] = useState<number | null>(null);
  // const [mediaWidth, setMediaWidth] = useState<number | null>(null);
  // const [mediaDuration, setMediaDuration] = useState<string>("");
  // const [disabled, setDisabled] = useState(true);
  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
  };
  return (
    <div className={`w-full py-5 `}>
      <form
      //  onSubmit={handleCreatePost}
      >
        <textarea
          className={`w-full  border-b px-3 text-sm outline-none bg-transparent`}
          placeholder="Type Your Message"
          onChange={(e) => {
            e.preventDefault();
            SetTextMessage(e.target.value);
          }}
          name=""
          id=""
          cols={30}
          rows={2}
        ></textarea>
        {selectedFiles.length > 0 && (
          <div className="px-2 flex items-center gap-2">
            <div className="relative flex bg-blue-700 items-center gap-2 rounded-md">
              {selectedFiles[0]?.type.startsWith("image/") ? (
                // For images
                <Image
                  src={URL.createObjectURL(selectedFiles[0])}
                  alt={selectedFiles[0]?.name || "Uploaded file"}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              ) : selectedFiles[0]?.type.startsWith("video/") ? (
                // For videos
                <video
                  src={URL.createObjectURL(selectedFiles[0])}
                  width={100}
                  height={100}
                  className="rounded-md"
                  controls // Adds play, pause, and other controls
                />
              ) : (
                // Fallback for unsupported file types
                <p className="text-white">Unsupported file type</p>
              )}
              <button
                onClick={() => setSelectedFiles([])}
                className="text-black font-bold absolute text-xl -top-1 right-1 hover:text-red-700"
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        <footer className="flex justify-between gap-2 py-2">
          <div className="flex gap-2">
            <span className="flex justify-center items-center">Attach :</span>
            <FileUploadButtons onFileChange={handleFileChange} />
          </div>
          <span>{errormessage}</span>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                actions.editPostUI(false);
              }}
              // disabled={loading}
              className="uppercase px-3 py-1 border border-2 border-red-500 rounded-lg text-red-500 text-md base-semibold"
            >
              cancel
            </button>
            <button
              // disabled={loading || disabled}
              type="submit"
              className="uppercase bg-primary px-3 py-1 text-white border-red-500 rounded-lg  text-md base-semibold"
            >
              POST
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default EditForm;
