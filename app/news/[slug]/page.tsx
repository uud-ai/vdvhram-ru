import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsBySlug } from "@/lib/news-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getNewsBySlug(decodeURIComponent(params.slug));
  if (!item) return {};
  const description = item.content.replace(/\s+/g, " ").slice(0, 160);
  return {
    title: item.title,
    description,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: item.title,
      description,
      images: [{ url: item.imageUrl }],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getNewsBySlug(decodeURIComponent(params.slug));
  if (!item) notFound();

  const paragraphs = item.content.split(/\n+/).filter(Boolean);
  const date = new Date(item.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header transparent={false} />
      <main className="bg-background pb-20 pt-28 sm:pt-32">
        <article className="container-site max-w-3xl">
          <a
            href="/news"
            className="text-sm font-medium text-primary transition-colors hover:text-gold-dark"
          >
            ← Все новости
          </a>
          <p className="mt-5 text-sm text-charcoal/50">{date}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
            {item.title}
          </h1>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.title} className="w-full object-cover" />
          </div>
          <div className="mt-8 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-charcoal/80">
                {p}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
