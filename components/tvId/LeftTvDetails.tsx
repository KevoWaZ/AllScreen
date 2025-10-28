import { Person, TVShow } from "@/types/types";
import Image from "next/image";
import Link from "@/components/utils/Link";
import {
  FaUserCircle,
  FaStar,
  FaCalendarAlt,
  FaLanguage,
  FaFilm,
  FaLayerGroup,
} from "react-icons/fa";
import { PersonCard } from "../cards/PersonCard";
import PersonTvCast from "../cards/PersonTvCast";

interface LeftTvDetailsProps {
  TvDetails: TVShow;
  cast: Person[];
  tvId: string;
  formatCurrency: (value: number) => string;
}

export default function LeftTvDetails({
  TvDetails,
  cast,
  tvId,
}: LeftTvDetailsProps) {
  const informations = [
    {
      icon: FaStar,
      label: "Note",
      value: `${TvDetails.vote_average.toFixed(1)} (${
        TvDetails.vote_count
      } votes)`,
    },
    {
      icon: FaCalendarAlt,
      label: "Premier épisode",
      value: new Date(TvDetails.first_air_date).toLocaleDateString("fr-FR"),
    },
    {
      icon: FaCalendarAlt,
      label: "Dernier épisode",
      value: new Date(TvDetails.last_air_date).toLocaleDateString("fr-FR"),
    },
    {
      icon: FaLanguage,
      label: "Langue originale",
      value: TvDetails.original_language.toUpperCase(),
    },
    {
      icon: FaLayerGroup,
      label: "Saisons",
      value: TvDetails.number_of_seasons,
    },
    {
      icon: FaFilm,
      label: "Episodes",
      value: TvDetails.number_of_episodes,
    },
  ];

  return (
    <div className="lg:col-span-2">
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-red-500">Synopsis</h2>
        <p className="text-xl leading-relaxed">{TvDetails.overview}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-red-500">
          Informations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {informations.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 p-4 rounded-lg"
            >
              <item.icon className="text-red-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-300">{item.label}</p>
                <p className="text-lg font-semibold text-[#f1f1f1]">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Têtes d&apos;affiche
        </h2>
        <ul className="flex flex-wrap -mx-2">
          {cast &&
            cast
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 5)
              .map((casting) => (
                <li
                  key={casting.cast_id}
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4"
                >
                  <PersonCard href={`/person/${casting.id}`} person={casting}>
                    <PersonTvCast casting={casting} />
                  </PersonCard>
                </li>
              ))}
        </ul>
        <Link
          href={`/tv/${tvId}/cast`}
          className="inline-block mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition-colors duration-300 text-sm font-semibold"
        >
          Distribution des rôles et équipe technique au complet
        </Link>
      </section>

      <h2 className="text-2xl font-semibold text-red-500 mt-8">
        Dernière saison
      </h2>
      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        {TvDetails.seasons && TvDetails.seasons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6">
            {(() => {
              const lastSeason =
                TvDetails.seasons[TvDetails.seasons.length - 1];
              return (
                <>
                  {lastSeason.poster_path ? (
                    <Link
                      href={`/tv/${tvId}/seasons/${lastSeason.season_number}`}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${lastSeason.poster_path}`}
                        alt={lastSeason.name}
                        width={200}
                        height={300}
                        className="rounded-lg shadow-md object-cover transition-transform transform hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <div className="w-[200px] h-[300px] bg-gray-700 rounded-lg shadow-md flex items-center justify-center">
                      <FaUserCircle className="text-gray-500 text-6xl" />
                    </div>
                  )}
                  <div className="flex-1 p-4">
                    <Link
                      href={`/tv/${tvId}/seasons/${lastSeason.season_number}`}
                      className="text-2xl font-bold text-white mb-2 transition-colors hover:text-red-500"
                    >
                      {lastSeason.name}
                    </Link>
                    <p className="text-gray-300 mb-4">
                      {lastSeason.overview || "Aucune description disponible."}
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-red-500 font-semibold">
                          {lastSeason.episode_count}
                        </p>
                        <p className="text-sm text-[#A1A1A1]">Épisodes</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-red-500 font-semibold">
                          {new Date(lastSeason.air_date).getFullYear()}
                        </p>
                        <p className="text-sm text-[#A1A1A1]">Année</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
        <Link
          href={`/tv/${tvId}/seasons`}
          className="mt-4 inline-block bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition-colors duration-300 text-sm font-semibold"
        >
          Afficher toutes les saisons
        </Link>
      </section>
    </div>
  );
}
