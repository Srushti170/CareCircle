"use client";

import Link from "next/link";

import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { navItems } from "@/lib/app-state";
import { getNavLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function MobileNav({ pathname }: { pathname: string }) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 grid grid-cols-4 gap-2 rounded-[26px] border border-line bg-white/95 p-2 shadow-soft lg:hidden">
      {navItems.slice(0, 4).map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center rounded-[20px] px-2 text-[0.76rem] font-semibold transition",
              active ? "bg-primary text-white" : "text-text-muted"
            )}
            href={item.href}
          >
            <Icon className="text-[1.1rem]" name={item.icon} />
            <span className="mt-1 text-center leading-tight">{getNavLabel(t, item.href)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
