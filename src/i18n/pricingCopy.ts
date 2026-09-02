import type { Lang } from "./LangProvider";
import { COMPARISON_GROUPS, type PlanId } from "../lib/pricingData";

export const PLAN_PRICE_USD = {
  start: 400,
  growth: 900,
  product: 2000,
} as const;

export type PricedPlanId = keyof typeof PLAN_PRICE_USD;

function planPriceStrings(fromLabel: string, usd: number) {
  return {
    price: `${fromLabel} $${usd}`,
  };
}

/** Строка с ценой для Telegram-бота и других коротких CTA */
export function formatPlanPriceLine(planId: PricedPlanId, lang: Lang = "ru"): string {
  const usd = PLAN_PRICE_USD[planId];
  const fromLabel = lang === "ru" ? "от" : lang === "zh" ? "起" : "from";
  if (lang === "ru") {
    return `💰 Стоимость: ${fromLabel} $${usd}. Итог зависит от объёма после письменного разбора задачи.`;
  }
  if (lang === "zh") {
    return `💰 费用：${fromLabel} $${usd}。最终费用在书面范围确认后确定。`;
  }
  return `💰 Price: ${fromLabel} $${usd}. Final cost confirmed after a written scope review.`;
}

const PLAN_GROUP_EMOJI: Record<string, string> = {
  core: "🌐",
  crm: "📋",
  product: "⚙️",
  automation: "🤖",
  launch: "🚀",
};

/** Блок «что входит» для Telegram — те же строки, что в таблице сравнения на /plans */
export function formatPlanHighlightsForTelegram(planId: PlanId, lang: Lang = "ru"): string {
  const copy = pricingCopy(lang);
  const planName = copy.plans[planId].name;
  const title =
    lang === "ru" ? `✨ Что входит в ${planName}` : `✨ What\u2019s included in ${planName}`;
  const sections: string[] = [];

  for (const group of COMPARISON_GROUPS) {
    const groupLabel = copy.groups[group.id as keyof typeof copy.groups];
    const emoji = PLAN_GROUP_EMOJI[group.id] ?? "📌";
    const included: string[] = [];
    const optional: string[] = [];

    for (const row of group.rows) {
      const cell = row.values[planId];
      const label = copy.features[row.id as keyof typeof copy.features];
      if (!label) continue;

      if (cell.kind === "yes") {
        included.push(`  ✅ ${label}`);
      } else if (cell.kind === "basic") {
        included.push(
          `  ✅ ${label}${lang === "ru" ? " (базово)" : lang === "zh" ? "（基础）" : " (basic)"}`
        );
      } else if (cell.kind === "text" && cell.textKey) {
        const value =
          copy.cellText[cell.textKey as keyof typeof copy.cellText] ?? cell.textKey;
        included.push(`  ✅ ${label}: ${value}`);
      } else if (cell.kind === "option") {
        optional.push(
          `  ➕ ${label}${lang === "ru" ? " (опция)" : lang === "zh" ? "（可选）" : " (optional)"}`
        );
      }
    }

    if (included.length === 0 && optional.length === 0) continue;

    const lines = [...included, ...optional];
    sections.push(`${emoji} ${groupLabel}\n${lines.join("\n")}`);
  }

  if (sections.length === 0) {
    const fallback = copy.plans[planId].includes
      .map((item) => `  ✅ ${item}`)
      .join("\n");
    return `${title}:\n\n${fallback}`;
  }

  return `${title}:\n\n${sections.join("\n\n")}`;
}

