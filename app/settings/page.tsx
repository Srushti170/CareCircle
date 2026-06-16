"use client";

import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, PageHeader, Select, StatusPill } from "@/components/ui";
import { getAuthCopy } from "@/lib/auth-copy";
import type { Locale } from "@/lib/i18n";

export default function SettingsPage() {
  const { t, locale, setLocale } = useLanguage();
  const copy = getAuthCopy(locale);
  const { state, updateCarePreference, updateSetting, syncLocale } = useCare();

  return (
    <AppShell>
      <PageHeader action={<Button icon="save">{t.common.savedAutomatically}</Button>} subtitle={t.settings.subtitle} title={t.settings.title} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_0.8fr]">
        <Card className="p-6">
          <h2 className="text-h2 font-semibold text-primary">{t.settings.displayAndLanguage}</h2>
          <div className="mt-6 space-y-5">
            <div className="rounded-[22px] bg-surface-muted p-5">
              <Field label={t.settings.textSize}>
                <Select
                  onChange={(event) => updateSetting("textSize", event.target.value as "Standard" | "Large")}
                  value={state.settings.textSize}
                >
                  <option value="Standard">{t.settings.standard}</option>
                  <option value="Large">{t.settings.large}</option>
                </Select>
              </Field>
            </div>
            <div className="rounded-[22px] bg-surface-muted p-5">
              <Field label={t.settings.language}>
                <Select
                  onChange={(event) => {
                    const next = event.target.value as Locale;
                    setLocale(next);
                    syncLocale(next);
                  }}
                  value={locale}
                >
                  <option value="en">English</option>
                  <option value="hi">{t.settings.hindi}</option>
                  <option value="mr">{t.settings.marathi}</option>
                </Select>
              </Field>
            </div>
            <div className="rounded-[22px] bg-surface-muted p-5">
              <Field label={t.settings.contrast}>
                <Select
                  onChange={(event) => updateSetting("contrast", event.target.value as "Standard" | "High")}
                  value={state.settings.contrast}
                >
                  <option value="Standard">{t.settings.standard}</option>
                  <option value="High">{t.settings.high}</option>
                </Select>
              </Field>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-h2 font-semibold text-primary">{t.settings.carePreferences}</h2>
          <div className="mt-6 space-y-5">
            {[
              ["medicationReminders", t.settings.medicineReminders],
              ["appointmentAlerts", t.settings.appointmentAlerts],
              ["dailyHealthSummary", t.settings.dailyHealthSummary],
              ["quietHours", t.settings.quietHours]
            ].map(([key, label]) => {
              const settingKey = key as keyof typeof state.settings.carePreferences;
              const enabled = state.settings.carePreferences[settingKey];
              return (
                <div className="flex items-center justify-between rounded-[22px] bg-white p-5 shadow-card" key={key}>
                  <div className="text-label font-semibold">{label}</div>
                  <button
                    aria-pressed={enabled}
                    className={`flex h-10 w-20 items-center rounded-full p-1 ${enabled ? "justify-end bg-primary" : "justify-start bg-[#dfd6cc]"}`}
                    onClick={() => updateCarePreference(settingKey)}
                    type="button"
                  >
                    <span className="h-8 w-8 rounded-full bg-white" />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="bg-[#f8f0e6] p-6">
          <h2 className="text-h2 font-semibold text-primary">{t.settings.familyAccess}</h2>
          <div className="mt-6 space-y-4">
            {state.familyMembers.map((memberItem) => (
              <div className="rounded-[22px] bg-white p-4" key={memberItem.id}>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-label font-semibold">{memberItem.name}</div>
                  <StatusPill>{copy.roles[memberItem.role]}</StatusPill>
                </div>
                {memberItem.email ? <div className="mt-2 text-sm text-text-muted">{memberItem.email}</div> : null}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[22px] bg-white p-4 text-body text-text-muted shadow-card">
            {copy.helperInviteCode}
          </div>
          <Link className="mt-5 block" href="/invite">
            <Button className="w-full" icon="person_add">
              {copy.inviteTitle}
            </Button>
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}
