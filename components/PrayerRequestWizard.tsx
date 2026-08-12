"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Baby,
  Check,
  ChevronLeft,
  ChevronRight,
  Cross,
  HeartPulse,
  Loader2,
  QrCode,
  Shield,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PetitionType = "health" | "repose" | "warriors";
type Duration = "single" | "forty" | "annual";

const petitionTypes: {
  id: PetitionType;
  label: string;
  hint: string;
  icon: typeof HeartPulse;
}[] = [
  { id: "health", label: "О здравии", hint: "Молитва о живущих", icon: HeartPulse },
  { id: "repose", label: "О упокоении", hint: "Молитва об усопших", icon: Cross },
  {
    id: "warriors",
    label: "О здравии воинов (СВО)",
    hint: "Молитва о военнослужащих",
    icon: Shield,
  },
];

const durations: { id: Duration; label: string; hint: string; price: number }[] = [
  { id: "single", label: "Однократное", hint: "На ближайшей службе", price: 100 },
  { id: "forty", label: "Сорокоуст", hint: "Поминовение 40 дней", price: 400 },
  { id: "annual", label: "Годовое", hint: "Поминовение весь год", price: 1200 },
];

const quickTags = [
  { tag: "[+воина]", label: "Воина", icon: Shield },
  { tag: "[+болящего]", label: "Болящего", icon: HeartPulse },
  { tag: "[+младенца]", label: "Младенца", icon: Baby },
  { tag: "[+иерея]", label: "Иерея", icon: User },
];

const amountPresets = [300, 500, 1000];

const steps = ["Тип прошения", "Срок", "Имена", "Пожертвование"];

