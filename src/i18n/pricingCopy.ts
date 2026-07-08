import type { Lang } from "./LangProvider";
import type { PlanId } from "../lib/pricingData";

export const LAUNCH_DISCOUNT_PERCENT = 10;

export const PLAN_PRICE_USD = {
  start: 400,
  growth: 900,
  product: 2000,
} as const;

function planPriceStrings(fromLabel: string, usd: number) {
  const discounted = Math.round(usd * (1 - LAUNCH_DISCOUNT_PERCENT / 100));
  return {
    price: `${fromLabel} $${discounted}`,
    priceOriginal: `${fromLabel} $${usd}`,
  };
}

export function planPagePrice(lang: Lang, planId: PlanId): string | undefined {
  const copy = pricingCopy(lang);
  const p = copy.plans[planId];
  return p.price !== "индивидуально" && p.price !== "custom" ? p.price : undefined;
}

const COPY_RU = {
  title: "Планы запуска",
  subtitle: "Понятные тарифы под вашу задачу — от первых заявок до полноценного веб-сервиса",
  includesLabel: "Что входит",
  launchDiscount: {
    percent: "10%",
    note: "* Скидка — мы только начинаем: первые проекты запускаем по сниженной цене.",
  },
  afterSelect: {
    title: "Что будет после выбора плана",
    steps: [
      "Вы выбираете подходящий план",
      "Мы уточняем задачу и объём",
      "Предлагаем понятный вариант запуска",
      "После согласования начинаем работу",
    ],
    note:
      "Цены указаны «от», потому что итог зависит от экранов, логики, интеграций и сроков. Оплата происходит после обсуждения и согласования задачи.",
  },
  compareTitle: "Сравнение тарифов",
  expandAll: "Развернуть всё",
  collapseAll: "Свернуть",
  cell: {
    yes: "Да",
    no: "—",
    option: "Опция",
    basic: "Базово",
  },
  cellText: {
    support7: "7 дней",
    support14: "14 дней",
    support30: "30 дней",
    supportCustom: "По договорённости",
  },
  badges: {
    popular: "Чаще выбирают",
    product: "Для веб-сервиса",
  },
  plans: {
    start: {
      name: "Start",
      tagline: "Для быстрого запуска заявок",
      ...planPriceStrings("от", PLAN_PRICE_USD.start),
      desc: "Когда нужно быстро запустить страницу под рекламу, Instagram или Telegram и начать собирать заявки в одном месте.",
      includes: [
        "лендинг или страница услуги",
        "форма заявки",
        "кнопки связи",
        "уведомления в Telegram/email",
        "адаптация под телефон",
        "базовая аналитика",
        "запуск на домене",
      ],
      cta: "Обсудить запуск",
      ctaHint: "Откроется Telegram-бот, займёт около 2 минут.",
      compactCta: "Обсудить Start",
    },
    growth: {
      name: "Growth",
      tagline: "Система заявок для бизнеса",
      ...planPriceStrings("от", PLAN_PRICE_USD.growth),
      desc: "Когда заявок становится больше, они приходят из разных каналов и команде нужен порядок: статусы, ответственные, таблица или mini-CRM.",
      includes: [
        "сайт или несколько страниц",
        "форма заявки",
        "Telegram-уведомления",
        "таблица или мини-CRM",
        "статусы заявок",
        "базовая админка",
        "подключение аналитики",
        "помощь с запуском",
      ],
      cta: "Рассчитать систему",
      ctaHint: "Откроется короткая форма. План уже будет выбран.",
      compactCta: "Оставить заявку",
    },
    product: {
      name: "Product",
      tagline: "Веб-сервис под ключ",
      ...planPriceStrings("от", PLAN_PRICE_USD.product),
      desc: "Когда нужен не просто сайт, а рабочий веб-сервис: пользователи, личные кабинеты, роли, база данных и админ-панель.",
      includes: [
        "личный кабинет",
        "админ-панель",
        "регистрация и авторизация",
        "роли пользователей",
        "заявки, статусы, уведомления",
        "база данных",
        "интеграции",
        "оплата",
        "адаптивный интерфейс",
        "подготовка к запуску",
      ],
      cta: "Обсудить продукт",
      ctaHint: "Откроется короткая форма. Опишете продукт — мы оценим объём.",
      compactCta: "Описать продукт",
    },
    custom: {
      name: "Custom",
      tagline: "Автоматизация и AI-решения",
      price: "индивидуально",
      desc: "Когда задача не помещается в готовый тариф: AI-бот, сложная CRM, автоматизация документов, интеграции или внутренняя система.",
      includes: [
        "AI-боты и ассистенты",
        "автоматизация заявок",
        "интеграции с сервисами",
        "обработка данных и документов",
        "личные кабинеты",
        "сложные роли и сценарии",
        "кастомная CRM",
        "поддержка и развитие",
      ],
      cta: "Запросить план",
      ctaHint: "Откроется Telegram-бот для обсуждения нестандартной задачи.",
      compactCta: "Обсудить Custom",
    },
  } satisfies Record<
    PlanId,
    {
      name: string;
      tagline: string;
      price: string;
      priceOriginal?: string;
      desc: string;
      includes: string[];
      cta: string;
      ctaHint: string;
      compactCta: string;
    }
  >,
  faq: {
    title: "Частые вопросы о тарифах",
    items: [
      {
        id: "price-from",
        q: "Что значит цена «от»?",
        a: "Это минимальная стоимость запуска. Итог зависит от количества экранов, логики, интеграций, личного кабинета, CRM и сроков.",
      },
      {
        id: "pay-now",
        q: "Нужно ли платить сразу?",
        a: "Нет. Сначала мы обсуждаем задачу, уточняем объём и только потом согласуем стоимость и этапы работы.",
      },
      {
        id: "which-plan",
        q: "Какой план выбрать, если я не понимаю?",
        a: "Можно выбрать Growth или просто написать нам. Мы разберём задачу и подскажем, нужен сайт, бот, CRM, кабинет или кастомная автоматизация.",
      },
      {
        id: "start-expand",
        q: "Можно начать со Start, а потом расширить?",
        a: "Да. Часто лучше запустить простую версию, проверить заявки, а потом добавить CRM, статусы, кабинет или интеграции.",
      },
      {
        id: "growth-includes",
        q: "Что входит в Growth?",
        a: "Growth подходит, когда нужно не просто принять заявку, а навести порядок: формы, Telegram-уведомления, статусы, таблица или mini-CRM, понятный процесс обработки.",
      },
      {
        id: "when-product",
        q: "Когда нужен Product?",
        a: "Product нужен, если это уже не просто сайт, а веб-сервис: пользователи, личные кабинеты, роли, база данных, оплата, админ-панель.",
      },
      {
        id: "when-custom",
        q: "Когда выбирать Custom?",
        a: "Custom подходит для нестандартных задач: AI-боты, сложные CRM, автоматизация документов, интеграции, внутренние панели и процессы под вашу команду.",
      },
    ],
  },
  groups: {
    core: "Основное",
    crm: "Заявки и CRM",
    product: "Продуктовая логика",
    automation: "Автоматизация и AI",
    launch: "Запуск и поддержка",
  },
  features: {
    landing: "Лендинг / страница",
    responsive: "Адаптив под телефон",
    form: "Форма заявки",
    contactButtons: "Кнопки связи",
    telegramNotify: "Telegram-уведомления",
    emailNotify: "Email-уведомления",
    leadStorage: "Хранение заявок",
    leadTable: "Таблица заявок",
    miniCrm: "Мини-CRM",
    statuses: "Статусы заявок",
    history: "История обработки",
    roles: "Роли сотрудников",
    cabinet: "Личный кабинет",
    admin: "Админ-панель",
    auth: "Авторизация",
    database: "База данных",
    booking: "Онлайн-запись",
    payments: "Оплата",
    autoNotify: "Автоуведомления",
    integrations: "Интеграции",
    aiBot: "AI-бот",
    aiLeads: "AI-обработка заявок",
    documents: "Обработка документов",
    customFlows: "Кастомные сценарии",
    domain: "Помощь с доменом",
    deploy: "Деплой",
    guide: "Базовая инструкция",
    testing: "Тестирование сценариев",
    support: "Поддержка после запуска",
  },
  footer: {
    valueTitle: "Платите только за",
    valueTitleHighlight: "нужный объём запуска",
    valueAside: "Не за лишние модули, которыми пока не пользуетесь",
    valueLead:
      "Сначала запускаем то, что помогает получать и обрабатывать заявки. Когда бизнесу становится тесно — добавляем CRM, кабинет, оплату, интеграции или автоматизацию.",
    helpTitle: "Не уверены, какой план выбрать?",
    helpLead:
      "Опишите задачу своими словами — подскажем, с чего лучше начать: Start, Growth, Product или Custom.",
    helpCta: "Написать в Telegram",
    helpModalCta: "Оставить заявку",
    planScopeCaption: "Объём запуска по планам",
    chips: {
      start: ["Лендинг", "Форма", "Telegram"],
      growth: ["Мини-CRM", "Статусы", "Админка"],
      product: ["Кабинет", "Оплата", "Роли"],
      custom: ["AI-боты", "Интеграции", "CRM"],
    },
    shortDesc: {
      start: "Быстрый запуск страницы и заявок",
      growth: "Система заявок для команды",
      product: "Полноценный веб-сервис",
      custom: "Индивидуальная автоматизация",
    },
  },
};

