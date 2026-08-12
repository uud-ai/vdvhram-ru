export type Location = {
  id: "main" | "chapel";
  shortName: string;
  fullName: string;
  address: string;
  metro?: string;
  phone: string;
  dutyPhone: string;
  mapQuery: string;
  scheduleHighlights: { day: string; time: string; service: string }[];
};

export const locations: Location[] = [
  {
    id: "main",
    shortName: "Главный храм ВДВ",
    fullName: "Храм Благовещения Пресвятой Богородицы в Сокольниках",
    address: "ул. Матросская Тишина, д. 9",
    metro: "м. Сокольники",
    phone: "+7 (495) 268-52-89",
    dutyPhone: "+7 (925) 000-00-00",
    mapQuery: "Матросская Тишина 9 Москва храм Благовещения",
    scheduleHighlights: [
      { day: "Ежедневно", time: "8:00", service: "Божественная литургия" },
      { day: "Сб / предпраздничные", time: "17:00", service: "Всенощное бдение" },
      { day: "Воскресенье", time: "9:30", service: "Поздняя литургия" },
    ],
  },
  {
    id: "chapel",
    shortName: "Храм Пророка Илии",
    fullName: "Приписной храм Пророка Илии",
    address: "Попов проезд, д. 1, стр. 1",
    metro: "м. Сокольники",
    phone: "+7 (495) 268-52-89",
    dutyPhone: "+7 (925) 000-00-01",
    mapQuery: "Попов проезд 1 стр 1 Москва храм Пророка Илии",
    scheduleHighlights: [
      { day: "Воскресенье", time: "8:30", service: "Божественная литургия" },
      { day: "Пятница", time: "17:00", service: "Молебен о воинах" },
    ],
  },
];
