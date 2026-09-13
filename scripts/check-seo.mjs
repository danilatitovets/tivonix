import { access, readFile } from "node:fs/promises";
import path from "node:path";

const requiredHtmlFiles = [
  "dist/index.html",
  "dist/projects/index.html",
  "dist/plans/index.html",
  "dist/contacts/index.html",
  "dist/sozdanie-sajtov/index.html",
  "dist/avtomatizaciya-biznesa/index.html",
  "dist/mileseal/index.html",
  "dist/mileseal/cases/content-migration/index.html",
  "dist/en/mileseal/index.html",
  "dist/en/mileseal/cases/content-migration/index.html",
  "dist/partners/index.html",
  "dist/en/partners/index.html",
  "dist/projects/neo-terminal/index.html",
  "dist/projects/slotty/index.html",
  "dist/projects/spliton/index.html",
  "dist/projects/headmind/index.html",
  "dist/projects/logovo/index.html",
  "dist/en/projects/neo-terminal/index.html",
];

const checks = [
  {
    file: "dist/index.html",
    phrases: [
      "TIVONIX — разработка SaaS, бизнес-систем и AI-продуктов",
      "Проектируем и разрабатываем SaaS, внутренние платформы, CRM, marketplaces и AI-powered systems",
      "Программные системы,",
      "на которых работает бизнес.",
      "https://www.tivonix.tech/",
      'property="og:image" content="https://www.tivonix.tech/images/og-social.jpg"',
    ],
  },
  {
    file: "dist/projects/index.html",
    phrases: ["Проекты", "Neo Terminal", "Slotty", "Spliton", "Headmind", "LOGOVO"],
  },
  {
    file: "dist/projects/neo-terminal/index.html",
    phrases: [
      "Neo Terminal",
      "операционная система коммерции",
      "https://www.tivonix.tech/projects/neo-terminal",
      "neo-terminal.ru",
    ],
  },
  {
    file: "dist/en/projects/neo-terminal/index.html",
    phrases: [
      "Neo Terminal",
      "AI Commerce Operating System",
      "https://www.tivonix.tech/en/projects/neo-terminal",
      "neo-terminal.ru",
    ],
  },
  {
    file: "dist/projects/spliton/index.html",
    phrases: ["Spliton", "долей в музыке", "https://www.tivonix.tech/projects/spliton", "spliton.io"],
  },
  {
    file: "dist/projects/slotty/index.html",
    phrases: ["Slotty", "Маркетплейс онлайн-записи", "https://www.tivonix.tech/projects/slotty", "slotty.of.by"],
  },
  {
    file: "dist/projects/headmind/index.html",
    phrases: ["Headmind", "WordPress", "https://www.tivonix.tech/projects/headmind", "headmind.ru"],
  },
  {
    file: "dist/projects/logovo/index.html",
    phrases: ["LOGOVO", "шиномонтажа", "https://www.tivonix.tech/projects/logovo", "logovo24.by"],
  },
  {
    file: "dist/plans/index.html",
    phrases: ["Планы запуска", "Start", "Growth", "Product", "https://www.tivonix.tech/plans"],
  },
  { file: "dist/contacts/index.html", phrases: ["Контакты", "Telegram", "Email"] },
  {
    file: "dist/sozdanie-sajtov/index.html",
    phrases: ["Создание сайтов для бизнеса — TIVONIX", "https://www.tivonix.tech/sozdanie-sajtov", "лендинги", "базовое SEO"],
  },
  {
    file: "dist/avtomatizaciya-biznesa/index.html",
    phrases: [
      "Автоматизация бизнеса — TIVONIX",
      "Автоматизация процессов, CRM, личные кабинеты, админ-панели и интеграции под реальные задачи бизнеса.",
      'href="https://www.tivonix.tech/avtomatizaciya-biznesa"',
      'property="og:url" content="https://www.tivonix.tech/avtomatizaciya-biznesa"',
      "Автоматизируем процессы",
      "вашего бизнеса",
    ],
  },
  {
    file: "dist/mileseal/index.html",
    phrases: ["MileSeal", "Scope", "change request", "https://www.tivonix.tech/mileseal", "/mileseal/cases/content-migration"],
  },
  {
    file: "dist/mileseal/cases/content-migration/index.html",
    phrases: ["MileSeal", "Интерактивное демо MileSeal", "56", "https://www.tivonix.tech/mileseal/cases/content-migration", "Проанализировать запрос"],
  },
  {
    file: "dist/en/mileseal/index.html",
    phrases: ['lang="en"', "Stop one client request before it becomes unpaid work.", "Review my request — free", "Scope Leakage Audit", "Founding Installation", "https://www.tivonix.tech/en/mileseal"],
  },
  {
    file: "dist/en/mileseal/cases/content-migration/index.html",
    phrases: ['lang="en"', "MileSeal interactive demo", "Is this client request inside the agreed scope?", "56", "https://www.tivonix.tech/en/mileseal/cases/content-migration"],
  },
  {
    file: "dist/partners/index.html",
    phrases: ["Партнёрская программа TIVONIX — Referral и White-label", "https://www.tivonix.tech/partners", "partner-formats", "type=referral", "type=white_label"],
  },
  {
    file: "dist/en/partners/index.html",
    phrases: ["TIVONIX Partner Program — Referral and White-label", "https://www.tivonix.tech/en/partners", "partner-formats", "White-label", "type=referral", "type=white_label"],
  },
];

const forbiddenPhrases = [
  "Tivonix Loading",
  "TIVONIX — Сайты, боты и веб-сервисы",
  "chrome-headless",
  'from "playwright"',
  "from 'playwright'",
  "node_modules/playwright",
  "playwright-core",
];

function countRegex(re, html) {
  const matches = html.match(re);
  return matches ? matches.length : 0;
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
  let content = "";
  try {
    content = await readFile(path.resolve(check.file), "utf8");
  } catch {
    console.error(`Cannot read: ${check.file}`);
    hasErrors = true;
    continue;
  }

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
  let content = "";
  try {
    content = await readFile(path.resolve(requiredFile), "utf8");
  } catch {
    continue;
  }
  for (const forbidden of forbiddenPhrases) {
    if (content.includes(forbidden)) {
      console.error(`Forbidden phrase in ${requiredFile}: "${forbidden}"`);
      hasErrors = true;
    }
  }
}

for (const seoFile of ["dist/index.html", "dist/avtomatizaciya-biznesa/index.html"]) {
  let html = "";
  try {
    html = await readFile(path.resolve(seoFile), "utf8");
  } catch {
    hasErrors = true;
    continue;
  }

  const titleTags = countRegex(/<title\b[^>]*>[\s\S]*?<\/title>/gi, html);
  const descTags = countRegex(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/gi, html);
  const canonicalTags = countRegex(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, html);

  if (titleTags !== 1 || descTags !== 1 || canonicalTags !== 1) {
    console.error(`${seoFile}: expected exactly one title, description and canonical; found title=${titleTags}, description=${descTags}, canonical=${canonicalTags}`);
    hasErrors = true;
  } else {
    console.log(`OK ${seoFile}: one title, description and canonical`);
  }
}

if (hasErrors) process.exit(1);
console.log("SEO check passed.");
