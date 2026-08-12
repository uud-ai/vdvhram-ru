import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Baby,
  Clapperboard,
  Compass,
  Cross,
  Drama,
  Dumbbell,
  GalleryVerticalEnd,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import {
  svodDirections,
  svodGoals,
  svodGoalsIntro,
  svodIntro,
  svodSignificance,
  svodSignificanceIntro,
} from "@/data/svod";

export const metadata: Metadata = {
  title: "Духовно-просветительный центр «Свод»",
  description:
    "Духовно-просветительный центр «Свод» при храме Благовещения Пресвятой Богородицы в Сокольниках — универсальное пространство для духовных, культурных, спортивных и социальных проектов.",
  alternates: { canonical: "/svod" },
};

const directionIcons: Record<string, LucideIcon> = {
  spiritual: Cross,
  rehab: HeartPulse,
  sport: Dumbbell,
  concert: Drama,
  children: Baby,
  cinema: Clapperboard,
  exhibition: GalleryVerticalEnd,
  excursion: Compass,
};

export default function SvodPage() {
  return (
    <>
      <Header transparent={false} />
      <main className="bg-background pb-20 pt-28 sm:pt-32">
        <div className="container-site max-w-3xl">
          <header className="mb-10 border-b border-border pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              Проекты прихода
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Духовно-просветительный центр «Свод»
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/80 sm:text-base">
              {svodIntro}
            </p>
          </header>

          <section aria-labelledby="directions-heading">
            <h2 id="directions-heading" className="sr-only">
              Направления центра
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {svodDirections.map((direction) => {
                const Icon = directionIcons[direction.id] ?? Cross;
                return (
                  <div
                    key={direction.id}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="font-medium text-charcoal">{direction.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="significance-heading" className="mt-12">
            <h2
              id="significance-heading"
              className="font-display text-2xl font-semibold text-primary sm:text-3xl"
            >
              Значимость центра
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
              {svodSignificanceIntro}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal sm:text-base">
              {svodSignificance.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="goals-heading" className="mt-12">
            <h2
              id="goals-heading"
              className="font-display text-2xl font-semibold text-primary sm:text-3xl"
            >
              Цели центра
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
              {svodGoalsIntro}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal sm:text-base">
              {svodGoals.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
