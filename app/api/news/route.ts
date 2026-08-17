import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createNews, getAllNews } from "@/lib/news-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getAllNews();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

  if (!title || !content || !imageUrl) {
    return NextResponse.json(
      { error: "Заполните заголовок, текст и фото" },
      { status: 400 }
    );
  }

  const item = await createNews({ title, content, imageUrl });
  return NextResponse.json(item, { status: 201 });
}
