import Image from 'next/image';
import Link from 'next/link';

const popularPeople = [
  { id: 1, name: "Tom Hanks", profile_path: "/placeholder.jpg" },
  { id: 2, name: "Meryl Streep", profile_path: "/placeholder.jpg" },
  { id: 3, name: "Leonardo DiCaprio", profile_path: "/placeholder.jpg" },
  { id: 4, name: "Scarlett Johansson", profile_path: "/placeholder.jpg" },
  { id: 5, name: "Brad Pitt", profile_path: "/placeholder.jpg" },
];

export default function PopularPeople() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Personnes populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {popularPeople.map((person) => (
          <Link href={`/person/${person.id}`} key={person.id} className="block">
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
              <Image
                src={`/placeholder.svg?height=750&width=500`}
                alt={person.name}
                width={500}
                height={750}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white truncate">{person.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

