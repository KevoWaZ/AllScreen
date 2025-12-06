"use client";
import Loading from "../loading";
import { ProfileContent } from "@/components/profile/profile-content";
import { useUserData } from "@/context/UserDataContext";

export default function ProfilePage() {
  const { userData, loading } = useUserData();

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <ProfileContent
        ratings={userData.ratings || []}
        favoriteFilms={userData.topRated}
        watchlistsCount={Number(userData.moviesWatchListsCount)}
        watchLists={userData.moviesWatchlist}
      />
    </>
  );
}
