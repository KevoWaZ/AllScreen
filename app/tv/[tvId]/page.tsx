"use client";
import Loading from "@/app/loading";
import Recommendations from "@/components/tvId/Recommendations";
import { motion } from "framer-motion";
import TvDetail from "@/components/tvId/TvDetail";
import TvHeader from "@/components/tvId/TvHeader";
import { Provider, TVShow } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import TVImage from "@/components/tvId/Images";

type ExternalLink = {
  label: string;
  url: string;
  icon: IconType;
};

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [TvDetails, setTVDetails] = useState<TVShow | null>(null);
  const [cast, setCast] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [externals, setExternals] = useState<ExternalLink[]>([]);
  const [images, setImages] = useState({
    posters: [] as [],
    backdrops: [] as [],
    logos: [] as [],
  });
  const defaultProvider: Provider = {
    link: "",
    buy: [],
    flatrate: [],
  };

  const [providers, setProviders] = useState<Provider>(defaultProvider);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/tv?tvId=${params.tvId}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
          const {
            TvDetails,
            cast,
            keywords,
            recommendations,
            externals,
            images,
            providers,
          } = result;
          setTVDetails(TvDetails);
          setCast(cast);
          setKeywords(keywords);
          setRecommendations(recommendations);
          setExternals(externals);
          setImages(images);
          setProviders(providers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {TvDetails && <TvHeader tvDetails={TvDetails} />}

      {TvDetails && (
        <TvDetail
          TvDetails={TvDetails}
          cast={cast}
          tvId={params.tvId}
          keywords={keywords}
          externals={externals}
          providers={providers}
        />
      )}

      {images && <TVImage images={images} />}

      {recommendations && <Recommendations recommendations={recommendations} />}
    </motion.div>
  );
}
