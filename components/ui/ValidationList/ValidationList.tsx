import React from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

interface ValidationProps {
  conditions: { isValid: boolean; label: string }[];
}

const ValidationList: React.FC<ValidationProps> = ({ conditions }) => {
  return (
    <div className="flex flex-col gap-2 mt-medium mb-medium text-small md:text-base">
      {conditions.map((condition, index) => (
        <p key={index} className="flex items-center gap-2">
          {condition.isValid ? (
            <IoCheckmarkDoneCircleSharp className="text-green-500" />
          ) : (
            <IoIosCloseCircle className="text-red-500" />
          )}
          {condition.label}
        </p>
      ))}
    </div>
  );
};

export default ValidationList;
