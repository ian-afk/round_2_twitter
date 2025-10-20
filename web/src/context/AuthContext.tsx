import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../store/axios";
type AuthResponse = {
  user: {
    id: string;
    username: string;
    fullName: string;
  };
  loggedIn: boolean;
};
type AuthContextType = {
  user: AuthResponse["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetchAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data,
    isLoading,
    refetch: refetchAuth,
  } = useQuery<AuthResponse>({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await api.get<AuthResponse>("/api/auth/check");
      return res.data;
    },
    retry: false,
  });

  const value: AuthContextType = {
    user: data?.user ?? null,
    isAuthenticated: !!data?.loggedIn,
    isLoading,
    refetchAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
