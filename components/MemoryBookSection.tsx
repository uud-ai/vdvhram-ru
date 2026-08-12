"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenText,
  Check,
  HandHeart,
  Loader2,
  Medal,
  Search,
} from "lucide-react";
import { memoryBookEntries } from "@/data/memoryBook";
import { cn } from "@/lib/utils";

const figures = [
  {
    id: "vasiliev",
    name: "Протоиерей Михаил Васильев",
    title: "Герой России, военный священник ВДВ",
    bio: "Более 20 лет окормлял десантников в горячих точках, погиб при исполнении пастырского долга. Посмертно удостоен звания Героя Российской Федерации.",
    href: "/clergy#clergy-vasiliev",
  },
  {
    id: "sliunin",
    name: "Протоиерей Василий Слюнин",
    title: "Первый настоятель, герой Порт-Артура",
    bio: "Полковой священник, участник обороны Порт-Артура, стоял у истоков основания прихода — первый настоятель храма.",
  },
];

type HelpType = "spiritual" | "humanitarian" | "both";

export default function MemoryBookSection() {
  const [query, setQuery] = useState("");
  const [helpType, setHelpType] = useState<HelpType>("spiritual");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return memoryBookEntries.filter((e) => e.name.toLowerCase().includes(q));
  }, [query]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => setFormStatus("sent"), 1400);
  }

  return (
    <section
      id="memory-book"
      aria-labelledby="memory-book-heading"
      className="bg-primary py-20 text-white sm:py-28"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Память и служение
          </p>
          <h2
            id="memory-book-heading"
            className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl"
          >
            Воинское служение и Книга Памяти
          </h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Храним память о духовных и ратных подвигах защитников Отечества
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {figures.map((figure) => (
            <motion.article
              key={figure.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Medal size={26} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {figure.name}
                  </h3>
                  <p className="text-sm text-gold">{figure.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{figure.bio}</p>
              {figure.href && (
                <a
                  href={figure.href}
                  className="mt-4 inline-block text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  Подробное жизнеописание →
                </a>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <label htmlFor="memory-search" className="flex items-center gap-2 text-sm font-semibold text-white">
            <BookOpenText size={18} aria-hidden />
            Поиск по Книге Памяти воинов-десантников
          </label>
          <div className="relative mt-3">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/50"
              aria-hidden
            />
            <input
              id="memory-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите имя или фамилию воина"
              className="w-full rounded-full border border-white/10 bg-white py-3.5 pl-11 pr-4 text-sm text-charcoal shadow-soft focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {query.trim() && (
            <ul className="mt-4 space-y-2">
              {results.length > 0 ? (
                results.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm"
                  >
                    <span>
                      {r.rank} {r.name}
                    </span>
                    <span className="text-white/60">{r.years}</span>
                  </li>
                ))
              ) : (
                <li className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white/60">
                  Совпадений не найдено
                </li>
              )}
            </ul>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-2xl rounded-3xl bg-white p-6 text-charcoal shadow-soft sm:p-8"
        >
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
            <HandHeart size={22} className="text-gold-dark" aria-hidden />
            Запросить помощь для семьи военнослужащего
          </h3>
          <p className="mt-1 text-sm text-charcoal/60">
            Приход оказывает духовную поддержку и, по возможности, гуманитарную помощь
            семьям десантников
          </p>

          {formStatus === "sent" ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl bg-primary/5 py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={24} />
              </span>
              <p className="font-semibold text-primary">Заявка отправлена</p>
              <p className="text-sm text-charcoal/60">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="familyName" className="text-sm font-medium text-charcoal">
                    Ваше имя
                  </label>
                  <input
                    id="familyName"
                    required
                    type="text"
                    className="mt-1.5 w-full rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="familyContact" className="text-sm font-medium text-charcoal">
                    Телефон / e-mail
                  </label>
                  <input
                    id="familyContact"
                    required
                    type="text"
                    className="mt-1.5 w-full rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-charcoal">Вид помощи</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      { id: "spiritual", label: "Духовная" },
                      { id: "humanitarian", label: "Гуманитарная" },
                      { id: "both", label: "Обе" },
                    ] as { id: HelpType; label: string }[]
                  ).map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        helpType === opt.id
                          ? "border-primary bg-primary text-white"
                          : "border-border text-charcoal/70 hover:border-primary/40"
                      )}
                    >
                      <input
                        type="radio"
                        name="helpType"
                        value={opt.id}
                        checked={helpType === opt.id}
                        onChange={() => setHelpType(opt.id)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="familyMessage" className="text-sm font-medium text-charcoal">
                  Комментарий
                </label>
                <textarea
                  id="familyMessage"
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Кратко опишите ситуацию"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary shadow-gold transition-transform hover:scale-105 disabled:opacity-60"
              >
                {formStatus === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Отправка…
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
