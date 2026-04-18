import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendTelegramLead } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "So'rov formati noto'g'ri" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validatsiya xatosi",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  try {
    await sendTelegramLead(parsed.data);
  } catch (err) {
    console.error("Telegram send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Xabarni yuborib bo'lmadi. Keyinroq urinib ko'ring." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { status: 405 }
  );
}
