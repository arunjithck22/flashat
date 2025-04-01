import React from "react";

interface NextButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 text-grayShade rounded-md transition mt-2`}
    >
      BACK
    </button>
  );
};

export default BackButton;
