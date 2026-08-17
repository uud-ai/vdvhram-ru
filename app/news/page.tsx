import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { getAllNews } from "@/lib/news-store";

export const metadata: Metadata = {
  title: "Новости",
  description:
    "Новости и объявления прихода храма Благовещения Пресвятой Богородицы в Сокольниках.",
  alternates: { canonical: "/news" },
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <Header transparent={false} />
      <main className="bg-background pb-20 pt-28 sm:pt-32">
        <div className="container-site max-w-5xl">
          <header className="mb-10 border-b border-border pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              Приход
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Новости
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
              События, объявления и памятные даты прихода храма Благовещения
              Пресвятой Богородицы в Сокольниках.
            </p>
          </header>

          {news.length === 0 ? (
            <p className="text-charcoal/60">Новостей пока нет.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
