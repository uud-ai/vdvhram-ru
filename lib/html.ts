export function stripHtml(html: string): string {
  return html
    .replace(/<(p|br)[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
