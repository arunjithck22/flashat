'use client';

import React, { useEffect, useState } from 'react';
import { HuddleMessage, HuddleMessagesResult } from '@/types/huddles';
import { getPublicHuddlesMessages } from '@/service/huddles.service';
import Empty from '@/components/ui/Empty/Empty';
import { ApiResponse } from '@/types/apiResponse';
import HuddleMessageCard from '@/components/cards/huddle/HuddleMessageCard';


interface HuddleMessagesProps {
  huddleId: number | null;
}

const HuddleMessages: React.FC<HuddleMessagesProps> = ({ huddleId }) => {
  const [messages, setMessages] = useState<HuddleMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (huddleId) {
          const response: ApiResponse<HuddleMessagesResult> = await getPublicHuddlesMessages(huddleId);
          console.log(response, 'response messages');

          if (response.result?.messages) {
            setMessages(response.result.messages);
          } else {
            setError(response.error || 'Unknown error occurred');
          }
        }
      } catch (err) {
        setError('Failed to load messages 😢');
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [huddleId]);

  if (loading) return <div className="p-4">Loading messages...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    // <div className="space-y-4 p-4 overflow-auto">
    //   {messages.length === 0 ? (
    //     <Empty />
    //   ) : (
    //     messages.map((msg) => (
    //       <div
    //         key={msg.message_id}
    //         className="border p-4 rounded-md shadow bg-white text-sm"
    //       >
    //         <h3 className="font-semibold text-base mb-2">Message ID: {msg.message_id}</h3>

    //         <div className="grid grid-cols-2 gap-2">
    //           {Object.entries(msg).map(([key, value]) => (
    //             <div key={key} className="break-words">
    //               <span className="font-medium text-gray-700">{key}:</span>{' '}
    //               <span className="text-gray-900">
    //                 {typeof value === 'object' && value !== null
    //                   ? (
    //                       key === 'sender_details'
    //                         ? (
    //                             <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
    //                               {JSON.stringify(value, null, 2)}
    //                             </pre>
    //                           )
    //                         : JSON.stringify(value)
    //                     )
    //                   : String(value)}
    //               </span>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>
    <div>
      <HuddleMessageCard/>
    </div>
  );
};

export default HuddleMessages;
