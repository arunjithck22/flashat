"use client";
import { useState } from "react";
import DOMPurify from "dompurify";

export const TextMessage = ({ message }: { message: string }) => {
  const [expanded, setExpanded] = useState(false);

  const sanitizedMessage = DOMPurify.sanitize(linkify(message));

  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Define a truncated version of the message with an ellipsis at the end
  const truncatedMessage =
    sanitizedMessage.length > 200
      ? sanitizedMessage.slice(0, 200) + "....." // Add ellipsis if truncated
      : sanitizedMessage;

  return (
    <div className="text-tpost break-words mb-2">
      <span
        dangerouslySetInnerHTML={{
          __html: expanded ? sanitizedMessage : truncatedMessage,
        }}
      ></span>
      {sanitizedMessage.length > 200 && (
        <button
          onClick={toggleExpanded}
          className={`text-yellow-600 visited:text-purple-600 underline text-sm ${
            expanded && "ml-2"
          }`}
        >
          {expanded ? "  view less" : "view more"}
        </button>
      )}
    </div>
  );
};

export function linkify(text: string) {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text?.replace(urlRegex, function (url) {
    return `<a href="${url}" class="text-blue-600 visited:text-purple-600" target="_blank">${url}</a>`;
  });
}
