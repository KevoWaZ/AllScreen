import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const popularTVShows = [
  { id: 1, name: "Breaking Bad", poster_path: "/placeholder.jpg", vote_average: 9.5 },
  { id: 2, name: "Game of Thrones", poster_path: "/placeholder.jpg", vote_average: 9.3 },
  { id: 3, name: "Stranger Things", poster_path: "/placeholder.jpg", vote_average: 8.7 },
  { id: 4, name: "The Mandalorian", poster_path: "/placeholder.jpg", vote_average: 8.8 },
  { id: 5, name: "The Witcher", poster_path: "/placeholder.jpg", vote_average: 8.2 },
];

export default function PopularTVShows() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Séries TV populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {popularTVShows.map((show) => (
          <Link href={`/tv/${show.id}`} key={show.id} className="block">
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
              <Image
                src={`/placeholder.svg?height=750&width=500`}
                alt={show.name}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white truncate">{show.name}</h3>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-white">{show.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

