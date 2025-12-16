import { Movie, Person } from "@/types/types";
import Link from "@/components/utils/Link";
import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
  FaMoneyBillWave,
  FaFilm,
} from "react-icons/fa";
import MovieVideos, { Video } from "./MovieVideos";
import { IconType } from "react-icons";
import { PersonCard } from "../cards/PersonCard";
import PersonMovieCast from "../cards/PersonMovieCast";

export interface Casting {
  cast_id: number;
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface LeftMovieDetailsProps {
  movieDetails: Movie;
  cast: Person[];
  movieId: string;
  videos: Video[];
  formatCurrency: (value: number) => string;
}

interface InfoItem {
  icon: IconType;
  label: string;
  value: string;
}

export default function LeftMovieDetails({
  movieDetails,
  cast,
  movieId,
  videos,
  formatCurrency,
}: LeftMovieDetailsProps) {
  const infos: InfoItem[] = [
    ...(movieDetails.vote_count !== 0
      ? [
          {
            icon: FaStar,
            label: "Note",
            value: `${Number(movieDetails.vote_average.toFixed(2)) / 2} (${
              movieDetails.vote_count
            } votes)`,
          },
        ]
      : []),
    {
      icon: FaCalendarAlt,
      label: "Date de sortie",
      value: (() => {
        const frRelease = movieDetails?.release_dates?.results?.find(
          (result) => result.iso_3166_1 === "FR"
        );
        if (!frRelease) {
          return movieDetails.release_date
            ? new Date(movieDetails.release_date).toLocaleDateString("fr-FR")
            : "Date de sortie non disponible";
        }

        const releaseDates = frRelease.release_dates || [];
        const type3Dates = releaseDates
          .filter((date) => date.type === 3)
          .sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );

        const preferredDate =
          type3Dates[0] ||
          releaseDates.find((date) => date.type === 4) ||
          releaseDates[0];

        return preferredDate?.release_date
          ? new Date(preferredDate.release_date).toLocaleDateString("fr-FR")
          : "Date de sortie non disponible";
      })(),
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
    ...(movieDetails.status === "Released"
      ? [
          {
            icon: FaFilm,
            label: "Recettes",
            value: formatCurrency(movieDetails.revenue),
          },
        ]
      : []),
  ];

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
          {infos.map((item, index) => {
            const Icon: IconType = item.icon;
            return (
              <div
                key={index}
                className="flex items-center bg-gray-800 p-4 rounded-lg"
              >
                <Icon
                  className="text-red-500 text-2xl mr-4"
                  aria-label={item.label}
                />
                <div>
                  <p className="text-sm text-gray-300">{item.label}</p>
                  <p className="text-lg font-semibold text-[#f1f1f1]">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
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
                    <PersonMovieCast casting={casting} />
                  </PersonCard>
                </li>
              ))}
        </ul>
        <Link
          href={`/movie/${movieId}/cast`}
          scroll
          className="inline-block mt-4 bg-red-600 text-white p-3 rounded-lg hover:bg-red-500 transition-colors duration-300 text-sm font-semibold"
        >
          Distribution des rôles et équipe technique au complet
        </Link>
        {videos.length > 0 && <MovieVideos videos={videos} />}
      </section>
    </div>
  );
}
