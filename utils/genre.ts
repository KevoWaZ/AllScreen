import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
  cache: "force-cache" as RequestCache,
};

export async function obtainGenreResults(
  id: number,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_genres=${id}`;
  const response = await fetch(url, options);
  await responseVerification(response, url);

  const data = await response.json();
  const results = data.results;
  const totalPages = data.total_pages;
  const genreName = await obtainGenreName(id, type);

  return { results, totalPages, genreName };
}

async function obtainGenreName(id: number, type: string) {
  interface Genre {
    id: number;
    name: string;
  }

  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=fr`;
  const response = await fetch(url, options);
  await responseVerification(response, url);
  const data = await response.json();
  const genres: Genre[] = data.genres;
  const genreName = genres.find((genre) => genre.id === id)?.name;

  return genreName;
}
