import { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface RecommendationsProps {
  recommendations: Movie[];
}

export default function Recommendations({
  recommendations,
}: RecommendationsProps) {
  return (
    <section className="p-8 max-w-[100vw] mx-auto">
      <h2 className="text-2xl font-semibold text-red-500 mb-4">
        Recommandations
      </h2>
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <ul className="flex space-x-4 pb-4">
            {recommendations.map((recommendation) => (
              <li key={recommendation.id} className="flex-none w-64">
                <Link
                  href={`/movie/${recommendation.id}`}
                  className="block bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div className="relative h-36">
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      alt={recommendation.title}
                      src={`https://image.tmdb.org/t/p/w500${recommendation.backdrop_path}`}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-white text-sm font-semibold truncate">
                      {recommendation.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
