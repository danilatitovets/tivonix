import type { Lang } from "./LangProvider";

export type ServicePageId =
  | "websites"
  | "mvp"
  | "automation"
  | "crm"
  | "portal"
  | "telegram"
  | "white-label";

type ServicePageCopy = {
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  offer: string;
  process: { title: string; steps: string[] };
  cases: { title: string; items: { name: string; href: string }[] };
  pricing: { title: string; body: string };
  faq: { q: string; a: string }[];
  cta: string;
};

const ROUTES: Record<ServicePageId, { ru: string; en: string }> = {
  websites: { ru: "/sozdanie-sajtov", en: "/en/website-development" },
  mvp: { ru: "/razrabotka-mvp", en: "/en/mvp-development" },
  automation: { ru: "/avtomatizaciya-biznesa", en: "/en/business-automation" },
  crm: { ru: "/razrabotka-crm", en: "/en/client-portal-development" },
  portal: { ru: "/razrabotka-lichnogo-kabineta", en: "/en/client-portal-development" },
  telegram: { ru: "/telegram-boty-dlya-biznesa", en: "/en/telegram-bot-development" },
  "white-label": { ru: "/partners", en: "/en/white-label-development" },
};

export function servicePagePath(id: ServicePageId, lang: Lang): string {
  const r = ROUTES[id];
  if (lang === "en") return r.en;
  return r.ru;
}

export function servicePageIdFromPath(pathname: string): ServicePageId | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  const map: Record<string, ServicePageId> = {
    "/sozdanie-sajtov": "websites",
    "/en/website-development": "websites",
    "/razrabotka-mvp": "mvp",
    "/en/mvp-development": "mvp",
    "/avtomatizaciya-biznesa": "automation",
    "/en/business-automation": "automation",
    "/razrabotka-crm": "crm",
    "/razrabotka-lichnogo-kabineta": "portal",
    "/en/client-portal-development": "portal",
    "/telegram-boty-dlya-biznesa": "telegram",
    "/en/telegram-bot-development": "telegram",
    "/en/white-label-development": "white-label",
  };
  return map[p] ?? null;
}

