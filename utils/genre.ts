const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainGenreResults(
  id: number,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_genres=${id}`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch collection data");
  }
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
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  const genres: Genre[] = data.genres;
  const genreName = genres.find((genre) => genre.id === id)?.name;
  return genreName;
}
