"use client";

import Link from "next/link";

interface ProfileNavigationProps {
  currentPath?: string;
}

export function ProfileNavigation({ currentPath }: ProfileNavigationProps) {
  const navItems = [
    { href: `${currentPath}`, label: "Profile" },
    { href: `${currentPath}/movies`, label: "Films" },
    { href: `${currentPath}/tv-shows`, label: "Séries" },
    { href: `${currentPath}/reviews`, label: "Reviews" },
    { href: `${currentPath}/watchlists-movies`, label: "Watchlists Films" },
    { href: `${currentPath}/watchlists-tv-shows`, label: "Watchlists Séries" },
    { href: `${currentPath}/lists`, label: "Lists" },
  ];

  return (
    <div className="border-b border-[#4A4A4A] mb-6">
      <nav className="flex space-x-8 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            prefetch={true}
            key={item.href}
            href={item.href}
            className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors border-transparent text-[#BDBDBD] hover:text-white hover:border-[#4A4A4A]`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
