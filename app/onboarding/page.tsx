"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { useCare } from "@/components/care-provider";
import { useLanguage } from "@/components/language-provider";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";
import { getAuthCopy } from "@/lib/auth-copy";
import type { CareRole } from "@/lib/app-state";

const inviteRoleOptions: Exclude<CareRole, "Primary Caregiver">[] = ["Family Member", "Patient"];

export default function OnboardingPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const copy = getAuthCopy(locale);
  const {
    hydrated,
    currentUser,
    isAuthenticated,
    state,
    createCareCircle,
    updatePatientProfile,
    inviteMember,
    completeOnboarding,
    logout
  } = useCare();

  const [circleName, setCircleName] = useState(state.careCircle?.name ?? "");
  const [patientForm, setPatientForm] = useState({
    name: state.patient.name,
    fullName: state.patient.fullName,
    age: state.patient.age,
    relation: state.patient.relation,
    careNeeds: state.patient.careNeeds
  });
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "Family Member" as Exclude<CareRole, "Primary Caregiver">
  });
  const [flash, setFlash] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (state.onboarding.completed) {
      router.replace("/dashboard");
    }
  }, [hydrated, isAuthenticated, router, state.onboarding.completed]);

  const steps = useMemo(
    () => [
      { key: "circle", label: copy.stepCircle },
      { key: "patient", label: copy.stepPatient },
      { key: "invite", label: copy.stepInvite },
      { key: "done", label: copy.stepDone }
    ],
    [copy.stepCircle, copy.stepDone, copy.stepInvite, copy.stepPatient]
  );

  const activeStep = state.onboarding.step;

  if (!hydrated || !currentUser) {
    return null;
  }

  return (
    <AuthShell
      aside={
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              className={`rounded-[20px] border px-4 py-3 ${activeStep === step.key ? "border-white/50 bg-white/12" : "border-white/10 bg-white/5"}`}
              key={step.key}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">Step {index + 1}</div>
              <div className="mt-1 text-lg font-semibold">{step.label}</div>
            </div>
          ))}
        </div>
      }
      badge={copy.eyebrow}
      body={copy.onboardingBody}
      title={copy.onboardingTitle}
    >
      <div className={locale === "en" ? "" : "lang-devanagari"}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[2rem] font-semibold tracking-[-0.03em] text-primary">{copy.onboardingTitle}</h2>
            <p className="mt-2 max-w-2xl text-body text-text-muted">{copy.onboardingBody}</p>
          </div>
          <button className="text-sm font-semibold text-primary" onClick={logout} type="button">
            {copy.signOut}
          </button>
        </div>

        {error ? <div className="mt-6 rounded-[18px] bg-danger-bg px-4 py-3 text-sm font-medium text-danger">{error}</div> : null}
        {flash ? <div className="mt-6 rounded-[18px] bg-success-bg px-4 py-3 text-sm font-medium text-success">{flash}</div> : null}

        {activeStep === "circle" ? (
          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              const result = createCareCircle({ name: circleName });
              if (!result.ok) {
                setError(result.message ?? "Unable to create Care Circle.");
                return;
              }
              setError("");
              setFlash(result.inviteCode ? `${copy.helperInviteCode} ${result.inviteCode}` : "");
            }}
          >
            <Field hint={copy.helperCircle} label={copy.careCircleName}>
              <Input onChange={(event) => setCircleName(event.target.value)} placeholder="Rao Family Care" value={circleName} />
            </Field>
            <Button className="w-full sm:w-auto" icon="arrow_forward" type="submit">
              {copy.continue}
            </Button>
          </form>
        ) : null}

        {activeStep === "patient" ? (
          <form
            className="mt-8 grid gap-5 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              updatePatientProfile(patientForm);
              setError("");
              setFlash("");
            }}
          >
            <Field label={copy.patientShortName}>
              <Input
                onChange={(event) => setPatientForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Dad"
                value={patientForm.name}
              />
            </Field>
            <Field label={copy.patientFullName}>
              <Input
                onChange={(event) => setPatientForm((current) => ({ ...current, fullName: event.target.value }))}
                placeholder="Mahesh Rao"
                value={patientForm.fullName}
              />
            </Field>
            <Field label={copy.age}>
              <Input
                onChange={(event) => setPatientForm((current) => ({ ...current, age: event.target.value }))}
                placeholder="72"
                value={patientForm.age}
              />
            </Field>
            <Field label={copy.relation}>
              <Input
                onChange={(event) => setPatientForm((current) => ({ ...current, relation: event.target.value }))}
                placeholder="Father"
                value={patientForm.relation}
              />
            </Field>
            <div className="md:col-span-2">
              <Field hint={copy.helperPatient} label={copy.careNeeds}>
                <Textarea
                  onChange={(event) => setPatientForm((current) => ({ ...current, careNeeds: event.target.value }))}
                  placeholder="Needs blood pressure medicine after breakfast and a light evening walk."
                  value={patientForm.careNeeds}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Button className="w-full sm:w-auto" icon="arrow_forward" type="submit">
                {copy.continue}
              </Button>
            </div>
          </form>
        ) : null}

        {activeStep === "invite" ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <form
              className="space-y-5 rounded-[28px] bg-surface-muted p-5"
              onSubmit={(event) => {
                event.preventDefault();
                const result = inviteMember(inviteForm);
                if (!result.ok) {
                  setError(result.message ?? "Unable to send invite.");
                  return;
                }
                setError("");
                setFlash(result.inviteCode ? `${copy.inviteSent}: ${result.inviteCode}` : copy.inviteSent);
                setInviteForm({ name: "", email: "", role: "Family Member" });
              }}
            >
              <Field label={copy.inviteName}>
                <Input
                  onChange={(event) => setInviteForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Anjali"
                  value={inviteForm.name}
                />
              </Field>
              <Field label={copy.inviteEmail}>
                <Input
                  onChange={(event) => setInviteForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="anjali@example.com"
                  type="email"
                  value={inviteForm.email}
                />
              </Field>
              <Field label={copy.role}>
                <Select
                  onChange={(event) =>
                    setInviteForm((current) => ({
                      ...current,
                      role: event.target.value as Exclude<CareRole, "Primary Caregiver">
                    }))
                  }
                  value={inviteForm.role}
                >
                  {inviteRoleOptions.map((role) => (
                    <option key={role} value={role}>
                      {copy.roles[role]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Button className="w-full sm:w-auto" icon="mail" type="submit">
                {copy.sendInvite}
              </Button>
            </form>

            <div className="rounded-[28px] border border-line bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-h3 font-semibold text-primary">{copy.pendingInvites}</h3>
                {state.careCircle ? <span className="text-sm text-text-muted">{state.careCircle.name}</span> : null}
              </div>
              <div className="mt-4 space-y-3">
                {state.invites.length === 0 ? (
                  <div className="rounded-[20px] bg-surface-muted px-4 py-4 text-sm text-text-muted">{copy.noInvites}</div>
                ) : (
                  state.invites.map((invite) => (
                    <div className="rounded-[22px] border border-line px-4 py-4" key={invite.id}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-primary">{invite.name}</div>
                          <div className="text-sm text-text-muted">{invite.email}</div>
                        </div>
                        <div className="rounded-full bg-surface-muted px-3 py-2 text-sm font-semibold text-text-muted">
                          {copy.roles[invite.role]}
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 text-sm text-text-muted">
                        <div>
                          {copy.helperInviteCode} <span className="font-semibold text-primary">{invite.code}</span>
                        </div>
                        <div>
                          {copy.shareLink}:{" "}
                          <span className="font-semibold text-primary">{`/signup?invite=${invite.code}`}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  icon="task_alt"
                  onClick={() => {
                    completeOnboarding();
                    router.push("/dashboard");
                  }}
                >
                  {copy.finishSetup}
                </Button>
                <Link href="/invite">
                  <Button variant="secondary">{copy.inviteTitle}</Button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AuthShell>
  );
}
