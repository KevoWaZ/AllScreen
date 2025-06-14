"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { ProfileNavigation } from "./profile-navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "@/app/loading";
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

export function ProfileHeader() {
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
    <>
      <div className="bg-[#2C2C2C] rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="relative group cursor-pointer">
            <Avatar.Root className="inline-flex h-24 w-24 md:h-32 md:w-32 select-none items-center justify-center overflow-hidden rounded-full bg-[#4A4A4A]">
              <Avatar.Image
                className="h-full w-full rounded-full object-cover"
                src={userData.user.image || "/placeholder.svg"}
                alt={userData.user.name}
              />
              <Avatar.Fallback className="text-[#BDBDBD] text-2xl font-medium flex h-full w-full items-center justify-center bg-[#4A4A4A] rounded-full">
                {userData.user.name.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {userData.user.name}
                </h1>
                <p className="text-[#BDBDBD] text-sm md:text-base leading-relaxed max-w-md">
                  {userData.user.bio}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {userData.moviesWatchCount}
                  </div>
                  <div className="text-[#BDBDBD] text-sm">Films vus</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {userData.TVSHOWWatchCount}
                  </div>
                  <div className="text-[#BDBDBD] text-sm">Séries vues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileNavigation currentPath={`/${userData.user.name}`} />
    </>
  );
}
