import "server-only";

import type { ContactInput } from "@/lib/schemas";
import { ageLabels, serviceLabels } from "@/lib/schemas";
import { content } from "@/lib/content";

const TELEGRAM_API = "https://api.telegram.org";

function escapeMarkdown(value: string): string {
  return value.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function sendTelegramLead(data: ContactInput) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in environment"
    );
  }

  const l = content.telegram.labels;
  const text = [
    `*${escapeMarkdown(content.telegram.leadTitle)}*`,
    "",
    `*${l.name}:* ${escapeMarkdown(data.name)}`,
    `*${l.phone}:* ${escapeMarkdown(data.phone)}`,
    data.email ? `*${l.email}:* ${escapeMarkdown(data.email)}` : null,
    `*${l.service}:* ${escapeMarkdown(serviceLabels[data.service])}`,
    `*${l.age}:* ${escapeMarkdown(ageLabels[data.age])}`,
    "",
    `*${l.message}:*`,
    escapeMarkdown(data.message),
    "",
    `_${escapeMarkdown(new Date().toLocaleString("uz-UZ"))}_`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API error: ${res.status} ${body}`);
  }

  return (await res.json()) as { ok: boolean };
}
