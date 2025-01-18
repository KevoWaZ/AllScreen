"use client";
import Loading from "@/app/loading";
import Recommendations from "@/components/tvId/Recommendations";
import { motion } from "framer-motion";
import TvDetail from "@/components/tvId/TvDetail";
import TvHeader from "@/components/tvId/TvHeader";
import { TVShow } from "@/types/types";
import { obtainTVDetails } from "@/utils/tv";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type ExternalLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};
type ExternalLinks = Record<string, ExternalLink>;

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [TvDetails, setTVDetails] = useState<TVShow | null>(null);
  const [cast, setCast] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [externals, setExternals] = useState<ExternalLinks>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await obtainTVDetails(params.tvId);
        if (result) {
          const { TvDetails, cast, keywords, recommendations, externals } =
            result;
          setTVDetails(TvDetails);

          setCast(cast);
          setKeywords(keywords);
          setRecommendations(recommendations);
          setExternals(externals);
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
        />
      )}

      {recommendations && <Recommendations recommendations={recommendations} />}
    </motion.div>
  );
}
