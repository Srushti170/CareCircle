import type { Locale } from "@/lib/i18n";

export type MedicationPeriod = "Morning" | "Afternoon" | "Evening" | "Night";
export type MedicationStatus = "Taken" | "Pending" | "Missed" | "Upcoming" | "Skipped";
export type TaskTag = "Important" | "Routine" | "Follow-up" | "Daily";
export type DocumentCategory = "Prescriptions" | "Lab Reports" | "Discharge Papers" | "Identity Docs" | "Other";
export type FeedBadge = "DONE" | "GOOD DAY" | "NEW FILE" | "UPDATE";
export type CareRole = "Primary Caregiver" | "Family Member" | "Patient";

export type UserAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: CareRole;
  circleId: string | null;
};

export type CircleInvite = {
  id: string;
  code: string;
  circleId: string;
  name: string;
  email: string;
  role: Exclude<CareRole, "Primary Caregiver">;
  status: "pending" | "accepted";
  sentAt: string;
};

export type AuthState = {
  currentUserId: string | null;
  users: UserAccount[];
};

export type OnboardingState = {
  completed: boolean;
  step: "account" | "circle" | "patient" | "invite" | "done";
};

export type CareCircleMeta = {
  id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
};

export type PatientProfile = {
  name: string;
  fullName: string;
  age: string;
  relation: string;
  careNeeds: string;
  mood: string;
  sleepHours: number;
  bloodPressure: string;
  sugarLevel: number;
  painLevel: number;
  lastMedication: string;
};

export type Medication = {
  id: string;
  name: string;
  dose: string;
  time: string;
  period: MedicationPeriod;
  status: MedicationStatus;
  note?: string;
  icon: string;
};

export type CareTask = {
  id: string;
  title: string;
  assignee: string;
  due: string;
  tag: TaskTag;
  completed: boolean;
};

export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date?: string;
  time: string;
  location: string;
  reminder: boolean;
  notes: string;
};

export type FeedEntry = {
  id: string;
  user: string;
  title: string;
  time: string;
  tone: string;
  icon: string;
  badge: FeedBadge;
  reactions: number;
  kind: "medication" | "health" | "document" | "family" | "task" | "appointment";
};

export type HealthLog = {
  id: string;
  date: string;
  mood: string;
  painLevel: number;
  sleepHours: number;
  bloodPressure: string;
  sugarLevel: number;
  notes: string;
};

export type VaultDocument = {
  id: string;
  name: string;
  date: string;
  type: "pdf" | "doc" | "image";
  category: DocumentCategory;
  summary: string;
  fileDataUrl?: string;
  mimeType?: string;
};

export type FamilyMember = {
  id: string;
  name: string;
  email?: string;
  role: CareRole;
};

export type CareSettings = {
  textSize: "Standard" | "Large";
  contrast: "Standard" | "High";
  locale: Locale;
  carePreferences: {
    medicationReminders: boolean;
    appointmentAlerts: boolean;
    dailyHealthSummary: boolean;
    quietHours: boolean;
  };
};

export type CareCircleState = {
  auth: AuthState;
  careCircle: CareCircleMeta | null;
  invites: CircleInvite[];
  onboarding: OnboardingState;
  patient: PatientProfile;
  medications: Medication[];
  tasks: CareTask[];
  appointments: Appointment[];
  feed: FeedEntry[];
  healthLogs: HealthLog[];
  documents: VaultDocument[];
  familyMembers: FamilyMember[];
  settings: CareSettings;
};

export const navItems = [
  { href: "/dashboard", icon: "dashboard" },
  { href: "/medications", icon: "medical_services" },
  { href: "/tasks", icon: "checklist" },
  { href: "/appointments", icon: "event" },
  { href: "/activity", icon: "groups" },
  { href: "/documents", icon: "description" },
  { href: "/settings", icon: "settings" }
] as const;

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createInviteCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const initialState: CareCircleState = {
  auth: {
    currentUserId: null,
    users: []
  },
  careCircle: null,
  invites: [],
  onboarding: {
    completed: false,
    step: "account"
  },
  patient: {
    name: "",
    fullName: "",
    age: "",
    relation: "",
    careNeeds: "",
    mood: "Neutral",
    sleepHours: 0,
    bloodPressure: "",
    sugarLevel: 0,
    painLevel: 0,
    lastMedication: ""
  },
  medications: [],
  tasks: [],
  appointments: [],
  feed: [],
  healthLogs: [],
  documents: [],
  familyMembers: [],
  settings: {
    textSize: "Large",
    contrast: "High",
    locale: "en",
    carePreferences: {
      medicationReminders: true,
      appointmentAlerts: true,
      dailyHealthSummary: false,
      quietHours: true
    }
  }
};
