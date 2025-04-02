'use client';

import React from 'react';
import { Huddle } from '@/types/huddles';
import HuddleListCard from '@/components/cards/huddle/HuddleListCard';
import HuddleListLoader from '@/components/SkeltonLoaders/HuddleListLoader';
import useScroll from '@/hooks/useScroll';
import Empty from '@/components/ui/Empty/Empty';


interface HuddleListProps {
  huddles: Huddle[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectHuddle: (id: number) => void;
  isInitialLoad?: boolean;
}

const HuddleList: React.FC<HuddleListProps> = ({
  huddles = [],
  isLoading,
  hasMore,
  onLoadMore,
  onSelectHuddle,
  isInitialLoad = false,
}) => {
  const containerRef = useScroll({ loading: isLoading, hasMore, onLoadMore });

  return (
    <div className="flex flex-col p-2 overflow-auto h-full" ref={containerRef}>
      {/* Initial loader */}
      {isInitialLoad && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, idx) => (
            <HuddleListLoader key={idx} />
          ))}
        </div>
      )}

      {/* Huddle cards */}
      {!isInitialLoad && huddles.length > 0 && (
        <div className="flex flex-col gap-3">
          {huddles.map((huddle) => (
            <div key={huddle.id} onClick={() => onSelectHuddle(huddle.id)}>
              <HuddleListCard
                title={huddle.name}
                message={huddle.last_message?.message || huddle.about}
                time={new Date(
                  huddle.activity || huddle.time_updated
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
                participants={huddle.total_members}
                imageUrl={huddle.thumbnail}
                premium={huddle.manager_premium_status}
              />
            </div>
          ))}
        </div>
      )}

      {/* No data */}
      {!isInitialLoad && huddles.length === 0 && !isLoading && (
        <div className="text-center text-muted text-sm mt-6">
          <Empty/>
          No huddles found.
        </div>
      )}

      {/* Bottom loader */}
      {!isInitialLoad && isLoading && (
        <div className="mt-4 flex flex-col gap-3">
          <HuddleListLoader />
        </div>
      )}
    </div>
  );
};

export default HuddleList;
