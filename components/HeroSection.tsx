"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Главный экран"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary"
    >
      {/* Фоновое изображение храма с тёмным оверлеем */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 0%, rgba(28,61,90,0.55) 0%, rgba(18,42,62,0.92) 60%, #0d1e2c 100%)",
        }}
        aria-hidden
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-1/2 w-full text-black/30"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 400V220c60-40 120-60 180-40 30-60 90-100 150-80 20-70 90-120 150-90 10-50 60-90 110-70 40-80 140-80 180 0 50-20 100 20 110 70 60-30 130 20 150 90 60-20 120 0 180 40 60-30 120-10 180 40V400H0Z"
        />
      </svg>
      <div className="absolute inset-0 bg-black/35" aria-hidden />

      <div className="container-site relative z-10 pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:text-sm"
          role="status"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
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
          <span className="mt-2 block text-2xl font-medium text-gold sm:text-3xl">
            Главный храм ВДВ
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
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
            className="rounded-full bg-gold px-7 py-3.5 text-center text-base font-semibold text-primary shadow-gold transition-transform hover:scale-105"
          >
            Подать записку онлайн
          </a>
          <a
            href="#memory-book"
            className="rounded-full border border-white/40 px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Военнослужащим и гостям
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#locations"
        aria-label="Прокрутить к следующему разделу"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={28} aria-hidden />
      </motion.a>
    </section>
  );
}
