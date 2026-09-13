import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4174";
const OUT_DIR = path.resolve("artifacts/responsive-smoke");

const HOME_VIEWPORTS = [320, 360, 375, 390, 430, 768, 1024, 1440];
const CORE_ROUTES = [
  "/",
  "/projects",
  "/projects/spliton",
  "/projects/neo-terminal",
  "/plans",
  "/about",
  "/contacts",
  "/partners",
  "/mileseal",
  "/en",
  "/en/projects/spliton",
  "/zh",
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];

async function inspectPage(page, route, width, screenshot = false) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(`${BASE_URL}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });

  assert.ok(response, `${route} @ ${width}: no navigation response`);
  assert.ok(response.status() < 400, `${route} @ ${width}: HTTP ${response.status()}`);

  await page.waitForTimeout(350);

  const result = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const h1 = document.querySelector("h1");
    const overflow = Math.max(html.scrollWidth, body?.scrollWidth ?? 0) - html.clientWidth;
    const h1Rect = h1?.getBoundingClientRect();

    return {
      title: document.title,
      overflow,
      hasH1: Boolean(h1),
      h1Visible: Boolean(
        h1Rect &&
          h1Rect.width > 0 &&
          h1Rect.height > 0 &&
          getComputedStyle(h1).visibility !== "hidden"
      ),
    };
  });

  assert.ok(result.title.trim().length > 0, `${route} @ ${width}: missing document title`);
  assert.ok(result.hasH1, `${route} @ ${width}: missing h1`);
  assert.ok(result.h1Visible, `${route} @ ${width}: h1 is not visible`);
  assert.ok(result.overflow <= 2, `${route} @ ${width}: horizontal overflow ${result.overflow}px`);
  assert.deepEqual(errors, [], `${route} @ ${width}: page errors: ${errors.join(" | ")}`);

  if (route === "/") {
    const heroPrimary = page.locator("#hero button").first();
    await expectVisible(heroPrimary, `home primary CTA @ ${width}`);
    const box = await heroPrimary.boundingBox();
    assert.ok(box, `home primary CTA @ ${width}: no bounding box`);
    assert.ok(
      box.y < 900,
      `home primary CTA @ ${width}: primary CTA unexpectedly far below initial hero (${box.y}px)`
    );
  }

  if (screenshot) {
    const safeRoute = route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
    await page.screenshot({
      path: path.join(OUT_DIR, `${safeRoute}-${width}.png`),
      fullPage: true,
    });
  }
}

async function expectVisible(locator, label) {
  const count = await locator.count();
  assert.ok(count > 0, `${label}: element missing`);
  assert.ok(await locator.isVisible(), `${label}: element not visible`);
}

try {
  for (const width of HOME_VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width, height: width <= 430 ? 844 : 900 },
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    const page = await context.newPage();
    try {
      await inspectPage(page, "/", width, true);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    } finally {
      await context.close();
    }
  }

  for (const width of [390, 1024, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    const page = await context.newPage();
    for (const route of CORE_ROUTES.filter((route) => route !== "/")) {
      try {
        await inspectPage(page, route, width, width === 390);
      } catch (error) {
        failures.push(error instanceof Error ? error.message : String(error));
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error("responsive smoke failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("responsive smoke passed");
}
