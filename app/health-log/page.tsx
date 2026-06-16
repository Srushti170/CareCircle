"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader, Textarea } from "@/components/ui";

export default function HealthLogPage() {
  const { t } = useLanguage();
  const { state, addHealthLog } = useCare();
  const [form, setForm] = useState({
    mood: state.patient.mood,
    painLevel: state.patient.painLevel,
    sleepHours: state.patient.sleepHours,
    bloodPressure: state.patient.bloodPressure,
    sugarLevel: state.patient.sugarLevel,
    notes: ""
  });

  const recentLogs = state.healthLogs.slice(0, 4);
  const moodOptions = [
    { value: "Happy", emoji: "😊", tone: "bg-accent" },
    { value: "Neutral", emoji: "😐", tone: "bg-accent" },
    { value: "Tired", emoji: "😴", tone: "bg-accent" },
    { value: "Unwell", emoji: "🤒", tone: "bg-danger-bg" }
  ] as const;

  return (
    <AppShell>
      <PageHeader subtitle={t.health.subtitle} title={t.health.title} />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-h2 font-semibold">{t.health.howFeeling}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {moodOptions.map(({ value, emoji, tone }) => (
                <button
                  className={`rounded-[22px] border-2 p-5 text-center transition ${form.mood === value ? `border-primary ${tone}` : "border-transparent bg-surface-muted"}`}
                  key={value}
                  onClick={() => setForm((current) => ({ ...current, mood: value }))}
                  type="button"
                >
                  <div className="text-4xl">{emoji}</div>
                  <div className="mt-3 text-label font-semibold">{t.values.moods[value]}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <form
              className="grid gap-6 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                addHealthLog({
                  date: new Date().toISOString().slice(0, 10),
                  mood: form.mood,
                  painLevel: Number(form.painLevel),
                  sleepHours: Number(form.sleepHours),
                  bloodPressure: form.bloodPressure,
                  sugarLevel: Number(form.sugarLevel),
                  notes: form.notes
                });
              }}
            >
              <Field label={t.health.painLevel}>
                <Input max="10" min="1" onChange={(event) => setForm((current) => ({ ...current, painLevel: Number(event.target.value) }))} type="number" value={form.painLevel} />
              </Field>
              <Field label={t.health.sleepHours}>
                <Input onChange={(event) => setForm((current) => ({ ...current, sleepHours: Number(event.target.value) }))} type="number" value={form.sleepHours} />
              </Field>
              <Field label={t.health.bloodPressure}>
                <Input onChange={(event) => setForm((current) => ({ ...current, bloodPressure: event.target.value }))} value={form.bloodPressure} />
              </Field>
              <Field label={t.health.sugarLevel}>
                <Input onChange={(event) => setForm((current) => ({ ...current, sugarLevel: Number(event.target.value) }))} type="number" value={form.sugarLevel} />
              </Field>
              <div className="md:col-span-2">
                <Field label={t.health.notes}>
                  <Textarea onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} placeholder={t.health.notesPlaceholder} value={form.notes} />
                </Field>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button icon="save" type="submit">{t.health.saveLog}</Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#f7efe6] p-6">
            <h3 className="text-h2 font-semibold text-primary">{t.health.currentSnapshot}</h3>
            <div className="mt-5 space-y-4">
              {[
                [t.dashboard.mood, t.values.moods[state.patient.mood as keyof typeof t.values.moods] ?? state.patient.mood],
                [t.health.pain, `${state.patient.painLevel} / 10`],
                [t.health.sleepShort, `${state.patient.sleepHours}`],
                [t.health.bloodPressure, state.patient.bloodPressure],
                [t.health.sugar, `${state.patient.sugarLevel} mg/dL`]
              ].map(([label, value]) => (
                <div className="flex items-center justify-between rounded-[20px] bg-white px-4 py-4" key={label}>
                  <span className="text-label font-medium">{label}</span>
                  <span className="text-label text-text-muted">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-h2 font-semibold text-primary">{t.health.recentCheckins}</h3>
            <div className="mt-5 space-y-4">
              {recentLogs.length === 0 ? (
                <EmptyState
                  icon="monitor_heart"
                  title={t.health.recentCheckins}
                  description="No daily logs checked in yet. Log vitals and mood to start tracking health trends."
                />
              ) : (
                recentLogs.map((item) => (
                  <div className="rounded-[20px] bg-surface-muted px-4 py-4" key={item.id}>
                    <div className="flex items-center justify-between">
                      <span className="text-label font-medium">{item.date}</span>
                      <span className="text-label text-text-muted">{t.values.moods[item.mood as keyof typeof t.values.moods] ?? item.mood}</span>
                    </div>
                    <div className="mt-2 text-sm text-text-muted">
                      {t.health.pain} {item.painLevel} • {t.health.sleepShort} {item.sleepHours}h • BP {item.bloodPressure} • {t.health.sugar} {item.sugarLevel}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
