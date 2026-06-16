"use client";

import { locales } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-line bg-white/80 px-2 py-2 shadow-card">
      <span className="sr-only">Language</span>
      <Icon className="text-primary" name="language" />
      {locales.map((item) => (
        <button
          key={item.code}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition",
            locale === item.code ? "bg-primary text-white" : "text-text-muted hover:bg-surface-muted"
          )}
          onClick={() => setLocale(item.code)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
