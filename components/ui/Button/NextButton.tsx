import React, { useEffect } from "react";

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled = true, loading = false }) => {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !disabled && !loading) {
        onClick(); // Trigger click function
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick, disabled, loading]); // Runs when these dependencies change

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-2 text-white rounded-md transition mt-medium flex items-center justify-center
        ${
          disabled || loading
            ? "bg-disabledGray cursor-not-allowed"
            : "bg-primary"
        }`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        "NEXT"
      )}
    </button>
  );
};

export default NextButton;
