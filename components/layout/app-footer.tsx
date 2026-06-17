"use client";

import { BrandLogo } from "@/components/brand-logo";
import { useLanguage } from "@/components/language-provider";

export function AppFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-10 rounded-shell border border-line bg-[#e9e2d9]/80 px-6 py-8 text-text-muted shadow-card">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <BrandLogo imageClassName="h-12 w-12" textClassName="text-[1.45rem]" />
          <p className="mt-2 max-w-md text-body">{t.common.footerLine}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-medium">
          <span>{t.common.privacyPolicy}</span>
          <span>{t.common.termsOfService}</span>
          <span>{t.common.accessibility}</span>
          <span>{t.common.contactUs}</span>
        </div>
      </div>
    </footer>
  );
}
