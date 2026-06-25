"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { useCare } from "@/components/care-provider";
import { useLanguage } from "@/components/language-provider";
import { Button, Field, Input } from "@/components/ui";
import { getAuthCopy } from "@/lib/auth-copy";

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const copy = getAuthCopy(locale);
  const { hydrated, isAuthenticated, state, login, currentUser } = useCare();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hydrated || !isAuthenticated) {
      return;
    }
    const isCaregiver = currentUser?.role === "Primary Caregiver";
    router.replace(isCaregiver && !state.onboarding.completed ? "/onboarding" : "/dashboard");
  }, [hydrated, isAuthenticated, router, state.onboarding.completed, currentUser]);

  return (
    <AuthShell badge={copy.eyebrow} body={copy.loginBody} title={copy.loginTitle}>
      <div className={locale === "en" ? "" : "lang-devanagari"}>
        <h2 className="text-[2rem] font-semibold tracking-[-0.03em] text-primary">{copy.loginTitle}</h2>
        <p className="mt-2 text-body text-text-muted">{copy.loginBody}</p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const result = login(form);
            if (!result.ok) {
              setError(result.message ?? "Unable to sign in.");
              return;
            }
            setError("");
            const targetUser = state.auth.users.find((item) => item.email.toLowerCase() === form.email.trim().toLowerCase());
            const isCaregiver = targetUser?.role === "Primary Caregiver";
            router.replace(isCaregiver && !state.onboarding.completed ? "/onboarding" : "/dashboard");
          }}
        >
          <Field label={copy.email}>
            <Input
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="family@example.com"
              type="email"
              value={form.email}
            />
          </Field>
          <Field label={copy.password}>
            <Input
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="••••••••"
              type="password"
              value={form.password}
            />
          </Field>
          {error ? <div className="rounded-[18px] bg-danger-bg px-4 py-3 text-sm font-medium text-danger">{error}</div> : null}
          <Button className="w-full" icon="login" type="submit">
            {copy.signIn}
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
          <span>{copy.noAccount}</span>
          <Link className="font-semibold text-primary" href="/signup">
            {copy.goToSignup}
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
