import { Person } from "@/types/types";
import Link from "next/link";
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

export default function PersonMovieCast({ casting }: { casting: Person }) {
  return (
    <div className="ybg-opacity-75 p-4 rounded-lg">
      <h2 className="text-white text-xl font-bold mb-2 text-center px-4">
        {casting.name}
      </h2>
      <div className="text-left mb-2">
        <p className="text-sm text-gray-200">Rôle : {casting.character}</p>
      </div>
      <div className="flex justify-center">
        <Tooltip.TooltipProvider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                prefetch={false}
                href={`/person/${casting.id}`}
                className="p-2 bg-[#D32F2F] text-white rounded-full  hover:bg-[#FF5252] transition-colors"
                aria-label={`Plus d'informations sur ${casting.name}`}
              >
                <FaInfoCircle className="w-5 h-5" />
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
    </div>
  );
}
