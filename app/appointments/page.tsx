"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, StatusPill, Textarea } from "@/components/ui";
import { compareAppointments, formatAppointmentDate, formatAppointmentDateTime, formatAppointmentTime, normalizeAppointment } from "@/lib/appointments";
import { cn } from "@/lib/utils";

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function calendarStart(date: Date) {
  const firstDay = monthStart(date);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());
  return start;
}

function buildCalendarDays(date: Date) {
  const start = calendarStart(date);
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

function getEventTone(seed: string) {
  const palettes = [
    {
      pill: "border-[#b8d7ee] bg-[#d9ecfb] text-[#336581]",
      dot: "bg-[#5f93b6]"
    },
    {
      pill: "border-[#c0dbc7] bg-[#dceddf] text-[#355f46]",
      dot: "bg-[#568168]"
    },
    {
      pill: "border-[#ead1c9] bg-[#f7dfd8] text-[#914438]",
      dot: "bg-[#c46356]"
    },
    {
      pill: "border-[#e5d8be] bg-[#f2e7d3] text-[#7a5a30]",
      dot: "bg-[#b58a47]"
    }
  ] as const;

  if (/urgent|emergency|critical/i.test(seed)) {
    return palettes[2];
  }

  const index = seed.split("").reduce((total, char) => total + char.charCodeAt(0), 0) % palettes.length;
  return palettes[index];
}

function getAppointmentLabel(appointment: { specialty: string; doctor: string }) {
  return appointment.specialty.trim() || appointment.doctor.trim();
}

export default function AppointmentsPage() {
  const { locale, t } = useLanguage();
  const { state, addAppointment, saveAppointmentNotes, toggleAppointmentReminder } = useCare();

  const localeCode = locale === "en" ? "en-US" : locale === "hi" ? "hi-IN" : "mr-IN";
  const timeLabel = locale === "hi" ? "समय" : locale === "mr" ? "वेळ" : "Time";
  const cancelLabel = locale === "hi" ? "रद्द करें" : locale === "mr" ? "रद्द करा" : "Cancel";

  const today = new Date();
  const todayKey = toDateKey(today);

  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(today));
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [form, setForm] = useState({
    doctor: "",
    specialty: "",
    date: todayKey,
    time: "",
    location: ""
  });

  const sortedAppointments = useMemo(
    () => [...state.appointments].sort(compareAppointments).map(normalizeAppointment),
    [state.appointments]
  );

  const appointmentsByDate = useMemo(() => {
    const grouped = new Map<string, typeof sortedAppointments>();
    sortedAppointments.forEach((appointment) => {
      const existing = grouped.get(appointment.date) ?? [];
      existing.push(appointment);
      grouped.set(appointment.date, existing);
    });
    return grouped;
  }, [sortedAppointments]);

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const selectedAppointments = appointmentsByDate.get(selectedDate) ?? [];

  const weekdayLabels = useMemo(() => {
    const start = calendarStart(new Date());
    const formatter = new Intl.DateTimeFormat(localeCode, { weekday: "short" });

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return formatter.format(day);
    });
  }, [localeCode]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        month: "long",
        year: "numeric"
      }).format(visibleMonth),
    [localeCode, visibleMonth]
  );

  const selectedDateLabel = formatAppointmentDate(selectedDate, locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  useEffect(() => {
    if (!isDetailsOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDetailsOpen(false);
        setIsComposerOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDetailsOpen]);

  const openDate = (dateKey: string, compose = false) => {
    setSelectedDate(dateKey);
    setForm((current) => ({
      ...current,
      date: dateKey
    }));
    setIsComposerOpen(compose);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setIsComposerOpen(false);
  };

  return (
    <AppShell contentClassName="gap-4 py-4 lg:py-5" showFooter={false}>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-h1 font-bold tracking-[-0.025em] text-primary">{t.appointments.title}</h1>
          <p className="mt-1.5 max-w-xl text-body text-text-muted">{t.appointments.subtitle}</p>
        </div>

        <Button className="min-h-11 self-start px-4 text-sm" icon="event_available" onClick={() => openDate(selectedDate, true)}>
          {t.appointments.scheduleAppointment}
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-b border-line px-4 py-3.5 md:px-5 md:py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-h2 font-semibold text-primary">{t.appointments.calendarView}</h2>
            <p className="mt-1 text-sm text-text-muted">{t.appointments.calendarHelp}</p>
          </div>

          <div className="flex flex-nowrap items-center gap-2 self-start">
            <Button className="min-h-10 px-3.5 text-sm" icon="sync" variant="secondary" onClick={() => setVisibleMonth(monthStart(today))}>
              {t.common.today}
            </Button>
            <Button
              aria-label={t.appointments.monthPrevious}
              className="h-10 min-h-10 min-w-10 px-0"
              icon="arrow_back"
              variant="secondary"
              onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
            >
              <span className="sr-only">{t.appointments.monthPrevious}</span>
            </Button>
            <div className="min-w-[10rem] rounded-full border border-line bg-surface-muted px-3.5 py-2 text-center text-sm font-semibold text-primary md:min-w-[10.8rem]">
              {monthLabel}
            </div>
            <Button
              aria-label={t.appointments.monthNext}
              className="h-10 min-h-10 min-w-10 px-0"
              icon="arrow_forward"
              variant="secondary"
              onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
            >
              <span className="sr-only">{t.appointments.monthNext}</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-t border-line bg-[#faf7f2]">
          {weekdayLabels.map((label) => (
            <div
              className="border-b border-r border-line px-1.5 py-2 text-center text-[0.82rem] font-semibold text-text-muted last:border-r-0 md:text-sm"
              key={label}
            >
              {label}
            </div>
          ))}

          {calendarDays.map((date) => {
            const dateKey = toDateKey(date);
            const dateAppointments = appointmentsByDate.get(dateKey) ?? [];
            const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
            const isSelected = dateKey === selectedDate && isDetailsOpen;
            const isToday = dateKey === todayKey;

            return (
              <button
                className={cn(
                  "flex min-h-[4.55rem] flex-col gap-1 border-b border-r border-line bg-white px-2 py-1.5 text-left transition last:border-r-0 md:min-h-[5rem] lg:min-h-[5.15rem] xl:min-h-[5.4rem]",
                  isSelected && "bg-[#eef6f1]",
                  !isCurrentMonth && "bg-[#fbf8f3] text-[#b5ada0]",
                  !isSelected && "hover:bg-[#f8f5ef]",
                  dateAppointments.length > 0 && isCurrentMonth && "bg-[#fffdfa]",
                  isToday && "ring-1 ring-inset ring-primary/35"
                )}
                key={dateKey}
                onClick={() => {
                  setVisibleMonth(monthStart(date));
                  openDate(dateKey, false);
                }}
                type="button"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={cn(
                        "text-[0.82rem] font-semibold md:text-[0.9rem]",
                        isCurrentMonth ? "text-foreground" : "text-[#b5ada0]",
                        isToday && "text-primary"
                      )}
                  >
                    {date.getDate()}
                  </span>
                  {dateAppointments.length > 0 ? (
                    <span className="text-[0.72rem] font-semibold text-text-muted">{dateAppointments.length}</span>
                  ) : null}
                </div>

                <div className="space-y-1">
                  {dateAppointments.slice(0, 1).map((appointment) => {
                    const tone = getEventTone(`${appointment.specialty}-${appointment.doctor}`);

                    return (
                      <div
                        className={cn(
                          "flex items-center gap-1 overflow-hidden rounded-md border px-1.5 py-[0.22rem] text-[0.62rem] font-medium leading-tight md:text-[0.68rem]",
                          tone.pill
                        )}
                        key={appointment.id}
                      >
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", tone.dot)} />
                        <span className="truncate">{getAppointmentLabel(appointment)}</span>
                      </div>
                    );
                  })}

                  {dateAppointments.length > 1 ? (
                    <div className="pt-0.5 text-[0.64rem] font-semibold text-text-muted md:text-[0.7rem]">
                      +{dateAppointments.length - 1} more
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {isDetailsOpen ? (
        <div className="fixed inset-0 z-50 bg-[#1f1a14]/30 px-4 py-6 backdrop-blur-[2px]" onClick={closeDetails}>
          <div className="mx-auto flex h-full max-w-3xl items-start justify-center">
            <div className="mt-6 w-full" onClick={(event) => event.stopPropagation()}>
              <Card className="max-h-[calc(100vh-3rem)] overflow-hidden">
                <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 md:px-6 md:py-6">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.01em] text-text-muted">{t.appointments.detailsForDate}</p>
                    <h2 className="mt-1 text-h2 font-semibold text-primary">{selectedDateLabel}</h2>
                  </div>

                  <button
                    aria-label={cancelLabel}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-primary transition hover:bg-surface-muted"
                    onClick={closeDetails}
                    type="button"
                  >
                    <Icon className="rotate-45 text-[1.2rem]" name="add" />
                  </button>
                </div>

                <div className="max-h-[calc(100vh-10rem)] space-y-5 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
                  {selectedAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedAppointments.map((appointment) => {
                        const tone = getEventTone(`${appointment.specialty}-${appointment.doctor}`);

                        return (
                          <div className="rounded-[24px] border border-line bg-[#fffdfa] p-4 md:p-5" key={appointment.id}>
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold", tone.pill)}>
                                    <span className={cn("h-2 w-2 rounded-full", tone.dot)} />
                                    {getAppointmentLabel(appointment)}
                                  </span>
                                  <StatusPill tone={appointment.reminder ? "success" : "warning"}>
                                    {appointment.reminder ? t.appointments.reminderOn : t.appointments.reminderOff}
                                  </StatusPill>
                                </div>

                                <h3 className="mt-3 text-h3 font-semibold text-foreground">{appointment.doctor}</h3>
                                <div className="mt-1 text-body text-text-muted">{appointment.specialty}</div>

                                <div className="mt-4 space-y-2 text-sm text-text-muted">
                                  <div className="flex items-center gap-2">
                                    <Icon className="text-[1rem]" name="event" />
                                    <span>{formatAppointmentDateTime(appointment, locale)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon className="text-[1rem]" name="location_on" />
                                    <span>{appointment.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                              <Button variant="secondary">{t.appointments.getDirections}</Button>
                              <Button onClick={() => toggleAppointmentReminder(appointment.id)} variant="ghost">
                                {appointment.reminder ? t.appointments.turnReminderOff : t.appointments.setReminder}
                              </Button>
                            </div>

                            <Field label={t.appointments.visitNotes}>
                              <Textarea
                                className="mt-3"
                                onChange={(event) => saveAppointmentNotes(appointment.id, event.target.value)}
                                placeholder={t.appointments.visitNotesPlaceholder}
                                value={appointment.notes}
                              />
                            </Field>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-line bg-surface-muted px-5 py-6">
                      <h3 className="text-h3 font-semibold text-primary">{t.appointments.noAppointmentsForDate}</h3>
                      <p className="mt-2 text-body text-text-muted">{t.appointments.scheduleHint}</p>
                    </div>
                  )}

                  <div className="rounded-[24px] border border-line bg-[#f8f4ee] p-4 md:p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-h3 font-semibold text-primary">{t.appointments.scheduleAppointment}</h3>
                        <p className="mt-1 text-body text-text-muted">
                          {t.appointments.scheduleForDate}: {selectedDateLabel}
                        </p>
                      </div>

                      {!isComposerOpen ? (
                        <Button icon="add_circle" onClick={() => setIsComposerOpen(true)}>
                          {t.appointments.scheduleForDate}
                        </Button>
                      ) : null}
                    </div>

                    {isComposerOpen ? (
                      <form
                        className="mt-5 grid gap-4 md:grid-cols-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (!form.doctor || !form.specialty || !form.date || !form.time || !form.location) {
                            return;
                          }

                          addAppointment(form);
                          setSelectedDate(form.date);
                          setVisibleMonth(monthStart(new Date(`${form.date}T12:00:00`)));
                          setForm({
                            doctor: "",
                            specialty: "",
                            date: form.date,
                            time: "",
                            location: ""
                          });
                          setIsComposerOpen(false);
                        }}
                      >
                        <Field label={t.appointments.doctorName}>
                          <Input
                            onChange={(event) => setForm((current) => ({ ...current, doctor: event.target.value }))}
                            placeholder={t.appointments.doctorPlaceholder}
                            value={form.doctor}
                          />
                        </Field>

                        <Field label={t.appointments.specialty}>
                          <Input
                            onChange={(event) => setForm((current) => ({ ...current, specialty: event.target.value }))}
                            placeholder={t.appointments.specialtyPlaceholder}
                            value={form.specialty}
                          />
                        </Field>

                        <Field label={t.appointments.date}>
                          <Input
                            onChange={(event) => {
                              const nextDate = event.target.value;
                              setForm((current) => ({ ...current, date: nextDate }));
                              if (nextDate) {
                                setSelectedDate(nextDate);
                                setVisibleMonth(monthStart(new Date(`${nextDate}T12:00:00`)));
                              }
                            }}
                            type="date"
                            value={form.date}
                          />
                        </Field>

                        <Field label={timeLabel}>
                          <Input
                            onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))}
                            type="time"
                            value={form.time}
                          />
                        </Field>

                        <Field label={t.appointments.location}>
                          <Input
                            onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                            placeholder={t.appointments.locationPlaceholder}
                            value={form.location}
                          />
                        </Field>

                        <div className="flex flex-wrap items-end gap-3 md:col-span-2">
                          <Button icon="event_available" type="submit">
                            {t.appointments.saveAppointment}
                          </Button>
                          <Button onClick={() => setIsComposerOpen(false)} type="button" variant="ghost">
                            {cancelLabel}
                          </Button>
                        </div>
                      </form>
                    ) : selectedAppointments.length > 0 ? null : (
                      <p className="mt-4 text-body text-text-muted">{t.appointments.selectDatePrompt}</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