/** Краткий обзор всех тарифов для сценария plan_help */
export function formatPlansOverviewForTelegram(lang: Lang = "ru"): string {
  const copy = pricingCopy(lang);
  const planIds: PlanId[] = ["start", "growth", "product", "custom"];
  const title = lang === "ru" ? "📊 Тарифы TIVONIX" : lang === "zh" ? "📊 TIVONIX 方案" : "📊 TIVONIX plans";

  const blocks = planIds.map((id) => {
    const plan = copy.plans[id];
    const chips = copy.footer.chips[id].map((c) => `• ${c}`).join("\n   ");
    const price =
      id === "custom"
        ? (lang === "ru" ? "индивидуально" : lang === "zh" ? "定制" : "custom")
        : (() => {
            const usd = PLAN_PRICE_USD[id];
            const fromLabel = lang === "ru" ? "от" : lang === "zh" ? "起" : "from";
            return `${fromLabel} $${usd}`;
          })();
    return `▸ <b>${plan.name}</b> — ${price}\n   ${chips}`;
  });

  return `${title}:\n\n${blocks.join("\n\n")}`;
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
  afterSelect: {
    title: "Что будет после выбора плана",
    steps: [
      "Вы выбираете подходящий план",
      "Мы уточняем задачу и объём",
      "Предлагаем понятный вариант запуска",
      "После согласования начинаем работу",
    ],
    note:
      "Цены указаны «от». Итоговая стоимость фиксируется после письменного разбора задачи. Дополнительные модули и интеграции оцениваются отдельно. Оплата — после согласования объёма.",
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
    product: "Для MVP",
  },
  plans: {
    start: {
      name: "Start",
      tagline: "Страница для запуска заявок",
      ...planPriceStrings("от", PLAN_PRICE_USD.start),
      desc: "Когда нужно быстро запустить страницу под рекламу, Instagram или Telegram и начать собирать заявки в одном месте.",
      includes: [
        "лендинг",
        "адаптивная версия",
        "форма заявки",
        "уведомление в Telegram или email",
        "базовая аналитика",
        "согласованный объём правок",
        "срок от 7 рабочих дней",
      ],
      cta: "Получить состав Start",
      ctaHint: "Откроется форма заявки. План Start уже будет выбран.",
      compactCta: "Состав Start",
    },
    growth: {
      name: "Growth",
      tagline: "Сайт и система обработки заявок",
      ...planPriceStrings("от", PLAN_PRICE_USD.growth),
      desc: "Когда заявок становится больше, они приходят из разных каналов и команде нужен порядок: статусы, ответственные, таблица или mini-CRM.",
      includes: [
        "многостраничный сайт",
        "формы и интеграции",
        "Telegram или таблица",
        "статусы заявок",
        "базовая административная часть",
        "до двух базовых интеграций",
        "срок от 2 недель",
      ],
      cta: "Оценить Growth",
      ctaHint: "Откроется короткая форма. План Growth уже будет выбран.",
      compactCta: "Оценить Growth",
    },
    product: {
      name: "Product",
      tagline: "Основа MVP с одним главным сценарием",
      ...planPriceStrings("от", PLAN_PRICE_USD.product),
      desc: "Когда нужен MVP с одним главным пользовательским сценарием: авторизация, роли, база данных и админ-панель. Сложный SaaS, маркетплейс, FinTech или крупная CRM — это Custom. Дополнительные модули и интеграции оцениваются отдельно.",
      includes: [
        "личный кабинет",
        "авторизация",
        "роли",
        "база данных",
        "базовая админ-панель",
        "одна основная внешняя интеграция",
        "срок от 4 недель",
      ],
      cta: "Рассчитать MVP",
      ctaHint: "Откроется форма. Опишите продукт — оценим объём.",
      compactCta: "Рассчитать MVP",
    },
    custom: {
      name: "Custom",
      tagline: "Сложный продукт или автоматизация",
      price: "индивидуально",
      desc: "Для сложного SaaS, маркетплейсов, FinTech, крупных CRM, AI-автоматизации и внутренних систем. Стоимость фиксируется после письменного разбора задачи; дополнения — отдельной сметой.",
      includes: [
        "сложная бизнес-логика",
        "несколько ролей",
        "платежи",
        "интеграции",
        "аналитика",
        "масштабирование",
        "индивидуальная оценка",
      ],
      cta: "Обсудить Custom",
      ctaHint: "Откроется форма для обсуждения нестандартной задачи.",
      compactCta: "Обсудить Custom",
    },
  } satisfies Record<
    PlanId,
    {
      name: string;
      tagline: string;
      price: string;
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
        a: "Это минимальная стоимость запуска. Итоговая цена фиксируется после письменного разбора задачи и зависит от экранов, логики, интеграций и сроков. Дополнения оцениваются отдельно.",
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
        a: "Product подходит для MVP с одним главным сценарием: пользователи, личный кабинет, роли, база данных и админ-панель. Сложный SaaS, маркетплейс, FinTech или крупная CRM — это Custom.",
      },
      {
        id: "when-custom",
        q: "Когда выбирать Custom?",
        a: "Custom — для сложного SaaS, маркетплейсов, FinTech, крупных CRM, AI-автоматизации и внутренних систем. Стоимость — после письменного разбора; дополнительные модули — отдельной сметой.",
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
    helpCta: "Оставить заявку",
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
      product: "Основа MVP с одним сценарием",
      custom: "Индивидуальная автоматизация",
    },
  },
};

