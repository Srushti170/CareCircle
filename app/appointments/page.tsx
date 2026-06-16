"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader, StatusPill, Textarea } from "@/components/ui";

export default function AppointmentsPage() {
  const { t } = useLanguage();
  const { state, addAppointment, saveAppointmentNotes, toggleAppointmentReminder } = useCare();
  const [form, setForm] = useState({
    doctor: "",
    specialty: "",
    time: "",
    location: ""
  });

  return (
    <AppShell>
      <PageHeader action={<Button icon="add_circle">{t.appointments.scheduleAppointment}</Button>} subtitle={t.appointments.subtitle} title={t.appointments.title} />

      <Card className="mb-8 p-6">
        <h2 className="text-h2 font-semibold text-primary">{t.appointments.scheduleAppointment}</h2>
        <form
          className="mt-5 grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (!form.doctor || !form.specialty || !form.time || !form.location) {
              return;
            }
            addAppointment(form);
            setForm({ doctor: "", specialty: "", time: "", location: "" });
          }}
        >
          <Field label={t.appointments.doctorName}>
            <Input onChange={(event) => setForm((current) => ({ ...current, doctor: event.target.value }))} value={form.doctor} />
          </Field>
          <Field label={t.appointments.specialty}>
            <Input onChange={(event) => setForm((current) => ({ ...current, specialty: event.target.value }))} value={form.specialty} />
          </Field>
          <Field label={t.appointments.dateAndTime}>
            <Input onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} placeholder="Jun 18, 2026 • 11:00 AM" value={form.time} />
          </Field>
          <Field label={t.appointments.location}>
            <Input onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} value={form.location} />
          </Field>
          <div className="md:col-span-2">
            <Button icon="event_available" type="submit">
              {t.appointments.saveAppointment}
            </Button>
          </div>
        </form>
      </Card>

      <section>
        <h2 className="mb-5 flex items-center gap-3 text-h2 font-semibold text-primary">
          <Icon name="calendar_today" />
          {t.appointments.upcomingVisits}
        </h2>
        {state.appointments.length === 0 ? (
          <EmptyState
            icon="calendar_today"
            title={t.appointments.upcomingVisits}
            description="No medical appointments or visits scheduled. Add one above to keep the family informed."
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {state.appointments.map((appointment, index) => (
              <Card className="p-6 md:p-7" key={appointment.id}>
                <div className="flex flex-col gap-5 md:flex-row">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-[20px] ${index % 2 === 0 ? "bg-accent text-primary" : "bg-accent2 text-[#335d73]"}`}>
                    <Icon className="text-[30px]" name={index % 2 === 0 ? "stethoscope" : "visibility"} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-h3 font-semibold">{appointment.doctor}</h3>
                        <p className="mt-1 text-body text-text-muted">{t.seed.appointments[appointment.id as keyof typeof t.seed.appointments]?.specialty ?? appointment.specialty}</p>
                      </div>
                      <StatusPill tone={appointment.reminder ? "success" : "warning"}>{appointment.reminder ? t.appointments.reminderOn : t.appointments.reminderOff}</StatusPill>
                    </div>
                    <div className="mt-5 space-y-3 text-body text-text-muted">
                      <div className="flex items-center gap-3">
                        <Icon className="text-[20px]" name="event" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon className="text-[20px]" name="location_on" />
                        <span>{t.seed.appointments[appointment.id as keyof typeof t.seed.appointments]?.location ?? appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 border-t border-line pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">{t.appointments.getDirections}</Button>
                    <Button onClick={() => toggleAppointmentReminder(appointment.id)} variant="ghost">
                      {appointment.reminder ? t.appointments.turnReminderOff : t.appointments.setReminder}
                    </Button>
                  </div>
                  <Field label={t.appointments.visitNotes}>
                    <Textarea
                      onChange={(event) => saveAppointmentNotes(appointment.id, event.target.value)}
                      placeholder={t.appointments.visitNotesPlaceholder}
                      value={appointment.notes}
                    />
                  </Field>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
