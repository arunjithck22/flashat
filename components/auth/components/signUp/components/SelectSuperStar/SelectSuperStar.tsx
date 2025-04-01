"use client";
import React, { useState, useEffect } from "react";
import Heading from "@/components/Headers/AuthHeading";
import InputBox from "@/components/ui/inputBox/InputBox";
import NextButton from "@/components/ui/Button/NextButton";
import SelectSuperStarCard from "@/components/cards/selectSuperStar/SelectSuperStarCard";
import ConfirmSuperStar from "../ConfirmSuperStar";
import Button from "@/components/ui/Button/Button";
import Filter from "./componets/Filter";
import { useSignUp } from "@/contexts/authetication/SignUpContext";
import { useAuthFilter } from "@/contexts/authetication/AuthFilterContext";
import {
  AUTH_QUERY_PARAMS,
} from "@/constants/queryParams/Authetication";
import { selectSuperStar } from "@/service/signUp.service";
import SelectSuperStarLoader from "@/components/SkeltonLoaders/SelectSuperStarLoader";
import useScroll from "@/hooks/useScroll ";
import { useDebounce } from "@/hooks/useDebounce";
import Empty from "@/components/ui/Empty/Empty";
import { SuperStar } from "@/types/signup";




const SelectSuperStar = () => {
  const { accessToken, setShowCloseBtn } = useSignUp();
  const { clearFilters, setFiltersApplied, filtersApplied } = useAuthFilter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<SuperStar[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedSuperstar, setSelectedSuperstar] = useState<SuperStar | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [filter, setFilter] = useState("");
  const debouncedFilterSearch = useDebounce(searchKeyword, 500); 


  const fetchSuperStars = async (page = 1) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      // Step 1: Fetch Exact Match First
      const exactMatchResponse = await selectSuperStar({
        user_type: AUTH_QUERY_PARAMS.USER_TYPE,
        page,
        page_size: AUTH_QUERY_PARAMS.PAGE_SIZE,
        keyword: debouncedFilterSearch,
        search_type: AUTH_QUERY_PARAMS.SEARCH_TYPE.EXACT_MATCH, 
        accessToken: accessToken ?? "",
        filter,
      });
  
      const newData = exactMatchResponse?.result?.users ?? [];
      const hasNextPage = !!exactMatchResponse.result?.next_page;
  
      setAllData((prev) => (page === 1 ? newData : [...prev, ...newData]));
  
      // Step 2: If Exact Match is Completed, Fetch Contain Match
      if (!hasNextPage) {
        const containMatchResponse = await selectSuperStar({
          user_type: AUTH_QUERY_PARAMS.USER_TYPE,
          page,
          page_size: AUTH_QUERY_PARAMS.PAGE_SIZE,
          keyword: debouncedFilterSearch,
          search_type: AUTH_QUERY_PARAMS.SEARCH_TYPE.CONTAIN_MATCH, 
          accessToken: accessToken ?? "",
          filter
        });
  
        const containMatchData = containMatchResponse?.result?.users ?? [];
  
        // ✅ Append contain match results below exact match results
        setAllData((prev) => [...prev, ...containMatchData]);
        setHasMore(!!containMatchResponse.result?.next_page);
      } else {
        setHasMore(hasNextPage);
      }
    } catch (error) {
      console.error("Error fetching superstars:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSuperStars(currentPage);
  }, [debouncedFilterSearch, currentPage,filter]);

  useEffect(() => {
    setShowCloseBtn(false);
  }, [setShowCloseBtn]);

  const containerRef = useScroll({
    loading: isLoading,
    hasMore: hasMore,
    onLoadMore: () => setCurrentPage((prev) => prev + 1),
  });


  const handleApplyFilter = async () => {
    setIsFilterActive(false);
    setAllData([]); // ✅ Clear previous data when filter applies
    fetchSuperStars(1); // ✅ Refetch with new filter
  };

  const handleClearFilters = async () => {
    clearFilters();
    setFiltersApplied(false);
    setIsFilterActive(false);
    setFilter(""); // ✅ Reset filter state
    setAllData([]); // ✅ Clear data on reset
    fetchSuperStars(1); // ✅ Refetch without filters
  };

  return (
    <>
      {!isConfirm && !isFilterActive && (
        <div className="w-80 md:w-96 relative">
          <Heading text="Select Superstar" />
          <div className="flex justify-end">
            <Button
              bgNone
              textColor="text-primary"
              width="w-32"
              textSize="text-md"
              marginTop="mt-0"
              bgColor="bg-red-500"
              onClick={() => setIsFilterActive(true)}
            >
              {filtersApplied ? "Clear Filter" : "Filter"}
            </Button>
          </div>
          <InputBox
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search Superstar"
            label="Choose Superstar"
            maxLength={100}
            required={false}
            marginTop="mt-0"
          />
          <div
            ref={containerRef}
            className="h-[400px] overflow-y-auto w-96 custom-scrollbar-hidden mt-medium"
          >
            {allData.length > 0 ? (
              allData.map((user) => (
                <SelectSuperStarCard
                  key={user.id}
                  id={user.id}
                  thumbnail={user.thumbnail}
                  name={user.name}
                  username={user.username}
                  verified={user.verified}
                  selectedId={selectedId}
                  onSelect={(id) => {
                    setSelectedId(id ?? undefined);
                    setSelectedSuperstar(user);
                  }}
                  membership={user.membership}
                />
              ))
            ) : (
              <div className="flex justify-center">
                <Empty/>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center">
                <SelectSuperStarLoader />
              </div>
            )}
          </div>
          <NextButton
            disabled={!selectedId}
            onClick={() => setIsConfirm(true)}
          />
        </div>
      )}
      {isConfirm && selectedSuperstar && (
        <ConfirmSuperStar selectedSuperstar={selectedSuperstar} />
      )}
       {isFilterActive && (
        <Filter
          setIsFilterActive={setIsFilterActive}
          onApplyFilter={handleApplyFilter}
          setFilter={setFilter}
          handleClearFilter={handleClearFilters}
        />
      )}
    </>
  );
};

export default SelectSuperStar;
