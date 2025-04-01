import React, { useState, useRef, useEffect } from "react";
import { Icons } from "@/components/ui/icons/icons";

interface DropdownItem {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface VerticalMoreDropdownProps {
  items?: DropdownItem[];
  className?: string;
}

const VerticalMoreDropdown: React.FC<VerticalMoreDropdownProps> = ({
  items = [],
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 hover:bg-gray-100 rounded-md"
        title="More options"
      >
        <Icons.MoreVertical className="w-5 h-5" />
      </button>

      {open && items.length > 0 && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                item.onClick?.(); // only call if it exists
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalMoreDropdown;
