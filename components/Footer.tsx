import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { locations } from "@/data/locations";

const quickLinks = [
  { href: "/#locations", label: "Наши храмы" },
  { href: "/#schedule", label: "Расписание богослужений" },
  { href: "/#prayer-request", label: "Подать записку онлайн" },
  { href: "/clergy", label: "Духовенство" },
  { href: "/#memory-book", label: "Книга Памяти" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="border-t border-border bg-primary text-primary-foreground"
    >
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            Храм Благовещения
            <span className="mt-1 block text-sm font-sans font-medium text-gold">
              Пресвятой Богородицы в Сокольниках
            </span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Главный храм Воздушно-десантных войск России. Духовная опора
            десантников, их семей и всех прихожан.
          </p>
          <a
            href="#"
            aria-label="Telegram-канал прихода"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
          >
            <Send size={16} aria-hidden />
            Telegram-канал прихода
          </a>
        </div>

        <nav aria-label="Быстрые ссылки">
          <h2 className="font-display text-lg font-semibold text-white">
            Разделы
          </h2>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {locations.map((loc) => (
          <div key={loc.id}>
            <h2 className="font-display text-lg font-semibold text-white">
              {loc.shortName}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                <span>
                  {loc.address}
                  {loc.metro ? `, ${loc.metro}` : ""}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" aria-hidden />
                <a href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold">
                  {loc.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                <span>
                  {loc.scheduleHighlights[0].day} — {loc.scheduleHighlights[0].time},{" "}
                  {loc.scheduleHighlights[0].service}
                </span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {year} Приход храма Благовещения Пресвятой Богородицы в Сокольниках</p>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="hover:text-gold">
              Политика обработки персональных данных
            </a>
            <a href="mailto:hramvdv@yandex.ru" className="flex items-center gap-2 hover:text-gold">
              <Mail size={14} aria-hidden />
              hramvdv@yandex.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
