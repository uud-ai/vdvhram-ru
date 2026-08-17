import { getRedis } from "./redis";
import type { NewsItem } from "./types";

const NEWS_HASH_KEY = "news:items";

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(title: string, id: string) {
  const transliterated = title
    .toLowerCase()
    .split("")
    .map((ch) => CYRILLIC_TO_LATIN[ch] ?? ch)
    .join("");
  const base = transliterated
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return base ? `${base}-${id.slice(0, 6)}` : id;
}

function parseItem(raw: string | null): NewsItem | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as NewsItem;
  } catch {
    return null;
  }
}

export async function getAllNews(): Promise<NewsItem[]> {
  const redis = getRedis();
  const all = await redis.hgetall(NEWS_HASH_KEY);
  const items = Object.values(all)
    .map((raw) => parseItem(raw))
    .filter((item): item is NewsItem => item !== null);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const items = await getAllNews();
  return items.find((i) => i.slug === slug) ?? null;
}

export async function createNews(input: {
  title: string;
  content: string;
  imageUrl: string;
}): Promise<NewsItem> {
  const redis = getRedis();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const item: NewsItem = {
    id,
    slug: slugify(input.title, id),
    title: input.title,
    content: input.content,
    imageUrl: input.imageUrl,
    createdAt: now,
    updatedAt: now,
  };
  await redis.hset(NEWS_HASH_KEY, id, JSON.stringify(item));
  return item;
}

export async function updateNews(
  id: string,
  input: Partial<Pick<NewsItem, "title" | "content" | "imageUrl">>
): Promise<NewsItem | null> {
  const redis = getRedis();
  const current = parseItem(await redis.hget(NEWS_HASH_KEY, id));
  if (!current) return null;

  const updated: NewsItem = {
    ...current,
    ...input,
    slug: input.title && input.title !== current.title ? slugify(input.title, id) : current.slug,
    updatedAt: new Date().toISOString(),
  };
  await redis.hset(NEWS_HASH_KEY, id, JSON.stringify(updated));
  return updated;
}

export async function deleteNews(id: string): Promise<boolean> {
  const redis = getRedis();
  const removed = await redis.hdel(NEWS_HASH_KEY, id);
  return removed > 0;
}
