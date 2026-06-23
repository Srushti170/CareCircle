import type { CareRole } from "@/lib/app-state";
import type { Locale } from "@/lib/i18n";

type AuthCopy = {
  eyebrow: string;
  welcomeTitle: string;
  welcomeBody: string;
  loginTitle: string;
  loginBody: string;
  signupTitle: string;
  signupBody: string;
  inviteTitle: string;
  inviteBody: string;
  onboardingTitle: string;
  onboardingBody: string;
  createAccount: string;
  signIn: string;
  continue: string;
  finishSetup: string;
  backToHome: string;
  goToLogin: string;
  goToSignup: string;
  email: string;
  password: string;
  fullName: string;
  careCircleName: string;
  patientShortName: string;
  patientFullName: string;
  relation: string;
  age: string;
  careNeeds: string;
  inviteName: string;
  inviteEmail: string;
  role: string;
  sendInvite: string;
  openDashboard: string;
  alreadyAccount: string;
  noAccount: string;
  stepAccount: string;
  stepCircle: string;
  stepPatient: string;
  stepInvite: string;
  stepDone: string;
  helperInviteCode: string;
  helperCircle: string;
  helperPatient: string;
  inviteSent: string;
  pendingInvites: string;
  noInvites: string;
  joinWithInvite: string;
  shareLink: string;
  signOut: string;
  roles: Record<CareRole, string>;
};

