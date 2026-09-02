import type { Lang } from "./LangProvider";

export type PartnersCopy = {
  seo: { title: string; description: string; serviceName: string; emailSubject: string };
  hero: {
    h1: string;
    subtitle: string;
    cta: string;
    loginCta: string;
    trust: string;
  };
  problem: {
    title: string;
    /** Body as segments; `em` = black emphasis; `pill` = orange pill */
    body: { text: string; em?: boolean; pill?: boolean }[];
    rolesHeading: string;
    roles: { title: string; items: string[] }[];
  };
  money: { label: string; body: string; caption: string; flow: [string, string, string]; disclaimer: string };
  models: {
    heading: { before: string; sell: string; middle: string; brand: string };
    menu: { title: string; description: string }[];
    allInOne: { title: string; text: string };
    quickStart: { pill: string; title: string; text: string };
    status: { title: string; text: string; steps: { t: string; d: string }[] };
    referral: { title: string; text: string; cta: string; note: string };
    whiteLabel: { title: string; text: string; cta: string; note: string };
    panelHint: string;
    footnote: string;
  };
  video: { title: string; subtitle: string };
  afterReg: {
    title: string;
    lead: string;
    steps: { t: string; d: string }[];
    disclaimer: string;
  };
  capabilities: { heading: string; titles: string[]; h2Before: string; h2Pill: string; h2After: string };
  process: { title: string; lead: string; steps: string[] };
  cases: { title: string; view: string; all: string; texts: Record<string, string> };
  examples: {
    sr: string;
    referral: { pill: string; title: string; text: string };
    whiteLabel: { pill: string; title: string; text: string };
  };
  faq: { title: string; more: string; items: { q: string; a: string }[] };
  final: {
    badge: string;
    title: string;
    body: string;
    referralCta: string;
    whiteLabelCta: string;
    loginLink: string;
    footnote: string;
  };
  footer: {
    marquee: string;
    homeAria: string;
    navAria: string;
    formats: string;
    login: string;
    askTelegram: string;
    projects: string;
    contacts: string;
    channel: string;
    privacy: string;
    privacyAria: string;
    consent: string;
    consentAria: string;
    note: string;
  };
  discuss: { label: string; ask: string };
  /** Mini UI labels in demos / money animation */
  ui: {
    client: string;
    you: string;
    youPct: string;
    estimate: string;
    markup: string;
    clientPrice: string;
  };
};

