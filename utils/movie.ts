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
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const movieDetails = await response.json();

    let collection = null;

    if (
      movieDetails.belongs_to_collection &&
      movieDetails.belongs_to_collection.id
    ) {
      collection = await obtainMovieCollection(
        movieDetails.belongs_to_collection.id
      );
    }

    const [
      { cast },
      keywords,
      recommendations,
      externals,
      videos,
      images,
      providers,
    ] = await Promise.all([
      obtainMovieCredits(movieId),
      obtainMovieKeywords(movieId),
      obtainMovieRecommendations(movieId),
      obtainExternalId(movieId),
      obtainMovieVideos(movieId),
      obtainMovieImages(movieId),
      obtainMovieWatchProviders(movieId),
    ]);

    const results = {
      movieDetails,
      cast,
      collection,
      keywords,
      recommendations,
      externals,
      videos,
      images,
      providers,
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

    externals_provider.forEach((provider) => {
      if (data[provider.provider]) {
        externals[provider.provider] = {
          url: provider.urlTemplate.replace("${name}", data[provider.provider]),
          icon: provider.icon,
          label: provider.label,
        };
      }
    });

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
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function obtainMovieImages(movieId: string) {
  type votes = {
    vote_count: number;
    vote_average: number;
  }[];

  const url = `https://api.themoviedb.org/3/movie/${movieId}/images`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

    const data = await response.json();
    let backdrops: votes = data.backdrops;
    backdrops.sort((a, b) => b.vote_count - a.vote_count);
    backdrops = backdrops.slice(0, 10);
    backdrops.sort((a, b) => b.vote_average - a.vote_average);
    let logos: votes = data.logos;
    logos.sort((a, b) => b.vote_count - a.vote_count);
    logos = logos.slice(0, 10);
    logos.sort((a, b) => b.vote_average - a.vote_average);
    let posters: votes = data.posters;
    posters.sort((a, b) => b.vote_count - a.vote_count);
    posters = posters.slice(0, 10);
    posters.sort((a, b) => b.vote_average - a.vote_average);
    const results = {
      backdrops,
      logos,
      posters,
    };
    return results;
  } catch (error) {
    console.error(error);
  }
}

async function obtainMovieWatchProviders(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results.FR;
  } catch (error) {
    console.error(error);
  }
}
