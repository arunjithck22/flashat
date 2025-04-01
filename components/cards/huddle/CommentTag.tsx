import { Icons } from "@/components/ui/icons/icons";
import React from "react";


interface CommentTagProps {
  count?: number;
}

const CommentTag: React.FC<CommentTagProps> = ({ count = 0 }) => {
  return (
    <div className="relative inline-block">
      {/* Main badge */}
      <div className="bg-yellowLite text-primary font-semibold px-4 py-1 rounded-md flex items-center gap-2  text-xs">
        <span>COMMENTS</span>
        <Icons.Menu className="w-4 h-4" />
        <span>{count}</span>
      </div>

      {/* Bottom triangle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-[10px] border-l-transparent border-r-transparent border-t-yellow-400" />
    </div>
  );
};

export default CommentTag;
