"use client";

import { useEffect } from "react";
import { Film, RefreshCw } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="text-red-500 mb-6">
        <Film size={64} />
      </div>
      <h2
        className="text-4xl font-bold mb-4 text-center"
        style={{ fontFamily: "'Bebas Neue', cursive" }}
      >
        Oups ! Une erreur s&apos;est produite
      </h2>
      <p className="mb-8 text-gray-400 text-center max-w-md">
        Il semble que nous ayons rencontré un problème technique. Notre équipe
        de projection travaille dessus !
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center"
      >
        <RefreshCw className="mr-2" size={18} />
        Réessayer
      </button>
    </div>
  );
}
