"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#locations", label: "Храмы" },
  { href: "/#schedule", label: "Расписание" },
  { href: "/#prayer-request", label: "Записки" },
  { href: "/#memory-book", label: "Книга Памяти" },
  { href: "/#contacts", label: "Контакты" },
];

export default function Header({ transparent = true }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = !transparent || scrolled;

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-background/95 shadow-soft backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-16 items-center justify-between sm:h-20">
        <a
          href="/"
          className={cn(
            "font-display text-lg font-semibold leading-tight transition-colors sm:text-xl",
            solid ? "text-primary" : "text-white drop-shadow-sm"
          )}
        >
          Храм Благовещения
          <span className="block text-xs font-sans font-medium tracking-wide text-gold sm:text-sm">
            Главный храм ВДВ · Сокольники
          </span>
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-7 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold",
                solid ? "text-charcoal" : "text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+74952685289"
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold",
              solid ? "text-charcoal" : "text-white"
            )}
          >
            <Phone size={16} aria-hidden />
            +7 (495) 268-52-89
          </a>
          <a
            href="/#prayer-request"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary shadow-gold transition-transform hover:scale-105"
          >
            Подать записку
          </a>
        </div>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
            solid ? "text-primary" : "text-white"
          )}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Мобильная навигация"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-charcoal transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+74952685289"
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-charcoal"
              >
                <Phone size={18} aria-hidden />
                +7 (495) 268-52-89
              </a>
              <a
                href="/#prayer-request"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-primary shadow-gold"
              >
                Подать записку
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
