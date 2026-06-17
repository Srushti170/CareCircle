"use client";

import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AuthShell({
  badge,
  title,
  body,
  children,
  aside
}: {
  badge: string;
  title: string;
  body: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
        <BrandLogo imageClassName="h-14 w-14" priority textClassName="text-[1.95rem]" />
        <LanguageSwitcher />
      </div>

      <div className="mx-auto mt-6 grid max-w-[1240px] gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-stretch">
        <section className="dotted-panel overflow-hidden rounded-[32px] p-7 text-white shadow-soft md:p-9">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            {badge}
          </div>
          <h1 className="mt-5 max-w-[12ch] text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em] md:text-[3.2rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-7 text-white/85">{body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5">
              <div className="text-sm font-semibold text-white/70">Simple for families</div>
              <div className="mt-2 text-xl font-semibold">Large text, clear steps, and calm screens</div>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5">
              <div className="text-sm font-semibold text-white/70">Ready in 4 steps</div>
              <div className="mt-2 text-xl font-semibold">Account, circle, patient, and invites</div>
            </div>
          </div>
          {aside ? <div className="mt-8">{aside}</div> : null}
        </section>

        <Card className={cn("rounded-[32px] border-white/70 bg-[#fffdf9] p-6 md:p-8", "shadow-soft")}>
          {children}
        </Card>
      </div>
    </main>
  );
}
