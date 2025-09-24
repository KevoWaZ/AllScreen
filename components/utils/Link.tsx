"use client";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import React from "react";

interface LinkProps {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  className?: string;
  target?: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop";
  rel?: string;
  children: React.ReactNode;
}

export default function Link({
  href,
  className,
  target,
  rel,
  replace = false,
  scroll = false,
  children,
}: LinkProps) {
  const router = useRouter();

  const handleMouseEnter = () => {
    router.prefetch(href);
  };

  return (
    <NextLink
      href={href}
      prefetch={false}
      replace={replace}
      scroll={scroll}
      onMouseEnter={handleMouseEnter}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </NextLink>
  );
}
