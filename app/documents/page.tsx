"use client";

import { useMemo, useRef, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Input, PageHeader, Select } from "@/components/ui";
import type { DocumentCategory, VaultDocument } from "@/lib/app-state";

const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;
const categories: Array<DocumentCategory | "All"> = [
  "All",
  "Prescriptions",
  "Lab Reports",
  "Discharge Papers",
  "Identity Docs",
  "Other"
];

const categoryThemes: Record<DocumentCategory, { badge: string; cover: string; icon: string }> = {
  Prescriptions: {
    badge: "bg-[#d8ecd9] text-[#28503f]",
    cover: "from-[#efe3d4] via-[#f8f2ea] to-[#e1f1e5]",
    icon: "description"
  },
  "Lab Reports": {
    badge: "bg-[#d9ecf8] text-[#245873]",
    cover: "from-[#dceef8] via-[#eef8fc] to-[#f2ede8]",
    icon: "biotech"
  },
  "Discharge Papers": {
    badge: "bg-[#efe4da] text-[#7a573f]",
    cover: "from-[#e7ddd3] via-[#f6efe8] to-[#efe6de]",
    icon: "assignment_return"
  },
  "Identity Docs": {
    badge: "bg-[#f2ebdf] text-[#6c5845]",
    cover: "from-[#ece8e1] via-[#f8f5ef] to-[#e8ddd2]",
    icon: "badge"
  },
  Other: {
    badge: "bg-[#ece8e1] text-[#5f5f58]",
    cover: "from-[#eef0ec] via-[#fafaf8] to-[#ece8e1]",
    icon: "folder"
  }
};

function formatUploadedDate(dateLabel: string) {
  return dateLabel.replace(/^Uploaded\s+/i, "");
}

function getPreviewIcon(type: VaultDocument["type"]) {
  switch (type) {
    case "image":
      return "image";
    case "doc":
      return "article";
    default:
      return "picture_as_pdf";
  }
}

