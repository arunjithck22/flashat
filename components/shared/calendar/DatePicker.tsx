/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar } from "react-date-range";
import React, { useState } from "react";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { convertDateToGMT, formatDate } from "@/utils/clientUtils";

const DatePicker = ({ date, setDate, placeholder }: any) => {
  const [gmtDate, setGmtDate] = useState(convertDateToGMT(date));
  const localeMapping: { [key: string]: any } = {
    en: locales.enUS.enUS,

    ar: locales.arSA.arSA,
  };

  // useEffect(() => {
  //   return () => {
  //     setGmtDate(convertDateToGMT(date));
  //   };
  // }, []);

  const selectedLocale = localeMapping["en"] || locales.enUS;

  const handleDateChange = (item: any) => {
    if (item && item instanceof Date) {
      setGmtDate(item);
      const formattedDate = formatDate(item?.toString());

      setDate(formattedDate);
    } else {
      console.error("Invalid date:", item);
    }
  };

  return (
    <div>
      {locales && (
        <Calendar
          onChange={handleDateChange}
          locale={selectedLocale}
          date={gmtDate}
        />
      )}
    </div>
  );
};

export default DatePicker;
