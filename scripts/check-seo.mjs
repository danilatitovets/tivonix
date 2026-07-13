import { access, readFile } from "node:fs/promises";
import path from "node:path";

const requiredHtmlFiles = [
  "dist/index.html",
  "dist/projects/index.html",
  "dist/plans/index.html",
  "dist/contacts/index.html",
  "dist/sozdanie-sajtov/index.html",
  "dist/avtomatizaciya-biznesa/index.html",
  "dist/projects/headmind/index.html",
  "dist/projects/giftsniper/index.html",
  "dist/projects/slotty/index.html",
  "dist/projects/spliton/index.html",
];

const checks = [
  {
    file: "dist/index.html",
    phrases: [
      "TIVONIX — сайты, боты и AI-сервисы для бизнеса",
      "Создаём сайты, Telegram-ботов, CRM, личные кабинеты и автоматизацию заявок под ключ.",
      "Кому помогаем",
      "Что мы делаем",
      "Новый кейс",
      "Spliton",
      "Частые вопросы",
      "Расскажите, что хотите запустить или автоматизировать",
      "https://tivonix.tech/",
      'property="og:image" content="https://tivonix.tech/images/og-social.jpg"',
    ],
  },
  {
    file: "dist/sozdanie-sajtov/index.html",
    phrases: [
      "Создание сайтов под ключ — TIVONIX",
      "https://tivonix.tech/sozdanie-sajtov",
      "лендинги",
      "базовое SEO",
    ],
  },
  {
    file: "dist/projects/index.html",
    phrases: ["Проекты", "Headmind", "GiftSniper", "Slotty", "Spliton"],
  },
  {
    file: "dist/projects/spliton/index.html",
    phrases: [
      "Spliton",
      "музыкальных активов",
      "https://tivonix.tech/projects/spliton",
      "spliton.io",
    ],
  },
  {
    file: "dist/projects/slotty/index.html",
    phrases: [
      "Slotty",
      "онлайн-записи к мастерам",
      "https://tivonix.tech/projects/slotty",
      "slotty.of.by",
    ],
  },
  {
    file: "dist/projects/giftsniper/index.html",
    phrases: [
      "GiftSniper",
      "Telegram-бот для оценки NFT и Telegram Gifts",
      "https://tivonix.tech/projects/giftsniper",
      "https://t.me/GiftSniperTonBot",
    ],
  },
  {
    file: "dist/plans/index.html",
    phrases: ["Планы запуска", "Start", "Growth", "Product", "https://tivonix.tech/plans"],
  },
  {
    file: "dist/contacts/index.html",
    phrases: ["Контакты", "Telegram", "Email"],
  },
  {
    file: "dist/avtomatizaciya-biznesa/index.html",
    phrases: [
      "Автоматизация бизнеса — TIVONIX",
      "Автоматизация процессов, CRM, личные кабинеты, админ-панели и интеграции под реальные задачи бизнеса.",
      'href="https://tivonix.tech/avtomatizaciya-biznesa"',
      'property="og:url" content="https://tivonix.tech/avtomatizaciya-biznesa"',
      "Автоматизируем процессы",
      "вашего бизнеса",
    ],
  },
];

const forbiddenPhrases = [
  "Tivonix Loading",
  "TIVONIX — Сайты, боты и веб-сервисы",
  "https://www.tivonix.tech/",
  "chrome-headless",
  "playwright",
];

function countRegex(re, html) {
  const m = html.match(re);
  return m ? m.length : 0;
}

let hasErrors = false;

for (const requiredFile of requiredHtmlFiles) {
  try {
    await access(path.resolve(requiredFile));
    console.log(`OK file: ${requiredFile}`);
  } catch {
    console.error(`Missing file: ${requiredFile}`);
    hasErrors = true;
  }
}

for (const check of checks) {
  const filePath = path.resolve(check.file);
  try {
    await access(filePath);
  } catch {
    console.error(`Missing file: ${check.file}`);
    hasErrors = true;
    continue;
  }

  const content = await readFile(filePath, "utf8");
  for (const phrase of check.phrases) {
    if (!content.includes(phrase)) {
      console.error(`Missing phrase in ${check.file}: "${phrase}"`);
      hasErrors = true;
    } else {
      console.log(`OK ${check.file}: "${phrase}"`);
    }
  }
}

for (const requiredFile of requiredHtmlFiles) {
  const filePath = path.resolve(requiredFile);
  let content = "";
  try {
    content = await readFile(filePath, "utf8");
  } catch {
    continue;
  }

  for (const forbidden of forbiddenPhrases) {
    if (content.includes(forbidden)) {
      console.error(`Forbidden phrase in ${requiredFile}: "${forbidden}"`);
      hasErrors = true;
    } else {
      console.log(`OK ${requiredFile}: forbidden phrase not found "${forbidden}"`);
    }
  }
}

/* Точные счётчики SEO-тегов: страница автоматизации */
const automationFile = "dist/avtomatizaciya-biznesa/index.html";
try {
  const autoPath = path.resolve(automationFile);
  const autoHtml = await readFile(autoPath, "utf8");

  const titleTags = countRegex(/<title\b[^>]*>[\s\S]*?<\/title>/gi, autoHtml);
  const descTags = countRegex(
    /<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/gi,
    autoHtml
  );
  const canonicalTags = countRegex(
    /<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi,
    autoHtml
  );

  if (titleTags !== 1) {
    console.error(`${automationFile}: expected exactly 1 <title>, found ${titleTags}`);
    hasErrors = true;
  } else {
    console.log(`OK ${automationFile}: exactly 1 <title>`);
  }
  if (descTags !== 1) {
    console.error(
      `${automationFile}: expected exactly 1 meta name="description", found ${descTags}`
    );
    hasErrors = true;
  } else {
    console.log(`OK ${automationFile}: exactly 1 meta description`);
  }
  if (canonicalTags !== 1) {
    console.error(
      `${automationFile}: expected exactly 1 link rel="canonical", found ${canonicalTags}`
    );
    hasErrors = true;
  } else {
    console.log(`OK ${automationFile}: exactly 1 link rel="canonical"`);
  }

  const homeTitleWrong = "<title>TIVONIX — сайты, боты и AI-сервисы для бизнеса</title>";
  if (autoHtml.includes(homeTitleWrong)) {
    console.error(`${automationFile}: must not contain home page <title>`);
    hasErrors = true;
  } else {
    console.log(`OK ${automationFile}: home page title tag not present`);
  }
} catch (e) {
  console.error(`Cannot verify ${automationFile}:`, e.message);
  hasErrors = true;
}

if (hasErrors) {
  process.exit(1);
}

console.log("SEO check passed.");
