import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import CloseButton from "../Button/CloseButton";


interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children?: ReactNode;
  showCloseButton?: boolean;
  showCloseBtnRounded?: boolean;
  backgroundClickClose?: boolean;
  titleClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  showCloseBtnRounded = false,
  backgroundClickClose = true,
  titleClassName,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 flex items-center justify-center z-[9999] w-full h-screen"
        role="dialog"
        aria-labelledby="modal-title"
        onClick={backgroundClickClose ? onClose : undefined} // Close only if allowed
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative bg-white rounded-xl border border-gray-200 shadow-lg p-6 z-[10000]"
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.75, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // Prevent background clicks from closing modal
        >
          <div className="flex justify-between items-center">
            <h2
              id="modal-title"
              className={`text-lg font-semibold text-gray-800 ${titleClassName}`}
            >
              {title}
            </h2>
            {showCloseButton && (
               <CloseButton onClick={onClose} />
            
            )}
          </div>
          {showCloseBtnRounded && (
            <div className="ml-5 mt-5">
              <CloseButton onClick={onClose} />
            </div>
          )}
          <div className="overflow-y-auto md:p-4">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body // Renders modal at the root of the document
  );
};

export default Modal;
