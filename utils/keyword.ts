const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainKeywordName(id: string, type: string) {
  const url = `https://api.themoviedb.org/3/keyword/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch collection data");
  }
  const data = await response.json()
  const name = data.name
  const results = await obtainResults(id, type)
  return {name, results};
}



async function obtainResults(id: string, type: string) {
    const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_keywords=${id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch collection data");
    }
    const data = await response.json()
    return data.results;
  }