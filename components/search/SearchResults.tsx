import { PersonCard } from "./PersonCard";
import { CollectionCard } from "./CollectionCard";
import { KeywordCard } from "./KeywordCard";
import { SearchResultsType } from "@/types/types";
import { CompanyCard } from "./CompanyCard";
import MovieCard from "./MovieCard";
import TVShowCard from "./TVShowCard";

export function SearchResults({ results }: { results: SearchResultsType }) {
  return (
    <>
      {results.movies.length > 0 && (
        <section className="my-8">
          <h2 className="mb-4 text-2xl font-bold text-red-500">Films</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {results.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showDescription />
            ))}
          </div>
        </section>
      )}

      {results.tvShows.length > 0 && (
        <section className="my-8">
          <h2 className="mb-4 text-2xl font-bold text-red-500">Séries</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {results.tvShows.map((tvShow) => (
              <TVShowCard key={tvShow.id} tvShow={tvShow} showDescription />
            ))}
          </div>
        </section>
      )}

      {results.people.length > 0 && (
        <section className="my-8">
          <h2 className="mb-4 text-2xl font-bold text-red-500">Personnes</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {results.people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>
      )}

      {results.collections.length > 0 && (
        <section className="my-8">
          <h2 className="mb-4 text-2xl font-bold text-red-500">
            Collections
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {results.collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      )}

      {results.companies.length > 0 && (
        <section className="my-8">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Compagnies</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {results.companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>
      )}

      {results.keywords.length > 0 && (
        <section className="my-8">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Mots-clés</h2>
          <div className="flex flex-wrap gap-4">
            {results.keywords.map((keyword) => (
              <KeywordCard key={keyword.id} keyword={keyword} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
