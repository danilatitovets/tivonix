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
const GIFTSNIPER_DOMAIN = "https://t.me/GiftSniperTonBot";
const SLOTTY_DOMAIN = "https://slotty.of.by/book";
const SPLITON_DOMAIN = "https://spliton.io/app";
const TIVONIXPANEL_DOMAIN = "https://tivonixpanel-production.up.railway.app/login";

/** Публичные кейсы на /projects (остальные скрыты, но остаются в каталоге) */
export const PUBLIC_PROJECT_IDS = [
  "tivonixpanel",
  "spliton",
  "slotty",
  "giftsniper",
  "headmind",
] as const;

const SLOTTY_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/slotty/r${i + 1}.webp`);
const SPLITON_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/spliton/g${i + 1}.webp`);
const TIVONIXPANEL_GALLERY = [
  "/images/project-priew/tivonixpanel/1.png",
  "/images/project-priew/tivonixpanel/2.png",
  "/images/project-priew/tivonixpanel/3.png",
];

function buildAllProjects(isRu: boolean): Project[] {
  return [
      // 0) TIVONIX PANEL — партнёрская панель
      {
        id: "tivonixpanel",
        title: "Tivonix Panel",
        subtitleRu:
          "Партнёрская панель TIVONIX: сделки, статусы, проекты и выплаты — один кабинет вместо хаоса в чатах и таблицах.",
        subtitleEn:
          "TIVONIX partner panel: deals, statuses, projects and payouts — one dashboard instead of chaos in chats and spreadsheets.",
        detailsRu:
          "Формат: партнёрская панель / SaaS-кабинет\n\n" +
          "Зачем это\n" +
          "Партнёрство ломается не на деньгах — на **прозрачности**. Где заявка? На каком этапе сделка? Когда выплата? Без кабинета всё это живёт в Telegram и Excel.\n\n" +
          "Мы собрали **рабочий кабинет** для агентств, фрилансеров и студий: регистрация, вход, статусы, проекты и выплаты в одном месте.\n\n" +
          "Как работает\n" +
          "Партнёр заходит в панель, выбирает модель — **Referral** или **White-label** — и после модерации получает доступ.\n" +
          "Дальше всё по делу: передал задачу → видит статус → понимает следующий шаг → отслеживает выплату. Без «напомни, пожалуйста» и ночных скринов из чатов.\n\n" +
          "Что внутри\n" +
          "• **Логин и онбординг** — быстрый вход, без лишних экранов\n" +
          "• **Дашборд сделок** — статусы видно сразу\n" +
          "• **Referral / White-label** — две модели в одном продукте\n" +
          "• **Проекты и выплаты** — трекинг без таблиц на стороне\n" +
          "• UI под ежедневную работу, а не под презентацию\n\n" +
          "Что сделали\n" +
          "Спроектировали структуру под реальный партнёрский процесс. Собрали сценарии регистрации, логина и работы со сделками. Довели UI: сетка, иерархия, статусы, **пустые состояния**. Запустили в продакшен на Railway.\n\n" +
          "Итог\n" +
          "Живая панель, куда партнёры **заходят сами** — ведут сделки и видят выплаты. Не презентация «как будет», а продукт, который уже в работе.\n",
        detailsEn:
          "Format: partner panel / SaaS dashboard\n\n" +
          "Why it matters\n" +
          "Partnerships break on **transparency**, not money. Where is the request? What stage is the deal? When is the payout? Without a panel, all of that lives in chats and spreadsheets.\n\n" +
          "We built a **working cabinet** for agencies, freelancers and studios: registration, login, statuses, projects and payouts in one place.\n\n" +
          "How it works\n" +
          "A partner opens the panel, picks **Referral** or **White-label**, and gets access after moderation.\n" +
          "Then the loop is simple: submit a task → see the status → know the next step → track the payout. No “please remind me” and late-night chat screenshots.\n\n" +
          "What’s inside\n" +
          "• **Login and onboarding** — fast entry, no fluff screens\n" +
          "• **Deals dashboard** — statuses visible at a glance\n" +
          "• **Referral / White-label** — two models in one product\n" +
          "• **Projects and payouts** — tracking without side spreadsheets\n" +
          "• UI built for daily work, not for a deck\n\n" +
          "What we delivered\n" +
          "Designed the structure around a real partner workflow. Built registration, login and deal flows. Crafted UI hierarchy, statuses and **empty states**. Shipped to production on Railway.\n\n" +
          "Outcome\n" +
          "A live panel partners **actually open** — they run deals and see payouts. Not a “how it will look” demo, but a product already in use.\n",
        domain: TIVONIXPANEL_DOMAIN,
        status: "live",
        tags: ["SaaS", "Admin Panel", "Partners", "Dashboard", "UI/UX"],
        cover: "/images/project-priew/tivonixpanel/prew.png",
        gallery: TIVONIXPANEL_GALLERY,
        outcomes: [
          isRu
            ? "**Кабинет** с логином и онбордингом"
            : "**Dashboard** with login and onboarding",
          isRu
            ? "Сделки, проекты и **выплаты** в одном месте"
            : "Deals, projects and **payouts** in one place",
          isRu
            ? "Модели **Referral** и **White-label**"
            : "**Referral** and **White-label** models",
          isRu
            ? "Продукт **в продакшене** на Railway"
            : "Product **live** on Railway",
        ],
        stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Railway"],
        testimonial: {
          name: isRu ? "Артём К." : "Artem K.",
          role: isRu ? "Один из основателей TIVONIX" : "Co-founder, TIVONIX",
          text: isRu
            ? "Панель закрыла то, из‑за чего раньше всё сыпалось: статусы жили в чатах, выплаты — в таблицах. Сейчас открыл кабинет — и сразу видно, где сделка и что дальше. Рабочий инструмент, без лишнего."
            : "The panel fixed what kept breaking: statuses lived in chats, payouts in spreadsheets. Now you open the dashboard and see where the deal is and what’s next. A real tool, no fluff.",
        },
      },

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
        cover: "/images/project-priew/labelo.webp",
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
        cover: "/images/project-priew/upcwatc.webp",
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
        cover: "/images/project-priew/payslip.webp",
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
          "Задача\n" +
          "B2B-компании часто «знают всё про себя», но сайт не умеет это сказать. Нужно было **упаковать экспертизу**: кто мы, что делаем, почему можно доверить — и довести до заявки.\n\n" +
          "Что сделали\n" +
          "Собрали маршрут: услуги → подход → кейсы → команда → контакт. Упростили формулировки, усилили доверие через роли и опыт. Чистая типографика, адаптив, скорость. **CTA** на местах, где человек уже готов написать.\n\n" +
          "Итог\n" +
          "Сайт стал понятнее клиенту и лучше ведёт к заявке — без перегруза и без «обо всём и ни о чём».\n",
        detailsEn:
          "Format: corporate website / services showcase\n\n" +
          "The challenge\n" +
          "B2B teams often know their craft — the site just doesn’t say it. We needed to **package expertise**: who they are, what they do, why trust them — and move to a lead.\n\n" +
          "What we did\n" +
          "Built the path: services → approach → cases → team → contact. Sharpened copy, strengthened trust via roles and experience. Clean type, responsive layout, speed. **CTAs** where people are already ready to write.\n\n" +
          "Outcome\n" +
          "The site is clearer for clients and drives leads better — no clutter, no “about everything and nothing”.\n",
        domain: HEADMIND_DOMAIN,
        status: "live",
        tags: ["B2B", "Website", "UI/UX", "Structure", "Conversion"],
        cover: "/images/project-priew/headmind.webp",
        outcomes: [
          isRu ? "**Понятная** упаковка услуг и подхода" : "**Clear** services & approach packaging",
          isRu ? "Доверие через **команду** и структуру" : "Trust via **team** and structure",
          isRu ? "**CTA** и точки лид-генерации" : "**CTA** and lead capture points",
        ],
        stack: ["HTML", "CSS", "JavaScript (ES6)"],
        testimonial: {
          name: isRu ? "Евгений Беликов" : "Evgeniy Belikov",
          role: isRu ? "CEO, ООО «Хэдмайнд»" : "CEO, Headmind",
          text: isRu
            ? "Структуру и подачу собрали так, что клиентам стало понятнее, кто мы и чем занимаемся. Сайт спокойно отправляем на первом касании — заявки пошли ровнее."
            : "They shaped the structure and messaging so clients finally understand who we are and what we do. We send the site on first contact without hesitation — leads came in more steadily.",
        },
      },

      // 5) GIFTSNIPER — Telegram-бот для оценки NFT и Telegram Gifts в TON
      {
        id: "giftsniper",
        title: "GiftSniper",
        subtitleRu:
          "Telegram-бот для оценки NFT и Telegram Gifts в TON по рыночным данным: трейты, листинги, аналоги и ориентир цены.",
        subtitleEn:
          "Telegram bot for TON NFT and Telegram Gifts valuation using market data: traits, listings, comparables, and pricing guidance.",
        detailsRu:
          "Формат: Telegram-бот / аналитический продукт\n\n" +
          "Зачем\n" +
          "Оценить NFT или Telegram Gift вручную — это **десятки вкладок** и сравнение «на глаз». GiftSniper даёт ориентир по рынку за один запрос в Telegram.\n\n" +
          "Как работает\n" +
          "Кидаешь ссылку (Getgems, Fragment, Tonviewer) или адрес — бот возвращает трейты, листинг, аналоги и **ориентир цены**. Без кошелька и без seed-фразы: это аналитика, не биржа.\n\n" +
          "Что показывает\n" +
          "• Трейты и характеристики объекта\n" +
          "• Текущий листинг\n" +
          "• Похожие объявления\n" +
          "• Ориентир цены продажи\n" +
          "• Данные, чтобы быстрее решить — продавать или ждать\n\n" +
          "Итог\n" +
          "Полноценный продукт внутри Telegram с понятной пользой для TON, NFT и Gifts. **Помощник по первому заработку** — проект команды TIVONIX.\n",
        detailsEn:
          "Format: Telegram bot / analytics product\n\n" +
          "Why\n" +
          "Pricing an NFT or Telegram Gift by hand means **dozens of tabs** and gut-feel comparison. GiftSniper returns market guidance in one Telegram request.\n\n" +
          "How it works\n" +
          "Send a link (Getgems, Fragment, Tonviewer) or an address — the bot returns traits, listing, comps and a **price range**. No wallet, no seed phrase: analytics, not a marketplace.\n\n" +
          "What it shows\n" +
          "• Traits and asset details\n" +
          "• Current listing\n" +
          "• Comparable offers\n" +
          "• Selling price guidance\n" +
          "• Data to decide faster — sell or wait\n\n" +
          "Outcome\n" +
          "A full product inside Telegram with real utility for TON, NFT and Gifts. Your **first-earnings assistant** — built by the TIVONIX team.\n",
        domain: GIFTSNIPER_DOMAIN,
        status: "live",
        tags: ["Telegram Bot", "TON", "NFT", "Analytics", "Market Data"],
        cover: "/images/project-priew/giftsniper.webp",
        outcomes: [
          isRu
            ? "Оценка NFT и Gifts по **рынку** в одном запросе"
            : "NFT and Gifts valuation from the **market** in one request",
          isRu
            ? "Трейты, листинги, аналоги, **ориентир цены**"
            : "Traits, listings, comps, **price guidance**",
          isRu
            ? "Без кошелька и доступа к аккаунту"
            : "No wallet or account-access risk",
        ],
        stack: ["Telegram Bot API", "TON", "NFT Data", "Parser", "Analytics"],
        testimonial: {
          name: isRu ? "Дмитрий Р." : "Dmitry R.",
          role: isRu ? "Пользователь TON / Telegram Gifts" : "TON / Telegram Gifts user",
          text: isRu
            ? "Раньше цену ловил вручную по вкладкам — долго и неточно. Сейчас кидаю ссылку в бота и за минуту вижу ориентир по рынку. Без кошелька и лишних рисков — удобно."
            : "I used to chase prices across tabs — slow and messy. Now I send a link to the bot and get market guidance in a minute. No wallet, no extra risk — just useful.",
        },
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
          "Формат: SaaS / marketplace / онлайн-запись\n\n" +
          "Проблема\n" +
          "Запись к мастеру до сих пор часто живёт в **Direct и WhatsApp**: «есть на завтра?», «а через час?», «забыл напомнить». Slotty убирает этот хаос.\n\n" +
          "Как работает\n" +
          "Клиент выбирает категорию, мастера, услугу и **свободный слот** — и записывается онлайн. Мастер в кабинете ведёт расписание, услуги, клиентов и статусы.\n\n" +
          "Что внутри\n" +
          "• Каталог услуг и категорий\n" +
          "• Карточки мастеров и студий\n" +
          "• Свободные даты и время\n" +
          "• Онлайн-запись и статус\n" +
          "• Напоминания и история\n" +
          "• **Кабинет мастера**\n\n" +
          "Позиционирование\n" +
          "Slotty не заменяет мастера. Он соединяет клиента и специалиста и убирает переписки. Вход через Telegram, Google и другие способы — с любого устройства.\n\n" +
          "Итог\n" +
          "Локальный сервис записи, который ощущается как **полноценный продукт**: быстро для клиента, удобно для мастера, готов расти в marketplace.\n",
        detailsEn:
          "Format: SaaS / marketplace / online booking\n\n" +
          "The problem\n" +
          "Booking a master still often lives in **DMs and WhatsApp**: “free tomorrow?”, “in an hour?”, “forgot to remind”. Slotty removes that chaos.\n\n" +
          "How it works\n" +
          "The client picks a category, master, service and an **open slot** — then books online. The master runs schedule, services, clients and statuses in a dashboard.\n\n" +
          "What’s inside\n" +
          "• Services and categories\n" +
          "• Master and studio cards\n" +
          "• Open dates and times\n" +
          "• Online booking and status\n" +
          "• Reminders and history\n" +
          "• **Master dashboard**\n\n" +
          "Positioning\n" +
          "Slotty doesn’t replace the master. It connects client and specialist and kills the chat clutter. Sign-in via Telegram, Google and more — from any device.\n\n" +
          "Outcome\n" +
          "A local booking service that feels like a **full product**: fast for clients, useful for masters, ready to grow into a marketplace.\n",
        domain: SLOTTY_DOMAIN,
        status: "live",
        tags: ["Marketplace", "Booking", "Beauty", "SaaS", "Mobile App"],
        cover: "/images/project-priew/slotty.webp",
        gallery: SLOTTY_GALLERY,
        outcomes: [
          isRu
            ? "Онлайн-запись **без** переписок"
            : "Online booking **without** endless messaging",
          isRu
            ? "Услуги, мастера и **слоты** в одном месте"
            : "Services, masters and **slots** in one place",
          isRu
            ? "Кабинеты для мастера и клиента"
            : "Areas for master and client",
          isRu
            ? "Путь от выбора до **подтверждённой** записи"
            : "Path from pick to **confirmed** booking",
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
        testimonial: {
          name: isRu ? "Анастасия М." : "Anastasia M.",
          role: isRu ? "Мастер маникюра, Минск" : "Nail artist, Minsk",
          text: isRu
            ? "Клиенты сами выбирают свободное время и записываются — меньше переписок и забытых слотов. Мне удобно вести расписание в кабинете, а не в чатах."
            : "Clients pick an open slot and book themselves — fewer chats and forgotten appointments. I manage the schedule in the dashboard instead of messaging apps.",
        },
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
          "Масштаб\n" +
          "Это не лендинг и не «админка на коленке». Spliton — **финтех-платформа** под инвестирование в музыкальные активы: каталог, покупка долей, кошелёк, вторичный рынок, согласия, выплаты и админка.\n\n" +
          "Сложность\n" +
          "Нужна была система, где дизайн, роли, API, база, безопасность и реальные сценарии **сходятся в одну логику** — без дыр на confirm → processing → result.\n\n" +
          "Что собрали\n" +
          "• Каталог релизов с финансовыми параметрами\n" +
          "• Покупка долей со всеми критичными состояниями\n" +
          "• **Кошелёк**: баланс, депозит, вывод, история\n" +
          "• Вторичный рынок: фильтры, ордера, статусы\n" +
          "• Юридические **consent-flow**\n" +
          "• Админ-панель: финансы, документы, реквизиты, аудит\n" +
          "• i18n **RU / EN / ES / PT**\n\n" +
          "Сценарий\n" +
          "Пользователь входит, выбирает релиз, принимает условия, покупает доли. Актив появляется в кабинете. Дальше — баланс, выплаты, вторичный рынок. Админ ведёт документы и финансы.\n\n" +
          "Итог\n" +
          "Платформа **в продакшене**: тяжёлый продукт, который держит и UI, и бизнес-логику, и compliance.\n",
        detailsEn:
          "Timeline: 8–12 weeks\n\n" +
          "Scale\n" +
          "Not a landing page and not a “quick admin”. Spliton is a **fintech platform** for music-asset investing: catalog, share purchases, wallet, secondary market, consents, payouts and admin.\n\n" +
          "Complexity\n" +
          "We needed a system where design, roles, API, database, security and real flows **lock into one logic** — no holes on confirm → processing → result.\n\n" +
          "What we built\n" +
          "• Release catalog with financial parameters\n" +
          "• Share purchase with all critical states\n" +
          "• **Wallet**: balance, deposit, withdrawal, history\n" +
          "• Secondary market: filters, orders, statuses\n" +
          "• Legal **consent flows**\n" +
          "• Admin: finance, documents, requisites, audit\n" +
          "• i18n **RU / EN / ES / PT**\n\n" +
          "Flow\n" +
          "A user signs in, picks a release, accepts terms, buys shares. The asset lands in the dashboard. Then balance, payouts, secondary market. Admins run documents and finance.\n\n" +
          "Outcome\n" +
          "Platform is **live**: a heavy product that holds UI, business logic and compliance together.\n",
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
        cover: "/images/project-priew/spliton.webp",
        gallery: SPLITON_GALLERY,
        outcomes: [
          isRu
            ? "**Финтех-платформа** для музыкальных активов"
            : "**Fintech platform** for music assets",
          isRu
            ? "Каталог и покупка **долей**"
            : "Catalog and **share** purchase flow",
          isRu
            ? "Вторичный рынок с ордерами и статусами"
            : "Secondary market with orders and statuses",
          isRu
            ? "**Кошелёк**, депозит и вывод"
            : "**Wallet**, deposit and withdrawal",
          isRu
            ? "Юр. согласия и **админ-панель**"
            : "Legal consents and **admin panel**",
          isRu
            ? "i18n RU / EN / ES / PT"
            : "i18n RU / EN / ES / PT",
          isRu
            ? "В **продакшене**"
            : "**Live** in production",
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
        testimonial: {
          name: isRu ? "Илья С." : "Ilya S.",
          role: isRu ? "Product owner" : "Product owner",
          text: isRu
            ? "Сложный продукт: финансы, согласия, вторичный рынок, админка. Довели до продакшена без сюрпризов на критичных сценариях. Коммуникация была по делу, правки вносили быстро."
            : "A complex build: finance, consents, secondary market, admin. Shipped to production without surprises on critical flows. Clear communication, fast iterations.",
        },
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
