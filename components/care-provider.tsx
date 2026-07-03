"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { useLanguage } from "@/components/language-provider";
import {
  createId,
  createInviteCode,
  initialState,
  type CareCircleState,
  type CareRole,
  type CareTask,
  type CircleInvite,
  type DocumentCategory,
  type FeedEntry,
  type HealthLog,
  type MedicationPeriod,
  type MedicationStatus,
  type PatientProfile,
  type UserAccount,
  type VaultDocument
} from "@/lib/app-state";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "carecircle-state-v2";
const SEEDED_DOCUMENT_NAMES = new Set([
  "Cover Letter.pdf",
  "Blood_Test_Oct.pdf",
  "Cardiology_Discharge.docx",
  "Insurance_Card.jpg",
  "Prescription_Nov.pdf"
]);

function sanitizePersistedState(persisted: CareCircleState): CareCircleState {
  const documents = persisted.documents.filter((item) => !SEEDED_DOCUMENT_NAMES.has(item.name));
  const feed = persisted.feed.filter(
    (item) => !(item.kind === "document" && item.title.startsWith("Uploaded "))
  );

  if (documents.length === persisted.documents.length && feed.length === persisted.feed.length) {
    return persisted;
  }

  return {
    ...persisted,
    documents,
    feed
  };
}

type AuthResult = {
  ok: boolean;
  message?: string;
  inviteCode?: string;
};

type CareContextValue = {
  state: CareCircleState;
  hydrated: boolean;
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  login: (payload: { email: string; password: string }) => AuthResult;
  logout: () => void;
  signupPrimaryCaregiver: (payload: { name: string; email: string; password: string }) => AuthResult;
  signupFromInvite: (payload: { code: string; name: string; password: string; email?: string; role?: CareRole }) => AuthResult;
  createCareCircle: (payload: { name: string }) => AuthResult;
  updatePatientProfile: (payload: Pick<PatientProfile, "name" | "fullName" | "age" | "relation" | "careNeeds">) => void;
  inviteMember: (payload: { name: string; email: string; role: Exclude<CareRole, "Primary Caregiver"> }) => AuthResult;
  completeOnboarding: () => void;
  addMedication: (payload: {
    name: string;
    dose: string;
    time: string;
    period: MedicationPeriod;
  }) => void;
  updateMedicationStatus: (id: string, status: MedicationStatus) => void;
  addTask: (payload: { title: string; assignee: string; due: string; tag: CareTask["tag"] }) => void;
  toggleTask: (id: string) => void;
  addAppointment: (payload: { doctor: string; specialty: string; date: string; time: string; location: string }) => void;
  toggleAppointmentReminder: (id: string) => void;
  saveAppointmentNotes: (id: string, notes: string) => void;
  addFeedEntry: (payload: { user: string; title: string; badge?: FeedEntry["badge"]; kind?: FeedEntry["kind"] }) => void;
  reactToFeed: (id: string) => void;
  addHealthLog: (payload: Omit<HealthLog, "id">) => void;
  addDocument: (payload: {
    name: string;
    category: DocumentCategory;
    summary: string;
    type: VaultDocument["type"];
    fileDataUrl?: string;
    mimeType?: string;
  }) => void;
  updateSetting: <K extends keyof CareCircleState["settings"]>(key: K, value: CareCircleState["settings"][K]) => void;
  updateCarePreference: (key: keyof CareCircleState["settings"]["carePreferences"]) => void;
  syncLocale: (locale: Locale) => void;
};

const CareContext = createContext<CareContextValue | null>(null);

