'use client'
import { useEffect, useState } from "react";
import MovieHeader from "@/components/movieId/MovieHeader";
import MovieDetail from "@/components/movieId/MovieDetail";
import Collection from "@/components/movieId/Collection";
import Recommendations from "@/components/movieId/Recommendations";
import { useParams } from "next/navigation";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Loading from "@/app/loading";

type ExternalLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};
type ExternalLinks = Record<string, ExternalLink>;

async function obtainMovieDetails(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
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
    const { cast } = await obtainMovieCredits(movieId);
    const keywords = await obtainMovieKeywords(movieId);
    const recommendations = await obtainMovieRecommendations(movieId);
    const externals = await obtainExternalId(movieId);
    return {
      movieDetails,
      cast,
      collection,
      keywords,
      recommendations,
      externals
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function obtainMovieCredits(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function obtainMovieCollection(collectionId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/collection/${collectionId}?language=fr-FR`,
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

    return data;
  } catch (error) {
    console.error(error);
  }
}
async function obtainMovieKeywords(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/keywords`,
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

    return data;
  } catch (error) {
    console.error(error);
  }
}
async function obtainMovieRecommendations(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=fr-FR&page=1`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.results);

    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function obtainExternalId(movieId: string): Promise<Record<string, ExternalLink>> {
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

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
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
    console.error("Erreur lors de la récupération des données externes:", error);
    return {};
  }
}

export default function Page() {
    const params = useParams<{ movieId: string }>();
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState([])
    const [collection, setCollection] = useState([])
    const [keywords, setKeywords] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [cast, setCast] = useState([])
    const [externals, setExternals] = useState<ExternalLinks>({});

    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await obtainMovieDetails(params.movieId);
    
          if (result) {
            const { movieDetails, collection, keywords, recommendations, cast, externals } = result;
            setMovieDetails(movieDetails);
            setCollection(collection);
            setKeywords(keywords);
            setRecommendations(recommendations);
            setCast(cast);
            setExternals(externals);
          } else {
            console.error("Les données n'ont pas pu être chargées.");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [params.movieId]);
  

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
        <MovieHeader movieDetails={movieDetails} />

        <MovieDetail
          movieDetails={movieDetails}
          cast={cast}
          keywords={keywords}
          movieId={params.movieId}
          externals={externals}
        />
        {collection && <Collection collection={collection} />}

        {recommendations && (
          <Recommendations recommendations={recommendations} />
        )}
    </div>
  );
}
