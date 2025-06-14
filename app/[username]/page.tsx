"use client";
import { useEffect, useState, useCallback } from "react";
import Loading from "../loading";
import { ProfileContent } from "@/components/profile/profile-content";
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
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ username: string }>();

  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const cookieUsername = getCookie("username");
  const matchUsername = cookieUsername === params.username ? true : false;

  const getUser = useCallback(async () => {
    try {
      if (isLogged && matchUsername) {
        const res = await fetch(
          `/api/auth/get-full-user?matchUsername=${matchUsername}`
        );
        const data = await res.json();
        setUserData(data);
        return data;
      } else if (isLogged && matchUsername === false) {
        const res = await fetch(
          `/api/auth/get-full-user?matchUsername=${matchUsername}&username=${params.username}`
        );

        const data = await res.json();
        setUserData(data);
        return data;
      }

      const res = await fetch(
        `/api/profile/get/no-logged?username=${params.username}`
      );
      const data = await res.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username, isLogged, matchUsername]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <ProfileContent
      favoriteFilms={userData.moviesWatched}
      watchlistsCount={Number(userData.moviesWatchListsCount)}
      watchLists={userData.moviesWatchlist}
    />
  );
}
