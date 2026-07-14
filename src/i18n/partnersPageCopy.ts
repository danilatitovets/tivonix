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
      spliton:
        "Финтех-платформа для музыкальных активов: каталог релизов, покупка долей, кошелёк, вторичный рынок, выплаты и административная система.",
      slotty:
        "Система онлайн-записи: услуги, расписание, бронирование, напоминания, портфолио, подписки и личный кабинет.",
      giftsniper:
        "Telegram-продукт для анализа NFT и Gifts: ссылки, рыночные данные, характеристики и ориентировочная оценка.",
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
    ask: "Telegram — только вопрос, регистрация в панели",
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
      spliton:
        "Fintech platform for music assets: release catalog, fractional purchases, wallet, secondary market, payouts, and admin system.",
      slotty:
        "Online booking system: services, schedule, reservations, reminders, portfolio, subscriptions, and client portal.",
      giftsniper:
        "Telegram product for NFT and Gifts analysis: links, market data, attributes, and estimated valuation.",
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
    ask: "Telegram for questions — registration is in the panel",
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

export function getPartnersCopy(lang: Lang): PartnersCopy {
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
} as const;
