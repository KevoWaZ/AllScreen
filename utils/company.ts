const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainCompanyName(id: string, type: string) {
  const url = `https://api.themoviedb.org/3/company/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch collection data");
  }
  const data = await response.json();
  const name = data.name;
  const results = await obtainResults(id, type);
  return { name, results };
}

async function obtainResults(id: string, type: string) {
  let page = 1;
  let totalResults: any[] = [];
  let url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_companies=${id}`;

  try {
    while (page) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch collection data, status: ${response.status}`
        );
      }

      const data = await response.json();
      totalResults.push(...data.results);

      page = data.page < data.total_pages ? data.page + 1 : 0;
      url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_companies=${id}`;
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the data.");
  }

  return totalResults;
}
