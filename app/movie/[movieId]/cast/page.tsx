"use client";
import Loading from "@/app/loading";
import { motion } from "framer-motion";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";

function PersonListItem({ person, role }: { person: Person; role: string }) {
  return (
    <li className="flex items-center space-x-4 py-2 border-b border-gray-700">
      {person.profile_path ? (
        <Link href={`/person/${person.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
            alt={person.name}
            width={46}
            height={69}
            className="w-12 h-auto object-cover rounded"
          />
        </Link>
      ) : (
        <Link href={`/person/${person.id}`}>
          <div className="w-12 h-12 bg-gray-600 flex items-center justify-center rounded">
            <FaUserCircle className="text-gray-500 text-2xl" />
          </div>
        </Link>
      )}
      <div>
        <Link
          href={`/person/${person.id}`}
          className="text-black dark:text-white text-base font-semibold"
        >
          {person.name}
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
      </div>
    </li>
  );
}

export default function Page() {
  const params = useParams<{ movieId: string }>();
  const [loading, setLoading] = useState(true);
  const [crew, setCrew] = useState<Person[]>([]);
  const [cast, setCast] = useState<Person[]>([]);
  const [sortedDepartments, setSortedDepartments] = useState<string[]>([]);
  const [crewByDepartment, setCrewByDepartment] = useState<
    Record<string, Person[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/movie/cast?movieId=${params.movieId}`);
        const data = await response.json()
        
        // Types explicites pour cast et crew
         const { cast, crew }: { cast: Person[]; crew: Person[] } = data
        // Typage de l'objet accumulé
        type CrewByDepartment = { [department: string]: Person[] };

        // Trier l'équipe technique par département
        const crewByDepartment = crew.reduce<CrewByDepartment>(
          (acc, member) => {
            if (!member.department) return acc; // Assurez-vous que `department` existe
            if (!acc[member.department]) {
              acc[member.department] = [];
            }
            acc[member.department].push(member);
            return acc;
          },
          {}
        );

        // Trier les départements par ordre alphabétique
        const sortedDepartments = Object.keys(crewByDepartment).sort();
        setCrew(crew);
        setCast(cast);
        setSortedDepartments(sortedDepartments);
        setCrewByDepartment(crewByDepartment);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.movieId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 my-6"
    >
      <Link
        href={`/movie/${params.movieId}`}
        className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour au film
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Distribution des rôles{" "}
            <span className="text-red-500">({cast.length})</span>
          </h2>
          <ul className="space-y-2 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
            {cast.map((actor) => (
              <PersonListItem
                key={actor.cast_id}
                person={actor}
                role={actor.character}
              />
            ))}
          </ul>
        </div>

        <div className="mt-8 lg:mt-0">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Équipe technique{" "}
            <span className="text-red-500">({crew.length})</span>
          </h2>
          <div className="max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
            {sortedDepartments.map((department) => (
              <div key={department} className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-red-500">
                  {department}
                </h3>
                <ul className="space-y-2">
                  {crewByDepartment[department].map((member) => (
                    <PersonListItem
                      key={`${member.credit_id}-${member.job}`}
                      person={member}
                      role={member.job}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
