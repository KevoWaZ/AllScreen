import { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaUserCircle,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
  FaMoneyBillWave,
  FaFilm,
} from "react-icons/fa";
import MovieVideos, { Video } from "./MovieVideos";

export interface Casting {
  cast_id: number;
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface LeftMovieDetailsProps {
  movieDetails: Movie;
  cast: Casting[]; // Changez ici pour un tableau de "Casting"
  movieId: string;
  videos: Video[];
  formatCurrency: (value: number) => string;
}

export default function LeftMovieDetails({
  movieDetails,
  cast,
  movieId,
  videos,
  formatCurrency,
}: LeftMovieDetailsProps) {
  return (
    <div className="lg:col-span-2">
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-red-500">Synopsis</h2>
        <p className="text-xl leading-relaxed">{movieDetails.overview}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-red-500">
          Informations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: FaStar,
              label: "Note",
              value: `${movieDetails.vote_average.toFixed(1)} (${
                movieDetails.vote_count
              } votes)`,
            },
            {
              icon: FaCalendarAlt,
              label: "Date de sortie",
              value: new Date(movieDetails.release_date).toLocaleDateString(
                "fr-FR"
              ),
            },
            {
              icon: FaClock,
              label: "Durée",
              value: `${movieDetails.runtime} min`,
            },
            {
              icon: FaLanguage,
              label: "Langue originale",
              value: movieDetails.original_language.toUpperCase(),
            },
            {
              icon: FaMoneyBillWave,
              label: "Budget",
              value: formatCurrency(movieDetails.budget),
            },
            {
              icon: FaFilm,
              label: "Recettes",
              value: formatCurrency(movieDetails.revenue),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 p-4 rounded-lg"
            >
              <item.icon className="text-red-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
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
            cast.slice(0, 5).map((casting) => (
              <li
                key={casting.cast_id}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4"
              >
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  {casting.profile_path ? (
                    <Link href={`/person/${casting.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${casting.profile_path}`}
                        alt={casting.name}
                        width={185}
                        height={278}
                        className="w-full h-auto object-cover"
                      />
                    </Link>
                  ) : (
                    <div className="w-full h-0 pb-[150%] bg-gray-600 flex items-center justify-center">
                      <FaUserCircle className="text-gray-500 text-4xl" />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-white text-sm font-semibold truncate">
                      {casting.name}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {casting.character}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <Link
          href={`/movie/${movieId}/cast`}
          className="inline-block mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition-colors duration-300 text-sm font-semibold"
        >
          Distribution des rôles et équipe technique au complet
        </Link>
        {videos.length > 0 && <MovieVideos videos={videos} />}
      </section>
    </div>
  );
}
