"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { useCare } from "@/components/care-provider";
import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { Button, Card, Field, Input, PageHeader, Select, StatusPill } from "@/components/ui";
import type { TaskTag } from "@/lib/app-state";

export default function TasksPage() {
  const { t } = useLanguage();
  const { state, addTask, toggleTask } = useCare();
  const [tab, setTab] = useState<"todo" | "done">("todo");
  const [form, setForm] = useState({
    title: "",
    assignee: "",
    due: "",
    tag: "Routine" as TaskTag
  });

  const filtered = state.tasks.filter((task) => (tab === "todo" ? !task.completed : task.completed));
  const tagLabels: Record<TaskTag, string> = {
    Important: t.values.taskTags.Important,
    Routine: t.values.taskTags.Routine,
    "Follow-up": t.values.taskTags["Follow-up"],
    Daily: t.values.taskTags.Daily
  };

  return (
    <AppShell>
      <PageHeader action={<Button icon="add" onClick={() => setTab("todo")}>{t.tasks.newTask}</Button>} subtitle={t.tasks.subtitle} title={t.tasks.title} />

      <Card className="mb-8 p-6">
        <h2 className="text-h2 font-semibold text-primary">{t.tasks.createTask}</h2>
        <form
          className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!form.title || !form.assignee || !form.due) {
              return;
            }
            addTask(form);
            setForm({ title: "", assignee: "", due: "", tag: "Routine" });
          }}
        >
          <Field label={t.tasks.task}>
            <Input onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder={t.tasks.taskPlaceholder} value={form.title} />
          </Field>
          <Field label={t.tasks.assignedTo}>
            <Input onChange={(event) => setForm((current) => ({ ...current, assignee: event.target.value }))} placeholder={t.tasks.assigneePlaceholder} value={form.assignee} />
          </Field>
          <Field label={t.tasks.due}>
            <Input onChange={(event) => setForm((current) => ({ ...current, due: event.target.value }))} placeholder="Tomorrow or 6:30 PM" value={form.due} />
          </Field>
          <Field label={t.tasks.tag}>
            <Select onChange={(event) => setForm((current) => ({ ...current, tag: event.target.value as TaskTag }))} value={form.tag}>
              {(["Important", "Routine", "Follow-up", "Daily"] as TaskTag[]).map((tag) => (
                <option key={tag} value={tag}>
                  {tagLabels[tag]}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex items-end">
            <Button className="w-full" icon="add" type="submit">
              {t.tasks.saveTask}
            </Button>
          </div>
        </form>
      </Card>

      <div className="mb-6 inline-flex rounded-full bg-[#efe5db] p-1">
        <button className={`rounded-full px-6 py-3 text-base font-semibold ${tab === "todo" ? "bg-white text-primary" : "text-text-muted"}`} onClick={() => setTab("todo")} type="button">{t.tasks.todo}</button>
        <button className={`rounded-full px-6 py-3 text-base font-semibold ${tab === "done" ? "bg-white text-primary" : "text-text-muted"}`} onClick={() => setTab("done")} type="button">{t.tasks.completed}</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((task) => (
          <Card className={`flex min-h-[310px] flex-col p-6 transition ${task.completed ? "opacity-55" : "hover:-translate-y-1"}`} key={task.id}>
            <div className="flex items-start justify-between gap-4">
              <StatusPill tone={task.tag === "Important" ? "danger" : task.tag === "Routine" ? "success" : "warning"}>{tagLabels[task.tag]}</StatusPill>
              <button className="text-text-muted" type="button">
                <Icon name="more_vert" />
              </button>
            </div>
            <h3 className="mt-6 text-h2 font-semibold leading-tight">{task.title}</h3>
            <div className="mt-6 space-y-3 text-body text-text-muted">
              <div className="flex items-center gap-3">
                <Icon className="text-[20px]" name="person" />
                <span>{t.tasks.assignedTo}: {task.assignee}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon className="text-[20px]" name="calendar_today" />
                <span>{t.tasks.due}: {task.due}</span>
              </div>
            </div>
            <Button
              className="mt-auto"
              icon="check_circle"
              onClick={() => toggleTask(task.id)}
              variant={task.completed ? "ghost" : "primary"}
            >
              {task.completed ? t.tasks.moveBack : t.tasks.markDone}
            </Button>
          </Card>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          icon="checklist"
          title={t.tasks.title}
          description={t.tasks.noTasks}
        />
      ) : null}
    </AppShell>
  );
}
