import { Keyword, TVShow } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaGlobe, FaLanguage } from "react-icons/fa";

interface RightTvDetailsProps {
  TvDetails: TVShow;
  keywords: Keyword[];
  externals: object;
}

export default function RightTvDetails({
  TvDetails,
  keywords,
  externals,
}: RightTvDetailsProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${TvDetails.poster_path}`}
          alt={TvDetails.original_name}
          width={500}
          height={750}
          className="rounded-lg shadow-lg w-full"
        />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">Genres</h2>
          <div className="flex flex-wrap gap-3">
            {TvDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">
          Mots-clés
          </h2>
          <div className="flex flex-wrap gap-3">
            {keywords &&
              keywords.map((keyword) => (
                <Link
                  key={keyword.id}
                  href={`/keyword/${keyword.id}/tv`}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  {keyword.name}
                </Link>
              ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">
            Diffuseur télévisé
          </h2>
          <ul className="space-y-4">
            {TvDetails.networks.map((network) => (
              <li
                key={network.id}
                className="flex items-center bg-gray-800 p-3 rounded-lg"
              >
                <Link href={`/network/${network.id}`}>
                  {network.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                      alt={network.name}
                      width={50}
                      height={25}
                      className="mr-3"
                    />
                  ) : (
                    <div className="w-[50px] h-[25px] bg-gray-700 mr-3 flex items-center justify-center text-xs rounded">
                      No logo
                    </div>
                  )}
                </Link>
                <span className="font-medium">{network.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">
            Pays de production
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TvDetails.production_countries.map((country) => (
              <li key={country.iso_3166_1} className="flex items-center">
                <FaGlobe className="text-[#F5A623] mr-3" />
                <span>{country.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-[#F5A623]">
            Langues parlées
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TvDetails.spoken_languages.map((lang) => (
              <li key={lang.iso_639_1} className="flex items-center">
                <FaLanguage className="text-[#F5A623] mr-3" />
                <span>
                  {lang.name} ({lang.english_name})
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#F5A623]">
            Sociétés de production
          </h2>
          <ul className="space-y-4">
            {TvDetails.production_companies.map((company) => (
              <li
                key={company.id}
                className="flex items-center bg-gray-800 p-3 rounded-lg"
              >
                <Link href={`/company/${company.id}`}>
                  {company.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      width={50}
                      height={25}
                      className="mr-3"
                    />
                  ) : (
                    <div className="w-[50px] h-[25px] bg-gray-700 mr-3 flex items-center justify-center text-xs rounded">
                      No logo
                    </div>
                  )}
                </Link>
                <span className="font-medium">{company.name}</span>
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

        {TvDetails.homepage && (
          <a
            href={TvDetails.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-400 inline-block w-full text-center font-semibold text-lg transition-colors"
          >
            Visiter le site officiel
          </a>
        )}
      </div>
    </div>
  );
}
