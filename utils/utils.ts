import { responseVerification } from "@/lib/utils";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export function formatDate(dateString: string): string {
  if (!dateString) return "Date inconnue";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

export async function obtainCountriesConfigurations() {
  const url =
    "https://api.themoviedb.org/3/configuration/countries?language=fr-FR";
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainLanguagesConfigurations() {
  const url = "https://api.themoviedb.org/3/configuration/languages";
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainGenres(type: string) {
  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=fr`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data.genres;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