export const authCopy: Record<Locale, AuthCopy> = {
  en: {
    eyebrow: "Simple family care, together",
    welcomeTitle: "Keep your family's care in one calm place.",
    welcomeBody: "CareCircle helps your family manage medicines, appointments, updates, and daily care without confusion.",
    loginTitle: "Welcome back",
    loginBody: "Sign in to your Care Circle and pick up where your family left off.",
    signupTitle: "Create your Care Circle",
    signupBody: "The first account is always the Primary Caregiver. Next, you will add patient details and invite the family.",
    inviteTitle: "Invite family",
    inviteBody: "Send a simple invite so family members or the patient can join with the right role.",
    onboardingTitle: "Set up your Care Circle",
    onboardingBody: "We will guide you through a few simple steps so your family can start using CareCircle right away.",
    createAccount: "Create account",
    signIn: "Sign in",
    continue: "Continue",
    finishSetup: "Finish setup",
    backToHome: "Back to home",
    goToLogin: "Go to login",
    goToSignup: "Create a new account",
    email: "Email address",
    password: "Password",
    fullName: "Full name",
    careCircleName: "Care Circle name",
    patientShortName: "Patient name",
    patientFullName: "Patient full name",
    relation: "Relation",
    age: "Age",
    careNeeds: "Care notes",
    inviteName: "Name",
    inviteEmail: "Email",
    role: "Role",
    sendInvite: "Send invite",
    openDashboard: "Open dashboard",
    alreadyAccount: "Already have an account?",
    noAccount: "New to CareCircle?",
    stepAccount: "Primary caregiver account",
    stepCircle: "Create Care Circle",
    stepPatient: "Add patient details",
    stepInvite: "Invite family",
    stepDone: "All set",
    helperInviteCode: "Share this code or link with your family.",
    helperCircle: "Choose a name your family will recognize easily.",
    helperPatient: "Keep the details simple so everyone can understand them.",
    inviteSent: "Invite ready to share",
    pendingInvites: "Pending invites",
    noInvites: "No invites yet. Add one family member to get started.",
    joinWithInvite: "Join with invite",
    shareLink: "Invite link",
    signOut: "Sign out",
    roles: {
      "Primary Caregiver": "Primary Caregiver",
      "Family Member": "Family Member",
      Patient: "Patient"
    }
  },
  hi: {
    eyebrow: "परिवार की देखभाल, एक साथ",
    welcomeTitle: "परिवार की देखभाल एक शांत और आसान जगह पर रखें।",
    welcomeBody: "CareCircle आपके परिवार को दवाइयाँ, अपॉइंटमेंट, अपडेट और रोज़ की देखभाल एक जगह संभालने में मदद करता है।",
    loginTitle: "वापसी पर स्वागत है",
    loginBody: "अपने Care Circle में साइन इन करें और वहीं से आगे बढ़ें जहाँ परिवार ने छोड़ा था।",
    signupTitle: "अपना Care Circle बनाएँ",
    signupBody: "पहला अकाउंट हमेशा मुख्य देखभालकर्ता का होता है। इसके बाद आप मरीज़ की जानकारी जोड़ेंगे और परिवार को आमंत्रित करेंगे।",
    inviteTitle: "परिवार को आमंत्रित करें",
    inviteBody: "एक आसान आमंत्रण भेजें ताकि परिवार के सदस्य या मरीज़ सही भूमिका के साथ जुड़ सकें।",
    onboardingTitle: "अपना Care Circle सेट करें",
    onboardingBody: "कुछ आसान चरणों में सेटअप पूरा करें, ताकि परिवार तुरंत CareCircle इस्तेमाल कर सके।",
    createAccount: "अकाउंट बनाएँ",
    signIn: "साइन इन करें",
    continue: "आगे बढ़ें",
    finishSetup: "सेटअप पूरा करें",
    backToHome: "होम पर जाएँ",
    goToLogin: "लॉगिन पर जाएँ",
    goToSignup: "नया अकाउंट बनाएँ",
    email: "ईमेल पता",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    careCircleName: "Care Circle का नाम",
    patientShortName: "मरीज़ का नाम",
    patientFullName: "मरीज़ का पूरा नाम",
    relation: "रिश्ता",
    age: "उम्र",
    careNeeds: "देखभाल नोट्स",
    inviteName: "नाम",
    inviteEmail: "ईमेल",
    role: "भूमिका",
    sendInvite: "आमंत्रण भेजें",
    openDashboard: "डैशबोर्ड खोलें",
    alreadyAccount: "क्या आपका अकाउंट पहले से है?",
    noAccount: "क्या आप CareCircle पर नए हैं?",
    stepAccount: "मुख्य देखभालकर्ता अकाउंट",
    stepCircle: "Care Circle बनाएँ",
    stepPatient: "मरीज़ की जानकारी जोड़ें",
    stepInvite: "परिवार को आमंत्रित करें",
    stepDone: "सब तैयार है",
    helperInviteCode: "यह कोड या लिंक परिवार के साथ शेयर करें।",
    helperCircle: "ऐसा नाम चुनें जिसे पूरा परिवार आसानी से पहचान सके।",
    helperPatient: "जानकारी आसान रखें ताकि हर सदस्य समझ सके।",
    inviteSent: "आमंत्रण शेयर करने के लिए तैयार है",
    pendingInvites: "बाकी आमंत्रण",
    noInvites: "अभी कोई आमंत्रण नहीं है। शुरू करने के लिए एक सदस्य जोड़ें।",
    joinWithInvite: "आमंत्रण से जुड़ें",
    shareLink: "आमंत्रण लिंक",
    signOut: "साइन आउट",
    roles: {
      "Primary Caregiver": "मुख्य देखभालकर्ता",
      "Family Member": "परिवार सदस्य",
      Patient: "मरीज़"
    }
  },
  mr: {
    eyebrow: "कुटुंबाची काळजी, एकत्र",
    welcomeTitle: "कुटुंबाची काळजी एका शांत आणि सोप्या जागेत ठेवा.",
    welcomeBody: "CareCircle मुळे औषधे, अपॉइंटमेंट, अपडेट्स आणि रोजची काळजी एका ठिकाणी सांभाळता येते.",
    loginTitle: "पुन्हा स्वागत आहे",
    loginBody: "तुमच्या Care Circle मध्ये साइन इन करा आणि कुटुंबाने जिथे थांबले तिथून पुढे सुरू करा.",
    signupTitle: "तुमचे Care Circle तयार करा",
    signupBody: "पहिले खाते नेहमी मुख्य काळजीवाहकाचे असते. त्यानंतर तुम्ही रुग्णाची माहिती भराल आणि कुटुंबाला आमंत्रित कराल.",
    inviteTitle: "कुटुंबाला आमंत्रित करा",
    inviteBody: "सोपे आमंत्रण पाठवा, जेणेकरून कुटुंबातील सदस्य किंवा रुग्ण योग्य भूमिकेसह जोडता येतील.",
    onboardingTitle: "तुमचे Care Circle सेट करा",
    onboardingBody: "काही सोप्या टप्प्यांत सेटअप पूर्ण करा, म्हणजे कुटुंब लगेच CareCircle वापरू शकेल.",
    createAccount: "खाते तयार करा",
    signIn: "साइन इन करा",
    continue: "पुढे जा",
    finishSetup: "सेटअप पूर्ण करा",
    backToHome: "होमकडे जा",
    goToLogin: "लॉगिनकडे जा",
    goToSignup: "नवे खाते तयार करा",
    email: "ईमेल पत्ता",
    password: "पासवर्ड",
    fullName: "पूर्ण नाव",
    careCircleName: "Care Circle चे नाव",
    patientShortName: "रुग्णाचे नाव",
    patientFullName: "रुग्णाचे पूर्ण नाव",
    relation: "नाते",
    age: "वय",
    careNeeds: "काळजी नोंदी",
    inviteName: "नाव",
    inviteEmail: "ईमेल",
    role: "भूमिका",
    sendInvite: "आमंत्रण पाठवा",
    openDashboard: "डॅशबोर्ड उघडा",
    alreadyAccount: "आधीच खाते आहे का?",
    noAccount: "CareCircle वर नवीन आहात का?",
    stepAccount: "मुख्य काळजीवाहक खाते",
    stepCircle: "Care Circle तयार करा",
    stepPatient: "रुग्णाची माहिती भरा",
    stepInvite: "कुटुंबाला आमंत्रित करा",
    stepDone: "सगळे तयार आहे",
    helperInviteCode: "हा कोड किंवा लिंक कुटुंबासोबत शेअर करा.",
    helperCircle: "संपूर्ण कुटुंबाला ओळखता येईल असे सोपे नाव निवडा.",
    helperPatient: "माहिती साधी ठेवा, म्हणजे प्रत्येकाला समजेल.",
    inviteSent: "आमंत्रण शेअर करण्यासाठी तयार आहे",
    pendingInvites: "बाकी आमंत्रणे",
    noInvites: "अजून आमंत्रण नाही. सुरुवातीला एक सदस्य जोडा.",
    joinWithInvite: "आमंत्रणाने जॉइन करा",
    shareLink: "आमंत्रण लिंक",
    signOut: "साइन आउट",
    roles: {
      "Primary Caregiver": "मुख्य काळजीवाहक",
      "Family Member": "कुटुंब सदस्य",
      Patient: "रुग्ण"
    }
  }
};

export function getAuthCopy(locale: Locale) {
  return authCopy[locale];
}
