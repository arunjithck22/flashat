import React, { useState } from "react";
import { Icons } from "@/components/ui/icons/icons";


interface InputBoxProps {
  label?: string;
  backgroundColor?: string;
  placeholder?: string;
  padding?: string;
  borderRadius?: string;
  textColor?: string;
  maxLength?: number;
  minLength?: number;
  maxValue?: number;  
  minValue?:number
  required?: boolean;
  pattern?: RegExp;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  marginTop?: string;
  width?: string;
  maxLengthIndicator?: boolean;
  showCheckIcon?: boolean; 
  disabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  backgroundColor = "bg-[#F1F1F6]",
  placeholder = "Enter text...",
  padding = "p-2.5",
  borderRadius = "rounded",
  textColor = "text-black",
  maxLength,
  minLength,
  maxValue, 
  minValue,
  required = false,
  pattern,
  errorMessage = "Invalid input",
  value,
  onChange,
  type = "text",
  marginTop,
  width = "w-full",
  maxLengthIndicator = false,
  showCheckIcon = false, 
  disabled=false
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // ✅ Only allow numeric inputs for day & month
    if (minValue !== undefined || maxValue !== undefined) {
      // Remove non-digit characters
      inputValue = inputValue.replace(/\D/g, "");

      // Convert to number
      let numericVal = parseInt(inputValue, 10);

      // If user clears the field, parseInt("") => NaN, so just allow empty
      if (!isNaN(numericVal)) {
        // Enforce minValue
        if (minValue !== undefined && numericVal < minValue) {
          numericVal = minValue;
        }
        // Enforce maxValue
        if (maxValue !== undefined && numericVal > maxValue) {
          numericVal = maxValue;
        }
        inputValue = numericVal.toString();
      } else {
        inputValue = ""; // user typed nothing or all non-digit
      }
    }

    if (required && !inputValue) {
      setError("This field is required");
    } else if (minLength && inputValue.length < minLength) {
      setError(`Must be at least ${minLength} characters`);
    } else if (maxLength && inputValue.length > maxLength) {
      setError(`Cannot exceed ${maxLength} characters`);
    } else if (pattern && !pattern.test(inputValue)) {
      setError(errorMessage);
    } else {
      setError(null);
    }

    // ✅ Call onChange with validated input value
    onChange({ ...e, target: { ...e.target, value: inputValue } });
  };

  return (
    <div
      className={`relative w-full ${width} ${
        marginTop ? marginTop : "mt-medium"
      }`}
    >
      {label && (
        <label className="block text-xs font-normal mb-1 text-grayShade">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className={`w-full ${backgroundColor} ${padding} ${borderRadius} ${textColor} outline-none text-xs sm:text-sm lg:text-base font-light pr-10 ${
            error ? "border border-red-500" : ""
          }`}
          style={{ boxSizing: "border-box" }}
          value={value}
          onChange={handleValidation}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
        />

        {/* ✅ Password visibility toggle button */}
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Icons.Eye size={18} />
            ) : (
              <Icons.EyeOff size={18} />
            )}
          </button>
        )}

        {/* ✅ Checkmark Icon (only if showCheckIcon is true and no error) */}
        {showCheckIcon && !error && value.length > 0 && (
          <Icons.Done
            size={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
          />
        )}
      </div>

      {/* ✅ Show character count if maxLength is defined */}
      {maxLengthIndicator && (
        <div className="absolute right-2 bottom-2 text-[10px] sm:text-xs lg:text-sm text-gray-400 pointer-events-none">
          {value.length}/{maxLength}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-small md:text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputBox;
