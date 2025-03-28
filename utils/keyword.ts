import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
  cache: "force-cache" as RequestCache,
};

export async function obtainKeywordName(
  id: string,
  type: string,
  page: number
) {
  const url = `https://api.themoviedb.org/3/keyword/${id}`;
  const response = await fetch(url, options);
  await responseVerification(response, url);
  const data = await response.json();
  const name = data.name;
  const { results, totalPages } = await obtainResults(id, type, page);

  return { name, results, totalPages };
}

async function obtainResults(id: string, type: string, page: number) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_keywords=${id}`;

  const response = await fetch(url, options);
  await responseVerification(response, url);

  const data = await response.json();
  const results = data.results;
  const totalPages = data.total_pages;

  return { results, totalPages };
}
