"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  href?: string;
  imageClassName?: string;
  priority?: boolean;
  showText?: boolean;
  textClassName?: string;
};

export function BrandLogo({
  className,
  href = "/",
  imageClassName,
  priority = false,
  showText = true,
  textClassName
}: BrandLogoProps) {
  const content = (
    <div className={cn("flex items-center", className)}>
      {showText ? <span className={cn("text-[1.8rem] font-bold tracking-[-0.03em] text-primary", textClassName)}>CareCircle</span> : null}
    </div>
  );

  return (
    <Link aria-label="CareCircle home" href={href}>
      {content}
    </Link>
  );
}
