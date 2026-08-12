import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClergyMemberCard from "@/components/ClergyMemberCard";
import { clergyMembers } from "@/data/clergy";

export const metadata: Metadata = {
  title: "Духовенство",
  description:
    "Духовенство прихода храма Благовещения Пресвятой Богородицы в Сокольниках — настоятель, клирики и памятная биография первого настоятеля протоиерея Михаила Васильева.",
  alternates: { canonical: "/clergy" },
};

function shortName(fullName: string) {
  const parts = fullName.split(" ").filter(Boolean);
  return parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : fullName;
}

export default function ClergyPage() {
  const serving = clergyMembers.filter((m) => !m.deceased);
  const inMemoriam = clergyMembers.filter((m) => m.deceased);

  return (
    <>
      <Header transparent={false} />
      <main className="bg-background pb-20 pt-28 sm:pt-32">
        <div className="container-site max-w-4xl">
          <header className="mb-10 border-b border-border pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              Приход
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Духовенство
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
              Настоятель и клирики Патриаршего подворья — храма Благовещения
              Пресвятой Богородицы при б. казармах Саперного батальона, а также
              памятная биография первого настоятеля возрождённого храма.
            </p>

            <nav aria-label="Быстрый переход к священнослужителям" className="mt-6 flex flex-wrap gap-2">
              {clergyMembers.map((m) => (
                <a
                  key={m.id}
                  href={`#clergy-${m.id}`}
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:border-gold hover:text-gold-dark"
                >
                  {shortName(m.fullName)}
                </a>
              ))}
            </nav>
          </header>

          <section aria-labelledby="serving-heading" className="space-y-8">
            <h2 id="serving-heading" className="sr-only">
              Действующее духовенство
            </h2>
            {serving.map((member) => (
              <ClergyMemberCard key={member.id} member={member} />
            ))}
          </section>

          {inMemoriam.length > 0 && (
            <section aria-labelledby="memoriam-heading" className="mt-14">
              <h2
                id="memoriam-heading"
                className="font-display text-2xl font-semibold text-primary sm:text-3xl"
              >
                Памяти почивших пастырей
              </h2>
              <div className="mt-6 space-y-8">
                {inMemoriam.map((member) => (
                  <ClergyMemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
