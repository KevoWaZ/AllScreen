import Image from "next/image";
import Link from "next/link";
import { FaHome, FaEnvelope, FaServer, FaFilm, FaImage } from "react-icons/fa";

export default function Pages() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-[#FF5252]">
        Mentions Légales
      </h1>

      <div className="space-y-8">
        {/* Section Identité */}
        <section className="bg-[#2C2C2C] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaHome className="text-[#FF5252] mr-3 text-xl" />
            <h2 className="text-2xl font-semibold text-[#BDBDBD]">Identité</h2>
          </div>
          <div className="pl-8 space-y-2 text-[#BDBDBD]">
            <p>
              <span className="font-semibold">Nom et prénom :</span> Gauthier
              Kevin
            </p>
            <p>
              <span className="font-semibold">Statut :</span> Entrepreneur
              individuel
            </p>
            <p>
              <span className="font-semibold">SIRET :</span> 987 409 943 00014
            </p>
          </div>
        </section>

        {/* Section Coordonnées */}
        <section className="bg-[#2C2C2C] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-[#FF5252] mr-3 text-xl" />
            <h2 className="text-2xl font-semibold text-[#BDBDBD]">
              Coordonnées
            </h2>
          </div>
          <div className="pl-8 space-y-2 text-[#BDBDBD]">
            <p>
              <span className="font-semibold">Adresse :</span> Non dit
            </p>
            <p>
              <span className="font-semibold">Email :</span>{" "}
              <a
                href="mailto:[votre-email]"
                className="text-[#FF5252] hover:underline"
              >
                kevin.gauthier146@protonmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Téléphone :</span> 07 81 63 45 87
            </p>
          </div>
        </section>

        {/* Section Hébergement */}
        <section className="bg-[#2C2C2C] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaServer className="text-[#FF5252] mr-3 text-xl" />
            <h2 className="text-2xl font-semibold text-[#BDBDBD]">
              Hébergement du site
            </h2>
          </div>
          <div className="pl-8 space-y-2 text-[#BDBDBD]">
            <p>
              <span className="font-semibold">Hébergeur :</span> Vercel Inc.
            </p>
            <p>
              <span className="font-semibold">Raison sociale :</span> Vercel
              Inc.
            </p>
            <p>
              <span className="font-semibold">Adresse :</span> 340 S Lemon Ave
              #4133, Walnut, CA 91789, USA
            </p>
            <p>
              <span className="font-semibold">Téléphone :</span> Téléphone non
              disponible
            </p>
          </div>
        </section>

        {/* Section Propriété intellectuelle */}
        <section className="bg-[#2C2C2C] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaImage className="text-[#FF5252] mr-3 text-xl" />
            <h2 className="text-2xl font-semibold text-[#BDBDBD]">
              Propriété intellectuelle
            </h2>
          </div>
          <div className="pl-8 space-y-4 text-[#BDBDBD]">
            <p>
              L&apos;ensemble des éléments constituant ce site (textes,
              graphismes, logiciels, photographies, images, vidéos, sons, plans,
              logos, marques, etc.) est la propriété exclusive de son éditeur ou
              de ses partenaires. Ces éléments sont protégés par les lois
              relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction ou représentation, totale ou partielle, de ce
              site ou de l&apos;un de ses éléments, sans l&apos;autorisation
              expresse de l&apos;éditeur, est interdite et constituerait une
              contrefaçon sanctionnée par les articles L.335-2 et suivants du
              Code de la propriété intellectuelle.
            </p>

            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaFilm className="text-[#FF5252] mr-2" />
                Sources de données
              </h3>
              <p className="mb-2">
                Les informations sur les films et séries sont fournies par :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold">
                    TMDB (The Movie Database) :
                  </span>{" "}
                  Ce produit utilise l&apos;API TMDB mais n&apos;est pas
                  approuvé ou certifié par TMDB.
                  <div className="mt-1">
                    <Image
                      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                      alt="Logo TMDB"
                      width={100}
                      height={20}
                      className="h-6 inline-block"
                    />
                  </div>
                </li>
                <li>
                  <span className="font-semibold">JustWatch :</span> Les
                  informations sur la disponibilité des contenus en streaming
                  sont fournies par JustWatch.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link
          prefetch={false}
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#b71c1c] text-white rounded-md transition-colors"
        >
          <FaHome className="mr-2" /> Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
