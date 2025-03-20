import { responseVerification } from "@/lib/utils";
import { sort } from "@/types/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
  cache: "force-cache" as RequestCache,
};

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

export const movies_sort_by: sort[] = [
  {
    name: "Popularité +/-",
    value: "popularity.desc",
  },
  {
    name: "Popularité -/+",
    value: "popularity.asc",
  },
  {
    name: "Revenue +/-",
    value: "revenue.desc",
  },
  {
    name: "Revenue -/+",
    value: "revenue.asc",
  },
  {
    name: "Date de sortie +/-",
    value: "primary_release_date.desc",
  },
  {
    name: "Date de sortie -/+",
    value: "primary_release_date.asc",
  },
  {
    name: "Evaluation +/-",
    value: "vote_average.desc",
  },
  {
    name: "Evaluation -/+",
    value: "vote_average.asc",
  },
];

export const tv_sort_by: sort[] = [
  {
    name: "Popularité +/-",
    value: "popularity.desc",
  },
  {
    name: "Popularité -/+",
    value: "popularity.asc",
  },
  {
    name: "Date de premiere diffusion +/-",
    value: "first_air_date.desc",
  },
  {
    name: "Date de premiere diffusion -/+",
    value: "first_air_date.asc",
  },
  {
    name: "Evaluation +/-",
    value: "vote_average.desc",
  },
  {
    name: "Evaluation -/+",
    value: "vote_average.asc",
  },
];
