import { Credit } from "@/app/person/[id]/page";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

interface PersonCastInfoProps {
  cast: Credit;
  showDescription: boolean;
}

export function PersonCastInfo({ cast, showDescription }: PersonCastInfoProps) {
  const router = useRouter();
  return (
    <>
      <h2 className="text-white text-md md:text-xl font-bold mb-2 text-center px-4">
        {cast.title || cast.name}
      </h2>
      <h3 className="text-white text-md font-bold text-center px-4">
        Role: {cast.character}
      </h3>
      {cast.first_air_date && (
        <h4 className="text-gray font-bold text-center px-4">
          {cast.episode_count} épisodes
        </h4>
      )}
      <p className="text-gray-300 text-sm mb-2">
        {new Date(cast.release_date || cast.first_air_date).toLocaleDateString(
          "fr-FR"
        )}
      </p>
      {showDescription && (
        <p className="text-white text-sm mb-4 px-4 text-center line-clamp-4 md:line-clamp-6">
          {cast.overview || "Aucune description disponible"}
        </p>
      )}
      <div className="flex space-x-4">
        <Tooltip.TooltipProvider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/${cast.media_type}/${cast.id}`);
                }}
                className="p-2 bg-[#D32F2F] text-white rounded-full hover:bg-[#B71C1C] transition-colors cursor-pointer"
                aria-label="Voir les détails du film"
              >
                <FaInfoCircle />
              </button>
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
