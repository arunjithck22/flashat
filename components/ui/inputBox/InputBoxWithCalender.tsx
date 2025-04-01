import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface InputBoxProps {
  label?: string;
  backgroundColor?: string;
  placeholder?: string;
  padding?: string;
  borderRadius?: string;
  textColor?: string;
  required?: boolean;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  width?: string;
  disabled?: boolean;
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null;
};

const InputBoxWithCalender: React.FC<InputBoxProps> = ({
  label,
  backgroundColor = "bg-[#F1F1F6]",
  placeholder = "Select date...",
  padding = "p-2.5",
  borderRadius = "rounded",
  textColor = "text-black",
  required = false,
  value,
  onChange,
  type = "text",
  width = "w-full",
  disabled = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(parseDate(value));

  useEffect(() => {
    setSelectedDate(parseDate(value));
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`; // ✅ Correct format (DD-MM-YYYY)

      setSelectedDate(date);
      if (onChange) {
        onChange(formattedDate);
      }
    } else {
      setSelectedDate(null);
      if (onChange) {
        onChange("");
      }
    }
  };
  /**
   * Custom button component to trigger the calendar
   */
  const CustomInput = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-center md:w-10 md:h-10 bg-[#F1F1F6] rounded"
    >
      <FaCalendarAlt size={20} className="text-gray-500" />
    </button>
  );

  return (
    <div className={`relative ${width} max-w-full`}> 
      {label && <label className="block text-xs sm:text-sm lg:text-base font-normal mb-1 text-gray-600">{label}</label>}
      <div className="relative flex items-center w-full">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full ${backgroundColor} ${padding} ${borderRadius} ${textColor} outline-none text-xs sm:text-sm lg:text-base font-light pr-10 cursor-pointer`}
          style={{ boxSizing: "border-box" }}
          value={
            selectedDate
              ? `${String(selectedDate.getDate()).padStart(2, "0")}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${selectedDate.getFullYear()}`
              : ""
          }
          readOnly
          required={required}
          disabled={disabled}
        />
        <div className="absolute inset-y-0 right-3 flex items-center ${backgroundColor} p-2 rounded cursor-pointer">
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="scroll"
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            calendarClassName="custom-datepicker"
            customInput={<CustomInput />}
            popperClassName="z-[9999] w-max sm:w-auto md:w-64"
            popperPlacement="bottom-end"
          />
        </div>
      </div>
    </div>
  );
};

export default InputBoxWithCalender;