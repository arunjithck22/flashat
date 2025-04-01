import React, { useEffect, useState } from "react";

interface SuccessMessageProps {
  message: string | null;
  duration?: number; // Optional duration to clear the message
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, duration = 2000 }) => {
  const [visibleMessage, setVisibleMessage] = useState<string | null>(message);

  useEffect(() => {
    if (message) {
      setVisibleMessage(message); // Show the success message
      const timer = setTimeout(() => setVisibleMessage(null), duration); // Hide after `duration` ms
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [message, duration]);

  if (!visibleMessage) return null; // Don't render anything if no message

  return (
    <div className="flex justify-center">
      <p className="text-green-500 mt-2 text-sm">{visibleMessage}</p>
    </div>
  );
};

export default SuccessMessage;
