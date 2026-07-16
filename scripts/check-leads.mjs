/**
 * Lightweight Node checks for lead validation + subject sanitization.
 * Run: node scripts/check-leads.mjs
 */
import assert from "node:assert/strict";

function isValidContact(contact) {
  const c = String(contact || "").trim();
  if (c.length < 3 || c.length > 200) return false;
  if (/[\r\n\u0000-\u001F\u007F]/.test(c)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)) return true;
  if (/^@?[a-zA-Z0-9_]{4,32}$/.test(c)) return true;
  if (/^https?:\/\/(t\.me|telegram\.me)\//i.test(c)) return true;
  if (/^[\d\s+\-().]{6,20}$/.test(c) && (c.match(/\d/g)?.length ?? 0) >= 6) return true;
  if (/^[\w.@+\-\s]{3,80}$/u.test(c)) return true;
  return false;
}

function validateLeadFields(fields) {
  if (!fields.contact?.trim() || fields.contact.trim().length < 3) {
    return { ok: false, field: "contact" };
  }
  if (!fields.task?.trim() || fields.task.trim().length < 5) {
    return { ok: false, field: "task" };
  }
  if (!fields.consent) {
    return { ok: false, field: "consent" };
  }
  return { ok: true };
}

/** Keep in sync with api/_leadsSubject.ts */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

function sanitizeHeaderValue(input, maxLen = 80) {
  const cleaned = String(input ?? "")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(CONTROL_CHARS, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";
  return cleaned.slice(0, maxLen);
}

function buildLeadSubject(opts) {
  const plan = sanitizeHeaderValue(opts.planName || opts.planId || "", 40);
  const source = sanitizeHeaderValue(opts.ctaSource || "", 40) || "unknown";
  const mid = plan || source;
  const id = sanitizeHeaderValue(opts.requestId, 32) || "na";
  return `TIVONIX lead · ${mid} · ${id}`;
}

// --- contact / form validation ---
assert.equal(isValidContact("tivoonix@gmail.com"), true);
assert.equal(isValidContact("@TIVONIX"), true);
assert.equal(isValidContact("+375291234567"), true);
assert.equal(isValidContact("ab"), false);
assert.equal(isValidContact("test@example.com\r\nBcc: attacker@example.com"), false);

assert.equal(
  validateLeadFields({
    contact: "a@b.co",
    task: "Need a landing",
    consent: true,
  }).ok,
  true
);

assert.equal(
  validateLeadFields({
    contact: "",
    task: "Need a landing",
    consent: true,
  }).field,
  "contact"
);

assert.equal(
  validateLeadFields({
    contact: "a@b.co",
    task: "Hi",
    consent: true,
  }).field,
  "task"
);

assert.equal(
  validateLeadFields({
    contact: "a@b.co",
    task: "Need a landing",
    consent: false,
  }).field,
  "consent"
);

// --- subject sanitization ---
assert.equal(
  sanitizeHeaderValue("test@example.com"),
  "test@example.com"
);

assert.equal(
  sanitizeHeaderValue("test@example.com\r\nBcc: attacker@example.com"),
  "test@example.com Bcc: attacker@example.com"
);
assert.ok(!sanitizeHeaderValue("test@example.com\r\nBcc: attacker@example.com").includes("\n"));
assert.ok(!sanitizeHeaderValue("test@example.com\r\nBcc: attacker@example.com").includes("\r"));

assert.equal(sanitizeHeaderValue("a\u0000b\u0007c"), "a b c");
assert.equal(sanitizeHeaderValue("x".repeat(200)).length, 80);
assert.equal(sanitizeHeaderValue("   "), "");
assert.equal(sanitizeHeaderValue(""), "");

const subject = buildLeadSubject({
  ctaSource: "pricing",
  planId: "start",
  requestId: "abc123",
});
assert.equal(subject, "TIVONIX lead · start · abc123");

const injected = buildLeadSubject({
  ctaSource: "hero\r\nBcc: evil@x.com",
  requestId: "rid1",
});
assert.ok(!injected.includes("\r"));
assert.ok(!injected.includes("\n"));
assert.ok(injected.startsWith("TIVONIX lead ·"));

console.log("check-leads: all assertions passed");
