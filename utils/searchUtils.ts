import { obtainTMDBAPIKey } from "@/lib/utils";
import { SearchResultsType } from "@/types/types";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export async function searchAll(query: string): Promise<SearchResultsType> {
  const endpoints = [
    `https://api.themoviedb.org/3/search/movie?region=FR&query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/tv?region=FR&query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/collection?query=${encodeURIComponent(
      query
    )}&include_adult=true&language=fr-FR&page=1`,
    `https://api.themoviedb.org/3/search/company?query=${encodeURIComponent(
      query
    )}&page=1`,
    `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(
      query
    )}&page=1`,
  ];
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

export async function searchMovies(query: string, page: string) {
  const url = `https://api.themoviedb.org/3/discover/movie?language=fr-FR&region=FR&page=${page}&${query}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
  };
}

export async function searchTvs(query: string, page: string) {
  const url = `https://api.themoviedb.org/3/discover/tv?language=fr-FR&region=FR&page=${page}&${query}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
  };
}

export async function searchMoviesSearch(query: string, page: string) {
  const url = `https://api.themoviedb.org/3/search/movie?language=en-US&page=${page}&${query}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
  };
}
