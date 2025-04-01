"use client";
import React, { useState, useEffect } from "react";
import Heading from "@/components/Headers/AuthHeading";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import NextButton from "@/components/ui/Button/NextButton";
import CreateUserName from "@/components/auth/components/signUp/components/CreateUserName";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { Gender } from "@/constants/enums";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import Button from "@/components/ui/Button/Button";
import BackButton from "@/components/ui/Button/BackButton";
import { ApiResponse } from "@/types/apiResponse";
import { CreateProfileResponse } from "@/types/signup";
import { createProfile, fetchPrivacyPolicy } from "@/service/signUp.service";
import ProfileForm from "@/components/forms/profile/ProfileForm";

const CreateProfile = () => {
  const { accessToken, setShowCloseBtn } = useSignUp();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.None);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [location, setLocation] = useState<{ lat: string | null; lng: string | null }>({
    lat: null,
    lng: null,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyContent, setPrivacyContent] = useState<string | null>(null);
  const [dob, setDob] = useState<string>("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.latitude && data.longitude) {
          setLocation({
            lat: data.latitude.toString(),
            lng: data.longitude.toString(),
          });
        } else {
          throw new Error("Could not fetch location.");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setTimeout(fetchLocation, 5000); // Retry after 5s if location fetch fails
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    setShowCloseBtn(false);
  }, [setShowCloseBtn]);

  const isFormValid = name.trim() !== "" && gender !== Gender.None && dob !== "" && agreedToPrivacyPolicy;
  const handleNextButtonClick = async () => {
    try {
      setFormError(null);

      const response: ApiResponse<CreateProfileResponse> = await createProfile({
        name,
        gender: gender as "Male" | "Female" | "Prefer Not to Say",
        date_of_birth: dob,
        lat: location.lat!,
        long: location.lng!,
        accessToken: accessToken ?? "",
      });
     
      if (response.result) {
        setIsSubmitted(true);
      }else{
        setFormError(response.message||"Something went wrong")
      }
    } catch (error) {
      console.error("Profile creation failed:", error);
      setFormError("Something went wrong. Please try again.");
    }
  };

  const fetchPrivacyPolicyData = async () => {
    try {
      const response = await fetchPrivacyPolicy({
        policy_type: "privacy_policy",
        accessToken: accessToken ?? "",
      });

      if (response?.result?.legal_document?.description) {
        setPrivacyContent(response.result.legal_document.description);
        setShowPrivacy(true);
      } else {
        setPrivacyContent("Failed to load privacy policy");
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      setPrivacyContent("Failed to load privacy policy");
    }
  };

  const handleAcceptPrivacyPolicy = () => {
    setShowPrivacy(false);
    setAgreedToPrivacyPolicy(true);
  };

  return (
    <div>
      {/* STEP 1: CREATE PROFILE FORM */}
      {!isSubmitted && !showPrivacy ? (
        <div className="w-64 md:w-96 mt-16">
          <Heading text="Create Profile" />
          <ProfileForm name={name} setName={setName} gender={gender} setGender={setGender} dob={dob} setDob={setDob} />
          {/* STEP 2: PRIVACY POLICY CHECKBOX (User can check any time) */}
          <div className="mt-4 flex justify-center items-center">
            <Checkbox
              label={
                <span>
                  I agree to all the{" "}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={fetchPrivacyPolicyData}
                  >
                    Privacy Policies
                  </span>
                </span>
              }
              checked={agreedToPrivacyPolicy}
              onChange={(e) => setAgreedToPrivacyPolicy(e.target.checked)}
            />
          </div>
          {/* ERROR MESSAGE */}
          <ErrorMessage message={formError} />
          {/* NEXT BUTTON DISABLED UNTIL CHECKED */}
          <div className="mt-6">
            <NextButton
              disabled={!isFormValid}
              onClick={handleNextButtonClick}
            />
          </div>
        </div>
      ) : showPrivacy ? (
        /* STEP 3: PRIVACY POLICY MODAL */
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto mt-6 p-6 bg-white shadow-lg shadow-black rounded-lg">
          <h2 className="text-xl font-bold text-center text-grayShade">
            Privacy Policy
          </h2>
          <div className="mt-4 max-h-[70vh] overflow-y-auto border border-gray-300 p-4 rounded-lg">
            <div
              className="text-grayShade leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: privacyContent || "Failed to load privacy policy",
              }}
            />
          </div>
          <Button onClick={handleAcceptPrivacyPolicy} textColor="text-white">
            ACCEPT
          </Button>
          <BackButton onClick={() => setShowPrivacy(false)} />
        </div>
      ) : (
        /* STEP 4: USERNAME CREATION (only if isSubmitted) */
        <CreateUserName />
      )}
    </div>
  );
};

export default CreateProfile;
