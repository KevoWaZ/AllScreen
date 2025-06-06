import { Person } from "@/types/types";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";

export function PersonSearch({
  person,
  bio,
}: {
  person: Person;
  bio?: boolean;
}) {
  return (
    <>
      <h2 className="text-white text-xl font-bold mb-2 text-center px-4">
        {person.name}
      </h2>
      <p className=" text-gray-400 font-semibold mb-4">
        {person.known_for_department}
      </p>
      {bio && (
        <p className="text-white text-sm mb-4 px-4 text-center line-clamp-6">
          {person.biography || "Aucune biographie disponible"}
        </p>
      )}
      <div className="w-full mb-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {person.known_for.map((show) => (
            <Link
              prefetch={false}
              key={show.id}
              href={`/${show.media_type}/${show.id}`}
              className="inline-block text-center bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full px-3 py-1 transition-colors duration-200"
            >
              {show.title || show.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <Tooltip.TooltipProvider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                prefetch={false}
                href={`/person/${person.id}`}
                className="p-2 bg-[#D32F2F] text-white rounded-full  hover:bg-[#FF5252] transition-colors"
                aria-label="Person page link"
              >
                <FaInfoCircle aria-label="Person page link" />
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
