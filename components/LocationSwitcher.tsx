"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone, PhoneCall } from "lucide-react";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";

export default function LocationSwitcher() {
  const [activeId, setActiveId] = useState<(typeof locations)[number]["id"]>(
    locations[0].id
  );
  const active = locations.find((loc) => loc.id === activeId) ?? locations[0];

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
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
            Два храма — один приход
          </p>
          <h2
            id="locations-heading"
            className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl"
          >
            Наши храмы
          </h2>
        </motion.div>

        <div
          role="tablist"
          aria-label="Выбор храма"
          className="mx-auto mt-10 flex max-w-md gap-2 rounded-full border border-border bg-white p-1.5 shadow-soft"
        >
          {locations.map((loc) => (
            <button
              key={loc.id}
              role="tab"
              type="button"
              id={`tab-${loc.id}`}
              aria-selected={activeId === loc.id}
              aria-controls={`panel-${loc.id}`}
              onClick={() => setActiveId(loc.id)}
              className={cn(
                "relative isolate flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:text-base",
                activeId === loc.id ? "text-white" : "text-primary hover:text-gold-dark"
              )}
            >
              {activeId === loc.id && (
                <motion.span
                  layoutId="location-tab-bg"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {loc.shortName}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-6 overflow-hidden rounded-3xl border border-border bg-white shadow-soft lg:grid-cols-2"
            >
              <div className="min-h-[260px] w-full bg-primary/5">
                <iframe
                  title={`Карта: ${active.fullName}`}
                  className="h-full min-h-[260px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    active.mapQuery
                  )}&output=embed`}
                />
              </div>

              <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-primary">
                  {active.fullName}
                </h3>

                <ul className="space-y-4 text-sm text-charcoal sm:text-base">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden />
                    <span>
                      {active.address}
                      {active.metro ? `, ${active.metro}` : ""}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={20} className="shrink-0 text-gold-dark" aria-hidden />
                    <a href={`tel:${active.phone.replace(/[^\d+]/g, "")}`} className="hover:text-primary">
                      {active.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <PhoneCall size={20} className="shrink-0 text-gold-dark" aria-hidden />
                    <span>
                      Дежурный:{" "}
                      <a href={`tel:${active.dutyPhone.replace(/[^\d+]/g, "")}`} className="hover:text-primary">
                        {active.dutyPhone}
                      </a>
                    </span>
                  </li>
                </ul>

                <div className="rounded-2xl bg-primary/5 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Clock size={18} aria-hidden />
                    Расписание
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-charcoal">
                    {active.scheduleHighlights.map((item) => (
                      <li key={`${item.day}-${item.time}`} className="flex justify-between gap-3">
                        <span className="text-charcoal/70">
                          {item.day}, {item.time}
                        </span>
                        <span className="font-medium">{item.service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
