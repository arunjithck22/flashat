'use client';

import React, { useCallback, useEffect, useState } from 'react';
import PanelLayout from '@/components/PanelLayout/PanelLayout';
import HuddleMessages from '../components/HuddleMessages';
import HuddleHeading from '../components/HuddleHeading';
import { getPublicHuddles } from '@/service/huddles.service';
import { ApiResponse } from '@/types/apiResponse';
import { Huddle, PaginatedHuddles } from '@/types/huddles';
import HuddleList from '../components/HuddleList';

const PAGE_SIZE = 10;

const PublicHuddles = () => {
  const [selectedHuddleId, setSelectedHuddleId] = useState<number | null>(null);
  const [huddles, setHuddles] = useState<Huddle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isInitialLoad = isLoading && currentPage === 1;

  const fetchHuddles = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const res: ApiResponse<PaginatedHuddles> = await getPublicHuddles({
        page,
        page_size: PAGE_SIZE,
      });

      const newHuddles = res.result?.huddles || [];
      const isLastPage = newHuddles.length < PAGE_SIZE;

      setHuddles((prev) => (page === 1 ? newHuddles : [...prev, ...newHuddles]));
      setHasMore(!isLastPage);
    } catch (err) {
      console.error('Error fetching huddles:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHuddles(currentPage);
  }, [currentPage, fetchHuddles]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const dummyHuddle = {
    title: 'Design Standup',
    participants: 12,
    online: 5,
    imageUrl: 'https://i.imgur.com/some-img.jpg',
    premium: true,
  };

  return (
    <PanelLayout
      leftComponent={
        <HuddleList
          huddles={huddles}
          isLoading={isLoading}
          isInitialLoad={isInitialLoad}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelectHuddle={setSelectedHuddleId}
        />
      }
      rightComponent={
        selectedHuddleId ? <HuddleMessages huddleId={selectedHuddleId} /> : null
      }
      dataAvailable={!!selectedHuddleId}
      rightHeader={
        <HuddleHeading
          title={dummyHuddle.title}
          participants={dummyHuddle.participants}
          online={dummyHuddle.online}
          imageUrl={dummyHuddle.imageUrl}
          premium={dummyHuddle.premium}
          onEdit={() => console.log('Edit clicked')}
          onMore={() => console.log('More clicked')}
        />
      }
    />
  );
};

export default PublicHuddles;
