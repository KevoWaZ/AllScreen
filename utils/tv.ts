import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";
import { headers } from "next/headers";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const API_KEY = obtainTMDBAPIKey();

type ExternalLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export async function obtainTvLayout(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?language=fr-FR`;
  const url2 = `https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?language=fr-FR`;
  try {
    const [response, response2] = await Promise.all([
      fetch(url, options),
      fetch(url2, options),
    ]);
    const TvDetails = await response.json();
    const TVCrew = await response2.json();

    TvDetails.crew = TVCrew.crew;

    return TvDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainTVDetails(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?language=fr-FR`;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    let userMediaActivity = {};
    if (session) {
      const userId = session.user.id;
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          reviews: {
            where: {
              TVId: Number(tvId),
            },
          },
          watched: {
            where: {
              TVId: Number(tvId),
            },
          },
          watchlists: {
            where: {
              TVId: Number(tvId),
            },
          },
        },
      });
      userMediaActivity = {
        review: getUser?.reviews[0],
        watched: getUser?.watched[0],
        watchlist: getUser?.watchlists[0],
      };
    }

    const response = await fetch(url, options);
    await responseVerification(response, url);
    const TvDetails = await response.json();

    const [tvCredits, keywords, recommendations, externals, images, providers] =
      await Promise.all([
        obtainTVCredits(tvId),
        obtainTVKeywords(tvId),
        obtainTVRecommendations(tvId),
        obtainExternalId(tvId),
        obtainTVImages(tvId),
        obtainTVWatchProviders(tvId),
      ]);

    if (tvCredits) {
      const { cast, crew } = tvCredits;
      const results = {
        TvDetails,
        cast,
        crew,
        keywords,
        recommendations,
        externals,
        images,
        providers,
        userMediaActivity,
      };
      return results;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainTVCredits(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    return {
      cast: data.cast,
      crew: data.crew,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function obtainTVKeywords(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/keywords?language=fr-FR`;
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

async function obtainTVRecommendations(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=fr-FR&page=1`;
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
  tvId: string
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
  const url = `https://api.themoviedb.org/3/tv/${tvId}/external_ids`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const data = await response.json();

    // Vérifiez si les identifiants externes sont présents et générez les liens correspondants
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
    console.error(
      "Erreur lors de la récupération des données externes:",
      error
    );
    throw error;
  }
}

export async function obtainSeasonDetails(tvId: string, season_number: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${season_number}?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const seasonDetails = await response.json();
    return seasonDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtainEpisodeCasts(
  tvId: string,
  season_number: string,
  episode_number: string
) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${season_number}/episode/${episode_number}/credits?language=fr-FR`;
  try {
    const response = await fetch(url, options);
    await responseVerification(response, url);
    const episodeCasts = await response.json();
    return episodeCasts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function obtainTVImages(tvId: string) {
  type votes = {
    vote_count: number;
    vote_average: number;
  }[];

  const url = `https://api.themoviedb.org/3/tv/${tvId}/images`;
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

async function obtainTVWatchProviders(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/watch/providers`;
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
