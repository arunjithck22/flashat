"use client";

import useCreateHuddle from "@/app/hooks/huddles/useCreateHuddle";
import { useHuddleCategories } from "@/app/hooks/huddles/useHuddleCategories";
import { useLanguages } from "@/app/hooks/useLanguages";
import { getTimeBasedUUID } from "@/utils/clientUtils";
import React, { useState } from "react";
import HuddleFormShimmer from "../shimmers/HuddleFormShimmer";
import AddParticpants from "./AddParticpants";
import HuddleForm from "./HuddleForm";

export const CreateHuddle = () => {
  const { data: huddleCategories, isLoading: categoriesLoading } =
    useHuddleCategories();
  const { data: languages, isLoading: languagesLoading } = useLanguages();
  console.log("huddleCategories", huddleCategories);
  console.log("languages", languages);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectedImage, setSlectedImage] = useState("");
  const [huddleName, setHuddleName] = useState("");
  const [huddleBio, setHuddleBio] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clickedNext, setClickedNext] = useState(false);
  const [reqToJoin, setReqToJoin] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uuid, setUuid] = useState(getTimeBasedUUID());

  const { mutate, isPending } = useCreateHuddle();
  const [newHuddleId, setNewHuddleId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // formData.append("file", selectedImage);
      formData.append(
        "data",
        JSON.stringify({
          request_to_join: reqToJoin,
          participant_share: false,
          private: false,
          huddle_language: selectedLanguage,
          about: huddleBio,
          name: huddleName,
          category_id: categoryId,
          creation_key: uuid,
        })
      );

      // Use the useMutation hook with onSuccess callback
      mutate(formData, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: any) => {
          console.log("Huddle created successfully:", response);
          setNewHuddleId(response?.result?.id);
          setClickedNext(true);
        },
        onError: (err) => {
          console.error("Failed to create huddle:", err);
          setClickedNext(false);
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response && error.response.data) {
        console.error("Validation Errors:", error.response.data);
      }
    }
  };
  if (languagesLoading || categoriesLoading) {
    return <HuddleFormShimmer />;
  }

  return clickedNext ? (
    <AddParticpants
      huddleId={newHuddleId}
      // huddleName={huddleName}
      // huddleBio={huddleBio}
      // selectedLanguage={selectedLanguage}
      // categoryId={categoryId}
      // setClickedNext={setClickedNext}
    />
  ) : (
    <HuddleForm
      huddleName={huddleName}
      setHuddleName={setHuddleName}
      huddleBio={huddleBio}
      setHuddleBio={setHuddleBio}
      selectedLanguage={selectedLanguage}
      setSelectedLanguage={setSelectedLanguage}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedImage={selectedImage}
      setSelectedImage={setSlectedImage}
      huddleCategories={huddleCategories}
      languages={languages}
      disabled={disabled}
      isPending={isPending}
      setDisabled={setDisabled}
      clickedNext={clickedNext}
      setClickedNext={setClickedNext}
      handleSubmit={handleSubmit}
      reqToJoin={reqToJoin}
      setReqToJoin={setReqToJoin}
    />
  );
};
