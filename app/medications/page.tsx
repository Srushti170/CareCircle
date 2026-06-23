"use client";

import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader, Select, StatusPill } from "@/components/ui";
import type { MedicationPeriod } from "@/lib/app-state";

function MedCard({
  item,
  onStatus,
  labels
}: {
  item: {
    id: string;
    name: string;
    dose: string;
    time: string;
    status: string;
    note?: string;
    icon: string;
  };
  onStatus: (id: string, status: "Taken" | "Skipped" | "Missed") => void;
  labels: {
    markAsTaken: string;
    skip: string;
    missed: string;
  };
}) {
  const tone = item.status === "Taken" ? "success" : item.status === "Missed" ? "danger" : "warning";
  return (
    <Card className={`p-5 ${item.status === "Missed" ? "border-[#f1c5bc]" : "bg-white"}`}>
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-surface-muted text-primary">
            <Icon className="text-[30px]" name={item.icon} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-h3 font-semibold">{item.name}</h3>
                <p className="text-body text-text-muted">
                  {item.dose} • {item.time}
                </p>
              </div>
              <StatusPill tone={tone as "success" | "warning" | "danger"}>{item.status}</StatusPill>
            </div>
            {item.note ? <p className="mt-4 text-body text-text-muted">{item.note}</p> : null}
          </div>
        </div>
        {item.status !== "Taken" ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <Button className="w-full" icon="check_circle" onClick={() => onStatus(item.id, "Taken")}>
              {labels.markAsTaken}
            </Button>
            <Button className="w-full" onClick={() => onStatus(item.id, "Skipped")} variant="ghost">
              {labels.skip}
            </Button>
            <Button className="w-full" onClick={() => onStatus(item.id, "Missed")} variant="danger">
              {labels.missed}
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default function MedicationsPage() {
  const { t } = useLanguage();
  const { state, addMedication, updateMedicationStatus } = useCare();
  const [form, setForm] = useState({
    name: "",
    dose: "",
    time: "",
    period: "Morning" as MedicationPeriod
  });

  const grouped = useMemo(
    () => ({
      Morning: state.medications.filter((item) => item.period === "Morning"),
      Afternoon: state.medications.filter((item) => item.period === "Afternoon"),
      Evening: state.medications.filter((item) => item.period === "Evening"),
      Night: state.medications.filter((item) => item.period === "Night")
    }),
    [state.medications]
  );

  const adherence = Math.round(
    (state.medications.filter((item) => item.status === "Taken").length / Math.max(state.medications.length, 1)) * 100
  );

  const periodLabels: Record<MedicationPeriod, string> = {
    Morning: t.medications.morning,
    Afternoon: t.medications.afternoon,
    Evening: t.medications.evening,
    Night: t.medications.night
  };

  return (
    <AppShell>
      <PageHeader
        action={
          <div className="rounded-[26px] bg-white p-4 shadow-card">
            <div className="text-sm font-semibold text-text-muted">{t.medications.currentPatient}</div>
            <div className="mt-2 text-h3 font-semibold text-primary">{state.patient.fullName}</div>
          </div>
        }
        subtitle={t.medications.subtitle}
        title={t.medications.title}
      />

      <Card className="mb-8 p-6">
        <h2 className="text-h2 font-semibold text-primary">{t.medications.addNewMedication}</h2>
        <form
          className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!form.name || !form.dose || !form.time) {
              return;
            }
            addMedication(form);
            setForm({ name: "", dose: "", time: "", period: "Morning" });
          }}
        >
          <Field label={t.medications.medicineName}>
            <Input onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder={t.medications.medicineNamePlaceholder} value={form.name} />
          </Field>
          <Field label={t.medications.dose}>
            <Input onChange={(event) => setForm((current) => ({ ...current, dose: event.target.value }))} placeholder={t.medications.dosePlaceholder} value={form.dose} />
          </Field>
          <Field label={t.medications.time}>
            <Input onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} placeholder="8:30 AM" value={form.time} />
          </Field>
          <Field label={t.medications.period}>
            <Select onChange={(event) => setForm((current) => ({ ...current, period: event.target.value as MedicationPeriod }))} value={form.period}>
              {(["Morning", "Afternoon", "Evening", "Night"] as MedicationPeriod[]).map((period) => (
                <option key={period} value={period}>
                  {periodLabels[period]}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex items-end">
            <Button className="w-full" icon="add" type="submit">
              {t.medications.addMedication}
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-8 xl:grid-cols-2">
        {[
          { title: t.medications.morning, icon: "wb_sunny", items: grouped.Morning },
          { title: t.medications.afternoon, icon: "light_mode", items: grouped.Afternoon },
          { title: t.medications.evening, icon: "wb_twilight", items: grouped.Evening },
          { title: t.medications.night, icon: "dark_mode", items: grouped.Night }
        ].map((group) => (
          <section key={group.title}>
            <h2 className="mb-5 flex items-center gap-3 text-h2 font-semibold text-primary">
              <Icon name={group.icon} />
              {group.title}
            </h2>
            <div className="space-y-5">
              {group.items.map((item) => (
                <MedCard
                  item={{
                    ...item,
                    status: t.values.statuses[item.status as keyof typeof t.values.statuses] ?? item.status
                  }}
                  key={item.id}
                  labels={{
                    markAsTaken: t.medications.markAsTaken,
                    skip: t.medications.skip,
                    missed: t.medications.missed
                  }}
                  onStatus={updateMedicationStatus}
                />
              ))}
              {group.items.length === 0 ? (
                <EmptyState
                  icon={group.icon}
                  title={group.title}
                  description={t.medications.noMedicines}
                />
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <Card className="mt-8 p-7">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr_auto] lg:items-center">
          <div className="mx-auto flex h-[160px] w-[160px] items-center justify-center rounded-full border-[10px] border-primary border-l-surface-muted text-center">
            <div>
              <div className="text-[3rem] font-bold leading-none">{adherence}%</div>
              <div className="mt-1 text-label text-text-muted">{t.medications.daily}</div>
            </div>
          </div>
          <div>
            <h3 className="text-h2 font-semibold text-primary">{t.medications.greatJob}</h3>
            <p className="mt-3 max-w-xl text-body text-text-muted">
              {state.medications.filter((item) => item.status === "Taken").length} / {state.medications.length} {t.medications.adherenceLine}
            </p>
          </div>
          <Button className="w-full lg:w-auto" variant="secondary">
            {t.medications.detailedLog}
          </Button>
        </div>
      </Card>
    </AppShell>
  );
}
