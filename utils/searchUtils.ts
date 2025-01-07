import { SearchResultsType } from "@/types/types";


const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function searchAll(query: string): Promise<SearchResultsType> {
  const endpoints = [
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/collection?query=${encodeURIComponent(query)}&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/company?query=${encodeURIComponent(query)}&page=1`,
    `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(query)}&page=1`,
  ];

  const responses = await Promise.all(
    endpoints.map((endpoint) =>
      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      })
    )
  );

  const [multiData, collectionData, companyData, keywordData] = await Promise.all(
    responses.map((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
  );

  const movies = multiData.results
    .filter((item: any) => item.media_type === "movie")
    .sort((a: any, b: any) => b.popularity - a.popularity);

  const tvShows = multiData.results
    .filter((item: any) => item.media_type === "tv")
    .sort((a: any, b: any) => b.popularity - a.popularity);

  const people = multiData.results
    .filter((item: any) => item.media_type === "person")
    .sort((a: any, b: any) => b.popularity - a.popularity);

  return {
    movies,
    tvShows,
    people,
    collections: collectionData.results,
    companies: companyData.results,
    keywords: keywordData.results,
  };
}

