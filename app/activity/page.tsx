"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader } from "@/components/ui";

export default function ActivityPage() {
  const { t, locale } = useLanguage();
  const { state, addFeedEntry, reactToFeed } = useCare();
  const [user, setUser] = useState("A");
  const [message, setMessage] = useState("");

  return (
    <AppShell>
      <PageHeader action={<Button icon="add">{t.activity.shareUpdate}</Button>} subtitle={t.activity.subtitle} title={t.activity.title} />

      <Card className="mb-8 p-6">
        <h2 className="text-h2 font-semibold text-primary">{t.activity.postUpdate}</h2>
        <form
          className="mt-5 grid gap-4 md:grid-cols-[120px_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            if (!message.trim()) {
              return;
            }
            addFeedEntry({ user, title: message, kind: "family" });
            setMessage("");
          }}
        >
          <Field label={t.activity.initial}>
            <Input maxLength={1} onChange={(event) => setUser(event.target.value.toUpperCase() || "A")} placeholder={t.activity.initialPlaceholder} value={user} />
          </Field>
          <Field label={t.activity.update}>
            <Input
              onChange={(event) => setMessage(event.target.value)}
              placeholder={
                state.patient.name ? (
                  locale === "hi" ? `${state.patient.name} ने खाना खा लिया है और अब बेहतर महसूस कर रहे हैं।` :
                  locale === "mr" ? `${state.patient.name}ंनी जेवण केले आणि आता त्यांना बरं वाटत आहे.` :
                  `${state.patient.name} had lunch and is feeling better.`
                ) : t.activity.updatePlaceholder
              }
              value={message}
            />
          </Field>
          <div className="flex items-end">
            <Button className="w-full" icon="send" type="submit">
              {t.activity.share}
            </Button>
          </div>
        </form>
      </Card>

      {state.feed.length === 0 ? (
        <EmptyState
          icon="groups"
          title={t.activity.title}
          description={
            state.patient.name ? (
              locale === "hi" ? `परिवार फ़ीड में अभी तक कोई अपडेट नहीं है। शेयर करें कि ${state.patient.name} कैसे हैं या ऊपर एक अपडेट पोस्ट करें!` :
              locale === "mr" ? `कुटुंब फीडमध्ये अद्याप कोणतेही अपडेट नाहीत. ${state.patient.name} कसे आहेत ते शेअर करा किंवा वर एक अपडेट पोस्ट करा!` :
              `No updates in the family feed yet. Share how ${state.patient.name} is doing or post an update above!`
            ) : "No updates in the family feed yet. Share how Dad is doing or post an update above!"
          }
        />
      ) : (
        <div className="relative space-y-8 before:absolute before:bottom-0 before:left-[28px] before:top-[68px] before:w-[2px] before:bg-[repeating-linear-gradient(to_bottom,transparent,transparent_10px,#d6cec5_10px,#d6cec5_18px)]">
          <div className="relative flex items-center gap-4">
            <span className="rounded-xl bg-surface-muted px-3 py-2 text-sm font-semibold text-text-muted">{t.common.today}</span>
            <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-accent" />
            <div className="h-px flex-1 bg-line" />
          </div>

          {state.feed.map((item) => (
            <div className="relative flex gap-4 pl-2" key={item.id}>
              <div className="w-16 pt-6 text-right text-sm text-text-muted">{item.time}</div>
              <div className="z-10 mt-7 h-4 w-4 rounded-full border-2 border-primary bg-white" />
              <Card className="flex-1 p-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-surface-muted text-primary">
                    <Icon name={item.icon} />
                  </div>
                  <div className="flex-1">
                    <div className="text-h3 font-medium">{item.title}</div>
                    <div className="mt-3 inline-flex rounded-full bg-surface-muted px-3 py-1 text-sm font-bold text-text-muted">{t.values.badges[item.badge as keyof typeof t.values.badges] ?? item.badge}</div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-full bg-surface-muted px-4 py-3 text-base text-text-muted" onClick={() => reactToFeed(item.id)} type="button">
                        {item.reactions} {t.activity.cheer}
                      </button>
                      <button className="rounded-full bg-surface-muted px-4 py-3 text-base text-text-muted" type="button">
                        {t.activity.replyLater}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
