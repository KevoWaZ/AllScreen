"use client";

import Loading from "@/app/loading";
import { ListsResponse, MovieList } from "@/types/types";
import Link from "@/components/utils/Link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiList, FiUser, FiPlus, FiEye } from "react-icons/fi";

export default function ListsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [lists, setLists] = useState<MovieList[]>([]);
  const params = useParams<{ username: string }>();

  const getLists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/lists/all?username=${params.username}`
      );
      const data: ListsResponse = await res.json();
      setLists(data.lists);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  useEffect(() => {
    getLists();
  }, [getLists]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Listes de {params.username}
              </h1>
              <p className="text-[#BDBDBD] flex items-center gap-2">
                <FiList className="w-4 h-4" />
                {lists.length} liste{lists.length > 1 ? "s" : ""} créée
                {lists.length > 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/list/create"
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Nouvelle liste
            </Link>
          </div>
        </div>

        {/* Lists Grid */}
        {lists.length === 0 ? (
          <div className="text-center py-16">
            <FiList className="w-16 h-16 text-[#2C2C2C] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#BDBDBD] mb-2">
              Aucune liste trouvée
            </h3>
            <p className="text-[#BDBDBD] mb-6">
              Commencez par créer votre première liste de films
            </p>
            <button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto">
              <FiPlus className="w-4 h-4" />
              Créer une liste
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <Link
                href={`lists/${list.id}`}
                key={list.id}
                className="bg-[#2C2C2C] rounded-lg p-6 hover:bg-[#3C3C3C] transition-colors duration-200 border border-[#4A4A4A] group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                      <FiList className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg group-hover:text-[#FF5252] transition-colors duration-200">
                        {list.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-[#BDBDBD] text-sm mb-6 line-clamp-3">
                  {list.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#BDBDBD] text-sm">
                    <FiUser className="w-4 h-4" />
                    <span>{params.username}</span>
                  </div>
                  <div className="text-[#FF5252] hover:text-[#D32F2F] transition-colors duration-200 flex items-center gap-1 text-sm font-medium">
                    <FiEye className="w-4 h-4" />
                    Voir
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {lists.length > 0 && (
          <div className="mt-12 bg-[#2C2C2C] rounded-lg p-6 border border-[#4A4A4A]">
            <h3 className="text-xl font-bold text-white mb-4">Statistiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D32F2F] mb-1">
                  {lists.length}
                </div>
                <div className="text-[#BDBDBD] text-sm">
                  Liste{lists.length > 1 ? "s" : ""} créée
                  {lists.length > 1 ? "s" : ""}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4CAF50] mb-1">
                  {lists.reduce(
                    (acc, list) => acc + (list.description ? 1 : 0),
                    0
                  )}
                </div>
                <div className="text-[#BDBDBD] text-sm">Avec description</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF5252] mb-1">
                  {Math.round(
                    lists.reduce((acc, list) => acc + list.name.length, 0) /
                      lists.length
                  ) || 0}
                </div>
                <div className="text-[#BDBDBD] text-sm">
                  Caractères moyens/nom
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
