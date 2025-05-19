"use client";

import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fonction pour vérifier si l'écran est de taille mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px correspond à sm: dans Tailwind
    };

    // Vérifier au chargement initial
    checkIfMobile();

    // Ajouter un écouteur d'événement pour les changements de taille d'écran
    window.addEventListener("resize", checkIfMobile);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return isMobile;
}
