const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


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
  const url = 'https://api.themoviedb.org/3/configuration/countries?language=fr-FR';
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error)
  }
}

export async function obtainLanguagesConfigurations() {
  const url = 'https://api.themoviedb.org/3/configuration/languages';
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error)
  }
}

export async function obtainGenres(type: string) {
  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=fr`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();

    return data.genres;
  } catch (error) {
    console.error(error)
  }
}