'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { getPublicHuddles } from '@/service/huddles.service';
import { ApiResponse } from '@/types/apiResponse';
import { PaginatedHuddles, Huddle } from '@/types/huddles';
import HuddleListCard from '@/components/cards/huddle/HuddleListCard';
import useScroll from '@/hooks/useScroll';
import HuddleListLoader from '@/components/SkeltonLoaders/HuddleListLoader';

const PAGE_SIZE = 10;
interface HuddleListProps{
  onSelectHuddle:(value:number)=> void
}

const HuddleList: React.FC<HuddleListProps> = ({ onSelectHuddle }) => {
  const [huddles, setHuddles] = useState<Huddle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchHuddles = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response: ApiResponse<PaginatedHuddles> = await getPublicHuddles({
        page,
        page_size: PAGE_SIZE,
      });

      const newHuddles = response.result?.huddles || [];
      const isLastPage = newHuddles.length < PAGE_SIZE;

      setHuddles((prev) =>
        page === 1 ? newHuddles : [...prev, ...newHuddles]
      );
      setHasMore(!isLastPage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching huddles:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHuddles(currentPage);
  }, [currentPage, fetchHuddles]);

  const containerRef = useScroll({
    loading: isLoading,
    hasMore: hasMore,
    onLoadMore: () => {
      if (!isLoading && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    },
  });

  const isInitialLoad = currentPage === 1 && isLoading;

  return (
    <div className="flex flex-col p-2 overflow-auto" ref={containerRef}>
      {/* Initial Loader Centered */}
      {isInitialLoad && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, idx) => (
            <HuddleListLoader key={idx} />
          ))}
        </div>
      )}

      {/* Content */}
      {!isInitialLoad &&
        huddles.map((huddle) => (
          <div onClick={() => onSelectHuddle(huddle.id)}>
            <HuddleListCard
              key={huddle.id}
              title={huddle.name}
              message={huddle.last_message?.message || huddle.about}
              time={new Date(
                huddle.activity || huddle.time_updated
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              participants={huddle.total_members}
              imageUrl={huddle.thumbnail}
              premium={huddle.manager_premium_status}
            />
          </div>
        ))}

      {/* Bottom Loader */}
      {!isInitialLoad && isLoading && (
        <div className="mt-4 flex flex-col gap-3">
          {Array.from({ length: 1 }).map((_, idx) => (
            <HuddleListLoader key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HuddleList
