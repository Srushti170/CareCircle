"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { Icon } from "@/components/icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { Input } from "@/components/ui";
import { navItems } from "@/lib/app-state";
import { getNavLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileSidebarProps = {
  open: boolean;
  pathname: string;
  query: string;
  onClose: () => void;
  onQueryChange: (value: string) => void;
};

export function MobileSidebar({
  open,
  pathname,
  query,
  onClose,
  onQueryChange
}: MobileSidebarProps) {
  const { t } = useLanguage();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1d1b17]/28 lg:hidden" onClick={onClose}>
      <div
        className="app-sidebar-scroll h-full w-[86vw] max-w-[340px] overflow-y-auto bg-[#fff9f2] p-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <BrandLogo imageClassName="h-11 w-11" textClassName="text-[1.45rem]" />
          <button
            aria-label="Close navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-card"
            onClick={onClose}
            type="button"
          >
            <Icon className="rotate-45 text-primary" name="add" />
          </button>
        </div>

        <div className="space-y-4">
          <LanguageSwitcher />
          <Input onChange={(event) => onQueryChange(event.target.value)} placeholder={t.common.searchPlaceholder} value={query} />
          <div className="rounded-[24px] border border-line bg-white p-3 shadow-card">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  className={cn(
                    "mb-1 flex items-center gap-3 rounded-2xl px-3 py-3 text-label font-semibold transition last:mb-0",
                    active ? "bg-primary text-white" : "hover:bg-surface-muted"
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={onClose}
                >
                  <Icon name={item.icon} />
                  <span>{getNavLabel(t, item.href)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
