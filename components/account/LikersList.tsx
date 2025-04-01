"use client";
import { useLikersList } from "@/app/hooks/huddles/useLikersList";
import { API_STATUS } from "@/common/constant";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import HuddleSkelton from "../huddle/HuddleSkelton";
import ListItem from "./ListItem";
import Images from "../ui/Images/Images";

const LikersList = () => {
  const {
    data: likers,
    status,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useLikersList();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <section
      style={{
        height: "calc(100vh - 100px)",
      }}
      className="overflow-y-auto custom-scrollbar w-full flex flex-col"
    >
      {API_STATUS.SUCCESS === status && likers && (
        <>
          {likers?.pages?.length > 0 &&
          likers.pages.some((page) => page?.result?.likers?.length > 0) ? (
            likers.pages.map((page) =>
              page?.result?.likers?.map((item) => (
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
              <Images
                src="/assets/empty-state.png"
                alt="No likers found"
                width={20}
                height={20}
              />
              <p className="text-center text-gray-500 mt-4">No likers found</p>
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

export default LikersList;
