"use client";
import Image from "next/image";

interface ReusableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  rounded?: boolean;
}

const Images: React.FC<ReusableImageProps> = ({
  src,
  alt,
  width = 192,
  height = 192,
  className = "object-cover",
  rounded = false,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${rounded ? "rounded-full" : ""}`}
    />
  );
};

export default Images;
