/** Server-side lead delivery: email (Resend, required) + optional Telegram notify. */

import {
  buildLeadSubject,
  createLeadRequestId,
  sanitizeHeaderValue,
} from "./_leadsSubject.js";

export type LeadPayload = {
  name?: string;
  contact: string;
  task: string;
  budget?: string;
  lang: string;
  planId?: string;
  planName?: string;
  requestId?: string;
  meta: {
    url: string;
    page: string;
    ctaSource: string;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    datetime: string;
    planId?: string;
    planName?: string;
    offer?: string;
    amount?: number;
    currency?: string;
  };
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Owner-facing notifications are always Russian. Visitor language is a field value only. */
const LOGO_URL = "https://www.tivonix.tech/images/logo-black.png";

function dash(v: string | undefined | null): string {
  const t = (v ?? "").trim();
  return t || "—";
}

function visitorLangLabel(lang: string): string {
  return String(lang || "").toLowerCase().startsWith("en") ? "английский" : "русский";
}

function budgetLabel(budget: string | undefined): string {
  const map: Record<string, string> = {
    under_500: "до $500",
    "500_1500": "$500–1500",
    "1500_5000": "$1500–5000",
    from_5000: "от $5000",
    unknown: "пока не определили",
  };
  const key = (budget || "").trim();
  if (!key) return "";
  return map[key] || key;
}

function sourceLabel(source: string): string {
  const map: Record<string, string> = {
    hero: "Главный экран",
    header: "Шапка сайта",
    mobile_sticky: "Кнопка на мобильном",
    main_offer: "Блок услуг",
    cases: "Кейсы",
    projects: "Страница проектов",
    project_page: "Страница проекта",
    final_cta: "Нижний призыв",
    contacts: "Контакты",
    pricing: "Тарифы",
    pricing_help: "Помощь на тарифах",
    service_websites: "Создание сайтов",
    service_automation: "Автоматизация",
    mileseal_scope: "MileSeal — scope review",
    mileseal_scope_review: "MileSeal — human scope review",
    mileseal_scope_leakage_audit: "MileSeal — Scope Leakage Audit ($350)",
    "release-audit": "Тест",
    unknown: "Не указано",
  };
  const key = (source || "").trim();
  return map[key] || key || "Не указано";
}

function formatWhen(iso: string): string {
  const raw = (iso || "").trim();
  if (!raw) return "—";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  try {
    return (
      new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d) + " (МСК)"
    );
  } catch {
    return raw;
  }
}

function formatPlain(lead: LeadPayload): string {
  const plan = (lead.planName || lead.meta.planName || lead.planId || lead.meta.planId || "").trim();
  const budget = budgetLabel(lead.budget);
  const offer = (lead.meta.offer || "").trim();
  const amount =
    typeof lead.meta.amount === "number" && Number.isFinite(lead.meta.amount)
      ? lead.meta.amount
      : undefined;
  const currency = (lead.meta.currency || "").trim();
  const lines: Array<string | null> = [
    "Новая заявка — TIVONIX",
    "",
    `Имя: ${dash(lead.name)}`,
    `Контакт: ${lead.contact}`,
    plan ? `Тариф: ${plan}` : null,
    budget ? `Бюджет: ${budget}` : null,
    offer ? `Оффер: ${offer}` : null,
    amount != null && currency ? `Сумма: ${amount} ${currency}` : null,
    `Язык посетителя: ${visitorLangLabel(lead.lang)}`,
    "",
    "Задача:",
    lead.task,
    "",
    `Страница: ${dash(lead.meta.page)}`,
    `Кнопка / место: ${sourceLabel(lead.meta.ctaSource)}`,
    `Время: ${formatWhen(lead.meta.datetime)}`,
  ];
  if (lead.meta.url) lines.push(`Ссылка: ${lead.meta.url}`);
  if (lead.meta.referrer) lines.push(`Откуда пришёл: ${lead.meta.referrer}`);
  if (lead.meta.utmSource) lines.push(`UTM source: ${lead.meta.utmSource}`);
  if (lead.meta.utmMedium) lines.push(`UTM medium: ${lead.meta.utmMedium}`);
  if (lead.meta.utmCampaign) lines.push(`UTM campaign: ${lead.meta.utmCampaign}`);
  if (lead.requestId) {
    lines.push("");
    lines.push(`ID: ${lead.requestId}`);
  }
  return lines.filter((x) => x != null).join("\n");
}

