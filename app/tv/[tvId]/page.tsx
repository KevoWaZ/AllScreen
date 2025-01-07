"use client";
import Recommendations from "@/components/tvId/Recommendations";
import TvDetail from "@/components/tvId/TvDetail";
import TvHeader from "@/components/tvId/TvHeader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

async function obtainTVDetails(tvId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    const TvDetails = await response.json();

    const tvCredits = await obtainTVCredits(tvId);
    const keywords = await obtainTVKeywords(tvId);
    const recommendations = await obtainTVRecommendations(tvId);
    const externals = await obtainExternalId(tvId);
    if (tvCredits) {
      const { cast, crew } = tvCredits;
      return {
        TvDetails,
        cast,
        crew,
        keywords,
        recommendations,
        externals
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function obtainTVCredits(tvId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );

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
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/keywords?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function obtainTVRecommendations(tvId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=fr-FR&page=1`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function obtainExternalId(tvId: string) {
  const externals = {};
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

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/external_ids`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

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

    console.log(externals);
    return externals; 
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données externes:",
      error
    );
  }
}

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [TvDetails, setTVDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [externals, setExternals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { TvDetails, cast, keywords, recommendations, externals } =
          await obtainTVDetails(params.tvId);
        setTVDetails(TvDetails);

        setCast(cast);
        setKeywords(keywords);
        setRecommendations(recommendations);
        setExternals(externals)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId]);

  if (loading) {
    return (
      <div>
        <p>CHARGEMENT</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <TvHeader tvDetails={TvDetails} />

      <TvDetail
        TvDetails={TvDetails}
        cast={cast}
        tvId={params.tvId}
        keywords={keywords}
        externals={externals}
      />

      <Recommendations recommendations={recommendations} />
    </div>
  );
}
