"use client"
import Loading from "@/app/loading";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";

async function obtainTvCredits(tvId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tv credits");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function PersonListItem({ person, role, id }: { person: Person; role: string, id: string }) {
  return (
    <li key={id} className="flex items-center space-x-4 py-2 border-b border-gray-700">
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
          className="text-white text-base font-semibold"
        >
          {person.name}
        </Link>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </li>
  );
}

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<Person[]>([]);
  const [crew, setCrew] = useState<Person[]>([])
  const [sortedDepartments, setSortedDepartments] = useState<string[]>([]);
  const [crewByDepartment, setCrewByDepartment] = useState<Record<string, Person[]>>({});

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { cast, crew } = await obtainTvCredits(params.tvId);
      
        // Trier l'équipe technique par département

        type CrewByDepartment = { [department: string]: Person[] };

        const crewByDepartment = crew.reduce((acc: CrewByDepartment, member: Person) => {
          if (!acc[member.department]) {
            acc[member.department] = [];
          }
          acc[member.department].push(member);
          return acc;
        }, {} as CrewByDepartment);
        
        
      
        // Trier les départements par ordre alphabétique
        const sortedDepartments = Object.keys(crewByDepartment).sort();
        setCast(cast)
        setCrew(crew)
        setSortedDepartments(sortedDepartments)
        setCrewByDepartment(crewByDepartment)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.tvId])

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white px-60 my-6">
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
            <span className="text-orange-500">({cast.length})</span>
          </h2>
          <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-4">
            {cast.map((actor) => (
              <PersonListItem
              key={actor.cast_id}
                person={actor}
                role={actor.character}
                id={actor.cast_id}
              />
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Équipe technique{" "}
            <span className="text-orange-500">({crew.length})</span>
          </h2>
          <div className="max-h-[70vh] overflow-y-auto pr-4">
            {sortedDepartments.map((department) => (
              <div key={department} className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  {department}
                </h3>
                <ul className="space-y-2">
                  {crewByDepartment[department].map((member) => (
                    <PersonListItem
                    key={`${member.id}-${member.name}-${member.department}`}
                      id={`${member.id}-${member.name}-${member.department}`}
                      person={member}
                      role={member.jobs[0].job}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
