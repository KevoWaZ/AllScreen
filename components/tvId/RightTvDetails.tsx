import { Keyword, Provider, TVShow } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaGlobe, FaLanguage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

interface RightTvDetailsProps {
  TvDetails: TVShow;
  keywords: Keyword[];
  externals: {
    label: string;
    url: string;
    icon: IconType;
  }[];
  providers: Provider;
}

export default function RightTvDetails({
  TvDetails,
  keywords,
  externals,
  providers,
}: RightTvDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-8">
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${TvDetails.poster_path}`}
            alt={TvDetails.original_name}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
          />
          {providers && (
            <button
              className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-3 px-4 
          hover:bg-black/90 transition-colors duration-200 rounded-b-lg flex items-center justify-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="w-5 h-5" />
              Où regarder
            </button>
          )}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">Genres</h2>
          <div className="flex flex-wrap gap-3">
            {TvDetails.genres.map((genre) => (
              <Link
                href={`/genre/${genre.id}/tv`}
                key={genre.id}
                className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">
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
          <h2 className="text-2xl font-semibold mb-4 text-red-500">
            Diffuseur télévisé
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TvDetails.networks.map((network) => (
              <li
                key={network.id}
                className="flex flex-col items-center justify-center text-center bg-gray-800 p-3 rounded-lg"
              >
                <Link
                  href={`/network/${network.id}`}
                  className="hover:text-red-500 mb-2"
                >
                  {network.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                      alt={network.name}
                      width={50}
                      height={25}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center text-s rounded"
                      aria-label="No logo available"
                    >
                      {network.name}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-red-500">
            Pays de production
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TvDetails.production_countries.map((country) => (
              <li key={country.iso_3166_1} className="flex items-center">
                <FaGlobe className="text-red-500 mr-3" />
                <Link href={`/country/${country.iso_3166_1}/tv`}>
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
            {TvDetails.spoken_languages.map((lang) => (
              <li key={lang.iso_639_1} className="flex items-center">
                <FaLanguage className="text-red-500 mr-3" />
                <Link href={`/language/${lang.iso_639_1}/tv`}>
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
            {TvDetails.production_companies.map((company) => (
              <li
                key={company.id}
                className="flex flex-col items-center justify-center text-center bg-gray-800 rounded-lg"
              >
                <Link
                  href={`/company/${company.id}/tv`}
                  className="hover:text-red-500 mb-2 p-3"
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

        {Array.isArray(externals) && externals.length > 0 && (
          <div className="flex items-center justify-center text-center">
            {externals.map((external) => (
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
            className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-400 inline-block w-full text-center font-semibold text-lg transition-colors"
          >
            Visiter le site officiel
          </a>
        )}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay/Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
              style={{ backdropFilter: "blur(4px)" }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            >
              <div className="bg-background rounded-lg shadow-lg w-full max-w-lg pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-semibold">
                    Où regarder {TvDetails.original_name}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-full hover:bg-accent transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-500 text-sm px-4 pt-2">
                  Les données proviennent de JustWatch *
                </p>

                {/* Content */}
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  {/* Streaming Section */}
                  {providers.flatrate && providers.flatrate.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-4"
                    >
                      <h3 className="font-medium text-lg">
                        Plateformes de streaming disponibles :
                      </h3>

                      <div className="space-y-3">
                        {providers.flatrate.map((provider, index) => (
                          <motion.div
                            key={provider.provider_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-accent/80 
            transition-colors cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              <Image
                                src={`https://media.themoviedb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                width={32}
                                height={32}
                                className="rounded"
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {provider.provider_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Disponible en streaming
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Buy Section */}
                  {providers.buy && providers.buy.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="font-medium text-lg">
                        Disponible à l&apos;achat :
                      </h3>

                      <div className="space-y-3">
                        {providers.buy.map((provider, index) => (
                          <motion.div
                            key={provider.provider_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-accent/80 
            transition-colors cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              <Image
                                src={`https://media.themoviedb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                width={32}
                                height={32}
                                className="rounded"
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {provider.provider_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Disponible à l&apos;achat
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* No Providers Message */}
                  {(!providers.flatrate || providers.flatrate.length === 0) &&
                    (!providers.buy || providers.buy.length === 0) && (
                      <div className="text-center text-muted-foreground py-8">
                        Aucune plateforme de streaming ou d&apos;achat
                        n&apos;est actuellement disponible.
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
