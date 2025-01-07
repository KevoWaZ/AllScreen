import { Keyword, Person, TVShow } from "@/types/types";
import LeftTvDetails from "./LeftTvDetails";
import RightTvDetails from "./RightTvDetails";



interface TvDetailProps {
  TvDetails: TVShow;
  cast: Person[];
  keywords: Keyword[];
  tvId: string;
  externals: object
}

export default function TvDetail({ TvDetails, cast, keywords, tvId, externals }: TvDetailProps) {
    
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
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
      />
    </div>
  );
}