const RU: PartnersCopy = {
  seo: {
    title: "Партнёрская программа TIVONIX — Referral и White-label",
    description:
      "Передавайте клиентов или продавайте разработку под своим брендом. TIVONIX оценивает, разрабатывает и запускает сайты, CRM, кабинеты, ботов и веб-сервисы.",
    serviceName: "TIVONIX Partners — Referral и White-label",
    emailSubject: "TIVONIX Partners — обсуждение сотрудничества",
  },
  hero: {
    h1: "Берите больше заказов на разработку — без найма своей IT-команды",
    subtitle:
      "Для агентств, фрилансеров и студий: вы находите клиента, TIVONIX оценивает, разрабатывает и запускает. Клиент остаётся вашим — выберите Referral или White-label и зарегистрируйтесь в панели.",
    cta: "Стать партнёром",
    loginCta: "Войти в панель",
    trust: "Можно начать с одного проекта • Клиент остаётся вашим • NDA",
  },
  problem: {
    title: "Не отказывайтесь от заказа, если клиенту понадобилась разработка",
    body: [
      { text: "Допустим, вы занимаетесь " },
      { text: "рекламой", pill: true },
      { text: ", " },
      { text: "дизайном", pill: true },
      { text: " или " },
      { text: "продвижением", pill: true },
      { text: ". Клиент доверяет вам, но теперь ему нужен " },
      { text: "сайт, CRM, онлайн-запись или личный кабинет", em: true },
      { text: ". Вам не придётся " },
      { text: "нанимать разработчиков", em: true },
      { text: " или искать исполнителей. Вы передаёте задачу TIVONIX, " },
      { text: "добавляете свою наценку", em: true },
      { text: " и продолжаете вести клиента. Мы оцениваем, разрабатываем, тестируем и " },
      { text: "запускаем продукт", em: true },
      { text: "." },
    ],
    rolesHeading: "Кто за что отвечает",
    roles: [
      {
        title: "Вы",
        items: [
          "находите клиента",
          "обсуждаете с ним бизнес-задачу",
          "называете итоговую цену",
          "остаётесь главным контактом",
          "контролируете отношения с клиентом",
        ],
      },
      {
        title: "TIVONIX",
        items: [
          "разбирается в технической части",
          "рассчитывает партнёрскую стоимость",
          "делает дизайн и разработку",
          "тестирует и запускает проект",
          "показывает каждый этап работы",
        ],
      },
      {
        title: "Ваша выгода",
        items: [
          "не нужно содержать разработчиков в штате",
          "можно принимать более дорогие заказы",
          "клиент остаётся с вами",
          "разница между партнёрской и конечной ценой остаётся вам",
          "вы расширяете услуги своего агентства",
        ],
      },
    ],
  },
  money: {
    label: "Простой пример",
    body: "TIVONIX оценил разработку в $1500. Вы продаёте проект клиенту за $2200. Мы выполняем техническую часть, вы ведёте клиента, а разница $700 остаётся вашему агентству.",
    caption: "Клиент платит вам → вы оставляете наценку → TIVONIX получает партнёрскую стоимость",
    flow: ["У вас есть клиент", "TIVONIX выполняет разработку", "вы зарабатываете на своей наценке"],
    disclaimer:
      "Суммы приведены для примера. Деньги появляются только от реального оплаченного проекта. Стоимость каждого проекта рассчитывается отдельно.",
  },
  models: {
    heading: {
      before: "Передайте клиента или",
      sell: "продайте",
      middle: "проект под своим",
      brand: "брендом",
    },
    menu: [
      { title: "Оценка за 24 часа", description: "Объём, сроки, формат" },
      { title: "White-label", description: "Работа под вашим брендом" },
      { title: "Referral", description: "Вознаграждение после оплаты" },
      { title: "Кабинет партнёра", description: "Статусы и выплаты" },
    ],
    allInOne: {
      title: "Всё под рукой",
      text: "Оценка, модели сотрудничества, комиссия и кабинет сделок — в одном месте.",
    },
    quickStart: {
      pill: "Оценка за 24 часа",
      title: "Быстрый старт",
      text: "Присылаете задачу — получаете объём, сроки и партнёрскую стоимость.",
    },
    status: {
      title: "Прозрачный статус",
      text: "В кабинете видно, на каком этапе сделка и когда будет выплата.",
      steps: [
        { t: "Заявка", d: "контакт получен" },
        { t: "В работе", d: "разработка идёт" },
        { t: "Оплачено", d: "комиссия начислена" },
      ],
    },
    referral: {
      title: "Referral-партнёр",
      text: "Передаёте контакт или добавляете TIVONIX в чат. Мы оцениваем проект, заключаем сделку и выполняем работу. Клиент закрепляется за вами. Партнёрское вознаграждение начисляется после оплаты заказа клиентом.",
      cta: "Стать Referral-партнёром",
      note: "Вознаграждение — только после оплаты клиентом.",
    },
    whiteLabel: {
      title: "White-label",
      text: "Продаёте разработку как услугу агентства. TIVONIX сообщает стоимость разработки. Партнёр самостоятельно назначает конечную цену для своего клиента. Мы не выходим к клиенту без согласия.",
      cta: "Работать по White-label",
      note: "Стоимость, сроки и условия проекта согласовываются после проверки заявки.",
    },
    panelHint: "Регистрация откроется в партнёрской панели TIVONIX",
    footnote: "Регистрация бесплатная. Вознаграждение — только за оплаченные проекты.",
  },
  video: {
    title: "Как работает партнёрство — за 60 секунд",
    subtitle: "От выбора формата до первого проекта в панели TIVONIX.",
  },
  afterReg: {
    title: "Что будет после регистрации",
    lead: "Короткий путь от заявки до доступа в панель.",
    steps: [
      { t: "Вы выбираете формат", d: "Referral или White-label." },
      { t: "Создаёте аккаунт", d: "Указываете свои контакты и отправляете заявку." },
      { t: "Мы проверяем заявку", d: "После одобрения вы принимаете условия сотрудничества." },
      { t: "Получаете доступ к панели", d: "Передаёте клиента или создаёте первый проект и следите за статусами." },
    ],
    disclaimer:
      "Регистрация не означает автоматическое одобрение. Сначала мы проверяем заявку и связываемся с партнёром.",
  },
  capabilities: {
    heading: "Возможности",
    titles: [
      "Сайт или квиз",
      "Бот и автоматизация",
      "CRM или админ-панель",
      "Личный кабинет / сервис",
      "Интеграции",
      "Поддержка и развитие",
    ],
    h2Before: "От страницы под рекламу до",
    h2Pill: "полноценного",
    h2After: "веб-продукта",
  },
  process: {
    title: "Вы контролируете клиента. Мы контролируем разработку",
    lead: "Шесть понятных шагов от заявки до запуска — без размытых сроков и скрытых ролей.",
    steps: ["Заявка", "Разбор", "Оценка", "Согласование", "Разработка", "Запуск"],
  },
  cases: {
    title: "Не концепты, а работающие продукты",
    view: "Смотреть проект",
    all: "Все проекты",
    texts: {
      "neo-terminal":
        "AI-платформа коммерции: каталог, склад, AI-продажи, B2B-закупки, checkout, доставка и операционка мерчанта в одной системе.",
      spliton:
        "Финтех-платформа для музыкальных активов: каталог релизов, покупка долей, кошелёк, вторичный рынок, выплаты и operator portal.",
      slotty:
        "Маркетплейс онлайн-записи: каталог с картой, Telegram Mini App, кабинет исполнителя, platform-admin и оплаты.",
      logovo:
        "Сайт сети шиномонтажа под ключ: 4 филиала, карта, запись, B2B для автопарков, 11 услуг — live на logovo24.by.",
      headmind:
        "Корпоративный сайт консалтинговой компании: Figma → WordPress, услуги, команда, формы заявок — live на headmind.ru.",
      tivonixpanel:
        "Партнёрская панель: сделки, передача клиентов, статусы проектов, комиссии и выплаты — тот же кабинет, что получаете после одобрения.",
    },
  },
  examples: {
    sr: "Примеры моделей Referral и White-label",
    referral: {
      pill: "Referral",
      title: "Пример Referral",
      text: "Клиент оплатил заказ. Партнёрское вознаграждение начисляется после подтверждённой оплаты — не за привлечение других партнёров.",
    },
    whiteLabel: {
      pill: "White-label",
      title: "Пример White-label",
      text: "TIVONIX сообщает стоимость разработки агентству. Агентство само назначает цену клиенту и оставляет разницу себе.",
    },
  },
  faq: {
    title: "Частые вопросы",
    more: "Подробнее",
    items: [
      {
        q: "Кто может стать партнёром?",
        a: "Агентства, студии, фрилансеры и специалисты, у которых уже есть или появляются клиенты на разработку.",
      },
      {
        q: "Чем Referral отличается от White-label?",
        a: "Referral — вы передаёте клиента, TIVONIX ведёт сделку и платит вознаграждение после оплаты. White-label — вы продаёте разработку под своим брендом и сами назначаете цену клиенту.",
      },
      {
        q: "Кто общается с клиентом?",
        a: "В White-label основную коммуникацию ведёте вы. В Referral мы можем общаться напрямую в согласованном формате.",
      },
      {
        q: "Остаётся ли клиент за агентством?",
        a: "Да. Клиент закрепляется за вами — TIVONIX не «забирает» отношения.",
      },
      {
        q: "Когда выплачивается Referral-вознаграждение?",
        a: "После того как клиент оплатил заказ и платёж подтверждён. Деньги только от реального оплаченного проекта.",
      },
      {
        q: "Как агентство зарабатывает на White-label?",
        a: "TIVONIX сообщает стоимость разработки. Вы сами назначаете конечную цену клиенту и оставляете разницу.",
      },
      {
        q: "Может ли TIVONIX выйти к клиенту напрямую?",
        a: "В White-label — только с вашего согласия. В Referral формат общения согласуем заранее.",
      },
      {
        q: "Можно ли начать с одного проекта?",
        a: "Да. Один пилотный проект — нормальный старт.",
      },
      {
        q: "Что будет после регистрации?",
        a: "Заявка уходит на проверку (pending). После одобрения — условия сотрудничества и доступ к панели.",
      },
      {
        q: "Где отслеживать клиентов, сделки и выплаты?",
        a: "В партнёрской панели TIVONIX: статусы сделок, проекты и выплаты в одном кабинете.",
      },
    ],
  },
  final: {
    badge: "Готовы начать",
    title: "Начните с одного проекта",
    body: "Выберите формат, зарегистрируйтесь и отправьте первую задачу через партнёрскую панель.",
    referralCta: "Выбрать Referral",
    whiteLabelCta: "Выбрать White-label",
    loginLink: "Уже есть аккаунт? Войти в панель",
    footnote: "Можно начать с одного проекта • Клиент остаётся вашим • NDA",
  },
  footer: {
    marquee: "WHITE-LABEL · REFERRAL · ПАРТНЁРСКАЯ РАЗРАБОТКА · ПОД ВАШИМ БРЕНДОМ",
    homeAria: "TIVONIX — на главную",
    navAria: "Навигация в подвале",
    formats: "Форматы",
    login: "Войти в панель",
    askTelegram: "Задать вопрос",
    projects: "Проекты",
    contacts: "Контакты",
    channel: "Канал",
    privacy: "Политика",
    privacyAria: "Политика обработки и защиты персональных данных (PDF)",
    consent: "Согласие",
    consentAria: "Согласие на обработку персональных данных (PDF)",
    note: "Разработка для агентств: сайты, CRM, кабинеты и боты под вашим брендом.",
  },
  discuss: {
    label: "Задать вопрос",
    ask: "Опишите задачу в форме — регистрация в панели отдельно",
  },
  ui: {
    client: "Клиент",
    you: "Вы",
    youPct: "Вы",
    estimate: "Оценка TIVONIX",
    markup: "Ваша наценка",
    clientPrice: "Цена клиенту",
  },
};

