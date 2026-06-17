export type Locale = "en" | "hi" | "mr";

export type NavHref =
  | "/dashboard"
  | "/medications"
  | "/tasks"
  | "/appointments"
  | "/activity"
  | "/health-log"
  | "/documents"
  | "/settings";

export const locales: Array<{ code: Locale; label: string; short: string }> = [
  { code: "en", label: "English", short: "English" },
  { code: "hi", label: "हिंदी", short: "नमस्ते" },
  { code: "mr", label: "मराठी", short: "नमस्कार" }
];

export const copy = {
  en: {
    nav: {
      "/dashboard": "Dashboard",
      "/medications": "Medications",
      "/tasks": "Tasks",
      "/appointments": "Appointments",
      "/activity": "Family Feed",
      "/health-log": "Health Log",
      "/documents": "Documents",
      "/settings": "Settings"
    },
    common: {
      appName: "CareCircle",
      primaryCaregiver: "Primary Caregiver",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      accessibility: "Accessibility",
      contactUs: "Contact Us",
      footerLine: "© 2024 CareCircle. Built for families navigating caregiving with warmth, clarity, and shared support.",
      searchPlaceholder: "Search a page, medicine, or note",
      todayAtAGlance: "Today at a glance",
      medicinesDue: "Medicines due",
      openTasks: "Open tasks",
      emergencyHelp: "Emergency Help",
      emergencyChecklist: "Emergency checklist",
      emergencyStep1: "1. Call your doctor or local emergency number.",
      emergencyStep2: "2. Keep current medicines and reports ready.",
      emergencyStep3: "3. Inform one family member through the feed.",
      today: "Today",
      all: "All",
      save: "Save",
      saveChanges: "Save Changes",
      savedAutomatically: "Saved Automatically",
      showAll: "Show All"
    },
    landing: {
      brandLine: "The Digital Hearth for Caregivers",
      heroTitle: "Caregiving is easier when families stay coordinated.",
      heroBody: "One place for medicines, appointments, tasks, and updates. Simple enough for every family member to use.",
      getStarted: "Get Started",
      seeHow: "See How It Works",
      home: "Home",
      features: "Features",
      ourStory: "Our Story",
      featuresTitle: "Everything you need to care, together.",
      featuresBody: "Built to replace messy group chats and scattered paper notes.",
      builtTitle: "Built for families, not hospitals.",
      builtBody: "We believe technology should feel like a helping hand, not a complicated medical tool. CareCircle keeps care calm, clear, and shared.",
      careInYourLanguage: "Care in your language.",
      careInYourLanguageBody: "Switch instantly to help every family member participate in care without language barriers.",
      quote: "\"A digital extension of your home's care.\"",
      values: ["Calm Design", "Private & Secure", "Unlimited Family", "AAA Accessible"],
      languageCards: ["English", "नमस्ते (Hindi)", "नमस्कार (Marathi)"]
    },
    dashboard: {
      greeting: "Good morning, Family.",
      subtitle: "Here is everything important for today.",
      patientStatus: "Dad's Status",
      mood: "Mood",
      lastMedication: "Last Medication",
      sleepQuality: "Sleep Quality",
      todaysMedications: "Today's Medications",
      openPage: "Open page",
      appointments: "Appointments",
      todaysTasks: "Today's Tasks",
      familyFeed: "Family Feed",
      viewFullFeed: "View Full Feed",
      manageAppointment: "Manage appointment",
      allCaughtUp: "You are all caught up for today.",
      noAppointment: "No appointment scheduled yet.",
      allTaken: "All medicines are marked taken today."
    },
    medications: {
      title: "Medications",
      subtitle: "Daily schedule for Grandma Savita",
      currentPatient: "Current patient",
      addNewMedication: "Add New Medication",
      medicineName: "Medicine name",
      medicineNamePlaceholder: "Vitamin D3",
      dose: "Dose",
      dosePlaceholder: "1000 IU",
      time: "Time",
      period: "Period",
      addMedication: "Add Medication",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      night: "Night",
      noMedicines: "No medicines in this slot yet.",
      markAsTaken: "Mark as Taken",
      skip: "Skip",
      missed: "Missed",
      greatJob: "Great job, Savita!",
      daily: "Daily",
      detailedLog: "View Detailed Log",
      adherenceLine: "medicines are marked taken. Consistent medication helps maintain better health."
    },
    tasks: {
      title: "Family Tasks",
      subtitle: "Coordinating care for Dad. Small acts of kindness, organized together.",
      newTask: "New Task",
      createTask: "Create Task",
      task: "Task",
      taskPlaceholder: "Pick up BP medicines",
      assignedTo: "Assigned to",
      assigneePlaceholder: "Anjali",
      due: "Due",
      tag: "Tag",
      saveTask: "Save Task",
      todo: "To Do",
      completed: "Completed",
      markDone: "Mark as Done",
      moveBack: "Move Back to To Do",
      noTasks: "No tasks in this list yet."
    },
    appointments: {
      title: "Appointments",
      subtitle: "Manage and track medical visits for your loved ones.",
      scheduleAppointment: "Schedule Appointment",
      doctorName: "Doctor name",
      doctorPlaceholder: "Dr. Mehta",
      specialty: "Specialty",
      specialtyPlaceholder: "Cardiology",
      dateAndTime: "Date and time",
      location: "Location",
      locationPlaceholder: "City Heart Clinic",
      saveAppointment: "Save Appointment",
      upcomingVisits: "Upcoming Visits",
      reminderOn: "Reminder on",
      reminderOff: "Reminder off",
      getDirections: "Get Directions",
      turnReminderOff: "Turn Reminder Off",
      setReminder: "Set Reminder",
      visitNotes: "Visit notes",
      visitNotesPlaceholder: "Notes for the visit, questions to ask, or what to carry"
    },
    activity: {
      title: "Family Activity Feed",
      subtitle: "Stay connected with Dad's daily journey. Every update is a shared moment of care.",
      shareUpdate: "Share an Update",
      postUpdate: "Post Family Update",
      initial: "Initial",
      initialPlaceholder: "A",
      update: "Update",
      updatePlaceholder: "Dad had lunch and is feeling better.",
      share: "Share",
      cheer: "Cheer",
      replyLater: "Reply Later"
    },
    health: {
      title: "Daily Health Check-in",
      subtitle: "Record daily mood, sleep, pain, and vitals for the family.",
      howFeeling: "How is Dad feeling today?",
      painLevel: "Pain Level (1-10)",
      painPlaceholder: "4",
      sleepHours: "Sleep Hours",
      sleepPlaceholder: "7.5",
      bloodPressure: "Blood Pressure",
      bloodPressurePlaceholder: "120/80",
      sugarLevel: "Sugar Level",
      sugarPlaceholder: "110",
      notes: "Notes",
      notesPlaceholder: "How the day went, appetite, walking, mood, or anything important.",
      saveLog: "Save Today's Log",
      currentSnapshot: "Current Snapshot",
      recentCheckins: "Recent Check-ins",
      sleepShort: "Sleep",
      pain: "Pain",
      sugar: "Sugar"
    },
    documents: {
      title: "Document Vault",
      subtitle: "Securely organized records for your family's health.",
      uploadDocument: "Upload Document",
      addDocumentRecord: "Add Document Record",
      fileName: "File name",
      fileNamePlaceholder: "Blood_Test_Oct.pdf",
      category: "Category",
      type: "Type",
      summary: "Summary",
      summaryPlaceholder: "Blood test from annual check-up",
      viewFile: "View",
      downloadFile: "Download",
      saveDocument: "Save Document",
      recentDocuments: "Recent Documents",
      showingAll: "Showing all records",
      filteredBy: "Filtered by"
    },
    settings: {
      title: "Settings",
      subtitle: "Keep CareCircle simple and comfortable for every family member.",
      displayAndLanguage: "Display & Language",
      textSize: "Text Size",
      language: "Language",
      contrast: "Contrast",
      carePreferences: "Care Preferences",
      medicineReminders: "Medicine reminders",
      appointmentAlerts: "Appointment alerts",
      dailyHealthSummary: "Daily health summary",
      quietHours: "Quiet hours after 10 PM",
      familyAccess: "Family Access",
      familyMemberName: "Family member name",
      role: "Role",
      inviteFamilyMember: "Invite Family Member",
      standard: "Standard",
      large: "Large",
      high: "High",
      hindi: "Hindi",
      marathi: "Marathi"
    },
    values: {
      statuses: {
        Taken: "Taken",
        Pending: "Pending",
        Missed: "Missed",
        Upcoming: "Upcoming",
        Skipped: "Skipped"
      },
      taskTags: {
        Important: "Important",
        Routine: "Routine",
        "Follow-up": "Follow-up",
        Daily: "Daily"
      },
      moods: {
        Happy: "Happy",
        Neutral: "Neutral",
        Tired: "Tired",
        Unwell: "Unwell"
      },
      categories: {
        Prescriptions: "Prescriptions",
        "Lab Reports": "Lab Reports",
        "Discharge Papers": "Discharge Papers",
        "Identity Docs": "Identity Docs",
        Other: "Other"
      },
      roles: {
        "Full access": "Full access",
        "Can update tasks": "Can update tasks",
        "Read-only": "Read-only"
      },
      badges: {
        DONE: "DONE",
        "GOOD DAY": "GOOD DAY",
        "NEW FILE": "NEW FILE",
        UPDATE: "UPDATE"
      }
    },
    seed: {
      medications: {
        "med-1": { note: "Logged by Priya at 8:15 AM", dose: "500mg • After Food" },
        "med-2": { note: "Mark as taken", dose: "1000 IU • Daily" },
        "med-3": { note: "Skip or take now", dose: "200mg • With lunch" },
        "med-4": { dose: "Both Eyes" },
        "med-5": { dose: "10mg" }
      },
      tasks: {
        "task-1": { title: "Buy groceries for Dad", due: "Tomorrow" },
        "task-2": { title: "Refill blood pressure meds", due: "Friday" },
        "task-3": { title: "Call lab for test report", due: "Today" },
        "task-4": { title: "Evening walk with Dad", due: "6:30 PM" }
      },
      appointments: {
        "appt-1": { specialty: "General Physician", location: "City Care Hospital, Room 402" },
        "appt-2": { specialty: "Ophthalmologist", location: "Vision Center, Wing B" }
      },
      feed: {
        "feed-1": { title: "Sister updated health log", time: "10 mins ago" },
        "feed-2": { title: "Mom had lunch", time: "2 hours ago" },
        "feed-3": { title: "Rahul marked evening medicine as taken", time: "Today • 10:00 AM" }
      },
      documents: {
        "doc-1": { date: "Uploaded Oct 12, 2024", summary: "Routine blood work" },
        "doc-2": { date: "Uploaded Sep 28, 2024", summary: "Discharge summary" },
        "doc-3": { date: "Uploaded Sep 08, 2024", summary: "Insurance ID card" },
        "doc-4": { date: "Uploaded Nov 01, 2024", summary: "Monthly prescription" }
      },
      healthNotes: {
        "log-1": "Comfortable morning and good appetite."
      }
    }
  },
  hi: {
    nav: {
      "/dashboard": "डैशबोर्ड",
      "/medications": "दवाइयाँ",
      "/tasks": "काम",
      "/appointments": "अपॉइंटमेंट",
      "/activity": "परिवार फ़ीड",
      "/health-log": "स्वास्थ्य लॉग",
      "/documents": "दस्तावेज़",
      "/settings": "सेटिंग्स"
    },
    common: {
      appName: "केयरसर्कल",
      primaryCaregiver: "मुख्य देखभालकर्ता",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      accessibility: "सुगम्यता",
      contactUs: "संपर्क करें",
      footerLine: "© 2024 केयरसर्कल। परिवारों के लिए स्नेह, स्पष्टता और सहयोग के साथ बनाया गया।",
      searchPlaceholder: "पेज, दवाई या नोट खोजें",
      todayAtAGlance: "आज की झलक",
      medicinesDue: "बाकी दवाइयाँ",
      openTasks: "बाकी काम",
      emergencyHelp: "आपातकालीन मदद",
      emergencyChecklist: "आपातकालीन सूची",
      emergencyStep1: "1. डॉक्टर या स्थानीय आपातकालीन नंबर पर कॉल करें।",
      emergencyStep2: "2. दवाइयाँ और रिपोर्ट अपने पास रखें।",
      emergencyStep3: "3. परिवार के किसी सदस्य को फ़ीड के जरिए बताएं।",
      today: "आज",
      all: "सभी",
      save: "सहेजें",
      saveChanges: "बदलाव सहेजें",
      savedAutomatically: "अपने आप सहेजा गया",
      showAll: "सभी दिखाएँ"
    },
    landing: {
      brandLine: "देखभाल करने वालों के लिए डिजिटल सहारा",
      heroTitle: "जब परिवार साथ रहता है, देखभाल आसान हो जाती है।",
      heroBody: "दवाइयों, अपॉइंटमेंट, काम और अपडेट के लिए एक आसान साझा जगह। परिवार के हर सदस्य के लिए सरल।",
      getStarted: "शुरू करें",
      seeHow: "कैसे काम करता है",
      home: "होम",
      features: "विशेषताएँ",
      ourStory: "हमारी कहानी",
      featuresTitle: "साथ मिलकर देखभाल करने के लिए ज़रूरी सब कुछ।",
      featuresBody: "बिखरे मैसेज और कागज़ी नोट्स की जगह एक साफ साझा जगह।",
      builtTitle: "परिवारों के लिए बनाया गया, अस्पतालों के लिए नहीं।",
      builtBody: "तकनीक मददगार हाथ जैसी लगे, मुश्किल सिस्टम जैसी नहीं। CareCircle देखभाल को शांत, साफ और साझा बनाता है।",
      careInYourLanguage: "आपकी भाषा में देखभाल।",
      careInYourLanguageBody: "भाषा बदलें ताकि परिवार का हर सदस्य बिना रुकावट देखभाल में शामिल हो सके।",
      quote: "\"आपके घर की देखभाल का डिजिटल विस्तार।\"",
      values: ["शांत डिज़ाइन", "निजी और सुरक्षित", "पूरा परिवार", "AAA सुलभ"],
      languageCards: ["English", "नमस्ते (Hindi)", "नमस्कार (Marathi)"]
    },
    dashboard: {
      greeting: "सुप्रभात, परिवार।",
      subtitle: "आज की ज़रूरी बातें यहाँ हैं।",
      patientStatus: "पापा की स्थिति",
      mood: "मूड",
      lastMedication: "आखिरी दवाई",
      sleepQuality: "नींद की गुणवत्ता",
      todaysMedications: "आज की दवाइयाँ",
      openPage: "पेज खोलें",
      appointments: "अपॉइंटमेंट",
      todaysTasks: "आज के काम",
      familyFeed: "परिवार फ़ीड",
      viewFullFeed: "पूरा फ़ीड देखें",
      manageAppointment: "अपॉइंटमेंट देखें",
      allCaughtUp: "आज के सभी काम पूरे हैं।",
      noAppointment: "अभी कोई अपॉइंटमेंट तय नहीं है।",
      allTaken: "आज की सभी दवाइयाँ ली जा चुकी हैं।"
    },
    medications: {
      title: "दवाइयाँ",
      subtitle: "दादी सविता की रोज़ की दवा सूची",
      currentPatient: "मौजूदा मरीज",
      addNewMedication: "नई दवाई जोड़ें",
      medicineName: "दवाई का नाम",
      medicineNamePlaceholder: "विटामिन D3",
      dose: "मात्रा",
      dosePlaceholder: "1000 IU",
      time: "समय",
      period: "समय भाग",
      addMedication: "दवाई जोड़ें",
      morning: "सुबह",
      afternoon: "दोपहर",
      evening: "शाम",
      night: "रात",
      noMedicines: "इस समय भाग में अभी कोई दवाई नहीं है।",
      markAsTaken: "ली गई चिन्हित करें",
      skip: "छोड़ें",
      missed: "छूट गई",
      greatJob: "बहुत बढ़िया, सविता!",
      daily: "दैनिक",
      detailedLog: "विस्तृत लॉग देखें",
      adherenceLine: "दवाइयाँ ली गई हैं। नियमित दवाई बेहतर स्वास्थ्य में मदद करती है।"
    },
    tasks: {
      title: "परिवार के काम",
      subtitle: "पापा की देखभाल को मिलकर आसान बनाना।",
      newTask: "नया काम",
      createTask: "काम बनाएँ",
      task: "काम",
      taskPlaceholder: "बीपी की दवाइयाँ ले आना",
      assignedTo: "किसे दिया गया",
      assigneePlaceholder: "अंजलि",
      due: "कब तक",
      tag: "टैग",
      saveTask: "काम सहेजें",
      todo: "बाकी",
      completed: "पूरा हुआ",
      markDone: "पूरा चिन्हित करें",
      moveBack: "फिर से बाकी में रखें",
      noTasks: "इस सूची में अभी कोई काम नहीं है।"
    },
    appointments: {
      title: "अपॉइंटमेंट",
      subtitle: "अपने प्रियजनों की डॉक्टर मुलाकातें आसानी से संभालें।",
      scheduleAppointment: "अपॉइंटमेंट तय करें",
      doctorName: "डॉक्टर का नाम",
      doctorPlaceholder: "डॉ. मेहता",
      specialty: "विशेषज्ञता",
      specialtyPlaceholder: "हृदय रोग विशेषज्ञ",
      dateAndTime: "तारीख और समय",
      location: "स्थान",
      locationPlaceholder: "सिटी हार्ट क्लिनिक",
      saveAppointment: "अपॉइंटमेंट सहेजें",
      upcomingVisits: "आने वाली मुलाकातें",
      reminderOn: "रिमाइंडर चालू",
      reminderOff: "रिमाइंडर बंद",
      getDirections: "रास्ता देखें",
      turnReminderOff: "रिमाइंडर बंद करें",
      setReminder: "रिमाइंडर लगाएँ",
      visitNotes: "मुलाकात नोट्स",
      visitNotesPlaceholder: "डॉक्टर से पूछने वाली बातें या साथ ले जाने वाली चीज़ें लिखें"
    },
    activity: {
      title: "परिवार गतिविधि फ़ीड",
      subtitle: "पापा के दिन की हर अहम बात परिवार के साथ साझा रखें।",
      shareUpdate: "अपडेट साझा करें",
      postUpdate: "परिवार अपडेट पोस्ट करें",
      initial: "पहला अक्षर",
      initialPlaceholder: "अ",
      update: "अपडेट",
      updatePlaceholder: "पापा ने खाना खा लिया और अब बेहतर महसूस कर रहे हैं।",
      share: "साझा करें",
      cheer: "प्रोत्साहन",
      replyLater: "बाद में जवाब दें"
    },
    health: {
      title: "दैनिक स्वास्थ्य जाँच",
      subtitle: "परिवार के लिए रोज़ का मूड, नींद, दर्द और ज़रूरी माप दर्ज करें।",
      howFeeling: "आज पापा कैसा महसूस कर रहे हैं?",
      painLevel: "दर्द स्तर (1-10)",
      painPlaceholder: "4",
      sleepHours: "नींद के घंटे",
      sleepPlaceholder: "7.5",
      bloodPressure: "ब्लड प्रेशर",
      bloodPressurePlaceholder: "120/80",
      sugarLevel: "शुगर स्तर",
      sugarPlaceholder: "110",
      notes: "नोट्स",
      notesPlaceholder: "दिन कैसा रहा, भूख, चलना, मूड या कोई ज़रूरी बात लिखें।",
      saveLog: "आज का लॉग सहेजें",
      currentSnapshot: "अभी की स्थिति",
      recentCheckins: "हाल की जाँचें",
      sleepShort: "नींद",
      pain: "दर्द",
      sugar: "शुगर"
    },
    documents: {
      title: "दस्तावेज़ संग्रह",
      subtitle: "परिवार के स्वास्थ्य रिकॉर्ड को सुरक्षित और व्यवस्थित रखें।",
      uploadDocument: "दस्तावेज़ अपलोड करें",
      addDocumentRecord: "दस्तावेज़ रिकॉर्ड जोड़ें",
      fileName: "फ़ाइल नाम",
      fileNamePlaceholder: "ब्लड_टेस्ट_अक्टूबर.pdf",
      category: "श्रेणी",
      type: "प्रकार",
      summary: "संक्षेप",
      summaryPlaceholder: "वार्षिक जांच की ब्लड टेस्ट रिपोर्ट",
      viewFile: "देखें",
      downloadFile: "डाउनलोड",
      saveDocument: "दस्तावेज़ सहेजें",
      recentDocuments: "हाल के दस्तावेज़",
      showingAll: "सभी रिकॉर्ड दिख रहे हैं",
      filteredBy: "फ़िल्टर"
    },
    settings: {
      title: "सेटिंग्स",
      subtitle: "CareCircle को परिवार के हर सदस्य के लिए आसान और आरामदायक रखें।",
      displayAndLanguage: "डिस्प्ले और भाषा",
      textSize: "टेक्स्ट आकार",
      language: "भाषा",
      contrast: "कॉन्ट्रास्ट",
      carePreferences: "देखभाल प्राथमिकताएँ",
      medicineReminders: "दवाई रिमाइंडर",
      appointmentAlerts: "अपॉइंटमेंट अलर्ट",
      dailyHealthSummary: "दैनिक स्वास्थ्य सारांश",
      quietHours: "रात 10 बजे के बाद शांत समय",
      familyAccess: "परिवार पहुँच",
      familyMemberName: "परिवार सदस्य का नाम",
      role: "भूमिका",
      inviteFamilyMember: "परिवार सदस्य जोड़ें",
      standard: "सामान्य",
      large: "बड़ा",
      high: "उच्च",
      hindi: "हिंदी",
      marathi: "मराठी"
    },
    values: {
      statuses: {
        Taken: "ली गई",
        Pending: "बाकी",
        Missed: "छूट गई",
        Upcoming: "आने वाली",
        Skipped: "छोड़ी गई"
      },
      taskTags: {
        Important: "महत्वपूर्ण",
        Routine: "रूटीन",
        "Follow-up": "फॉलो-अप",
        Daily: "दैनिक"
      },
      moods: {
        Happy: "खुश",
        Neutral: "सामान्य",
        Tired: "थका हुआ",
        Unwell: "अस्वस्थ"
      },
      categories: {
        Prescriptions: "प्रिस्क्रिप्शन",
        "Lab Reports": "लैब रिपोर्ट",
        "Discharge Papers": "डिस्चार्ज पेपर",
        "Identity Docs": "पहचान दस्तावेज़",
        Other: "अन्य"
      },
      roles: {
        "Full access": "पूरा अधिकार",
        "Can update tasks": "काम अपडेट कर सकते हैं",
        "Read-only": "सिर्फ़ देख सकते हैं"
      },
      badges: {
        DONE: "पूरा",
        "GOOD DAY": "अच्छा दिन",
        "NEW FILE": "नई फ़ाइल",
        UPDATE: "अपडेट"
      }
    },
    seed: {
      medications: {
        "med-1": { note: "प्रिय्या ने 8:15 AM पर दर्ज किया", dose: "500mg • खाने के बाद" },
        "med-2": { note: "ली गई चिन्हित करें", dose: "1000 IU • रोज़" },
        "med-3": { note: "छोड़ें या अभी लें", dose: "200mg • दोपहर के भोजन के साथ" },
        "med-4": { dose: "दोनों आँखों में" },
        "med-5": { dose: "10mg" }
      },
      tasks: {
        "task-1": { title: "पापा के लिए किराना खरीदें", due: "कल" },
        "task-2": { title: "ब्लड प्रेशर की दवाइयाँ फिर से लें", due: "शुक्रवार" },
        "task-3": { title: "लैब रिपोर्ट के लिए कॉल करें", due: "आज" },
        "task-4": { title: "पापा के साथ शाम की सैर", due: "6:30 PM" }
      },
      appointments: {
        "appt-1": { specialty: "सामान्य चिकित्सक", location: "सिटी केयर हॉस्पिटल, कमरा 402" },
        "appt-2": { specialty: "नेत्र विशेषज्ञ", location: "विज़न सेंटर, विंग B" }
      },
      feed: {
        "feed-1": { title: "दीदी ने स्वास्थ्य लॉग अपडेट किया", time: "10 मिनट पहले" },
        "feed-2": { title: "माँ ने दोपहर का खाना खाया", time: "2 घंटे पहले" },
        "feed-3": { title: "राहुल ने शाम की दवाई ली हुई दर्ज की", time: "आज • 10:00 AM" }
      },
      documents: {
        "doc-1": { date: "अपलोड: 12 अक्तूबर 2024", summary: "रूटीन ब्लड टेस्ट" },
        "doc-2": { date: "अपलोड: 28 सितंबर 2024", summary: "डिस्चार्ज सारांश" },
        "doc-3": { date: "अपलोड: 08 सितंबर 2024", summary: "बीमा पहचान पत्र" },
        "doc-4": { date: "अपलोड: 01 नवंबर 2024", summary: "महीने की पर्ची" }
      },
      healthNotes: {
        "log-1": "सुबह आरामदायक रही और भूख अच्छी थी।"
      }
    }
  },
  mr: {
    nav: {
      "/dashboard": "डॅशबोर्ड",
      "/medications": "औषधे",
      "/tasks": "कामे",
      "/appointments": "अपॉइंटमेंट",
      "/activity": "कुटुंब फीड",
      "/health-log": "आरोग्य नोंद",
      "/documents": "दस्तावेज",
      "/settings": "सेटिंग्ज"
    },
    common: {
      appName: "केअरसर्कल",
      primaryCaregiver: "मुख्य काळजीवाहू",
      privacyPolicy: "गोपनीयता धोरण",
      termsOfService: "सेवेच्या अटी",
      accessibility: "सुलभता",
      contactUs: "संपर्क",
      footerLine: "© 2024 केअरसर्कल। कुटुंबांसाठी उबदार, स्पष्ट आणि सहकार्यपूर्ण पद्धतीने तयार केलेले.",
      searchPlaceholder: "पान, औषध किंवा नोंद शोधा",
      todayAtAGlance: "आजची झलक",
      medicinesDue: "बाकी औषधे",
      openTasks: "बाकी कामे",
      emergencyHelp: "आपत्कालीन मदत",
      emergencyChecklist: "आपत्कालीन यादी",
      emergencyStep1: "1. डॉक्टरांना किंवा स्थानिक आपत्कालीन क्रमांकावर फोन करा.",
      emergencyStep2: "2. औषधे आणि अहवाल जवळ ठेवा.",
      emergencyStep3: "3. फीडमधून कुटुंबातील एखाद्याला कळवा.",
      today: "आज",
      all: "सर्व",
      save: "जतन करा",
      saveChanges: "बदल जतन करा",
      savedAutomatically: "आपोआप जतन झाले",
      showAll: "सर्व दाखवा"
    },
    landing: {
      brandLine: "काळजीवाहूंकरिता उबदार डिजिटल आधार",
      heroTitle: "कुटुंब एकत्र राहिले की काळजी घेणे सोपे होते.",
      heroBody: "औषधे, अपॉइंटमेंट, कामे आणि अपडेट्ससाठी एक सोपी सामायिक जागा. कुटुंबातील प्रत्येकासाठी सहज.",
      getStarted: "सुरुवात करा",
      seeHow: "कसे चालते ते पहा",
      home: "मुख्यपृष्ठ",
      features: "वैशिष्ट्ये",
      ourStory: "आमची गोष्ट",
      featuresTitle: "एकत्र काळजी घेण्यासाठी आवश्यक सर्व काही.",
      featuresBody: "विखुरलेले मेसेज आणि कागदी नोट्स यांना स्वच्छ पर्याय.",
      builtTitle: "कुटुंबांसाठी बनलेले, रुग्णालयांसाठी नाही.",
      builtBody: "तंत्रज्ञानाने मदतीचा हात वाटला पाहिजे, गुंतागुंतीची यंत्रणा नाही. CareCircle काळजी शांत, स्पष्ट आणि सामायिक ठेवते.",
      careInYourLanguage: "तुमच्या भाषेत काळजी.",
      careInYourLanguageBody: "भाषा बदला आणि कुटुंबातील प्रत्येकाला सहभाग सोपा करा.",
      quote: "\"तुमच्या घरच्या काळजीचा डिजिटल विस्तार.\"",
      values: ["शांत डिझाइन", "खाजगी आणि सुरक्षित", "संपूर्ण कुटुंब", "AAA सुलभ"],
      languageCards: ["English", "नमस्ते (Hindi)", "नमस्कार (Marathi)"]
    },
    dashboard: {
      greeting: "शुभ प्रभात, कुटुंबा.",
      subtitle: "आजच्या महत्त्वाच्या गोष्टी इथे आहेत.",
      patientStatus: "बाबांची स्थिती",
      mood: "मूड",
      lastMedication: "शेवटचे औषध",
      sleepQuality: "झोपेची गुणवत्ता",
      todaysMedications: "आजची औषधे",
      openPage: "पान उघडा",
      appointments: "अपॉइंटमेंट",
      todaysTasks: "आजची कामे",
      familyFeed: "कुटुंब फीड",
      viewFullFeed: "पूर्ण फीड पहा",
      manageAppointment: "अपॉइंटमेंट पहा",
      allCaughtUp: "आजची सर्व कामे पूर्ण झाली आहेत.",
      noAppointment: "अजून कोणतीही अपॉइंटमेंट नाही.",
      allTaken: "आजची सर्व औषधे घेतली गेली आहेत."
    },
    medications: {
      title: "औषधे",
      subtitle: "आजी सवितासाठी रोजचे औषध वेळापत्रक",
      currentPatient: "सध्याचा रुग्ण",
      addNewMedication: "नवे औषध जोडा",
      medicineName: "औषधाचे नाव",
      medicineNamePlaceholder: "विटामिन D3",
      dose: "मात्रा",
      dosePlaceholder: "1000 IU",
      time: "वेळ",
      period: "वेळ विभाग",
      addMedication: "औषध जोडा",
      morning: "सकाळ",
      afternoon: "दुपार",
      evening: "संध्याकाळ",
      night: "रात्र",
      noMedicines: "या विभागात अजून औषध नाही.",
      markAsTaken: "घेतले असे चिन्हांकित करा",
      skip: "वगळा",
      missed: "चुकले",
      greatJob: "छान काम, सविता!",
      daily: "दैनिक",
      detailedLog: "तपशीलवार नोंद पहा",
      adherenceLine: "औषधे घेतली गेली आहेत. नियमित औषधांमुळे आरोग्य चांगले राहते."
    },
    tasks: {
      title: "कुटुंबाची कामे",
      subtitle: "बाबांची काळजी एकत्र नीट सांभाळूया.",
      newTask: "नवे काम",
      createTask: "काम तयार करा",
      task: "काम",
      taskPlaceholder: "बीपीची औषधे आणा",
      assignedTo: "नेमलेले",
      assigneePlaceholder: "अंजली",
      due: "अंतिम वेळ",
      tag: "टॅग",
      saveTask: "काम जतन करा",
      todo: "बाकी",
      completed: "पूर्ण",
      markDone: "पूर्ण चिन्हांकित करा",
      moveBack: "पुन्हा बाकीमध्ये ठेवा",
      noTasks: "या यादीत अजून काम नाही."
    },
    appointments: {
      title: "अपॉइंटमेंट",
      subtitle: "आपल्या प्रियजनांच्या डॉक्टर भेटी सहज सांभाळा.",
      scheduleAppointment: "अपॉइंटमेंट ठरवा",
      doctorName: "डॉक्टरांचे नाव",
      doctorPlaceholder: "डॉ. मेहता",
      specialty: "विशेषता",
      specialtyPlaceholder: "हृदयरोग तज्ज्ञ",
      dateAndTime: "तारीख आणि वेळ",
      location: "ठिकाण",
      locationPlaceholder: "सिटी हार्ट क्लिनिक",
      saveAppointment: "अपॉइंटमेंट जतन करा",
      upcomingVisits: "आगामी भेटी",
      reminderOn: "स्मरणपत्र चालू",
      reminderOff: "स्मरणपत्र बंद",
      getDirections: "मार्ग पहा",
      turnReminderOff: "स्मरणपत्र बंद करा",
      setReminder: "स्मरणपत्र लावा",
      visitNotes: "भेटीच्या नोंदी",
      visitNotesPlaceholder: "डॉक्टरांना विचारायच्या गोष्टी किंवा सोबत न्यायच्या वस्तू लिहा"
    },
    activity: {
      title: "कुटुंब क्रिया फीड",
      subtitle: "बाबांच्या दिवसातील महत्त्वाच्या गोष्टी कुटुंबासोबत जोडून ठेवा.",
      shareUpdate: "अपडेट शेअर करा",
      postUpdate: "कुटुंब अपडेट पोस्ट करा",
      initial: "पहिले अक्षर",
      initialPlaceholder: "अ",
      update: "अपडेट",
      updatePlaceholder: "बाबांनी जेवण केले आणि आता बरे वाटत आहे.",
      share: "शेअर करा",
      cheer: "उत्साह द्या",
      replyLater: "नंतर उत्तर द्या"
    },
    health: {
      title: "दैनिक आरोग्य तपासणी",
      subtitle: "कुटुंबासाठी रोजचा मूड, झोप, वेदना आणि मोजमाप नोंदवा.",
      howFeeling: "आज बाबा कसे वाटत आहेत?",
      painLevel: "वेदना स्तर (1-10)",
      painPlaceholder: "4",
      sleepHours: "झोपेचे तास",
      sleepPlaceholder: "7.5",
      bloodPressure: "रक्तदाब",
      bloodPressurePlaceholder: "120/80",
      sugarLevel: "साखर स्तर",
      sugarPlaceholder: "110",
      notes: "नोंदी",
      notesPlaceholder: "दिवस कसा गेला, भूक, चालणे, मूड किंवा इतर महत्त्वाची माहिती लिहा.",
      saveLog: "आजची नोंद जतन करा",
      currentSnapshot: "सध्याची झलक",
      recentCheckins: "अलीकडील नोंदी",
      sleepShort: "झोप",
      pain: "वेदना",
      sugar: "साखर"
    },
    documents: {
      title: "दस्तावेज संग्रह",
      subtitle: "कुटुंबाचे आरोग्य रेकॉर्ड सुरक्षित आणि नीट ठेवा.",
      uploadDocument: "दस्तावेज अपलोड करा",
      addDocumentRecord: "दस्तावेज नोंद जोडा",
      fileName: "फाइल नाव",
      fileNamePlaceholder: "रक्त_तपासणी_ऑक्टोबर.pdf",
      category: "वर्ग",
      type: "प्रकार",
      summary: "संक्षेप",
      summaryPlaceholder: "वार्षिक तपासणीचा रक्त तपासणी अहवाल",
      viewFile: "पहा",
      downloadFile: "डाउनलोड",
      saveDocument: "दस्तावेज जतन करा",
      recentDocuments: "अलीकडील दस्तावेज",
      showingAll: "सर्व नोंदी दिसत आहेत",
      filteredBy: "फिल्टर"
    },
    settings: {
      title: "सेटिंग्ज",
      subtitle: "CareCircle कुटुंबातील प्रत्येकासाठी सोपे आणि आरामदायक ठेवा.",
      displayAndLanguage: "डिस्प्ले आणि भाषा",
      textSize: "मजकूर आकार",
      language: "भाषा",
      contrast: "कॉन्ट्रास्ट",
      carePreferences: "काळजी पसंती",
      medicineReminders: "औषध स्मरणपत्रे",
      appointmentAlerts: "अपॉइंटमेंट अलर्ट",
      dailyHealthSummary: "दैनिक आरोग्य सारांश",
      quietHours: "रात्री 10 नंतर शांत वेळ",
      familyAccess: "कुटुंब प्रवेश",
      familyMemberName: "कुटुंब सदस्याचे नाव",
      role: "भूमिका",
      inviteFamilyMember: "कुटुंब सदस्य जोडा",
      standard: "सामान्य",
      large: "मोठा",
      high: "उच्च",
      hindi: "हिंदी",
      marathi: "मराठी"
    },
    values: {
      statuses: {
        Taken: "घेतले",
        Pending: "बाकी",
        Missed: "चुकले",
        Upcoming: "लवकरच",
        Skipped: "वगळले"
      },
      taskTags: {
        Important: "महत्त्वाचे",
        Routine: "रोजचे",
        "Follow-up": "पुन्हा संपर्क",
        Daily: "दैनिक"
      },
      moods: {
        Happy: "आनंदी",
        Neutral: "सामान्य",
        Tired: "थकलेले",
        Unwell: "बरे नाही"
      },
      categories: {
        Prescriptions: "प्रिस्क्रिप्शन",
        "Lab Reports": "लॅब अहवाल",
        "Discharge Papers": "डिस्चार्ज कागदपत्रे",
        "Identity Docs": "ओळखपत्रे",
        Other: "इतर"
      },
      roles: {
        "Full access": "पूर्ण प्रवेश",
        "Can update tasks": "कामे अपडेट करू शकतात",
        "Read-only": "फक्त पाहू शकतात"
      },
      badges: {
        DONE: "पूर्ण",
        "GOOD DAY": "चांगला दिवस",
        "NEW FILE": "नवीन फाइल",
        UPDATE: "अपडेट"
      }
    },
    seed: {
      medications: {
        "med-1": { note: "प्रियाने 8:15 AM ला नोंद केले", dose: "500mg • जेवणानंतर" },
        "med-2": { note: "घेतले असे चिन्हांकित करा", dose: "1000 IU • रोज" },
        "med-3": { note: "वगळा किंवा आत्ताच घ्या", dose: "200mg • दुपारच्या जेवणासोबत" },
        "med-4": { dose: "दोन्ही डोळ्यांत" },
        "med-5": { dose: "10mg" }
      },
      tasks: {
        "task-1": { title: "बाबांसाठी किराणा आणा", due: "उद्या" },
        "task-2": { title: "रक्तदाबाची औषधे पुन्हा घ्या", due: "शुक्रवार" },
        "task-3": { title: "लॅब अहवालासाठी फोन करा", due: "आज" },
        "task-4": { title: "बाबांसोबत संध्याकाळची सैर", due: "6:30 PM" }
      },
      appointments: {
        "appt-1": { specialty: "सामान्य डॉक्टर", location: "सिटी केअर हॉस्पिटल, खोली 402" },
        "appt-2": { specialty: "नेत्रतज्ज्ञ", location: "व्हिजन सेंटर, विंग B" }
      },
      feed: {
        "feed-1": { title: "ताईंनी आरोग्य नोंद अपडेट केली", time: "10 मिनिटांपूर्वी" },
        "feed-2": { title: "आईने दुपारचे जेवण केले", time: "2 तासांपूर्वी" },
        "feed-3": { title: "राहुलने संध्याकाळचे औषध घेतले असे नोंदवले", time: "आज • 10:00 AM" }
      },
      documents: {
        "doc-1": { date: "अपलोड: 12 ऑक्टोबर 2024", summary: "नियमित रक्त तपासणी" },
        "doc-2": { date: "अपलोड: 28 सप्टेंबर 2024", summary: "डिस्चार्ज सारांश" },
        "doc-3": { date: "अपलोड: 08 सप्टेंबर 2024", summary: "विमा ओळखपत्र" },
        "doc-4": { date: "अपलोड: 01 नोव्हेंबर 2024", summary: "मासिक प्रिस्क्रिप्शन" }
      },
      healthNotes: {
        "log-1": "सकाळ आरामदायक होती आणि भूक चांगली होती."
      }
    }
  }
} as const;

export type Translation = (typeof copy)[keyof typeof copy];

export function getNavLabel(t: Translation, href: NavHref) {
  return t.nav[href];
}
