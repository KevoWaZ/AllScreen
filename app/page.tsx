import NowPlayingMovies from "@/components/main-page/NowPlayingMovies";
import PopularMovies from "@/components/main-page/PopularMovies";
import PopularPeople from "@/components/main-page/PopularPeople";
import PopularTVShows from "@/components/main-page/PopularTVShows";
import SearchComponent from "@/components/main-page/SearchComponent";
import TopRatedMovies from "@/components/main-page/TopRatedMovies";
import TrendingToday from "@/components/main-page/TrendingToday";
import UpcomingMovies from "@/components/main-page/UpcomingMovies";


export default function Home() {
  return (
    <div className="bg-[#121212] min-h-screen">
      <SearchComponent />
      <main className="container mx-auto px-4 py-8">
        <TrendingToday />
        <PopularMovies />
        <PopularTVShows />
        <NowPlayingMovies />
        <UpcomingMovies />
        <TopRatedMovies />
        <PopularPeople />
      </main>
    </div>
  );
}

