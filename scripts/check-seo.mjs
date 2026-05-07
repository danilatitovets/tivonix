import { access, readFile } from "node:fs/promises";
import path from "node:path";

const requiredHtmlFiles = [
  "dist/index.html",
  "dist/projects/index.html",
  "dist/contacts/index.html",
  "dist/sozdanie-sajtov/index.html",
  "dist/projects/labelos/index.html",
  "dist/projects/upc/index.html",
  "dist/projects/payclip/index.html",
  "dist/projects/headmind/index.html",
  "dist/projects/logovo/index.html",
  "dist/projects/giftsniper/index.html",
];

const checks = [
  {
    file: "dist/index.html",
    phrases: [
      "Создание сайтов и веб-сервисов под ключ — TIVONIX",
      "Создание сайтов",
      "Сделаем сайт или веб-сервис",
      "FAQ",
      "FAQ — всё про сайт и работу",
      "С чем мы работаем",
      "Создадим сайт или веб-сервис для вашего бизнеса",
      "https://www.tivonix.tech/",
    ],
  },
  {
    file: "dist/sozdanie-sajtov/index.html",
    phrases: [
      "Создание сайтов под ключ — TIVONIX",
      "https://www.tivonix.tech/sozdanie-sajtov",
      "лендинги",
      "базовое SEO",
    ],
  },
  {
    file: "dist/projects/index.html",
    phrases: ["Проекты", "LabelOS", "UPC", "PayClip", "Headmind", "LOGOVO", "GiftSniper"],
  },
  {
    file: "dist/projects/giftsniper/index.html",
    phrases: [
      "GiftSniper",
      "Telegram-бот для оценки NFT и Telegram Gifts",
      "https://www.tivonix.tech/projects/giftsniper",
      "https://t.me/GiftSniperTonBot",
    ],
  },
  {
    file: "dist/contacts/index.html",
    phrases: ["Контакты", "Telegram", "Email"],
  },
];

const forbiddenPhrases = [
  "Tivonix Loading",
  "TIVONIX — Сделаем сайт или веб-сервис",
  "https://tivonix.tech/",
  "chrome-headless",
  "playwright",
];

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

if (hasErrors) {
  process.exit(1);
}

console.log("SEO check passed.");
