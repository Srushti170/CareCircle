"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useCare } from "@/components/care-provider";
import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { useLanguage } from "@/components/language-provider";
import { navItems } from "@/lib/app-state";
import { getNavLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  showFooter = true,
  contentClassName
}: {
  children: React.ReactNode;
  showFooter?: boolean;
  contentClassName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { currentUser, hydrated, isAuthenticated, state } = useCare();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (currentUser?.role === "Primary Caregiver" && !state.onboarding.completed) {
      router.replace("/onboarding");
    }
  }, [currentUser, hydrated, isAuthenticated, router, state.onboarding.completed]);

  const quickResults = useMemo(() => {
    const haystack = [
      ...navItems.map((item) => ({ href: item.href, label: getNavLabel(t, item.href) })),
      ...state.tasks.slice(0, 4).map((item) => ({ href: "/tasks", label: item.title })),
      ...state.medications.slice(0, 4).map((item) => ({ href: "/medications", label: item.name })),
      ...state.documents.slice(0, 4).map((item) => ({ href: "/documents", label: item.name }))
    ];
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }
    return haystack.filter((item) => item.label.toLowerCase().includes(normalized)).slice(0, 6);
  }, [query, state.documents, state.medications, state.tasks, t]);

  if (!hydrated || !isAuthenticated || (currentUser?.role === "Primary Caregiver" && !state.onboarding.completed)) {
    return null;
  }

  return (
    <div className="min-h-screen app-shell-bg">
      <AppHeader
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
        onQueryChange={setQuery}
        onQueryClear={() => setQuery("")}
        query={query}
        quickResults={quickResults}
      />

      <MobileSidebar
        onClose={() => setMobileMenuOpen(false)}
        onQueryChange={setQuery}
        open={mobileMenuOpen}
        pathname={pathname}
        query={query}
      />

      <div className={cn("mx-auto flex max-w-[1400px] gap-6 px-4 py-6 md:px-6 lg:py-8", contentClassName)}>
        <DesktopSidebar
          onToggleEmergency={() => setShowEmergency((current) => !current)}
          onToggleSidebar={() => setSidebarOpen((current) => !current)}
          open={sidebarOpen}
          pathname={pathname}
          showEmergency={showEmergency}
        />

        <div className="min-w-0 flex-1 pb-24 lg:pb-0">
          {children}
          {showFooter ? <AppFooter /> : null}
        </div>
      </div>

      <MobileNav pathname={pathname} />
    </div>
  );
}
