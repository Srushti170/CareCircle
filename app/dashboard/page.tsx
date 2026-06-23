"use client";

import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, PageHeader, StatusPill } from "@/components/ui";
import { compareAppointments, formatAppointmentDate, formatAppointmentTime, normalizeAppointment } from "@/lib/appointments";

export default function DashboardPage() {
  const { locale, t } = useLanguage();
  const { state, toggleTask } = useCare();

  const latestPending = state.medications.filter((item) => item.status !== "Taken").slice(0, 2);
  const upcomingAppointment = state.appointments.length > 0 ? normalizeAppointment([...state.appointments].sort(compareAppointments)[0]) : null;
  const todayTasks = state.tasks.filter((item) => !item.completed).slice(0, 2);
  const latestFeed = state.feed.slice(0, 3);

  return (
    <AppShell>
      <PageHeader subtitle={t.dashboard.subtitle} title={t.dashboard.greeting} />

      <div className="grid gap-5 xl:grid-cols-[1.32fr_0.68fr]">
        <div className="space-y-5">
          <Card className="p-5 md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <img
                alt="Patient portrait"
                className="h-28 w-28 rounded-full border-[5px] border-accent object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_6AJwTTNz_stzDTfpJrryifIxBbToEcoG6DZOOLZKejk4tUm6-1zYsTW-XJegyE-80nNbMqQpvghDYmISMg2ku6tw4Ba5c9R_9lfhf-hXQlWI7Rik0hRpwOJIaS5NlpCGpUiVae3ZZ1Bm-oIcD84T4bc3K-7YAGkON9gniyiydyVtjl_amsvy15wIQfy0s0jwxEETJF3cIF9WwQh7X57nv2TGk3ev-koWqw5TCr7jtsyI4QLy-n-Uew"
              />
              <div className="flex-1">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <h2 className="text-[2.1rem] font-bold leading-[1.02] tracking-[-0.03em] text-primary md:text-[2.35rem]">
                    {t.dashboard.patientStatus}
                  </h2>
                  <StatusPill tone={state.patient.mood === "Unwell" ? "danger" : state.patient.mood === "Tired" ? "warning" : "success"}>
                    <span className="flex items-center gap-2">
                      <Icon className="text-[1rem]" name="sentiment_satisfied" />
                      {t.dashboard.mood}: {t.values.moods[state.patient.mood as keyof typeof t.values.moods] ?? state.patient.mood}
                    </span>
                  </StatusPill>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-primary">
                      <Icon name="history" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted">{t.dashboard.lastMedication}</div>
                      <div className="text-h3 font-semibold">{state.patient.lastMedication}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-primary">
                      <Icon name="dark_mode" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted">{t.dashboard.sleepQuality}</div>
                      <div className="text-h3 font-semibold">
                        {state.patient.sleepHours} {t.health.sleepShort}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-[1.28rem] font-semibold tracking-[-0.01em] text-primary md:text-h2">
                {t.dashboard.todaysMedications}
              </h3>
              <Link className="flex items-center gap-2 text-sm font-semibold text-primary md:text-label" href="/medications">
                <Icon name="arrow_forward" />
                {t.dashboard.openPage}
              </Link>
            </div>

            <div className="space-y-3">
              {latestPending.map((item) => (
                <div className="flex flex-col gap-3 rounded-[24px] border border-line p-4 md:flex-row md:items-center md:justify-between" key={item.id}>
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dbf1e3] text-primary">
                      <Icon className="text-[1.35rem]" name={item.icon} />
                    </div>
                    <div>
                      <div className="text-h3 font-semibold">{item.name}</div>
                      <div className="text-body text-text-muted">{item.dose} • {item.time}</div>
                    </div>
                  </div>
                  <StatusPill tone={item.status === "Missed" ? "danger" : "warning"}>
                    {t.values.statuses[item.status as keyof typeof t.values.statuses] ?? item.status}
                  </StatusPill>
                </div>
              ))}
              {latestPending.length === 0 ? (
                <div className="rounded-[22px] bg-surface-muted p-4 text-body text-text-muted">{t.dashboard.allTaken}</div>
              ) : null}
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="bg-[#f9f1e8] p-5 md:p-6">
              <h3 className="text-h2 font-semibold text-primary">{t.dashboard.appointments}</h3>
              {upcomingAppointment ? (
                <div className="mt-5 rounded-[22px] bg-white p-4">
                  <div className="flex items-start gap-3.5">
                    <div className="rounded-[16px] bg-[#2f6784] px-4 py-3 text-center text-white">
                      <div className="text-[1.15rem] font-bold leading-none">
                        {formatAppointmentTime(upcomingAppointment.time, locale)}
                      </div>
                    </div>
                    <div>
                      <div className="text-h3 font-semibold">{upcomingAppointment.doctor}</div>
                      <div className="mt-1 text-body text-text-muted">{upcomingAppointment.specialty} • {upcomingAppointment.location}</div>
                      <div className="mt-1 text-sm text-text-muted">{formatAppointmentDate(upcomingAppointment.date, locale)}</div>
                      <Link className="mt-3 inline-block text-sm font-semibold text-primary underline" href="/appointments">
                        {t.dashboard.manageAppointment}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 rounded-[22px] bg-white p-4 text-body text-text-muted">{t.dashboard.noAppointment}</div>
              )}
            </Card>

            <Card className="bg-[#eae1d7] p-5 md:p-6">
              <h3 className="text-h2 font-semibold text-primary">{t.dashboard.todaysTasks}</h3>
              <div className="mt-5 space-y-3">
                {todayTasks.map((task) => (
                  <button
                    className="flex w-full items-center gap-3 rounded-[18px] bg-white px-4 py-4 text-left transition hover:border hover:border-primary/20 hover:bg-[#fffdf9]"
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    type="button"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-[10px] border border-[#868078] text-primary">
                      <Icon className="text-[18px]" name="check" />
                    </span>
                    <span className="text-label font-semibold">{task.title}</span>
                  </button>
                ))}
                {todayTasks.length === 0 ? (
                  <div className="rounded-[18px] bg-white px-4 py-4 text-body text-text-muted">{t.dashboard.allCaughtUp}</div>
                ) : null}
              </div>
            </Card>
          </div>
        </div>

        <Card className="flex flex-col bg-[#f8f0e6] p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-h2 font-semibold text-primary">{t.dashboard.familyFeed}</h3>
            <Icon className="text-text-muted" name="forum" />
          </div>
          <div className="space-y-3">
            {latestFeed.map((item, index) => (
              <div className={`flex gap-3.5 rounded-[20px] ${index === 0 ? "border border-line bg-white p-4 shadow-card" : "p-2"}`} key={item.id}>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-semibold ${item.tone}`}>
                  {item.user}
                </div>
                <div>
                  <div className="text-label font-semibold leading-snug">{item.title}</div>
                  <div className="mt-1 text-sm text-text-muted">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
          <Link className="mt-auto" href="/activity">
            <Button className="w-full" variant="secondary">
              {t.dashboard.viewFullFeed}
            </Button>
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}
