import Link from "@/components/utils/Link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="text-red-600 mb-6">
        <FaSearch size={64} />
      </div>
      <h2 className="text-4xl font-bold mb-4 text-center font-bebas-neue">
        Film Introuvable
      </h2>
      <p className="mb-8 text-gray-400 text-center max-w-md">
        Désolé, nous n&apos;avons pas pu trouver le film que vous recherchez
        dans notre base de données. Il est possible que le film n&apos;existe
        pas ou que l&apos;URL soit incorrecte.
      </p>
      <p className="mb-8 text-gray-400 text-center max-w-md">
        Vous pouvez essayer de vérifier l&apos;orthographe du titre du film ou
        retourner à la page d&apos;accueil pour explorer d&apos;autres films.
      </p>
      <Link
        href="/"
        className="bg-red-600 text-black px-6 py-3 rounded-full hover:bg-red-500 transition duration-300 flex items-center"
      >
        <FaHome className="mr-2" size={18} />
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
