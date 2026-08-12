"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Главный экран"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary-dark"
    >
      <Image
        src="/images/hero-church.jpg"
        alt="Храм Благовещения Пресвятой Богородицы в Сокольниках"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Тёплый оверлей для читаемости текста поверх фотографии */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/55 to-primary-dark/20"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 via-transparent to-transparent" aria-hidden />

      <div className="container-site relative z-10 pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:text-sm"
          role="status"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          Ближайшая служба: Сегодня в 17:00 — Всенощное бдение (Сокольники)
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl lg:text-6xl"
        >
          Храм Благовещения Пресвятой Богородицы в Сокольниках
          <span className="mt-2 block text-2xl font-medium text-gold-light sm:text-3xl">
            Главный храм ВДВ
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Духовный центр Воздушно-десантных войск России: приход, воинское
          служение и исторический памятник в самом сердце Сокольников.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-9 flex flex-col gap-4 pb-20 sm:flex-row sm:pb-28"
        >
          <a
            href="#prayer-request"
            className="rounded-full bg-gold px-7 py-3.5 text-center text-base font-semibold text-gold-foreground shadow-gold transition-transform hover:scale-105"
          >
            Подать записку онлайн
          </a>
          <a
            href="#memory-book"
            className="rounded-full border border-white/50 px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Военнослужащим и гостям
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#locations"
        aria-label="Прокрутить к следующему разделу"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/80"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={28} aria-hidden />
      </motion.a>
    </section>
  );
}
