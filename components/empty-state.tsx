"use client";

import { Icon } from "@/components/icon";
import { Button, Card } from "@/components/ui";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center bg-white/70 backdrop-blur-md border border-line rounded-[28px] py-12 shadow-card max-w-lg mx-auto mt-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-accent/40 text-primary mb-5 animate-pulse">
        <Icon className="text-[32px]" name={icon} />
      </div>
      <h3 className="text-h3 font-bold text-primary tracking-tight">{title}</h3>
      <p className="mt-3 text-body text-text-muted leading-relaxed max-w-sm">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6 shadow-soft" icon="add" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
