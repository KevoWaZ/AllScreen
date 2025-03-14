import { Keyword, Person, Provider, TVShow } from "@/types/types";
import LeftTvDetails from "./LeftTvDetails";
import RightTvDetails from "./RightTvDetails";
import { IconType } from "react-icons";

interface TvDetailProps {
  TvDetails: TVShow;
  cast: Person[];
  keywords: Keyword[];
  tvId: string;
  externals: {
    label: string;
    url: string;
    icon: IconType;
  }[];
  providers: Provider;
}

export default function TvDetail({
  TvDetails,
  cast,
  keywords,
  tvId,
  externals,
  providers,
}: TvDetailProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <LeftTvDetails
        TvDetails={TvDetails}
        cast={cast}
        tvId={tvId}
        formatCurrency={formatCurrency}
      />
      <RightTvDetails
        TvDetails={TvDetails}
        keywords={keywords}
        externals={externals}
        providers={providers}
      />
    </div>
  );
}
