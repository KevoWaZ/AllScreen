import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar } from 'react-icons/fa';

const upcomingMovies = [
  { id: 1, title: "The Batman", poster_path: "/placeholder.jpg", release_date: "2022-03-04" },
  { id: 2, title: "Doctor Strange in the Multiverse of Madness", poster_path: "/placeholder.jpg", release_date: "2022-05-06" },
  { id: 3, title: "Thor: Love and Thunder", poster_path: "/placeholder.jpg", release_date: "2022-07-08" },
  { id: 4, title: "Black Panther: Wakanda Forever", poster_path: "/placeholder.jpg", release_date: "2022-11-11" },
  { id: 5, title: "Avatar 2", poster_path: "/placeholder.jpg", release_date: "2022-12-16" },
];

export default function UpcomingMovies() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Films à venir</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {upcomingMovies.map((movie) => (
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
                  <FaCalendar className="text-[#F5A623] mr-1" />
                  <span className="text-white">{movie.release_date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

