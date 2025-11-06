import { Keyword, Provider, TVShow, userMediaActivity } from "@/types/types";
import Image from "next/image";
import Link from "@/components/utils/Link";
import { IconType } from "react-icons";
import { FaGlobe, FaLanguage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import MediaInteractionManager from "../media-interaction-manager";
import { FaEye } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Dialog } from "@base-ui-components/react/dialog";

interface RightTvDetailsProps {
  TvDetails: TVShow;
  keywords: Keyword[];
  externals: {
    label: string;
    url: string;
    icon: IconType;
  }[];
  providers: Provider;
  userMediaActivity?: userMediaActivity;
}

export default function RightTvDetails({
  TvDetails,
  keywords,
  externals,
  providers,
  userMediaActivity,
}: RightTvDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const session = authClient.useSession();
  const userId = session.data?.user.id;

  const displayedKeywords = showAll ? keywords : keywords.slice(0, 8);
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
            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
              <Dialog.Trigger>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-3 px-4 
          hover:bg-black/90 transition-colors duration-200 rounded-b-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaEye className="w-5 h-5" />
                  Où regarder
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
                <Dialog.Popup
                  aria-describedby="Dialog Content"
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b  border-[#2C2C2C]">
                    <div className="flex items-center gap-3">
                      <div>
                        <Dialog.Title className="text-lg font-bold  text-white">
                          Ou regarder {TvDetails.name}
                        </Dialog.Title>
                      </div>
                    </div>
                    <Dialog.Close className="w-8 h-8 rounded-full  hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                      <IoClose className=" text-[#BDBDBD]" size={18} />
                    </Dialog.Close>
                  </div>
                  {/* Content */}
                  <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                    {providers.flatrate && providers.flatrate.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <h3 className="font-medium text-lg text-white">
                          Disponible en streaming :
                        </h3>

                        <div className="space-y-3">
                          {providers.flatrate.map((provider, index) => (
                            <motion.div
                              key={provider.provider_id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-[#2C2C2C] 
                 transition-colors cursor-pointer"
                            >
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  width={32}
                                  height={32}
                                  className="rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-white">
                                  {provider.provider_name}
                                </p>
                                <p className="text-sm text-gray-400 text-muted-foreground">
                                  Disponible en streaming
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {providers.buy && providers.buy.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <h3 className="font-medium text-lg text-white">
                          Disponible a l&apos;achat :
                        </h3>

                        <div className="space-y-3">
                          {providers.buy.map((provider, index) => (
                            <motion.div
                              key={provider.provider_id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-[#2C2C2C] 
                 transition-colors cursor-pointer"
                            >
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  width={32}
                                  height={32}
                                  className="rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-white">
                                  {provider.provider_name}
                                </p>
                                <p className="text-sm text-gray-400 text-muted-foreground">
                                  Disponible a l&apos;achat
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {providers.rent && providers.rent.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <h3 className="font-medium text-lg text-white">
                          Disponible a la location :
                        </h3>

                        <div className="space-y-3">
                          {providers.rent.map((provider, index) => (
                            <motion.div
                              key={provider.provider_id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-[#2C2C2C] 
                 transition-colors cursor-pointer"
                            >
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  width={32}
                                  height={32}
                                  className="rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-white">
                                  {provider.provider_name}
                                </p>
                                <p className="text-sm text-gray-400 text-muted-foreground">
                                  Disponible a la location
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {providers.free && providers.free.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <h3 className="font-medium text-lg text-white">
                          Disponible gratuitement :
                        </h3>

                        <div className="space-y-3">
                          {providers.free.map((provider, index) => (
                            <motion.div
                              key={provider.provider_id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-[#2C2C2C] 
                 transition-colors cursor-pointer"
                            >
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  width={32}
                                  height={32}
                                  className="rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-white">
                                  {provider.provider_name}
                                </p>
                                <p className="text-sm text-gray-400 text-muted-foreground">
                                  Disponible gratuitement
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {providers.ads && providers.ads.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <h3 className="font-medium text-lg text-white">
                          Disponible a la pub :
                        </h3>

                        <div className="space-y-3">
                          {providers.ads.map((provider, index) => (
                            <motion.div
                              key={provider.provider_id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-[#2C2C2C] 
                 transition-colors cursor-pointer"
                            >
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  width={32}
                                  height={32}
                                  className="rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-white">
                                  {provider.provider_name}
                                </p>
                                <p className="text-sm text-gray-400 text-muted-foreground">
                                  Disponible a la pub
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {((!providers.flatrate ||
                      providers.flatrate.length === 0) &&
                      (!providers.buy || providers.buy.length === 0) &&
                      !providers.rent) ||
                      (providers.rent?.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          Aucune plateforme de streaming d&apos;achat ou de
                          location n&apos;est actuellement disponible.
                        </div>
                      ))}
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t  border-[#2C2C2C]  bg-[#2C2C2C]/30">
                    <p className="text-white text-sm px-4 pt-2">
                      Les données proviennent de JustWatch *
                    </p>
                  </div>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </div>
        {userId ? (
          <>
            <MediaInteractionManager
              id={TvDetails.id}
              type="TVSHOW"
              title="Notez cette série!"
              userId={userId}
              userMediaActivity={userMediaActivity}
            />
          </>
        ) : null}

        {TvDetails.genres.length > 0 && (
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
        )}

        {keywords.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-red-500">
              Mots-clés
            </h2>
            <div className="flex flex-wrap gap-3">
              {displayedKeywords.map((keyword) => (
                <Link
                  key={keyword.id}
                  href={`/keyword/${keyword.id}/tv`}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  {keyword.name}
                </Link>
              ))}
            </div>
            {keywords.length > 8 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                {showAll ? "Afficher moins" : "Afficher tout"}
              </button>
            )}
          </section>
        )}

        {TvDetails.networks.length > 0 && (
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
        )}

        {TvDetails.production_countries.length && (
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
        )}

        {TvDetails.spoken_languages.length && (
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
        )}

        {TvDetails.production_companies.length && (
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
        )}

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
    </div>
  );
}
