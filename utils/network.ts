import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
  cache: "force-cache" as RequestCache,
};

export async function obtainNetworkShow(
  id: string,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_networks=${id}`;
  const response = await fetch(url, options);
  await responseVerification(response, url);

  const data = await response.json();
  const networkInfo = await obtainNetworkInfo(id);
  const results = data.results;
  const totalPages = data.total_pages;

  return { networkInfo, results, totalPages };
}

async function obtainNetworkInfo(id: string) {
  const url = `https://api.themoviedb.org/3/network/${id}`;
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