const COPY_EN = {
  title: "Launch plans",
  subtitle: "Clear plans for your task — from first leads to a full web service",
  includesLabel: "What’s included",
  afterSelect: {
    title: "What happens after you choose a plan",
    steps: [
      "You pick the plan that fits",
      "We clarify the task and scope",
      "We propose a clear launch option",
      "After agreement, we start work",
    ],
    note:
      "Prices are shown “from”. Final cost is confirmed after a written scope review. Extra modules and integrations are quoted separately. Payment happens after scope agreement.",
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
      tagline: "Launch page",
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
      ctaHint: "Opens a short form. The Start plan will already be selected.",
      compactCta: "Discuss Start",
    },
    growth: {
      name: "Growth",
      tagline: "Website + lead workflow",
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
      tagline: "Focused MVP foundation",
      ...planPriceStrings("from", PLAN_PRICE_USD.product),
      desc: "When you need an MVP built around one main user scenario: auth, roles, a database and admin panel. Complex SaaS, marketplaces, FinTech or large CRM work belongs in Custom. Extra modules and integrations are quoted separately.",
      includes: [
        "client portal",
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
      ctaHint: "Opens a short form. Describe the product — we’ll estimate scope.",
      compactCta: "Describe product",
    },
    custom: {
      name: "Custom",
      tagline: "Complex product development",
      price: "custom",
      desc: "For complex SaaS, marketplaces, FinTech, large CRM builds, AI automation and internal systems. Cost is fixed after a written scope review; add-ons are quoted separately.",
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
      ctaHint: "Opens a short form to discuss a non-standard task.",
      compactCta: "Discuss Custom",
    },
  },
  faq: {
    title: "Pricing FAQ",
    items: [
      {
        id: "price-from",
        q: "What does “from” mean?",
        a: "It’s the minimum launch cost. Final price is confirmed after a written scope review and depends on screens, logic, integrations and timeline. Add-ons are quoted separately.",
      },
      {
        id: "pay-now",
        q: "Do I pay right away?",
        a: "No. We discuss the task, clarify scope, then agree on cost and stages before any payment.",
      },
      {
        id: "which-plan",
        q: "Which plan if I’m not sure?",
        a: "Pick Growth or message us. We’ll review your task and tell you if you need a site, bot, CRM, client area or custom automation.",
      },
      {
        id: "start-expand",
        q: "Can I start with Start and expand later?",
        a: "Yes. Often it’s better to launch a simple version, test leads, then add CRM, statuses, client area or integrations.",
      },
      {
        id: "growth-includes",
        q: "What’s in Growth?",
        a: "Growth is for when you need order, not just a form: alerts, statuses, a sheet or mini-CRM and a clear processing flow.",
      },
      {
        id: "when-product",
        q: "When do I need Product?",
        a: "Product fits an MVP with one main user scenario: users, client portal, roles, database and admin panel. Complex SaaS, marketplaces, FinTech or large CRM work belongs in Custom.",
      },
      {
        id: "when-custom",
        q: "When to choose Custom?",
        a: "Custom is for complex SaaS, marketplaces, FinTech, large CRM, AI automation and internal systems. Cost comes after a written scope review; extra modules are quoted separately.",
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
    cabinet: "Client portal",
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
    valueAside: "Not for modules you don’t use yet",
    valueLead:
      "We launch what helps you capture and process leads first. When the business outgrows it — we add CRM, client area, payments, integrations or automation.",
    helpTitle: "Not sure which plan to pick?",
    helpLead:
      "Describe your task in your own words — we’ll suggest whether to start with Start, Growth, Product or Custom.",
    helpCta: "Send a request",
    helpModalCta: "Submit request",
    planScopeCaption: "Launch scope by plan",
    chips: {
      start: ["Landing", "Form", "Telegram"],
      growth: ["Mini-CRM", "Statuses", "Admin"],
      product: ["Client portal", "Payments", "Roles"],
      custom: ["AI bots", "Integrations", "CRM"],
    },
    shortDesc: {
      start: "Fast page and lead launch",
      growth: "Lead system for your team",
      product: "Focused MVP foundation",
      custom: "Custom automation",
    },
  },
};

const COPY_ZH = {
  title: "启动方案",
  subtitle: "对应需求的清晰方案 — 从首批线索到完整 Web 服务",
  includesLabel: "包含内容",
  afterSelect: {
    title: "选定方案后会发生什么",
    steps: [
      "选择适合的方案",
      "明确需求与范围",
      "给出清晰的启动方案",
      "确认后开工",
    ],
    note:
      "价格显示为「起」。最终费用在书面范围确认后确定。额外模块与集成单独报价。确认范围后再付款。",
  },
  compareTitle: "对比方案",
  expandAll: "全部展开",
  collapseAll: "收起",
  cell: {
    yes: "是",
    no: "—",
    option: "可选",
    basic: "基础",
  },
  cellText: {
    support7: "7天",
    support14: "14天",
    support30: "30天",
    supportCustom: "按约定",
  },
  badges: {
    popular: "最受欢迎",
    product: "面向 Web 产品",
  },
  plans: {
    start: {
      name: "Start",
      tagline: "启动获客的落地页",
      ...planPriceStrings("起", PLAN_PRICE_USD.start),
      desc: "当您需要广告、Instagram 或 Telegram 页面 — 并希望快速把咨询汇入一处。",
      includes: [
        "落地页或服务页",
        "线索表单",
        "联系按钮",
        "Telegram/邮件通知",
        "移动端友好布局",
        "基础分析",
        "域名上线",
      ],
      cta: "沟通启动",
      ctaHint: "打开简短表单，Start 方案已预选。",
      compactCta: "沟通 Start",
    },
    growth: {
      name: "Growth",
      tagline: "网站与线索处理系统",
      ...planPriceStrings("起", PLAN_PRICE_USD.growth),
      desc: "当线索增长且来自多渠道 — 团队需要秩序：状态、负责人、表格或迷你 CRM。",
      includes: [
        "网站或多页面",
        "线索表单",
        "Telegram 通知",
        "表格或迷你 CRM",
        "线索状态",
        "基础管理",
        "分析配置",
        "上线协助",
      ],
      cta: "获取报价",
      ctaHint: "打开简短表单，Growth 方案已预选。",
      compactCta: "提交需求",
    },
    product: {
      name: "Product",
      tagline: "聚焦单一核心场景的 MVP 基础",
      ...planPriceStrings("起", PLAN_PRICE_USD.product),
      desc: "当您需要一个围绕单一主要用户场景构建的 MVP：认证、角色、数据库与管理后台。复杂 SaaS、市场平台、金融科技或大型 CRM 属于 Custom。额外模块与集成单独报价。",
      includes: [
        "客户后台",
        "管理后台",
        "注册和授权",
        "用户角色",
        "线索、状态、通知",
        "数据库",
        "集成",
        "支付",
        "响应式 UI",
        "上线准备",
      ],
      cta: "沟通产品",
      ctaHint: "打开简短表单。描述产品 — 我们评估范围。",
      compactCta: "描述产品",
    },
    custom: {
      name: "Custom",
      tagline: "复杂产品开发",
      price: "custom",
      desc: "面向复杂 SaaS、市场平台、金融科技、大型 CRM、AI 自动化与内部系统。费用在书面范围确认后确定；附加模块单独报价。",
      includes: [
        "AI 机器人与助手",
        "线索自动化",
        "服务集成",
        "数据和文档处理",
        "客户后台",
        "复杂角色与流程",
        "定制 CRM",
        "支持与持续迭代",
      ],
      cta: "申请方案",
      ctaHint: "打开表单，讨论非标需求。",
      compactCta: "沟通 Custom",
    },
  },
  faq: {
    title: "价格常见问题",
    items: [
      {
        id: "price-from",
        q: "“起”是什么意思？",
        a: "这是最低启动成本。最终价格在书面范围确认后确定，取决于页面、逻辑、集成与周期。附加功能单独报价。",
      },
      {
        id: "pay-now",
        q: "需要立刻付款吗？",
        a: "不需要。我们先讨论需求、明确范围，再约定费用与阶段后付款。",
      },
      {
        id: "which-plan",
        q: "不确定选哪个方案？",
        a: "选择 Growth 或留言。我们梳理需求，告诉您需要网站、机器人、CRM、客户后台还是定制自动化。",
      },
      {
        id: "start-expand",
        q: "可以从 Start 开始再扩展吗？",
        a: "是的。通常更好先上简单版本、验证线索，再加 CRM、状态、客户后台或集成。",
      },
      {
        id: "growth-includes",
        q: "Growth 包含什么？",
        a: "Growth 适合需要秩序而不只是表单：通知、状态、表格或迷你 CRM，以及清晰处理流。",
      },
      {
        id: "when-product",
        q: "何时需要 Product？",
        a: "Product 适合围绕一个主要用户场景构建的 MVP：用户、客户门户、角色、数据库与管理后台。复杂 SaaS、市场平台、金融科技或大型 CRM 属于 Custom。",
      },
      {
        id: "when-custom",
        q: "何时选择 Custom？",
        a: "Custom 面向复杂 SaaS、市场平台、金融科技、大型 CRM、AI 自动化与内部系统。费用在书面范围确认后给出；额外模块单独报价。",
      },
    ],
  },
  groups: {
    core: "核心",
    crm: "线索与 CRM",
    product: "产品逻辑",
    automation: "自动化与 AI",
    launch: "上线与支持",
  },
  features: {
    landing: "落地页 / 页面",
    responsive: "移动端布局",
    form: "线索表单",
    contactButtons: "联系按钮",
    telegramNotify: "Telegram 通知",
    emailNotify: "邮件通知",
    leadStorage: "线索存储",
    leadTable: "线索表",
    miniCrm: "迷你 CRM",
    statuses: "线索状态",
    history: "处理记录",
    roles: "员工角色",
    cabinet: "客户门户",
    admin: "管理后台",
    auth: "身份认证",
    database: "数据库",
    booking: "在线预约",
    payments: "支付",
    autoNotify: "自动通知",
    integrations: "集成",
    aiBot: "AI 机器人",
    aiLeads: "AI 线索处理",
    documents: "文档处理",
    customFlows: "定制场景",
    domain: "域名协助",
    deploy: "部署",
    guide: "基础说明",
    testing: "场景测试",
    support: "上线后支持",
  },
  footer: {
    valueTitle: "仅支付",
    valueTitleHighlight: "您需要的启动范围",
    valueAside: "不为暂时用不到的模块买单",
    valueLead:
      "我们先交付帮助获客与处理线索的部分。业务成长后再加 CRM、客户后台、支付、集成或自动化。",
    helpTitle: "不确定选哪个方案？",
    helpLead:
      "用自己的话描述需求 — 我们建议从 Start、Growth、Product 还是 Custom 开始。",
    helpCta: "提交需求",
    helpModalCta: "提交需求",
    planScopeCaption: "按方案划分的启动范围",
    chips: {
      start: ["落地页", "表单", "Telegram"],
      growth: ["迷你 CRM", "状态", "管理"],
      product: ["客户门户", "支付", "角色"],
      custom: ["AI 机器人", "集成", "CRM"],
    },
    shortDesc: {
      start: "快速上线页面与线索",
      growth: "团队可用的线索系统",
      product: "聚焦单一核心场景的 MVP",
      custom: "定制自动化",
    },
  },
};

export function pricingCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "ru" ? COPY_RU : COPY_EN;
}

export type PricingCopy = typeof COPY_RU;
