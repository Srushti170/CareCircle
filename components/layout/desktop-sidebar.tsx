"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { navItems } from "@/lib/app-state";
import { getNavLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type DesktopSidebarProps = {
  pathname: string;
  open: boolean;
  showEmergency: boolean;
  onToggleSidebar: () => void;
  onToggleEmergency: () => void;
};

export function DesktopSidebar({
  pathname,
  open,
  showEmergency,
  onToggleSidebar,
  onToggleEmergency
}: DesktopSidebarProps) {
  const { t } = useLanguage();

  return (
    <aside
      className={cn(
        "hidden shrink-0 rounded-shell border border-line bg-[#f8f0e7]/90 shadow-card transition-all duration-300 lg:flex lg:flex-col",
        open ? "w-[274px] p-4" : "w-[92px] p-3"
      )}
    >
      <div className={cn("mb-4 flex items-center", open ? "justify-between px-1" : "justify-center")}>
        {open ? <BrandLogo imageClassName="h-12 w-12" textClassName="text-[1.3rem]" /> : <BrandLogo imageClassName="h-12 w-12" showText={false} />}
        <button
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-card transition hover:bg-surface-muted"
          onClick={onToggleSidebar}
          type="button"
        >
          <Icon className="text-primary" name={open ? "arrow_back" : "arrow_forward"} />
        </button>
      </div>

      <nav className="app-sidebar-scroll flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={cn(
                "flex items-center rounded-2xl transition",
                open ? "gap-3.5 px-4 py-3 text-label font-semibold" : "justify-center px-0 py-3",
                active ? "bg-primary-deep text-[#d9efe2]" : "text-foreground hover:bg-white"
              )}
              href={item.href}
              title={!open ? getNavLabel(t, item.href) : undefined}
            >
              <Icon className={cn(!open ? "text-[1.15rem]" : "")} name={item.icon} />
              {open ? <span>{getNavLabel(t, item.href)}</span> : null}
            </Link>
          );
        })}
      </nav>

      <button
        className={cn(
          "mt-4 flex items-center rounded-[20px] bg-danger-bg font-semibold text-danger transition hover:brightness-95",
          open ? "min-h-11 justify-center gap-3 px-4 text-label" : "min-h-11 justify-center px-0"
        )}
        onClick={onToggleEmergency}
        title={!open ? t.common.emergencyHelp : undefined}
        type="button"
      >
        <Icon name="emergency" />
        {open ? <span>{t.common.emergencyHelp}</span> : null}
      </button>

      {showEmergency && open ? (
        <div className="mt-4 rounded-[22px] border border-[#f0c0b8] bg-white p-4 text-sm leading-6 text-text-muted shadow-card">
          <div className="font-semibold text-danger">{t.common.emergencyChecklist}</div>
          <ul className="mt-3 space-y-2">
            <li>{t.common.emergencyStep1}</li>
            <li>{t.common.emergencyStep2}</li>
            <li>{t.common.emergencyStep3}</li>
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
