import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import CloseButton from "../Button/CloseButton";

interface ActionsSideBarProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const ActionBar: React.FC<ActionsSideBarProps> = ({
  isVisible,
  onClose,
  title = "",
  children,
  width = "w-96", // Default width
}) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
          duration: 1,
        }}
        className={`fixed top-0 right-0 h-full bg-white shadow-lg text-black overflow-y-auto ${width}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <CloseButton onClick={onClose} />
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="w-6"></div>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>,
    document.body // Portals the sidebar to the body
  );
};

export default ActionBar;
