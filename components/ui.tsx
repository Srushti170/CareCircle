import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

export function Button({
  children,
  icon,
  variant = "primary",
  className,
  type = "button",
  ...props
}: {
  children: React.ReactNode;
  icon?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: "bg-primary text-white shadow-soft hover:bg-primary-deep",
    secondary: "border border-primary bg-white text-primary hover:bg-surface-muted",
    ghost: "bg-surface-muted text-foreground hover:bg-white",
    danger: "bg-danger-bg text-danger hover:brightness-95"
  }[variant];

  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-label font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        styles,
        className
      )}
      type={type}
      {...props}
    >
      {icon ? <Icon className="text-[22px]" name={icon} /> : null}
      <span>{children}</span>
    </button>
  );
}

export function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("rounded-card border border-line bg-white shadow-card", className)}>{children}</div>;
}

export function StatusPill({
  children,
  tone = "neutral"
}: {
  children: React.ReactNode;
  tone?: "success" | "warning" | "danger" | "neutral";
}) {
  const tones = {
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    danger: "bg-danger-bg text-danger",
    neutral: "bg-surface-muted text-text-muted"
  }[tone];

  return <span className={cn("inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold", tones)}>{children}</span>;
}

export function PageHeader({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-h1 font-bold tracking-[-0.025em] text-primary">{title}</h1>
        <p className="mt-2 max-w-xl text-body text-text-muted">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold tracking-[0.01em] text-text-muted">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-sm text-text-muted">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("min-h-12 w-full rounded-[18px] border border-line bg-white px-4 text-label outline-none transition focus:border-primary", props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("min-h-[120px] w-full rounded-[18px] border border-line bg-white px-4 py-4 text-label outline-none transition focus:border-primary", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("min-h-12 w-full rounded-[18px] border border-line bg-white px-4 text-label outline-none transition focus:border-primary", props.className)} />;
}
