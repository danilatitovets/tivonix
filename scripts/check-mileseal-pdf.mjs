/**
 * PDF + Work-Start Decision parity checks via Playwright (preview required).
 * Usage: node scripts/check-mileseal-pdf.mjs
 */
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import {
  appendWorkStartDecisionToText,
  formatWorkStartDecisionBlock,
  validateWorkStartDecision,
} from "../src/lib/workStartDecision.ts";
import { workStartDecisionCopy } from "../src/i18n/workStartDecisionCopy.ts";

const BASE = (process.env.MILESEAL_URL || "http://127.0.0.1:4174").replace(/\/$/, "");
const OUT = path.resolve("artifacts/mileseal-wave3/pdf");

const WSD = validateWorkStartDecision(
  {
    owner: "Alex Morgan",
    decision: "price",
    rationale: "Content migration is out of agreed scope; priced as change request.",
    authorization: "work_may_start",
    decisionDate: "2026-08-10",
    saved: false,
    stale: false,
    saveError: false,
    fieldErrors: {},
  },
  workStartDecisionCopy("en")
);

for (const lang of ["en", "ru", "zh"]) {
  const block = formatWorkStartDecisionBlock(WSD, lang);
  assert.ok(block.includes("Alex Morgan"), `${lang}: owner in block`);
  assert.ok(block.length > 40, `${lang}: block not empty`);
}

const baseCr = "CHANGE REQUEST\nProject: Content migration";
const merged = appendWorkStartDecisionToText(baseCr, WSD, "en");
assert.ok(merged.includes("Alex Morgan"));
assert.ok(merged.includes("Price") || merged.includes("price"));

function extractPdfText(pdfPath) {
  try {
    return execSync(`pdftotext -enc UTF-8 "${pdfPath}" -`, {
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
    });
  } catch {
    const tmpPy = path.join(tmpdir(), `mileseal-pdf-extract-${Date.now()}.py`);
    writeFileSync(
      tmpPy,
      [
        "import sys",
        "from pypdf import PdfReader",
        "r = PdfReader(sys.argv[1])",
        'print("".join((p.extract_text() or "") for p in r.pages))',
      ].join("\n"),
      "utf8"
    );
    try {
      return execSync(`python "${tmpPy}" "${pdfPath}"`, {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        env: { ...process.env, PYTHONIOENCODING: "utf-8" },
      });
    } finally {
      try {
        unlinkSync(tmpPy);
      } catch {
        /* ignore */
      }
    }
  }
}

function assertPdfTextExtract(pdfPath, lang, kind) {
  const text = extractPdfText(pdfPath);
  assert.ok(text.includes("Alex Morgan"), `${lang} ${kind} PDF: Decision Owner`);
  assert.match(text, /Work-Start Decision|Решение о начале работ|开工决策/i, `${lang} ${kind} PDF: WSD heading`);
  assert.match(text, /Decision Owner|Владелец решения|决策负责人/i, `${lang} ${kind} PDF: owner label`);
  assert.match(text, /Rationale|Обоснование|理由/i, `${lang} ${kind} PDF: rationale label`);
  assert.match(text, /Authorization|Авторизация|授权/i, `${lang} ${kind} PDF: authorization label`);
  assert.match(text, /Decision Date|Дата решения|决策日期/i, `${lang} ${kind} PDF: date label`);
  if (kind === "case") {
    assert.match(text, /56/, `${lang} case PDF: hours`);
    assert.match(
      text,
      /4[\s,\u00A0\u202F]?480|4480|4,?480|GBP\s*4[\s,]?480/i,
      `${lang} case PDF: cost`
    );
  }
  if (lang === "ru") {
    assert.match(text, /[А-Яа-яЁё]/, `${lang} ${kind} PDF: Cyrillic present`);
    assert.doesNotMatch(text, /(?:\uFFFD|\u25A1){3,}/, `${lang} ${kind} PDF: no tofu blocks`);
  }
  if (lang === "zh") {
    assert.match(text, /[\u4e00-\u9fff]/, `${lang} ${kind} PDF: CJK present`);
    assert.doesNotMatch(text, /(?:\uFFFD|\u25A1){3,}/, `${lang} ${kind} PDF: no tofu blocks`);
  }
  return text;
}

const SCENARIO = {
  en: /Homepage \+ author pages/i,
  ru: /Главная \+ страницы авторов/i,
  zh: /首页 \+ 作者页/i,
};

async function dismissConsent(page) {
  const accept = page.getByRole("button", { name: /Accept|Принять|接受/i });
  if (await accept.isVisible().catch(() => false)) await accept.click().catch(() => {});
}

