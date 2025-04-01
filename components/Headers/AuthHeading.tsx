import React from "react";

interface HeadingProps {
  text: string;
  className?: string;
}

const AuthHeading: React.FC<HeadingProps> = ({ text, className = "text-2xl font-bold text-headingGray" }) => {
  return <h1 className={`text-center ${className}`}>{text}</h1>;
};

export default AuthHeading;
