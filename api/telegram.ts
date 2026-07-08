// api/telegram.ts — webhook endpoint (also reachable via /api/_bot rewrite)
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { webhookCallback } from "grammy";
import { createBot } from "./_bot.js";

const SERVICE_NAME = "tivonix-telegram-bot";

function readBotEnv() {
  return {
    BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN || "",
    ADMIN_IDS: process.env.TELEGRAM_ADMIN_CHAT_ID || process.env.ADMIN_IDS || "",
    WEBHOOK_SECRET:
      process.env.TELEGRAM_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET || "",
  };
}

function getBaseUrl(req: VercelRequest) {
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host =
    (req.headers["x-forwarded-host"] as string) ||
    (req.headers.host as string) ||
    process.env.PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") ||
    process.env.SITE_URL?.replace(/^https?:\/\//, "") ||
    process.env.APP_URL?.replace(/^https?:\/\//, "") ||
    "www.tivonix.tech";
  return `${proto}://${host}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let botInstance: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let webhookHandler: any = null;

function getWebhookHandler() {
  const env = readBotEnv();
  if (!env.BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN (or BOT_TOKEN) is missing");
  }
  if (!botInstance) {
    botInstance = createBot(env);
    webhookHandler = webhookCallback(botInstance, "http");
  }
  return { bot: botInstance, handler: webhookHandler };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const env = readBotEnv();
    return res.status(200).json({
      ok: true,
      service: SERVICE_NAME,
      configured: {
        token: Boolean(env.BOT_TOKEN),
        admin: Boolean(env.ADMIN_IDS),
        webhookSecret: Boolean(env.WEBHOOK_SECRET),
      },
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const env = readBotEnv();
  const secret = env.WEBHOOK_SECRET;
  const header = req.headers["x-telegram-bot-api-secret-token"];

  if (secret && header !== secret) {
    console.warn("[bot] webhook rejected: invalid secret token");
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  if (!secret) {
    console.warn(
      "[bot] TELEGRAM_WEBHOOK_SECRET is not set — webhook accepts any POST (recommended to set in production)"
    );
  }

  try {
    const { bot, handler: cb } = getWebhookHandler();

    const updateId =
      typeof req.body === "object" && req.body !== null && "update_id" in req.body
        ? (req.body as { update_id?: number }).update_id
        : undefined;

    console.log("[bot] webhook received", { updateId: updateId ?? null });

    // важно для ссылок на pdf
    bot.config = { baseUrl: getBaseUrl(req) };

    await cb(req, res);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[bot] webhook error", { error: message });
    // Telegram retries on non-2xx; always acknowledge to avoid retry storms
    if (!res.headersSent) {
      return res.status(200).json({ ok: false });
    }
  }
}
