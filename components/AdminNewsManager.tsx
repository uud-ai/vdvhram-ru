"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { NewsItem } from "@/lib/types";

const emptyForm = { title: "", content: "" };

export default function AdminNewsManager() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadNews() {
    setLoading(true);
    const res = await fetch("/api/news", { cache: "no-store" });
    const data = await res.json();
    setNews(data);
    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(item: NewsItem) {
    setEditingId(item.id);
    setForm({ title: item.title, content: item.content });
    setImageFile(null);
    setExistingImageUrl(item.imageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.content.trim()) {
      setError("Заполните заголовок и текст");
      return;
    }
    if (!editingId && !imageFile) {
      setError("Выберите фото для новости");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = existingImageUrl ?? undefined;

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Не удалось загрузить фото");
        imageUrl = uploadData.url;
      }

      const payload = { title: form.title.trim(), content: form.content.trim(), imageUrl };
      const res = await fetch(editingId ? `/api/news/${editingId}` : "/api/news", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Не удалось сохранить новость");

      resetForm();
      await loadNews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить эту новость?")) return;
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === id) resetForm();
      await loadNews();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="border-b border-border bg-white">
        <div className="container-site flex items-center justify-between py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              Админка
            </p>
            <h1 className="font-display text-2xl font-semibold text-primary">Новости</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-primary hover:text-primary"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="container-site mt-10 grid gap-10 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-border bg-white p-6 shadow-soft"
        >
          <h2 className="font-display text-lg font-semibold text-primary">
            {editingId ? "Редактировать новость" : "Новая новость"}
          </h2>

          <label className="mt-5 block text-sm font-medium text-charcoal">
            Заголовок
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              required
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-charcoal">
            Текст
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={8}
              className="mt-1.5 w-full resize-y rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              required
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-charcoal">
            Фото
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
            />
          </label>

          {(imageFile || existingImageUrl) && (
            <div className="mt-3 overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : existingImageUrl ?? ""}
                alt="Предпросмотр"
                className="h-40 w-full object-cover"
              />
            </div>
          )}

          {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {saving ? "Сохранение…" : editingId ? "Сохранить" : "Опубликовать"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-charcoal hover:border-primary hover:text-primary"
              >
                Отмена
              </button>
            )}
          </div>
        </form>

        <div>
          {loading ? (
            <p className="text-charcoal/60">Загрузка…</p>
          ) : news.length === 0 ? (
            <p className="text-charcoal/60">Новостей пока нет.</p>
          ) : (
            <ul className="space-y-4">
              {news.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-24 w-32 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-charcoal/50">
                      {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="font-display text-base font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-charcoal/70">{item.content}</p>
                    <div className="mt-2 flex gap-4">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-sm font-medium text-primary hover:text-gold-dark"
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-sm font-medium text-terracotta hover:text-terracotta-dark"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
