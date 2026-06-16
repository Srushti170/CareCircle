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
    eyebrow: "Warm, simple family care",
    welcomeTitle: "Keep your family's care in one calm place.",
    welcomeBody: "CareCircle helps families share updates, medicines, appointments, and daily care without confusion.",
    loginTitle: "Welcome back",
    loginBody: "Sign in to your Care Circle and continue where your family left off.",
    signupTitle: "Create your Care Circle",
    signupBody: "The first account is always the Primary Caregiver. You will set up the patient profile and invite your family next.",
    inviteTitle: "Invite family",
    inviteBody: "Send a simple invite so family members or the patient can join with the right role.",
    onboardingTitle: "Set up your Care Circle",
    onboardingBody: "We will do this in four easy steps so your family can start using the app right away.",
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
    patientShortName: "Patient short name",
    patientFullName: "Patient full name",
    relation: "How are you related?",
    age: "Age",
    careNeeds: "Care notes",
    inviteName: "Invitee name",
    inviteEmail: "Invitee email",
    role: "Role",
    sendInvite: "Send invite",
    openDashboard: "Open dashboard",
    alreadyAccount: "Already have an account?",
    noAccount: "New to CareCircle?",
    stepAccount: "Primary caregiver account",
    stepCircle: "Create the Care Circle",
    stepPatient: "Add patient details",
    stepInvite: "Invite family members",
    stepDone: "Ready to go",
    helperInviteCode: "Share this code or link with your family.",
    helperCircle: "Choose a simple name the whole family will recognize.",
    helperPatient: "Use plain details so every family member can understand them.",
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
    eyebrow: "सरल और अपनापन भरी देखभाल",
    welcomeTitle: "अपने परिवार की देखभाल एक शांत जगह पर रखें।",
    welcomeBody: "CareCircle परिवार को दवाइयाँ, अपॉइंटमेंट, अपडेट और रोज़ की देखभाल बिना उलझन के साथ रखने में मदद करता है।",
    loginTitle: "फिर से स्वागत है",
    loginBody: "अपने Care Circle में साइन इन करें और वहीं से शुरू करें जहाँ परिवार ने छोड़ा था।",
    signupTitle: "अपना Care Circle बनाइए",
    signupBody: "पहला अकाउंट हमेशा मुख्य देखभालकर्ता का होता है। इसके बाद आप मरीज की जानकारी जोड़ेंगे और परिवार को आमंत्रित करेंगे।",
    inviteTitle: "परिवार को आमंत्रित करें",
    inviteBody: "सरल आमंत्रण भेजें ताकि परिवार के सदस्य या मरीज सही भूमिका के साथ जुड़ सकें।",
    onboardingTitle: "अपना Care Circle सेट करें",
    onboardingBody: "यह चार आसान चरणों में होगा ताकि आपका परिवार तुरंत ऐप का उपयोग शुरू कर सके।",
    createAccount: "अकाउंट बनाइए",
    signIn: "साइन इन करें",
    continue: "आगे बढ़ें",
    finishSetup: "सेटअप पूरा करें",
    backToHome: "होम पर वापस जाएँ",
    goToLogin: "लॉगिन पर जाएँ",
    goToSignup: "नया अकाउंट बनाइए",
    email: "ईमेल पता",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    careCircleName: "Care Circle का नाम",
    patientShortName: "मरीज का छोटा नाम",
    patientFullName: "मरीज का पूरा नाम",
    relation: "आपका रिश्ता",
    age: "उम्र",
    careNeeds: "देखभाल नोट्स",
    inviteName: "जिसे बुलाना है उसका नाम",
    inviteEmail: "आमंत्रित ईमेल",
    role: "भूमिका",
    sendInvite: "आमंत्रण भेजें",
    openDashboard: "डैशबोर्ड खोलें",
    alreadyAccount: "पहले से अकाउंट है?",
    noAccount: "CareCircle पर नए हैं?",
    stepAccount: "मुख्य देखभालकर्ता अकाउंट",
    stepCircle: "Care Circle बनाइए",
    stepPatient: "मरीज की जानकारी जोड़ें",
    stepInvite: "परिवार को आमंत्रित करें",
    stepDone: "सब तैयार है",
    helperInviteCode: "यह कोड या लिंक अपने परिवार के साथ साझा करें।",
    helperCircle: "ऐसा आसान नाम चुनें जिसे पूरा परिवार पहचान सके।",
    helperPatient: "साधारण जानकारी लिखें ताकि हर सदस्य आसानी से समझ सके।",
    inviteSent: "आमंत्रण साझा करने के लिए तैयार है",
    pendingInvites: "बाकी आमंत्रण",
    noInvites: "अभी कोई आमंत्रण नहीं है। शुरू करने के लिए एक सदस्य जोड़ें।",
    joinWithInvite: "आमंत्रण से जुड़ें",
    shareLink: "आमंत्रण लिंक",
    signOut: "साइन आउट",
    roles: {
      "Primary Caregiver": "मुख्य देखभालकर्ता",
      "Family Member": "परिवार सदस्य",
      Patient: "मरीज"
    }
  },
  mr: {
    eyebrow: "सोपे आणि आपुलकीचे कुटुंबीय संगोपन",
    welcomeTitle: "कुटुंबाची काळजी एका शांत जागेत ठेवा.",
    welcomeBody: "CareCircle मुळे औषधे, भेटी, अपडेट्स आणि रोजची काळजी गोंधळ न करता एकत्र राहते.",
    loginTitle: "पुन्हा स्वागत आहे",
    loginBody: "तुमच्या Care Circle मध्ये साइन इन करा आणि कुटुंबाने जिथे थांबले तिथून पुढे सुरू करा.",
    signupTitle: "तुमचे Care Circle तयार करा",
    signupBody: "पहिले खाते नेहमी मुख्य काळजीवाहकाचे असते. त्यानंतर तुम्ही रुग्णाची माहिती भराल आणि कुटुंबाला आमंत्रित कराल.",
    inviteTitle: "कुटुंबाला आमंत्रित करा",
    inviteBody: "सोपे आमंत्रण पाठवा जेणेकरून कुटुंबातील सदस्य किंवा रुग्ण योग्य भूमिकेसह जोडले जातील.",
    onboardingTitle: "तुमचे Care Circle सेट करा",
    onboardingBody: "हे चार सोप्या टप्प्यांत होईल, त्यामुळे तुमचे कुटुंब लगेच अॅप वापरू शकेल.",
    createAccount: "खाते तयार करा",
    signIn: "साइन इन करा",
    continue: "पुढे जा",
    finishSetup: "सेटअप पूर्ण करा",
    backToHome: "होमकडे परत जा",
    goToLogin: "लॉगिनकडे जा",
    goToSignup: "नवे खाते तयार करा",
    email: "ईमेल पत्ता",
    password: "पासवर्ड",
    fullName: "पूर्ण नाव",
    careCircleName: "Care Circle चे नाव",
    patientShortName: "रुग्णाचे छोटे नाव",
    patientFullName: "रुग्णाचे पूर्ण नाव",
    relation: "तुमचे नाते",
    age: "वय",
    careNeeds: "काळजी नोंदी",
    inviteName: "आमंत्रित व्यक्तीचे नाव",
    inviteEmail: "आमंत्रित ईमेल",
    role: "भूमिका",
    sendInvite: "आमंत्रण पाठवा",
    openDashboard: "डॅशबोर्ड उघडा",
    alreadyAccount: "आधीच खाते आहे का?",
    noAccount: "CareCircle वर नवीन आहात?",
    stepAccount: "मुख्य काळजीवाहक खाते",
    stepCircle: "Care Circle तयार करा",
    stepPatient: "रुग्णाची माहिती भरा",
    stepInvite: "कुटुंबाला आमंत्रित करा",
    stepDone: "सगळे तयार आहे",
    helperInviteCode: "हा कोड किंवा लिंक तुमच्या कुटुंबासोबत शेअर करा.",
    helperCircle: "संपूर्ण कुटुंबाला ओळखता येईल असे सोपे नाव निवडा.",
    helperPatient: "प्रत्येक सदस्याला समजेल अशी साधी माहिती लिहा.",
    inviteSent: "आमंत्रण शेअर करण्यासाठी तयार आहे",
    pendingInvites: "बाकी आमंत्रणे",
    noInvites: "अजून आमंत्रण नाही. सुरुवातीला एक सदस्य जोडा.",
    joinWithInvite: "आमंत्रण वापरून जॉइन करा",
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
