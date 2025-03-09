"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../loading";
import { Person } from "@/types/types";
import { PersonCard } from "@/components/cards/PersonCard";
import { PersonSearch } from "@/components/cards/PersonSearch";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const options = {
      cache: "force-cache" as RequestCache,
    };
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/person?page=${1}`;
        const response = await fetch(url, options);
        const data = await response.json();
        if (data) {
          setPersons(data.results);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMore = async () => {
    const options = {
      cache: "force-cache" as RequestCache,
    };
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const url = `/api/person?page=${currentPage + 1}`;
        const response = await fetch(url, options);
        const data = await response.json();
        setPersons((prev) => [...prev, ...data.results]);
        setCurrentPage((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 max-w-[90vw] md:max-w-[70vw] mx-auto"
    >
      <h3 className="text-2xl font-bold mb-4">Populaires</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {persons && persons.length > 0 ? (
          persons.map((person) => (
            <div key={person.id}>
              <PersonCard person={person}>
                <PersonSearch person={person} />
              </PersonCard>
            </div>
          ))
        ) : (
          <p>Pas de donnĂ©es</p>
        )}
      </div>
      {currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </motion.main>
  );
}