function formatHtml(lead: LeadPayload): string {
  const plan = (lead.planName || lead.meta.planName || lead.planId || lead.meta.planId || "").trim();
  const budget = budgetLabel(lead.budget);
  const offer = (lead.meta.offer || "").trim();
  const amount =
    typeof lead.meta.amount === "number" && Number.isFinite(lead.meta.amount)
      ? lead.meta.amount
      : undefined;
  const currency = (lead.meta.currency || "").trim();
  const contact = lead.contact.trim();
  const contactHtml = contact.includes("@")
    ? `<a href="mailto:${escapeHtml(contact)}" style="color:#FF6A1A;text-decoration:none">${escapeHtml(contact)}</a>`
    : escapeHtml(contact);
  const url = (lead.meta.url || "").trim();
  const urlHtml = url.startsWith("http")
    ? `<a href="${escapeHtml(url)}" style="color:#FF6A1A;text-decoration:none">${escapeHtml(url)}</a>`
    : escapeHtml(url);

  const row = (label: string, valueHtml: string) =>
    `<tr>
      <td style="padding:11px 18px 11px 0;width:38%;vertical-align:top;color:#8A8A8A;font-size:13px;line-height:1.45">${escapeHtml(label)}</td>
      <td style="padding:11px 0;vertical-align:top;color:#161616;font-size:15px;line-height:1.45;font-weight:550">${valueHtml}</td>
    </tr>`;

  const optionalRows = [
    plan ? row("Тариф", escapeHtml(plan)) : "",
    budget ? row("Бюджет", escapeHtml(budget)) : "",
    offer ? row("Оффер", escapeHtml(offer)) : "",
    amount != null && currency
      ? row("Сумма", escapeHtml(`${amount} ${currency}`))
      : "",
  ].join("");

  const moreRows = [
    url ? row("Ссылка", urlHtml) : "",
    lead.meta.referrer ? row("Откуда пришёл", escapeHtml(lead.meta.referrer)) : "",
    lead.meta.utmSource ? row("UTM source", escapeHtml(lead.meta.utmSource)) : "",
    lead.meta.utmMedium ? row("UTM medium", escapeHtml(lead.meta.utmMedium)) : "",
    lead.meta.utmCampaign ? row("UTM campaign", escapeHtml(lead.meta.utmCampaign)) : "",
  ].join("");

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Новая заявка — TIVONIX</title>
</head>
<body style="margin:0;padding:0;background:#F3F3F3;color:#161616;-webkit-text-size-adjust:100%">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F3F3F3;padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;margin:0 auto">
          <tr>
            <td style="padding:0 4px 18px">
              <img src="${LOGO_URL}" alt="TIVONIX" width="148" height="36" style="display:block;width:148px;height:auto;border:0;outline:none" />
            </td>
          </tr>

          <tr>
            <td style="background:#FFFFFF;border-radius:16px;padding:28px 28px 22px">
              <h1 style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.25;font-weight:750;letter-spacing:-0.02em;color:#111111">Новая заявка</h1>
              <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#6F6F6F">Коротко по заявке с сайта — можно сразу ответить на контакт.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
                ${row("Имя", escapeHtml(dash(lead.name)))}
                ${row("Контакт", contactHtml)}
                ${optionalRows}
                ${row("Язык посетителя", escapeHtml(visitorLangLabel(lead.lang)))}
              </table>
            </td>
          </tr>

          <tr><td style="height:12px;line-height:12px;font-size:0">&nbsp;</td></tr>

          <tr>
            <td style="background:#FFFFFF;border-radius:16px;padding:26px 28px">
              <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#8A8A8A">Задача</p>
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#161616;white-space:pre-wrap">${escapeHtml(lead.task)}</p>
            </td>
          </tr>

          <tr><td style="height:12px;line-height:12px;font-size:0">&nbsp;</td></tr>

          <tr>
            <td style="background:#FFFFFF;border-radius:16px;padding:26px 28px">
              <p style="margin:0 0 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#8A8A8A">Откуда заявка</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
                ${row("Страница", escapeHtml(dash(lead.meta.page)))}
                ${row("Кнопка / место", escapeHtml(sourceLabel(lead.meta.ctaSource)))}
                ${row("Время", escapeHtml(formatWhen(lead.meta.datetime)))}
                ${moreRows}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 8px 6px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.55;color:#9A9A9A">
              TIVONIX · сайты, боты и автоматизация<br />
              <a href="https://www.tivonix.tech/" style="color:#FF6A1A;text-decoration:none">www.tivonix.tech</a>
              ${lead.requestId ? `<br /><span style="color:#B0B0B0">ID ${escapeHtml(lead.requestId)}</span>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function readEmailConfig():
  | { ok: true; apiKey: string; to: string; from: string }
  | { ok: false; error: string } {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const to = (process.env.LEADS_EMAIL_TO || "").trim();
  const from = (process.env.LEADS_EMAIL_FROM || "").trim();

  if (!apiKey || !to || !from) {
    return { ok: false, error: "email_not_configured" };
  }
  if (/onboarding@resend\.dev/i.test(from)) {
    return { ok: false, error: "email_from_invalid" };
  }
  return { ok: true, apiKey, to, from };
}

function safeReplyTo(contact: string): string | undefined {
  const c = sanitizeHeaderValue(contact, 200);
  if (!c || c.includes(" ") || !c.includes("@")) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)) return undefined;
  return c;
}

async function sendEmail(
  lead: LeadPayload
): Promise<{ ok: boolean; error?: string; messageId?: string }> {
  const cfg = readEmailConfig();
  if (cfg.ok === false) {
    return { ok: false, error: cfg.error };
  }

  const subject = buildLeadSubject({
    planId: lead.planId || lead.meta.planId,
    planName: lead.planName || lead.meta.planName,
    ctaSource: lead.meta.ctaSource,
    requestId: lead.requestId || createLeadRequestId(),
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: cfg.from,
        to: [cfg.to],
        subject,
        text: formatPlain(lead),
        html: formatHtml(lead),
        reply_to: safeReplyTo(lead.contact),
      }),
    });

    const raw = await res.text().catch(() => "");
    let parsed: { id?: string } = {};
    try {
      parsed = JSON.parse(raw) as { id?: string };
    } catch {
      /* ignore */
    }

    if (!res.ok) {
      return { ok: false, error: `resend_http_${res.status}` };
    }

    return { ok: true, messageId: typeof parsed.id === "string" ? parsed.id : undefined };
  } catch {
    return { ok: false, error: "email_failed" };
  }
}

async function sendTelegram(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN || "";
  const chatId =
    process.env.TELEGRAM_CHAT_ID ||
    process.env.TELEGRAM_ADMIN_CHAT_ID ||
    process.env.ADMIN_IDS ||
    "";

  if (!token || !chatId) {
    return { ok: false, error: "telegram_not_configured" };
  }

  const target = chatId.split(",")[0]?.trim();
  if (!target) return { ok: false, error: "telegram_chat_missing" };

  const plan = (lead.planName || lead.meta.planName || lead.planId || lead.meta.planId || "").trim();
  const budget = budgetLabel(lead.budget);
  const text =
    `🔔 <b>Новая заявка — TIVONIX</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(dash(lead.name))}\n` +
    `<b>Контакт:</b> ${escapeHtml(lead.contact)}\n` +
    (plan ? `<b>Тариф:</b> ${escapeHtml(plan)}\n` : "") +
    (budget ? `<b>Бюджет:</b> ${escapeHtml(budget)}\n` : "") +
    `<b>Язык:</b> ${escapeHtml(visitorLangLabel(lead.lang))}\n` +
    `<b>Место:</b> ${escapeHtml(sourceLabel(lead.meta.ctaSource))}\n` +
    `<b>Страница:</b> ${escapeHtml(dash(lead.meta.page))}\n\n` +
    `<b>Задача:</b>\n${escapeHtml(lead.task.slice(0, 1500))}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: target,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      return { ok: false, error: `telegram_http_${res.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "telegram_failed" };
  }
}

/**
 * Prefer email via Resend; Telegram is also a valid delivery channel.
 * Success if at least one channel delivered — temporary Resend blips
 * must not show "failed" when Telegram already received the lead.
 */
export async function deliverLead(lead: LeadPayload): Promise<{
  ok: boolean;
  emailSent: boolean;
  telegramSent: boolean;
  messageId?: string;
  requestId: string;
  error?: string;
}> {
  const requestId = lead.requestId || createLeadRequestId();
  const payload: LeadPayload = { ...lead, requestId };

  const hasTg =
    Boolean(process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN) &&
    Boolean(
      process.env.TELEGRAM_CHAT_ID ||
        process.env.TELEGRAM_ADMIN_CHAT_ID ||
        process.env.ADMIN_IDS
    );

  const cfg = readEmailConfig();
  if (cfg.ok === false && !hasTg) {
    return {
      ok: false,
      emailSent: false,
      telegramSent: false,
      requestId,
      error: cfg.error,
    };
  }

  const email = cfg.ok ? await sendEmail(payload) : { ok: false as const, error: cfg.error };

  let telegramSent = false;
  if (hasTg) {
    const tg = await sendTelegram(payload);
    telegramSent = tg.ok;
  }

  if (email.ok || telegramSent) {
    return {
      ok: true,
      emailSent: email.ok,
      telegramSent,
      messageId: email.ok ? email.messageId : undefined,
      requestId,
    };
  }

  return {
    ok: false,
    emailSent: false,
    telegramSent: false,
    requestId,
    error: email.error || "delivery_failed",
  };
}

export { sanitizeHeaderValue, buildLeadSubject, createLeadRequestId };
