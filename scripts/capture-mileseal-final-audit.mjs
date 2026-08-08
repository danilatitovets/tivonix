/**
 * Full MileSeal workspace audit screenshots → artifacts/mileseal-final-audit/
 * Usage: node scripts/capture-mileseal-final-audit.mjs
 * Requires dev/preview at MILESEAL_BASE (default http://127.0.0.1:5173)
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = (process.env.MILESEAL_BASE || "http://localhost:5173").replace(/\/$/, "");
const OUT = path.resolve("artifacts/mileseal-final-audit");

async function dismissConsent(page) {
  const accept = page.getByRole("button", { name: /Принять|Accept|接受/i });
  if (await accept.isVisible().catch(() => false)) {
    await accept.click().catch(() => {});
    await page.waitForTimeout(200);
  }
}

async function setLang(page, lang) {
  const name = lang === "en" ? /^EN$/i : lang === "zh" ? /中文/ : /^RU$/i;
  const radio = page.getByRole("radio", { name });
  if (await radio.first().isVisible().catch(() => false)) {
    await radio.first().click();
    await page.waitForTimeout(350);
  }
}

async function openMobileNav(page) {
  const open = page.getByRole("button", { name: /Открыть меню|Open navigation|打开导航/i });
  if (await open.isVisible().catch(() => false)) {
    await open.click();
    await page.waitForTimeout(350);
  }
}

async function selectScenario(page, label) {
  await openMobileNav(page);
  const btn = page.getByRole("button", { name: new RegExp(label, "i") }).first();
  await btn.click();
  await page.waitForTimeout(300);
}

async function analyze(page) {
  const analyse = page.getByRole("button", {
    name: /Проанализировать запрос|Analyse request|分析请求/i,
  });
  if (await analyse.isVisible().catch(() => false)) {
    await analyse.click();
  } else {
    await page.getByRole("button", { name: /Отправить|Send|发送/i }).click();
  }
  await page.getByText(/Вне объёма|Outside scope|超出范围/i).first().waitFor({
    timeout: 8000,
  });
  await page.waitForTimeout(400);
}

async function shot(page, name) {
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage: false,
  });
  console.log("saved", name);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];

  async function withPage(viewport, lang, fn) {
    const context = await browser.newContext({
      viewport,
      locale: lang === "en" ? "en-US" : lang === "zh" ? "zh-CN" : "ru-RU",
    });
    await context.addInitScript((l) => {
      try {
        localStorage.setItem("tivonix_lang", l);
      } catch {}
    }, lang);
    const page = await context.newPage();
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    await page.goto(`${BASE}/mileseal`, { waitUntil: "networkidle" });
    await dismissConsent(page);
    await setLang(page, lang);
    await fn(page);
    await context.close();
  }

  // 01 empty desktop RU
  await withPage({ width: 1440, height: 900 }, "ru", async (page) => {
    await shot(page, "01-desktop-empty");
  });

  // 02-05 ready → analyzing → result → CR
  await withPage({ width: 1440, height: 900 }, "ru", async (page) => {
    await selectScenario(page, "Доп\\. интеграции");
    await shot(page, "02-desktop-ready");
    const analyse = page.getByRole("button", { name: /Проанализировать запрос/i });
    await analyse.click();
    await page.waitForTimeout(400);
    await shot(page, "03-desktop-analyzing");
    await page.getByText(/Вне объёма/i).first().waitFor({ timeout: 8000 });
    await page.waitForTimeout(500);
    await shot(page, "04-desktop-result");
    await shot(page, "05-desktop-change-request");
  });

  // 06 manual review
  await withPage({ width: 1440, height: 900 }, "ru", async (page) => {
    await page.getByRole("button", { name: /Запросить ручной разбор/i }).click();
    await page.getByRole("dialog").waitFor({ timeout: 5000 });
    await page.waitForTimeout(600);
    await shot(page, "06-desktop-manual-review");
    await page.keyboard.press("Escape");
  });

  // 07 tablet
  await withPage({ width: 768, height: 1024 }, "ru", async (page) => {
    await selectScenario(page, "Миграция контента");
    await analyze(page);
    await shot(page, "07-tablet");
  });

  // 08 mobile empty
  await withPage({ width: 390, height: 844 }, "ru", async (page) => {
    await shot(page, "08-mobile-empty");
  });

  // 09-10 mobile result + CR sheet
  await withPage({ width: 390, height: 844 }, "ru", async (page) => {
    await selectScenario(page, "Доп\\. правки");
    await analyze(page);
    await shot(page, "09-mobile-result");
    const openCr = page.getByRole("button", {
      name: /Открыть запрос на изменение|Open change request/i,
    });
    if (await openCr.isVisible().catch(() => false)) {
      await openCr.click();
      await page.waitForTimeout(500);
    }
    await shot(page, "10-mobile-change-request");
  });

  // 11-13 langs
  await withPage({ width: 1440, height: 900 }, "ru", async (page) => {
    await selectScenario(page, "Доп\\. интеграции");
    await analyze(page);
    await shot(page, "11-ru-result");
  });

  await withPage({ width: 1440, height: 900 }, "en", async (page) => {
    await selectScenario(page, "Extra integrations");
    await analyze(page);
    await shot(page, "12-en-result");
  });

  await withPage({ width: 1440, height: 900 }, "zh", async (page) => {
    await selectScenario(page, "额外集成");
    await analyze(page);
    await shot(page, "13-zh-result");
  });

  // Extra viewports smoke
  for (const [w, h, name] of [
    [1920, 1080, "14-desktop-1920"],
    [1280, 800, "15-desktop-1280"],
    [1024, 768, "16-tablet-1024"],
    [375, 812, "17-mobile-375"],
    [360, 800, "18-mobile-360"],
  ]) {
    await withPage({ width: w, height: h }, "ru", async (page) => {
      await selectScenario(page, "Миграция контента");
      await analyze(page);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });
      if (overflow) console.warn("HORIZONTAL OVERFLOW", name);
      await shot(page, name);
    });
  }

  // Case page regression
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/mileseal/cases/content-migration`, {
      waitUntil: "networkidle",
    });
    await dismissConsent(page);
    await shot(page, "19-case-page");
    await context.close();
  }

  await browser.close();

  const relevant = consoleErrors.filter(
    (e) =>
      !/favicon|Download the React DevTools|ResizeObserver/i.test(e) &&
      /mileseal|MileSeal|error/i.test(e)
  );
  console.log("console errors captured:", consoleErrors.length);
  if (relevant.length) {
    console.log("relevant:", relevant.slice(0, 20));
    process.exitCode = 1;
  } else {
    console.log("OK →", OUT);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
