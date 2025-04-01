import React from "react";

interface CheckAvailabilityProps {
  onClick: () => void;
  disabled: boolean;
  isAvailable?: boolean; 
}

const CheckAvailabilityBtn: React.FC<CheckAvailabilityProps> = ({
  onClick,
  disabled,
  isAvailable,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-44 h-10 mt-2 font-semibold text-xs md:text-sm flex items-center justify-center cursor-pointer
        ${disabled ? " text-gray-400 cursor-not-allowed" : 
        isAvailable ? " text-green-500 cursor-not-allowed" : " text-primary"} 
        rounded-md transition-all duration-200 
      `}
    >
      CHECK AVAILABILITY
    </button>
  );
};

export default CheckAvailabilityBtn;
