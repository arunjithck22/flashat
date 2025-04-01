"use client";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";
import { COMMON_EVENTS } from "@/constants/events";
import { getBrowserTimeZone } from "@/utils/clientUtils";
import { ProfileResponse, Empowerments } from "@/types/profile";
import { getProfile } from "@/service/profile.service";


interface ProfileContextType {
  profileData: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  empowerments: Empowerments | null;
  timeZone: string;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

interface EmpowerEventPayload {
  eventName: string;
  data: Empowerments; 
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { socket } = useSocket();
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [empowerments, setEmpowerments] = useState<Empowerments | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeZone, setTimezone] = useState<string>("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      if (response?.result) {
        setProfileData(response.result);
        setEmpowerments(response.result.empowerments);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setTimezone(getBrowserTimeZone());
  }, []);

  useEffect(() => {
    if (socket) {
      const handleEmpowerEvent = (payload: EmpowerEventPayload) => {
        if (payload.eventName === COMMON_EVENTS.USER_EMPOWERMENT_UPDATE) {
          setEmpowerments(payload.data);
        }
      };
      socket.on("message", handleEmpowerEvent);
      return () => {
        socket.off("message", handleEmpowerEvent);
      };
    }
  }, [socket, socket?.connected]);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <ProfileContext.Provider value={{ profileData, loading, error, empowerments, timeZone, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};


export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
