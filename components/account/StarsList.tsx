"use client";
import { useStarsList } from "@/app/hooks/huddles/useStarsList";
import { API_STATUS } from "@/common/constant";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../huddle/HuddleSkelton";
import ListItem from "./ListItem";
import Images from "../ui/Images/Images";

interface StarItem {
  id: number;
  name: string;
  membership: string;
  thumbnail: string;
}

interface StarPage {
  result: {
    stars_list: StarItem[];
  };
}

const StarsList = () => {
  const {
    data: stars,
    status,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useStarsList();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  console.log("data stars", stars);
  return (
    <section
      style={{
        height: "calc(100vh - 100px)",
      }}
      className="overflow-y-auto custom-scrollbar w-full flex flex-col"
    >
      {API_STATUS.SUCCESS === status && stars && (
        <>
          {stars?.pages?.length > 0 &&
          stars.pages.some(
            (page: StarPage) => page?.result?.stars_list?.length > 0
          ) ? (
            stars.pages.map((page: StarPage) =>
              page?.result?.stars_list?.map((item: StarItem) => (
                <ListItem
                  key={item.id}
                  user_id={item.id}
                  username={item.name}
                  is_premium={item.membership === "Premium"}
                  profile_pic={item.thumbnail}
                />
              ))
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <Images src="/assets/empty-state.png" alt="No stars found" />
              <p className="text-center text-gray-500 mt-4">No stars found</p>
            </div>
          )}
        </>
      )}

      {isFetchingNextPage && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}
      {hasNextPage && !isFetching && (
        <div ref={ref}>
          <HuddleSkelton />
          <HuddleSkelton />
        </div>
      )}
      {isFetching && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}
    </section>
  );
};

export default StarsList;
