export type ServiceType = "liturgy" | "vespers" | "moleben" | "molebenWarriors";

export type ServiceItem = {
  id: string;
  dayOfWeek: "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";
  date: string;
  time: string;
  title: string;
  type: ServiceType;
  location: "Главный храм ВДВ" | "Храм Пророка Илии";
  description?: string;
};

export const serviceTypeLabels: Record<ServiceType, string> = {
  liturgy: "Литургия",
  vespers: "Вечерня",
  moleben: "Молебен",
  molebenWarriors: "Молебен о воинах",
};

export const scheduleData: ServiceItem[] = [
  {
    id: "svc-1",
    dayOfWeek: "Ср",
    date: "12 августа",
    time: "17:00",
    title: "Всенощное бдение",
    type: "vespers",
    location: "Главный храм ВДВ",
  },
  {
    id: "svc-2",
    dayOfWeek: "Чт",
    date: "13 августа",
    time: "8:00",
    title: "Божественная литургия",
    type: "liturgy",
    location: "Главный храм ВДВ",
  },
  {
    id: "svc-3",
    dayOfWeek: "Пт",
    date: "14 августа",
    time: "17:00",
    title: "Молебен о воинах-десантниках",
    type: "molebenWarriors",
    location: "Храм Пророка Илии",
    description: "О здравии военнослужащих ВДВ и их семей",
  },
  {
    id: "svc-4",
    dayOfWeek: "Сб",
    date: "15 августа",
    time: "8:00",
    title: "Божественная литургия",
    type: "liturgy",
    location: "Главный храм ВДВ",
  },
  {
    id: "svc-5",
    dayOfWeek: "Сб",
    date: "15 августа",
    time: "17:00",
    title: "Всенощное бдение",
    type: "vespers",
    location: "Главный храм ВДВ",
  },
  {
    id: "svc-6",
    dayOfWeek: "Вс",
    date: "16 августа",
    time: "9:30",
    title: "Поздняя Божественная литургия",
    type: "liturgy",
    location: "Главный храм ВДВ",
  },
  {
    id: "svc-7",
    dayOfWeek: "Вс",
    date: "16 августа",
    time: "8:30",
    title: "Божественная литургия",
    type: "liturgy",
    location: "Храм Пророка Илии",
  },
  {
    id: "svc-8",
    dayOfWeek: "Вт",
    date: "18 августа",
    time: "17:00",
    title: "Молебен с акафистом",
    type: "moleben",
    location: "Главный храм ВДВ",
  },
];

export const weekDays: ServiceItem["dayOfWeek"][] = [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс",
];
