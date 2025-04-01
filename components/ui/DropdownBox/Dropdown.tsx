import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  position?: "left" | "right" | "center";
  buttonClassName?: string;
  dropdownClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  button,
  children,
  position = "left",
  buttonClassName = "",
  dropdownClassName = "mt-2 w-40 bg-white border shadow-lg rounded-md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Toggle Dropdown Visibility
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close Dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close Dropdown on 'Escape' Key Press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      let left = buttonRect.left;

      if (position === "right") {
        left = buttonRect.right - 160; 
      } else if (position === "center") {
        left = buttonRect.left + buttonRect.width / 2 - 80; 
      }

      setDropdownPosition({ top: buttonRect.bottom + 8, left });
    }
  }, [isOpen, position]);

  return (
    <div className="relative inline-block">
      {/* Clickable Button */}
      <button ref={buttonRef} className={buttonClassName} onClick={toggleDropdown}>
        {button}
      </button>

      {/* Dropdown Content Rendered in Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`absolute z-super-max ${dropdownClassName}`}
            style={{ top: dropdownPosition.top, left: dropdownPosition.left, position: "absolute" }}
            tabIndex={-1}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
