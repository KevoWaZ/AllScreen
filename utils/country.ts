import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export async function obtainCountryResults(
  country: string,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_origin_country=${country}`;
  const response = await fetch(url, options);
  await responseVerification(response, url);

  const data = await response.json();
  const results = data.results;
  const totalPages = data.total_pages;
  const countryName = await obtainCountryName(country);

  return { results, totalPages, countryName };
}

async function obtainCountryName(countryIso: string) {
  interface Country {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
  }

  const url =
    "https://api.themoviedb.org/3/configuration/countries?language=fr-FR";

  const response = await fetch(url, options);
  await responseVerification(response, url);

  const data: Country[] = await response.json();
  const countryName =
    data.find((country) => country.iso_3166_1 === countryIso)?.native_name ||
    data.find((country) => country.iso_3166_1 === countryIso)?.english_name;

  return countryName;
}
