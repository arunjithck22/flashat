import { Gender } from "@/constants/enums";
import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa"; 
import { useAuthFilter } from "@/contexts/authetication/AuthFilterContext"; 

const genderOptions = [
  {
    value: Gender.Male,
    label: "Male",
    iconPath: "/icons/male_icn_(active).png", 
  },
  {
    value: Gender.Female,
    label: "Female",
    iconPath: "/icons/female_icn_(normal).png",
  },
  {
    value: Gender.PreferNotToSay,
    label: "Prefer not to say",
    iconPath: "/icons/agender_icn_(normal).png",
  },
];

const GenderFilter: React.FC = () => {
  const { selectedGenders, setSelectedGenders } = useAuthFilter(); 

  const handleSelect = (gender: Gender) => {
    const updatedSelection = selectedGenders.includes(gender)
      ? selectedGenders.filter((g) => g !== gender) 
      : [...selectedGenders, gender]; 

    setSelectedGenders(updatedSelection); 
  };

  return (
    <div className="bg-white border p-2 w-full">
      {genderOptions.map((option, index) => (
        <div
          key={option.value}
          className={`flex items-center justify-between px-4 py-3 text-visitorText cursor-pointer transition-all 
            ${selectedGenders.includes(option.value) ? "bg-gray-200" : "hover:bg-softGray"}
            ${index !== genderOptions.length - 1 ? "border-b" : ""}`}
          onClick={() => handleSelect(option.value)}
        >
          {/* Left Side: Icon & Label */}
          <div className="flex items-center gap-3">
            <Image
              src={option.iconPath} 
              alt={`${option.label} icon`}
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-visitorText text-sm">{option.label}</span>
          </div>

          {/* Right Side: Show Check Icon if Selected */}
          {selectedGenders.includes(option.value) && <FaCheck className="text-visitorText w-4 h-4" />}
        </div>
      ))}
    </div>
  );
};

export default GenderFilter;
