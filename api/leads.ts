// api/leads.ts — POST /api/leads — website lead form
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { deliverLead, type LeadPayload } from "./_leadsDelivery.js";
import { checkLeadRateLimit, consumeLeadRateLimit } from "./_leadsRateLimit.js";
import { createLeadRequestId } from "./_leadsSubject.js";

const MAX_BODY_BYTES = 48 * 1024;

const BUDGET_VALUES = new Set([
  "under_500",
  "500_1500",
  "1500_5000",
  "from_5000",
  "unknown",
  "",
]);

const PLAN_IDS = new Set(["start", "growth", "product", "custom"]);

function clientIp(req: VercelRequest): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length > 0) return xf.split(",")[0].trim();
  if (Array.isArray(xf) && xf[0]) return xf[0].split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function isValidContact(contact: string): boolean {
  if (contact.length < 3 || contact.length > 200) return false;
  // eslint-disable-next-line no-control-regex -- reject control / CRLF in contact
  if (/[\r\n\u0000-\u001F\u007F]/.test(contact)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return true;
  if (/^@?[a-zA-Z0-9_]{4,32}$/.test(contact)) return true;
  if (/^https?:\/\/(t\.me|telegram\.me)\//i.test(contact)) return true;
  if (/^[\d\s+\-().]{6,20}$/.test(contact) && (contact.match(/\d/g)?.length ?? 0) >= 6)
    return true;
  if (/^[\w.@+\-\s]{3,80}$/u.test(contact)) return true;
  return false;
}

function parseBody(req: VercelRequest):
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; status: number; error: string } {
  const cl = req.headers["content-length"];
  if (cl != null && Number(cl) > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: "payload_too_large" };
  }

  const raw = req.body;

  if (raw == null) {
    return { ok: true, body: {} };
  }

  if (typeof raw === "string") {
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return { ok: false, status: 413, error: "payload_too_large" };
    }
    if (!raw.trim()) {
      return { ok: true, body: {} };
    }
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        return { ok: false, status: 400, error: "invalid_json" };
      }
      return { ok: true, body: parsed as Record<string, unknown> };
    } catch {
      return { ok: false, status: 400, error: "invalid_json" };
    }
  }

  if (typeof raw === "object" && !Array.isArray(raw)) {
    try {
      const size = Buffer.byteLength(JSON.stringify(raw), "utf8");
      if (size > MAX_BODY_BYTES) {
        return { ok: false, status: 413, error: "payload_too_large" };
      }
    } catch {
      return { ok: false, status: 400, error: "invalid_json" };
    }
    return { ok: true, body: raw as Record<string, unknown> };
  }

  return { ok: false, status: 400, error: "invalid_json" };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(204).end();
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    const ip = clientIp(req);
    const limit = checkLeadRateLimit(ip);
    if (!limit.ok) {
      res.setHeader("Retry-After", String(limit.retryAfterSec ?? 60));
      return res.status(429).json({ ok: false, error: "rate_limited", fallback: true });
    }

    const parsed = parseBody(req);
    if (parsed.ok === false) {
      return res.status(parsed.status).json({ ok: false, error: parsed.error });
    }
    const body = parsed.body;

    // Honeypot — bots fill hidden field; humans leave empty
    // (do not name this "website" — browsers autofill it)
    const honeypot = str(body.company_fax_url ?? body.website ?? body.honeypot, 200);
    if (honeypot) {
      // Silent-looking success without delivery (do not tip off bots)
      return res.status(200).json({ ok: true });
    }

    const name = str(body.name, 80);
    const contact = str(body.contact, 200);
    const task = str(body.task, 4000);
    const budgetRaw = str(body.budget, 40);
    const lang = str(body.lang, 8) || "ru";
    const consent = body.consent === true || body.consent === "true" || body.consent === 1;

    if (!consent) {
      return res.status(400).json({ ok: false, error: "consent_required" });
    }

    if (!isValidContact(contact)) {
      return res.status(400).json({ ok: false, error: "invalid_contact" });
    }

    if (task.length < 5) {
      return res.status(400).json({ ok: false, error: "invalid_task" });
    }

    if (!BUDGET_VALUES.has(budgetRaw)) {
      return res.status(400).json({ ok: false, error: "invalid_budget" });
    }

    const metaIn = (
      typeof body.meta === "object" && body.meta !== null ? body.meta : {}
    ) as Record<string, unknown>;

    const planIdRaw = str(body.planId ?? metaIn.planId, 40);
    const planId = PLAN_IDS.has(planIdRaw) ? planIdRaw : undefined;
    const planName = planId ? str(body.planName ?? metaIn.planName, 80) || undefined : undefined;

    const offer = str(metaIn.offer, 80) || undefined;
    const amountRaw = metaIn.amount;
    const amount =
      typeof amountRaw === "number" && Number.isFinite(amountRaw)
        ? amountRaw
        : typeof amountRaw === "string" && amountRaw.trim()
          ? Number(amountRaw)
          : undefined;
    const currency = str(metaIn.currency, 8) || undefined;

    const requestId = createLeadRequestId();

    const lead: LeadPayload = {
      name: name || undefined,
      contact,
      task,
      budget: budgetRaw || undefined,
      lang: lang === "en" ? "en" : "ru",
      planId,
      planName,
      requestId,
      meta: {
        url: str(metaIn.url, 500) || "",
        page: str(metaIn.page, 300) || "",
        ctaSource: str(metaIn.ctaSource, 80) || "unknown",
        referrer: str(metaIn.referrer, 500),
        utmSource: str(metaIn.utmSource, 120),
        utmMedium: str(metaIn.utmMedium, 120),
        utmCampaign: str(metaIn.utmCampaign, 120),
        datetime: str(metaIn.datetime, 64) || new Date().toISOString(),
        planId,
        planName,
        offer,
        amount: typeof amount === "number" && Number.isFinite(amount) ? amount : undefined,
        currency,
      },
    };

    consumeLeadRateLimit(ip);
    const result = await deliverLead(lead);

    if (!result.ok) {
      const status = result.error === "email_not_configured" || result.error === "email_from_invalid" ? 503 : 503;
      return res.status(status).json({
        ok: false,
        error: result.error || "delivery_failed",
        fallback: true,
        requestId: result.requestId,
      });
    }

    return res.status(200).json({
      ok: true,
      emailSent: result.emailSent,
      telegramSent: result.telegramSent,
      requestId: result.requestId,
      messageId: result.messageId,
    });
  } catch {
    return res.status(500).json({ ok: false, error: "server_error", fallback: true });
  }
}
