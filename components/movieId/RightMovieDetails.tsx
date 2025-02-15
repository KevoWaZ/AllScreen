import { Keyword, Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaGlobe, FaLanguage } from "react-icons/fa";

interface RightMovieDetailsProps {
  movieDetails: Movie;
  keywords: Keyword[];
  externals: object;
}

export default function RightMovieDetails({
  movieDetails,
  keywords,
  externals,
}: RightMovieDetailsProps) {

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          width={500}
          height={750}
          quality={100}
          className="rounded-lg shadow-lg w-full"
        />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">Genres</h2>
          <div className="flex flex-wrap gap-3">
            {movieDetails.genres.map((genre) => (
              <Link
                href={`/genre/${genre.id}/movie`}
                key={genre.id}
                className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">Keywords</h2>
          <div className="flex flex-wrap gap-3">
            {keywords &&
              keywords.map((keyword) => (
                <Link
                  key={keyword.id}
                  href={`/keyword/${keyword.id}/movie`}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  {keyword.name}
                </Link>
              ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">
            Pays de production
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movieDetails.production_countries.map((country) => (
              <li key={country.iso_3166_1} className="flex items-center">
                <FaGlobe className="text-red-500 mr-3" aria-label="Language icon"/>
                <Link href={`/country/${country.iso_3166_1}/movie`}>
                  {country.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">
            Langues parlées
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movieDetails.spoken_languages.map((lang) => (
              <li key={lang.iso_639_1} className="flex items-center">
                <FaLanguage className="text-red-500 mr-3" aria-label="Language icon"/>
                <Link href={`/language/${lang.iso_639_1}/movie`}>
                  {lang.name} ({lang.english_name})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-500">
            Sociétés de production
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movieDetails.production_companies.map((company) => (
              <li
                key={company.id}
                className="flex flex-col items-center justify-center text-center bg-gray-800 rounded-lg"
              >
                <Link
                  href={`/company/${company.id}/movie`}
                  className="hover:text-red-500 p-3 mb-2"
                >
                  {company.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      width={64}
                      height={25}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center text-s rounded"
                      aria-label="No logo available"
                    >
                      {company.name}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {externals && (
          <div className="flex items-center justify-center text-center">
            {Object.values(externals).map((external) => (
              <Link key={external.label} href={external.url} target="_blank">
                <external.icon className="h-8 w-8 gap-4" />
              </Link>
            ))}
          </div>
        )}

        {movieDetails.homepage && (
          <a
            href={movieDetails.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-400 inline-block w-full text-center font-semibold text-lg transition-colors"
          >
            Visiter le site officiel
          </a>
        )}
      </div>
    </div>
  );
}