function formatRelative(now = new Date()) {
  return now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

export function CareProvider({ children }: { children: React.ReactNode }) {
  const { locale, t } = useLanguage();
  const [state, setState] = useState<CareCircleState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const isIncomingSyncRef = useRef(false);

  useEffect(() => {
    async function loadState() {
      try {
        const response = await fetch("/api/state");
        if (response.ok) {
          const serverData = await response.json();
          if (serverData && serverData.auth) {
            setState(sanitizePersistedState(serverData as CareCircleState));
            setHydrated(true);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load state from server database:", err);
      }

      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setState(sanitizePersistedState(JSON.parse(saved) as CareCircleState));
        }
      } catch {}
      setHydrated(true);
    }

    loadState();
  }, []);

  // Subscribe to real-time updates via Server-Sent Events (SSE)
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const eventSource = new EventSource("/api/state/sync");

    eventSource.addEventListener("update", (event) => {
      try {
        const updatedState = JSON.parse(event.data);
        if (updatedState && updatedState.auth) {
          isIncomingSyncRef.current = true;
          setState(sanitizePersistedState(updatedState as CareCircleState));
        }
      } catch (err) {
        console.error("Failed to parse real-time update:", err);
      }
    });

    return () => {
      eventSource.close();
    };
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}

    if (isIncomingSyncRef.current) {
      isIncomingSyncRef.current = false;
      return;
    }

    fetch("/api/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    }).catch((err) => console.error("Failed to sync state to server:", err));
  }, [hydrated, state]);

  const value = useMemo<CareContextValue>(() => {
    const currentUser = state.auth.users.find((user) => user.id === state.auth.currentUserId) ?? null;
    const userInitials = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U";

    const periodLabel = (period: MedicationPeriod) => {
      switch (period) {
        case "Morning":
          return t.medications.morning.toLowerCase();
        case "Afternoon":
          return t.medications.afternoon.toLowerCase();
        case "Evening":
          return t.medications.evening.toLowerCase();
        case "Night":
          return t.medications.night.toLowerCase();
      }
    };

    const feedTime = () => `${t.common.today} • ${formatRelative()}`;

    const emailTaken = (email: string) =>
      state.auth.users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase());

    return {
      state,
      hydrated,
      currentUser,
      isAuthenticated: Boolean(currentUser),
      login: ({ email, password }) => {
        const user = state.auth.users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
        if (!user || user.password !== password) {
          return { ok: false, message: "Invalid email or password." };
        }
        setState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            currentUserId: user.id
          }
        }));
        return { ok: true };
      },
      logout: () => {
        setState((current) => ({
          ...current,
          auth: {
            ...current.auth,
            currentUserId: null
          }
        }));
      },
      signupPrimaryCaregiver: ({ name, email, password }) => {
        if (emailTaken(email)) {
          return { ok: false, message: "That email is already in use." };
        }
        const user: UserAccount = {
          id: createId("user"),
          name,
          email: email.trim().toLowerCase(),
          password,
          role: "Primary Caregiver",
          circleId: null
        };
        setState((current) => ({
          ...current,
          auth: {
            currentUserId: user.id,
            users: [user, ...current.auth.users]
          },
          careCircle: null,
          invites: [],
          onboarding: {
            completed: false,
            step: "circle"
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
          familyMembers: [{ id: createId("fm"), name, email: user.email, role: "Primary Caregiver" }]
        }));
        return { ok: true };
      },
      signupFromInvite: ({ code, name, password, email, role }) => {
        const invite = state.invites.find((item) => item.code === code.toUpperCase() && item.status === "pending");
        const isGeneral = state.careCircle?.inviteCode === code.toUpperCase();
        if (!invite && !isGeneral) {
          return { ok: false, message: "This invite link is not valid anymore." };
        }
        const targetEmail = invite ? invite.email : email?.trim().toLowerCase();
        const targetRole = invite ? invite.role : (role || "Family Member");
        const circleId = invite ? invite.circleId : state.careCircle?.id;
        if (!targetEmail) {
          return { ok: false, message: "Email is required." };
        }
        if (emailTaken(targetEmail)) {
          return { ok: false, message: "This invited email already has an account." };
        }
        const user: UserAccount = {
          id: createId("user"),
          name,
          email: targetEmail,
          password,
          role: targetRole,
          circleId: circleId || null
        };
        setState((current) => ({
          ...current,
          auth: {
            currentUserId: user.id,
            users: [user, ...current.auth.users]
          },
          invites: invite
            ? current.invites.map((item) => (item.id === invite.id ? { ...item, status: "accepted" } : item))
            : current.invites,
          familyMembers: current.familyMembers.some((member) => member.email === targetEmail)
            ? current.familyMembers
            : [{ id: createId("fm"), name, email: targetEmail, role: targetRole }, ...current.familyMembers]
        }));
        return { ok: true };
      },
      createCareCircle: ({ name }) => {
        if (!currentUser || currentUser.role !== "Primary Caregiver") {
          return { ok: false, message: "Only the primary caregiver can create the first Care Circle." };
        }
        const circleId = state.careCircle?.id ?? createId("circle");
        const inviteCode = state.careCircle?.inviteCode ?? createInviteCode();
        setState((current) => ({
          ...current,
          careCircle: {
            id: circleId,
            name,
            inviteCode,
            createdBy: currentUser.id
          },
          auth: {
            ...current.auth,
            users: current.auth.users.map((user) =>
              user.id === currentUser.id ? { ...user, circleId } : user
            )
          },
          onboarding: {
            ...current.onboarding,
            step: "patient"
          }
        }));
        return { ok: true, inviteCode };
      },
      updatePatientProfile: ({ name, fullName, age, relation, careNeeds }) => {
        setState((current) => ({
          ...current,
          patient: {
            ...current.patient,
            name,
            fullName,
            age,
            relation,
            careNeeds
          },
          onboarding: {
            ...current.onboarding,
            step: "invite"
          }
        }));
      },
      inviteMember: ({ name, email, role }) => {
        if (!state.careCircle) {
          return { ok: false, message: "Please create your Care Circle first." };
        }
        if (emailTaken(email)) {
          return { ok: false, message: "That email already belongs to an existing member." };
        }
        const invite: CircleInvite = {
          id: createId("invite"),
          code: createInviteCode(),
          circleId: state.careCircle.id,
          name,
          email: email.trim().toLowerCase(),
          role,
          status: "pending",
          sentAt: new Date().toISOString()
        };
        setState((current) => ({
          ...current,
          invites: [invite, ...current.invites],
          familyMembers: current.familyMembers.some((member) => member.email === invite.email)
            ? current.familyMembers
            : [{ id: createId("fm"), name, email: invite.email, role }, ...current.familyMembers]
        }));
        return { ok: true, inviteCode: invite.code };
      },
      completeOnboarding: () => {
        setState((current) => ({
          ...current,
          onboarding: {
            completed: true,
            step: "done"
          }
        }));
      },
      addMedication: ({ name, dose, time, period }) => {
        setState((current) => ({
          ...current,
          medications: [
            {
              id: createId("med"),
              name,
              dose,
              time,
              period,
              status: "Pending",
              note:
                locale === "hi"
                  ? "अभी जोड़ा गया"
                  : locale === "mr"
                    ? "आत्ताच जोडले"
                    : "Added just now",
              icon: "pill"
            },
            ...current.medications
          ],
          feed: [
            {
              id: createId("feed"),
              user: userInitials,
              title:
                locale === "hi"
                  ? `${name} को ${periodLabel(period)} की दवाओं में जोड़ा गया`
                  : locale === "mr"
                    ? `${name} ${periodLabel(period)}च्या औषधांमध्ये जोडले`
                    : `Added ${name} to ${period.toLowerCase()} medicines`,
              time: feedTime(),
              tone: "bg-[#d8ecd9]",
              icon: "medical_services",
              badge: "UPDATE",
              reactions: 0,
              kind: "medication"
            },
            ...current.feed
          ]
        }));
      },
      updateMedicationStatus: (id, status) => {
        setState((current) => {
          const nextMeds = current.medications.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status,
                  note:
                    status === "Taken"
                      ? locale === "hi"
                        ? `${formatRelative()} पर ${currentUser?.name || "परिवार"} द्वारा दर्ज किया गया`
                        : locale === "mr"
                          ? `${formatRelative()} ला ${currentUser?.name || "कुटुंब"} द्वारे नोंदवले`
                          : `Logged by ${currentUser?.name || "Family"} at ${formatRelative()}`
                      : item.note
                }
              : item
          );
          const changed = nextMeds.find((item) => item.id === id);
          return changed
            ? {
                ...current,
                medications: nextMeds,
                patient: {
                  ...current.patient,
                  lastMedication: status === "Taken" ? changed.time : current.patient.lastMedication
                },
                feed: [
                  {
                    id: createId("feed"),
                    user: userInitials,
                    title:
                      locale === "hi"
                        ? `${changed.name} को ${t.values.statuses[status].toLowerCase()} के रूप में चिन्हित किया गया`
                        : locale === "mr"
                          ? `${changed.name} ${t.values.statuses[status].toLowerCase()} म्हणून चिन्हांकित केले`
                          : `${changed.name} marked as ${status.toLowerCase()}`,
                    time: feedTime(),
                    tone: status === "Taken" ? "bg-[#d7ecd7]" : "bg-[#f6ddd5]",
                    icon: "medical_services",
                    badge: status === "Taken" ? "DONE" : "UPDATE",
                    reactions: 0,
                    kind: "medication"
                  },
                  ...current.feed
                ]
              }
            : current;
        });
      },
      addTask: ({ title, assignee, due, tag }) => {
        setState((current) => ({
          ...current,
          tasks: [{ id: createId("task"), title, assignee, due, tag, completed: false }, ...current.tasks],
          feed: [
            {
              id: createId("feed"),
              user: userInitials,
              title:
                locale === "hi"
                  ? `${assignee} को "${title}" काम दिया गया`
                  : locale === "mr"
                    ? `"${title}" हे काम ${assignee} यांना देण्यात आले`
                    : `${assignee} was assigned "${title}"`,
              time: feedTime(),
              tone: "bg-[#ece5db]",
              icon: "checklist",
              badge: "UPDATE",
              reactions: 0,
              kind: "task"
            },
            ...current.feed
          ]
        }));
      },
      toggleTask: (id) => {
        setState((current) => {
          const nextTasks = current.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
          const changed = nextTasks.find((task) => task.id === id);
          return changed
            ? {
                ...current,
                tasks: nextTasks,
                feed: [
                  {
                    id: createId("feed"),
                    user: changed.assignee.charAt(0).toUpperCase(),
                    title: changed.completed
                      ? locale === "hi"
                        ? `${changed.title} पूरा किया गया`
                        : locale === "mr"
                          ? `${changed.title} पूर्ण झाले`
                          : `${changed.title} marked done`
                      : locale === "hi"
                        ? `${changed.title} फिर से बाकी कामों में डाला गया`
                        : locale === "mr"
                          ? `${changed.title} पुन्हा बाकी कामांमध्ये ठेवले`
                          : `${changed.title} moved back to to-do`,
                    time: feedTime(),
                    tone: changed.completed ? "bg-[#d7ecd7]" : "bg-[#ece5db]",
                    icon: "check_circle",
                    badge: changed.completed ? "DONE" : "UPDATE",
                    reactions: 0,
                    kind: "task"
                  },
                  ...current.feed
                ]
              }
            : current;
        });
      },
      addAppointment: ({ doctor, specialty, date, time, location }) => {
        setState((current) => ({
          ...current,
          appointments: [{ id: createId("appt"), doctor, specialty, date, time, location, reminder: true, notes: "" }, ...current.appointments],
          feed: [
            {
              id: createId("feed"),
              user: userInitials,
              title:
                locale === "hi"
                  ? `${doctor} की मुलाकात तय की गई`
                  : locale === "mr"
                    ? `${doctor} यांची भेट ठरवली`
                    : `Scheduled ${doctor} visit`,
              time: feedTime(),
              tone: "bg-[#cae5f6]",
              icon: "event",
              badge: "UPDATE",
              reactions: 0,
              kind: "appointment"
            },
            ...current.feed
          ]
        }));
      },
      toggleAppointmentReminder: (id) => {
        setState((current) => ({
          ...current,
          appointments: current.appointments.map((item) =>
            item.id === id ? { ...item, reminder: !item.reminder } : item
          )
        }));
      },
      saveAppointmentNotes: (id, notes) => {
        setState((current) => ({
          ...current,
          appointments: current.appointments.map((item) => (item.id === id ? { ...item, notes } : item))
        }));
      },
      addFeedEntry: ({ user, title, badge = "UPDATE", kind = "family" }) => {
        setState((current) => ({
          ...current,
          feed: [
            {
              id: createId("feed"),
              user,
              title,
              time: feedTime(),
              tone: "bg-[#ece5db]",
              icon: kind === "health" ? "monitor_heart" : kind === "document" ? "description" : "groups",
              badge,
              reactions: 0,
              kind
            },
            ...current.feed
          ]
        }));
      },
      reactToFeed: (id) => {
        setState((current) => ({
          ...current,
          feed: current.feed.map((item) => (item.id === id ? { ...item, reactions: item.reactions + 1 } : item))
        }));
      },
      addHealthLog: (payload) => {
        setState((current) => ({
          ...current,
          patient: {
            ...current.patient,
            mood: payload.mood,
            painLevel: payload.painLevel,
            sleepHours: payload.sleepHours,
            bloodPressure: payload.bloodPressure,
            sugarLevel: payload.sugarLevel
          },
          healthLogs: [{ id: createId("log"), ...payload }, ...current.healthLogs],
          feed: [
            {
              id: createId("feed"),
              user: userInitials,
              title:
                locale === "hi"
                  ? `स्वास्थ्य जांच ${t.values.moods[payload.mood as keyof typeof t.values.moods]} मूड के साथ दर्ज की गई`
                  : locale === "mr"
                    ? `${t.values.moods[payload.mood as keyof typeof t.values.moods]} मूडसह आरोग्य नोंद जतन झाली`
                    : `Health check-in saved with mood "${payload.mood}"`,
              time: feedTime(),
              tone: "bg-[#cae5f6]",
              icon: "monitor_heart",
              badge: "GOOD DAY",
              reactions: 0,
              kind: "health"
            },
            ...current.feed
          ]
        }));
      },
      addDocument: ({ name, category, summary, type, fileDataUrl, mimeType }) => {
        const prettyDate = `${locale === "en" ? "Uploaded" : "अपलोड"} ${new Date().toLocaleDateString(locale === "en" ? "en-US" : "hi-IN", { month: "short", day: "numeric", year: "numeric" })}`;
        setState((current) => ({
          ...current,
          documents: [{ id: createId("doc"), name, category, summary, type, date: prettyDate, fileDataUrl, mimeType }, ...current.documents],
          feed: [
            {
              id: createId("feed"),
              user: userInitials,
              title:
                locale === "hi"
                  ? `${name} अपलोड की गई`
                  : locale === "mr"
                    ? `${name} अपलोड केले`
                    : `Uploaded ${name}`,
              time: feedTime(),
              tone: "bg-[#d8ecd9]",
              icon: "description",
              badge: "NEW FILE",
              reactions: 0,
              kind: "document"
            },
            ...current.feed
          ]
        }));
      },
      updateSetting: (key, value) => {
        setState((current) => ({
          ...current,
          settings: {
            ...current.settings,
            [key]: value
          }
        }));
      },
      updateCarePreference: (key) => {
        setState((current) => ({
          ...current,
          settings: {
            ...current.settings,
            carePreferences: {
              ...current.settings.carePreferences,
              [key]: !current.settings.carePreferences[key]
            }
          }
        }));
      },
      syncLocale: (nextLocale) => {
        setState((current) => ({
          ...current,
          settings: {
            ...current.settings,
            locale: nextLocale
          }
        }));
      }
    };
  }, [hydrated, locale, state, t]);

  return <CareContext.Provider value={value}>{children}</CareContext.Provider>;
}

export function useCare() {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error("useCare must be used inside CareProvider");
  }
  return context;
}
