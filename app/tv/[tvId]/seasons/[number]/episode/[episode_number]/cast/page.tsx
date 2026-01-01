"use client";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "@/components/utils/Link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

function PersonListItem({ person, id }: { person: Person; id: string }) {
  return (
    <li
      key={id}
      className="flex items-center space-x-4 py-2 border-b border-gray-700"
    >
      {person.profile_path ? (
        <Link href={`/person/${person.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
            alt={person.name}
            width={46}
            height={69}
            className="w-24 h-auto object-cover rounded"
          />
        </Link>
      ) : (
        <Link href={`/person/${person.id}`}>
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
          href={`/person/${person.id}`}
          className=" text-white text-base font-semibold"
        >
          {person.name}
        </Link>
        <p key={person.character} className=" text-gray-400 text-sm">
          {person.character || person.job}
        </p>
      </div>
    </li>
  );
}

export default function Page() {
  const params = useParams<{
    tvId: string;
    number: string;
    episode_number: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState<Person[]>([]);
  const [crew, setCrew] = useState<Person[]>([]);
  const [guestStars, setGuestStars] = useState<Person[]>([]);
  const [sortedDepartments, setSortedDepartments] = useState<string[]>([]);
  const [crewByDepartment, setCrewByDepartment] = useState<
    Record<string, Person[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/tv/seasons/number/episode?tvId=${params.tvId}&number=${params.number}&episode=${params.episode_number}`;
        const response = await fetch(url);
        const data = await response.json();

        const { cast, crew, guest_stars } = data;

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
        setGuestStars(guest_stars);
        setSortedDepartments(sortedDepartments);
        setCrewByDepartment(crewByDepartment);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId, params.number, params.episode_number]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 my-6"
    >
      <Link
        href={`/tv/${params.tvId}/seasons/${params.number}`}
        className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour aux épisodes
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {cast.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Distribution des rôles{" "}
              <span className="text-red-500">({cast.length})</span>
            </h2>
            <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-4">
              {cast.map((actor, index) => (
                <PersonListItem
                  key={actor.character + "cast" + index}
                  person={actor}
                  id={actor.cast_id}
                />
              ))}
            </ul>
          </div>
        )}

        {crew.length > 0 && (
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
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {guestStars.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Guests <span className="text-red-500">({guestStars.length})</span>
            </h2>
            <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-4">
              {guestStars.map((actor, index) => (
                <PersonListItem
                  key={actor.character + "guest" + index}
                  person={actor}
                  id={actor.cast_id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
