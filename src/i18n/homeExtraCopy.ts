import type { Lang } from "./LangProvider";

/** Copy for new / rewritten home sections (RU + EN). */
export function homeExtraCopy(lang: Lang) {
  return lang === "ru" ? COPY_RU : COPY_EN;
}

const COPY_RU = {
  trust: {
    ariaLabel: "Почему можно доверять",
    items: [
      "Поддержка после запуска",
    ],
  },
  featured: {
    eyebrow: "Проекты",
    title: "Три живых результата",
    subtitle: "Разные типы задач — от финтех-платформы до локального бизнеса.",
    viewCase: "Посмотреть кейс",
    openLive: "Открыть проект",
    problem: "Проблема:",
    solution: "Решение:",
    resultLabel: "Результат:",
    prev: "Предыдущий кейс",
    next: "Следующий кейс",
    items: [
      {
        id: "spliton",
        type: "Веб-продукт · FinTech",
        problem:
          "Нужна была финтех-платформа для долей в музыке — не лендинг, а полноценный продукт с деньгами, ролями и комплаенсом.",
        solution:
          "Собрали каталог релизов, кабинеты, KYC, платежи, вторичный рынок и портал оператора.",
        result:
          "Финтех-платформа в продакшене: кабинеты, роли, KYC, платежи и вторичный рынок.",
        modules: [
          "Кабинеты",
          "KYC",
          "Платежи",
          "Вторичный рынок",
          "Админ-панель",
          "i18n",
        ],
      },
      {
        id: "slotty",
        type: "Маркетплейс · запись",
        problem:
          "Нужен был не лендинг с кнопкой, а маркетплейс записи: каталог, слоты, кабинет мастера и оплата.",
        solution:
          "Собрали каталог с фильтрами и картой, Telegram Mini App, кабинет Free/Pro, админку и bePaid.",
        result:
          "Маркетплейс на slotty.of.by: запись без звонков, кабинеты и платежи в одной системе.",
        modules: [
          "Каталог",
          "Карта",
          "Слоты",
          "Кабинет мастера",
          "Telegram",
          "bePaid",
        ],
      },
      {
        id: "logovo",
        type: "Локальный бизнес",
        problem:
          "Клиент с дороги не находил филиал и запись — адреса и CTA прятались, заявка терялась.",
        solution:
          "Собрали сайт сети: филиалы, услуги, цены, карта и короткий путь до заявки или звонка.",
        result:
          "Сайт сети шиномонтажей с филиалами, услугами, ценами и маршрутом до заявки.",
        modules: ["Филиалы", "Услуги", "Цены", "Карта", "Запись", "B2B"],
      },
    ],
  },
  direction: {
    eyebrow: "Направления",
    title: "Что нужно запустить?",
    subtitle: "Выберите сценарий — разберём задачу и предложим первый шаг.",
    leads: {
      label: "Заявки",
      title: "Собрать заявки в один поток",
      text: "Сайт, бот и CRM — один маршрут до ответа.",
      cta: "Разобрать путь",
      points: ["Сайт и лендинг", "Telegram-бот", "Mini-CRM"],
      stack: [
        {
          title: "Сайт",
          text: "Форма → заявка сразу",
          headline: "Пользователь заполняет форму",
          mock: "form" as const,
          mockName: "Иван",
          mockContact: "+375 29 000-00-00",
          mockSubmit: "Отправить",
        },
        {
          title: "Бот",
          text: "Уведомление в Telegram",
          headline: "Заявка приходит в бот",
          mock: "bot" as const,
          mockName: "Новая заявка",
          mockContact: "Иван · сайт",
          mockSubmit: "сейчас",
        },
        {
          title: "CRM",
          text: "Ответственный назначен",
          headline: "Ответственный берёт в работу",
          mock: "crm" as const,
          mockName: "Иван · сайт",
          mockContact: "Анна",
          mockSubmit: "В работе",
        },
      ],
    },
    product: {
      label: "Продукт",
      title: "Запустить продукт",
      text: "MVP с кабинетом, ролями и платежами.",
      cta: "Обсудить MVP",
      points: ["Личный кабинет", "Роли и доступы", "Платежи"],
      stack: [
        {
          title: "SaaS / MVP",
          text: "Первая рабочая версия",
          headline: "Собираем первую версию",
          mock: "mvp" as const,
          mockName: "Dashboard",
          mockContact: "12 задач",
          mockSubmit: "Live",
        },
        {
          title: "Кабинет",
          text: "Роли без хаоса",
          headline: "Роли и доступы в кабинете",
          mock: "cabinet" as const,
          mockName: "Клиент",
          mockContact: "Менеджер",
          mockSubmit: "Админ",
        },
        {
          title: "Платежи",
          text: "Интеграции под ключ",
          headline: "Подключаем оплату",
          mock: "pay" as const,
          mockName: "Оплата",
          mockContact: "4 900 ₽",
          mockSubmit: "Успешно",
        },
      ],
    },
  },
  solution: {
    outcomes: [
      "Заявка не потеряна",
      "Ответственный назначен",
      "Следующий шаг понятен",
    ],
  },
  aiScenarios: {
    title: "AI там, где он действительно экономит время",
    note: "Подбираем модель под задачу и требования к данным — не добавляем AI ради логотипа.",
    items: [
      {
        title: "Разбор заявок",
        text: "AI определяет тему обращения, извлекает ключевые данные и направляет заявку нужному сотруднику.",
      },
      {
        title: "Работа с документами",
        text: "Система читает файлы, извлекает реквизиты и сохраняет данные в нужные поля.",
      },
      {
        title: "Помощь менеджеру",
        text: "AI находит информацию в базе компании и готовит черновик ответа клиенту.",
      },
    ],
  },
  homePricing: {
    eyebrow: "Тарифы",
    title: "Понятный старт без скрытых обещаний",
    note: "Стоимость зависит от количества экранов, ролей, интеграций и сложности бизнес-логики. До старта фиксируем объём, этапы и стоимость.",
    allPlans: "Сравнить все планы",
    more: "Подробнее",
    ctas: {
      start: "Получить состав Start",
      growth: "Оценить Growth",
      product: "Рассчитать MVP",
      custom: "Обсудить Custom",
    },
  },
  guarantees: {
    title: "Понятные условия до начала разработки",
    subtitle: "До старта письменно фиксируем объём, сроки, стоимость и ответственность сторон.",
    items: [
      "Объём и стоимость фиксируются до старта этапа",
      "Работа делится на понятные части",
      "Клиент видит промежуточный результат",
      "Исходный код и доступы передаются клиенту",
      "Конфиденциальные данные не публикуются",
      "Перед запуском проверяются ключевые сценарии",
      "Условия поддержки согласовываются заранее",
    ],
  },
  founder: {
    title: "За проект отвечает не безликая студия",
    name: "Данила Титовец",
    role: "Основатель TIVONIX, full-stack разработчик",
    bio: "Отвечает за архитектуру, разработку и запуск проектов. В зависимости от задачи подключает специалистов по дизайну, frontend, backend, мобильной разработке и продвижению.",
    cta: "Написать основателю",
  },
  team: {
    title: "Над проектом работает команда",
    text: "TIVONIX — продуктовая команда: дизайн, разработка, тестирование и запуск в одной связке. Собираем состав под задачу для быстрого внедрения продукта и осуществления ваших мечт — и ведём проект до результата.",
    cta: "О компании",
    members: [
      { initials: "ДТ", name: "Данила Т.", role: "Архитектура и full-stack" },
      { initials: "АК", name: "Анна К.", role: "UI/UX дизайн" },
      { initials: "МС", name: "Максим С.", role: "Frontend-разработка" },
      { initials: "ИВ", name: "Игорь В.", role: "Backend-разработка" },
      { initials: "ЕН", name: "Елена Н.", role: "Тестирование и QA" },
      { initials: "РП", name: "Роман П.", role: "Проджект-менеджмент" },
    ],
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Что говорят о работе",
    viewCase: "Кейс",
    ownProduct: "Собственный продукт TIVONIX",
  },
  scale: {
    badge: "Живые системы",
    title: "Запускаем продукты, в которых заявки не теряются",
    seal: "От идеи до запуска",
    foot: "Сайты, Telegram, CRM, кабинеты и MVP в одной связке. Фиксируем объём, сроки и передаём код с доступами.",
    stats: [
      { value: "7+", label: "Проектов в продакшене" },
      { value: "1 нед.", label: "Быстрый запуск панели" },
      { value: "100%", label: "Код и доступы у вас" },
      { value: "BY · RU", label: "География запусков" },
    ],
  },
  mobileSticky: {
    label: "Получить оценку",
  },
} as const;

