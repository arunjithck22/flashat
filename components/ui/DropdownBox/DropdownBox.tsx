import React from "react";

interface DropdownBoxProps {
  label?: string;
  options: { code: string; name: string }[]; // List of options (gender options)
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  marginTop?:string
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ label, options, selectedValue, onChange,disabled ,marginTop="mt-medium" }) => {
  return (
    <div className={`${marginTop} w-full`}>
      {label && <label className="block text-xs font-normal mb-1 text-grayShade">{label}</label>}

      <select
        value={selectedValue}
        onChange={onChange}
        disabled={disabled} 
        className="w-full p-2.5 bg-[#F1F1F6] text-xs font-light border border-none rounded text-grayShade outline-none"
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownBox;
