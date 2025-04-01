import React, { useState } from "react";
import InputBox from "../inputBox/InputBox";
import Button from "../Button/Button";
import ErrorMessage from "../messages/ErrorMessage";
import SuccessMessage from "../messages/SuccessMessage";

interface EditableDropdownProps {
  label: string;
  value: string;
  maxLength?: number;
  minLength?: number;
  maxValue?: number;
  minValue?: number;
  required?: boolean;
  pattern?: RegExp;
  errorMessage?: string;
  showCheckIcon?: boolean;
  maxLengthIndicator?: boolean;
  onSave: (newValue: string) => void | Promise<void>; 
  onChange?: (newValue: string) => void; 
  onCancel: () => void;
  loading?: boolean; 
  responseError?:string
  responseSuccess?:string
  type?:string
}

const EditableDropdown: React.FC<EditableDropdownProps> = ({
  label,
  value,
  maxLength,
  minLength,
  maxValue,
  minValue,
  required = false,
  pattern,
  errorMessage,
  showCheckIcon = false,
  maxLengthIndicator = false,
  onSave,
  onCancel,
  loading = false,
  responseError,
  responseSuccess,
  type,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsChanged(e.target.value !== value);
  };

  const handleSave = () => {
    if (isChanged) {
      onSave(inputValue);
    }
  };

  return (
    <div className="w-full bg-white rounded-md ">
      <InputBox
        label={label}
        value={inputValue}
        onChange={handleChange}
        maxLength={maxLength}
        minLength={minLength}
        maxValue={maxValue}
        minValue={minValue}
        required={required}
        pattern={pattern}
        errorMessage={errorMessage}
        showCheckIcon={showCheckIcon}
        maxLengthIndicator={maxLengthIndicator}
        marginTop="mt-0"
        type={type}
      />
      <ErrorMessage message={responseError ?? null}/>
      <SuccessMessage message={responseSuccess ?? null}/>
      <div className="flex justify-end gap-3 mt-2">
        <Button onClick={onCancel} bgNone textColor="text-tsecond" width="w-16" height="h-8">
          CANCEL 
        </Button>
        <Button onClick={handleSave} width="w-16" height="h-8" disabled={!isChanged} loading={loading}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default EditableDropdown;
