"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  user: string | null;
  token: string | null;
  profile: string | null;
  type: string | null;
  citizenShip: string | null;
  isAuthenticated: boolean;
  name: string | null;
  setIsAuthenticated: (value: boolean) => void;
  error: string | null;
  isLoading: boolean;
  fetchAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [citizenShip, setCitizenShip] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch auth data from API
  const fetchAuth = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("/api/cookies", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();

      setUser(data.user || null);
      setToken(data.token || null);
      setProfile(data?.profile || null);
      setType(data.type || null);
      setCitizenShip(data.citizenShip || null);
      setName(data?.name || null);
      setError(null); // Clear any previous errors
    } catch (err) {
      setUser(null);
      setToken(null);
      setType(null);
      setCitizenShip(null);
      setName(null);
      setError((err as Error).message || "Error fetching auth state");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Update isAuthenticated whenever user or token changes
  useEffect(() => {
    setIsAuthenticated(!!user && !!token);
  }, [user, token]);

  // Fetch on component mount
  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        type,
        name,
        citizenShip,
        isAuthenticated,
        error,
        isLoading,
        fetchAuth,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
