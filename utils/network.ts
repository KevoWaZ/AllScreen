const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainNetworkShow(
    id: string,
    type: string,
    page: number = 1
  ) {
    const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_networks=${id}`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
  
    const data = await response.json();
    const name = data.network?.name || "";
    const results = data.results;
    const totalPages = data.total_pages;
  
    return { name, results, totalPages };
  }

