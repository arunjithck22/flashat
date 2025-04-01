import React from "react";

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  id,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      {/* Hidden Default Checkbox */}
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden peer"
      />

      {/* Custom Styled Checkbox */}
      <div
        className={`h-5 w-5 flex items-center justify-center  rounded 
          ${
            checked ? "bg-primary  text-green-500" : "bg-gray-100 border"
          } 
         
          transition-all duration-200`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Label */}
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
