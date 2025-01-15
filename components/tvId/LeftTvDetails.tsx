import { Person, TVShow } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaUserCircle,
  FaStar,
  FaCalendarAlt,
  FaLanguage,
  FaFilm,
  FaLayerGroup,
} from "react-icons/fa";

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
  return (
    <div className="lg:col-span-2">
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">Synopsis</h2>
        <p className="text-xl leading-relaxed">{TvDetails.overview}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">
          Informations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
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
              value: new Date(TvDetails.first_air_date).toLocaleDateString(
                "fr-FR"
              ),
            },
            {
              icon: FaCalendarAlt,
              label: "Dernier épisode",
              value: new Date(TvDetails.last_air_date).toLocaleDateString(
                "fr-FR"
              ),
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
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 p-4 rounded-lg"
            >
              <item.icon className="text-[#F5A623] text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-[#F5A623] mb-4">
          Têtes d&apos;affiche
        </h2>
        <ul className="flex flex-wrap -mx-2">
          {cast &&
            cast.slice(0, 5).map((casting) => (
              <li
                key={casting.id}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4"
              >
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  {casting.profile_path ? (
                    <Link href={`/person/${casting.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${casting.profile_path}`}
                        alt={casting.original_name}
                        width={185}
                        height={278}
                        className="w-full h-auto object-cover"
                      />
                    </Link>
                  ) : (
                    <Link
                      href={`/person/${casting.id}`}
                      className="w-full h-0 pb-[150%] bg-gray-600 flex items-center justify-center"
                    >
                      <FaUserCircle className="text-gray-500 text-4xl" />
                    </Link>
                  )}
                  <div className="p-2">
                    <p className="text-white text-sm font-semibold truncate">
                      {casting.name}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {casting.roles[0].character}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {casting.roles[0].episode_count} épisodes
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <Link
          href={`/tv/${tvId}/cast`}
          className="inline-block mt-4 bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-400 transition-colors duration-300 text-sm font-semibold"
        >
          Distribution des rôles et équipe technique au complet
        </Link>
      </section>

      <h2 className="text-2xl font-semibold text-[#F5A623] mt-8">
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
                        className="rounded-lg shadow-md object-cover"
                      />
                    </Link>
                  ) : (
                    <div className="w-[200px] h-[300px] bg-gray-700 rounded-lg shadow-md flex items-center justify-center">
                      <FaUserCircle className="text-gray-500 text-6xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Link
                      href={`/tv/${tvId}/seasons/${lastSeason.season_number}`}
                      className="text-xl font-semibold text-white mb-2"
                    >
                      {lastSeason.name}
                    </Link>
                    <p className="text-[#A1A1A1] mb-4">
                      {lastSeason.overview || "Aucune description disponible."}
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-[#F5A623] font-semibold">
                          {lastSeason.episode_count}
                        </p>
                        <p className="text-sm text-[#A1A1A1]">Épisodes</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-[#F5A623] font-semibold">
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
        <Link className="mt-4" href={`/tv/${tvId}/seasons`}>
          Afficher toutes les saisons
        </Link>
      </section>
    </div>
  );
}
