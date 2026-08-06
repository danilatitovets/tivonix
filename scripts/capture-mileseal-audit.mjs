/**
 * Visual QA screenshots for MileSeal audit → artifacts/mileseal-audit/
 * Usage: node scripts/capture-mileseal-audit.mjs
 * Requires preview at MILESEAL_URL (default http://127.0.0.1:4174/mileseal)
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.MILESEAL_URL || "http://127.0.0.1:4174/mileseal";
const OUT = path.resolve("artifacts/mileseal-audit");

async function dismissConsent(page) {
  const accept = page.getByRole("button", { name: /Принять|Accept|接受/i });
  if (await accept.isVisible().catch(() => false)) {
    await accept.click().catch(() => {});
    await page.waitForTimeout(200);
  }
}

async function switchLangUi(page, lang, width) {
  if (lang === "ru") return;
  const radioName = lang === "en" ? /^EN$/i : /中文/;
  const headerToggle = page.locator("header").getByRole("radio", { name: radioName });
  if (await headerToggle.first().isVisible().catch(() => false)) {
    await headerToggle.first().click();
    await page.waitForTimeout(400);
    return;
  }
  // < xl: open burger menu (LangToggle lives there on non-home pages)
  if (width < 1280) {
    const burger = page.locator("header").getByRole("button", { name: /Меню|Menu|菜单/i });
    await burger.first().click();
    await page.waitForTimeout(400);
    const menu = page.locator("#mobile-header-menu");
    await menu.getByRole("radio", { name: radioName }).first().click();
    await page.waitForTimeout(400);
    // Close overlay so it cannot block demo clicks
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    if (await menu.getAttribute("aria-hidden").catch(() => "true") !== "true") {
      const close = menu.getByRole("button", { name: /Закрыть меню|Close menu|关闭菜单/i });
      if (await close.isVisible().catch(() => false)) {
        await close.click();
      } else {
        await burger.first().click().catch(() => {});
      }
      await page.waitForTimeout(300);
    }
    await page.locator("#demo").scrollIntoViewIfNeeded();
  }
}

async function clickDemoButton(page, name) {
  const btn = page.getByRole("button", { name });
  await btn.first().evaluate((el) => el.scrollIntoView({ block: "center", inline: "nearest" }));
  await page.waitForTimeout(150);
  await btn.first().click({ force: true });
}

async function shot(page, name, locator) {
  const target = locator ?? page.locator("#demo");
  await target.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await target.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("saved", name);
}

async function runViewport(browser, width, height, prefix, lang) {
  const context = await browser.newContext({
    viewport: { width, height },
    locale: lang === "en" ? "en-US" : "ru-RU",
  });
  await context.addInitScript((l) => {
    try {
      localStorage.setItem("tivonix_lang", l);
    } catch {}
  }, lang);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await dismissConsent(page);

  // /mileseal SSR is RU; switch language via UI after hydrate
  await switchLangUi(page, lang, width);

  // Direct /mileseal open + reload (SPA routing)
  await page.reload({ waitUntil: "networkidle" });
  await dismissConsent(page);
  await switchLangUi(page, lang, width);
  if (!page.url().includes("/mileseal")) {
    throw new Error(`Expected /mileseal after reload, got ${page.url()}`);
  }

  const analyzeName =
    lang === "en" ? /Analyze scope change/i : /Проанализировать изменение/i;
  const editName = lang === "en" ? /Edit this example/i : /Редактировать пример/i;
  const generateCr =
    lang === "en" ? /Generate change request/i : /Сгенерировать запрос на изменение/i;
  const copyBtn = lang === "en" ? /Copy to clipboard/i : /Скопировать/i;
  const customNotice =
    lang === "en"
      ? /Custom analysis is not available in this validation preview yet/i
      : /Анализ пользовательского кейса пока недоступен в этой демонстрационной версии/i;
  const sendReview =
    lang === "en"
      ? /Send this case for a human scope review/i
      : /Отправить кейс на ручной разбор объёма/i;
  const statusText = lang === "en" ? /Out of scope/i : /Вне объёма/i;
  const helper =
    lang === "en"
      ? /Choose a prepared agency scenario/i
      : /Выберите готовый сценарий агентства/i;

  await page.locator("#demo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const analyze = page.getByRole("button", { name: analyzeName });
  await analyze.waitFor({ state: "visible", timeout: 15000 });
  await page.getByText(helper).waitFor({ state: "visible" });

  // No banned subtitle
  const banned = page.getByText(/Interactive preview based on representative agency scenarios/i);
  if (await banned.count()) {
    throw new Error("Banned helper subtitle is visible");
  }

  // Horizontal overflow check
  const hasHScroll = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
  if (hasHScroll) {
    throw new Error(`Horizontal scroll detected at ${width}x${height} (${lang})`);
  }

  await shot(page, `${prefix}-${lang}-01-preset-before`);

  await clickDemoButton(page, analyzeName);
  await page.getByText(statusText).first().waitFor({ state: "visible", timeout: 5000 });
  await page.locator("#demo article").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, `${prefix}-${lang}-02-result`);

  await clickDemoButton(page, generateCr);
  await page.locator("#mileseal-change-request").waitFor({ state: "visible" });
  await shot(page, `${prefix}-${lang}-03-change-request`);

  // Clipboard copy (grant permissions)
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await clickDemoButton(page, copyBtn);
  const copiedLabel = lang === "en" ? /Copied to clipboard/i : /Скопировано в буфер/i;
  await page.getByText(copiedLabel).first().waitFor({ state: "visible", timeout: 3000 });

  await clickDemoButton(page, editName);
  await page.getByText(customNotice).waitFor({ state: "visible", timeout: 5000 });
  if (await page.locator("#demo article").count()) {
    throw new Error("Preset result still visible in custom mode");
  }
  await shot(page, `${prefix}-${lang}-04-custom`);

  await clickDemoButton(page, sendReview);
  await page.locator("#scope-review form").waitFor({ state: "visible", timeout: 8000 });
  const scopeVal = await page.locator("#scope-review textarea[name='agreed_scope']").inputValue();
  const reqVal = await page.locator("#scope-review textarea[name='client_request']").inputValue();
  if (!scopeVal.trim() || !reqVal.trim()) {
    throw new Error("Scope review form opened without prefilled scope/request");
  }
  await shot(page, `${prefix}-${lang}-05-form`, page.locator("#scope-review"));

  // Return to preset via scenario chip (demo may still be in custom after form open)
  await page.locator("#demo").scrollIntoViewIfNeeded();
  const scenarios =
    lang === "en"
      ? [
          ["Content migration", "14–18"],
          ["Extra integrations", "22–30"],
          ["Additional revisions", "10–14"],
        ]
      : [
          ["Миграция контента", "14–18"],
          ["Доп. интеграции", "22–30"],
          ["Доп. правки", "10–14"],
        ];

  await clickDemoButton(page, scenarios[0][0]);
  await page.getByRole("button", { name: analyzeName }).waitFor({ state: "visible" });

  for (const [label, hours] of scenarios) {
    await clickDemoButton(page, label);
    await page.waitForTimeout(200);
    if (await page.locator("#demo article").count()) {
      throw new Error(`Stale result after switching to ${label}`);
    }
    await clickDemoButton(page, analyzeName);
    await page.getByText(hours, { exact: true }).first().waitFor({ state: "visible", timeout: 5000 });
  }

  // Language switch must not flip preset → custom
  if (lang === "ru") {
    const enToggle = page.locator("button, a").filter({ hasText: /^EN$/i }).first();
    if (await enToggle.isVisible().catch(() => false)) {
      await enToggle.click();
      await page.waitForTimeout(600);
      await page
        .getByRole("button", { name: /Analyze scope change/i })
        .waitFor({ state: "visible", timeout: 8000 });
      await page.getByText(/Out of scope/i).waitFor({ state: "visible", timeout: 5000 });
      const editStill = page.getByRole("button", { name: /Edit this example/i });
      await editStill.waitFor({ state: "visible" });
      // custom notice must NOT appear
      if (
        await page
          .getByText(/Custom analysis is not available/i)
          .isVisible()
          .catch(() => false)
      ) {
        throw new Error("Language switch flipped UI into custom mode");
      }
    }
  }

  if (consoleErrors.length) {
    console.warn("console errors:", consoleErrors.slice(0, 8));
  }

  await context.close();
  return consoleErrors;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    // Verify direct open returns 200-ish content
    const probe = await browser.newPage();
    const res = await probe.goto(BASE, { waitUntil: "domcontentloaded" });
    if (!res || res.status() >= 400) {
      throw new Error(`GET ${BASE} failed: ${res?.status()}`);
    }
    await probe.close();

    await runViewport(browser, 1440, 900, "desktop", "ru");
    await runViewport(browser, 375, 812, "mobile", "ru");
    await runViewport(browser, 768, 1024, "tablet", "ru");
    await runViewport(browser, 1440, 900, "desktop", "en");
    await runViewport(browser, 375, 812, "mobile", "en");

    console.log("all screenshots ok ->", OUT);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
