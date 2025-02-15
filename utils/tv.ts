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

export async function obtainTvLayout(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const TvDetails = await response.json();

    return TvDetails;
  } catch (error) {
    console.error(error);
  }
}

export async function obtainTVDetails(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const TvDetails = await response.json();

    const [tvCredits, keywords, recommendations, externals] = await Promise.all(
      [
        obtainTVCredits(tvId),
        obtainTVKeywords(tvId),
        obtainTVRecommendations(tvId),
        obtainExternalId(tvId),
      ]
    );

    if (tvCredits) {
      const { cast, crew } = tvCredits;
      const results = {
        TvDetails,
        cast,
        crew,
        keywords,
        recommendations,
        externals,
      };
      return results;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtainTVCredits(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

    const data = await response.json();

    return {
      cast: data.cast,
      crew: data.crew,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function obtainTVKeywords(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/keywords?language=fr-FR`;
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
    return null;
  }
}

async function obtainTVRecommendations(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=fr-FR&page=1`;
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
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

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
    return {}; // Retourner un objet vide en cas d'erreur
  }
}

export async function obtainSeasonDetails(tvId: string, season_number: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/season/${season_number}?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    const seasonDetails = await response.json();
    return seasonDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}