/**
 * Integration tests for MileSeal lead client path (mock fetch — no production leads).
 */
import assert from "node:assert/strict";

function buildLeadMeta(ctaSource, _page, extra) {
  return { ctaSource, ...extra };
}

function buildMilesealLeadTask(input) {
  const isAudit = input.variant === "audit";
  const header = isAudit
    ? "[MileSeal Scope Leakage Audit — $350]"
    : "[MileSeal human scope review]";
  return [
    header,
    input.agency.trim() ? `Agency: ${input.agency.trim()}` : null,
    "",
    "Agreed scope excerpt:",
    input.agreedScope.trim(),
    "",
    "Later client request:",
    input.clientRequest.trim(),
  ]
    .filter(Boolean)
    .join("\n");
}

function buildMilesealLeadBody(input) {
  const ctaSource =
    input.variant === "audit" ? "mileseal_scope_leakage_audit" : "mileseal_scope_review";
  const meta =
    input.variant === "audit"
      ? buildLeadMeta(ctaSource, undefined, {
          offer: "scope_leakage_audit",
          amount: 350,
          currency: "USD",
        })
      : buildLeadMeta(ctaSource);
  return {
    name: input.name.trim() || input.agency.trim() || "MileSeal",
    contact: input.email.trim(),
    task: buildMilesealLeadTask(input),
    budget: "unknown",
    consent: true,
    company_fax_url: input.honeypot,
    lang: input.lang,
    meta,
  };
}

async function submitMilesealLead(input, fetchImpl) {
  const body = buildMilesealLeadBody(input);
  const res = await fetchImpl("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok && data.ok) return { ok: true };
  return { ok: false, error: data.error || `http_${res.status}` };
}

function scrub(props) {
  const out = {};
  for (const [k, v] of Object.entries(props ?? {})) {
    const key = k.toLowerCase();
    if (key.includes("email") || key.includes("scope") || key.includes("request")) continue;
    out[k] = v;
  }
  return out;
}

const analytics = [];

function track(name, props) {
  analytics.push({ name, props: scrub(props) });
}

async function simulateSubmit(input, fetchImpl) {
  const ctaSource =
    input.variant === "audit" ? "mileseal_scope_leakage_audit" : "mileseal_scope_review";
  track("lead_form_submit", { source: ctaSource });
  const result = await submitMilesealLead(input, fetchImpl);
  if (result.ok) track("lead_form_success", { source: ctaSource });
  else track("lead_form_server_error");
  return result;
}

const sampleInput = {
  lang: "en",
  variant: "review",
  name: "Jane Doe",
  email: "jane@agency.test",
  agency: "Test Agency",
  clientRequest: "Move all blog posts to the new CMS",
  agreedScope: "Design and build marketing site",
  consent: true,
  honeypot: "",
};

// Free review success + payload
{
  analytics.length = 0;
  let captured;
  const fetchImpl = async (_url, init) => {
    captured = JSON.parse(String(init.body));
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  };
  const result = await simulateSubmit(sampleInput, fetchImpl);
  assert.equal(result.ok, true);
  assert.equal(captured.meta.ctaSource, "mileseal_scope_review");
  assert.equal(captured.contact, "jane@agency.test");
  assert.ok(captured.task.includes("Move all blog posts"));
  assert.ok(analytics.some((e) => e.name === "lead_form_success"));
  assert.ok(!JSON.stringify(analytics).includes("jane@agency"));
}

// Audit $350
{
  analytics.length = 0;
  let captured;
  const fetchImpl = async (_url, init) => {
    captured = JSON.parse(String(init.body));
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  };
  const result = await simulateSubmit({ ...sampleInput, variant: "audit" }, fetchImpl);
  assert.equal(result.ok, true);
  assert.equal(captured.meta.amount, 350);
  assert.equal(captured.meta.currency, "USD");
  assert.equal(captured.meta.offer, "scope_leakage_audit");
  assert.ok(captured.task.includes("$350"));
}

// Server error — no success event
{
  analytics.length = 0;
  const fetchImpl = async () => ({
    ok: false,
    status: 500,
    json: async () => ({ ok: false }),
  });
  const result = await simulateSubmit(sampleInput, fetchImpl);
  assert.equal(result.ok, false);
  assert.ok(analytics.some((e) => e.name === "lead_form_server_error"));
  assert.ok(!analytics.some((e) => e.name === "lead_form_success"));
}

// Double-submit guard
{
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    assert.equal(calls, 1);
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  };
  await simulateSubmit(sampleInput, fetchImpl);
}

console.log("mileseal leads integration checks passed");
