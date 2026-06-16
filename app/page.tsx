"use client";

import Link from "next/link";

import { Icon } from "@/components/icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { Button, Card } from "@/components/ui";
import { getAuthCopy } from "@/lib/auth-copy";

export default function LandingPage() {
  const { t, locale } = useLanguage();
  const authCopy = getAuthCopy(locale);

  const featureCards = [
    {
      title: locale === "hi" ? "à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤¦à¤µà¤¾à¤ˆ à¤°à¤¿à¤®à¤¾à¤‡à¤‚à¤¡à¤°" : locale === "mr" ? "à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤”à¤·à¤§ à¤¸à¥à¤®à¤°à¤£à¤ªà¤¤à¥à¤°à¥‡" : "Smart Medication Reminders",
      body:
        locale === "hi"
          ? "à¤¦à¤µà¤¾ à¤›à¥‚à¤Ÿà¥‡ à¤¨à¤¹à¥€à¤‚à¥¤ à¤¦à¤µà¤¾ à¤²à¥€ à¤—à¤ˆ à¤¯à¤¾ à¤›à¥‚à¤Ÿà¥€, à¤‡à¤¸à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤ªà¥‚à¤°à¥‡ à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥‹ à¤®à¤¿à¤²à¥‡à¥¤"
          : locale === "mr"
            ? "à¤”à¤·à¤§ à¤šà¥à¤•à¥‚ à¤¨à¤¯à¥‡à¤¤. à¤”à¤·à¤§ à¤˜à¥‡à¤¤à¤²à¥‡ à¤•à¤¿à¤‚à¤µà¤¾ à¤šà¥à¤•à¤²à¥‡ à¤¯à¤¾à¤šà¥€ à¤®à¤¾à¤¹à¤¿à¤¤à¥€ à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤•à¥à¤Ÿà¥à¤‚à¤¬à¤¾à¤²à¤¾ à¤®à¤¿à¤³à¥‚ à¤¦à¥‡."
            : "Never miss a dose again. Alerts for the whole family when medicine is taken or missed.",
      icon: "medical_services",
      accent: "bg-accent",
      badge: locale === "hi" ? "à¤¹à¤²à¥à¤•à¤¾ à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤¸: à¤ªà¥‚à¤°à¤¾" : locale === "mr" ? "à¤®à¤Š à¤¸à¥à¤¥à¤¿à¤¤à¥€: à¤ªà¥‚à¤°à¥à¤£" : "Pastel-Semantic: Done"
    },
    {
      title: locale === "hi" ? "à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥‡ à¤¸à¤¾à¤à¤¾ à¤•à¤¾à¤®" : locale === "mr" ? "à¤•à¥à¤Ÿà¥à¤‚à¤¬à¤¾à¤šà¥€ à¤¸à¤¾à¤®à¤¾à¤¯à¤¿à¤• à¤•à¤¾à¤®à¥‡" : "Shared Family Tasks",
      body:
        locale === "hi"
          ? "à¤•à¤¿à¤°à¤¾à¤¨à¤¾, à¤¸à¤«à¤¾à¤ˆ à¤”à¤° à¤°à¥‹à¤œà¤¼ à¤•à¥€ à¤¦à¥‡à¤–à¤­à¤¾à¤² à¤•à¥‹ à¤¬à¤¿à¤¨à¤¾ à¤¬à¤¾à¤°-à¤¬à¤¾à¤° à¤®à¥ˆà¤¸à¥‡à¤œ à¤•à¤¿à¤ à¤®à¤¿à¤²à¤•à¤° à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚à¥¤"
          : locale === "mr"
            ? "à¤•à¤¿à¤°à¤¾à¤£à¤¾, à¤¸à¥à¤µà¤šà¥à¤›à¤¤à¤¾ à¤†à¤£à¤¿ à¤°à¥‹à¤œà¤šà¥€ à¤•à¤¾à¤³à¤œà¥€ à¤µà¤¾à¤°à¤‚à¤µà¤¾à¤° à¤®à¥‡à¤¸à¥‡à¤œ à¤¨ à¤•à¤°à¤¤à¤¾ à¤à¤•à¤¤à¥à¤° à¤¸à¤¾à¤‚à¤­à¤¾à¤³à¤¾."
            : "Coordinate grocery runs, cleaning, and daily check-ins without back-and-forth texting.",
      icon: "checklist",
      accent: "bg-accent2",
      avatars: ["bg-[#b5d4bc]", "bg-[#d0c7bc]", "bg-[#b8d8ea]"]
    },
    {
      title: locale === "hi" ? "à¤†à¤¸à¤¾à¤¨ à¤…à¤ªà¥‰à¤‡à¤‚à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤Ÿà¥à¤°à¥ˆà¤•à¤¿à¤‚à¤—" : locale === "mr" ? "à¤¸à¥‹à¤ªà¥‡ à¤…à¤ªà¥‰à¤‡à¤‚à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤Ÿà¥à¤°à¥…à¤•à¤¿à¤‚à¤—" : "Easy Appointment Tracking",
      body:
        locale === "hi"
          ? "à¤¡à¥‰à¤•à¥à¤Ÿà¤° à¤µà¤¿à¤œà¤¼à¤¿à¤Ÿ, à¤¥à¥‡à¤°à¥‡à¤ªà¥€ à¤”à¤° à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥€ à¤œà¤¼à¤°à¥‚à¤°à¥€ à¤®à¥à¤²à¤¾à¤•à¤¾à¤¤à¥‡à¤‚ à¤à¤• à¤¸à¤¾à¤à¤¾ à¤•à¥ˆà¤²à¥‡à¤‚à¤¡à¤° à¤®à¥‡à¤‚à¥¤"
          : locale === "mr"
            ? "à¤¡à¥‰à¤•à¥à¤Ÿà¤° à¤­à¥‡à¤Ÿà¥€, à¤¥à¥‡à¤°à¤ªà¥€ à¤†à¤£à¤¿ à¤•à¥à¤Ÿà¥à¤‚à¤¬à¤¾à¤šà¥à¤¯à¤¾ à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥à¤¯à¤¾ à¤­à¥‡à¤Ÿà¥€ à¤à¤•à¤¾à¤š à¤¸à¤¾à¤®à¤¾à¤¯à¤¿à¤• à¤•à¥…à¤²à¥‡à¤‚à¤¡à¤°à¤®à¤§à¥à¤¯à¥‡."
            : "A shared calendar for doctor visits, therapy sessions, and family gatherings that everyone can see.",
      icon: "event",
      accent: "bg-primary-soft",
      footer: locale === "hi" ? "à¤¸à¤­à¥€ à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤ªà¤° à¤¸à¤¿à¤‚à¤•" : locale === "mr" ? "à¤¸à¤°à¥à¤µ à¤‰à¤ªà¤•à¤°à¤£à¤¾à¤‚à¤µà¤° à¤¸à¤¿à¤‚à¤•" : "Synced across all devices"
    }
  ];

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-transparent bg-[#fff8f1]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="text-h2 font-semibold tracking-[-0.03em] text-primary">{t.common.appName}</div>
          <nav className="hidden items-center gap-8 text-label font-medium md:flex">
            <a className="border-b border-primary pb-1" href="#home">{t.landing.home}</a>
            <a href="#features">{t.landing.features}</a>
            <a href="#story">{t.landing.ourStory}</a>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <section className="mx-auto grid max-w-[1320px] gap-10 px-4 py-10 md:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-14" id="home">
        <div className={locale === "en" ? "" : "lang-devanagari"}>
          <div className="mb-5 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary shadow-card">{t.landing.brandLine}</div>
          <h1 className="max-w-[12ch] text-hero font-bold tracking-[-0.04em] text-foreground md:text-display">{t.landing.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-body text-text-muted">{t.landing.heroBody}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button icon="rocket_launch">{t.landing.getStarted}</Button>
            </Link>
            <Link href="/login">
              <Button icon="login" variant="secondary">
                {authCopy.signIn}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 -top-8 h-28 w-28 rounded-full bg-accent opacity-70 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-accent2 opacity-80 blur-3xl" />
          <div className="relative overflow-hidden rounded-[34px] border-[10px] border-white shadow-soft">
            <img
              alt="Family together with an elder"
              className="h-[360px] w-full object-cover md:h-[500px]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH_Hef18Flv5R3no1VtFuCVinWzQMyJ3PdvKhQTm085U47YaNUtzDBtkTit209nF6dVBey3EgMt_b0EjNV3wiHT4h0xI0pS6ejuLfSDWR4_8AS1Y8HlPPZNZ-HyzElw2V2o-kmBAJaygIr7RaLWFbNPLO_1idBDnCDA_TMuzEu6I3Ow6CARogSwoF-zftBh3PlZ98IpapmurNhxsufZoZCcqeb659YNbDLpuIEwrbIAjQeGr5pQYMY1g"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f7efe6] py-16" id="features">
        <div className="mx-auto max-w-[1320px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={locale === "en" ? "text-h2 font-bold text-primary" : "lang-devanagari text-h2 font-bold text-primary"}>{t.landing.featuresTitle}</h2>
            <p className="mt-4 text-body text-text-muted">{t.landing.featuresBody}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featureCards.map((card) => (
              <Card key={card.title} className="flex min-h-[300px] flex-col p-6">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[22px] ${card.accent} text-primary`}>
                  <Icon className="text-[1.35rem]" name={card.icon} />
                </div>
                <h3 className="text-h3 font-semibold">{card.title}</h3>
                <p className="mt-3 text-body text-text-muted">{card.body}</p>
                <div className="mt-auto pt-5">
                  {card.badge ? <span className="rounded-full bg-surface-muted px-4 py-2 text-sm text-text-muted">{card.badge}</span> : null}
                  {card.avatars ? (
                    <div className="flex -space-x-2">
                      {card.avatars.map((tone) => (
                        <div key={tone} className={`h-8 w-8 rounded-full border-2 border-white ${tone}`} />
                      ))}
                    </div>
                  ) : null}
                  {card.footer ? <div className="flex items-center gap-2 text-sm text-text-muted"><Icon className="text-[18px]" name="sync" />{card.footer}</div> : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-14 md:px-6" id="story">
        <div className="dotted-panel grid gap-8 rounded-[34px] px-7 py-8 text-white shadow-soft md:grid-cols-[1fr_360px] md:px-9 md:py-10">
          <div>
            <h2 className="text-h2 font-bold">{t.landing.builtTitle}</h2>
            <p className="mt-4 max-w-xl text-body text-white/86">{t.landing.builtBody}</p>
            <div className="mt-7 grid gap-4 text-label sm:grid-cols-2">
              {t.landing.values.map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <Icon className="text-[1rem]" name="favorite" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-[252px] w-[252px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 text-center text-[1.7rem] font-medium italic leading-tight">
              <div>
                <Icon className="mb-4 text-[2rem]" name="home" />
                <div>{t.landing.quote}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-line bg-[#f3ece4] px-7 py-9 text-center shadow-card">
          <Icon className="text-[2.1rem] text-primary" name="translate" />
          <h3 className={locale === "en" ? "mt-3 text-h3 font-semibold text-primary" : "lang-devanagari mt-3 text-h3 font-semibold text-primary"}>{t.landing.careInYourLanguage}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-body text-text-muted">{t.landing.careInYourLanguageBody}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {t.landing.languageCards.map((item) => (
              <div className="rounded-xl border border-[#bfd6cb] bg-white px-4 py-2.5 text-sm font-medium" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line/70 bg-[#ece5dc] px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-h2 font-semibold text-primary">{t.common.appName}</div>
            <p className="mt-2 text-text-muted">{t.common.footerLine}</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-medium text-text-muted">
            <span>{t.common.privacyPolicy}</span>
            <span>{t.common.termsOfService}</span>
            <span>{t.common.accessibility}</span>
            <span>{t.common.contactUs}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
