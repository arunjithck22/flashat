import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SingleDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      date={selectedDate}
      onChange={setSelectedDate}
      minDate={new Date(1950, 0, 1)} // ⬅ Restrict past years
     
    />
  );
};

export default SingleDatePicker;
