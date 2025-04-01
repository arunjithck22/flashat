import {
  PodiumLiveChatPayload,
  SinglePodium,
  Speaker,
  UserStats,
  WaitList,
} from "@/types/podiums";
import { createContext, ReactNode, useContext, useState } from "react";
import { useProfileContext } from "../ProfileContext";

interface PodiumContextType {
  speakerList: Speaker[];
  setSpeakerList: React.Dispatch<React.SetStateAction<Speaker[]>>;
  waitingList: WaitList[];
  setWaitingList: React.Dispatch<React.SetStateAction<WaitList[]>>;
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
  podiumData: SinglePodium | undefined;
  setPodiumData: React.Dispatch<React.SetStateAction<SinglePodium | undefined>>;
  adminsList: (string | number)[];
  setAdminsList: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  adminInvitesList: number[];
  setAdminInvitesList: React.Dispatch<React.SetStateAction<number[]>>;
  speakerInvites: number[];
  setSpeakerInvites: React.Dispatch<React.SetStateAction<number[]>>;
  frozenUsers: number[];
  setFrozenUsers: React.Dispatch<React.SetStateAction<number[]>>;
  LiveChats: PodiumLiveChatPayload[];
  setLiveChats: React.Dispatch<React.SetStateAction<PodiumLiveChatPayload[]>>;
}

const PodiumContext = createContext<PodiumContextType | undefined>(undefined);

export const PodiumContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { profileData } = useProfileContext();
  const [LiveChats, setLiveChats] = useState<PodiumLiveChatPayload[]>([]);
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [waitingList, setWaitingList] = useState<WaitList[]>([]);
  const [adminsList, setAdminsList] = useState<(string | number)[]>([]);
  const [speakerInvites, setSpeakerInvites] = useState<number[]>([]);
  const [frozenUsers, setFrozenUsers] = useState<number[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    generosity: "",
    rating: profileData?.flax_rate_percentage || 0,
    skills: "",
  });
  const [adminInvitesList, setAdminInvitesList] = useState<number[]>([]);

  const [podiumData, setPodiumData] = useState<SinglePodium | undefined>();

  return (
    <PodiumContext.Provider
      value={{
        speakerList,
        setSpeakerList,
        waitingList,
        setWaitingList,
        userStats,
        setUserStats,
        podiumData,
        setPodiumData,
        adminsList,
        setAdminsList,
        adminInvitesList,
        setAdminInvitesList,
        speakerInvites,
        setSpeakerInvites,
        frozenUsers,
        setFrozenUsers,
        LiveChats,
        setLiveChats,
      }}
    >
      {children}
    </PodiumContext.Provider>
  );
};

export const usePodiumContext = () => {
  const context = useContext(PodiumContext);
  if (!context) {
    throw new Error("useSpeakers must be used within a SpeakerProvider");
  }
  return context;
};
