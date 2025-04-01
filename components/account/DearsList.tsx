"use client";
import { useDearsList } from "@/app/hooks/huddles/useDearsList";
import { API_STATUS } from "@/common/constant";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../huddle/HuddleSkelton";
import ListItem from "./ListItem";
import Images from "../ui/Images/Images";

const DearsList = () => {
  const {
    data: dears,
    status,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useDearsList();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <section
      style={{
        height: "calc(100vh - 150px)",
      }}
      className="overflow-y-auto custom-scrollbar w-full flex flex-col"
    >
      {API_STATUS.SUCCESS === status && dears && (
        <>
          {dears?.pages?.length > 0 &&
          dears.pages.some((page) => page?.result?.dears?.length > 0) ? (
            dears.pages.map((page) =>
              page?.result?.dears?.map((item) => (
                <ListItem
                  key={item?.id}
                  username={item.name}
                  is_premium={item?.membership === "Premium"}
                  profile_pic={item?.thumbnail}
                  user_id={item?.id}
                />
              ))
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full">
          
              <Images src="/assets/empty-state.png" alt="No dears found" />
              <p className="text-center text-gray-500 mt-4">No dears found</p>
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

export default DearsList;
