import { chromium } from "playwright";

const BASE = process.env.PREVIEW_URL ?? "http://127.0.0.1:4177";
const routes = ["/", "/en", "/plans", "/en/plans"];
const viewports = [
  { name: "360x800", width: 360, height: 800 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

const hydrationRe =
  /hydration|did not match|Text content does not match|server HTML|Minified React error #418|Minified React error #423|Minified React error #425/i;

let failures = 0;

const browser = await chromium.launch();

for (const route of routes) {
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    const issues = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (hydrationRe.test(text) || msg.type() === "error") {
        issues.push(`[${msg.type()}] ${text}`);
      }
    });

    page.on("pageerror", (err) => {
      issues.push(`[pageerror] ${err.message}`);
    });

    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 60000 });
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      const lang = await page.evaluate(() => document.documentElement.lang);
      const h1Count = await page.locator("h1").count();

      console.log(`OK route=${route} vp=${vp.name} lang=${lang} h1=${h1Count} issues=${issues.length}`);
      if (issues.length) {
        failures += 1;
        for (const i of issues) console.log("  ", i);
      }
    } catch (err) {
      failures += 1;
      console.error(`FAIL route=${route} vp=${vp.name}:`, err.message);
    } finally {
      await context.close();
    }
  }
}

// Form open/close smoke on home mobile
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const issues = [];
  page.on("console", (msg) => {
    if (hydrationRe.test(msg.text()) || msg.type() === "error") issues.push(msg.text());
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const decline = page.getByRole("button", { name: /Отклонить|Reject/i });
  if (await decline.count()) await decline.click().catch(() => {});

  const cta = page.getByRole("button", { name: /Получить оценку|Estimate project|Оценить/i }).first();
  await cta.click({ timeout: 15000 });
  await page.waitForTimeout(600);
  const dialog = page.getByRole("dialog").first();
  const dialogVisible = await dialog.isVisible().catch(() => false);
  const bannerVisible = await page
    .getByRole("dialog", { name: /cookies|аналитики/i })
    .isVisible()
    .catch(() => false);

  console.log(
    `FORM smoke: dialog=${dialogVisible} cookieBannerWhileForm=${bannerVisible} consoleIssues=${issues.length}`
  );
  if (bannerVisible) failures += 1;
  if (issues.length) failures += 1;
  await page.close();
}

await browser.close();
console.log(failures ? `VERIFY FAILED (${failures})` : "VERIFY PASSED");
process.exit(failures ? 1 : 0);