async function saveWsdInWorkspace(page) {
  await page.getByRole("heading", { name: /Work-Start Decision|Решение о начале|开工决策/i }).scrollIntoViewIfNeeded();
  await page.getByLabel(/Decision owner|Владелец решения|决策负责人/i).fill("Alex Morgan");
  await page.getByRole("button", { name: /^Price$|^Цена$|^定价$/i }).click();
  await page.getByLabel(/Rationale|Обоснование|理由/i).fill(
    "Content migration is out of agreed scope; priced as change request."
  );
  await page.getByRole("radio", { name: /Work may start|Можно начинать|可以开始/i }).check();
  await page.locator('input[type="date"]').fill("2026-08-10");
  await page.getByRole("button", { name: /Save decision|Сохранить решение|保存决定/i }).click();
  await page.getByText(/Decision saved|Решение сохранено|决定已保存/i).waitFor({ timeout: 8000 });
}

async function runWorkspaceLang(browser, lang) {
  const slug = lang === "en" ? "/en/mileseal" : lang === "ru" ? "/mileseal" : "/zh/mileseal";
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}${slug}`, { waitUntil: "networkidle" });
  await dismissConsent(page);

  await page.getByRole("button", { name: SCENARIO[lang] }).first().click();  await page.waitForTimeout(400);
  await page.getByRole("button", { name: /Analyse request|Проанализировать запрос|分析请求/i }).click();
  await page.getByText(/Outside scope|Вне объёма|超出范围/i).first().waitFor({ timeout: 10000 });

  await saveWsdInWorkspace(page);

  const preText = await page.locator("pre").first().innerText();
  assert.ok(preText.includes("Alex Morgan"), `${lang} workspace pre includes owner`);

  const downloadPromise = page.waitForEvent("download", { timeout: 20000 });
  await page.getByRole("button", { name: /Download PDF|Скачать PDF|下载 PDF/i }).first().click();
  const download = await downloadPromise;
  const pdfPath = path.join(OUT, `workspace-${lang}.pdf`);
  await download.saveAs(pdfPath);
  const size = (await readFile(pdfPath)).length;
  assert.ok(size > 8000, `${lang} workspace PDF generated (${size} bytes)`);
  const extracted = assertPdfTextExtract(pdfPath, lang, "workspace");
  await mkdir(path.join(OUT, "text"), { recursive: true });
  await writeFile(path.join(OUT, "text", `workspace-${lang}.txt`), extracted, "utf8");

  await page.screenshot({
    path: path.join(OUT, `workspace-${lang}-ui.png`),
    fullPage: false,
  });

  await context.close();
}

async function runCasePdf(browser, lang) {
  const slug =
    lang === "en"
      ? "/en/mileseal/cases/content-migration"
      : lang === "ru"
        ? "/mileseal/cases/content-migration"
        : "/zh/mileseal/cases/content-migration";
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}${slug}`, { waitUntil: "networkidle" });
  await dismissConsent(page);
  await page.getByRole("button", { name: /Analyse request|Проанализировать запрос|分析请求/i }).click();
  await page.getByText(/Outside scope|Вне объёма|超出范围/i).first().waitFor({ timeout: 15000 });

  await saveWsdInWorkspace(page);

  const downloadPromise = page.waitForEvent("download", { timeout: 25000 });
  await page
    .getByRole("button", { name: /Download PDF|Скачать PDF|下载 PDF/i })
    .first()
    .click();
  const download = await downloadPromise;
  const pdfPath = path.join(OUT, `case-${lang}.pdf`);
  await download.saveAs(pdfPath);
  const size = (await readFile(pdfPath)).length;
  assert.ok(size > 12000, `${lang} case PDF generated (${size} bytes)`);
  const caseExtracted = assertPdfTextExtract(pdfPath, lang, "case");
  await writeFile(path.join(OUT, "text", `case-${lang}.txt`), caseExtracted, "utf8");

  await page.screenshot({
    path: path.join(OUT, `case-${lang}-ui.png`),
    fullPage: false,
  });

  await context.close();
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const lang of ["en", "ru", "zh"]) {
  await runWorkspaceLang(browser, lang);
  await runCasePdf(browser, lang);
}

await browser.close();

// Case numbers must remain in copy modules
const caseCopy = await import("../src/i18n/milesealCaseCopy.ts");
const en = caseCopy.milesealCaseCopy("en");
const enJson = JSON.stringify(en);
assert.ok(enJson.includes("56"));
assert.ok(enJson.includes("18,000") || enJson.includes("18000"));
assert.equal(caseCopy.caseAdditionalCost(80), 4480);
assert.ok(enJson.includes('"hours":24') || enJson.includes("24"));

console.log("mileseal PDF checks passed — artifacts in artifacts/mileseal-wave3/pdf");