const EN: PartnersCopy = {
  seo: {
    title: "TIVONIX Partner Program — Referral and White-label",
    description:
      "Refer clients or sell development under your brand. TIVONIX scopes, builds, and ships websites, CRMs, portals, bots, and web products.",
    serviceName: "TIVONIX Partners — Referral and White-label",
    emailSubject: "TIVONIX Partners — partnership discussion",
  },
  hero: {
    h1: "Take on more development work — without hiring your own IT team",
    subtitle:
      "For agencies, freelancers, and studios: you find the client; TIVONIX scopes, builds, and launches. The client stays yours — pick Referral or White-label and register in the panel.",
    cta: "Become a partner",
    loginCta: "Log in to the panel",
    trust: "Start with one project • The client stays yours • NDA",
  },
  problem: {
    title: "Don’t turn down a deal just because the client needs development",
    body: [
      { text: "Say you run " },
      { text: "ads", pill: true },
      { text: ", " },
      { text: "design", pill: true },
      { text: ", or " },
      { text: "growth", pill: true },
      { text: ". Your client trusts you — and now they need " },
      { text: "a website, CRM, online booking, or client portal", em: true },
      { text: ". You don’t have to " },
      { text: "hire developers", em: true },
      { text: " or hunt freelancers. Hand the work to TIVONIX, " },
      { text: "add your markup", em: true },
      { text: ", and keep owning the relationship. We scope, build, test, and " },
      { text: "launch the product", em: true },
      { text: "." },
    ],
    rolesHeading: "Who owns what",
    roles: [
      {
        title: "You",
        items: [
          "find the client",
          "align on the business goal",
          "quote the final price",
          "remain the primary contact",
          "own the client relationship",
        ],
      },
      {
        title: "TIVONIX",
        items: [
          "owns the technical scope",
          "calculates the partner price",
          "handles design and development",
          "tests and ships the project",
          "keeps every stage visible",
        ],
      },
      {
        title: "What’s in it for you",
        items: [
          "no in-house developers required",
          "you can take on higher-value deals",
          "the client stays with you",
          "the gap between partner price and client price is yours",
          "you expand your agency’s service lineup",
        ],
      },
    ],
  },
  money: {
    label: "Simple example",
    body: "TIVONIX prices development at $1,500. You sell the project to the client for $2,200. We deliver the build, you manage the client, and the $700 difference stays with your agency.",
    caption: "Client pays you → you keep the markup → TIVONIX receives the partner price",
    flow: ["You have a client", "TIVONIX builds it", "you earn on your markup"],
    disclaimer:
      "Figures are illustrative. Earnings come only from a real paid project. Every project is priced individually.",
  },
  models: {
    heading: {
      before: "Refer the client — or",
      sell: "sell",
      middle: "the project under your",
      brand: "brand",
    },
    menu: [
      { title: "Estimate in 24 hours", description: "Scope, timeline, format" },
      { title: "White-label", description: "Delivery under your brand" },
      { title: "Referral", description: "Payout after client payment" },
      { title: "Partner panel", description: "Statuses and payouts" },
    ],
    allInOne: {
      title: "Everything in one place",
      text: "Estimates, partnership models, commission, and deal tracking — all in one place.",
    },
    quickStart: {
      pill: "Estimate in 24 hours",
      title: "Fast start",
      text: "Send the brief — get scope, timeline, and partner pricing.",
    },
    status: {
      title: "Transparent status",
      text: "See where each deal stands and when payout is due.",
      steps: [
        { t: "Lead in", d: "contact received" },
        { t: "In progress", d: "build underway" },
        { t: "Paid", d: "commission accrued" },
      ],
    },
    referral: {
      title: "Referral partner",
      text: "Share the contact or add TIVONIX to the chat. We estimate, close, and deliver. The client is attributed to you. Partner reward is accrued after the client pays for the order.",
      cta: "Become a Referral partner",
      note: "Reward only after the client pays.",
    },
    whiteLabel: {
      title: "White-label",
      text: "Sell development as your agency’s service. TIVONIX quotes the build cost. You set the final price for your client. We never contact the client without your approval.",
      cta: "Work White-label",
      note: "Price, timeline, and terms are agreed after we review your application.",
    },
    panelHint: "Registration opens in the TIVONIX partner panel",
    footnote: "Registration is free. Rewards only on paid projects.",
  },
  video: {
    title: "How partnership works — in 60 seconds",
    subtitle: "From choosing a format to your first project in the TIVONIX panel.",
  },
  afterReg: {
    title: "What happens after registration",
    lead: "A short path from application to panel access.",
    steps: [
      { t: "You choose a format", d: "Referral or White-label." },
      { t: "Create an account", d: "Share your contacts and submit the application." },
      { t: "We review the application", d: "After approval, you accept the partnership terms." },
      { t: "You get panel access", d: "Refer a client or create the first project and track statuses." },
    ],
    disclaimer:
      "Registration does not mean automatic approval. We review the application and contact the partner first.",
  },
  capabilities: {
    heading: "Capabilities",
    titles: [
      "Website or quiz",
      "Bot and automation",
      "CRM or admin panel",
      "Client portal / product",
      "Integrations",
      "Support and growth",
    ],
    h2Before: "From an ad landing page to",
    h2Pill: "a full",
    h2After: "web product",
  },
  process: {
    title: "You own the client. We own the build",
    lead: "Six clear steps from request to launch — no fuzzy timelines or hidden roles.",
    steps: ["Request", "Discovery", "Estimate", "Alignment", "Development", "Launch"],
  },
  cases: {
    title: "Not concepts — working products",
    view: "View project",
    all: "All projects",
    texts: {
      "neo-terminal":
        "AI commerce platform: catalog, inventory, AI-assisted sales, B2B procurement, checkout, delivery and merchant ops in one system.",
      spliton:
        "Fintech platform for music assets: release catalog, fractional purchases, wallet, secondary market, payouts, and operator portal.",
      slotty:
        "Booking marketplace for service providers: catalog with map, Telegram Mini App, provider portal, platform admin, and payments.",
      logovo:
        "Turnkey website for a tire-service network: 4 branches, map, booking, fleet B2B billing, 11 service pages — live on logovo24.by.",
      headmind:
        "Corporate site for a business transformation consultancy: Figma → WordPress, services, team, lead forms — live on headmind.ru.",
      tivonixpanel:
        "Partner panel: deals, client handoffs, project statuses, commissions and payouts — the same dashboard you get after approval.",
    },
  },
  examples: {
    sr: "Referral and White-label model examples",
    referral: {
      pill: "Referral",
      title: "Referral example",
      text: "The client paid for the order. Partner reward is accrued after confirmed payment — not for recruiting other partners.",
    },
    whiteLabel: {
      pill: "White-label",
      title: "White-label example",
      text: "TIVONIX quotes the build cost to the agency. The agency sets the client price and keeps the difference.",
    },
  },
  faq: {
    title: "FAQ",
    more: "Details",
    items: [
      {
        q: "Who can become a partner?",
        a: "Agencies, studios, freelancers, and specialists who already have — or will have — clients needing development.",
      },
      {
        q: "How is Referral different from White-label?",
        a: "Referral — you hand over the client; TIVONIX runs the deal and pays a reward after payment. White-label — you sell development under your brand and set the client price yourself.",
      },
      {
        q: "Who talks to the client?",
        a: "In White-label, you own client communication. In Referral, we may speak directly in an agreed format.",
      },
      {
        q: "Does the client stay with the agency?",
        a: "Yes. The client is attributed to you — TIVONIX does not take the relationship.",
      },
      {
        q: "When is the Referral reward paid?",
        a: "After the client pays for the order and payment is confirmed. Money only from a real paid project.",
      },
      {
        q: "How does an agency earn on White-label?",
        a: "TIVONIX quotes the build cost. You set the final client price and keep the difference.",
      },
      {
        q: "Can TIVONIX contact the client directly?",
        a: "In White-label — only with your approval. In Referral, contact format is agreed upfront.",
      },
      {
        q: "Can we start with one project?",
        a: "Yes. One pilot project is a normal start.",
      },
      {
        q: "What happens after registration?",
        a: "Your application goes to review (pending). After approval — partnership terms and panel access.",
      },
      {
        q: "Where do I track clients, deals, and payouts?",
        a: "In the TIVONIX partner panel: deal statuses, projects, and payouts in one place.",
      },
    ],
  },
  final: {
    badge: "Ready to start",
    title: "Start with one project",
    body: "Choose a format, register, and submit the first task through the partner panel.",
    referralCta: "Choose Referral",
    whiteLabelCta: "Choose White-label",
    loginLink: "Already have an account? Log in to the panel",
    footnote: "Start with one project • The client stays yours • NDA",
  },
  footer: {
    marquee: "WHITE-LABEL · REFERRAL · PARTNERSHIP DEVELOPMENT · UNDER YOUR BRAND",
    homeAria: "TIVONIX — home",
    navAria: "Footer navigation",
    formats: "Formats",
    login: "Log in to the panel",
    askTelegram: "Ask a question",
    projects: "Projects",
    contacts: "Contacts",
    channel: "Channel",
    privacy: "Privacy",
    privacyAria: "Privacy Policy (PDF)",
    consent: "Consent",
    consentAria: "Consent to personal data processing (PDF)",
    note: "Development for agencies: websites, CRMs, portals, and bots under your brand.",
  },
  discuss: {
    label: "Ask a question",
    ask: "Describe the task in the form — panel registration is separate",
  },
  ui: {
    client: "Client",
    you: "You",
    youPct: "You",
    estimate: "TIVONIX estimate",
    markup: "Your markup",
    clientPrice: "Client price",
  },
};

