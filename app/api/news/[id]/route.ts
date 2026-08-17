import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteNews, updateNews } from "@/lib/news-store";

export const dynamic = "force-dynamic";

async function requireAuth() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const update: Partial<{ title: string; content: string; imageUrl: string }> = {};
  if (typeof body.title === "string" && body.title.trim()) update.title = body.title.trim();
  if (typeof body.content === "string" && body.content.trim()) update.content = body.content.trim();
  if (typeof body.imageUrl === "string" && body.imageUrl.trim()) update.imageUrl = body.imageUrl.trim();

  const item = await updateNews(params.id, update);
  if (!item) {
    return NextResponse.json({ error: "Новость не найдена" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ok = await deleteNews(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Новость не найдена" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
