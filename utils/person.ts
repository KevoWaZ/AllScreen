import { ExternalLink } from "@/app/(search)/person/[id]/page";
import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
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
    const externals = await obtainPersonExternals(person_id);
    const images = await obtainPersonImages(person_id);

    return {
      personDetails,
      cast,
      crew,
      externals,
      images,
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

async function obtainPersonExternals(personId: string) {
  const externals: Record<string, ExternalLink> = {};
  const externals_provider = [
    {
      provider: "facebook_id",
      urlTemplate: "https://www.facebook.com/${name}",
      icon: "FaFacebook",
      label: "Facebook Icon",
    },
    {
      provider: "instagram_id",
      urlTemplate: "https://instagram.com/${name}",
      icon: "FaInstagram",
      label: "Instagram Icon",
    },
    {
      provider: "tiktok_id",
      urlTemplate: "https://tiktok.com/${name}",
      icon: "FaTiktok",
      label: "TikTok Icon",
    },
    {
      provider: "twitter_id",
      urlTemplate: "https://twitter.com/${name}",
      icon: "FaX",
      label: "Twitter Icon",
    },
    {
      provider: "youtube_id",
      urlTemplate: "https://youtube.com/${name}",
      icon: "FaYoutube",
      label: "YouTube Icon",
    },
  ];
  const url = `https://api.themoviedb.org/3/person/${personId}/external_ids`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    externals_provider.forEach((provider) => {
      if (data[provider.provider]) {
        // Créer un objet avec l'URL et l'icône
        externals[provider.provider] = {
          url: provider.urlTemplate.replace("${name}", data[provider.provider]),
          icon: provider.icon,
          label: provider.label,
        };
      }
    });
    return externals;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function obtainPersonImages(personId: string) {
  const url = `https://api.themoviedb.org/3/person/${personId}/images`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.profiles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function obtainPopularPersons(page: number) {
  const url = `https://api.themoviedb.org/3/person/popular?language=fr-FR&page=${page}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
