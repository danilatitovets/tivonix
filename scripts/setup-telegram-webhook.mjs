#!/usr/bin/env node
/**
 * Register Telegram webhook for production.
 *
 * Usage (PowerShell):
 *   $env:TELEGRAM_BOT_TOKEN="..."; $env:TELEGRAM_WEBHOOK_SECRET="..."; node scripts/setup-telegram-webhook.mjs
 *
 * Optional:
 *   $env:WEBHOOK_URL="https://www.tivonix.tech/api/telegram"
 */

const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;
const secret = (process.env.TELEGRAM_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET || "").trim();
const webhookUrl =
  process.env.WEBHOOK_URL || "https://www.tivonix.tech/api/telegram";

if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN (or BOT_TOKEN)");
  process.exit(1);
}

const body = {
  url: webhookUrl,
  allowed_updates: ["message", "callback_query"],
  drop_pending_updates: true,
};
if (secret) body.secret_token = secret;

const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));

if (!data.ok) process.exit(1);

const infoRes = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`);
const info = await infoRes.json();
console.log("Webhook info:", JSON.stringify(info.result, null, 2));
