import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa'; 

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  // Specify additional props explicitly if needed
  // Example: customClassName?: string;
}

function DateSelector({ selectedDate, onDateChange, ...props }: DateSelectorProps) {
  /**
   * Custom button component to trigger the calendar
   */
  const CustomInput = ({ onClick }: { onClick?: () => void }) => (  
    <button 
      onClick={onClick} 
      style={{
        color:"#3F464E",
        border: 'none', 
        padding: '10px', 
        borderRadius: '5px', 
        cursor: 'pointer'
      }}
    >
      <FaCalendarAlt size={20} color="#7A7A7A" />
    </button>
  );

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onDateChange}
      showMonthDropdown
      showYearDropdown
      dropdownMode="scroll"
      scrollableYearDropdown
      yearDropdownItemNumber={50}
      calendarClassName="custom-datepicker"
      customInput={<CustomInput />}
      {...props}
    />
  );
}

export default DateSelector;
