"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

interface UserData {
  user: UserDetails;
  moviesWatchCount: string;
  TVSHOWWatchCount: string;
  moviesWatchListsCount: string;
  TVSHOWWatchListsCount: string;
  moviesWatchlist: [];
  moviesWatched: [];
  ratings?: {
    _count: {
      rating: number;
    };
    rating: number;
  }[];
}

interface UserDataContextType {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ username: string }>();
  const isLogged = getCookie("isLogged") === "true";
  const cookieUsername = getCookie("username");
  const matchUsername = cookieUsername === params.username;

  useEffect(() => {
    const getUser = async () => {
      try {
        let url;
        if (isLogged && matchUsername) {
          url = `/api/auth/get-full-user?matchUsername=${matchUsername}`;
        } else if (isLogged && !matchUsername) {
          url = `/api/auth/get-full-user?matchUsername=${matchUsername}&username=${params.username}`;
        } else {
          url = `/api/profile/get/no-logged?username=${params.username}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.message === "User not found!") {
          throw new Error("User not found");
        }

        setUserData(data);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [params.username, isLogged, matchUsername]);

  return (
    <UserDataContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
