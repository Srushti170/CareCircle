"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { Button, Card } from "@/components/ui";

type ErrorStateProps = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
};

export function ErrorState({ title, message, actionLabel, onAction }: ErrorStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-[640px] p-8 text-center">
        <div className="mx-auto max-w-xl">
          <div className="flex justify-center">
            <BrandLogo imageClassName="h-12 w-12" textClassName="text-[1rem] uppercase tracking-[0.12em] text-text-muted" />
          </div>
          <h1 className="mt-4 text-h1 font-bold text-primary">{title}</h1>
          <p className="mt-4 text-body text-text-muted">{message}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={onAction}>{actionLabel}</Button>
            <Link href="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}
