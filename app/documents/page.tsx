"use client";

import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader, Select } from "@/components/ui";
import type { DocumentCategory } from "@/lib/app-state";

const categoryIcons = [
  ["Prescriptions", "prescriptions", "bg-accent"],
  ["Lab Reports", "biotech", "bg-accent2"],
  ["Discharge Papers", "assignment_return", "bg-[#e8dfd5]"],
  ["Identity Docs", "badge", "bg-surface-muted"]
] as const;

export default function DocumentsPage() {
  const { t } = useLanguage();
  const { state, addDocument } = useCare();
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | "All">("All");
  const [form, setForm] = useState({
    name: "",
    category: "Prescriptions" as DocumentCategory,
    summary: "",
    type: "pdf" as "pdf" | "doc" | "image"
  });

  const documents = useMemo(
    () => state.documents.filter((item) => categoryFilter === "All" || item.category === categoryFilter),
    [categoryFilter, state.documents]
  );

  const categoryLabels: Record<DocumentCategory, string> = {
    Prescriptions: t.values.categories.Prescriptions,
    "Lab Reports": t.values.categories["Lab Reports"],
    "Discharge Papers": t.values.categories["Discharge Papers"],
    "Identity Docs": t.values.categories["Identity Docs"],
    Other: t.values.categories.Other
  };

  return (
    <AppShell>
      <PageHeader action={<Button icon="upload_file">{t.documents.uploadDocument}</Button>} subtitle={t.documents.subtitle} title={t.documents.title} />

      <Card className="mb-8 p-6">
        <h2 className="text-h2 font-semibold text-primary">{t.documents.addDocumentRecord}</h2>
        <form
          className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!form.name || !form.summary) {
              return;
            }
            addDocument(form);
            setForm({ name: "", category: "Prescriptions", summary: "", type: "pdf" });
          }}
        >
          <Field label={t.documents.fileName}>
            <Input onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} value={form.name} />
          </Field>
          <Field label={t.documents.category}>
            <Select onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as DocumentCategory }))} value={form.category}>
              {(["Prescriptions", "Lab Reports", "Discharge Papers", "Identity Docs", "Other"] as DocumentCategory[]).map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t.documents.type}>
            <Select onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as "pdf" | "doc" | "image" }))} value={form.type}>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="image">Image</option>
            </Select>
          </Field>
          <Field label={t.documents.summary}>
            <Input onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))} value={form.summary} />
          </Field>
          <div className="flex items-end">
            <Button className="w-full" icon="save" type="submit">
              {t.documents.saveDocument}
            </Button>
          </div>
        </form>
      </Card>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {categoryIcons.map(([label, icon, tone]) => (
          <button className="text-left" key={label} onClick={() => setCategoryFilter(label as DocumentCategory)} type="button">
            <Card className="p-6 transition hover:border-primary">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${tone} text-primary`}>
                <Icon name={icon} />
              </div>
              <div className="mt-4 text-center text-h3 font-semibold">{categoryLabels[label]}</div>
            </Card>
          </button>
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-semibold text-primary">{t.documents.recentDocuments}</h2>
            <p className="mt-1 text-text-muted">{categoryFilter === "All" ? t.documents.showingAll : `${t.documents.filteredBy}: ${categoryLabels[categoryFilter]}`}</p>
          </div>
          <Button onClick={() => setCategoryFilter("All")} variant="ghost">{t.common.showAll}</Button>
        </div>
        {documents.length === 0 ? (
          <EmptyState
            icon="description"
            title={t.documents.title}
            description="No documents found in this folder. Add one above to build your secure family vault."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {documents.map((item) => (
              <Card className="flex items-center gap-4 p-5" key={item.id}>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${item.type === "pdf" ? "bg-danger-bg text-danger" : item.type === "doc" ? "bg-accent text-primary" : "bg-accent2 text-[#2e607a]"}`}>
                  <Icon name={item.type === "pdf" ? "picture_as_pdf" : item.type === "doc" ? "description" : "image"} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-label font-semibold">{item.name}</div>
                  <div className="mt-1 text-sm text-text-muted">{t.seed.documents[item.id as keyof typeof t.seed.documents]?.date ?? item.date}</div>
                  <div className="mt-1 text-sm text-text-muted">{categoryLabels[item.category]} • {t.seed.documents[item.id as keyof typeof t.seed.documents]?.summary ?? item.summary}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-surface-muted p-3 text-primary" type="button">
                    <Icon name="visibility" />
                  </button>
                  <button className="rounded-full bg-surface-muted p-3 text-primary" type="button">
                    <Icon name="download" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
