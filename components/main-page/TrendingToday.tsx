import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const trendingItems = [
  { id: 1, title: "Stranger Things", poster_path: "/placeholder.jpg", vote_average: 8.7, media_type: "tv" },
  { id: 2, title: "The Mandalorian", poster_path: "/placeholder.jpg", vote_average: 8.8, media_type: "tv" },
  { id: 3, title: "Avengers: Endgame", poster_path: "/placeholder.jpg", vote_average: 8.4, media_type: "movie" },
  { id: 4, title: "Breaking Bad", poster_path: "/placeholder.jpg", vote_average: 9.5, media_type: "tv" },
  { id: 5, title: "Joker", poster_path: "/placeholder.jpg", vote_average: 8.4, media_type: "movie" },
];

export default function TrendingToday() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Tendances du jour</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {trendingItems.map((item) => (
          <Link href={`/${item.media_type}/${item.id}`} key={item.id} className="block">
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
              <Image
                src={`/placeholder.svg?height=750&width=500`}
                alt={item.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white truncate">{item.title}</h3>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-white">{item.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

