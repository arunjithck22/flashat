"use client";
import { useFansList } from "@/app/hooks/huddles/useFansList";
import { API_STATUS } from "@/common/constant";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../huddle/HuddleSkelton";
import ListItem from "./ListItem";
import Images from "../ui/Images/Images";

const FansList = () => {
  const {
    data: fans,
    status,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useFansList();
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
      {API_STATUS.SUCCESS === status && fans && (
        <>
          {fans?.pages?.length > 0 &&
          fans.pages.some((page) => page?.result?.fans?.length > 0) ? (
            fans.pages.map((page) =>
              page?.result?.fans?.map((item) => (
                <ListItem
                  key={item?.id}
                  user_id={item?.id}
                  username={item.name}
                  is_premium={item?.membership === "Premium"}
                  profile_pic={item?.thumbnail}
                />
              ))
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <Images src="/assets/empty-state.png" alt="No fans found" />
              <p className="text-center text-gray-500 mt-4">No fans found</p>
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

export default FansList;
