"use client";

import { BrandLogo } from "@/components/brand-logo";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fff8f1] px-4 py-8">
      <div className="relative flex items-center justify-center">
        <div className="h-24 w-24 rounded-full border-4 border-accent/30 border-t-primary animate-spin" />
        <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-[#fbf5ee] shadow-soft">
          <BrandLogo imageClassName="h-14 w-14" showText={false} />
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="flex justify-center">
          <BrandLogo imageClassName="h-12 w-12" priority={false} textClassName="text-[1.05rem] uppercase tracking-[0.15em] animate-pulse" />
        </div>
        <h2 className="mt-2 text-h3 font-bold text-primary">Loading your circle...</h2>
      </div>
    </div>
  );
}
