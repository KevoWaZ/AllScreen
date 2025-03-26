"use client";
import Loading from "@/app/loading";
import { motion } from "framer-motion";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";

type Role = {
  character?: string;
  job?: string;
  episode_count?: number;
  credit_id?: string;
};

function PersonListItem({
  person,
  role,
  id,
}: {
  person: Person;
  role: Role[];
  id: string;
}) {
  return (
    <li
      key={id}
      className="flex items-center space-x-4 py-2 border-b border-gray-700"
    >
      {person.profile_path ? (
        <Link prefetch={false} href={`/person/${person.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
            alt={person.name}
            width={46}
            height={69}
            className="w-24 h-auto object-cover rounded"
          />
        </Link>
      ) : (
        <Link prefetch={false} href={`/person/${person.id}`}>
          <div className="w-24 h-24 bg-gray-600 flex items-center justify-center rounded">
            <FaUserCircle
              height={24}
              width={24}
              className="text-gray-500 text-2xl"
            />
          </div>
        </Link>
      )}
      <div>
        <Link
          prefetch={false}
          href={`/person/${person.id}`}
          className="text-black dark:text-white text-base font-semibold"
        >
          {person.name}
        </Link>
        {role.map((role) => (
          <p
            key={role.credit_id}
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            {role.character || role.job}: {role.episode_count} épisodes
          </p>
        ))}
      </div>
    </li>
  );
}

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<Person[]>([]);
  const [crew, setCrew] = useState<Person[]>([]);
  const [sortedDepartments, setSortedDepartments] = useState<string[]>([]);
  const [crewByDepartment, setCrewByDepartment] = useState<
    Record<string, Person[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/tv/cast?tvId=${params.tvId}`;
        const options = {
          cache: "force-cache" as RequestCache,
        };
        const response = await fetch(url, options);
        const data = await response.json();

        const { cast, crew } = data;

        // Trier l'équipe technique par département
        type CrewByDepartment = { [department: string]: Person[] };

        const crewByDepartment = crew.reduce(
          (acc: CrewByDepartment, member: Person) => {
            if (!acc[member.department]) {
              acc[member.department] = [];
            }
            acc[member.department].push(member);
            return acc;
          },
          {} as CrewByDepartment
        );

        // Trier les départements par ordre alphabétique
        const sortedDepartments = Object.keys(crewByDepartment).sort();
        setCast(cast);
        setCrew(crew);
        setSortedDepartments(sortedDepartments);
        setCrewByDepartment(crewByDepartment);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId]);

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
        href={`/tv/${params.tvId}`}
        className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour a la série
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Distribution des rôles{" "}
            <span className="text-red-500">({cast.length})</span>
          </h2>
          <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-4">
            {cast.map((actor) => (
              <PersonListItem
                key={actor.roles[0].credit_id}
                person={actor}
                role={actor.roles.map((role) => ({
                  ...role,
                  episode_count: Number(role.episode_count), // Convertir en nombre
                }))}
                id={actor.cast_id}
              />
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Équipe technique{" "}
            <span className="text-red-500">({crew.length})</span>
          </h2>
          <div className="max-h-[70vh] overflow-y-auto pr-4">
            {sortedDepartments.map((department) => (
              <div key={department} className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-red-500">
                  {department}
                </h3>
                <ul className="space-y-2">
                  {crewByDepartment[department].map((member) => (
                    <PersonListItem
                      key={`${member.id}-${member.name}-${member.department}`}
                      id={`${member.id}-${member.name}-${member.department}`}
                      person={member}
                      role={member.jobs}
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
