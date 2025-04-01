/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect } from "react";

const HuddleForm = ({
  huddleName,
  huddleBio,
  setHuddleBio,
  setHuddleName,
  selectedLanguage,
  setSelectedLanguage,
  setSelectedCategory,
  selectedCategory,
  disabled,
  setDisabled,

  languages,
  huddleCategories,
  reqToJoin,
  setReqToJoin,

  setCategoryId,
  handleSubmit,
  selectedImage,
}: // setSelectedImage,
any) => {
  const t: TranslationFunction = useTranslations("huddles");
  const common: TranslationFunction = useTranslations("common");
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    setCategoryId(category);
  };
  // const handleImageChange = (e: any) => {
  //   setSelectedImage(e.target.files[0]);
  // };

  useEffect(() => {
    if (
      huddleName === "" ||
      huddleBio === "" ||
      selectedCategory === "" ||
      selectedLanguage === ""
      //  ||
      // !selectedImage
    )
      setDisabled(true);
    else setDisabled(false);
  }, [
    huddleName,
    huddleBio,
    selectedCategory,
    selectedLanguage,
    // selectedImage,
  ]);
  return (
    <div className="h-screen w-full flex flex-col justify-between bg-white">
      <section className="flex-grow flex flex-col items-center overflow-y-auto custom-scrollbar px-8 py-6 pb-28">
        <header className="base-medium text-md py-2">
          {t("create_new_huddle")}{" "}
        </header>
        <div className="mb-6">
          <div className="relative">
            {/* The camera icon acting as a label */}
            {/* <label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <Image
                src="/icons/camera-upload.svg"
                alt="camera"
                width={20}
                height={20}
              />
            </label>

           
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            /> */}

            {/* Profile image */}
            <Image
              className="rounded-full"
              src={
                selectedImage instanceof Blob
                  ? URL.createObjectURL(selectedImage)
                  : "/tw/placeholder/huddle-default-profile.svg"
              }
              alt="huddle-image"
              width={80}
              height={80}
            />
          </div>
        </div>
        <form
          action=""
          encType="multipart/form-data"
          className="w-full max-w-lg flex flex-col gap-6 text-sm"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 ">{t("huddle_name")}*</label>
            <input
              onChange={(e) => {
                e.preventDefault();
                const value = e?.target?.value;
                if (value?.length <= 50) {
                  setHuddleName(value);
                }
              }}
              value={huddleName}
              maxLength={50}
              type="text"
              placeholder={t("enter_huddle_name")}
              className="mt-2 px-4 py-3 bg-gray-100 rounded-lg"
            />
            <p className="text-xs py-1 text-end text-gray-500">
              {huddleName?.length}/50
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 ">{t("huddle_language")}</label>
            <select
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={selectedLanguage}
              className="mt-2 px-4 py-3 bg-gray-100 rounded-lg"
            >
              <option value="" disabled>
                --{t("huddle_language")}--
              </option>
              {languages?.result?.map((language: any) => (
                <option key={language?.id} value={language?.name}>
                  {language?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 ">{t("huddle_category")}</label>
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory}
              className="mt-2 px-4 py-3 bg-gray-100 rounded-lg"
            >
              <option value="" disabled>
                --{t("select_category")}--
              </option>
              {huddleCategories?.result?.categories?.map((category: any) => (
                <option
                  key={category?.category_id}
                  value={category?.category_id}
                >
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 ">{t("huddle_bio")}</label>
            <textarea
              placeholder={t("enter_bio")}
              className="mt-2 px-4 py-3 custom-scrollbar bg-gray-100 rounded-lg resize-none"
              rows={3}
              value={huddleBio}
              maxLength={512}
              onChange={(e) => {
                e.preventDefault();
                const value = e?.target?.value;
                if (value?.length <= 512) {
                  setHuddleBio(value);
                }
              }}
            ></textarea>
            <p className="text-xs py-1  text-end text-gray-500">
              {huddleBio?.length}/512
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-md base-semibold">
              {t("enable_request_to_join")}
            </span>
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div
                className={`relative ${
                  reqToJoin ? "toggle-checked" : "toggle-unchecked"
                }`}
              >
                <input
                  onChange={() => {
                    setReqToJoin(!reqToJoin);
                  }}
                  type="checkbox"
                  checked={reqToJoin}
                  defaultChecked={false}
                  id="toggle"
                  className="sr-only"
                />
                <div
                  className={`${
                    !reqToJoin
                      ? " toggle__dot absolute w-5 h-5 bg-gray-300 rounded-full shadow inset-y-0 left-0 top-[-2px]"
                      : "toggle__dot absolute w-5 h-5 rounded-full shadow bg-gray-400 inset-y-0 right-0 top-[-2px]"
                  }`}
                ></div>
                <div
                  className={`toggle__line w-10 h-4  rounded-full shadow-inner  ${
                    reqToJoin ? "bg-primary" : "bg-gray-400"
                  }`}
                ></div>
              </div>
            </label>
          </div>
          <p className="text-xs text-gray-700">
            {t("enable_request_to_join_tip")}
          </p>
          <button
            onClick={handleSubmit}
            disabled={disabled}
            type="submit"
            className={`uppercase w-full py-3 flex justify-center items-center  text-white text-lg rounded-lg ${
              disabled ? "bg-primaryLight" : "bg-primary"
            }`}
          >
            {common("next")}
          </button>
        </form>
      </section>
    </div>
  );
};

export default HuddleForm;
