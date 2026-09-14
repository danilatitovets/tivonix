import type { Lang } from "./LangProvider";

export type ProcessStep =
  | { kind: "bullets"; title: string; items: string[] }
  | { kind: "search"; title: string; query: string; hint?: string };

export function landingCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "ru" ? COPY_RU : COPY_EN;
}

const COPY_RU = {
  hero: {
    eyebrow: "FOUNDER-LED PRODUCT ENGINEERING",
    titleLines: ["ПРОЕКТИРУЕМ И ЗАПУСКАЕМ", "ПРОГРАММНЫЕ ПРОДУКТЫ"],
    titleHighlight: "ПРОГРАММНЫЕ ПРОДУКТЫ",
    scrollStages: [
      {
        headline: "Проектируем и запускаем программные продукты — от архитектуры до production",
        headlineLines: ["Проектируем и запускаем", "программные продукты"],
        headlineBefore: "Проектируем и запускаем",
        headlineAccent: "программные продукты",
        headlineAfter: "",
        lead: "TIVONIX берёт на себя product framing, UX, архитектуру, frontend, backend, интеграции, запуск и передачу системы.",
      },
      {
        headline: "Не handoff. Рабочая система.",
        headlineLines: ["Не handoff.", "Рабочая система."],
        headlineBefore: "Не handoff.",
        headlineAccent: "Рабочая система.",
        headlineAfter: "",
        lead: "Клиент покупает не часы дизайнера или разработчика. Он получает одного технического владельца результата.",
      },
      {
        headline: "Роли, workflow, платежи, данные и production",
        headlineLines: ["Роли, workflow,", "платежи и production"],
        headlineBefore: "Роли, workflow,",
        headlineAccent: "платежи и production",
        headlineAfter: "",
        lead: "SaaS, fintech, marketplaces, CRM/ERP-like системы, порталы, AI automation и Telegram products собираются как единый продуктовый контур.",
      },
    ],
    subtitle:
      "Founder-led product engineering для компаний, которым нужен один senior technical owner: от формулировки продукта до production.",
    ctaPrimary: "Обсудить продукт",
    ctaSecondary: "Посмотреть продукты в production",
    micro: "Ответим в течение рабочего дня · Сначала scope и риски · Код, доступы и handover у клиента",
    flowNodes: ["Продукт", "Workflow", "Интеграции", "Production"],
    flowNodeHints: ["Цель", "Роли и шаги", "API / payments", "Запуск"],
    flowTelegramBot: "TIVONIX Brief",
    flowDisplayChips: ["SaaS", "Admin", "Payments"],
    flowAnalysis: {
      headline: "Продукт разобран",
      lead: "Фиксируем пользователей, главный сценарий, роли, данные, интеграции и production-risk до того, как писать код.",
      routeLabel: "Маршрут:",
      routeText: "brief → scope → architecture → build → release.",
      modulesLabel: "Состав:",
    },
    flowTelegramDetail: {
      sourceLabel: "Источник",
      sourceValue: "product brief",
      actionLabel: "Действие",
      actionValue: "сценарий, роли и интеграции вынесены в scope",
    },
    flowCrmDetail: {
      summary: "Рабочая система в production: роли, данные, интеграции и handover не остаются в голове подрядчика.",
    },
    flowScenarios: [
      {
        prompt: "Нужен SaaS MVP с ролями",
        chips: ["SaaS", "Auth", "Admin"],
        notify: "Scope зафиксирован",
        result: {
          kind: "crm" as const,
          title: "Новая заявка",
          lines: [
            { label: "Роли", value: "Client · Admin" },
            { label: "Workflow", value: "Onboarding" },
            { label: "Статус", value: "Scope" },
          ],
        },
      },
      {
        prompt: "Нужен Telegram Mini App",
        chips: ["Telegram", "Payments", "Admin"],
        notify: "Интеграции выделены",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Surface", value: "Mini App" },
            { label: "Payment", value: "Provider" },
            { label: "Admin", value: "Moderation" },
          ],
        },
      },
      {
        prompt: "Нужен marketplace",
        chips: ["Catalog", "Roles", "Booking"],
        notify: "Workflow описан",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Buyer", value: "Search" },
            { label: "Seller", value: "Cabinet" },
            { label: "Admin", value: "Review" },
          ],
        },
      },
      {
        prompt: "Нужна внутренняя система",
        chips: ["RBAC", "Workflows", "Reports"],
        notify: "Границы системы ясны",
        result: {
          kind: "crm" as const,
          title: "Новая заявка",
          lines: [
            { label: "Users", value: "Ops team" },
            { label: "Data", value: "PostgreSQL" },
            { label: "Status", value: "Designed" },
          ],
        },
      },
      {
        prompt: "Хотим AI automation",
        chips: ["AI", "Rules", "Fallback"],
        notify: "Guardrails добавлены",
        result: {
          kind: "crm" as const,
          title: "Новая заявка",
          lines: [
            { label: "Input", value: "Documents" },
            { label: "Control", value: "Server-side" },
            { label: "Status", value: "Safe" },
          ],
        },
      },
    ],
    visualStatus: [
      { main: "Фреймим продукт…", sub: "Users, workflow, risks" },
      { main: "Архитектура собрана", sub: "Data, roles, integrations" },
      { main: "Production release", sub: "Handover and support" },
    ],
  },
  pain: {
    title: "Когда продукт живёт кусками — риск растёт",
    titleLines: ["Когда продукт живёт кусками", "риск растёт"],
    subtitle:
      "Серьёзные системы ломаются не на кнопках. Они ломаются между ролями, данными, интеграциями, платежами, админкой и production-ответственностью.",
    hoverCta: "Как снижаем риск",
    items: [
      {
        title: "Нет технического владельца",
        text: "Дизайн, frontend, backend и интеграции живут у разных людей — никто не отвечает за итоговую систему целиком.",
        solution: "TIVONIX ведёт продукт как один контур: scope, UX, архитектура, реализация, запуск и передача.",
      },
      {
        title: "Workflow не продуман",
        text: "Экраны выглядят нормально, но реальные роли, статусы, ошибки и крайние случаи появляются слишком поздно.",
        solution: "Сначала описываем пользователей, основной сценарий, состояния, ограничения и ручные fallback-процессы.",
      },
      {
        title: "Интеграции становятся сюрпризом",
        text: "Платежи, Telegram, CRM, email, таблицы, старые API и аналитика всплывают после оценки и ломают срок.",
        solution: "Выносим интеграции в scope заранее: что критично для первой версии, что можно отложить, где нужны заглушки.",
      },
      {
        title: "Handover откладывают на потом",
        text: "Проект вроде запущен, но код, доступы, инструкция, переменные и ownership остаются неясными.",
        solution: "Передача кода, доступов, окружений и правил поддержки закладывается до релиза, а не после него.",
      },
    ],
  },
  offer: {
    title: "Product engineering responsibility",
    featured: {
      badge: "TIVONIX",
      title: "Один владелец результата: от product framing до production",
      text: "Собираем системы, где пользовательские роли, workflow, backend, данные, интеграции, UI и запуск работают как один продукт.",
      linkText: "Обсудить продукт",
      footer: "Сначала фиксируем объём, риски и первый production-ready сценарий",
    },
    metrics: [
      {
        title: "SaaS и MVP",
        text: "Первый рабочий продукт с пользователями, ролями, данными, admin и понятной траекторией развития.",
      },
      {
        title: "FinTech и платежные flows",
        text: "Каталоги, кошельки, платежные сценарии, вторичный рынок, operator/admin logic и проверяемые состояния.",
      },
      {
        title: "Marketplaces и portals",
        text: "Многосторонние продукты: роли, каталоги, заявки, booking, кабинеты, модерация и админ-панели.",
      },
      {
        title: "Internal platforms",
        text: "CRM/ERP-like системы, операционные панели, отчёты, audit trail, notifications и поддержка процессов.",
      },
      {
        title: "AI и automation",
        text: "AI как production capability: server-side keys, validation, fallback, cost control и понятная ответственность.",
      },
    ],
    ctaBar: {
      title: "Соберём не презентацию продукта, а рабочую систему с понятным владельцем результата.",
      primary: "Обсудить продукт",
      secondary: "Собрать brief",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — AI в продуктах для бизнеса",
    centerBadge: "TIVONIX AI",
    headline: "AI как часть рабочей системы, а не демо-эффект",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["Triage", "Документы", "Guardrails", "CRM", "Support"],
  },
  flow: {
    label: "Системное мышление",
    title: "Не экран за экраном. Сценарий за сценарием.",
    titleMuted:
      "Перед разработкой фиксируем, кто пользуется системой, какие решения она принимает, где данные меняют статус и что должно произойти при ошибке.",
    steps: [
      {
        label: "Users",
        title: "Пользователи и роли",
        desc: "Клиент, оператор, админ, партнёр, менеджер",
      },
      {
        label: "Workflow",
        title: "Главный путь продукта",
        desc: "От входа пользователя до результата",
      },
      {
        label: "Data",
        title: "Данные и состояния",
        desc: "Статусы, ledger, история, audit trail",
      },
      {
        label: "Integrations",
        title: "Интеграции и границы",
        desc: "Payments, Telegram, CRM, email, API",
      },
      {
        label: "Release",
        title: "Production и handover",
        desc: "Деплой, проверка, доступы, поддержка",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "Commercial model",
    title: "Complex systems are scoped. Launch packages stay separate.",
    more: "Подробнее",
  },
  compare: {
    title: "Обычный подрядчик и TIVONIX",
    subtitle: "Разница не в количестве экранов, а в том, кто отвечает за продуктовую логику, backend, интеграции и запуск.",
    regular: {
      title: "Обычный handoff",
      headline: "Красивые экраны — дальше вручную",
      items: [
        "UI передан",
        "Backend отдельно",
        "Интеграции потом",
        "Статусы не описаны",
        "Handover неясен",
      ],
    },
    chaosTags: ["Нет владельца", "Scope drift", "Риски поздно", "Production болит"],
    tivonix: {
      title: "TIVONIX product engineering",
      headline: "Один контур результата",
      badge: "Scope, architecture, UX, code, integrations and release stay connected",
      items: [
        "Главный сценарий сформулирован",
        "Роли и данные описаны заранее",
        "Backend и admin входят в план",
        "Интеграции вынесены в scope",
        "Production и handover проверяются",
      ],
    },
    cta: "Разобрать продукт",
  },
  cases: {
    badge: "Новый кейс",
    cta: "Хочу похожую систему",
    viewCase: "Смотреть кейс",
    openProduct: "Открыть продукт",
    discussSimilar: "Есть похожая задача",
    spliton: {
      need: "Нужна была финтех-платформа для инвестиций в музыкальные активы — не лендинг, а полноценный продукт",
      done: "Собрали каталог релизов, покупку долей, кошелёк, вторичный рынок, юридические согласия и админ-панель",
      modules: [
        "Каталог релизов",
        "Покупка долей",
        "Кошелёк",
        "Вторичный рынок",
        "Юр. согласия",
        "Админ-панель",
        "i18n RU/EN/ES/PT",
        "Выплаты",
      ],
    },
    tivonixpanel: {
      need: "Нужна была партнёрская панель — кабинет, где агентства и фрилансеры ведут сделки, статусы и выплаты без хаоса в чатах",
      done: "Собрали логин, онбординг, дашборд сделок, модели Referral / White-label и трекинг проектов с выплатами",
      modules: [
        "Логин",
        "Онбординг",
        "Дашборд",
        "Referral",
        "White-label",
        "Сделки",
        "Проекты",
        "Выплаты",
      ],
      ownProduct: "Собственный продукт TIVONIX",
    },
  },
  audience: {
    badge: "TIVONIX",
    title: "Кому помогаем",
    subtitle:
      "Тем, кому нужен не просто красивый сайт, а рабочая система: заявки, записи, статусы, оплата или кабинет.",
    callouts: {
      left: {
        text: "Заявка у менеджера за минуту — не в переписке и не в таблице на завтра.",
      },
      right: {
        text: "Instagram, Telegram, сайт и звонки — все обращения в одном процессе.",
      },
    },
    pins: [
      { id: "masters", label: "Мастера", lat: 55.75, lng: 37.62 },
      { id: "studios", label: "Студии", lat: 48.85, lng: 2.35 },
      { id: "autoservice", label: "Автосервисы", lat: 40.71, lng: -74.01 },
      { id: "schools", label: "Школы", lat: 51.5, lng: -0.12 },
      { id: "startups", label: "Стартапы", lat: 1.35, lng: 103.82 },
      { id: "agencies", label: "Агентства", lat: 25.2, lng: 55.27 },
    ],
    marquee: [
      "Мастера",
      "Студии",
      "Салоны",
      "Автосервисы",
      "Онлайн-школы",
      "Эксперты",
      "Стартапы",
      "Агентства",
      "Малый бизнес",
      "Локальные услуги",
    ],
    pillars: [
      {
        title: "Заявки из любых каналов",
        text: "Реклама, мессенджеры, сайт — всё собираем в одну систему.",
      },
      {
        title: "Быстрый ответ",
        text: "Уведомления в Telegram, статусы — клиент не ждёт и не уходит.",
      },
      {
        title: "Рост без хаоса",
        text: "CRM, админка и автоматизация — когда заявок становится больше.",
      },
    ],
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Посмотреть, что делаем",
    items: [
      { title: "Салоны, студии и мастера", desc: "Запись, заявки и напоминания без ручного хаоса" },
      { title: "Автосервисы и локальные услуги", desc: "Быстрый приём заявок с рекламы и понятный статус по каждому клиенту" },
      { title: "Онлайн-школы и курсы", desc: "Регистрация, оплата, кабинет ученика и статусы обучения" },
      { title: "Эксперты и консультанты", desc: "Заявки с лендинга сразу в Telegram и CRM" },
      { title: "Стартапы и MVP", desc: "Быстрый запуск продукта с нужными модулями, без лишнего" },
      { title: "Агентства и команды", desc: "Лендинги под рекламу с рабочей воронкой заявок" },
      { title: "Малый бизнес", desc: "Когда заявки идут вручную — и это уже мешает работать" },
    ],
  },
  process: {
    title: "Как снижаем риск до запуска",
    steps: [
      {
        kind: "bullets",
        title: "Формулируем продукт",
        items: [
          "Определяем пользователя, бизнес-контекст, главный workflow и критерий готовности первой версии.",
        ],
      },
      {
        kind: "bullets",
        title: "Фиксируем scope и риски",
        items: [
          "Письменно разделяем must-have, later, интеграции, ограничения, сроки и стоимость этапа.",
        ],
      },
      {
        kind: "bullets",
        title: "Проектируем UX и архитектуру",
        items: [
          "Связываем экраны, роли, данные, состояния, API и production assumptions до активной разработки.",
        ],
      },
      {
        kind: "bullets",
        title: "Разрабатываем рабочими инкрементами",
        items: [
          "Показываем не картинки, а работающие части системы: UI, backend, admin, integrations, states.",
        ],
      },
      {
        kind: "bullets",
        title: "Проверяем release-critical paths",
        items: [
          "Проверяем мобильный UX, доступы, формы, роли, платежи, интеграции, error states и SEO.",
        ],
      },
      {
        kind: "bullets",
        title: "Передаём систему",
        items: [
          "Передаём код, доступы, env assumptions и инструкции. Поддержка и развитие фиксируются отдельно.",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "Расскажите, какую систему нужно запустить",
    subtitle:
      "Опишите продукт, пользователей, workflow и интеграции. В ответ пришлём следующий шаг, риски, срок и диапазон стоимости.",
    ctaPrimary: "Отправить brief",
    ctaSecondary: "Посмотреть product proof",
    micro: "Ответим в течение рабочего дня. Созвон не обязателен. Контакты не передаём третьим лицам.",
  },
  packages: {
    sectionTitle: "Три направления под вашу задачу",
    launch: {
      title: "Сайт под рекламу",
      subtitle: "Лендинг + форма + Telegram",
      forWho: "Когда нужно быстро принимать заявки с рекламы, Instagram или сайта.",
      cta: "Рассчитать запуск",
      bullets: [
        "Страница под рекламу",
        "Форма заявки",
        "Кнопки связи",
        "Уведомления в Telegram или email",
        "Адаптив под телефон",
        "Базовая аналитика",
        "Запуск",
      ],
    },
    service: {
      title: "Личный кабинет и админка",
      subtitle: "Кабинет клиента + панель команды + оплата",
      forWho: "Когда нужен полноценный веб-сервис: регистрация, кабинет, статусы, оплата.",
      cta: "Обсудить сервис",
      bullets: [
        "Регистрация",
        "Личный кабинет",
        "Админ-панель",
        "Роли пользователей",
        "Заявки и статусы",
        "Уведомления",
        "Оплата",
        "Интеграции",
      ],
    },
    automation: {
      title: "Автоматизация",
      subtitle: "Меньше ручных действий",
      forWho: "Когда заявки, таблицы, отчёты и уведомления сейчас ведутся вручную.",
      cta: "Автоматизировать процесс",
      bullets: [
        "Автоматизация заявок",
        "Связка Telegram, email и таблиц",
        "Мини-CRM",
        "Статусы задач",
        "Уведомления команде",
        "Отчёты",
        "Интеграции",
      ],
    },
  },
} as const;

const COPY_EN = {
  hero: {
    eyebrow: "FOUNDER-LED PRODUCT ENGINEERING",
    titleLines: ["WE DEFINE, BUILD AND SHIP", "REAL SOFTWARE SYSTEMS"],
    titleHighlight: "REAL SOFTWARE SYSTEMS",
    scrollStages: [
      {
        headline: "We define, build and ship real software systems",
        headlineLines: ["We define, build and ship", "real software systems"],
        headlineBefore: "We define, build and ship",
        headlineAccent: "real software systems",
        headlineAfter: "",
        lead: "TIVONIX covers product framing, UX, architecture, frontend, backend, integrations, production and handover.",
      },
      {
        headline: "Not handoff. A working system.",
        headlineLines: ["Not handoff.", "A working system."],
        headlineBefore: "Not handoff.",
        headlineAccent: "A working system.",
        headlineAfter: "",
        lead: "You are not buying disconnected design or engineering hours. You get one senior technical owner for the outcome.",
      },
      {
        headline: "Roles, workflows, payments, data and production",
        headlineLines: ["Roles, workflows,", "payments and production"],
        headlineBefore: "Roles, workflows,",
        headlineAccent: "payments and production",
        headlineAfter: "",
        lead: "SaaS, fintech, marketplaces, internal platforms, AI automation and Telegram products are treated as one product system.",
      },
    ],
    subtitle:
      "Founder-led product engineering for companies that need one senior technical owner from product framing to production.",
    ctaPrimary: "Discuss the product",
    ctaSecondary: "See products in production",
    micro: "Reply within one business day · Scope and risks first · Code, access and handover included",
    flowNodes: ["Product", "Workflow", "Integrations", "Production"],
    flowNodeHints: ["Goal", "Roles and steps", "API / payments", "Release"],
    flowTelegramBot: "TIVONIX Brief",
    flowDisplayChips: ["SaaS", "Admin", "Payments"],
    flowAnalysis: {
      headline: "Product framed",
      lead: "We define users, the core workflow, roles, data, integrations and production risk before writing code.",
      routeLabel: "Route:",
      routeText: "brief → scope → architecture → build → release.",
      modulesLabel: "Stack:",
    },
    flowTelegramDetail: {
      sourceLabel: "Source",
      sourceValue: "product brief",
      actionLabel: "Action",
      actionValue: "workflow, roles and integrations are scoped",
    },
    flowCrmDetail: {
      summary: "A production system: roles, data, integrations and handover do not stay in the contractor’s head.",
    },
    flowScenarios: [
      {
        prompt: "Need a SaaS MVP with roles",
        chips: ["SaaS", "Auth", "Admin"],
        notify: "Scope locked",
        result: {
          kind: "crm" as const,
          title: "Product scope",
          lines: [
            { label: "Roles", value: "Client · Admin" },
            { label: "Workflow", value: "Onboarding" },
            { label: "Status", value: "Scoped" },
          ],
        },
      },
      {
        prompt: "Need a Telegram Mini App",
        chips: ["Telegram", "Payments", "Admin"],
        notify: "Integrations mapped",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Surface", value: "Mini App" },
            { label: "Payment", value: "Provider" },
            { label: "Admin", value: "Moderation" },
          ],
        },
      },
      {
        prompt: "Need a marketplace",
        chips: ["Catalog", "Roles", "Booking"],
        notify: "Workflow mapped",
        result: {
          kind: "telegram" as const,
          title: "Marketplace",
          lines: [
            { label: "Buyer", value: "Search" },
            { label: "Seller", value: "Portal" },
            { label: "Admin", value: "Review" },
          ],
        },
      },
      {
        prompt: "Need an internal platform",
        chips: ["RBAC", "Workflows", "Reports"],
        notify: "System boundaries clear",
        result: {
          kind: "crm" as const,
          title: "Internal OS",
          lines: [
            { label: "Users", value: "Ops team" },
            { label: "Data", value: "PostgreSQL" },
            { label: "Status", value: "Designed" },
          ],
        },
      },
      {
        prompt: "Want AI automation",
        chips: ["AI", "Rules", "Fallback"],
        notify: "Guardrails added",
        result: {
          kind: "crm" as const,
          title: "AI workflow",
          lines: [
            { label: "Input", value: "Documents" },
            { label: "Control", value: "Server-side" },
            { label: "Status", value: "Safe" },
          ],
        },
      },
    ],
    visualStatus: [
      { main: "Framing product…", sub: "Users, workflow, risks" },
      { main: "Architecture mapped", sub: "Data, roles, integrations" },
      { main: "Production release", sub: "Handover and support" },
    ],
  },
  pain: {
    title: "When the product lives in pieces, risk grows",
    titleLines: ["When the product lives in pieces", "risk grows"],
    subtitle:
      "Serious systems rarely fail because of one button. They fail between roles, data, integrations, payments, admin and production ownership.",
    hoverCta: "How we reduce risk",
    items: [
      {
        title: "No technical owner",
        text: "Design, frontend, backend and integrations live with different people — nobody owns the system as a whole.",
        solution: "TIVONIX keeps scope, UX, architecture, implementation, release and handover connected.",
      },
      {
        title: "Workflow comes too late",
        text: "Screens look fine, but real roles, states, errors and edge cases appear after development starts.",
        solution: "We map users, the core scenario, states, constraints and manual fallbacks before build.",
      },
      {
        title: "Integrations surprise the plan",
        text: "Payments, Telegram, CRM, email, spreadsheets, legacy APIs and analytics show up after the estimate.",
        solution: "We scope integrations early: what is critical now, what can wait, and where mocks or fallbacks are needed.",
      },
      {
        title: "Handover is unclear",
        text: "A project is live, but code, access, env variables, instructions and support ownership are still fuzzy.",
        solution: "Code, access, environment assumptions and support rules are part of the release plan.",
      },
    ],
  },
  offer: {
    title: "Product engineering responsibility",
    featured: {
      badge: "TIVONIX",
      title: "One owner for the outcome: from product framing to production",
      text: "We build systems where user roles, workflows, backend, data, integrations, UI and launch work as one product.",
      linkText: "Discuss the product",
      footer: "Scope, risks and the first production-ready scenario come before build",
    },
    metrics: [
      {
        title: "SaaS and MVP",
        text: "First working products with users, roles, data, admin and a clear path to evolve.",
      },
      {
        title: "FinTech and payment flows",
        text: "Catalogs, wallets, payment scenarios, secondary markets, operator logic and verifiable states.",
      },
      {
        title: "Marketplaces and portals",
        text: "Multi-sided products: roles, catalogs, requests, booking, portals, moderation and admin panels.",
      },
      {
        title: "Internal platforms",
        text: "CRM/ERP-like systems, operations panels, reporting, audit trails, notifications and process support.",
      },
      {
        title: "AI and automation",
        text: "AI as a production capability: server-side keys, validation, fallback, cost control and clear ownership.",
      },
    ],
    ctaBar: {
      title: "We build working product systems, not a deck that still needs engineering.",
      primary: "Discuss the product",
      secondary: "Send a brief",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — AI in business products",
    centerBadge: "TIVONIX AI",
    headline: "AI as part of the system, not a demo effect",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["Triage", "Documents", "Guardrails", "CRM", "Support"],
  },
  flow: {
    label: "Systems thinking",
    title: "Not screen by screen. Scenario by scenario.",
    titleMuted:
      "Before build we define who uses the system, what decisions it makes, where data changes status and what should happen when something fails.",
    steps: [
      {
        label: "Users",
        title: "Users and roles",
        desc: "Customer, operator, admin, partner, manager",
      },
      {
        label: "Workflow",
        title: "Core product path",
        desc: "From user entry to result",
      },
      {
        label: "Data",
        title: "Data and states",
        desc: "Statuses, ledger, history, audit trail",
      },
      {
        label: "Integrations",
        title: "Integrations and boundaries",
        desc: "Payments, Telegram, CRM, email, API",
      },
      {
        label: "Release",
        title: "Production and handover",
        desc: "Deploy, checks, access, support",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "Commercial model",
    title: "Complex systems are scoped. Launch packages stay separate.",
    more: "Learn more",
  },
  compare: {
    title: "Typical handoff vs TIVONIX",
    subtitle: "The difference is not screen count. It is who owns product logic, backend, integrations and release.",
    regular: {
      title: "Typical handoff",
      headline: "Pretty screens — then manual work",
      items: [
        "UI handed off",
        "Backend elsewhere",
        "Integrations later",
        "States unclear",
        "Handover fuzzy",
      ],
    },
    chaosTags: ["No owner", "Scope drift", "Late risks", "Production pain"],
    tivonix: {
      title: "TIVONIX product engineering",
      headline: "One outcome loop",
      badge: "Scope, architecture, UX, code, integrations and release stay connected",
      items: [
        "Core scenario is defined",
        "Roles and data are mapped early",
        "Backend and admin are planned",
        "Integrations are scoped",
        "Production and handover are checked",
      ],
    },
    cta: "Map the product",
  },
  cases: {
    badge: "New case",
    cta: "I want a similar system",
    viewCase: "View case",
    openProduct: "Open product",
    discussSimilar: "Similar task",
    spliton: {
      need: "Needed a fintech platform for music-asset investing — a full product, not a landing page",
      done: "Built release catalog, share purchases, wallet, secondary market, legal consents and admin panel",
      modules: [
        "Release catalog",
        "Share purchases",
        "Wallet",
        "Secondary market",
        "Legal consents",
        "Admin panel",
        "i18n RU/EN/ES/PT",
        "Payouts",
      ],
    },
    tivonixpanel: {
      need: "Needed a partner panel — a dashboard where agencies and freelancers track deals, statuses and payouts without chat chaos",
      done: "Built login, onboarding, deals dashboard, Referral / White-label models and project payout tracking",
      modules: [
        "Login",
        "Onboarding",
        "Dashboard",
        "Referral",
        "White-label",
        "Deals",
        "Projects",
        "Payouts",
      ],
      ownProduct: "TIVONIX own product",
    },
  },
  audience: {
    badge: "TIVONIX",
    title: "Who we help",
    subtitle:
      "Businesses that need more than a pretty website — a working system: leads, bookings, statuses, payments or a client portal.",
    callouts: {
      left: {
        text: "Leads reach the manager in under a minute — not buried in chats or tomorrow’s spreadsheet.",
      },
      right: {
        text: "Instagram, Telegram, website and calls — every channel in one flow.",
      },
    },
    pins: [
      { id: "masters", label: "Masters", lat: 55.75, lng: 37.62 },
      { id: "studios", label: "Studios", lat: 48.85, lng: 2.35 },
      { id: "autoservice", label: "Auto shops", lat: 40.71, lng: -74.01 },
      { id: "schools", label: "Online schools", lat: 51.5, lng: -0.12 },
      { id: "startups", label: "Startups", lat: 1.35, lng: 103.82 },
      { id: "agencies", label: "Agencies", lat: 25.2, lng: 55.27 },
    ],
    marquee: [
      "Masters",
      "Studios",
      "Salons",
      "Auto shops",
      "Online schools",
      "Experts",
      "Startups",
      "Agencies",
      "Small business",
      "Local services",
    ],
    pillars: [
      {
        title: "Leads from any channel",
        text: "Ads, messengers, website — we pull it into one system.",
      },
      {
        title: "Fast response",
        text: "Telegram alerts, statuses — clients don’t wait and leave.",
      },
      {
        title: "Growth without chaos",
        text: "CRM, admin and automation — when lead volume grows.",
      },
    ],
    ctaPrimary: "Discuss the project",
    ctaSecondary: "See what we build",
    items: [
      { title: "Salons, studios and masters", desc: "Booking, leads and reminders without manual chaos" },
      { title: "Auto shops and local services", desc: "Fast lead intake from ads and a clear status for every client" },
      { title: "Online schools and courses", desc: "Registration, payments, student portal and learning statuses" },
      { title: "Experts and consultants", desc: "Leads from landing straight to Telegram and CRM" },
      { title: "Startups and MVPs", desc: "Fast product launch with the modules you need — nothing extra" },
      { title: "Agencies and teams", desc: "Ad landing pages with a working lead funnel" },
      { title: "Small business", desc: "When leads are handled manually — and that’s already getting in the way" },
    ],
  },
  process: {
    title: "How we reduce risk before launch",
    steps: [
      {
        kind: "bullets",
        title: "Frame the product",
        items: [
          "We define the user, business context, core workflow and first-version readiness criteria.",
        ],
      },
      {
        kind: "bullets",
        title: "Lock scope and risks",
        items: [
          "We separate must-have, later, integrations, constraints, timeline and stage cost in writing.",
        ],
      },
      {
        kind: "bullets",
        title: "Design UX and architecture",
        items: [
          "We connect screens, roles, data, states, APIs and production assumptions before heavy build.",
        ],
      },
      {
        kind: "bullets",
        title: "Build working increments",
        items: [
          "We show working parts of the system: UI, backend, admin, integrations and states.",
        ],
      },
      {
        kind: "bullets",
        title: "Check release-critical paths",
        items: [
          "We check mobile UX, access, forms, roles, payments, integrations, error states and SEO.",
        ],
      },
      {
        kind: "bullets",
        title: "Hand over the system",
        items: [
          "We hand over code, access, environment assumptions and instructions. Support and evolution are agreed separately.",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "Tell us what system you need to launch",
    subtitle:
      "Describe the product, users, workflow and integrations. We’ll reply with the next step, risks, timeline and cost range.",
    ctaPrimary: "Send a brief",
    ctaSecondary: "See product proof",
    micro: "We reply within a business day. A call is optional. We don’t share contacts with third parties.",
  },
  packages: {
    sectionTitle: "Three directions for your task",
    launch: {
      title: "Ad landing page",
      subtitle: "Landing + form + Telegram",
      forWho: "When you need to capture leads from ads, Instagram or your website fast.",
      cta: "Estimate launch",
      bullets: [
        "Ad-ready page",
        "Lead form",
        "Contact buttons",
        "Telegram or email alerts",
        "Mobile responsive",
        "Basic analytics",
        "Launch",
      ],
    },
    service: {
      title: "Client portal and admin",
      subtitle: "Client portal + team panel + payments",
      forWho: "When you need a full web service: registration, client portal, statuses, payments.",
      cta: "Discuss the service",
      bullets: [
        "Registration",
        "Client portal",
        "Admin panel",
        "User roles",
        "Leads and statuses",
        "Notifications",
        "Payments",
        "Integrations",
      ],
    },
    automation: {
      title: "Automation",
      subtitle: "Less manual work",
      forWho: "When leads, sheets, reports and alerts are still handled manually.",
      cta: "Automate the process",
      bullets: [
        "Lead automation",
        "Telegram, email and sheets wiring",
        "Mini-CRM",
        "Task statuses",
        "Team notifications",
        "Reports",
        "Integrations",
      ],
    },
  },
} as const;

const COPY_ZH = {
  hero: {
    eyebrow: "创始人主导的产品工程",
    titleLines: ["定义、构建并上线", "真正的软件系统"],
    titleHighlight: "真正的软件系统",
    scrollStages: [
      {
        headline: "定义、构建并上线真正的软件系统",
        headlineLines: ["定义、构建并上线", "真正的软件系统"],
        headlineBefore: "定义、构建并上线",
        headlineAccent: "真正的软件系统",
        headlineAfter: "",
        lead: "TIVONIX 覆盖产品梳理、UX、架构、前端、后端、集成、production 与交接。",
      },
      {
        headline: "不是 handoff，而是可运行系统",
        headlineLines: ["不是 handoff，", "而是可运行系统"],
        headlineBefore: "不是 handoff，",
        headlineAccent: "而是可运行系统",
        headlineAfter: "",
        lead: "客户买到的不是分散的设计或开发工时，而是一个高级技术负责人对结果负责。",
      },
      {
        headline: "角色、流程、支付、数据与上线",
        headlineLines: ["角色、流程、", "支付、数据与上线"],
        headlineBefore: "角色、流程、",
        headlineAccent: "支付、数据与上线",
        headlineAfter: "",
        lead: "SaaS、金融科技、市场平台、内部系统、AI 自动化与 Telegram 产品都作为一套产品系统来设计。",
      },
    ],
    subtitle:
      "面向需要一个高级技术负责人从产品定义到 production 的公司，提供 founder-led product engineering。",
    ctaPrimary: "沟通产品",
    ctaSecondary: "查看线上产品",
    micro: "一个工作日内回复 · 先确认范围与风险 · 交付代码、权限与说明",
    flowNodes: ["产品", "流程", "集成", "上线"],
    flowNodeHints: ["目标", "角色与步骤", "API / 支付", "Release"],
    flowTelegramBot: "TIVONIX Brief",
    flowDisplayChips: ["SaaS", "Admin", "Payments"],
    flowAnalysis: {
      headline: "产品已梳理",
      lead: "在写代码前确认用户、核心流程、角色、数据、集成与上线风险。",
      routeLabel: "路径：",
      routeText: "brief → scope → architecture → build → release。",
      modulesLabel: "模块：",
    },
    flowTelegramDetail: {
      sourceLabel: "来源",
      sourceValue: "product brief",
      actionLabel: "动作",
      actionValue: "流程、角色与集成已进入范围",
    },
    flowCrmDetail: {
      summary: "线上系统：角色、数据、集成与交接不留在承包方脑子里。",
    },
    flowScenarios: [
      {
        prompt: "需要投放用落地页",
        chips: ["落地页", "表单", "Telegram"],
        notify: "通知已发送到 Telegram",
        result: {
          kind: "crm" as const,
          title: "新线索",
          lines: [
            { label: "姓名", value: "Anna" },
            { label: "服务", value: "落地页" },
            { label: "状态", value: "新建" },
          ],
        },
      },
      {
        prompt: "想要线索用 Telegram 机器人",
        chips: ["Telegram", "自动化", "通知"],
        notify: "通知已发送到 Telegram",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "消息", value: "来自网站的新线索" },
            { label: "姓名", value: "Anna" },
            { label: "电话", value: "+1 ••• •• 42" },
          ],
        },
      },
      {
        prompt: "需要网站 + Telegram 通知",
        chips: ["落地页", "表单", "Telegram", "通知"],
        notify: "通知已发送到 Telegram",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "消息", value: "来自网站表单的线索" },
            { label: "姓名", value: "Maria" },
            { label: "服务", value: "咨询" },
          ],
        },
      },
      {
        prompt: "需要客户预约系统",
        chips: ["表单", "CRM", "通知"],
        notify: "线索已写入 CRM",
        result: {
          kind: "crm" as const,
          title: "新线索",
          lines: [
            { label: "姓名", value: "Elena" },
            { label: "服务", value: "预约" },
            { label: "状态", value: "新建" },
          ],
        },
      },
      {
        prompt: "想自动化处理线索",
        chips: ["自动化", "CRM", "Telegram"],
        notify: "状态已更新",
        result: {
          kind: "crm" as const,
          title: "新线索",
          lines: [
            { label: "姓名", value: "Dmitry" },
            { label: "服务", value: "自动化" },
            { label: "状态", value: "进行中" },
          ],
        },
      },
    ],
    visualStatus: [
      { main: "正在搭建您的线索系统…", sub: "落地页、表单、Telegram" },
      { main: "已收到新线索", sub: "通知已发送到 Telegram" },
      { main: "线索已进入迷你 CRM", sub: "状态：进行中" },
    ],
  },
  pain: {
    title: "产品被拆成碎片时，风险就会增长",
    titleLines: ["产品被拆成碎片时", "风险就会增长"],
    subtitle:
      "复杂系统通常不是因为一个按钮失败，而是在角色、数据、集成、支付、管理端与上线责任之间断开。",
    hoverCta: "我们如何降低风险",
    items: [
      {
        title: "没有技术负责人",
        text: "设计、前端、后端和集成分散在不同人手里，没人对整套系统负责。",
        solution: "TIVONIX 把 scope、UX、架构、开发、上线与交接连成一个结果。",
      },
      {
        title: "流程定义太晚",
        text: "界面看起来不错，但真实角色、状态、错误与边界情况在开发后才出现。",
        solution: "开发前先梳理用户、核心场景、状态、限制与人工 fallback。",
      },
      {
        title: "集成变成意外",
        text: "支付、Telegram、CRM、邮件、表格、旧 API 与分析在估算后才浮出水面。",
        solution: "提前划定集成范围：第一版必须做什么，什么可以后置，哪里需要 fallback。",
      },
      {
        title: "交接不清晰",
        text: "项目上线了，但代码、权限、环境变量、说明与支持责任仍不明确。",
        solution: "代码、权限、环境假设与支持规则都进入上线计划。",
      },
    ],
  },
  offer: {
    title: "产品工程责任",
    featured: {
      badge: "TIVONIX",
      title: "一个结果负责人：从产品梳理到 production",
      text: "构建角色、流程、后端、数据、集成、界面与上线能一起工作的产品系统。",
      linkText: "沟通产品",
      footer: "先确认范围、风险与第一条 production-ready 流程",
    },
    metrics: [
      {
        title: "SaaS 与 MVP",
        text: "带用户、角色、数据、管理端与可演进路径的第一版产品。",
      },
      {
        title: "金融科技与支付流程",
        text: "目录、钱包、支付场景、二级市场、运营逻辑与可验证状态。",
      },
      {
        title: "市场平台与门户",
        text: "多方产品：角色、目录、请求、预约、门户、审核与管理端。",
      },
      {
        title: "内部业务系统",
        text: "CRM/类 ERP、运营面板、报表、审计轨迹、通知与流程支持。",
      },
      {
        title: "AI 与自动化",
        text: "把 AI 当作生产能力：服务端密钥、校验、fallback、成本控制与责任边界。",
      },
    ],
    ctaBar: {
      title: "交付可运行产品系统，而不是还需要重新工程化的展示稿。",
      primary: "沟通产品",
      secondary: "发送 brief",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — 业务产品中的 AI",
    centerBadge: "TIVONIX AI",
    headline: "AI 是系统能力，不是演示效果",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["分流", "文档", "Guardrails", "CRM", "支持"],
  },
  flow: {
    label: "系统思维",
    title: "不是逐屏做，而是逐场景做。",
    titleMuted:
      "开发前确认谁在使用系统、系统做出哪些决策、数据在哪里变更状态，以及失败时如何处理。",
    steps: [
      {
        label: "Users",
        title: "用户与角色",
        desc: "客户、运营、管理员、合作伙伴、经理",
      },
      {
        label: "Workflow",
        title: "核心产品路径",
        desc: "从用户进入到结果",
      },
      {
        label: "Data",
        title: "数据与状态",
        desc: "状态、ledger、历史、审计轨迹",
      },
      {
        label: "Integrations",
        title: "集成与边界",
        desc: "支付、Telegram、CRM、邮件、API",
      },
      {
        label: "Release",
        title: "Production 与交接",
        desc: "部署、检查、权限、支持",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "商业模式",
    title: "复杂系统按范围评估；Launch packages 单独保留",
    more: "了解更多",
  },
  compare: {
    title: "普通 handoff vs TIVONIX",
    subtitle: "差别不在页面数量，而是谁负责产品逻辑、后端、集成与上线。",
    regular: {
      title: "普通 handoff",
      headline: "漂亮界面之后 — 仍靠手工",
      items: [
        "UI 已交付",
        "后端另找",
        "集成以后再说",
        "状态不清晰",
        "交接模糊",
      ],
    },
    chaosTags: ["无负责人", "范围漂移", "风险太晚", "上线痛苦"],
    tivonix: {
      title: "TIVONIX 产品工程",
      headline: "一个结果闭环",
      badge: "Scope、架构、UX、代码、集成与上线保持连接",
      items: [
        "核心场景已定义",
        "角色与数据提前梳理",
        "后端与管理端进入计划",
        "集成进入 scope",
        "Production 与交接被检查",
      ],
    },
    cta: "梳理产品",
  },
  cases: {
    badge: "最新案例",
    cta: "我也想要类似系统",
    viewCase: "查看案例",
    openProduct: "打开产品",
    discussSimilar: "类似需求",
    spliton: {
      need: "需要音乐资产投资金融科技平台 — 完整产品，不是落地页",
      done: "交付发行目录、份额购买、钱包、二级市场、法律同意与管理后台",
      modules: [
        "发行目录",
        "份额购买",
        "钱包",
        "二级市场",
        "法律同意",
        "管理后台",
        "i18n RU/EN/ES/PT",
        "结算",
      ],
    },
    tivonixpanel: {
      need: "需要合作伙伴面板 — 代理与自由职业者可跟踪成交、状态与结算，告别聊天混乱",
      done: "交付登录、引导、成交仪表盘、Referral / White-label 模式与项目结算跟踪",
      modules: [
        "登录",
        "引导开通",
        "仪表盘",
        "Referral",
        "White-label",
        "成交",
        "项目",
        "结算",
      ],
      ownProduct: "TIVONIX 自有产品",
    },
  },
  audience: {
    badge: "TIVONIX",
    title: "我们服务谁",
    subtitle:
      "需要的不只是好看官网，而是能跑通业务的系统：线索、预约、状态、支付或客户门户。",
    callouts: {
      left: {
        text: "线索一分钟内到达经理 — 不会埋在聊天或明天的表格里。",
      },
      right: {
        text: "Instagram、Telegram、网站与电话 — 所有渠道一条链路。",
      },
    },
    pins: [
      { id: "masters", label: "Masters", lat: 55.75, lng: 37.62 },
      { id: "studios", label: "Studios", lat: 48.85, lng: 2.35 },
      { id: "autoservice", label: "汽修店", lat: 40.71, lng: -74.01 },
      { id: "schools", label: "在线学校", lat: 51.5, lng: -0.12 },
      { id: "startups", label: "Startups", lat: 1.35, lng: 103.82 },
      { id: "agencies", label: "Agencies", lat: 25.2, lng: 55.27 },
    ],
    marquee: [
      "Masters",
      "Studios",
      "门店",
      "汽修店",
      "在线学校",
      "专家",
      "Startups",
      "Agencies",
      "中小企业",
      "本地服务",
    ],
    pillars: [
      {
        title: "任意渠道的线索",
        text: "广告、即时通讯、网站 — 汇入同一系统。",
      },
      {
        title: "快速响应",
        text: "Telegram 通知与状态 — 客户不必久等离开。",
      },
      {
        title: "增长而不混乱",
        text: "线索量上来时 — CRM、管理端与自动化。",
      },
    ],
    ctaPrimary: "沟通项目",
    ctaSecondary: "看看我们做什么",
    items: [
      { title: "门店、工作室与师傅", desc: "预约、线索与提醒，告别手工混乱" },
      { title: "汽修店与本地服务", desc: "广告线索快速接入，每位客户状态清晰" },
      { title: "在线学校与课程", desc: "注册、支付、学员区与学习状态" },
      { title: "专家与顾问", desc: "线索从落地页直达 Telegram 与 CRM" },
      { title: "初创与 MVP", desc: "按需模块快速上线 — 不多做" },
      { title: "代理与团队", desc: "带可运转线索漏斗的广告落地页" },
      { title: "中小企业", desc: "当线索仍靠手工处理 — 且已开始拖累业务" },
    ],
  },
  process: {
    title: "上线前如何降低风险",
    steps: [
      {
        kind: "bullets",
        title: "定义产品",
        items: [
          "确认用户、业务背景、核心流程与第一版完成标准。",
        ],
      },
      {
        kind: "bullets",
        title: "锁定范围与风险",
        items: [
          "书面拆分 must-have、later、集成、限制、周期与阶段费用。",
        ],
      },
      {
        kind: "bullets",
        title: "设计 UX 与架构",
        items: [
          "在重度开发前连接页面、角色、数据、状态、API 与上线假设。",
        ],
      },
      {
        kind: "bullets",
        title: "按可运行增量开发",
        items: [
          "展示系统中可运行的部分：UI、后端、管理端、集成与状态。",
        ],
      },
      {
        kind: "bullets",
        title: "检查发布关键路径",
        items: [
          "检查移动端、权限、表单、角色、支付、集成、错误状态与 SEO。",
        ],
      },
      {
        kind: "bullets",
        title: "移交系统",
        items: [
          "移交代码、权限、环境假设与说明。支持和后续迭代单独约定。",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "告诉我们要启动什么系统",
    subtitle:
      "描述产品、用户、流程与集成。我们会回复下一步、风险、周期与费用区间。",
    ctaPrimary: "发送 brief",
    ctaSecondary: "查看 product proof",
    micro: "工作日内回复。通话非必须。联系方式不提供给第三方。",
  },
  packages: {
    sectionTitle: "针对需求的三个方向",
    launch: {
      title: "广告落地页",
      subtitle: "落地页 + 表单 + Telegram",
      forWho: "当您需要从广告、Instagram 或网站快速获取线索。",
      cta: "评估启动",
      bullets: [
        "适合投放的页面",
        "线索表单",
        "联系按钮",
        "Telegram 或邮件通知",
        "移动端适配",
        "基础分析",
        "上线",
      ],
    },
    service: {
      title: "客户后台与管理端",
      subtitle: "客户门户 + 团队面板 + 支付",
      forWho: "当您需要完整 Web 服务：注册、客户后台、状态、支付。",
      cta: "沟通服务",
      bullets: [
        "注册",
        "客户后台",
        "管理后台",
        "用户角色",
        "线索与状态",
        "通知",
        "Payments",
        "集成",
      ],
    },
    automation: {
      title: "自动化",
      subtitle: "减少手工操作",
      forWho: "当线索、表格、报表与通知仍靠手工处理。",
      cta: "自动化流程",
      bullets: [
        "线索自动化",
        "对接 Telegram、邮件与表格",
        "迷你 CRM",
        "任务状态",
        "团队通知",
        "报表",
        "集成",
      ],
    },
  },
} as const;
