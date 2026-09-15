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
  process: { title: string; steps: { title: string; text: string }[] };
  cases: {
    title: string;
    items: { name: string; href: string; cover?: string; blurb?: string }[];
  };
  pricing: {
    title: string;
    body: string;
    /** Optional detailed tariff card (websites-style). */
    plan?: {
      name: string;
      tagline: string;
      price: string;
      priceNote?: string;
      includes: string[];
      note?: string;
    };
  };
  faq: { q: string; a: string }[];
  cta: string;
  /** Optional module cards under the hero */
  features?: { title: string; text: string }[];
  featuresTitle?: string;
  finalTitle?: string;
  finalBody?: string;
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
          "Разрабатываем сайты под заявки: лендинги, корпоративные страницы и многостраничные сайты с формами, Телеграмом и базовым SEO.",
      },
      h1: "Создание сайтов, которые доводят заявку до ответа",
      lead: "Проектируем структуру, дизайн и разработку под ваш канал трафика. Фиксируем объём и стоимость до старта.",
      offer: "Лендинги, сайты услуг, корпоративные страницы, формы заявок, интеграции с Телеграмом и мини-CRM.",
      process: {
        title: "Как проходит работа",
        steps: [
          {
            title: "Письменный разбор задачи и оценка",
            text: "Разбираем цель, канал трафика и ограничения. Фиксируем объём, сроки и стоимость до старта.",
          },
          {
            title: "Структура страниц и тексты",
            text: "Собираем карту экранов, блоки и формулировки оффера под заявку.",
          },
          {
            title: "Дизайн и адаптивная разработка",
            text: "Делаем интерфейс и собираем страницы под мобильные, планшет и десктоп.",
          },
          {
            title: "Формы, уведомления, базовое SEO",
            text: "Подключаем заявки, алерты в Телеграм и базовые настройки для поиска.",
          },
          {
            title: "Публикация и передача доступов",
            text: "Выкладываем сайт и передаём доступы с краткой инструкцией.",
          },
        ],
      },
      cases: {
        title: "Подтверждённые кейсы",
        items: [
          { name: "LOGOVO", href: "/projects/logovo" },
          { name: "TIVONIX Panel", href: "/projects/tivonixpanel" },
        ],
      },
      pricing: {
        title: "Стоимость",
        body: "Фиксируем объём и цену после письменного разбора. Ниже ориентир по запуску посадочной.",
        plan: {
          name: "Start",
          tagline: "Лендинг под заявки",
          price: "$500",
          priceNote: "от",
          includes: [
            "Структура и тексты",
            "Дизайн и адаптив",
            "Форма и Телеграм",
            "Базовое SEO и публикация",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "Сколько времени занимает запуск?",
          a: "Простая посадочная — от 7 рабочих дней. Многостраничный сайт — от 2 недель. Точный срок фиксируем после письменного разбора.",
        },
        {
          q: "Что входит в создание сайта?",
          a: "Структура и тексты, дизайн, адаптивная вёрстка, формы заявок, уведомления и базовая публикация. Интеграции и объём страниц согласуем заранее.",
        },
        {
          q: "Какие сайты вы делаете?",
          a: "Лендинги, сайты услуг, корпоративные страницы и небольшие многостраничные сайты под заявки. Сложные порталы и кабинеты оцениваем отдельно.",
        },
        {
          q: "Нужны ли мне тексты и материалы?",
          a: "Если есть бриф, оффер и примеры — ускоряет запуск. Если нет, помогаем собрать структуру и формулировки в рамках согласованного объёма.",
        },
        {
          q: "Будут ли формы и уведомления?",
          a: "Да. Подключаем заявки и алерты, чаще всего в Телеграм. При необходимости связываем с таблицей или мини-CRM.",
        },
        {
          q: "Делаете ли SEO?",
          a: "Да, базовое: корректные заголовки, мета, скорость и адаптив. Продвижение и контент-маркетинг в базовый объём не входят.",
        },
        {
          q: "Где будет размещён сайт?",
          a: "Публикуем на согласованном хостинге или помогаем с размещением. Доступы и инструкция передаются вам.",
        },
        {
          q: "Передаёте ли код?",
          a: "Да. Исходники и доступы передаются после согласованного этапа.",
        },
        {
          q: "Как фиксируется стоимость?",
          a: "После письменного разбора. Ориентир по посадочной — от $500. Итог зависит от числа страниц, форм и интеграций.",
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
          {
            title: "Written scope review and estimate",
            text: "We clarify the goal, traffic channel and constraints. Scope, timeline and price are fixed before work starts.",
          },
          {
            title: "Page structure and copy",
            text: "We map screens, blocks and offer wording around the lead action.",
          },
          {
            title: "Design and responsive development",
            text: "We design the interface and build pages for mobile, tablet and desktop.",
          },
          {
            title: "Forms, notifications, basic SEO",
            text: "We connect lead forms, Telegram alerts and basic search setup.",
          },
          {
            title: "Deploy and handover of access",
            text: "We publish the site and hand over access with a short guide.",
          },
        ],
      },
      cases: {
        title: "Verified case studies",
        items: [
          { name: "LOGOVO", href: "/en/projects/logovo" },
          { name: "TIVONIX Panel", href: "/en/projects/tivonixpanel" },
        ],
      },
      pricing: {
        title: "Pricing",
        body: "Scope and price are fixed after a written review. Below is the launch baseline for a landing page.",
        plan: {
          name: "Start",
          tagline: "Lead-focused landing",
          price: "$500",
          priceNote: "from",
          includes: [
            "Structure and copy",
            "Design and responsive",
            "Form and Telegram",
            "Basic SEO and publish",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "How long does a launch take?",
          a: "A single landing page starts around 7 business days. Multi-page sites from 2 weeks. Exact timeline is fixed after the written scope review.",
        },
        {
          q: "What is included in website development?",
          a: "Structure and copy, design, responsive build, lead forms, notifications and basic publish. Integrations and page count are agreed upfront.",
        },
        {
          q: "What kinds of sites do you build?",
          a: "Landing pages, service sites, corporate pages and compact multi-page sites built around inquiries. Complex portals are scoped separately.",
        },
        {
          q: "Do I need to provide copy and assets?",
          a: "A brief, offer and references speed things up. If you don’t have them, we help shape structure and wording within the agreed scope.",
        },
        {
          q: "Will forms and alerts be included?",
          a: "Yes. We connect lead forms and alerts, usually to Telegram. A sheet or mini-CRM hook can be added when needed.",
        },
        {
          q: "Do you handle SEO?",
          a: "Yes, the basics: titles, meta, speed and responsive layout. Ongoing promotion and content marketing are out of the base scope.",
        },
        {
          q: "Where will the site be hosted?",
          a: "We publish on the agreed hosting or help with setup. Access and a short guide are handed over to you.",
        },
        {
          q: "Do we get the source code?",
          a: "Yes. Source code and access are handed over after the agreed milestone.",
        },
        {
          q: "How is pricing fixed?",
          a: "After a written scope review. Landing baseline from $500. Final cost depends on pages, forms and integrations.",
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
          "Собираем основу продукта с одним главным сценарием: вход, кабинет, роли и база данных.",
      },
      h1: "Основа MVP с одним главным пользовательским сценарием",
      lead: "Фокус на одном рабочем сценарии вместо перегруженного «полного SaaS». Сложные продукты оцениваем отдельно.",
      offer: "Регистрация, личный кабинет или портал, роли, база данных, админ-раздел и одна ключевая интеграция.",
      process: {
        title: "Этапы",
        steps: [
          { title: "Письменный объём и границы MVP", text: "Фиксируем один главный сценарий и то, что сознательно не входит." },
          { title: "Прототип ключевого сценария", text: "Проверяем путь пользователя до разработки полного ядра." },
          { title: "Разработка ядра и админки", text: "Собираем рабочий продукт с базовым управлением." },
          { title: "Тестирование и публикация", text: "Проверяем сценарий и выкладываем на прод." },
          { title: "Передача кода и документации", text: "Отдаём исходники, доступы и краткую документацию." },
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
        body: "Тариф Product от $2000. Маркетплейсы, финтех и много ролей — индивидуальная оценка.",
        plan: {
          name: "Product",
          tagline: "Основа MVP",
          price: "$2000",
          priceNote: "от",
          includes: [
            "Один главный сценарий",
            "Вход и роли",
            "База и админка",
            "Одна ключевая интеграция",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "Что входит в MVP?",
          a: "Один основной пользовательский сценарий, базовая админка и одна внешняя интеграция. Дополнения оцениваем отдельно.",
        },
        {
          q: "Чем MVP отличается от полного продукта?",
          a: "Берём один рабочий путь и сознательно ограничиваем остальное. Полный SaaS, маркетплейс и сложные роли — отдельная оценка.",
        },
        {
          q: "Сколько времени занимает запуск?",
          a: "Обычно от 3–6 недель в зависимости от сценария и интеграций. Точный срок фиксируем после письменного разбора.",
        },
        {
          q: "Нужен ли готовый дизайн и тексты?",
          a: "Если есть — ускоряет старт. Если нет, собираем структуру и ключевые экраны в рамках согласованного объёма.",
        },
        {
          q: "Какие роли можно заложить?",
          a: "Базовый набор: пользователь и админ. Сложные матрицы прав и много ролей выносим в индивидуальную оценку.",
        },
        {
          q: "Можно ли потом расширить MVP?",
          a: "Да. Сначала запускаем ядро, затем добавляем сценарии, интеграции и админ-функции отдельными этапами.",
        },
        {
          q: "Где будет размещён продукт?",
          a: "Публикуем на согласованном хостинге или помогаем с размещением. Доступы и краткая инструкция передаются вам.",
        },
        {
          q: "Передаёте ли код?",
          a: "Да. Исходники и доступы передаём после согласованного этапа.",
        },
        {
          q: "Как фиксируется стоимость?",
          a: "После письменного разбора. Ориентир по основе MVP — от $2000. Итог зависит от сценария, ролей и интеграций.",
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
          { title: "Written scope and MVP boundaries", text: "We lock one primary workflow and what is intentionally out of scope." },
          { title: "Prototype of the core workflow", text: "We validate the user path before building the full core." },
          { title: "Core product and admin build", text: "We ship a working product with basic admin controls." },
          { title: "Testing and deploy", text: "We test the workflow and publish to production." },
          { title: "Code and access handover", text: "We hand over source, access and a short guide." },
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
        plan: {
          name: "Product",
          tagline: "MVP foundation",
          price: "$2000",
          priceNote: "from",
          includes: [
            "One primary workflow",
            "Auth and roles",
            "Database and admin",
            "One key integration",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "What is included in the MVP?",
          a: "One primary user workflow, a basic admin area and one external integration. Extras are quoted separately.",
        },
        {
          q: "How is an MVP different from a full product?",
          a: "We ship one working path and intentionally cut the rest. Full SaaS, marketplaces and complex roles need a custom quote.",
        },
        {
          q: "How long does a launch take?",
          a: "Usually 3–6 weeks depending on the workflow and integrations. Exact timeline is fixed after the written scope review.",
        },
        {
          q: "Do I need design and copy ready?",
          a: "If you have them, it speeds things up. If not, we shape structure and key screens within the agreed scope.",
        },
        {
          q: "How many roles can we include?",
          a: "A clear base set: user and admin. Complex permission matrices are scoped separately.",
        },
        {
          q: "Can we expand after launch?",
          a: "Yes. We start with the core, then add workflows, integrations and admin features in later stages.",
        },
        {
          q: "Where will the product be hosted?",
          a: "We publish on the agreed hosting or help with setup. Access and a short guide are handed over to you.",
        },
        {
          q: "Do we get the source code?",
          a: "Yes. Source and access are transferred after the agreed milestone.",
        },
        {
          q: "How is pricing fixed?",
          a: "After a written scope review. MVP foundation starts from $2000. Final cost depends on workflow, roles and integrations.",
        },
      ],
      cta: "Get a written scope & estimate",
    },
  },
  automation: {
    ru: {
      seo: {
        title: "Автоматизация бизнеса — TIVONIX",
        description: "Связываем сайт, Телеграм, таблицы и мини-CRM в один процесс обработки заявок.",
      },
      h1: "Автоматизация заявок и внутренних процессов",
      lead: "Убираем ручной перенос между чатами, почтой и таблицами. Показываем статус и следующий шаг.",
      offer: "Боты в Телеграме, уведомления, мини-CRM, статусы, интеграции с формами и таблицами.",
      process: {
        title: "Этапы",
        steps: [
          { title: "Карта текущего процесса", text: "Фиксируем, как заявки идут сейчас и где теряются." },
          { title: "Проектирование маршрута заявки", text: "Собираем понятный путь от формы до ответа менеджера." },
          { title: "Разработка и интеграции", text: "Связываем сайт, Телеграм, таблицы или CRM." },
          { title: "Тест на реальных сценариях", text: "Проверяем маршрут на ваших типовых заявках." },
          { title: "Запуск и инструкция", text: "Включаем процесс и передаём короткую инструкцию команде." },
        ],
      },
      cases: { title: "Кейсы", items: [{ name: "TIVONIX Panel", href: "/projects/tivonixpanel" }] },
      pricing: {
        title: "Стоимость",
        body: "Growth от $900 для системы заявок. Сложная логика — индивидуальная оценка после письменного разбора.",
        plan: {
          name: "Growth",
          tagline: "Система заявок",
          price: "$900",
          priceNote: "от",
          includes: [
            "Формы и уведомления",
            "Телеграм или таблица",
            "Статусы заявок",
            "Базовая мини-CRM",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "Можно начать с простого?",
          a: "Да. Часто достаточно формы и Телеграма, затем добавляем CRM и статусы.",
        },
        {
          q: "Что обычно автоматизируем?",
          a: "Приём заявок, уведомления менеджерам, статусы, ответственных и передачу в таблицу или мини-CRM.",
        },
        {
          q: "Нужна ли отдельная CRM?",
          a: "Не всегда. Для старта хватает формы + Телеграм. Мини-CRM добавляем, когда нужен порядок и история.",
        },
        {
          q: "Сколько времени занимает запуск?",
          a: "Простой контур — от 1–2 недель. Со статусами и интеграциями — после письменного разбора.",
        },
        {
          q: "Можно связать с текущим сайтом?",
          a: "Да. Подключаем формы сайта, Телеграм, таблицы и нужные сервисы без переноса всего продукта.",
        },
        {
          q: "Как команда увидит заявки?",
          a: "Через алерты в Телеграм, таблицу или панель со статусами — как зафиксируем в объёме.",
        },
        {
          q: "Сложная логика оценивается отдельно?",
          a: "Да. Ветвления, несколько ролей и внешние системы выносим в индивидуальную оценку.",
        },
        {
          q: "Передаёте ли доступы и инструкцию?",
          a: "Да. После запуска передаём доступы и короткую инструкцию для команды.",
        },
        {
          q: "Как фиксируется стоимость?",
          a: "После письменного разбора. Ориентир по системе заявок — от $900.",
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
          { title: "Map the current workflow", text: "We document how leads move today and where they get stuck." },
          { title: "Design the lead route", text: "We design a clear path from form to manager response." },
          { title: "Build and integrate", text: "We connect the site, Telegram, sheets or CRM." },
          { title: "Test on real scenarios", text: "We validate the route on your typical inquiries." },
          { title: "Launch and handover guide", text: "We go live and hand over a short team guide." },
        ],
      },
      cases: { title: "Cases", items: [{ name: "TIVONIX Panel", href: "/en/projects/tivonixpanel" }] },
      pricing: {
        title: "Pricing",
        body: "Growth from $900 for a lead system. Complex logic — Custom after written scope review.",
        plan: {
          name: "Growth",
          tagline: "Lead system",
          price: "$900",
          priceNote: "from",
          includes: [
            "Forms and alerts",
            "Telegram or sheet",
            "Lead statuses",
            "Basic mini-CRM",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "Can we start simple?",
          a: "Yes. Often a form + Telegram is enough first, then CRM and statuses.",
        },
        {
          q: "What do you usually automate?",
          a: "Lead intake, manager alerts, statuses, assignees and handoff into a sheet or mini-CRM.",
        },
        {
          q: "Do we need a full CRM?",
          a: "Not always. Form + Telegram is enough to start. Mini-CRM comes when you need order and history.",
        },
        {
          q: "How long does a launch take?",
          a: "A simple flow starts around 1–2 weeks. Statuses and integrations are scoped after the written review.",
        },
        {
          q: "Can you connect our current site?",
          a: "Yes. We wire site forms, Telegram, sheets and required services without rebuilding everything.",
        },
        {
          q: "How will the team see leads?",
          a: "Via Telegram alerts, a sheet or a status panel — whichever we lock in the scope.",
        },
        {
          q: "Is complex logic quoted separately?",
          a: "Yes. Branching, many roles and external systems are Custom.",
        },
        {
          q: "Do you hand over access and a guide?",
          a: "Yes. After launch we transfer access and a short team guide.",
        },
        {
          q: "How is pricing fixed?",
          a: "After a written scope review. Lead systems start from $900.",
        },
      ],
      cta: "Get a written scope & estimate",
    },
  },
  crm: {
    ru: {
      seo: {
        title: "Разработка CRM и мини-CRM — TIVONIX",
        description: "Мини-CRM и таблицы заявок со статусами, ответственными и историей.",
      },
      h1: "Мини-CRM под ваш процесс продаж",
      lead: "Не перегружаем коробочной CRM. Делаем то, что команда реально использует каждый день.",
      offer: "Таблица заявок, статусы, ответственные, фильтры, уведомления, базовые роли.",
      process: {
        title: "Этапы",
        steps: [
          { title: "Бриф по процессу", text: "Разбираем, как команда ведёт заявки сегодня." },
          { title: "Модель статусов", text: "Собираем статусы, роли и правила переходов." },
          { title: "Интерфейс и разработка", text: "Делаем таблицу заявок и рабочие экраны." },
          { title: "Интеграции", text: "Подключаем формы, Телеграм и нужные сервисы." },
          { title: "Обучение команды", text: "Показываем сценарии и передаём доступы." },
        ],
      },
      cases: { title: "Кейсы", items: [{ name: "TIVONIX Panel", href: "/projects/tivonixpanel" }] },
      pricing: { title: "Стоимость", body: "Growth от $900. Большая CRM с множеством ролей — индивидуально." },
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
        steps: [
          { title: "Process brief", text: "We review how the team handles leads today." },
          { title: "Status model", text: "We define statuses, roles and transition rules." },
          { title: "UI and build", text: "We build the lead table and working screens." },
          { title: "Integrations", text: "We connect forms, Telegram and required services." },
          { title: "Team onboarding", text: "We walk through scenarios and hand over access." },
        ],
      },
      cases: { title: "Cases", items: [{ name: "TIVONIX Panel", href: "/en/projects/tivonixpanel" }] },
      pricing: { title: "Pricing", body: "Growth from $900. Large multi-role CRM — Custom." },
      faq: [{ q: "Is this a HubSpot replacement?", a: "No. A lightweight system for your workflow. External CRM integrations on request." }],
      cta: "Get a written scope & estimate",
    },
  },
  portal: {
    ru: {
      seo: {
        title: "Разработка личного кабинета — TIVONIX",
        description:
          "Клиентские порталы и личные кабинеты под ключ: роли, статусы, документы, уведомления и админ-панель. Фиксируем объём и стоимость до старта.",
      },
      h1: "Личный кабинет, который держит процесс",
      lead: "Кабинет клиента, портал партнёра или внутренняя панель — с ролями, статусами и доступом к нужным данным без хаоса в чатах.",
      offer: "Вход и регистрация, профиль, статусы, документы, уведомления, платежи и админ-раздел в одном контуре.",
      featuresTitle: "Что обычно входит",
      features: [
        {
          title: "Роли и доступы",
          text: "Клиент, менеджер, партнёр, админ — каждый видит только своё.",
        },
        {
          title: "Статусы и история",
          text: "Заявки, заказы и этапы в одном месте — без «где сейчас?» в переписке.",
        },
        {
          title: "Документы и файлы",
          text: "Договоры, акты, отчёты и вложения с понятным доступом.",
        },
        {
          title: "Уведомления",
          text: "Почта, Телеграм или внутри кабинета — по ключевым событиям.",
        },
        {
          title: "Платежи и баланс",
          text: "Оплаты, счета и история операций, если это часть сценария.",
        },
        {
          title: "Админ-панель",
          text: "Управление пользователями, контентом и операциями для вашей команды.",
        },
      ],
      process: {
        title: "Как проходит работа",
        steps: [
          { title: "Письменный разбор ролей и сценариев", text: "Фиксируем роли, доступы и один главный пользовательский путь." },
          { title: "Прототип ключевых экранов", text: "Согласуем структуру кабинета до полной разработки." },
          { title: "Разработка кабинета и админки", text: "Собираем клиентский контур и панель управления." },
          { title: "Права доступа и безопасность", text: "Настраиваем роли, ограничения и базовую защиту данных." },
          { title: "Запуск, передача кода и доступов", text: "Публикуем кабинет и передаём исходники с доступами." },
        ],
      },
      cases: {
        title: "Кейсы с кабинетами",
        items: [
          {
            name: "Spliton",
            href: "/projects/spliton",
            cover: "/images/project-priew/spliton.webp",
            blurb: "Кабинеты, KYC, кошелёк и вторичный рынок.",
          },
          {
            name: "Slotty",
            href: "/projects/slotty",
            cover: "/images/project-priew/slotty.webp",
            blurb: "Кабинет мастера Free/Pro и админка платформы.",
          },
          {
            name: "TIVONIX Panel",
            href: "/projects/tivonixpanel",
            cover: `/images/${encodeURI("обложки")}/tivonixpanel.webp`,
            blurb: "Партнёрская панель со статусами и выплатами.",
          },
        ],
      },
      pricing: {
        title: "Стоимость",
        body: "Основа с одним основным сценарием — от тарифа Product ($2000). Много ролей, сложные права, платежи и интеграции оцениваем отдельно после письменного разбора.",
        plan: {
          name: "Product",
          tagline: "Личный кабинет",
          price: "$2000",
          priceNote: "от",
          includes: [
            "Вход и роли",
            "Статусы и история",
            "Документы и уведомления",
            "Админ-панель",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "Это CRM или отдельный кабинет?",
          a: "Чаще отдельный клиентский/партнёрский кабинет. При необходимости связываем с вашей CRM или строим лёгкий внутренний контур.",
        },
        {
          q: "Сколько ролей можно заложить?",
          a: "В базовом Product — понятный набор. Сложные матрицы прав и много ролей — в индивидуальной оценке.",
        },
        {
          q: "Что обычно входит в кабинет?",
          a: "Вход, профиль, статусы, документы, уведомления и админ-раздел. Платежи и баланс — если это часть сценария.",
        },
        {
          q: "Сколько времени занимает запуск?",
          a: "Обычно от 3–6 недель в зависимости от ролей и интеграций. Точный срок фиксируем после письменного разбора.",
        },
        {
          q: "Можно ли потом расширить кабинет?",
          a: "Да. Сначала запускаем основной сценарий, затем добавляем роли, платежи и интеграции отдельными этапами.",
        },
        {
          q: "Нужны ли готовые тексты и дизайн?",
          a: "Если есть — ускоряет старт. Если нет, собираем структуру и ключевые экраны в рамках согласованного объёма.",
        },
        {
          q: "Где будет размещён кабинет?",
          a: "Публикуем на согласованном хостинге или помогаем с размещением. Доступы передаём вам.",
        },
        {
          q: "Передаёте ли исходники?",
          a: "Да. Код и доступы передаём после согласованного этапа.",
        },
        {
          q: "Как фиксируется стоимость?",
          a: "После письменного разбора. Ориентир по основе кабинета — от $2000.",
        },
      ],
      cta: "Получить письменную оценку",
      finalTitle: "Нужен кабинет без хаоса в чатах?",
      finalBody: "Опишите роли и сценарий — пришлём объём, сроки и стоимость письменно.",
    },
    en: {
      seo: {
        title: "Client portal development — TIVONIX",
        description:
          "Client portals and account areas with roles, statuses, documents and admin. Scope and price agreed in writing before we start.",
      },
      h1: "A client portal that keeps the process clear",
      lead: "Client area, partner portal or internal dashboard — with roles, statuses and access to the right data without chat chaos.",
      offer: "Auth, profile, statuses, documents, notifications, payments and an admin section in one system.",
      featuresTitle: "What we usually include",
      features: [
        {
          title: "Roles & access",
          text: "Client, manager, partner, admin — each person sees only what they need.",
        },
        {
          title: "Statuses & history",
          text: "Requests, orders and stages in one place — no more “where is this?” threads.",
        },
        {
          title: "Documents & files",
          text: "Contracts, reports and attachments with clear permissions.",
        },
        {
          title: "Notifications",
          text: "Email, Telegram or in-app alerts on key events.",
        },
        {
          title: "Payments & balance",
          text: "Charges, invoices and transaction history when part of the flow.",
        },
        {
          title: "Admin panel",
          text: "Users, content and operations for your team.",
        },
      ],
      process: {
        title: "How we work",
        steps: [
          { title: "Written role and workflow review", text: "We lock roles, access and one primary user path." },
          { title: "Prototype of key screens", text: "We align the portal structure before full build." },
          { title: "Portal and admin development", text: "We build the client area and admin panel." },
          { title: "Access control and security", text: "We set roles, limits and basic data protection." },
          { title: "Launch and handover of code/access", text: "We publish and hand over source plus access." },
        ],
      },
      cases: {
        title: "Portal cases",
        items: [
          {
            name: "Spliton",
            href: "/en/projects/spliton",
            cover: "/images/project-priew/spliton.webp",
            blurb: "Portals, KYC, wallet and secondary market.",
          },
          {
            name: "Slotty",
            href: "/en/projects/slotty",
            cover: "/images/project-priew/slotty.webp",
            blurb: "Provider Free/Pro portal and platform admin.",
          },
          {
            name: "TIVONIX Panel",
            href: "/en/projects/tivonixpanel",
            cover: `/images/${encodeURI("обложки")}/tivonixpanel.webp`,
            blurb: "Partner panel with statuses and payouts.",
          },
        ],
      },
      pricing: {
        title: "Pricing",
        body: "A foundation with one primary workflow starts from Product ($2000). Many roles, complex permissions, payments and integrations are scoped separately after a written review.",
        plan: {
          name: "Product",
          tagline: "Client portal",
          price: "$2000",
          priceNote: "from",
          includes: [
            "Auth and roles",
            "Statuses and history",
            "Documents and alerts",
            "Admin panel",
          ],
          note: "",
        },
      },
      faq: [
        {
          q: "Is this a CRM or a separate portal?",
          a: "Usually a dedicated client/partner area. We can connect an external CRM or build a light internal ops layer when needed.",
        },
        {
          q: "How many roles can we include?",
          a: "Product includes a clear base set. Complex permission matrices are Custom.",
        },
        {
          q: "What is usually included?",
          a: "Auth, profile, statuses, documents, notifications and an admin section. Payments and balance when part of the flow.",
        },
        {
          q: "How long does a launch take?",
          a: "Usually 3–6 weeks depending on roles and integrations. Exact timeline is fixed after the written scope review.",
        },
        {
          q: "Can we expand later?",
          a: "Yes. We launch the core workflow first, then add roles, payments and integrations in later stages.",
        },
        {
          q: "Do I need design and copy ready?",
          a: "If you have them, it speeds things up. If not, we shape structure and key screens within the agreed scope.",
        },
        {
          q: "Where will the portal be hosted?",
          a: "We publish on the agreed hosting or help with setup. Access is handed over to you.",
        },
        {
          q: "Do you hand over source code?",
          a: "Yes. Code and access are transferred after the agreed stage.",
        },
        {
          q: "How is pricing fixed?",
          a: "After a written scope review. Portal foundation starts from $2000.",
        },
      ],
      cta: "Get a written scope & estimate",
      finalTitle: "Need a portal without chat chaos?",
      finalBody: "Tell us the roles and main workflow — we’ll send scope, timeline and price in writing.",
    },
  },
  telegram: {
    ru: {
      seo: {
        title: "Telegram-боты для бизнеса — TIVONIX",
        description: "Боты для заявок, уведомлений и интеграции с сайтом и CRM.",
      },
      h1: "Telegram-боты для заявок и уведомлений",
      lead: "Подключаем Телеграм к сайту, CRM и внутренним процессам без потери заявок.",
      offer: "Бот заявок, уведомления менеджерам, мини-приложение, интеграция с формами.",
      process: {
        title: "Этапы",
        steps: [
          { title: "Сценарий бота", text: "Описываем диалоги, команды и точки передачи заявки." },
          { title: "Разработка", text: "Собираем бота под согласованный сценарий." },
          { title: "Интеграция", text: "Связываем с сайтом, CRM или таблицами." },
          { title: "Тест", text: "Проверяем ответы, алерты и крайние случаи." },
          { title: "Запуск", text: "Публикуем бота и передаём доступы." },
        ],
      },
      cases: { title: "Кейсы", items: [{ name: "Slotty", href: "/projects/slotty" }] },
      pricing: { title: "Стоимость", body: "От Start/Growth в зависимости от логики и интеграций." },
      faq: [{ q: "Нужен ли отдельный сервер?", a: "Помогаем с публикацией и настройкой. Детали — в письменной оценке." }],
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
        steps: [
          { title: "Bot flow", text: "We define dialogs, commands and handoff points." },
          { title: "Development", text: "We build the bot around the agreed flow." },
          { title: "Integration", text: "We connect the site, CRM or spreadsheets." },
          { title: "Testing", text: "We check replies, alerts and edge cases." },
          { title: "Launch", text: "We publish the bot and hand over access." },
        ],
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
        title: "Разработка под вашим брендом (white-label) для агентств — TIVONIX",
        description: "Разработка под брендом агентства: сайты, порталы и автоматизация.",
      },
      h1: "Разработка под вашим брендом для агентств",
      lead: "Берём техническую часть под ваш бренд. Фиксируем объём, сроки и передаём код.",
      offer: "Сайты, MVP, порталы, автоматизация, партнёрская панель.",
      process: {
        title: "Этапы",
        steps: [
          { title: "Партнёрский бриф", text: "Согласуем бренд, формат работы и ожидания клиента." },
          { title: "Объём работ", text: "Фиксируем задачи, сроки и ответственность сторон." },
          { title: "Разработка", text: "Делаем продукт под вашим брендом." },
          { title: "Отчёты", text: "Письменно фиксируем прогресс по этапам." },
          { title: "Передача клиенту", text: "Отдаём результат через вас или напрямую по договорённости." },
        ],
      },
      cases: { title: "Кейсы", items: [{ name: "TIVONIX Panel", href: "/partners" }] },
      pricing: { title: "Стоимость", body: "Индивидуально. Партнёрские условия — на странице «Партнёрам»." },
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
        steps: [
          { title: "Partner brief", text: "We align brand, delivery format and client expectations." },
          { title: "Scope", text: "We lock tasks, timeline and responsibilities." },
          { title: "Build", text: "We deliver the product under your brand." },
          { title: "Written updates", text: "We report progress in writing by stage." },
          { title: "Client handover", text: "We hand over through you or directly as agreed." },
        ],
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
