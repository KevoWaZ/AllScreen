import { SearchResultsType } from "@/types/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function searchAll(query: string): Promise<SearchResultsType> {
  const endpoints = [
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/collection?query=${encodeURIComponent(
      query
    )}&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/company?query=${encodeURIComponent(
      query
    )}&page=1`,
    `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(
      query
    )}&page=1`,
  ];
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  const responses = await Promise.all(
    endpoints.map((endpoint) => fetch(endpoint, options))
  );

  const [
    moviesData,
    tvsData,
    personsData,
    collectionData,
    companyData,
    keywordData,
  ] = await Promise.all(
    responses.map((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
  );

  const movies = moviesData.results.sort(
    (a: any, b: any) => b.popularity - a.popularity
  );

  const tvShows = tvsData.results.sort(
    (a: any, b: any) => b.popularity - a.popularity
  );

  const people = personsData.results.sort(
    (a: any, b: any) => b.popularity - a.popularity
  );

  return {
    movies,
    tvShows,
    people,
    collections: collectionData.results,
    companies: companyData.results,
    keywords: keywordData.results,
  };
}
