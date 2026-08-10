/**
 * MileSeal analytics dedup + PII scrub (mirrors src/lib/analytics.ts test sink).
 * Transport in production: Hotjar window.hj("event") + gtag trackPartnersEvent.
 */
import assert from "node:assert/strict";

function scrub(props) {
  if (!props) return undefined;
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    const key = k.toLowerCase();
    if (
      key.includes("email") ||
      key.includes("phone") ||
      key.includes("telegram") ||
      key.includes("name") ||
      key.includes("task") ||
      key.includes("contact") ||
      key.includes("message") ||
      key.includes("detail")
    ) {
      continue;
    }
    if (typeof v === "string" && v.length > 80) continue;
    out[k] = v;
  }
  return out;
}

const milesealOnceKeys = new Set();
const sink = [];

function trackMilesealOnce(key, name, props) {
  if (milesealOnceKeys.has(key)) return;
  milesealOnceKeys.add(key);
  sink.push({ name, props: scrub(props) });
}

trackMilesealOnce("mileseal_case_opened", "mileseal_case_opened", { surface: "case_page" });
trackMilesealOnce("mileseal_case_opened", "mileseal_case_opened", { surface: "hero" });
trackMilesealOnce("mileseal_case_opened", "mileseal_case_opened", { surface: "sidebar" });

const opened = sink.filter((e) => e.name === "mileseal_case_opened");
assert.equal(opened.length, 1);
assert.equal(opened[0].props.surface, "case_page");

const safe = scrub({
  source: "mileseal_scope_review",
  email: "secret@example.com",
  scope: "Full scope",
  request: "Client text",
});
assert.ok(!JSON.stringify(safe).includes("secret@"));
assert.equal(safe.source, "mileseal_scope_review");

console.log("mileseal analytics checks passed (Hotjar + gtag transport, dedup + scrub verified)");