const ZH: PartnersCopy = {
  seo: {
    title: "TIVONIX 合作伙伴计划 — Referral 与 White-label",
    description:
      "推荐客户或以您的品牌销售开发。TIVONIX 负责范围、构建并交付网站、CRM、门户、机器人与 Web 产品。",
    serviceName: "TIVONIX Partners — Referral 与 White-label",
    emailSubject: "TIVONIX Partners — 合作沟通",
  },
  hero: {
    h1: "承接更多开发 — 无需自建 IT 团队",
    subtitle:
      "面向代理、自由职业者与工作室：您找客户；TIVONIX 定范围、构建并上线。客户归您 — 选择 Referral 或 White-label 并在面板注册。",
    cta: "成为合作伙伴",
    loginCta: "登录面板",
    trust: "从一个项目开始 • 客户归您 • NDA",
  },
  problem: {
    title: "不要因为客户需要开发就放弃成交",
    body: [
      { text: "说你跑" },
      { text: "广告", pill: true },
      { text: "," },
      { text: "design", pill: true },
      { text: "， 或者" },
      { text: "growth", pill: true },
      { text: "。您的客户信任您——现在他们需要" },
      { text: "网站、CRM、在线预约或客户门户", em: true },
      { text: "。你不必这样做" },
      { text: "招聘开发", em: true },
      { text: "或寻找自由职业者。将工作交给TIVONIX，" },
      { text: "加入您的加价", em: true },
      { text: "，并继续拥有这种关系。我们确定范围、构建、测试和" },
      { text: "上线产品", em: true },
      { text: "." },
    ],
    rolesHeading: "责任归属",
    roles: [
      {
        title: "您",
        items: [
          "找到客户",
          "与业务目标保持一致",
          "确定最终报价",
          "仍然是主要联系人",
          "拥有客户关系",
        ],
      },
      {
        title: "TIVONIX",
        items: [
          "拥有技术范围",
          "计算合作伙伴价格",
          "处理设计和开发",
          "测试并交付项目",
          "让每个阶段都可见",
        ],
      },
      {
        title: "对您意味着什么",
        items: [
          "无需内部开发人员",
          "您可以进行更高价值的交易",
          "客户关系留在您这边",
          "合作价与客户价之间的差价归您",
          "您扩展了代理机构的服务阵容",
        ],
      },
    ],
  },
  money: {
    label: "简单示例",
    body: "TIVONIX 开发报价 $1,500。您以 $2,200 卖给客户。我们交付建设，您管理客户，差额 $700 留在您的代理。",
    caption: "客户付给您 → 您保留加价 → TIVONIX 收取合作价",
    flow: ["您已有客户", "由 TIVONIX 交付", "您赚取加价差"],
    disclaimer:
      "数字仅为示意。收益只来自真实已付款项目。每个项目单独报价。",
  },
  models: {
    heading: {
      before: "推荐客户——或者",
      sell: "销售",
      middle: "您下的项目",
      brand: "品牌",
    },
    menu: [
      { title: "24 小时内评估", description: "范围、周期、形式" },
      { title: "White-label", description: "以您的品牌交付" },
      { title: "Referral", description: "客户付款后结算" },
      { title: "合作伙伴面板", description: "状态与结算" },
    ],
    allInOne: {
      title: "一切集中在一处",
      text: "报价、合作模式、佣金与成交跟踪 — 集中一处。",
    },
    quickStart: {
      pill: "24 小时内评估",
      title: "快速启动",
      text: "发送简报 — 获得范围、周期与合作报价。",
    },
    status: {
      title: "状态透明",
      text: "看清每笔成交状态与结算时间。",
      steps: [
        { t: "引入", d: "收到联系信息" },
        { t: "进行中", d: "建设正在进行中" },
        { t: "已付款", d: "佣金已计提" },
      ],
    },
    referral: {
      title: "Referral 合作伙伴",
      text: "分享联系方式或把 TIVONIX 加入聊天。我们评估、成交并交付。客户归属您。客户为订单付款后计提合作伙伴奖励。",
      cta: "成为 Referral 合作伙伴",
      note: "仅在客户付款后发放奖励。",
    },
    whiteLabel: {
      title: "White-label",
      text: "把开发作为您代理的服务销售。TIVONIX 报出开发成本。您定客户最终价。未经批准我们不联系客户。",
      cta: "以 White-label 合作",
      note: "审核申请后约定价格、周期与条款。",
    },
    panelHint: "在 TIVONIX 合作伙伴面板完成注册",
    footnote: "注册免费。仅在已付款项目上结算奖励。",
  },
  video: {
    title: "合作如何运作 — 60 秒看懂",
    subtitle: "从选择形式到在 TIVONIX 面板中的第一个项目。",
  },
  afterReg: {
    title: "注册之后会发生什么",
    lead: "从申请到面板权限的短路径。",
    steps: [
      { t: "您选择合作形式", d: "推荐或白标签。" },
      { t: "创建账户", d: "留下联系方式并提交申请。" },
      { t: "我们审核申请", d: "审核通过后，您接受合作条款。" },
      { t: "您获得面板权限", d: "推荐客户或创建首个项目并跟踪状态。" },
    ],
    disclaimer:
      "注册不等于自动通过。我们先审核申请并联系合作伙伴。",
  },
  capabilities: {
    heading: "能力",
    titles: [
      "网站或问卷",
      "机器人与自动化",
      "CRM 或管理后台",
      "客户门户 / 产品",
      "集成",
      "支持与增长",
    ],
    h2Before: "从广告着陆页到",
    h2Pill: "一个完整的",
    h2After: "Web 产品",
  },
  process: {
    title: "客户归您。交付归我们",
    lead: "从需求到上线六步清晰 — 没有模糊周期或隐藏角色。",
    steps: ["需求", "需求梳理", "评估", "对齐确认", "开发", "上线"],
  },
  cases: {
    title: "不是概念图 — 是可运行产品",
    view: "查看项目",
    all: "全部项目",
    texts: {
      "neo-terminal":
        "AI 商业平台：目录、库存、AI 辅助销售、B2B 采购、结算、配送与商家运营一体化。",
      spliton:
        "音乐资产金融科技平台：发行目录、份额购买、钱包、二级市场、结算与 operator portal。",
      slotty:
        "服务预约市场：带地图的目录、Telegram Mini App、服务商门户、平台管理与支付。",
      logovo:
        "轮胎服务网络交钥匙网站：4 个网点、地图、预约、车队 B2B、11 项服务 — 已在 logovo24.by 上线。",
      headmind:
        "商业转型咨询公司官网：Figma → WordPress，服务、团队、询盘表单 — 已在 headmind.ru 上线。",
      tivonixpanel:
        "合作伙伴面板：交易、客户转交、项目状态、佣金与付款 — 审核通过后使用的同一套后台。",
    },
  },
  examples: {
    sr: "Referral 与 White-label 示例",
    referral: {
      pill: "Referral",
      title: "Referral 示例",
      text: "客户已为订单付款。合作伙伴奖励在确认到账后计提 — 不是招募其他伙伴的奖励。",
    },
    whiteLabel: {
      pill: "White-label",
      title: "White-label 示例",
      text: "TIVONIX 向代理报出开发成本。代理设定客户价并保留差价。",
    },
  },
  faq: {
    title: "FAQ",
    more: "详情",
    items: [
      {
        q: "谁可以成为合作伙伴？",
        a: "已有或将有开发需求客户的代理、工作室、自由职业者与专家。",
      },
      {
        q: "Referral 与 White-label 有何不同？",
        a: "Referral — 您移交客户；TIVONIX 跟进成交，付款后发放奖励。White-label — 以您的品牌销售开发，客户价由您自定。",
      },
      {
        q: "谁与客户沟通？",
        a: "White-label 下客户沟通由您负责。Referral 下我们可按约定形式直接沟通。",
      },
      {
        q: "客户关系是否留在代理？",
        a: "是的。客户归属您 — TIVONIX 不抢客户关系。",
      },
      {
        q: "Referral 奖励何时发放？",
        a: "客户为订单付款且确认到账后。奖励只来自真实已付款项目。",
      },
      {
        q: "代理如何通过 White-label 获利？",
        a: "TIVONIX 给出开发成本。您定最终客户价并保留差价。",
      },
      {
        q: "TIVONIX 可以直接联系客户吗？",
        a: "White-label — 仅在您批准下联系。Referral 则事先约定联系形式。",
      },
      {
        q: "可以从一个项目开始吗？",
        a: "可以。用一个试点项目起步很常见。",
      },
      {
        q: "注册之后会发生什么？",
        a: "申请进入审核（pending）。通过后 — 合作条款与面板权限。",
      },
      {
        q: "在哪里跟踪客户、成交与结算？",
        a: "在 TIVONIX 合作伙伴面板：成交状态、项目与结算集中一处。",
      },
    ],
  },
  final: {
    badge: "准备开始",
    title: "从一个项目开始",
    body: "选择形式、注册，并通过合作伙伴面板提交首个任务。",
    referralCta: "选择 Referral",
    whiteLabelCta: "选择 White-label",
    loginLink: "已有账户？登录面板",
    footnote: "从一个项目开始 • 客户归您 • NDA",
  },
  footer: {
    marquee: "WHITE-LABEL · REFERRAL · 伙伴开发 · 以您的品牌",
    homeAria: "TIVONIX — 首页",
    navAria: "页脚导航",
    formats: "形式",
    login: "登录面板",
    askTelegram: "提问",
    projects: "项目",
    contacts: "联系方式",
    channel: "渠道",
    privacy: "隐私",
    privacyAria: "隐私政策（PDF）",
    consent: "同意",
    consentAria: "个人信息处理同意（PDF）",
    note: "面向代理的开发：以您的品牌交付网站、CRM、门户与机器人。",
  },
  discuss: {
    label: "提问",
    ask: "在表单中描述需求 — 面板注册另行完成",
  },
  ui: {
    client: "客户",
    you: "您",
    youPct: "您",
    estimate: "TIVONIX 报价",
    markup: "您的加价",
    clientPrice: "客户报价",
  },
};

export function getPartnersCopy(lang: Lang): PartnersCopy {
  if (lang === "zh") return ZH;
  return lang === "en" ? EN : RU;
}

export const PARTNERS_DOCS = {
  ru: {
    privacy: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
    consent: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
  },
  en: {
    privacy: "/doc/Privacy_Policy_Tivonix_EN.pdf",
    consent: "/doc/Consent_Tivonix_EN.pdf",
  },
  zh: {
    privacy: "/doc/Privacy_Policy_Tivonix_EN.pdf",
    consent: "/doc/Consent_Tivonix_EN.pdf",
  },
} as const;
