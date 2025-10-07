import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";
import { request } from "http";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { FaFacebook, FaInstagram, FaX } from "react-icons/fa6";
import { botUserAgents } from "./utils";

const API_KEY = obtainTMDBAPIKey();

type ExternalLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};

type votes = {
  vote_count: number;
  vote_average: number;
  file_path: string;
}[];

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export async function obtainMovieLayout(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`;
  const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR`;
  try {
    const [response, response2] = await Promise.all([
      fetch(url, options),
      fetch(url2, options),
    ]);

    const movieLayout = await response.json();
    const movieCrew = await response2.json();
    movieLayout.crew = movieCrew.crew;

    return movieLayout;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function checkUserMediaActivity(movieId: string) {
  const cookieStore = await cookies();
  const isLogged = cookieStore.get("isLogged")?.value === "true" ? true : false;
  const headerLists = await headers();
  const userAgent = headerLists.get("user-agent");
  const isBot = botUserAgents.some((bot) => userAgent?.includes(bot));
  console.log(isBot);

  if (isBot) {
    return null;
  }

  let userMediaActivity = {};
  if (isLogged) {
    const userId = cookieStore.get("userId")?.value;

    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        reviews: {
          where: {
            movieId: Number(movieId),
          },
        },
        watched: {
          where: {
            movieId: Number(movieId),
          },
        },
        watchlists: {
          where: {
            movieId: Number(movieId),
          },
        },
      },
    });
    return (userMediaActivity = {
      review: getUser?.reviews[0],
      watched: getUser?.watched[0],
      watchlist: getUser?.watchlists[0],
    });
  }
}

export async function obtainMovieDetails(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR&append_to_response=release_dates`;
  try {
    const userMediaActivity = await checkUserMediaActivity(movieId);
    const response = await fetch(url, options);
    await responseVerification(response, url);
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
    const [{ cast }, keywords, externals, videos, images, providers] =
      await Promise.all([
        obtainMovieCredits(movieId),
        obtainMovieKeywords(movieId),
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
      externals,
      videos,
      images,
      providers,
      userMediaActivity,
    };

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainMovieCredits(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function obtainMovieCollection(collectionId: string) {
  const url = `https://api.themoviedb.org/3/collection/${collectionId}?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function obtainMovieKeywords(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/keywords`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data.keywords;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function obtainMovieRecommendations(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=fr-FR&page=1`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
    throw error;
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
    const response = await fetch(url, options);
    await responseVerification(response, url);
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
    throw error;
  }
}

async function obtainMovieVideos(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function obtainMovieImages(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/images`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
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
    throw error;
  }
}

async function obtainMovieWatchProviders(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return data.results.FR;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
