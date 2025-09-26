import { Person } from "@/types/types";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

export function PersonSearch({ person }: { person: Person; bio?: boolean }) {
  const router = useRouter();
  return (
    <div className=" p-4 rounded-lg">
      <h2 className="text-white text-xl font-bold mb-2 text-center px-4">
        {person.name}
      </h2>
      <p className=" text-gray-400 font-semibold mb-4 text-center">
        {person.known_for_department}
      </p>
      <div className="w-full mb-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {person.known_for.map((show) => (
            <button
              key={show.id}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/${show.media_type}/${show.id}`);
              }}
              className="inline-block text-center bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full px-3 py-1 transition-colors duration-200"
              aria-label={`Voir ${show.title || show.name}`}
            >
              {show.title || show.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Tooltip.TooltipProvider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/person/${person.id}`);
                }}
                className="p-2 bg-[#D32F2F] text-white rounded-full hover:bg-[#B71C1C] transition-colors cursor-pointer"
                aria-label="Voir les détails"
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
    </div>
  );
}