const COPY_EN = {
  title: "Launch plans",
  subtitle: "Clear plans for your task — from first leads to a full web service",
  includesLabel: "What's included",
  launchDiscount: {
    percent: "10%",
    note: "* Launch discount — we're just getting started: early projects at a reduced rate.",
  },
  afterSelect: {
    title: "What happens after you choose a plan",
    steps: [
      "You pick the plan that fits",
      "We clarify the task and scope",
      "We propose a clear launch option",
      "After agreement, we start work",
    ],
    note:
      "Prices are shown “from” because the final cost depends on screens, logic, integrations and timeline. Payment happens after we discuss and agree on the scope.",
  },
  compareTitle: "Compare plans",
  expandAll: "Expand all",
  collapseAll: "Collapse",
  cell: {
    yes: "Yes",
    no: "—",
    option: "Optional",
    basic: "Basic",
  },
  cellText: {
    support7: "7 days",
    support14: "14 days",
    support30: "30 days",
    supportCustom: "By agreement",
  },
  badges: {
    popular: "Most popular",
    product: "For web products",
  },
  plans: {
    start: {
      name: "Start",
      tagline: "Fast lead capture launch",
      ...planPriceStrings("from", PLAN_PRICE_USD.start),
      desc: "When you need a page for ads, Instagram or Telegram — and want to collect inquiries in one place quickly.",
      includes: [
        "landing or service page",
        "lead form",
        "contact buttons",
        "Telegram/email alerts",
        "mobile-friendly layout",
        "basic analytics",
        "domain launch",
      ],
      cta: "Discuss launch",
      ctaHint: "Opens our Telegram bot — takes about 2 minutes.",
      compactCta: "Discuss Start",
    },
    growth: {
      name: "Growth",
      tagline: "Lead system for business",
      ...planPriceStrings("from", PLAN_PRICE_USD.growth),
      desc: "When leads grow and come from multiple channels — your team needs order: statuses, owners, a sheet or mini-CRM.",
      includes: [
        "site or multiple pages",
        "lead form",
        "Telegram alerts",
        "sheet or mini-CRM",
        "lead statuses",
        "basic admin",
        "analytics setup",
        "launch assistance",
      ],
      cta: "Get a quote",
      ctaHint: "Opens a short form. The Growth plan will already be selected.",
      compactCta: "Submit request",
    },
    product: {
      name: "Product",
      tagline: "Full web service",
      ...planPriceStrings("from", PLAN_PRICE_USD.product),
      desc: "When you need more than a website — a working web service with users, client areas, roles, a database and admin panel.",
      includes: [
        "client area",
        "admin panel",
        "sign-up and auth",
        "user roles",
        "leads, statuses, alerts",
        "database",
        "integrations",
        "payments",
        "responsive UI",
        "launch preparation",
      ],
      cta: "Discuss product",
      ctaHint: "Opens a short form. Describe the product — we'll estimate scope.",
      compactCta: "Describe product",
    },
    custom: {
      name: "Custom",
      tagline: "Automation & AI",
      price: "custom",
      desc: "When the task doesn't fit a ready plan: AI bots, complex CRM, document automation, integrations or an internal system.",
      includes: [
        "AI bots and assistants",
        "lead automation",
        "service integrations",
        "data and document processing",
        "client areas",
        "complex roles and flows",
        "custom CRM",
        "support and evolution",
      ],
      cta: "Request a plan",
      ctaHint: "Opens our Telegram bot to discuss a non-standard task.",
      compactCta: "Discuss Custom",
    },
  },
  faq: {
    title: "Pricing FAQ",
    items: [
      {
        id: "price-from",
        q: "What does “from” mean?",
        a: "It's the minimum launch cost. The final price depends on screens, logic, integrations, client area, CRM and timeline.",
      },
      {
        id: "pay-now",
        q: "Do I pay right away?",
        a: "No. We discuss the task, clarify scope, then agree on cost and stages before any payment.",
      },
      {
        id: "which-plan",
        q: "Which plan if I'm not sure?",
        a: "Pick Growth or message us. We'll review your task and tell you if you need a site, bot, CRM, client area or custom automation.",
      },
      {
        id: "start-expand",
        q: "Can I start with Start and expand later?",
        a: "Yes. Often it's better to launch a simple version, test leads, then add CRM, statuses, client area or integrations.",
      },
      {
        id: "growth-includes",
        q: "What's in Growth?",
        a: "Growth is for when you need order, not just a form: alerts, statuses, a sheet or mini-CRM and a clear processing flow.",
      },
      {
        id: "when-product",
        q: "When do I need Product?",
        a: "Product is for a real web service: users, client areas, roles, database, payments and admin panel.",
      },
      {
        id: "when-custom",
        q: "When to choose Custom?",
        a: "Custom fits non-standard work: AI bots, complex CRM, document automation, integrations and internal tools for your team.",
      },
    ],
  },
  groups: {
    core: "Core",
    crm: "Leads & CRM",
    product: "Product logic",
    automation: "Automation & AI",
    launch: "Launch & support",
  },
  features: {
    landing: "Landing / page",
    responsive: "Mobile layout",
    form: "Lead form",
    contactButtons: "Contact buttons",
    telegramNotify: "Telegram alerts",
    emailNotify: "Email alerts",
    leadStorage: "Lead storage",
    leadTable: "Lead table",
    miniCrm: "Mini-CRM",
    statuses: "Lead statuses",
    history: "Processing history",
    roles: "Staff roles",
    cabinet: "Client area",
    admin: "Admin panel",
    auth: "Authentication",
    database: "Database",
    booking: "Online booking",
    payments: "Payments",
    autoNotify: "Auto alerts",
    integrations: "Integrations",
    aiBot: "AI bot",
    aiLeads: "AI lead processing",
    documents: "Document processing",
    customFlows: "Custom scenarios",
    domain: "Domain help",
    deploy: "Deploy",
    guide: "Basic guide",
    testing: "Scenario testing",
    support: "Post-launch support",
  },
  footer: {
    valueTitle: "Pay only for",
    valueTitleHighlight: "the launch scope you need",
    valueAside: "Not for modules you don't use yet",
    valueLead:
      "We launch what helps you capture and process leads first. When the business outgrows it — we add CRM, client area, payments, integrations or automation.",
    helpTitle: "Not sure which plan to pick?",
    helpLead:
      "Describe your task in your own words — we'll suggest whether to start with Start, Growth, Product or Custom.",
    helpCta: "Message on Telegram",
    helpModalCta: "Submit request",
    planScopeCaption: "Launch scope by plan",
    chips: {
      start: ["Landing", "Form", "Telegram"],
      growth: ["Mini-CRM", "Statuses", "Admin"],
      product: ["Client area", "Payments", "Roles"],
      custom: ["AI bots", "Integrations", "CRM"],
    },
    shortDesc: {
      start: "Fast page and lead launch",
      growth: "Lead system for your team",
      product: "Full web service",
      custom: "Custom automation",
    },
  },
};

export function pricingCopy(lang: Lang) {
  return lang === "ru" ? COPY_RU : COPY_EN;
}

export type PricingCopy = typeof COPY_RU;
