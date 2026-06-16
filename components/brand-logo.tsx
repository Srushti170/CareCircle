"use client";

import Image from "next/image";
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
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative h-11 w-11 shrink-0 overflow-hidden rounded-full", imageClassName)}>
        <Image
          alt="CareCircle logo"
          className="object-contain"
          fill
          priority={priority}
          src="/carecircle-logo.png"
        />
      </div>
      {showText ? (
        <span className={cn("text-h2 font-bold tracking-[-0.03em] text-primary", textClassName)}>CareCircle</span>
      ) : null}
    </div>
  );

  return (
    <Link aria-label="CareCircle home" href={href}>
      {content}
    </Link>
  );
}
