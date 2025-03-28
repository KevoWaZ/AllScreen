import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
  cache: "force-cache" as RequestCache,
};

export async function obtainLanguageResults(
  language: string,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_original_language=${language}`;
  const response = await fetch(url, options);
  await responseVerification(response, url);

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

  const response = await fetch(url, options);
  await responseVerification(response, url);

  const data: Language[] = await response.json();
  const languageName =
    data.find((language) => language.iso_639_1 === iso)?.name ||
    data.find((language) => language.iso_639_1 === iso)?.english_name;
  console.log(languageName);

  return languageName;
}
