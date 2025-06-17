import InTheatersSection from "@/components/main-page/InTheatersSection";
import PopularSection from "@/components/main-page/PopularSection";
import SearchComponent from "@/components/main-page/SearchComponent";
import TrendingSection from "@/components/main-page/TrendingSection";
import UpcomingSection from "@/components/main-page/UpcomingSection";
import { obtainMainPageData } from "@/utils/main-page";

export default async function Home() {
  const { trendingMovies, trendingTv, tops, nowPlaying, upcomings } =
    await obtainMainPageData();
  return (
    <div>
      <div className="mt-20 relative">
        <SearchComponent />
      </div>
      <div className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        {trendingMovies && trendingTv && (
          <TrendingSection movies={trendingMovies} tv={trendingTv} />
        )}
        {tops && <PopularSection movies={tops.topMovies} tv={tops.topTv} />}
        {nowPlaying && <InTheatersSection movies={nowPlaying} />}
        {upcomings && <UpcomingSection upcoming={upcomings} />}
      </div>
    </div>
  );
}
