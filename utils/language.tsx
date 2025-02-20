const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainLanguageResults(
  language: string,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_original_language=${language}`;
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
  const languageName = await obtainLanguageName(language);
  return { results, totalPages, languageName };
}

async function obtainLanguageName(iso: string) {
  interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
  }
  const url = "https://api.themoviedb.org/3/configuration/languages";
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  const data: Language[] = await response.json();
  const languageName =
    data.find((language) => language.iso_639_1 === iso)?.name ||
    data.find((language) => language.iso_639_1 === iso)?.english_name;
  console.log(languageName);
  return languageName;
}
