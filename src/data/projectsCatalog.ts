export type ProjectStatus = "live" | "wip";

export type Testimonial = {
  name: string;
  role: string;
  text: string;
};

export type Project = {
  id: string;
  title: string;
  subtitleRu: string;
  subtitleEn: string;
  detailsRu: string;
  detailsEn: string;
  domain?: string;
  tags: string[];
  cover?: string;
  /** Горизонтальная лента скриншотов на странице кейса */
  gallery?: string[];
  status?: ProjectStatus;
  outcomes?: string[];
  stack?: string[];
  testimonial?: Testimonial;
};

const UPC_DOMAIN = "https://upc.watch/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const LOGOVO_DOMAIN = "https://logovo24.by/";
const GIFTSNIPER_DOMAIN = "https://t.me/GiftSniperTonBot";
const SLOTTY_DOMAIN = "https://slotty.of.by/book";
const SPLITON_DOMAIN = "https://spliton.io/app";

/** Публичные кейсы на /projects (остальные скрыты, но остаются в каталоге) */
export const PUBLIC_PROJECT_IDS = [
  "headmind",
  "logovo",
  "giftsniper",
  "slotty",
  "spliton",
] as const;

const SLOTTY_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/slotty/r${i + 1}.png`);
const SPLITON_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/spliton/g${i + 1}.png`);

