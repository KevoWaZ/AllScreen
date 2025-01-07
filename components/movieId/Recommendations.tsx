import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Recommendations({ recommendations }: object) {
  return (
    <section className="mb-12 rounded-lg overflow-hidden shadow-lg mx-auto max-w-7xl">
    <h2 className="text-2xl font-semibold text-[#F5A623] mb-4">
      Recommandations
    </h2>
    <div className="relative">
      <div className="overflow-x-auto scrollbar-hide">
        <ul className="flex space-x-4 pb-4">
          {recommendations.map((recommendation) => (
            <li key={recommendation.id} className="flex-none w-64">
              <Link
                href={`/${recommendation.media_type}/${recommendation.id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <div className="relative h-36">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    alt={recommendation.title}
                    src={`https://media.themoviedb.org/t/p/w500${recommendation.backdrop_path}`}
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
  )
}
