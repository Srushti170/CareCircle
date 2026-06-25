"use client";

import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader, Select, StatusPill } from "@/components/ui";
import { getAuthCopy } from "@/lib/auth-copy";
import type { CareRole } from "@/lib/app-state";

const inviteRoles: Exclude<CareRole, "Primary Caregiver">[] = ["Family Member", "Patient"];

import { Icon } from "@/components/icon";
import Link from "next/link";

export default function InvitePage() {
  const { locale } = useLanguage();
  const copy = getAuthCopy(locale);
  const { state, inviteMember, currentUser } = useCare();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Family Member" as Exclude<CareRole, "Primary Caregiver">
  });
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const sortedInvites = useMemo(
    () => [...state.invites].sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1)),
    [state.invites]
  );

  if (currentUser?.role !== "Primary Caregiver") {
    return (
      <AppShell>
        <Card className="mx-auto max-w-lg mt-12 p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-danger-bg text-danger mb-4">
            <Icon className="text-[2.5rem]" name="lock" />
          </div>
          <h2 className="text-h2 font-semibold text-primary">Access Denied</h2>
          <p className="mt-3 text-body text-text-muted">
            Only the Primary Caregiver is authorized to invite new family members to this Care Circle.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/dashboard">
              <Button icon="arrow_back">Return to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader subtitle={copy.inviteBody} title={copy.inviteTitle} />

      <div className={`grid gap-6 xl:grid-cols-[0.92fr_1.08fr] ${locale === "en" ? "" : "lang-devanagari"}`}>
        <Card className="p-6">
          <h2 className="text-h2 font-semibold text-primary">{copy.sendInvite}</h2>
          <p className="mt-2 text-body text-text-muted">{copy.helperInviteCode}</p>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              const result = inviteMember(form);
              if (!result.ok) {
                setError(result.message ?? "Unable to send invite.");
                return;
              }
              setError("");
              setNotice(result.inviteCode ? `${copy.inviteSent}: ${result.inviteCode}` : copy.inviteSent);
              setForm({ name: "", email: "", role: "Family Member" });
            }}
          >
            <Field label={copy.inviteName}>
              <Input
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Anjali"
                value={form.name}
              />
            </Field>
            <Field label={copy.inviteEmail}>
              <Input
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="anjali@example.com"
                type="email"
                value={form.email}
              />
            </Field>
            <Field label={copy.role}>
              <Select
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    role: event.target.value as Exclude<CareRole, "Primary Caregiver">
                  }))
                }
                value={form.role}
              >
                {inviteRoles.map((role) => (
                  <option key={role} value={role}>
                    {copy.roles[role]}
                  </option>
                ))}
              </Select>
            </Field>

            {error ? <div className="rounded-[18px] bg-danger-bg px-4 py-3 text-sm font-medium text-danger">{error}</div> : null}
            {notice ? <div className="rounded-[18px] bg-success-bg px-4 py-3 text-sm font-medium text-success">{notice}</div> : null}

            <Button className="w-full sm:w-auto" icon="mail" type="submit">
              {copy.sendInvite}
            </Button>
          </form>
        </Card>

        <Card className="bg-[#f8f0e6] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-h2 font-semibold text-primary">{copy.pendingInvites}</h2>
              {state.careCircle ? <p className="mt-2 text-body text-text-muted">{state.careCircle.name}</p> : null}
            </div>
            {state.careCircle ? <StatusPill>{state.careCircle.inviteCode}</StatusPill> : null}
          </div>

          <div className="mt-6 space-y-4">
            {sortedInvites.length === 0 ? (
              <div className="rounded-[22px] bg-white px-4 py-4 text-body text-text-muted">{copy.noInvites}</div>
            ) : (
              sortedInvites.map((invite) => (
                <div className="rounded-[22px] bg-white p-4 shadow-card" key={invite.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-label font-semibold">{invite.name}</div>
                      <div className="text-sm text-text-muted">{invite.email}</div>
                    </div>
                    <StatusPill>{copy.roles[invite.role]}</StatusPill>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-text-muted">
                    <div>
                      {copy.helperInviteCode} <span className="font-semibold text-primary">{invite.code}</span>
                    </div>
                    <div>
                      {copy.shareLink}: <span className="font-semibold text-primary">{`/signup?invite=${invite.code}`}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
