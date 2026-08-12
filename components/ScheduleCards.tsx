"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, MapPin, MessageSquareHeart } from "lucide-react";
import {
  scheduleData,
  serviceTypeLabels,
  weekDays,
  type ServiceType,
} from "@/data/schedule";
import { downloadServiceIcs } from "@/lib/ics";
import { cn } from "@/lib/utils";

export default function ScheduleCards() {
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<ServiceType | "all">("all");

  const filtered = useMemo(() => {
    return scheduleData.filter((item) => {
      const dayOk = dayFilter === "all" || item.dayOfWeek === dayFilter;
      const typeOk = typeFilter === "all" || item.type === typeFilter;
      return dayOk && typeOk;
    });
  }, [dayFilter, typeFilter]);

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="bg-background py-20 sm:py-28"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
            Богослужения
          </p>
          <h2
            id="schedule-heading"
            className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl"
          >
            Расписание богослужений
          </h2>
        </motion.div>

        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          <div
            role="group"
            aria-label="Фильтр по дням недели"
            className="flex flex-wrap justify-center gap-2"
          >
            <FilterChip active={dayFilter === "all"} onClick={() => setDayFilter("all")}>
              Все дни
            </FilterChip>
            {weekDays.map((day) => (
              <FilterChip key={day} active={dayFilter === day} onClick={() => setDayFilter(day)}>
                {day}
              </FilterChip>
            ))}
          </div>

          <div
            role="group"
            aria-label="Фильтр по типу службы"
            className="flex flex-wrap justify-center gap-2"
          >
            <FilterChip active={typeFilter === "all"} onClick={() => setTypeFilter("all")} variant="gold">
              Все службы
            </FilterChip>
            {(Object.keys(serviceTypeLabels) as ServiceType[]).map((type) => (
              <FilterChip
                key={type}
                active={typeFilter === type}
                onClick={() => setTypeFilter(type)}
                variant="gold"
              >
                {serviceTypeLabels[type]}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.dayOfWeek}, {item.date}
                    </span>
                    <span className="font-display text-lg font-semibold text-gold-dark">
                      {item.time}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-charcoal/60">
                    <MapPin size={14} aria-hidden />
                    {item.location}
                  </p>
                  {item.description && (
                    <p className="mt-2 text-sm text-charcoal/70">{item.description}</p>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => downloadServiceIcs(item)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2.5 text-xs font-semibold text-primary transition-colors hover:border-primary sm:text-sm"
                  >
                    <CalendarPlus size={15} aria-hidden />
                    В календарь
                  </button>
                  <a
                    href="#prayer-request"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-105 sm:text-sm"
                  >
                    <MessageSquareHeart size={15} aria-hidden />
                    Подать записку
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-charcoal/50">
              На выбранные фильтры служб не найдено
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  variant = "primary",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "gold";
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors sm:text-sm",
        active
          ? variant === "gold"
            ? "border-gold bg-gold/10 text-gold-dark"
            : "border-primary bg-primary text-white"
          : "border-border text-charcoal/70 hover:border-primary/40"
      )}
    >
      {children}
    </button>
  );
}
