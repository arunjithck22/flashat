import React from "react";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = "Enter text...",
  value,
  onChange,
  rows = 4,
  maxLength,
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className={`w-full  mt-medium ${className}`}>
      {label && <label className="block text-xs font-normal text-grayShade mb-1">{label}</label>}
      <textarea
        className="w-full p-2 rounded-md outline-none text-text-grayShade bg-[#F1F1F6]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default TextArea;
