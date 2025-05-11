import type { Movie } from "@/types/types";
import Image from "next/image";

interface MovieHeaderProps {
  movieDetails: Movie;
}

export default function MovieHeader({ movieDetails }: MovieHeaderProps) {
  // Fonction pour obtenir le réalisateur
  const getDirector = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter((member) => member.job === "Director")
      .map((member) => member.name);
  };

  // Fonction pour obtenir les scénaristes
  const getWriters = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter(
        (member) => member.job === "Screenplay" || member.job === "Writer"
      )
      .map((member) => member.name);
  };

  const getExecutiveProducer = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter((member) => member.job === "Executive Producer")
      .map((member) => member.name);
  };

  const getProducer = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter((member) => member.job === "Producer")
      .map((member) => member.name);
  };

  const getLeadEditor = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter((member) => member.job === "Lead Editor")
      .map((member) => member.name);
  };

  const getComposer = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter((member) => member.job === "Original Music Composer")
      .map((member) => member.name);
  };

  const getDirectorOfPhotography = () => {
    if (!movieDetails || !movieDetails.crew) return [];
    return movieDetails.crew
      .filter((member) => member.job === "Director of Photography")
      .map((member) => member.name);
  };

  const director = getDirector();
  const writers = getWriters();
  const executiveProducer = getExecutiveProducer();
  const producer = getProducer();
  const leadEditor = getLeadEditor();
  const composer = getComposer();
  const directorOfPhotography = getDirectorOfPhotography();

  // Fonction pour formater les noms (limiter à 2 noms + indication du nombre restant)
  const formatNames = (names: string[]) => {
    if (names.length <= 2) return names.join(", ");
    return `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
  };

  // Fonction pour déterminer si une section crew doit être affichée
  const shouldDisplayCrew = () => {
    return (
      director.length > 0 ||
      writers.length > 0 ||
      executiveProducer.length > 0 ||
      producer.length > 0 ||
      leadEditor.length > 0 ||
      composer.length > 0 ||
      directorOfPhotography.length > 0
    );
  };

  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] 2xl:h-[60vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
        alt={movieDetails.title}
        fill
        style={{ objectFit: "cover", opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
          {movieDetails.title}
        </h1>
        {movieDetails.tagline && (
          <h3 className="text-lg sm:text-xl md:text-2xl text-[#A1A1A1] italic mb-5">
            {movieDetails.tagline}
          </h3>
        )}

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-[#D32F2F] dark:bg-[#B71C1C] text-white px-4 py-2 rounded-full text-sm font-semibold">
            {movieDetails.status}
          </span>
          {movieDetails.adult && (
            <span className="bg-[#FF5722] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Adulte
            </span>
          )}
        </div>

        {shouldDisplayCrew() && (
          <div className="mt-4 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {director.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {director.length > 1 ? "Réalisateurs" : "Réalisateur"}
                  </p>
                  <p className="font-semibold">{formatNames(director)}</p>
                </div>
              )}

              {writers.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {writers.length > 1 ? "Scénaristes" : "Scénariste"}
                  </p>
                  <p className="font-semibold">{formatNames(writers)}</p>
                </div>
              )}

              {executiveProducer.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {executiveProducer.length > 1
                      ? "Producteurs exécutif"
                      : "Producteur exécutif"}
                  </p>
                  <p className="font-semibold">
                    {formatNames(executiveProducer)}
                  </p>
                </div>
              )}

              {producer.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {producer.length > 1 ? "Producteurs" : "Producteur"}
                  </p>
                  <p className="font-semibold">{formatNames(producer)}</p>
                </div>
              )}

              {leadEditor.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {leadEditor.length > 1 ? "Monteurs" : "Monteur"}
                  </p>
                  <p className="font-semibold">{formatNames(leadEditor)}</p>
                </div>
              )}

              {composer.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {composer.length > 1 ? "Compositeurs" : "Compositeur"}
                  </p>
                  <p className="font-semibold">{formatNames(composer)}</p>
                </div>
              )}

              {directorOfPhotography.length > 0 && (
                <div className="border-l-2 border-[#D32F2F] dark:border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {directorOfPhotography.length > 1
                      ? "Directeurs de la photographie"
                      : "Directeur de la photographie"}
                  </p>
                  <p className="font-semibold">
                    {formatNames(directorOfPhotography)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
