"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { ProfileNavigation } from "@/components/profile/profile-navigation";
import { ProfileContent } from "@/components/profile/profile-content";

// Define the type for the user details
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
// Define the type for the overall data structure
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
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProfileHeader
          user={userData.user}
          counts={{
            moviesWatchCount: parseInt(userData.moviesWatchCount),
            TVSHOWWatchCount: parseInt(userData.TVSHOWWatchCount),
            moviesWatchListsCount: parseInt(userData.moviesWatchListsCount),
            TVSHOWWatchListsCount: parseInt(userData.TVSHOWWatchListsCount),
          }}
        />
        <ProfileNavigation currentPath={`/${params.username}`} />

        <ProfileContent
          favoriteFilms={userData.moviesWatched}
          watchlistsCount={Number(userData.moviesWatchListsCount)}
          watchLists={userData.moviesWatchlist}
        />
      </div>
    </div>
  );
}
