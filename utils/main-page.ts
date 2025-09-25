import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export async function obtainMainPageData() {
  "use cache";
  try {
    const { todayUrl, weekUrl, monthUrl, yearUrl, allTimeUrl } =
      await getDate();
    const [
      dayTrendingMovies,
      weekTrendingMovies,
      dayTrendingTv,
      weekTrendingTv,
      topMovies,
      topTv,
      nowPlaying,
      todayUpcoming,
      weekUpcoming,
      monthUpcoming,
      yearUpcoming,
      allTimeUpcoming,
    ] = await Promise.all([
      obtainTrending("movie", "day"),
      obtainTrending("movie", "week"),
      obtainTrending("tv", "day"),
      obtainTrending("tv", "week"),
      obtainTops("movie"),
      obtainTops("tv"),
      obtainNowPlaying(),
      obtainUpcomingMovies(todayUrl),
      obtainUpcomingMovies(weekUrl),
      obtainUpcomingMovies(monthUrl),
      obtainUpcomingMovies(yearUrl),
      obtainUpcomingMovies(allTimeUrl),
    ]);
    const trendingMovies = { dayTrendingMovies, weekTrendingMovies };
    const trendingTv = { dayTrendingTv, weekTrendingTv };
    const tops = { topMovies, topTv };
    const upcomings = {
      today: todayUpcoming,
      week: weekUpcoming,
      month: monthUpcoming,
      year: yearUpcoming,
      alltime: allTimeUpcoming,
    };

    return { trendingMovies, trendingTv, tops, nowPlaying, upcomings };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function obtainTrending(type: string, time: string) {
  const url = `https://api.themoviedb.org/3/trending/${type}/${time}?include_adult=false&language=fr-FR`;

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

async function obtainTops(type: string) {
  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=fr-FR&region=FR&page=1&sort_by=popularity.desc`;

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

async function obtainNowPlaying() {
  const url = `https://api.themoviedb.org/3/movie/now_playing?include_adult=false&language=fr-FR&page=1&region=FR`;

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

async function getDate() {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&page=1`;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Aujourd'hui
  const today = new Date();
  const todayFormatted = formatDate(today);

  // Fin de la semaine (dimanche)
  const endOfWeek = new Date(today);
  const dayOfWeek = endOfWeek.getDay(); // 0 (dimanche) à 6 (samedi)
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // Nombre de jours jusqu'à dimanche
  endOfWeek.setDate(endOfWeek.getDate() + daysUntilSunday); // Aller à dimanche
  const endOfWeekFormatted = formatDate(endOfWeek);

  // Fin du mois
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Dernier jour du mois en cours
  const endOfMonthFormatted = formatDate(endOfMonth);

  // Fin de l'année
  const endOfYear = new Date(today.getFullYear(), 11, 31); // 31 décembre de l'année en cours
  const endOfYearFormatted = formatDate(endOfYear);

  const todayUrl = `${url}&include_adult=false&primary_release_date.gte=${todayFormatted}&primary_release_date.lte=${todayFormatted}&sort_by=popularity.desc`;
  const weekUrl = `${url}&include_adult=false&primary_release_date.gte=${todayFormatted}&primary_release_date.lte=${endOfWeekFormatted}&sort_by=popularity.desc`;
  const monthUrl = `${url}&include_adult=false&primary_release_date.gte=${todayFormatted}&primary_release_date.lte=${endOfMonthFormatted}&sort_by=popularity.desc`;
  const yearUrl = `${url}&include_adult=false&primary_release_date.gte=${todayFormatted}&primary_release_date.lte=${endOfYearFormatted}&sort_by=popularity.desc`;
  const allTimeUrl = `${url}&include_adult=false&primary_release_date.gte=${todayFormatted}&sort_by=popularity.desc`;

  return { todayUrl, weekUrl, monthUrl, yearUrl, allTimeUrl };
}

async function obtainUpcomingMovies(url: string) {
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