const COPY_EN = {
  trust: {
    ariaLabel: "Why you can trust us",
    items: [
      "Support after launch",
    ],
  },
  featured: {
    eyebrow: "Projects",
    title: "Three live results",
    subtitle: "Different project types — from a fintech platform to local business.",
    viewCase: "View case",
    openLive: "Open live",
    problem: "Problem:",
    solution: "Solution:",
    resultLabel: "Result:",
    prev: "Previous case",
    next: "Next case",
    items: [
      {
        id: "spliton",
        type: "Web product · FinTech",
        problem:
          "Needed a fintech platform for music shares — a full product with money flows, roles and compliance, not a landing page.",
        solution:
          "Built release catalog, portals, KYC, payments, secondary market and an operator portal.",
        result:
          "Fintech platform in production: portals, roles, KYC, payments and a secondary market.",
        modules: [
          "Portals",
          "KYC",
          "Payments",
          "Secondary market",
          "Admin",
          "i18n",
        ],
      },
      {
        id: "slotty",
        type: "Marketplace · booking",
        problem:
          "Needed more than a “book now” landing — a booking marketplace with catalog, slots, master cabinet and payments.",
        solution:
          "Built filtered catalog + map, Telegram Mini App, Free/Pro master cabinet, admin and bePaid.",
        result:
          "Marketplace on slotty.of.by: book without calls, cabinets and payments in one system.",
        modules: [
          "Catalog",
          "Map",
          "Slots",
          "Master cabinet",
          "Telegram",
          "bePaid",
        ],
      },
      {
        id: "logovo",
        type: "Local business",
        problem:
          "Drivers couldn’t find a branch or booking path — addresses and CTAs were buried, leads were lost.",
        solution:
          "Built a network site: branches, services, prices, map and a short path to book or call.",
        result:
          "Tire-service network site with branches, services, prices and a clear path to a lead.",
        modules: ["Branches", "Services", "Prices", "Map", "Booking", "B2B"],
      },
    ],
  },
  direction: {
    eyebrow: "Directions",
    title: "What do you need to launch?",
    subtitle: "Pick a path — we’ll review the task and suggest the first step.",
    leads: {
      label: "Leads",
      title: "One stream for every lead",
      text: "Site, bot and CRM — one path to a reply.",
      cta: "Map the path",
      points: ["Website & landing", "Telegram bot", "Mini-CRM"],
      stack: [
        {
          title: "Site",
          text: "Form → lead instantly",
          headline: "The user fills out the form",
          mock: "form" as const,
          mockName: "Alex",
          mockContact: "+1 555 010-2030",
          mockSubmit: "Send",
        },
        {
          title: "Bot",
          text: "Alert in Telegram",
          headline: "The lead lands in the bot",
          mock: "bot" as const,
          mockName: "New lead",
          mockContact: "Alex · site",
          mockSubmit: "now",
        },
        {
          title: "CRM",
          text: "Owner assigned",
          headline: "An owner picks it up",
          mock: "crm" as const,
          mockName: "Alex · site",
          mockContact: "Anna",
          mockSubmit: "In progress",
        },
      ],
    },
    product: {
      label: "Product",
      title: "Launch a product",
      text: "MVP with portal, roles and payments.",
      cta: "Discuss MVP",
      points: ["Client portal", "Roles & access", "Payments"],
      stack: [
        {
          title: "SaaS / MVP",
          text: "First working version",
          headline: "We ship the first version",
          mock: "mvp" as const,
          mockName: "Dashboard",
          mockContact: "12 tasks",
          mockSubmit: "Live",
        },
        {
          title: "Portal",
          text: "Roles without chaos",
          headline: "Roles and access in the portal",
          mock: "cabinet" as const,
          mockName: "Client",
          mockContact: "Manager",
          mockSubmit: "Admin",
        },
        {
          title: "Payments",
          text: "Integrations included",
          headline: "Payments get connected",
          mock: "pay" as const,
          mockName: "Payment",
          mockContact: "$49",
          mockSubmit: "Paid",
        },
      ],
    },
  },
  solution: {
    outcomes: [
      "Lead not lost",
      "Owner assigned",
      "Next step is clear",
    ],
  },
  aiScenarios: {
    title: "AI where it actually saves time",
    note: "We pick the model for the task and data requirements — we don’t add AI for the logo.",
    items: [
      {
        title: "Lead triage",
        text: "AI detects the topic, extracts key fields and routes the lead to the right person.",
      },
      {
        title: "Document handling",
        text: "The system reads files, extracts details and fills the right fields.",
      },
      {
        title: "Manager assist",
        text: "AI finds info in your company knowledge base and drafts a reply for the client.",
      },
    ],
  },
  homePricing: {
    eyebrow: "Pricing",
    title: "A clear start without vague promises",
    note: "Price depends on screens, roles, integrations and business logic. Before we start we lock scope, stages and cost.",
    allPlans: "Compare all plans",
    more: "Details",
    ctas: {
      start: "Get Start scope",
      growth: "Estimate Growth",
      product: "Estimate MVP",
      custom: "Discuss Custom",
    },
  },
  guarantees: {
    title: "Clear terms before development starts",
    subtitle: "Before kickoff we put scope, timeline, cost and responsibilities in writing.",
    items: [
      "Scope and cost are fixed before a stage starts",
      "Work is split into clear parts",
      "You see intermediate results",
      "Source code and access are handed over",
      "Confidential data is not published",
      "Key flows are checked before launch",
      "Support terms are agreed in advance",
    ],
  },
  founder: {
    title: "A real person owns the project — not a faceless studio",
    name: "Danila Titovets",
    role: "Founder of TIVONIX, full-stack developer",
    bio: "Owns architecture, development and launch. Depending on the task, brings in design, frontend, backend, mobile and growth specialists.",
    cta: "Message the founder",
  },
  team: {
    title: "A team works on your project",
    text: "TIVONIX is a product team: design, engineering, QA and launch in one loop. We assemble the right mix for fast product delivery — and turn your ideas into a live result.",
    cta: "About the company",
    members: [
      { initials: "DT", name: "Danila T.", role: "Architecture & full-stack" },
      { initials: "AK", name: "Anna K.", role: "UI/UX design" },
      { initials: "MS", name: "Maxim S.", role: "Frontend engineering" },
      { initials: "IV", name: "Igor V.", role: "Backend engineering" },
      { initials: "EN", name: "Elena N.", role: "QA & testing" },
      { initials: "RP", name: "Roman P.", role: "Project management" },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    viewCase: "Case",
    ownProduct: "TIVONIX own product",
  },
  scale: {
    badge: "Live systems",
    title: "We ship products where leads don’t get lost",
    seal: "From idea to launch",
    foot: "Sites, Telegram, CRM, portals and MVPs in one loop. We lock scope and timelines, then hand over code and access.",
    stats: [
      { value: "7+", label: "Projects in production" },
      { value: "1 wk", label: "Fastest panel launch" },
      { value: "100%", label: "Code and access yours" },
      { value: "BY · RU", label: "Where we ship" },
    ],
  },
  mobileSticky: {
    label: "Get an estimate",
  },
} as const;
