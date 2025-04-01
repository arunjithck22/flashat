import Link from "next/link";
import React from "react";

interface MyComponentProps {
  children: React.ReactNode;
  variant: string;
  href?: string;
}

const IconButton = ({ children, variant, href }: MyComponentProps) => {
  const bg = variant === "primary" ? "bg-primary text-white" : "bg-secondary";
  return (
    <Link
      className={`flex  text-nowrap items-center px-1 py-2 w-full  rounded text-xs lg:text-sm mr-2 last:mr-0 md:even:w-20 lg:even:w-24 xl:even:w-32 md:last:w-20 lg:last:w-24 xl:last:w-32
         justify-center hover:cursor-pointer ${bg} flex-1`}
      href={href || ""}
    >
      {children}
    </Link>
  );
};

export default IconButton;
