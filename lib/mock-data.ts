export const patient = {
  name: "Dad",
  fullName: "Savita Rao",
  mood: "Happy",
  lastMedication: "8:00 AM",
  sleep: "7.5 Hours"
};

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/medications", label: "Medications", icon: "medical_services" },
  { href: "/tasks", label: "Tasks", icon: "checklist" },
  { href: "/appointments", label: "Appointments", icon: "event" },
  { href: "/activity", label: "Family Feed", icon: "groups" },
  { href: "/health-log", label: "Health Log", icon: "monitor_heart" },
  { href: "/documents", label: "Documents", icon: "description" },
  { href: "/settings", label: "Settings", icon: "settings" }
];

export const featureCards = [
  {
    title: "Smart Medication Reminders",
    body: "Never miss a dose again. Alerts for the whole family when medicine is taken or missed.",
    icon: "medical_services",
    accent: "bg-accent",
    badge: "Pastel-Semantic: Done"
  },
  {
    title: "Shared Family Tasks",
    body: "Coordinate grocery runs, cleaning, and daily check-ins without back-and-forth texting.",
    icon: "checklist",
    accent: "bg-accent2",
    avatars: ["bg-[#b5d4bc]", "bg-[#d0c7bc]", "bg-[#b8d8ea]"]
  },
  {
    title: "Easy Appointment Tracking",
    body: "A shared calendar for doctor visits, therapy sessions, and family gatherings that everyone can see.",
    icon: "event",
    accent: "bg-primary-soft",
    footer: "Synced across all devices"
  }
];

export const medications = {
  morning: [
    {
      name: "Metformin",
      dose: "500mg • After Food",
      status: "Taken",
      note: "Logged by Priya at 8:15 AM",
      icon: "pill"
    },
    {
      name: "Vitamin D3",
      dose: "1000 IU • 09:00 AM",
      status: "Pending",
      note: "Mark as taken",
      icon: "medication"
    }
  ],
  afternoon: [
    {
      name: "Iron Supplement",
      dose: "200mg • 01:30 PM",
      status: "Missed",
      note: "Skip or take now",
      icon: "vaccines"
    }
  ],
  evening: [{ name: "Eye Drops", dose: "Both Eyes • 06:00 PM", status: "Upcoming", icon: "water_drop" }],
  night: [{ name: "Atorvastatin", dose: "10mg • 10:00 PM", status: "Upcoming", icon: "dark_mode" }]
};

export const tasks = [
  { title: "Buy groceries for Dad", assignee: "Ravi", due: "Tomorrow", tag: "Important" },
  { title: "Refill blood pressure meds", assignee: "Anjali", due: "Friday", tag: "Routine" },
  { title: "Call lab for test report", assignee: "Sonia", due: "Today", tag: "Follow-up" },
  { title: "Evening walk with Dad", assignee: "Neel", due: "6:30 PM", tag: "Daily" }
];

export const appointments = [
  {
    doctor: "Dr. Mehta",
    specialty: "General Physician",
    time: "Nov 15, 2024 • 10:30 AM",
    location: "City Care Hospital, Room 402"
  },
  {
    doctor: "Dr. Sarah Thompson",
    specialty: "Ophthalmologist",
    time: "Nov 22, 2024 • 02:15 PM",
    location: "Vision Center, Wing B"
  }
];

export const feedItems = [
  { user: "S", title: "Sister updated health log", time: "10 mins ago", tone: "bg-[#cae5f6]" },
  { user: "M", title: "Mom had lunch", time: "2 hours ago", tone: "bg-[#ece5db]" },
  { user: "R", title: "Rahul marked evening medicine as taken", time: "Today • 10:00 AM", tone: "bg-[#d7ecd7]" }
];

export const documents = [
  { name: "Blood_Test_Oct.pdf", date: "Uploaded Oct 12, 2024", type: "pdf" },
  { name: "Cardiology_Discharge.docx", date: "Uploaded Sep 28, 2024", type: "doc" },
  { name: "Insurance_Card.jpg", date: "Uploaded Sep 08, 2024", type: "image" },
  { name: "Prescription_Nov.pdf", date: "Uploaded Nov 01, 2024", type: "pdf" }
];

export const healthHistory = [
  { label: "Pain", value: "5 / 10" },
  { label: "Sleep", value: "7 Hours" },
  { label: "Blood Pressure", value: "122/80" },
  { label: "Sugar", value: "114 mg/dL" }
];
