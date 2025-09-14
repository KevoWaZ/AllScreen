import { TVShow } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Job {
  job: string;
}

interface CrewMember {
  id: string;
  name: string;
  jobs: Job[];
}

interface TVHeaderProps {
  tvDetails: TVShow;
}

export default function TvHeader({ tvDetails }: TVHeaderProps) {
  const getDirector = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter((member) => member.jobs[0].job === "Director");
  };

  const getWriters = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter(
      (member) => member.job === "Screenplay" || member.jobs[0].job === "Writer"
    );
  };

  const getExecutiveProducer = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter(
      (member) => member.jobs[0].job === "Executive Producer"
    );
  };

  const getProducer = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter((member) => member.jobs[0].job === "Producer");
  };

  const getLeadEditor = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter(
      (member) => member.jobs[0].job === "Lead Editor"
    );
  };

  const getComposer = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter(
      (member) => member.jobs[0].job === "Original Music Composer"
    );
  };

  const getDirectorOfPhotography = () => {
    if (!tvDetails || !tvDetails.crew) return [];
    return tvDetails.crew.filter(
      (member) => member.jobs[0].job === "Director of Photography"
    );
  };

  const director = getDirector();
  const writers = getWriters();
  const executiveProducer = getExecutiveProducer();
  const producer = getProducer();
  const leadEditor = getLeadEditor();
  const composer = getComposer();
  const directorOfPhotography = getDirectorOfPhotography();

  // Fonction pour formater les noms (limiter à 2 noms + indication du nombre restant)
  const formatNames = (members: CrewMember[]) => {
    if (members.length <= 2) {
      return members.map((member, index) => (
        <React.Fragment key={index}>
          <Link
            // prefetch={false}
            href={`/person/${member.id}`}
            className="font-semibold text-white  hover:text-[#FF5252] transition-colors duration-200"
          >
            {member.name}
          </Link>
          {index < members.length - 1 ? ", " : ""}
        </React.Fragment>
      ));
    }
    return (
      <>
        {members.slice(0, 2).map((member, index) => (
          <React.Fragment key={index}>
            <Link
              // prefetch={false}
              href={`/person/${member.id}`}
              className="font-semibold text-white  hover:text-[#FF5252] transition-colors duration-200"
            >
              {member.name}
            </Link>
            {index < 1 ? ", " : ""}
          </React.Fragment>
        ))}
        <span> +{members.length - 2}</span>
      </>
    );
  };

  // Fonction pour déterminer si une section crew doit être affichée
  const shouldDisplayCrew = () => {
    return (
      director.length > 0 ||
      writers.length > 0 ||
      executiveProducer.length > 0 ||
      leadEditor.length > 0 ||
      composer.length > 0 ||
      directorOfPhotography.length > 0
    );
  };

  return (
    <div className="relative h-[80vh] sm:h-[70vh] md:h-[80vh] 2xl:h-[70vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`}
        alt={tvDetails.name}
        fill
        style={{ objectFit: "cover", opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
          {tvDetails.name}
        </h1>
        {tvDetails.tagline && (
          <h3 className="text-lg sm:text-xl md:text-2xl text-[#A1A1A1] italic mb-5">
            {tvDetails.tagline}
          </h3>
        )}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className=" bg-[#B71C1C] text-white px-4 py-2 rounded-full text-sm font-semibold">
            {tvDetails.status}
          </span>
          {tvDetails.adult && (
            <span className="bg-[#FF5722] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Adulte
            </span>
          )}
        </div>

        {shouldDisplayCrew() && (
          <div className="mt-4 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {director.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {director.length > 1 ? "Réalisateurs" : "Réalisateur"}
                  </p>
                  <div className="font-semibold">{formatNames(director)}</div>
                </div>
              )}

              {writers.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {writers.length > 1 ? "Scénaristes" : "Scénariste"}
                  </p>
                  <div className="font-semibold">{formatNames(writers)}</div>
                </div>
              )}

              {executiveProducer.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {executiveProducer.length > 1
                      ? "Producteurs exécutif"
                      : "Producteur exécutif"}
                  </p>
                  <div className="font-semibold">
                    {formatNames(executiveProducer)}
                  </div>
                </div>
              )}

              {producer.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {producer.length > 1 ? "Producteurs" : "Producteur"}
                  </p>
                  <div className="font-semibold">{formatNames(producer)}</div>
                </div>
              )}

              {leadEditor.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {leadEditor.length > 1 ? "Monteurs" : "Monteur"}
                  </p>
                  <div className="font-semibold">{formatNames(leadEditor)}</div>
                </div>
              )}

              {composer.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {composer.length > 1 ? "Compositeurs" : "Compositeur"}
                  </p>
                  <div className="font-semibold">{formatNames(composer)}</div>
                </div>
              )}

              {directorOfPhotography.length > 0 && (
                <div className="border-l-2  border-[#FF5252] pl-3">
                  <p className="text-xs text-[#BDBDBD] uppercase tracking-wider font-medium">
                    {directorOfPhotography.length > 1
                      ? "Directeurs de la photographie"
                      : "Directeur de la photographie"}
                  </p>
                  <div className="font-semibold">
                    {formatNames(directorOfPhotography)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
