import React from "react";

interface TagProps {
  className: string;
  text: string | undefined;
}

const Tag = ({ className, text }: TagProps) => {
  return <div className={className}>{text}</div>;
};

export default Tag;
