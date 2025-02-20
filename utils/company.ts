const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainCompanyMedias(
  id: string,
  type: string,
  page: number = 1
) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc&with_companies=${id}`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  const companyInfo = await obtainCompanyInfo(id);
  const results = data.results;
  const totalPages = data.total_pages;

  return { companyInfo, results, totalPages };
}

async function obtainCompanyInfo(id: string) {
  const url = `https://api.themoviedb.org/3/company/${id}`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
