const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function getCollection(id: string) {
  const url = `https://api.themoviedb.org/3/collection/${id}?language=fr-FR`;
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
  return response.json();
}
