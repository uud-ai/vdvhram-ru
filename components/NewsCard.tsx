import type { NewsItem } from "@/lib/types";

export default function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const plain = item.content.replace(/\s+/g, " ").trim();
  const excerpt = plain.length > 140 ? `${plain.slice(0, 140)}…` : plain;

  return (
    <a
      href={`/news/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-transform hover:-translate-y-1"
    >
      <div className="aspect-[16/10] overflow-hidden bg-sky-light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-gold-dark">{date}</p>
        <h3 className="mt-2 font-display text-lg font-semibold text-primary">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{excerpt}</p>
      </div>
    </a>
  );
}
