"use client";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import React from "react";

interface LinkProps {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  children: React.ReactNode;
  prefetchOn?: "hover" | "focus" | "both";
}

export default function Link({
  href,
  className,
  target,
  rel,
  replace = false,
  scroll = false,
  children,
  prefetchOn = "both",
}: LinkProps) {
  const router = useRouter();

  const prefetch = () => {
    if (href && !href.startsWith("#") && !href.startsWith("http")) {
      router.prefetch(href);
    }
  };

  const handleMouseEnter = prefetchOn.includes("hover") ? prefetch : undefined;
  const handleFocus = prefetchOn.includes("focus") ? prefetch : undefined;

  return (
    <NextLink
      href={href}
      prefetch={false}
      replace={replace}
      scroll={scroll}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </NextLink>
  );
}
