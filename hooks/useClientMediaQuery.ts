"use client";

import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour utiliser les media queries côté client.
 * @param query - La requête media à évaluer.
 * @returns Un booléen indiquant si la requête media correspond (ou null si non encore évalué).
 */
export function useClientMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMatchChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", handleMatchChange);
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleMatchChange);
    };
  }, [query]);

  return matches;
}
