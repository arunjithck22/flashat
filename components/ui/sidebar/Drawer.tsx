"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "../Button/CloseButton";

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  position?: "left" | "right";
}

const Drawer: React.FC<DrawerProps> = ({
  isVisible,
  onClose,
  title = "",
  children,
  width = "320px",
  position = "left",
}) => {
  const isLeft = position === "left";

  // Prevent rendering errors in SSR (Server-Side Rendering)
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-super-max"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Close when clicking outside the drawer
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: isLeft ? "-100%" : "100%" }} // Start position (left or right)
            animate={{ x: "0%" }} // Animate to visible
            exit={{ x: isLeft ? "-100%" : "100%" }} // Animate out
            transition={{
              type: "spring",
              stiffness: 200, // Controls the "bounce" effect
              damping: 40, // Controls how bouncy it is
            }}
            className={`fixed top-0 ${isLeft ? "left-0" : "right-0"} z-super-max h-full bg-white shadow-lg text-black flex flex-col`}
            style={{
              width,
              maxWidth: "90vw", // Prevents excessive width on smaller screens
            }}
          >
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 ">
              <h2 className="text-lg font-semibold">{title}</h2>
              <CloseButton onClick={onClose} />
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto ">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body // Attach the drawer to the body for proper overlay handling
  );
};

export default Drawer;
