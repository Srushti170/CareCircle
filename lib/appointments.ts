import type { Appointment } from "@/lib/app-state";
import type { Locale } from "@/lib/i18n";

type NormalizedAppointment = Appointment & {
  date: string;
};

const localeMap: Record<Locale, string> = {
  en: "en-US",
  hi: "hi-IN",
  mr: "mr-IN"
};

function isValidDateKey(value?: string) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseLegacyDate(value: string) {
  const normalized = value.replace(/•/g, " ").replace(/â€¢/g, " ").replace(/\s+/g, " ").trim();
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return toDateKey(parsed);
}

export function normalizeAppointment(appointment: Appointment): NormalizedAppointment {
  if (isValidDateKey(appointment.date)) {
    return {
      ...appointment,
      date: appointment.date!
    };
  }

  return {
    ...appointment,
    date: parseLegacyDate(appointment.time) ?? toDateKey(new Date())
  };
}

export function compareAppointments(a: Appointment, b: Appointment) {
  const first = normalizeAppointment(a);
  const second = normalizeAppointment(b);
  const firstStamp = new Date(`${first.date}T${to24HourTime(first.time)}`).getTime();
  const secondStamp = new Date(`${second.date}T${to24HourTime(second.time)}`).getTime();

  if (!Number.isNaN(firstStamp) && !Number.isNaN(secondStamp) && firstStamp !== secondStamp) {
    return firstStamp - secondStamp;
  }

  return first.doctor.localeCompare(second.doctor);
}

export function formatAppointmentDate(dateKey: string, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(`${dateKey}T12:00:00`);
  return new Intl.DateTimeFormat(localeMap[locale], options ?? { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export function formatAppointmentDateTime(appointment: Appointment, locale: Locale) {
  const normalized = normalizeAppointment(appointment);
  return `${formatAppointmentDate(normalized.date, locale)} - ${formatAppointmentTime(normalized.time, locale)}`;
}

export function formatAppointmentTime(time: string, locale: Locale) {
  const parsed = new Date(`2000-01-01T${to24HourTime(time)}`);
  if (Number.isNaN(parsed.getTime())) {
    return time;
  }

  return new Intl.DateTimeFormat(localeMap[locale], {
    hour: "numeric",
    minute: "2-digit"
  }).format(parsed);
}

export function to24HourTime(time: string) {
  const parsed = new Date(`2000-01-01 ${time}`);
  if (Number.isNaN(parsed.getTime())) {
    return "09:00";
  }

  return `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
}
