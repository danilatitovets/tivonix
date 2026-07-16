/** Safe email subject helpers — no raw user contact in Subject. */

/** Strip CRLF / control chars, collapse whitespace, hard-limit length. */
export function sanitizeHeaderValue(input: string, maxLen = 80): string {
  // eslint-disable-next-line no-control-regex -- intentional control-char scrubbing for email headers
  const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
  const cleaned = String(input ?? "")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(CONTROL_CHARS, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";
  return cleaned.slice(0, maxLen);
}

export function createLeadRequestId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${t}-${r}`;
}

/** Preferred subject: TIVONIX lead · plan/source · request ID */
export function buildLeadSubject(opts: {
  planId?: string;
  planName?: string;
  ctaSource?: string;
  requestId: string;
}): string {
  const plan = sanitizeHeaderValue(opts.planName || opts.planId || "", 40);
  const source = sanitizeHeaderValue(opts.ctaSource || "", 40) || "unknown";
  const mid = plan || source;
  const id = sanitizeHeaderValue(opts.requestId, 32) || "na";
  return `TIVONIX lead · ${mid} · ${id}`;
}
