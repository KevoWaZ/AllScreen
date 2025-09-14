import { Credit } from "@/app/person/[id]/page";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";

interface PersonCrewInfoProps {
  crew: Credit;
  showDescription: boolean;
}

export function PersonCrewInfo({ crew, showDescription }: PersonCrewInfoProps) {
  return (
    <>
      <h2 className="text-white text-md md:text-xl font-bold mb-2 text-center px-4">
        {crew.title || crew.name}
      </h2>
      {crew.first_air_date && (
        <h4 className="text-gray font-bold text-center px-4">
          {crew.episode_count} épisodes
        </h4>
      )}
      <p>{crew.job}</p>
      <p className="text-gray-300 text-sm mb-2">
        {new Date(crew.release_date || crew.first_air_date).toLocaleDateString(
          "fr-FR"
        )}
      </p>
      {showDescription && (
        <p className="text-white text-sm mb-4 px-4 text-center line-clamp-4 md:line-clamp-6">
          {crew.overview || "Aucune description disponible"}
        </p>
      )}
      <div className="flex space-x-4">
        <Tooltip.TooltipProvider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                prefetch={true}
                href={`/${crew.media_type}/${crew.id}`}
                className="p-2 bg-[#D32F2F] text-white rounded-full  hover:bg-[#FF5252] transition-colors"
                aria-label="Go to show"
              >
                <FaInfoCircle aria-label="Go to show" />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                sideOffset={5}
              >
                Voir les détails
                <Tooltip.Arrow className=" fill-[#2C2C2C]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.TooltipProvider>
      </div>
    </>
  );
}