function buildAllProjects(isRu: boolean): Project[] {
  return [
      // 1) LABEL0S — 3 days
      {
        id: "labelos",
        title: "LabelOS",
        subtitleRu:
          "SaaS для музыкальных лейблов: отчёты, рассылка, шаблоны и контроль выплат.",
        subtitleEn:
          "SaaS for music labels: reporting, email delivery, templates and payout control.",
        detailsRu:
          "Срок: 3 дня\n\n" +
          "Цель\n" +
          "• Быстро собрать внятный промо-лендинг продукта и зафиксировать ценностное предложение.\n\n" +
          "Что сделали\n" +
          "• Сформировали структуру и блоки: Hero → проблемы → решение → возможности → сценарии → CTA\n" +
          "• Привели типографику к премиум-стилю: иерархия, ритм, воздух, читабельность\n" +
          "• Собрали адаптивную вёрстку (mobile-first) и аккуратные интерактивные состояния\n" +
          "• Оптимизировали загрузку: lazy-графика, корректные размеры, аккуратные фоны\n\n" +
          "Особенности\n" +
          "• Чёткий фокус на конверсию: короткие формулировки, сильный CTA, логичная структура\n" +
          "• Минимум “воды” — только то, что отвечает на вопросы клиента\n",
        detailsEn:
          "Timeline: 3 days\n\n" +
          "Goal\n" +
          "• Build a clear promo landing and solidify the value proposition fast.\n\n" +
          "What we did\n" +
          "• Designed the page structure: Hero → pain points → solution → features → flows → CTA\n" +
          "• Refined premium typography: hierarchy, rhythm, spacing, readability\n" +
          "• Built responsive layout (mobile-first) with clean interactive states\n" +
          "• Improved loading: lazy assets, correct sizing, polished background layers\n\n" +
          "Highlights\n" +
          "• Conversion-first copy and structure\n" +
          "• No fluff — only what answers buyer questions\n",
        domain: LABELOS_DOMAIN,
        status: "live",
        tags: ["SaaS", "Landing", "UI/UX", "React", "Tailwind"],
        cover: "/images/project-priew/labelo.jpg",
        outcomes: [
          isRu
            ? "Готовый промо-лендинг за 3 дня"
            : "Promo landing delivered in 3 days",
          isRu ? "Чёткая структура под конверсию" : "Conversion-focused structure",
          isRu ? "Адаптив + оптимизация загрузки" : "Responsive + optimized loading",
        ],
        stack: ["React", "Tailwind", "Vite"],
      },

      // 2) UPC — SaaS MVP (client: ИП Безбородых И.В.) · https://upc.watch/
      {
        id: "upc",
        title: "UPC",
        subtitleRu:
          "SaaS MVP: подключаешь трек к TikTok, делишься ссылкой — монетизируешь просмотры, когда ролик набирает охват.",
        subtitleEn:
          "SaaS MVP: attach your sound on TikTok, share a link — monetize views as the clip gains traction.",
        detailsRu:
          "Продукт: SaaS / MVP (не одностраничный лендинг)\n\n" +
          "Идея\n" +
          "• Артист или правообладатель подключает трек к ролику в TikTok и получает ссылку на отслеживание\n" +
          "• Доход завязан на просмотрах и охвате: чем устойчивее набирает видео, тем сильнее монетизация сценария\n\n" +
          "Заказчик\n" +
          "• ИП Безбородых И.В.\n" +
          "Контакт/представитель\n" +
          "• Виктор Безбородых — Founder & CEO MIN.ECO (music distribution ecosystem)\n\n" +
          "Что сделали\n" +
          "• Собрали продуктовый интерфейс и логику сценария «трек → ссылка → метрики»\n" +
          "• Премиум-подача UI: сетка, типографика, анимации без перегруза\n" +
          "• Адаптив, микровзаимодействия, скорость загрузки\n" +
          "• Backend на Supabase/Postgres под учёт, интеграции и рост функциональности\n\n" +
          "Результат\n" +
          "• Живой MVP на upc.watch с понятным циклом монетизации для коротких видео\n",
        detailsEn:
          "Product: SaaS / MVP (not a single-page marketing-only site)\n\n" +
          "Concept\n" +
          "• The rights holder connects a track to a TikTok video and gets a tracking link\n" +
          "• Revenue ties to views and reach — stronger traction means a stronger monetization path\n\n" +
          "Client\n" +
          "• IE Bezborodykh I.V.\n" +
          "• INN 261709192509\n" +
          "• OGRNIP 325200000025627\n" +
          "Contact/rep\n" +
          "• Viktor Bezborodykh — Founder & CEO of MIN.ECO (music distribution ecosystem)\n\n" +
          "What we did\n" +
          "• Product UI and flows: track → link → metrics\n" +
          "• Premium UI craft: grid, typography, motion without clutter\n" +
          "• Responsive layout, micro-interactions, fast loading\n" +
          "• Supabase/Postgres backend for data, integrations and feature growth\n\n" +
          "Outcome\n" +
          "• Live MVP at upc.watch with a clear short-video monetization loop\n",
        domain: UPC_DOMAIN,
        status: "live",
        tags: ["SaaS", "MVP", "React", "TypeScript", "Supabase"],
        cover: "/images/project-priew/upcwatc.png",
        outcomes: [
          isRu ? "MVP с циклом трек → ссылка → монетизация просмотров" : "MVP loop: track → link → view-based monetization",
          isRu ? "Премиум UI + стабильная скорость" : "Premium UI + solid performance",
          isRu ? "База Supabase/Postgres под масштаб продукта" : "Supabase/Postgres foundation to scale the product",
        ],
        stack: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind",
          "Supabase",
          "PostgreSQL",
        ],
        testimonial: {
          name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
          role: isRu ? "Founder & CEO MIN.ECO" : "Founder & CEO, MIN.ECO",
          text: isRu
            ? "Сделали быстро, аккуратно и с правильным ощущением премиума. Отдельно — за скорость и структуру."
            : "Fast, clean delivery with a premium feel. Great performance and structure.",
        },
      },

      // 3) PAYCLIP — 2 weeks (client: ИП Безбородых И.В.)
      {
        id: "payclip",
        title: "PayClip",
        subtitleRu:
          "Платёжный продукт: лендинг под конверсию + онбординг. Быстро доводит до действия.",
        subtitleEn: "Payment product: conversion landing + onboarding.",
        detailsRu:
          "Срок: 2 недели\n\n" +
          "Заказчик\n" +
          "• ИП Безбородых И.В.\n" +
          "Контакт/представитель\n" +
          "• Виктор Безбородых — Founder & CEO MIN.ECO\n\n" +
          "Цель\n" +
          "• Сделать продуктовую посадочную + онбординг, чтобы быстрее доводить пользователя до действия.\n\n" +
          "Что сделали за 2 недели\n" +
          "• Спроектировали структуру под лиды: оффер → доверие → сценарии → CTA\n" +
          "• Собрали чистый UI: сетка, отступы, контраст, типографика\n" +
          "• Протянули ключевые пользовательские сценарии (онбординг/первые шаги)\n" +
          "• Добавили состояния/валидации/микровзаимодействия\n" +
          "• Сделали адаптив и проверили кроссбраузерность\n\n" +
          "Результат\n" +
          "• Понятная посадочная + онбординг, меньше вопросов у пользователей, выше конверсия в контакт\n",
        detailsEn:
          "Timeline: 2 weeks\n\n" +
          "Client\n" +
          "• IE Bezborodykh I.V.\n" +
          "• INN 261709192509\n" +
          "• OGRNIP 325200000025627\n" +
          "Contact/rep\n" +
          "• Viktor Bezborodykh — Founder & CEO, MIN.ECO\n\n" +
          "Goal\n" +
          "• Build a product landing + onboarding to move users to action faster.\n\n" +
          "What we delivered in 2 weeks\n" +
          "• Lead-oriented structure: offer → trust → flows → CTA\n" +
          "• Clean UI: grid, spacing, contrast, typography\n" +
          "• Core user flows (onboarding / first steps)\n" +
          "• States, validation, micro-interactions\n" +
          "• Responsive layout + cross-browser checks\n\n" +
          "Result\n" +
          "• Clear landing + onboarding, fewer user questions, better conversion to contact\n",
        domain: PAYCLIP_DOMAIN,
        status: "live",
        tags: ["Fintech", "Landing", "Onboarding", "UI/UX", "Conversion"],
        cover: "/images/project-priew/payslip.jpg",
        outcomes: [
          isRu ? "Сделано за 2 недели" : "Delivered in 2 weeks",
          isRu ? "Структура под конверсию" : "Conversion-driven structure",
          isRu ? "Онбординг и сценарии" : "Onboarding and user flows",
        ],
        stack: ["React", "TypeScript", "Tailwind", "API"],
        testimonial: {
          name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
          role: isRu ? "Founder & CEO MIN.ECO" : "Founder & CEO, MIN.ECO",
          text: isRu
            ? "Коммуникация — по делу, быстро вносят правки, результатом довольны."
            : "Clear communication, fast iterations, happy with the result.",
        },
      },

      // 4) HEADMIND — closed case (stack: HTML/CSS/JS ES6)
      {
        id: "headmind",
        title: "Headmind",
        subtitleRu:
          "Корпоративный сайт: услуги, команда, доверие и лид-ген под B2B.",
        subtitleEn:
          "Corporate website: services structure, team credibility and B2B lead-gen.",
        detailsRu:
          "Формат: корпоративный сайт / презентация услуг\n\n" +
          "Цель\n" +
          "• Упаковать экспертизу и сделать сайт, который объясняет «кто мы», «что делаем» и приводит заявки.\n\n" +
          "Что сделали\n" +
          "• Собрали информационную архитектуру: услуги → подход → кейсы → команда → контакт\n" +
          "• Упростили формулировки и усилили доверие: акценты на опыте, ролях, результатах\n" +
          "• Собрали верстку: чистая типографика, адаптив, скорость загрузки\n" +
          "• Настроили CTA и точки захвата (контакты/формы)\n\n" +
          "Заказчики\n" +
          "• Евгений Беликов — основатель и генеральный директор ООО «Хэдмайнд»\n" +
          "• Виталий Петровский — партнёр, соучредитель ООО «Хэдмайнд»\n",
        detailsEn:
          "Format: corporate website / services showcase\n\n" +
          "Goal\n" +
          "• Package expertise into a clear website that explains who they are, what they do, and generates leads.\n\n" +
          "What we did\n" +
          "• Built information architecture: services → approach → cases → team → contact\n" +
          "• Improved clarity + trust: experience, roles, outcomes\n" +
          "• Clean responsive layout, fast loading\n" +
          "• CTA and lead capture points (contacts/forms)\n\n" +
          "Clients\n" +
          "• Evgeniy Belikov — Founder & CEO\n" +
          "• Vitaliy Petrovskiy — Partner & Co-founder\n",
        domain: HEADMIND_DOMAIN,
        status: "live",
        tags: ["B2B", "Website", "UI/UX", "Structure", "Conversion"],
        cover: "/images/project-priew/headmind.png",
        outcomes: [
          isRu ? "Понятная упаковка услуг и подхода" : "Clear services & approach packaging",
          isRu ? "Усиление доверия через команду и структуру" : "Stronger trust via team + structure",
          isRu ? "CTA и точки лид-генерации" : "CTA and lead capture points",
        ],
        stack: ["HTML", "CSS", "JavaScript (ES6)"],
        testimonial: {
          name: isRu
            ? "Евгений Беликов / Виталий Петровский"
            : "Evgeniy Belikov / Vitaliy Petrovskiy",
          role: isRu ? "ООО «Хэдмайнд»" : "Headmind",
          text: isRu
            ? "Собрали структуру и подачу так, что сайт стал понятнее для клиентов и лучше ведёт к заявке."
            : "The structure and messaging became clearer, and the site now drives leads more effectively.",
        },
      },

      // 5) LOGOVO — сеть шиномонтажа (Минск), визуал в духе «космос» под бренд
      {
        id: "logovo",
        title: "LOGOVO",
        subtitleRu:
          "Сеть шиномонтажа в Минске: услуги, адреса, прайс, кейсы и запись — в премиальной «космической» подаче бренда.",
        subtitleEn:
          "Minsk tire-service network: services, locations, pricing, cases and booking — premium “cosmic” brand look.",
        detailsRu:
          "Формат: многостраничный промо-сайт сети\n" +
          "Срок: 12 дней\n\n" +
          "Заказчик\n" +
          "• LOGOVO — шиномонтаж и сопутствующие услуги, несколько точек в Минске\n" +
          "• Соцсети: Instagram @Logovo_mnsk\n\n" +
          "Цель\n" +
          "• Показать сервис «уровня студии»: скорость, точность, честность — и довести до записи без лишнего шума.\n" +
          "• Визуально попасть в фирменный стиль: тёмная премиум-подача с «космической» эстетикой (как просили), без дешёвого китча.\n\n" +
          "Что сделали\n" +
          "• Собрали структуру: услуги и акценты → прейскурант → адреса → кейсы → команда → отзывы → FAQ → контакты\n" +
          "• Проработали типографику, сетку и анимации: глубина, ритм, плавные переходы — ощущение дорогого сервиса\n" +
          "• Сделали сильный mobile-first: запись и цены читаются с телефона за секунды\n" +
          "• Усилили доверие: реальные сценарии (кейсы), люди, отзывы, понятные ответы в FAQ\n\n" +
          "Результат\n" +
          "• Сайт работает как витрина сети и подводит к действию: выбрать услугу, понять цену, записаться или связаться\n",
        detailsEn:
          "Format: multi-page promo site for a service network\n" +
          "Timeline: 12 days\n\n" +
          "Client\n" +
          "• LOGOVO — tire service and related work, multiple locations in Minsk\n" +
          "• Social: Instagram @Logovo_mnsk\n\n" +
          "Goals\n" +
          "• Communicate a premium, studio-like experience: speed, precision, honesty — and drive bookings without noise.\n" +
          "• Match the brand direction: dark premium look with a “cosmic” aesthetic (as requested), avoiding cheap clichés.\n\n" +
          "What we delivered\n" +
          "• IA: services → pricing → locations → cases → team → reviews → FAQ → contacts\n" +
          "• Typography, grid and motion: depth, rhythm, smooth transitions — premium service feel\n" +
          "• Strong mobile-first: pricing and booking paths readable in seconds on a phone\n" +
          "• Trust: real-world scenarios (cases), people, reviews, clear FAQ answers\n\n" +
          "Outcome\n" +
          "• The site acts as a storefront for the network and pushes action: pick a service, understand pricing, book or contact\n",
        domain: LOGOVO_DOMAIN,
        status: "live",
        tags: [
          "Landing",
          "React",
          "TypeScript",
          "Framer Motion",
          "Automotive",
        ],
        cover: "/images/project-priew/logovo.png",
        outcomes: [
          isRu ? "Сделано за 12 дней" : "Delivered in 12 days",
          isRu
            ? "Структура под услуги, прайс и запись"
            : "Structure for services, pricing and booking",
          isRu
            ? "«Космический» премиум-визуал под бренд"
            : "“Cosmic” premium visuals aligned with the brand",
          isRu
            ? "Кейсы, команда и отзывы для доверия"
            : "Cases, team and reviews for trust",
        ],
        stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
        testimonial: {
          name: isRu ? "Команда LOGOVO" : "LOGOVO team",
          role: isRu
            ? "Сеть шиномонтажа · Минск"
            : "Tire service network · Minsk",
          text: isRu
            ? "Нужен был сайт, который ощущается как мы: не «ещё один шиномонтаж», а сервис с характером. Космическая тема ожила без дешёвого блеска — глубина, тёмная палитра, сочная типографика. С телефона всё предельно ясно: цена, что входит, куда приехать. В сезон это прямо деньги — люди не теряются, а доходят до записи."
            : "We needed a site that feels like us — not “just another tire shop”, but a brand with character. The cosmic theme landed without cheap glitter: depth, a dark palette, strong typography. On mobile everything is obvious — pricing, what’s included, where to go. In peak season that’s revenue: people don’t get lost, they get to booking.",
        },
      },

      // 6) GIFTSNIPER — Telegram-бот для оценки NFT и Telegram Gifts в TON
      {
        id: "giftsniper",
        title: "GiftSniper",
        subtitleRu:
          "Telegram-бот для оценки NFT и Telegram Gifts в TON по рыночным данным: трейты, листинги, аналоги и ориентир цены.",
        subtitleEn:
          "Telegram bot for TON NFT and Telegram Gifts valuation using market data: traits, listings, comparables, and pricing guidance.",
        detailsRu:
          "Формат: Telegram-бот / аналитический продукт\n\n" +
          "Цель\n" +
          "• Помочь пользователю быстро понять, сколько может стоить NFT или Telegram Gift без ручного сравнения десятков объявлений.\n\n" +
          "Как это работает\n" +
          "• Пользователь отправляет ссылку на Getgems, Fragment, Tonviewer или NFT address\n" +
          "• GiftSniper анализирует объект и возвращает данные в понятном формате\n\n" +
          "Что показывает бот\n" +
          "• Трейты и характеристики NFT или Telegram Gift\n" +
          "• Текущий листинг\n" +
          "• Похожие объявления на рынке\n" +
          "• Ориентировочную цену продажи\n" +
          "• Данные для более быстрого решения по продаже\n\n" +
          "Безопасность и позиционирование\n" +
          "• GiftSniper не покупает и не продаёт активы за пользователя\n" +
          "• Не подключается к кошельку и не запрашивает seed-фразу, private key или доступ к аккаунту\n" +
          "• Это аналитический инструмент для оценки и сравнения объекта с рынком\n\n" +
          "Что сделали в проекте\n" +
          "• Продумали логику работы бота и структуру сценариев\n" +
          "• Реализовали обработку ссылок и показ ключевых рыночных данных\n" +
          "• Собрали удобный пользовательский путь внутри Telegram\n\n" +
          "Результат\n" +
          "• GiftSniper показывает, как Telegram-бот может быть полноценным продуктом с практической пользой для TON, NFT и Telegram Gifts\n" +
          "• Твой помощник по первому заработку\n" +
          "• Проект создан командой TIVONIX\n",
        detailsEn:
          "Format: Telegram bot / analytics product\n\n" +
          "Goal\n" +
          "• Help users quickly estimate NFT or Telegram Gift value without manually comparing dozens of listings.\n\n" +
          "How it works\n" +
          "• A user sends a Getgems, Fragment, Tonviewer link, or an NFT address\n" +
          "• GiftSniper analyzes the asset and returns key data in a clear format\n\n" +
          "What the bot provides\n" +
          "• Traits and asset characteristics\n" +
          "• Current listing data\n" +
          "• Comparable market offers\n" +
          "• Estimated selling price range\n" +
          "• Decision-support data for faster pricing\n\n" +
          "Safety and positioning\n" +
          "• GiftSniper does not buy or sell assets on behalf of users\n" +
          "• No wallet connection and no request for seed phrase, private key, or account access\n" +
          "• It is an analytics assistant for valuation and market comparison\n\n" +
          "What we delivered\n" +
          "• Bot logic and scenario architecture\n" +
          "• Link parsing and market-data presentation flow\n" +
          "• A smooth user journey inside Telegram\n\n" +
          "Outcome\n" +
          "• GiftSniper demonstrates how a Telegram bot can be a full product with real utility for TON, NFT, and Telegram Gifts users\n" +
          "• Your first-earnings assistant\n" +
          "• Project by TIVONIX team\n",
        domain: GIFTSNIPER_DOMAIN,
        status: "live",
        tags: ["Telegram Bot", "TON", "NFT", "Analytics", "Market Data"],
        cover: "/images/project-priew/giftsniper.png",
        outcomes: [
          isRu
            ? "Оценка NFT и Gifts по данным рынка в одном окне"
            : "NFT and Gifts valuation from market data in one flow",
          isRu
            ? "Быстрый анализ: трейты, листинги, аналоги, ориентир цены"
            : "Fast analysis: traits, listings, comparables, pricing guidance",
          isRu
            ? "Без подключения кошелька и доступа к аккаунту"
            : "No wallet connection or account-access risk",
        ],
        stack: ["Telegram Bot API", "TON", "NFT Data", "Parser", "Analytics"],
      },

      // 7) SLOTTY — платформа онлайн-записи к мастерам (MVP)
      {
        id: "slotty",
        title: "Slotty",
        subtitleRu:
          "Платформа для онлайн-записи к мастерам, студиям и услугам: выбор специалиста, свободное время, запись, напоминания и история посещений в одном сервисе.",
        subtitleEn:
          "Online booking platform for masters, studios and services: pick a specialist, see open slots, book, get reminders and visit history in one app.",
        detailsRu:
          "Формат: SaaS / marketplace / сервис онлайн-записи\n\n" +
          "Домен\n" +
          "• slotty.of.by/book\n\n" +
          "Статус\n" +
          "• В продакшене\n\n" +
          "Цель\n" +
          "• Помочь пользователю быстро найти подходящего мастера или студию, выбрать услугу, увидеть свободное время и записаться онлайн без звонков, переписок и лишних шагов.\n\n" +
          "Как это работает\n" +
          "• Пользователь выбирает категорию услуги: маникюр, парикмахер, косметология, брови, массаж и другие направления.\n" +
          "• Дальше он видит мастеров, карточки услуг, цены, свободные слоты и может оформить запись прямо в приложении.\n" +
          "• Мастер получает заявку, управляет расписанием, услугами, профилем и клиентами в личном кабинете.\n\n" +
          "Что показывает сервис\n" +
          "• Каталог услуг и категорий\n" +
          "• Карточки мастеров и студий\n" +
          "• Свободные даты и время\n" +
          "• Онлайн-запись на услугу\n" +
          "• Статус записи\n" +
          "• Напоминания пользователю\n" +
          "• Историю записей\n" +
          "• Личный кабинет мастера\n\n" +
          "Безопасность и позиционирование\n" +
          "Slotty не заменяет мастера и не вмешивается в услугу. Сервис помогает удобно соединить клиента и специалиста, упростить запись и убрать хаос из переписок. Авторизация может работать через Telegram, Google и другие способы входа, чтобы пользователю было удобно зайти с любого устройства.\n\n" +
          "Что сделали в проекте\n" +
          "• Продумали структуру сервиса для клиентов и мастеров\n" +
          "• Собрали пользовательский путь от выбора услуги до записи\n" +
          "• Разработали каталог категорий, услуг и мастеров\n" +
          "• Сделали личный кабинет мастера\n" +
          "• Реализовали запись на свободное время\n" +
          "• Добавили основу для напоминаний и управления заявками\n" +
          "• Подготовили продукт к развитию в полноценный marketplace\n\n" +
          "Результат\n" +
          "Slotty показывает, как локальный сервис записи может стать полноценным продуктом для мастеров, студий и клиентов. Пользователь быстро находит услугу и записывается, а мастер получает удобный инструмент для управления своим временем, услугами и клиентами.\n",
        detailsEn:
          "Format: SaaS / marketplace / online booking service\n\n" +
          "Domain\n" +
          "• slotty.of.by/book\n\n" +
          "Status\n" +
          "• Live\n\n" +
          "Goal\n" +
          "• Help users quickly find the right master or studio, pick a service, see open time slots and book online — without calls, endless chats or extra steps.\n\n" +
          "How it works\n" +
          "• The user picks a service category: nails, hair, skincare, brows, massage and more.\n" +
          "• They browse masters, service cards, prices and open slots, then book in the app.\n" +
          "• The master receives the request and manages schedule, services, profile and clients in a personal dashboard.\n\n" +
          "What the service shows\n" +
          "• Service and category catalog\n" +
          "• Master and studio cards\n" +
          "• Available dates and times\n" +
          "• Online booking for a service\n" +
          "• Booking status\n" +
          "• User reminders\n" +
          "• Visit history\n" +
          "• Master dashboard\n\n" +
          "Safety and positioning\n" +
          "Slotty does not replace the master or interfere with the service itself. It connects client and specialist, simplifies booking and removes chaos from messaging. Sign-in can work via Telegram, Google and other methods so users can access the product from any device.\n\n" +
          "What we delivered\n" +
          "• Service structure for clients and masters\n" +
          "• User journey from service pick to confirmed booking\n" +
          "• Category, service and master catalog\n" +
          "• Master personal area\n" +
          "• Booking for open time slots\n" +
          "• Foundation for reminders and request management\n" +
          "• Product groundwork to grow into a full marketplace\n\n" +
          "Outcome\n" +
          "Slotty shows how a local booking service can become a full product for masters, studios and clients. Users find a service and book fast; masters get a practical tool to manage time, services and clients.\n",
        domain: SLOTTY_DOMAIN,
        status: "live",
        tags: ["Marketplace", "Booking", "Beauty", "SaaS", "Mobile App"],
        cover: "/images/project-priew/slotty.png",
        gallery: SLOTTY_GALLERY,
        outcomes: [
          isRu
            ? "Онлайн-запись к мастерам без лишних переписок"
            : "Online booking for masters without endless messaging",
          isRu
            ? "Каталог услуг, мастеров и свободного времени в одном месте"
            : "Services, masters and open slots in one place",
          isRu
            ? "Удобный кабинет для мастера и клиента"
            : "Convenient areas for master and client",
          isRu
            ? "Быстрый путь от выбора услуги до подтверждённой записи"
            : "Fast path from service pick to confirmed booking",
        ],
        stack: [
          "React",
          "TypeScript",
          "Node.js",
          "Supabase",
          "Telegram Auth",
          "Google Auth",
          "Calendar",
          "Notifications",
        ],
      },

      // 8) SPLITON — финтех-платформа для музыкальных активов
      {
        id: "spliton",
        title: "Spliton",
        subtitleRu:
          "Финтех-платформа для музыкальных активов: каталог релизов, покупка долей, вторичный рынок, кошелёк, выплаты, юридические согласия и админ-панель.",
        subtitleEn:
          "Fintech platform for music assets: release catalog, share purchases, secondary market, wallet, payouts, legal consents and admin panel.",
        detailsRu:
          "Срок: 8–12 недель\n\n" +
          "Домен\n" +
          "• spliton.io/app\n\n" +
          "Статус\n" +
          "• В продакшене\n\n" +
          "Цель\n" +
          "• Создать сложную финтех-платформу для инвестирования в музыкальные активы, где пользователь может просматривать каталог релизов, покупать доли, отслеживать баланс, участвовать во вторичном рынке и получать выплаты.\n" +
          "• Проект требовал не просто интерфейс, а полноценную продуктовую систему: пользовательскую часть, финансовые сценарии, юридические согласия, админку, статусы, роли, безопасность, локализацию и проверку бизнес-логики.\n\n" +
          "Что сделали\n" +
          "• Сформировали продуктовую структуру: публичные страницы, авторизация, личный кабинет, каталог активов, покупка, кошелёк, вывод, вторичный рынок, профиль, согласия, новости, поддержка и админ-панель.\n" +
          "• Разработали каталог релизов с карточками, финансовыми параметрами, доступностью и переходом к покупке.\n" +
          "• Реализовали сценарий покупки долей: доступно, недоступно, требуется согласие, ошибка, подтверждение, обработка и результат.\n" +
          "• Собрали кошелёк и финансовые экраны: баланс, история, депозит, вывод и понятные состояния операций.\n" +
          "• Разработали вторичный рынок: фильтры, сортировка, статусы, поиск, покупка, продажа, ордера и серверные фильтры.\n" +
          "• Продумали юридические consent-flow для критических финансовых действий.\n" +
          "• Создали админ-панель: финансы, новости, документы, реквизиты, статусы, проверки и история изменений.\n" +
          "• Реализовали модуль юридических документов: версии, активные редакции, статусы и фиксация согласий пользователя.\n" +
          "• Проработали модуль платёжных реквизитов: пул, предпросмотр, история, мультиязычные тексты и API для депозита.\n" +
          "• Подключили локализацию RU / EN / ES / PT: статусы, ошибки, кнопки и пустые состояния без жёстко прошитых строк.\n" +
          "• Улучшили UI/UX финансовых сценариев: confirm → processing → result.\n" +
          "• Оптимизировали производительность: lazy-блоки, словари, маршруты и поведение в dev/prod.\n" +
          "• Провели аудит бизнес-логики: покупка, продажа, listing, вывод, согласия, роли, статусы и краевые случаи.\n" +
          "• Провели техническую стабилизацию: e2e, i18n gate, consent-flow, мобильные слои и throttling.\n\n" +
          "Особенности\n" +
          "Spliton — один из самых объёмных типов проектов: маркетплейс, финансы, личный кабинет, админ-панель, юридическая логика, локализация, вторичный рынок и множество состояний. Главная сложность — связать дизайн, бизнес-логику, роли, API, базу данных, безопасность и реальные сценарии пользователя в одну стабильную систему.\n\n" +
          "Пример сценария\n" +
          "Пользователь заходит на платформу, проходит авторизацию, открывает каталог музыкальных активов, выбирает релиз, смотрит параметры, принимает необходимые юридические условия и покупает доли. После покупки актив появляется в кабинете. Пользователь следит за балансом, историей операций и выплатами, а при необходимости выставляет доли на вторичный рынок. Администратор управляет документами, новостями, реквизитами, статусами и финансовыми разделами через админ-панель.\n",
        detailsEn:
          "Timeline: 8–12 weeks\n\n" +
          "Domain\n" +
          "• spliton.io/app\n\n" +
          "Status\n" +
          "• Live\n\n" +
          "Goal\n" +
          "• Build a fintech platform for investing in music assets: catalog, share purchases, balance tracking, secondary market and payouts.\n" +
          "• Deliver a full product system — not just UI: user area, finance flows, legal consents, admin, roles, security, i18n and business-logic validation.\n\n" +
          "What we delivered\n" +
          "• Product structure: public pages, auth, user dashboard, asset catalog, purchase, wallet, withdrawals, secondary market, profile, consents, news, support and admin.\n" +
          "• Release catalog with cards, financial parameters and purchase paths.\n" +
          "• Share purchase flow with all critical states and consent gates.\n" +
          "• Wallet and finance screens with clear operation states.\n" +
          "• Secondary market with server-side filters, orders and statuses.\n" +
          "• Legal consent flows for critical financial actions.\n" +
          "• Admin panel for finance, news, documents, requisites and audits.\n" +
          "• Legal documents module with versions and user acceptance tracking.\n" +
          "• Payment requisites module for deposit scenarios.\n" +
          "• Localization RU / EN / ES / PT across UI and errors.\n" +
          "• Performance and navigation improvements; e2e and business-logic stabilization.\n\n" +
          "Highlights\n" +
          "Spliton combines marketplace, finance, user dashboard, admin, legal logic, i18n and secondary market in one high-complexity product.\n\n" +
          "Example flow\n" +
          "A user signs in, browses the catalog, reviews a release, accepts required legal terms, buys shares and tracks balance, payouts and secondary listings. Admins manage documents, news, requisites and platform status.\n",
        domain: SPLITON_DOMAIN,
        status: "live",
        tags: [
          "FinTech",
          "Marketplace",
          "SaaS",
          "MusicTech",
          "React",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "UI/UX",
          "Admin Panel",
          "Compliance",
        ],
        cover: "/images/project-priew/spliton.png",
        gallery: SPLITON_GALLERY,
        outcomes: [
          isRu
            ? "Полноценная финтех-платформа для музыкальных активов"
            : "Full fintech platform for music assets",
          isRu
            ? "Каталог релизов и сценарий покупки долей"
            : "Release catalog and share purchase flow",
          isRu
            ? "Вторичный рынок с фильтрами, ордерами и статусами"
            : "Secondary market with filters, orders and statuses",
          isRu
            ? "Кошелёк, баланс, депозит и вывод средств"
            : "Wallet, balance, deposit and withdrawal flows",
          isRu
            ? "Юридические согласия и админ-панель"
            : "Legal consents and admin panel",
          isRu
            ? "Мультиязычный интерфейс RU / EN / ES / PT"
            : "Multilingual UI RU / EN / ES / PT",
          isRu
            ? "Платформа запущена и доступна в продакшене"
            : "Platform is live in production",
        ],
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind",
          "NestJS",
          "PostgreSQL",
          "Supabase",
          "Prisma",
          "Playwright",
          "i18n",
        ],
      },
  ];
}

export function buildProjects(isRu: boolean): Project[] {
  const all = buildAllProjects(isRu);
  return PUBLIC_PROJECT_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );
}

export function findProjectBySlug(slug: string | undefined, isRu: boolean): Project | undefined {
  if (!slug) return undefined;
  return buildProjects(isRu).find((p) => p.id === slug);
}

/** Стабильный список id для sitemap и канонических путей /projects/:id */
export function allProjectIds(): string[] {
  return buildProjects(true).map((p) => p.id);
}
