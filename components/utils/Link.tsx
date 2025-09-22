"use client";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Link({
  href,
  children,
  className,
  target,
  rel,
}: LinkProps) {
  const router = useRouter();

  const handleMouseEnter = () => {
    router.prefetch(href);
  };

  return (
    <NextLink
      href={href}
      prefetch={false}
      onMouseEnter={handleMouseEnter}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </NextLink>
  );
}
