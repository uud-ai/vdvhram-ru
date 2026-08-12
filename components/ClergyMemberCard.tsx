import Image from "next/image";
import { Award, BookOpen, Calendar, Cross, Heart, ScrollText, User } from "lucide-react";
import type { ClergyMember } from "@/data/clergy";
import { cn } from "@/lib/utils";

function initials(fullName: string) {
  const parts = fullName.split(" ").filter(Boolean);
  const picked = parts.length > 2 ? [parts[0], parts[parts.length - 1]] : parts;
  return picked
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden />
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm leading-relaxed text-charcoal sm:text-base">{children}</dd>
      </div>
    </div>
  );
}

function TimelineList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-sm leading-relaxed text-charcoal sm:text-base">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ClergyMemberCard({ member }: { member: ClergyMember }) {
  const sectionId = `clergy-${member.id}`;

  return (
    <article
      id={sectionId}
      aria-labelledby={`${sectionId}-name`}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-3xl border bg-white shadow-soft",
        member.deceased ? "border-gold/40" : "border-border"
      )}
    >
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr]">
        <div>
          <div className="relative mx-auto aspect-[3/4] w-40 overflow-hidden rounded-2xl bg-primary/5 md:w-full">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={`Фотография: ${member.rank} ${member.fullName}`}
                fill
                sizes="220px"
                className="object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-2xl font-display font-semibold text-white"
                role="img"
                aria-label={`Фотография ${member.fullName} пока не добавлена`}
              >
                {initials(member.fullName)}
              </div>
            )}
          </div>
          {member.deceased && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-semibold uppercase tracking-wide text-gold-dark md:justify-start">
              <Heart size={13} aria-hidden />
              Вечная память
            </p>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
            {member.rank}
            {member.years ? ` · ${member.years}` : ""}
          </p>
          <h3
            id={`${sectionId}-name`}
            className="mt-1 font-display text-2xl font-semibold text-primary sm:text-3xl"
          >
            {member.fullName}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/80 sm:text-base">
            {member.role}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {member.birth && (
              <InfoRow icon={Calendar} label="Рождение">
                {member.birth.date}, {member.birth.place}
              </InfoRow>
            )}
            {member.baptism && (
              <InfoRow icon={Cross} label="Крещение">
                {member.baptism}
              </InfoRow>
            )}
            {member.family && (
              <InfoRow icon={Heart} label="Семья">
                {member.family}
              </InfoRow>
            )}
            {member.ordination && (member.ordination.deacon || member.ordination.priest) && (
              <InfoRow icon={ScrollText} label="Хиротонии">
                {member.ordination.deacon && (
                  <span className="block">Во диакона — {member.ordination.deacon}</span>
                )}
                {member.ordination.priest && (
                  <span className="mt-1 block">Во иерея — {member.ordination.priest}</span>
                )}
              </InfoRow>
            )}
          </dl>

          {member.education && member.education.length > 0 && (
            <div className="mt-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                <BookOpen size={14} className="text-gold-dark" aria-hidden />
                Образование
              </p>
              <TimelineList items={member.education} />
            </div>
          )}

          {member.service && member.service.length > 0 && (
            <div className="mt-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                <ScrollText size={14} className="text-gold-dark" aria-hidden />
                Послужной список
              </p>
              <TimelineList items={member.service} />
            </div>
          )}

          {((member.churchAwards && member.churchAwards.length > 0) ||
            (member.stateAwards && member.stateAwards.length > 0)) && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {member.churchAwards && member.churchAwards.length > 0 && (
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                    <Award size={14} className="text-gold-dark" aria-hidden />
                    Иерархические награды
                  </p>
                  <TimelineList items={member.churchAwards} />
                </div>
              )}
              {member.stateAwards && member.stateAwards.length > 0 && (
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                    <Award size={14} className="text-gold-dark" aria-hidden />
                    Церковные и государственные награды
                  </p>
                  <TimelineList items={member.stateAwards} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {member.biography && member.biography.length > 0 && (
        <div className="border-t border-gold/30 bg-primary/5 p-6 sm:p-8">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <User size={16} aria-hidden />
            Жизнеописание
          </p>
          <div className="mt-4 space-y-4">
            {member.biography.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-charcoal sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