const COPY: Record<ServicePageId, Record<"ru" | "en", ServicePageCopy>> = {
  websites: {
    ru: {
      seo: {
        title: "Создание сайтов для бизнеса — TIVONIX",
        description:
          "Разрабатываем сайты под заявки: лендинги, корпоративные страницы и многостраничные сайты с формами, Telegram и базовым SEO.",
      },
      h1: "Создание сайтов, которые доводят заявку до ответа",
      lead: "Проектируем структуру, дизайн и разработку под ваш канал трафика. Фиксируем объём и стоимость до старта.",
      offer: "Лендинги, сайты услуг, корпоративные страницы, формы заявок, интеграции с Telegram и mini-CRM.",
      process: {
        title: "Как проходит работа",
        steps: [
          "Письменный разбор задачи и оценка",
          "Структура страниц и тексты",
          "Дизайн и адаптивная разработка",
          "Формы, уведомления, базовое SEO",
          "Деплой и передача доступов",
        ],
      },
      cases: {
        title: "Подтверждённые кейсы",
        items: [
          { name: "LOGOVO", href: "/projects/logovo" },
          { name: "Headmind", href: "/projects/headmind" },
        ],
      },
      pricing: {
        title: "Стоимость",
        body: "Старт от тарифа Start ($400). Итог зависит от числа страниц, форм и интеграций. Фиксируем после письменного разбора.",
      },
      faq: [
        {
          q: "Сколько времени занимает запуск?",
          a: "Простая страница — от 7 рабочих дней. Многостраничный сайт — от 2 недель. Точный срок после брифа.",
        },
        {
          q: "Передаёте ли код?",
          a: "Да. Исходники и доступы передаются клиенту после согласованного этапа.",
        },
      ],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "Website development for business — TIVONIX",
        description:
          "We build lead-focused websites: landing pages, multi-page sites, forms, Telegram alerts and basic SEO.",
      },
      h1: "Websites that turn inquiries into a clear next step",
      lead: "We design structure, UI and development for your traffic channel. Scope and price are agreed in writing before work starts.",
      offer: "Landing pages, service websites, corporate sites, lead forms, Telegram integrations and mini-CRM hooks.",
      process: {
        title: "How we work",
        steps: [
          "Written scope review and estimate",
          "Page structure and copy",
          "Design and responsive development",
          "Forms, notifications, basic SEO",
          "Deploy and handover of access",
        ],
      },
      cases: {
        title: "Verified case studies",
        items: [
          { name: "LOGOVO", href: "/en/projects/logovo" },
          { name: "Headmind", href: "/en/projects/headmind" },
        ],
      },
      pricing: {
        title: "Pricing",
        body: "Starts from the Start plan ($400). Final cost depends on pages, forms and integrations. Fixed after a written scope review.",
      },
      faq: [
        {
          q: "How long does a launch take?",
          a: "A single landing page starts around 7 business days. Multi-page sites from 2 weeks. Exact timeline after the brief.",
        },
        {
          q: "Do we get the source code?",
          a: "Yes. Source code and access are handed over after the agreed milestone.",
        },
      ],
      cta: "Get a written scope & estimate",
    },
  },
  mvp: {
    ru: {
      seo: {
        title: "Разработка MVP — TIVONIX",
        description:
          "Собираем основу продукта с одним главным сценарием: авторизация, портал, роли и база данных.",
      },
      h1: "Основа MVP с одним главным пользовательским сценарием",
      lead: "Фокус на одном рабочем потоке вместо перегруженного «полного SaaS». Сложные продукты оцениваем отдельно.",
      offer: "Регистрация, личный кабинет или портал, роли, база данных, админ-раздел и одна ключевая интеграция.",
      process: {
        title: "Этапы",
        steps: [
          "Письменный scope и границы MVP",
          "Прототип ключевого сценария",
          "Разработка ядра и админки",
          "Тестирование и деплой",
          "Передача кода и документации",
        ],
      },
      cases: {
        title: "Кейсы",
        items: [
          { name: "Spliton", href: "/projects/spliton" },
          { name: "Slotty", href: "/projects/slotty" },
        ],
      },
      pricing: {
        title: "Стоимость",
        body: "Тариф Product от $2000. Маркетплейсы, FinTech и много ролей — индивидуальная оценка.",
      },
      faq: [
        {
          q: "Что входит в MVP?",
          a: "Один основной пользовательский сценарий, базовая админка и одна внешняя интеграция. Дополнения — отдельно.",
        },
      ],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "MVP development — TIVONIX",
        description:
          "Focused MVP foundations with one primary user workflow: auth, portal, roles and database.",
      },
      h1: "Focused MVP foundation with one primary workflow",
      lead: "We ship one working path instead of an over-scoped “full SaaS”. Complex products are quoted separately.",
      offer: "Sign-up, client portal, roles, database, admin area and one key integration.",
      process: {
        title: "Process",
        steps: [
          "Written scope and MVP boundaries",
          "Prototype of the core workflow",
          "Core product and admin build",
          "Testing and deploy",
          "Code and access handover",
        ],
      },
      cases: {
        title: "Case studies",
        items: [
          { name: "Spliton", href: "/en/projects/spliton" },
          { name: "Slotty", href: "/en/projects/slotty" },
        ],
      },
      pricing: {
        title: "Pricing",
        body: "Product plan from $2000. Marketplaces, FinTech and multi-role products require a custom quote.",
      },
      faq: [
        {
          q: "What is included?",
          a: "One primary user workflow, a basic admin area and one external integration. Extras are quoted separately.",
        },
      ],
      cta: "Get a written scope & estimate",
    },
  },
  automation: {
    ru: {
      seo: {
        title: "Автоматизация бизнеса — TIVONIX",
        description: "Связываем сайт, Telegram, таблицы и mini-CRM в один процесс обработки заявок.",
      },
      h1: "Автоматизация заявок и внутренних процессов",
      lead: "Убираем ручной перенос между чатами, почтой и таблицами. Показываем статус и следующий шаг.",
      offer: "Telegram-боты, уведомления, mini-CRM, статусы, интеграции с формами и таблицами.",
      process: {
        title: "Этапы",
        steps: [
          "Карта текущего процесса",
          "Проектирование маршрута заявки",
          "Разработка и интеграции",
          "Тест на реальных сценариях",
          "Запуск и инструкция",
        ],
      },
      cases: { title: "Кейсы", items: [{ name: "Headmind", href: "/projects/headmind" }] },
      pricing: {
        title: "Стоимость",
        body: "Growth от $900 для системы заявок. Сложная логика — Custom после письменного разбора.",
      },
      faq: [
        {
          q: "Можно начать с простого?",
          a: "Да. Часто достаточно формы + Telegram, затем добавляем CRM и статусы.",
        },
      ],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "Business automation — TIVONIX",
        description: "Connect websites, Telegram, spreadsheets and mini-CRM into one lead workflow.",
      },
      h1: "Automation for leads and internal workflows",
      lead: "We remove manual copying between chats, email and spreadsheets. Status and next steps stay visible.",
      offer: "Telegram bots, alerts, mini-CRM, statuses, form and spreadsheet integrations.",
      process: {
        title: "Process",
        steps: [
          "Map the current workflow",
          "Design the lead route",
          "Build and integrate",
          "Test on real scenarios",
          "Launch and handover guide",
        ],
      },
      cases: { title: "Cases", items: [{ name: "Headmind", href: "/en/projects/headmind" }] },
      pricing: {
        title: "Pricing",
        body: "Growth from $900 for a lead system. Complex logic — Custom after written scope review.",
      },
      faq: [
        {
          q: "Can we start simple?",
          a: "Yes. Often a form + Telegram is enough first, then CRM and statuses.",
        },
      ],
      cta: "Get a written scope & estimate",
    },
  },
  crm: {
    ru: {
      seo: {
        title: "Разработка CRM и mini-CRM — TIVONIX",
        description: "Mini-CRM и таблицы заявок со статусами, ответственными и историей.",
      },
      h1: "Mini-CRM под ваш процесс продаж",
      lead: "Не перегружаем коробочной CRM. Делаем то, что команда реально использует каждый день.",
      offer: "Таблица заявок, статусы, ответственные, фильтры, уведомления, базовые роли.",
      process: {
        title: "Этапы",
        steps: ["Бриф по процессу", "Модель статусов", "UI и разработка", "Интеграции", "Обучение команды"],
      },
      cases: { title: "Кейсы", items: [{ name: "Headmind", href: "/projects/headmind" }] },
      pricing: { title: "Стоимость", body: "Growth от $900. Большая CRM с множеством ролей — Custom." },
      faq: [{ q: "Это замена amoCRM?", a: "Нет. Это лёгкая система под ваш маршрут. Интеграции с внешними CRM — по задаче." }],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "CRM & mini-CRM development — TIVONIX",
        description: "Lightweight lead tables with statuses, owners and history.",
      },
      h1: "Mini-CRM shaped around your sales process",
      lead: "No bloated off-the-shelf CRM. We build what your team uses daily.",
      offer: "Lead table, statuses, assignees, filters, notifications, basic roles.",
      process: {
        title: "Process",
        steps: ["Process brief", "Status model", "UI and build", "Integrations", "Team onboarding"],
      },
      cases: { title: "Cases", items: [{ name: "Headmind", href: "/en/projects/headmind" }] },
      pricing: { title: "Pricing", body: "Growth from $900. Large multi-role CRM — Custom." },
      faq: [{ q: "Is this a HubSpot replacement?", a: "No. A lightweight system for your workflow. External CRM integrations on request." }],
      cta: "Get a written scope & estimate",
    },
  },
  portal: {
    ru: {
      seo: {
        title: "Разработка личного кабинета — TIVONIX",
        description: "Клиентские порталы и кабинеты с ролями, статусами и документами.",
      },
      h1: "Личные кабинеты и клиентские порталы",
      lead: "Кабинет клиента, портал партнёра или внутренний dashboard — с понятными ролями и доступами.",
      offer: "Авторизация, профиль, статусы, документы, уведомления, админ-раздел.",
      process: {
        title: "Этапы",
        steps: ["Scope ролей", "Прототип", "Разработка", "Безопасность доступов", "Запуск"],
      },
      cases: { title: "Кейсы", items: [{ name: "Spliton", href: "/projects/spliton" }] },
      pricing: { title: "Стоимость", body: "Product от $2000 для основы с одним сценарием." },
      faq: [{ q: "Сколько ролей?", a: "В Product — базовый набор. Много ролей и сложные права — Custom." }],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "Client portal development — TIVONIX",
        description: "Client portals and dashboards with roles, statuses and documents.",
      },
      h1: "Client portals and account areas",
      lead: "Client area, partner portal or internal dashboard — with clear roles and access control.",
      offer: "Auth, profile, statuses, documents, notifications, admin section.",
      process: {
        title: "Process",
        steps: ["Role scope", "Prototype", "Development", "Access security", "Launch"],
      },
      cases: { title: "Cases", items: [{ name: "Spliton", href: "/en/projects/spliton" }] },
      pricing: { title: "Pricing", body: "Product from $2000 for a foundation with one primary workflow." },
      faq: [{ q: "How many roles?", a: "Product includes a basic set. Many roles and complex permissions — Custom." }],
      cta: "Get a written scope & estimate",
    },
  },
  telegram: {
    ru: {
      seo: {
        title: "Telegram-боты для бизнеса — TIVONIX",
        description: "Боты для заявок, уведомлений и интеграции с сайтом и CRM.",
      },
      h1: "Telegram-боты для заявок и уведомлений",
      lead: "Подключаем Telegram к сайту, CRM и внутренним процессам без потери заявок.",
      offer: "Бот заявок, уведомления менеджерам, Mini App, интеграция с формами.",
      process: {
        title: "Этапы",
        steps: ["Сценарий бота", "Разработка", "Интеграция", "Тест", "Запуск"],
      },
      cases: { title: "Кейсы", items: [{ name: "Slotty", href: "/projects/slotty" }] },
      pricing: { title: "Стоимость", body: "От Start/Growth в зависимости от логики и интеграций." },
      faq: [{ q: "Нужен ли отдельный сервер?", a: "Помогаем с деплоем и настройкой. Детали — в письменной оценке." }],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "Telegram bots for business — TIVONIX",
        description: "Bots for leads, alerts and integration with your website and CRM.",
      },
      h1: "Telegram bots for leads and notifications",
      lead: "We connect Telegram to your website, CRM and internal workflows without losing inquiries.",
      offer: "Lead bot, manager alerts, Mini App, form integrations.",
      process: {
        title: "Process",
        steps: ["Bot flow", "Development", "Integration", "Testing", "Launch"],
      },
      cases: { title: "Cases", items: [{ name: "Slotty", href: "/en/projects/slotty" }] },
      pricing: { title: "Pricing", body: "From Start/Growth depending on logic and integrations." },
      faq: [{ q: "Do we need our own server?", a: "We help with deploy and setup. Details in the written estimate." }],
      cta: "Get a written scope & estimate",
    },
  },
  "white-label": {
    ru: {
      seo: {
        title: "White-label разработка для агентств — TIVONIX",
        description: "Разработка под брендом агентства: сайты, порталы и автоматизация.",
      },
      h1: "White-label разработка для агентств",
      lead: "Берём техническую часть под ваш бренд. Фиксируем scope, сроки и передаём код.",
      offer: "Сайты, MVP, порталы, автоматизация, партнёрская панель.",
      process: {
        title: "Этапы",
        steps: ["Партнёрский бриф", "Scope", "Разработка", "Отчёты", "Передача клиенту"],
      },
      cases: { title: "Кейсы", items: [{ name: "TIVONIX Panel", href: "/partners" }] },
      pricing: { title: "Стоимость", body: "Индивидуально. Партнёрские условия — на странице Partners." },
      faq: [{ q: "Как начать?", a: "Оставьте заявку или откройте партнёрскую программу на /partners." }],
      cta: "Получить письменную оценку",
    },
    en: {
      seo: {
        title: "White-label development for agencies — TIVONIX",
        description: "Development under your agency brand: websites, portals and automation.",
      },
      h1: "White-label development for agencies",
      lead: "We handle the technical delivery under your brand. Scope, timeline and code handover are agreed in writing.",
      offer: "Websites, MVPs, portals, automation, partner panel.",
      process: {
        title: "Process",
        steps: ["Partner brief", "Scope", "Build", "Written updates", "Client handover"],
      },
      cases: { title: "Cases", items: [{ name: "Partner program", href: "/en/partners" }] },
      pricing: { title: "Pricing", body: "Custom. Partner terms on the Partners page." },
      faq: [{ q: "How to start?", a: "Send a brief or open the partner program at /en/partners." }],
      cta: "Get a written scope & estimate",
    },
  },
};

export function servicePageCopy(id: ServicePageId, lang: Lang): ServicePageCopy {
  const l = lang === "en" ? "en" : "ru";
  return COPY[id][l];
}

export const PRERENDER_SERVICE_ROUTES = [
  "/sozdanie-sajtov",
  "/razrabotka-mvp",
  "/avtomatizaciya-biznesa",
  "/razrabotka-crm",
  "/razrabotka-lichnogo-kabineta",
  "/telegram-boty-dlya-biznesa",
  "/en/website-development",
  "/en/mvp-development",
  "/en/business-automation",
  "/en/client-portal-development",
  "/en/telegram-bot-development",
  "/en/white-label-development",
] as const;
