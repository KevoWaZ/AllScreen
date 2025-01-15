"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Quelque chose s&apos;est mal passé !
      </h2>
      <button
        onClick={() => reset()}
        className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-400"
      >
        Réessayer
      </button>
    </div>
  );
}
