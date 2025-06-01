"use client";

import Link from "next/link";

interface ProfileNavigationProps {
  currentPath?: string;
}

export function ProfileNavigation({ currentPath }: ProfileNavigationProps) {
  const navItems = [
    { href: `${currentPath}/films`, label: "Films" },
    { href: `${currentPath}/series`, label: "Séries" },
    { href: `${currentPath}/reviews`, label: "Reviews" },
    { href: `${currentPath}/watchlists`, label: "Watchlists" },
    { href: `${currentPath}/lists`, label: "Lists" },
  ];

  return (
    <div className="border-b border-[#4A4A4A] mb-6">
      <nav className="flex space-x-8 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              currentPath === item.href
                ? "border-[#D32F2F] text-[#D32F2F]"
                : "border-transparent text-[#BDBDBD] hover:text-white hover:border-[#4A4A4A]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
