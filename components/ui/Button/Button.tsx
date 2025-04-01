import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  rounded?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  loading?: boolean;
  disabled?: boolean;
  textColor?: string;
  textSize?: string;
  bgNone?: boolean;
  marginTop?: string;
  borderColor?: string;
  borderWidth?: string;
  border?: boolean;
  loaderColor?: string;
  disabledBgColor?: string;
  disabledTextColor?: string;
  disabledOpacity?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  rounded = "rounded-md",
  bgColor = "bg-primary",
  width = "w-full",
  height = "h-10",
  loading = false,
  disabled = false,
  textColor = "text-white",
  textSize = "text-xs",
  bgNone = false,
  marginTop = "mt-5",
  borderColor = "border-none",
  borderWidth = "border-0",
  border = false,
  loaderColor = "border-white",
  disabledBgColor = "bg-primary",
  disabledTextColor = "text-white",
  disabledOpacity = "opacity-50",
}) => {
  // If bgNone is true, remove background color
  const buttonBg = bgNone ? "bg-none" : disabled ? disabledBgColor : bgColor;
  const buttonTextColor = disabled ? disabledTextColor : textColor;

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`relative text-center ${buttonTextColor} font-semibold md:p-2 ${textSize} md:text-sm flex items-center justify-center cursor-pointer 
        ${buttonBg} ${width} ${height} ${className} ${rounded} ${marginTop}
        ${border ? `${borderColor} ${borderWidth}` : ""}
        ${loading || disabled ? `${disabledOpacity} cursor-not-allowed ` : ""}
      `}
    >
      {loading ? (
        <div
          className={`w-5 h-5 border-2 ${loaderColor} border-t-transparent rounded-full animate-spin`}
        ></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
