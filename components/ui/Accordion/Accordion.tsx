import { useState } from "react";
import { motion } from "framer-motion";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  expandedTitle?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  expandedTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      id="accordion-open"
      data-accordion="open"
      className="w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Smooth initial render
    >
      <h2 id="accordion-open-heading">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-gray-500  border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls="accordion-open-body"
        >
          <span className="flex gap-4 items-center justify-center w-full">
            {isOpen ? (expandedTitle ? expandedTitle : title) : title}
            <motion.svg
              data-accordion-icon
              className="w-3 h-3 shrink-0"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </motion.svg>
          </span>
        </button>
      </h2>
      <motion.div
        id="accordion-open-body"
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-labelledby="accordion-open-heading"
      >
        <div className="p-5 border flex w-full justify-center items-center border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Accordion;
