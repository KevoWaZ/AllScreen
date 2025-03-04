import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
  cache: "force-cache" as RequestCache,
};

export async function obtainPersonLayout(person_id: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const personDetails = await response.json();

    return personDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainPersonDetails(person_id: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const personDetails = await response.json();
    const { cast, crew } = await obtainPersonCredits(person_id);

    return {
      personDetails,
      cast,
      crew,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function obtainPersonCredits(person_id: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}/combined_credits?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const personCredits = await response.json();
    const cast: Item[] = personCredits.cast;
    const crew: Item[] = personCredits.crew;

    type Item = {
      release_date?: string;
      first_air_date?: string;
    };

    // Fonction pour obtenir la date correcte
    const getRelevantDate = (item: Item): number | null => {
      const releaseDate = item.release_date
        ? new Date(item.release_date).getTime()
        : null;
      const firstAirDate = item.first_air_date
        ? new Date(item.first_air_date).getTime()
        : null;

      if (releaseDate && !isNaN(releaseDate)) {
        return releaseDate;
      }
      if (firstAirDate && !isNaN(firstAirDate)) {
        return firstAirDate;
      }
      return null;
    };

    // Tri des éléments
    cast.sort((a: Item, b: Item) => {
      const dateA = getRelevantDate(a);
      const dateB = getRelevantDate(b);

      if (dateA === null && dateB === null) return 0;
      if (dateA === null) return 1;
      if (dateB === null) return -1;

      return dateB - dateA;
    });

    crew.sort((a: Item, b: Item) => {
      const dateA = getRelevantDate(a);
      const dateB = getRelevantDate(b);

      if (dateA === null && dateB === null) return 0;
      if (dateA === null) return 1;
      if (dateB === null) return -1;

      return dateB - dateA;
    });

    const cast_crew = {
      cast,
      crew,
    };

    return cast_crew;
  } catch (error) {
    console.error(error);
    return { cast: [], crew: [] };
  }
}
