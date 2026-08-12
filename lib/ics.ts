import type { ServiceItem } from "@/data/schedule";

const RU_MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIcsDate(date: Date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
    date.getUTCDate()
  )}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
}

export function downloadServiceIcs(service: ServiceItem, year = 2026) {
  const [dayStr, monthName] = service.date.split(" ");
  const month = RU_MONTHS[monthName] ?? 0;
  const [hours, minutes] = service.time.split(":").map(Number);

  // Локальное время Москвы (UTC+3) переводим в UTC для .ics
  const start = new Date(Date.UTC(year, month, Number(dayStr), hours - 3, minutes || 0));
  const end = new Date(start.getTime() + 90 * 60 * 1000);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vdvhram.ru//Schedule//RU",
    "BEGIN:VEVENT",
    `UID:${service.id}@vdvhram.ru`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${service.title}`,
    `LOCATION:${service.location}`,
    `DESCRIPTION:${service.description ?? service.title}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${service.title.replace(/\s+/g, "-")}-${service.date.replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
