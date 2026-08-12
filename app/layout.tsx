import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://vdvhram.ru";
const siteTitle =
  "Храм Благовещения Пресвятой Богородицы в Сокольниках — Главный храм ВДВ";
const siteDescription =
  "Официальный сайт храма Благовещения Пресвятой Богородицы в Сокольниках — главного храма Воздушно-десантных войск России. Расписание богослужений, подача записок онлайн, Книга Памяти воинов-десантников.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Храм в Сокольниках",
  },
  description: siteDescription,
  keywords: [
    "храм Сокольники",
    "храм ВДВ",
    "Благовещенский храм",
    "заказать записку онлайн",
    "расписание богослужений",
    "Книга Памяти десантников",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Храм Благовещения Пресвятой Богородицы в Сокольниках",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-charcoal">
        {children}
      </body>
    </html>
  );
}
