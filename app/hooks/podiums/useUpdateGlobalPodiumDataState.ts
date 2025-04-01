"use client";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { SinglePodium } from "@/types/podiums";
import { useCallback } from "react";

export const useUpdateGlobalPodiumDataState = () => {
  const { setPodiumData } = usePodiumContext();
  const updatePodiumData = useCallback(
    (key: keyof SinglePodium, value: boolean) => {
      setPodiumData(
        (prev) =>
          ({
            ...prev,
            [key]: value,
          } as SinglePodium)
      );
    },
    [setPodiumData]
  );

  return updatePodiumData;
};