export default function PrayerRequestWizard() {
  const [step, setStep] = useState(0);
  const [petitionType, setPetitionType] = useState<PetitionType | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [namesText, setNamesText] = useState("");
  const [amount, setAmount] = useState<number | "custom" | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "paid">(
    "idle"
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingCursorRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const cursor = pendingCursorRef.current;
    if (cursor === null) return;
    pendingCursorRef.current = null;
    const textarea = textareaRef.current;
    textarea?.focus();
    textarea?.setSelectionRange(cursor, cursor);
  }, [namesText]);

  const names = useMemo(
    () => namesText.split("\n").map((n) => n.trim()).filter(Boolean),
    [namesText]
  );

  const selectedDuration = durations.find((d) => d.id === duration);
  const suggestedAmount = selectedDuration
    ? selectedDuration.price * Math.max(names.length, 1)
    : 0;

  const finalAmount =
    amount === "custom"
      ? Number(customAmount) || 0
      : amount ?? suggestedAmount;

  const canGoNext =
    (step === 0 && petitionType !== null) ||
    (step === 1 && duration !== null) ||
    (step === 2 && names.length > 0) ||
    step === 3;

  function insertTag(tag: string) {
    const textarea = textareaRef.current;
    if (!textarea) {
      setNamesText((prev) => `${prev}${prev ? "\n" : ""}${tag} `);
      return;
    }
    const start = textarea.selectionStart ?? namesText.length;
    const end = textarea.selectionEnd ?? namesText.length;
    const next = `${namesText.slice(0, start)}${tag} ${namesText.slice(end)}`;
    pendingCursorRef.current = start + tag.length + 1;
    setNamesText(next);
  }

  function handlePay() {
    setPaymentStatus("processing");
    setTimeout(() => setPaymentStatus("paid"), 1800);
  }

  function goNext() {
    if (step < steps.length - 1) setStep((s) => s + 1);
  }
  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <section
      id="prayer-request"
      aria-labelledby="prayer-request-heading"
      className="bg-primary/5 py-20 sm:py-28"
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
            Записки и требы
          </p>
          <h2
            id="prayer-request-heading"
            className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl"
          >
            Подать записку онлайн
          </h2>
          <p className="mt-3 text-sm text-charcoal/70 sm:text-base">
            Помолимся вместе о здравии, воинах и упокоении усопших
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
          <ol className="flex items-center gap-1 border-b border-border bg-primary/5 px-4 py-4 sm:gap-2 sm:px-8">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-1 sm:gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors sm:h-8 sm:w-8",
                    i < step
                      ? "bg-gold text-primary"
                      : i === step
                      ? "bg-primary text-white"
                      : "bg-white text-charcoal/40 border border-border"
                  )}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden truncate text-xs font-medium sm:block sm:text-sm",
                    i === step ? "text-primary" : "text-charcoal/50"
                  )}
                >
                  {label}
                </span>
                {i < steps.length - 1 && (
                  <span className="mx-1 h-px flex-1 bg-border sm:mx-2" aria-hidden />
                )}
              </li>
            ))}
          </ol>

          <div className="min-h-[340px] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {step === 0 && (
                  <fieldset>
                    <legend className="font-display text-xl font-semibold text-primary">
                      Тип прошения
                    </legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {petitionTypes.map(({ id, label, hint, icon: Icon }) => (
                        <label
                          key={id}
                          className={cn(
                            "flex cursor-pointer flex-col gap-2 rounded-2xl border p-4 transition-colors",
                            petitionType === id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          )}
                        >
                          <input
                            type="radio"
                            name="petitionType"
                            value={id}
                            checked={petitionType === id}
                            onChange={() => setPetitionType(id)}
                            className="sr-only"
                          />
                          <Icon
                            size={22}
                            className={petitionType === id ? "text-gold-dark" : "text-primary/60"}
                            aria-hidden
                          />
                          <span className="font-semibold text-primary">{label}</span>
                          <span className="text-xs text-charcoal/60">{hint}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <fieldset>
                    <legend className="font-display text-xl font-semibold text-primary">
                      Срок поминовения
                    </legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {durations.map(({ id, label, hint, price }) => (
                        <label
                          key={id}
                          className={cn(
                            "flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-colors",
                            duration === id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          )}
                        >
                          <input
                            type="radio"
                            name="duration"
                            value={id}
                            checked={duration === id}
                            onChange={() => setDuration(id)}
                            className="sr-only"
                          />
                          <span className="font-semibold text-primary">{label}</span>
                          <span className="text-xs text-charcoal/60">{hint}</span>
                          <span className="mt-1 text-sm font-medium text-gold-dark">
                            от {price} ₽ / имя
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <div>
                    <label
                      htmlFor="names"
                      className="font-display text-xl font-semibold text-primary"
                    >
                      Имена (каждое с новой строки)
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {quickTags.map(({ tag, label, icon: Icon }) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => insertTag(tag)}
                          className="flex items-center gap-1.5 rounded-full border border-border bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-gold hover:bg-gold/10"
                        >
                          <Icon size={13} aria-hidden />
                          {tag} {label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
                      <textarea
                        ref={textareaRef}
                        id="names"
                        value={namesText}
                        onChange={(e) => setNamesText(e.target.value)}
                        rows={7}
                        placeholder={"Иоанна\n[+воина] Александра\nМарии"}
                        className="w-full resize-none rounded-2xl border border-border bg-white p-4 text-sm leading-relaxed text-charcoal shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <div className="min-w-[140px] rounded-2xl border border-border bg-primary/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                          Предпросмотр
                        </p>
                        <ol className="mt-2 max-h-40 space-y-1 overflow-y-auto text-sm text-primary">
                          {names.length === 0 && (
                            <li className="text-charcoal/40">Введите имена слева</li>
                          )}
                          {names.map((name, i) => (
                            <li key={`${name}-${i}`} className="truncate">
                              {i + 1}. {name}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-charcoal/50">
                      Указано имён: {names.length}
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary">
                      Пожертвование
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/60">
                      Рекомендуемая сумма для {names.length || 1} имен на срок «
                      {selectedDuration?.label ?? "—"}»: {suggestedAmount} ₽
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {amountPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAmount(preset)}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                            amount === preset
                              ? "border-gold bg-gold/10 text-gold-dark"
                              : "border-border text-primary hover:border-gold/60"
                          )}
                        >
                          {preset} ₽
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setAmount("custom")}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                          amount === "custom"
                            ? "border-gold bg-gold/10 text-gold-dark"
                            : "border-border text-primary hover:border-gold/60"
                        )}
                      >
                        Своя сумма
                      </button>
                    </div>

                    {amount === "custom" && (
                      <div className="mt-3">
                        <label htmlFor="customAmount" className="sr-only">
                          Своя сумма пожертвования
                        </label>
                        <input
                          id="customAmount"
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Введите сумму, ₽"
                          className="w-full max-w-xs rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    )}

                    <div className="mt-6 rounded-2xl border border-border bg-primary/5 p-5">
                      {paymentStatus === "paid" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center gap-2 py-4 text-center"
                        >
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check size={24} />
                          </span>
                          <p className="font-semibold text-primary">
                            Записка принята, пожертвование {finalAmount} ₽ получено
                          </p>
                          <p className="text-sm text-charcoal/60">
                            Мы помолимся о поданных именах на ближайшей службе
                          </p>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                          <div>
                            <p className="text-sm text-charcoal/60">К оплате</p>
                            <p className="font-display text-2xl font-semibold text-primary">
                              {finalAmount || 0} ₽
                            </p>
                          </div>
                          <button
                            type="button"
                            disabled={!finalAmount || paymentStatus === "processing"}
                            onClick={handlePay}
                            className="flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary shadow-gold transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                          >
                            {paymentStatus === "processing" ? (
                              <>
                                <Loader2 size={18} className="animate-spin" aria-hidden />
                                Обработка платежа…
                              </>
                            ) : (
                              <>
                                <QrCode size={18} aria-hidden />
                                Оплатить через СБП / QR
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-border px-6 py-4 sm:px-8">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm font-medium text-primary disabled:opacity-30"
            >
              <ChevronLeft size={18} aria-hidden />
              Назад
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                className="flex items-center gap-1 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Далее
                <ChevronRight size={18} aria-hidden />
              </button>
            ) : (
              <span className="text-xs text-charcoal/40">Шаг {step + 1} из {steps.length}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
