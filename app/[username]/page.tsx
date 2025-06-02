"use client";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { ProfileContent } from "@/components/profile/profile-content";

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

  const getUser = async () => {
    try {
      const res = await fetch("/api/auth/get-full-user");
      const data = await res.json();
      setUserData(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
