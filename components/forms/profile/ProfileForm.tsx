import React from "react";
import InputBox from "@/components/ui/inputBox/InputBox";
import DropdownBox from "@/components/ui/DropdownBox/DropdownBox";
import InputBoxWithCalender from "@/components/ui/inputBox/InputBoxWithCalender";
import { Gender } from "@/constants/enums";

const genderOptions = [
  { code: Gender.None, name: "Select Your Gender" },
  { code: Gender.Male, name: Gender.Male },
  { code: Gender.Female, name: Gender.Female },
  { code: Gender.PreferNotToSay, name: Gender.PreferNotToSay },
];

interface ProfileFormProps {
  name: string;
  setName: (value: string) => void;
  gender: Gender;
  setGender: (value: Gender) => void;
  dob: string;
  setDob: (value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ name, setName, gender, setGender, dob, setDob }) => {
  return (
    <div>
      <InputBox label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required />

      <DropdownBox
        label="Gender"
        options={genderOptions}
        selectedValue={gender}
        onChange={(e) => setGender(e.target.value as Gender)}
        disabled={!name.trim()}
      />

      <div className="mt-medium">
        <p className="text-xs font-normal mb-1 text-grayShade">Date of Birth</p>
        <InputBoxWithCalender value={dob} onChange={(date) => setDob(date)} />
      </div>
    </div>
  );
};

export default ProfileForm;
