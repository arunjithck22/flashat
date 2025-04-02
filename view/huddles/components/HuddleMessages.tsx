'use client';

import React, { useEffect, useState } from 'react';
import { HuddleMessage, HuddleMessagesResult } from '@/types/huddles';
import { getPublicHuddlesMessages } from '@/service/huddles.service';
import { ApiResponse } from '@/types/apiResponse';
import HuddleMessageCard from '@/components/cards/huddle/HuddleMessageCard';
import useScroll from '@/hooks/useScroll';
import Empty from '@/components/ui/Empty/Empty';

interface HuddleMessagesProps {
  huddleId: number | null;
}

export type CleanedMessage = {
  id: string;
  text: string;
  createdAt: string;
  leaderShip: string;
  huddle_type: string;
  sender_details: {
    name: string;
    avatar: string;
    countryCode: string;
    premium: boolean;
    thumbnail_url: string;
    country_name: string;
    user_priority: string;
  };
  media_data: {
    type: string;
    thumbnail: string;
    mimeType: string;
    s3Key: string;
    width: string;
    height: string;
    cloudfront: string;
  };
  comments: number;
};

const HuddleMessages: React.FC<HuddleMessagesProps> = ({ huddleId }) => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<HuddleMessage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMessages = async (page: number) => {
    if (!huddleId) return;
    try {
      setIsLoading(true);
      const response: ApiResponse<HuddleMessagesResult> = await getPublicHuddlesMessages(huddleId);
      const newMessages = response.result?.messages ?? [];
      setMessages((prev) => [...prev, ...newMessages]);
      if (newMessages.length < 10) setHasMore(false);
    } catch {
      setError('Failed to fetch messages.');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    fetchMessages(1);
  }, [huddleId]);

  useEffect(() => {
    if (page > 1) fetchMessages(page);
  }, [page]);

  const containerRef = useScroll({
    loading: isLoading,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  if (loading) return <div className="p-4">Loading messages...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const cleanedMessages: CleanedMessage[] = messages.map((msg) => ({
    id: msg.message_id,
    text: msg.message,
    createdAt: msg.created,
    leaderShip: msg.sender_details?.user_citizenship ?? '',
    huddle_type: msg.huddle_type,
    comments: msg.total_comments ?? 0,
    sender_details: {
      name: msg.sender_details?.name ?? '',
      avatar: msg.sender_details?.profile_url ?? '',
      countryCode: msg.sender_details?.country_code ?? '',
      premium: msg.sender_details?.is_premium ?? false,
      thumbnail_url: msg.sender_details?.thumbnail_url ?? '',
      country_name: msg.sender_details?.country_name ?? '',
      user_priority: msg.sender_details?.user_priority ?? '',
    },
    media_data: {
      type: msg.media_meta?.media_type ?? '',
      thumbnail: msg.media_meta?.thumbnail ?? '',
      mimeType: msg.media_meta?.mime_type ?? '',
      s3Key: msg.media_meta?.s3_key ?? '',
      width: msg.media_meta?.media_width ?? '',
      height: msg.media_meta?.media_height ?? '',
      cloudfront: msg.media_meta?.media_cloudfront_url ?? '',
    },
  }));

  return (
    <div ref={containerRef} className="h-[80vh] overflow-y-auto px-4">
      {cleanedMessages.map((msg) => (
        <HuddleMessageCard
          key={msg.id}
          huddle_type={msg.huddle_type}
          leaderShip={msg.leaderShip}
          senderName={msg.sender_details.name}
          avatar={msg.sender_details.avatar}
          flag={msg.sender_details.countryCode ? `🇮🇳` : ""}
          message={msg.text}
          timestamp={new Date(msg.createdAt).toLocaleString()}
          commentCount={msg.comments}
          // media={msg.media_data}
        />
      ))}
      {isLoading && <div className="text-center p-2">Loading more...</div>}
      {messages.length === 0 && (
        <>
          <Empty />
          <p>no messages</p>
        </>
      )}
    </div>
  );
};

export default HuddleMessages;
