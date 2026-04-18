import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendTelegramLead } from "@/lib/telegram";
import { content } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const errs = content.contactForm.errors;

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: errs.bodyInvalid },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: errs.validation,
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
      { ok: false, error: errs.send },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: errs.methodNotAllowed },
    { status: 405 }
  );
}
