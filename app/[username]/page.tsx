"use client";
import { useEffect, useState, useCallback } from "react";
import Loading from "../loading";
import { ProfileContent } from "@/components/profile/profile-content";
import { useParams } from "next/navigation";

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

  const getUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/get-full-user");
      console.log("res1: ", res);

      if (!res.ok) {
        const res = await fetch(
          `/api/profile/get/no-logged?username=${params.username}`
        );
        const data = await res.json();
        console.log("data1: ", data);

        setUserData(data);
      } else if (res.ok === true) {
        const data = await res.json();
        console.log("data2: ", data);

        setUserData(data);
        return data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

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
