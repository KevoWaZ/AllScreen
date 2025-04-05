"use client";
import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  href: string;
  tabRef: React.RefObject<HTMLLIElement>;
}

interface CursorProps {
  position: Position;
}

export const NavLinks = () => {
  return (
    <div>
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const movieTabRef = useRef<HTMLLIElement>(null);
  const tvTabRef = useRef<HTMLLIElement>(null);
  const personTabRef = useRef<HTMLLIElement>(null);

  // Déterminer quel onglet est actif en fonction de l'URL
  const isMovieActive = pathname.startsWith("/search/movie");
  const isTvActive = pathname.startsWith("/search/tv");
  const isPersonActive = pathname.startsWith("/person");

  // Mettre à jour la position du curseur en fonction de l'onglet actif
  useEffect(() => {
    const updateCursorPosition = () => {
      let activeTabRef;

      if (isMovieActive) activeTabRef = movieTabRef;
      else if (isTvActive) activeTabRef = tvTabRef;
      else if (isPersonActive) activeTabRef = personTabRef;

      if (activeTabRef?.current) {
        const { width } = activeTabRef.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: activeTabRef.current.offsetLeft,
        });
      }
    };

    // Petit délai pour s'assurer que les refs sont disponibles
    setTimeout(updateCursorPosition, 0);

    // Mettre à jour la position si la fenêtre est redimensionnée
    window.addEventListener("resize", updateCursorPosition);
    return () => window.removeEventListener("resize", updateCursorPosition);
  }, [pathname, isMovieActive, isTvActive, isPersonActive]);

  return (
    <ul className="relative mx-auto flex w-fit rounded-md dark:bg-gray-900 p1">
      <Tab setPosition={setPosition} href="/search/movie" tabRef={movieTabRef}>
        Films
      </Tab>
      <Tab setPosition={setPosition} href="/search/tv" tabRef={tvTabRef}>
        Séries
      </Tab>
      <Tab setPosition={setPosition} href="/person" tabRef={personTabRef}>
        Personnes
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab: React.FC<TabProps> = ({ children, setPosition, href, tabRef }) => {
  return (
    <li
      ref={tabRef}
      onMouseEnter={() => {
        if (!tabRef.current) return;
        const { width } = tabRef.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: tabRef.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      className="absolute z-0 h-7 rounded-md bg-red-800 md:h-12"
    />
  );
};
