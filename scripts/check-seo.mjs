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
];

const checks = [
  {
    file: "dist/index.html",
    phrases: [
      "Создание сайтов",
      "FAQ",
      "С чем мы работаем",
      "Сделаем сайт или веб-сервис",
      "Создадим сайт или веб-сервис для вашего бизнеса",
    ],
  },
  {
    file: "dist/sozdanie-sajtov/index.html",
    phrases: ["Создание сайтов под ключ", "лендинги", "базовое SEO"],
  },
  {
    file: "dist/projects/index.html",
    phrases: ["Проекты", "LabelOS", "UPC", "PayClip", "Headmind", "LOGOVO"],
  },
  {
    file: "dist/contacts/index.html",
    phrases: ["Контакты", "Telegram", "Email"],
  },
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

if (hasErrors) {
  process.exit(1);
}

console.log("SEO check passed.");
