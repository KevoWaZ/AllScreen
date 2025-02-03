import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

type ExternalLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};
type ExternalLinks = Record<string, ExternalLink>;

export async function obtainMovieLayout(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const movieLayout = await response.json();

    return movieLayout;
  } catch (error) {
    console.error(error);
  }
}

export async function obtainMovieDetails(movieId: string) {
  console.log("LAAAAAAAA");

  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const movieDetails = await response.json();
    console.log(movieDetails);

    let collection = null;

    if (
      movieDetails.belongs_to_collection &&
      movieDetails.belongs_to_collection.id
    ) {
      collection = await obtainMovieCollection(
        movieDetails.belongs_to_collection.id
      );
    }

    const [{ cast }, keywords, recommendations, externals, videos] =
      await Promise.all([
        obtainMovieCredits(movieId),
        obtainMovieKeywords(movieId),
        obtainMovieRecommendations(movieId),
        obtainExternalId(movieId),
        obtainMovieVideos(movieId),
      ]);

    const results = {
      movieDetails,
      cast,
      collection,
      keywords,
      recommendations,
      externals,
      videos,
    };

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtainMovieCredits(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function obtainMovieCollection(collectionId: string) {
  const url = `https://api.themoviedb.org/3/collection/${collectionId}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
async function obtainMovieKeywords(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/keywords`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("key", data);

    return data.keywords;
  } catch (error) {
    console.error(error);
  }
}
async function obtainMovieRecommendations(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=fr-FR&page=1`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data.results);

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function obtainExternalId(
  movieId: string
): Promise<Record<string, ExternalLink>> {
  const externals: Record<string, ExternalLink> = {};
  const externals_provider = [
    {
      provider: "facebook_id",
      urlTemplate: "https://www.facebook.com/${name}",
      icon: FaFacebook,
      label: "Facebook Icon",
    },
    {
      provider: "twitter_id",
      urlTemplate: "https://twitter.com/${name}",
      icon: FaX,
      label: "Twitter Icon",
    },
    {
      provider: "instagram_id",
      urlTemplate: "https://instagram.com/${name}",
      icon: FaInstagram,
      label: "Instagram Icon",
    },
  ];

  const url = `https://api.themoviedb.org/3/movie/${movieId}/external_ids`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    externals_provider.forEach((provider) => {
      if (data[provider.provider]) {
        externals[provider.provider] = {
          url: provider.urlTemplate.replace("${name}", data[provider.provider]),
          icon: provider.icon,
          label: provider.label,
        };
      }
    });

    console.log(externals);
    return externals;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données externes:",
      error
    );
    return {};
  }
}

async function obtainMovieVideos(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.error(error);
  }
}
