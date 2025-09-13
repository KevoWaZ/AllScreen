import { useCallback, useEffect, useState } from "react";
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

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ username: string }>();
  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const cookieUsername = getCookie("username");
  const matchUsername = cookieUsername === params.username ? true : false;

  const getUser = useCallback(async () => {
    try {
      let url;
      if (isLogged && matchUsername) {
        url = `/api/auth/get-full-user?matchUsername=${matchUsername}`;
      } else if (isLogged && matchUsername === false) {
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
  }, [params.username, isLogged, matchUsername]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return { userData, loading, error };
}
