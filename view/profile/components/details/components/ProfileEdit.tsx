import React, { useState, useEffect } from "react";
import ProfileForm from "@/components/forms/profile/ProfileForm";
import AuthHeading from "@/components/Headers/AuthHeading";
import { Gender } from "@/constants/enums";
import TextArea from "@/components/ui/textArea/TextArea";
import { updateProfile } from "@/service/profile.service";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import Button from "@/components/ui/Button/Button";
import SuccessMessage from "@/components/ui/messages/SuccessMessage";
import { ApiResponse } from "@/types/apiResponse";
import { UpdateProfileResponse } from "@/types/profile";
import { useProfileContext } from "@/contexts/ProfileContext";

interface ProfileEditProps {
  username: string;
  email: string;
  dob: string;
  gender: string;
  about: string;
  setIsModalOpen:(value:boolean)=>void
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ username, dob, gender, about ,setIsModalOpen}) => {
  const [name, setName] = useState(username);
  const [selectedGender, setSelectedGender] = useState<Gender>(gender as Gender);
  const [selectedDob, setSelectedDob] = useState(dob);
  const [aboutText, setAboutText] = useState(about);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const { refreshProfile } = useProfileContext(); 

  useEffect(() => {
    setIsEdited(
      name !== username ||
      selectedGender !== gender ||
      selectedDob !== dob ||
      aboutText !== about
    );
  }, [name, selectedGender, selectedDob, aboutText, username, gender, dob, about]);

  const handleUpdateProfile = async () => {
    if (!isEdited) return;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response:ApiResponse<UpdateProfileResponse> = await updateProfile({
        name: name || "",                            
        gender: selectedGender || "Other",           
        date_of_birth: selectedDob ? selectedDob : "", 
        about: aboutText || "",  
      });

      console.log("response update",response);
      
      if (response.result) {
        await refreshProfile()
        setSuccessMessage(response.message||"Profile updated successfully!");
        setTimeout(() => setIsModalOpen(false), 2000); 
      } else {
        setError(response.message || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-52 md:w-96 mt-8">
      <AuthHeading text="Edit Profile" />
      <ProfileForm
        name={name}
        setName={setName}
        gender={selectedGender}
        setGender={setSelectedGender}
        dob={selectedDob}
        setDob={setSelectedDob}
      />
      <TextArea
        label="About Me"
        placeholder="Tell us about yourself..."
        value={aboutText}
        onChange={setAboutText}
      />
      <ErrorMessage message={error} />
      <SuccessMessage message={successMessage} />
      <Button onClick={handleUpdateProfile} loading={loading} disabled={!isEdited || loading}>
        UPDATE
      </Button>
    </div>
  );
};

// Set displayName for the component
ProfileEdit.displayName = "ProfileEdit";

export default ProfileEdit;