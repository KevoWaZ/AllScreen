import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const nowPlayingMovies = [
  { id: 1, title: "Dune", poster_path: "/placeholder.jpg", vote_average: 8.0 },
  { id: 2, title: "Black Widow", poster_path: "/placeholder.jpg", vote_average: 7.8 },
  { id: 3, title: "Shang-Chi", poster_path: "/placeholder.jpg", vote_average: 7.9 },
  { id: 4, title: "Free Guy", poster_path: "/placeholder.jpg", vote_average: 7.7 },
  { id: 5, title: "The Suicide Squad", poster_path: "/placeholder.jpg", vote_average: 7.6 },
];

export default function NowPlayingMovies() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Films actuellement en salles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {nowPlayingMovies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className="block">
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
              <Image
                src={`/placeholder.svg?height=750&width=500`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white truncate">{movie.title}</h3>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

