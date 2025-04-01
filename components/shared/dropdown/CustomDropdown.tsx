/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const CustomDropdown = ({ options, value, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionClick = (option: any) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative col-span-3">
      {/* Selected Option */}
      <div
        className="py-2 px-2 text-sm bg-gray-200 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md z-10">
          {options.map((option: any) => (
            <div
              key={option}
              className="py-2 px-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
