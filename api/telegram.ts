// api/telegram.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { webhookCallback } from "grammy";
import { createBot } from "./_bot";

function getBaseUrl(req: VercelRequest) {
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host =
    (req.headers["x-forwarded-host"] as string) ||
    (req.headers.host as string) ||
    "www.tivonix.tech";
  return `${proto}://${host}`;
}

const bot = createBot({
  BOT_TOKEN: process.env.BOT_TOKEN!,
  ADMIN_IDS: process.env.ADMIN_IDS,
});

// ✅ "http" вместо "vercel"
const cb = webhookCallback(bot, "http");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(200).send("OK");

  // (опционально) secret защита
  const secret = process.env.WEBHOOK_SECRET;
  const header = req.headers["x-telegram-bot-api-secret-token"];
  if (secret && header !== secret) return res.status(401).send("Unauthorized");

  // передаём baseUrl в bot.config
  (bot as any).config = { baseUrl: getBaseUrl(req) };

  await cb(req as any, res as any);
}