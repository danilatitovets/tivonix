/**
 * Wave 3 Playwright: 375/1440, keyboard/focus, analytics dedup, single analyse CTA.
 * Requires preview at http://127.0.0.1:4174
 */
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = (process.env.MILESEAL_URL || "http://127.0.0.1:4174").replace(/\/$/, "");
const OUT = path.resolve("artifacts/mileseal-wave3");

async function dismissConsent(page) {
  const accept = page.getByRole("button", { name: /Accept|Принять|接受/i });
  if (await accept.isVisible().catch(() => false)) await accept.click().catch(() => {});
}

async function shot(page, name, width, height) {
  await page.setViewportSize({ width, height });
  await page.screenshot({ path: path.join(OUT, `${name}-${width}.png`), fullPage: true });
  console.log("saved", `${name}-${width}.png`);
}

const browser = await chromium.launch({ headless: true });
await mkdir(OUT, { recursive: true });

// EN commercial + workspace viewports
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/en/mileseal`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  await shot(page, "en-mileseal", 375, 812);
  await shot(page, "en-mileseal", 1440, 900);
  await page.close();
}

// Single analyse button in workspace (strict mode)
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/en/mileseal`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  await page.locator('button[title="Homepage + author pages"]').click();
  await page.waitForTimeout(300);
  const analyse = page.getByRole("button", { name: /^Analyse request$/i });
  assert.equal(await analyse.count(), 1, "exactly one Analyse request button");
  await page.close();
}

// CTA scroll + focus + escape + hash
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/en/mileseal`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  const cta = page.getByTestId("mileseal-hero-review-cta");
  await cta.click();
  await page.waitForTimeout(800);
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return "";
    return `${el.id}|${el.tagName}|${el.getAttribute("aria-label") ?? ""}`;
  });
  assert.ok(
    focused.toLowerCase().includes("request") || focused.includes("TEXTAREA"),
    `focus moved to first form field after CTA (${focused})`
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  const backFocus = await page.evaluate(() => document.activeElement?.textContent ?? "");
  assert.ok(backFocus.includes("Review my request"), "focus returns to opener after Escape");
  await page.close();
}

{
  const page = await browser.newPage();
  await page.goto(`${BASE}/en/mileseal#scope-review`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  await page.waitForTimeout(600);
  const formVisible = await page
    .getByLabel(/Later client request|Client request|Запрос клиента/i)
    .isVisible()
    .catch(() => false);
  assert.ok(formVisible, "#scope-review opens review form");
  await page.close();
}

// mileseal_case_opened once on direct case URL (inject counter)
{
  const page = await browser.newPage();
  await page.addInitScript(() => {
    window.__msEvents = [];
    window.hj = (...args) => {
      if (args[0] === "event") window.__msEvents.push(args[1]);
    };
    window.gtag = () => {};
  });
  await page.goto(`${BASE}/en/mileseal/cases/content-migration`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  await page.waitForTimeout(400);
  let count = await page.evaluate(() =>
    (window.__msEvents || []).filter((e) => e === "mileseal_case_opened").length
  );
  assert.equal(count, 1, "case_opened once on direct entry (Hotjar transport)");
  await page.goto(`${BASE}/en/mileseal/cases/content-migration`, { waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  count = await page.evaluate(() =>
    (window.__msEvents || []).filter((e) => e === "mileseal_case_opened").length
  );
  assert.equal(count, 1, "case_opened not duplicated on same-session navigation");
  await page.close();
}

// 375px sticky / keyboard — workspace scroll
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/en/mileseal`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await shot(page, "en-mileseal-keyboard", 375, 812);
  await page.close();
}

await browser.close();
console.log("wave3 capture/checks done");
