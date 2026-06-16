"use client";

import Link from "next/link";

import { Icon } from "@/components/icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { Input } from "@/components/ui";

type QuickResult = {
  href: string;
  label: string;
};

type AppHeaderProps = {
  query: string;
  quickResults: QuickResult[];
  onQueryChange: (value: string) => void;
  onQueryClear: () => void;
  onMobileMenuOpen: () => void;
};

export function AppHeader({
  query,
  quickResults,
  onQueryChange,
  onQueryClear,
  onMobileMenuOpen
}: AppHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#fff8f1]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link className="text-h2 font-bold tracking-[-0.02em] text-primary" href="/">
            {t.common.appName}
          </Link>
        </div>

        <div className="relative hidden min-w-[320px] flex-1 lg:block lg:max-w-[460px]">
          <Input onChange={(event) => onQueryChange(event.target.value)} placeholder={t.common.searchPlaceholder} value={query} />
          {quickResults.length > 0 ? (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-[22px] border border-line bg-white p-3 shadow-soft">
              {quickResults.map((item) => (
                <Link
                  className="block rounded-2xl px-3 py-3 text-sm hover:bg-surface-muted"
                  href={item.href}
                  key={`${item.href}-${item.label}`}
                  onClick={onQueryClear}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden rounded-full border border-line bg-white/85 px-4 py-2.5 text-sm font-semibold text-foreground shadow-card md:flex md:items-center md:gap-2">
            <Icon className="text-primary" name="account_circle" />
            <span>{t.common.primaryCaregiver}</span>
          </div>
          <button
            aria-label="Open navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-card lg:hidden"
            onClick={onMobileMenuOpen}
            type="button"
          >
            <Icon className="text-primary" name="menu" />
          </button>
        </div>
      </div>
    </header>
  );
}