function initialsFromName(name: string) {
  return name
    .replace(/\.[^/.]+$/, "")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function DocumentsPage() {
  const { t } = useLanguage();
  const { state, addDocument, currentUser } = useCare();
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | "All">("All");
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>("Prescriptions");
  const [summaryDraft, setSummaryDraft] = useState("");
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const categoryLabels: Record<DocumentCategory, string> = {
    Prescriptions: t.values.categories.Prescriptions,
    "Lab Reports": t.values.categories["Lab Reports"],
    "Discharge Papers": t.values.categories["Discharge Papers"],
    "Identity Docs": t.values.categories["Identity Docs"],
    Other: t.values.categories.Other
  };

  const documents = useMemo(() => {
    const filtered = state.documents.filter((item) => categoryFilter === "All" || item.category === categoryFilter);
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [categoryFilter, state.documents]);

  const latestDocument = documents[0] ?? null;

  const inferDocumentType = (file: File): VaultDocument["type"] => {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

    if (file.type.startsWith("image/")) {
      return "image";
    }

    if (file.type === "application/pdf" || extension === "pdf") {
      return "pdf";
    }

    return "doc";
  };

  const openDocument = (fileDataUrl?: string) => {
    if (!fileDataUrl) {
      return;
    }

    window.open(fileDataUrl, "_blank", "noopener,noreferrer");
  };

  const downloadDocument = (name: string, fileDataUrl?: string) => {
    if (!fileDataUrl) {
      return;
    }

    const link = document.createElement("a");
    link.href = fileDataUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadSelection = (file: File | null) => {
    if (!file) {
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadNotice(t.documents.uploadTooLarge);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileDataUrl = typeof reader.result === "string" ? reader.result : "";

      if (!fileDataUrl) {
        setUploadNotice(t.documents.uploadFailed);
        return;
      }

      addDocument({
        name: file.name,
        category: uploadCategory,
        summary: summaryDraft.trim() || t.documents.summaryPlaceholder,
        type: inferDocumentType(file),
        fileDataUrl,
        mimeType: file.type || undefined
      });

      setSummaryDraft("");
      setUploadNotice(`${file.name} ${t.documents.uploadSuccessSuffix}`);
    };

    reader.onerror = () => {
      setUploadNotice(t.documents.uploadFailed);
    };

    reader.readAsDataURL(file);
  };

  return (
    <AppShell>
      <PageHeader subtitle={t.documents.subtitle} title={t.documents.title} />

      <input
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={(event) => {
          handleUploadSelection(event.target.files?.[0] ?? null);
          event.target.value = "";
        }}
        ref={uploadInputRef}
        type="file"
      />

      {currentUser?.role !== "Patient" ? (
        <Card
          className={`overflow-hidden border-dashed transition ${
            isDragActive ? "border-primary bg-[#f9f6f0] shadow-soft" : "bg-white"
          }`}
        >
          <button
            className="flex w-full flex-col items-center justify-center gap-3 px-6 py-10 text-center md:py-12"
            onClick={() => {
              setUploadNotice(null);
              uploadInputRef.current?.click();
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragActive(false);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragActive(false);
              handleUploadSelection(event.dataTransfer.files?.[0] ?? null);
            }}
            type="button"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary shadow-card">
              <Icon className="text-[28px]" name="upload_file" />
            </div>
            <div className="text-h3 font-semibold text-primary">{t.documents.uploadDocument}</div>
            <p className="max-w-xl text-sm text-text-muted">{t.documents.uploadHelp}</p>
            <p className="text-sm text-text-muted">{t.documents.uploadFormats}</p>
          </button>

          <div className="border-t border-line bg-[#fcfaf6] px-5 py-4">
            <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)_auto]">
              <Select
                onChange={(event) => setUploadCategory(event.target.value as DocumentCategory)}
                value={uploadCategory}
              >
                {(["Prescriptions", "Lab Reports", "Discharge Papers", "Identity Docs", "Other"] as DocumentCategory[]).map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </Select>
              <Input
                onChange={(event) => setSummaryDraft(event.target.value)}
                placeholder={t.documents.summaryPlaceholder}
                value={summaryDraft}
              />
              <Button
                className="md:min-w-[180px]"
                icon="upload_file"
                onClick={() => {
                  setUploadNotice(null);
                  uploadInputRef.current?.click();
                }}
              >
                {t.documents.uploadDocument}
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      {uploadNotice ? (
        <Card className="mt-4 border-[#d9d1c8] bg-[#fffaf4] p-4 text-sm text-text-muted">{uploadNotice}</Card>
      ) : null}

      <section className="mt-6">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {categories.map((category) => {
            const active = categoryFilter === category;
            const label = category === "All" ? t.common.all : categoryLabels[category];

            return (
              <button
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-primary text-white shadow-card" : "bg-surface-muted text-text-muted hover:bg-white"
                }`}
                key={category}
                onClick={() => setCategoryFilter(category)}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        {documents.length === 0 ? (
          <EmptyState
            description={t.documents.emptyDescription}
            icon="description"
            title={t.documents.emptyTitle}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => {
              const theme = categoryThemes[item.category];
              const isImage = item.type === "image" && item.fileDataUrl;

              return (
                <Card className="overflow-hidden p-3" key={item.id}>
                  <div
                    className={`relative overflow-hidden rounded-[20px] border border-line/70 ${
                      isImage ? "bg-[#f8f5ef]" : `bg-gradient-to-br ${theme.cover}`
                    }`}
                  >
                    <span
                    className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ${theme.badge}`}
                  >
                    {categoryLabels[item.category]}
                  </span>
                    {isImage ? (
                      <img
                        alt={item.name}
                        className="h-40 w-full object-cover"
                        src={item.fileDataUrl}
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center">
                        <div className="relative flex h-28 w-24 items-center justify-center rounded-[20px] border border-white/80 bg-white/85 shadow-soft">
                          <div className="absolute left-3 top-3 text-xs font-semibold text-text-muted">
                            {initialsFromName(item.name)}
                          </div>
                          <Icon className="text-[34px] text-primary" name={getPreviewIcon(item.type)} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-1 pb-1 pt-4">
                    <div className="truncate text-label font-semibold text-primary">{item.name}</div>
                    <div className="mt-1 min-h-[2.75rem] overflow-hidden text-sm text-text-muted">{item.summary}</div>
                    <div className="mt-3 flex items-center justify-between gap-3 text-sm text-text-muted">
                      <span className="truncate">
                        {currentUser?.name ?? t.common.uploaded}
                      </span>
                      <span className="shrink-0">{formatUploadedDate(item.date)}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        aria-label={`View ${item.name}`}
                        className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold ${
                          item.fileDataUrl ? "bg-surface-muted text-primary" : "cursor-not-allowed bg-surface-muted text-text-muted"
                        }`}
                        disabled={!item.fileDataUrl}
                        onClick={() => openDocument(item.fileDataUrl)}
                        type="button"
                      >
                        <Icon name="visibility" />
                        <span>{t.documents.viewFile}</span>
                      </button>
                      <button
                        aria-label={`Download ${item.name}`}
                        className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold ${
                          item.fileDataUrl ? "bg-[#f4ede3] text-primary" : "cursor-not-allowed bg-surface-muted text-text-muted"
                        }`}
                        disabled={!item.fileDataUrl}
                        onClick={() => downloadDocument(item.name, item.fileDataUrl)}
                        type="button"
                      >
                        <Icon name="download" />
                        <span>{t.documents.downloadFile}</span>
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {latestDocument ? (
        <section className="mt-8">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-surface-muted text-primary">
                <Icon name={getPreviewIcon(latestDocument.type)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-label font-semibold text-primary">{latestDocument.name}</div>
                <div className="mt-1 text-sm text-text-muted">
                  {categoryLabels[latestDocument.category]} • {latestDocument.summary}
                </div>
              </div>
              <div className="flex items-center gap-4 sm:ml-auto">
                <div className="text-right text-sm text-text-muted">
                  <div className="font-semibold text-primary">{formatUploadedDate(latestDocument.date)}</div>
                  <div>{currentUser?.name ?? t.common.uploaded}</div>
                </div>
                <button
                  aria-label={`View ${latestDocument.name}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted text-primary transition hover:bg-white"
                  onClick={() => openDocument(latestDocument.fileDataUrl)}
                  type="button"
                >
                  <Icon name="chevron_right" />
                </button>
              </div>
            </div>
          </Card>
        </section>
      ) : null}
    </AppShell>
  );
}
