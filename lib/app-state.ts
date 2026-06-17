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
  { href: "/health-log", icon: "monitor_heart" },
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
    name: "Dad",
    fullName: "Your loved one",
    age: "",
    relation: "Father",
    careNeeds: "",
    mood: "Happy",
    sleepHours: 7.5,
    bloodPressure: "122/80",
    sugarLevel: 114,
    painLevel: 5,
    lastMedication: "8:00 AM"
  },
  medications: [
    {
      id: "med-1",
      name: "Metformin",
      dose: "500mg • After Food",
      time: "8:00 AM",
      period: "Morning",
      status: "Taken",
      note: "Logged by Priya at 8:15 AM",
      icon: "pill"
    },
    {
      id: "med-2",
      name: "Vitamin D3",
      dose: "1000 IU • Daily",
      time: "9:00 AM",
      period: "Morning",
      status: "Pending",
      note: "Mark as taken",
      icon: "medication"
    },
    {
      id: "med-3",
      name: "Iron Supplement",
      dose: "200mg • With lunch",
      time: "1:30 PM",
      period: "Afternoon",
      status: "Missed",
      note: "Skip or take now",
      icon: "vaccines"
    },
    {
      id: "med-4",
      name: "Eye Drops",
      dose: "Both Eyes",
      time: "6:00 PM",
      period: "Evening",
      status: "Upcoming",
      icon: "water_drop"
    },
    {
      id: "med-5",
      name: "Atorvastatin",
      dose: "10mg",
      time: "10:00 PM",
      period: "Night",
      status: "Upcoming",
      icon: "dark_mode"
    }
  ],
  tasks: [
    { id: "task-1", title: "Buy groceries for Dad", assignee: "Ravi", due: "Tomorrow", tag: "Important", completed: false },
    { id: "task-2", title: "Refill blood pressure meds", assignee: "Anjali", due: "Friday", tag: "Routine", completed: false },
    { id: "task-3", title: "Call lab for test report", assignee: "Sonia", due: "Today", tag: "Follow-up", completed: false },
    { id: "task-4", title: "Evening walk with Dad", assignee: "Neel", due: "6:30 PM", tag: "Daily", completed: false }
  ],
  appointments: [
    {
      id: "appt-1",
      doctor: "Dr. Mehta",
      specialty: "General Physician",
      time: "Nov 15, 2024 • 10:30 AM",
      location: "City Care Hospital, Room 402",
      reminder: true,
      notes: ""
    },
    {
      id: "appt-2",
      doctor: "Dr. Sarah Thompson",
      specialty: "Ophthalmologist",
      time: "Nov 22, 2024 • 02:15 PM",
      location: "Vision Center, Wing B",
      reminder: false,
      notes: ""
    }
  ],
  feed: [
    {
      id: "feed-1",
      user: "S",
      title: "Sister updated health log",
      time: "10 mins ago",
      tone: "bg-[#cae5f6]",
      icon: "monitor_heart",
      badge: "UPDATE",
      reactions: 0,
      kind: "health"
    },
    {
      id: "feed-2",
      user: "M",
      title: "Mom had lunch",
      time: "2 hours ago",
      tone: "bg-[#ece5db]",
      icon: "restaurant",
      badge: "UPDATE",
      reactions: 0,
      kind: "family"
    },
    {
      id: "feed-3",
      user: "R",
      title: "Rahul marked evening medicine as taken",
      time: "Today • 10:00 AM",
      tone: "bg-[#d7ecd7]",
      icon: "medical_services",
      badge: "DONE",
      reactions: 2,
      kind: "medication"
    }
  ],
  healthLogs: [
    {
      id: "log-1",
      date: "2026-06-16",
      mood: "Happy",
      painLevel: 5,
      sleepHours: 7,
      bloodPressure: "122/80",
      sugarLevel: 114,
      notes: "Comfortable morning and good appetite."
    }
  ],
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
