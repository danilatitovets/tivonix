import type { Lang } from "./LangProvider";

export type AutomationSignItem = {
  number: string;
  title: string;
  text: string;
  image: string;
};

export type AutomationPainItem = { title: string; text: string; image: string };
export type AutomationWhyBenefit = { title: string; text: string };
export type AutomationFeatureSlide = { title: string; text: string; image: string };
export type AutomationFaqItem = { q: string; a: string };
export type AutomationWhyTivonixPoint = { title: string; text: string };

export type AutomationPageCopy = {
  seo: { title: string; description: string };
  schemaServiceName: string;
  hero: {
    h1Line1: string;
    h1Line2: string;
    subtitle: string;
    /** Мини-кнопки под подзаголовком */
    microCtaTelegram: string;
    microCtaEmail: string;
    microCtaEmailSubject: string;
    badges: [string, string, string];
    ctaDiscuss: string;
    ctaCases: string;
    heroImgAlt: string;
  };
  signs: {
    sectionTitle: string;
    sectionLead: string;
    /** aria-label для списка карточек */
    ariaList: string;
    items: AutomationSignItem[];
  };
  pain: {
    title: string;
    lead: string;
    items: AutomationPainItem[];
  };
  why: {
    h2Line1: string;
    h2Line2: string;
    subtitle: string;
    benefits: AutomationWhyBenefit[];
  };
  features: {
    title: string;
    ariaRegion: string;
    ariaCarousel: string;
    prev: string;
    next: string;
    slides: AutomationFeatureSlide[];
  };
  examples: {
    title: string;
    body: string;
    srOnly: string;
  };
  /** Подписи к иконкам в AutomationEcosystemMap (порядок как в массиве icons) */
  ecosystemLabels: string[];
  results: {
    title: string;
    folderLabel: string;
    folderMeta: (count: number) => string;
    cta: string;
    items: string[];
  };
  whyTivonix: {
    bandTitle: string;
    points: AutomationWhyTivonixPoint[];
  };
  faq: {
    title: string;
    items: AutomationFaqItem[];
  };
  ctaBlock: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    footnote: string;
  };
  common: { imageFallback: string };
};

const ru: AutomationPageCopy = {
  seo: {
    title: "Автоматизация бизнеса — TIVONIX",
    description:
      "Автоматизация процессов, CRM, личные кабинеты, админ-панели и интеграции под реальные задачи бизнеса.",
  },
  schemaServiceName: "Автоматизация бизнеса TIVONIX",
  hero: {
    h1Line1: "Автоматизируем процессы",
    h1Line2: "вашего бизнеса",
    subtitle:
      "Помогаем убрать ручную работу, связать сервисы и навести порядок в заявках, клиентах, отчётах и внутренних процессах.",
    microCtaTelegram: "В Telegram",
    microCtaEmail: "На почту",
    microCtaEmailSubject: "Автоматизация бизнеса — заявка",
    badges: ["консультация без оплаты", "быстрый разбор", "чёткий план старта"],
    ctaDiscuss: "Обсудить автоматизацию",
    ctaCases: "Посмотреть кейсы",
    heroImgAlt: "Схема автоматизации бизнес-процессов",
  },
  signs: {
    sectionTitle: "Когда уже пора автоматизировать процессы",
    sectionLead:
      "Обычно автоматизация нужна не «когда-нибудь потом», а в тот момент, когда бизнес начинает упираться в хаос, ручную работу и потерю контроля.",
    ariaList: "Признаки, что пора автоматизировать",
    items: [
      {
        number: "01",
        title: "Потерянные заявки",
        text: "Заявки приходят из разных источников и не собираются в одной системе, часть обращений теряется или обрабатывается слишком поздно.",
        image: "1.webp",
      },
      {
        number: "02",
        title: "Клиенты ведутся вручную",
        text: "Менеджеры хранят информацию в таблицах, чатах и заметках, поэтому история клиента быстро распадается на куски.",
        image: "2.webp",
      },
      {
        number: "03",
        title: "Ручной перенос данных",
        text: "Одни и те же данные копируются между CRM, таблицами, почтой и документами. Это забирает время и создаёт ошибки.",
        image: "3.webp",
      },
      {
        number: "04",
        title: "Нет прозрачной аналитики",
        text: "Данные разбросаны по разным местам. Чтобы понять, что происходит в бизнесе, приходится собирать всё вручную.",
        image: "4.webp",
      },
      {
        number: "05",
        title: "Повторяющиеся вопросы клиентов",
        text: "Команда снова и снова отвечает на одинаковые сообщения вместо того, чтобы заниматься продажами и развитием.",
        image: "5.webp",
      },
      {
        number: "06",
        title: "Много повторяющихся действий",
        text: "Статусы, уведомления, напоминания, отчёты и передача задач выполняются руками, хотя это можно автоматизировать.",
        image: "6.webp",
      },
      {
        number: "07",
        title: "Готовые сервисы не подходят под вашу логику работы",
        text: "Бизнес работает по своим правилам, а стандартные инструменты не закрывают процесс полностью.",
        image: "7.webp",
      },
    ],
  },
  pain: {
    title: "Где бизнес теряет заявки, время и деньги",
    lead: "Когда процессы разбросаны по CRM, таблицам и мессенджерам, команда работает вручную, а часть клиентов просто выпадает из системы.",
    items: [
      {
        title: "Ручной перенос данных",
        text: "Информация копируется между таблицами, CRM, почтой и мессенджерами. Из-за этого появляются ошибки, дубли и потери данных.",
        image: "1.webp",
      },
      {
        title: "Потерянные заявки",
        text: "Когда заявки приходят из разных каналов и не собираются в одной системе, часть обращений теряется или обрабатывается слишком поздно.",
        image: "2.webp",
      },
      {
        title: "Нет прозрачной аналитики",
        text: "Данные разбросаны по разным местам. Чтобы понять, что происходит в бизнесе, приходится собирать всё вручную.",
        image: "3.webp",
      },
    ],
  },
  why: {
    h2Line1: "Автоматизируем процессы",
    h2Line2: "вашего бизнеса",
    subtitle:
      "Автоматизация убирает рутину, ускоряет обработку заявок и даёт прозрачный контроль процессов.",
    benefits: [
      {
        title: "Меньше ручной работы",
        text: "Рутинные операции и перенос данных между сервисами автоматизируются. Команда меньше копирует данные вручную и реже допускает ошибки.",
      },
      {
        title: "Быстрее обработка заявок",
        text: "Все обращения сразу попадают в единую систему. Статусы, уведомления и очередь обработки ведутся без потерь в чатах.",
      },
      {
        title: "Понятный контроль процессов",
        text: "Этапы, задачи и отчеты собраны в одном месте. Вы видите реальную картину по процессам без ручной сборки таблиц.",
      },
      {
        title: "Удобная работа команды",
        text: "Роли, доступы и сценарии настраиваются под вашу бизнес-логику. Каждый сотрудник работает в своем интерфейсе и по своим задачам.",
      },
      {
        title: "Больше времени на рост",
        text: "Команда фокусируется на продукте, клиентах и развитии. Повторяющиеся операции выполняются автоматически.",
      },
      {
        title: "Меньше ошибок в данных",
        text: "Единая логика обработки и автоматические сценарии снижают количество дубликатов и некорректных записей в данных.",
      },
    ],
  },
  features: {
    title: "Что можно автоматизировать",
    ariaRegion: "Направления автоматизации",
    ariaCarousel: "карусель",
    prev: "Предыдущий слайд",
    next: "Следующий слайд",
    slides: [
      {
        title: "Обработка заявок",
        text: "Соберём заявки с сайта, форм, Telegram, email и других источников в одном месте.",
        image: "1.webp",
      },
      {
        title: "CRM и воронки продаж",
        text: "Настроим систему для работы с клиентами, статусами, задачами и этапами продаж.",
        image: "2.webp",
      },
      {
        title: "Личные кабинеты",
        text: "Разработаем кабинеты для клиентов, сотрудников или партнёров с нужными функциями и ролями.",
        image: "3.webp",
      },
      {
        title: "Админ-панели",
        text: "Сделаем удобные внутренние панели управления для заявок, пользователей, заказов, контента и процессов.",
        image: "4.webp",
      },
      {
        title: "Уведомления и напоминания",
        text: "Настроим автоматические уведомления в Telegram, email или внутри системы.",
        image: "5.webp",
      },
      {
        title: "Отчёты и аналитика",
        text: "Соберём ключевые показатели в удобные дашборды и понятные отчёты.",
        image: "6.webp",
      },
      {
        title: "Оплаты и документы",
        text: "Подключим оплату, статусы платежей, подтверждения, документы и логику после оплаты.",
        image: "7.webp",
      },
      {
        title: "Интеграции с внешними сервисами",
        text: "Свяжем сайт, CRM, Telegram, таблицы, платёжные системы, API и другие инструменты.",
        image: "8.webp",
      },
    ],
  },
  examples: {
    title: "Заявки, кабинеты, уведомления и оплаты в одной логике.",
    body: "Одна система связывает каналы и заявки, статусы и путь клиента, личные кабинеты и админку, записи и сообщения — без ручных переносов и потерянных обращений.",
    srOnly: "Одна цепочка в продукте",
  },
  ecosystemLabels: [
    "Telegram",
    "Email",
    "CRM",
    "Таблицы",
    "WhatsApp",
    "Notion",
    "Календарь",
    "Задачи",
    "Оплаты",
    "Документы",
    "Отчёты",
    "Автоматизация",
    "Уведомления",
  ],
  results: {
    title: "Что вы получите в результате",
    folderLabel: "Папка результата",
    folderMeta: (count) => `${count} пунктов после проекта`,
    cta: "Узнать свой результат",
    items: [
      "Понятную структуру будущей системы",
      "Прототип экранов и логики",
      "Веб-сервис или внутренний инструмент под ваш процесс",
      "Админ-панель для управления",
      "Интеграции с нужными сервисами",
      "Уведомления, статусы и автоматические действия",
      "Поддержку запуска и дальнейшего развития",
    ],
  },
  whyTivonix: {
    bandTitle: "Автоматизация, которая работает под ваш бизнес",
    points: [
      {
        title: "Не просто сайт, а рабочая система",
        text: "Мы смотрим шире: заявки, данные, пользователи, процессы, админка, интеграции и развитие после запуска.",
      },
      {
        title: "Объясняем простым языком",
        text: "Без технической путаницы. Показываем, что именно нужно сделать, зачем это нужно и как это поможет бизнесу.",
      },
      {
        title: "Можно начать с MVP",
        text: "Не обязательно сразу строить большую систему. Часто лучше запустить первую рабочую версию и развивать её поэтапно.",
      },
      {
        title: "Берём на себя весь процесс",
        text: "Структура, дизайн, разработка, интеграции, тестирование и запуск — всё в одном месте.",
      },
    ],
  },
  faq: {
    title: "Частые вопросы",
    items: [
      {
        q: "Сколько стоит автоматизация бизнеса?",
        a: "Стоимость зависит от объёма задачи: ролей, экранов, логики, интеграций и сценариев. После короткого разбора мы сможем дать ориентир по бюджету.",
      },
      {
        q: "Сколько времени занимает разработка?",
        a: "Это зависит от сложности решения. Небольшую систему можно запустить быстрее, более сложный продукт требует больше этапов. Часто оптимально начинать с MVP.",
      },
      {
        q: "Можно автоматизировать только один процесс?",
        a: "Да. Часто это лучший вариант. Например, сначала автоматизировать заявки, а потом постепенно добавить личный кабинет, аналитику, оплаты и другие блоки.",
      },
      {
        q: "Вы делаете интеграции с Telegram, оплатами и внешними сервисами?",
        a: "Да. Мы можем подключить Telegram, email, платёжные системы, CRM, таблицы, API и другие сервисы.",
      },
      {
        q: "Что лучше: готовый сервис или разработка под себя?",
        a: "Если задача типовая, может подойти готовый сервис. Если у бизнеса своя логика и нестандартные процессы, лучше делать решение под себя.",
      },
      {
        q: "Нужно ли техническое задание?",
        a: "Нет. На старте достаточно описать задачу простыми словами. Мы сами поможем разобраться, сформировать структуру и определить первый этап.",
      },
    ],
  },
  ctaBlock: {
    title: "Покажем, что можно автоматизировать именно у вас",
    body: "Расскажите, как сейчас устроена работа в вашем бизнесе. Мы разберём процессы, найдём точки автоматизации и предложим понятное решение: от простого внутреннего инструмента до полноценного веб-сервиса.",
    primary: "Получить консультацию",
    secondary: "Написать в Telegram",
    footnote: "Ответим в течение дня и подскажем, с чего лучше начать.",
  },
  common: { imageFallback: "Изображение скоро появится" },
};

const en: AutomationPageCopy = {
  seo: {
    title: "Business automation — TIVONIX",
    description:
      "Process automation, CRM, client portals, admin panels, and integrations tailored to real business workflows.",
  },
  schemaServiceName: "TIVONIX business automation",
  hero: {
    h1Line1: "We automate workflows",
    h1Line2: "for your business",
    subtitle:
      "We help remove manual work, connect your tools, and bring order to leads, customers, reporting, and internal processes.",
    microCtaTelegram: "Telegram",
    microCtaEmail: "Email",
    microCtaEmailSubject: "Business automation inquiry",
    badges: ["Free intro call", "Fast discovery", "A clear starting plan"],
    ctaDiscuss: "Discuss automation",
    ctaCases: "View case studies",
    heroImgAlt: "Diagram of automated business processes",
  },
  signs: {
    sectionTitle: "When it’s time to automate your processes",
    sectionLead:
      "Automation is rarely “someday”—it matters when the business hits chaos, manual overload, and loss of control.",
    ariaList: "Signs you should automate",
    items: [
      {
        number: "01",
        title: "Lost leads",
        text: "Inquiries arrive from many channels and never land in one system—some are lost or handled too late.",
        image: "1.webp",
      },
      {
        number: "02",
        title: "Clients tracked by hand",
        text: "Teams keep context in spreadsheets, chats, and notes, so the customer story falls apart.",
        image: "2.webp",
      },
      {
        number: "03",
        title: "Manual data copying",
        text: "The same data is retyped across CRM, sheets, email, and documents—slow and error-prone.",
        image: "3.webp",
      },
      {
        number: "04",
        title: "No clear analytics",
        text: "Metrics live in different places; understanding the business means stitching reports manually.",
        image: "4.webp",
      },
      {
        number: "05",
        title: "Repetitive client questions",
        text: "The team answers the same messages again and again instead of selling and growing.",
        image: "5.webp",
      },
      {
        number: "06",
        title: "Too many repeat tasks",
        text: "Statuses, alerts, reminders, reports, and handoffs are done manually though they could run automatically.",
        image: "6.webp",
      },
      {
        number: "07",
        title: "Off-the-shelf tools don’t fit",
        text: "Your business has its own rules; standard products rarely cover the full process.",
        image: "7.webp",
      },
    ],
  },
  pain: {
    title: "Where businesses lose leads, time, and money",
    lead: "When work is split across CRM, spreadsheets, and messengers, teams operate manually and clients slip through the cracks.",
    items: [
      {
        title: "Manual data transfer",
        text: "Information is copied between spreadsheets, CRM, email, and chat—creating errors, duplicates, and gaps.",
        image: "1.webp",
      },
      {
        title: "Lost leads",
        text: "When leads come from many channels and aren’t unified, some inquiries are lost or handled too late.",
        image: "2.webp",
      },
      {
        title: "No transparent analytics",
        text: "Data is scattered; seeing what’s really happening means manual reporting.",
        image: "3.webp",
      },
    ],
  },
  why: {
    h2Line1: "We automate workflows",
    h2Line2: "for your business",
    subtitle: "Automation cuts routine, speeds up lead handling, and gives clear process control.",
    benefits: [
      {
        title: "Less manual work",
        text: "Routine moves between tools are automated—fewer copy-paste mistakes for the team.",
      },
      {
        title: "Faster lead handling",
        text: "Every inquiry lands in one system with statuses and notifications—nothing dies in chat threads.",
      },
      {
        title: "Clear process control",
        text: "Stages, tasks, and reports live in one place—no more one-off spreadsheet dashboards.",
      },
      {
        title: "Better team experience",
        text: "Roles, access, and flows match your logic—each person works in the right interface.",
      },
      {
        title: "More time to grow",
        text: "The team focuses on product and customers while repeat work runs in the background.",
      },
      {
        title: "Fewer data errors",
        text: "One processing model and automated steps reduce duplicates and bad records.",
      },
    ],
  },
  features: {
    title: "What you can automate",
    ariaRegion: "Automation topics",
    ariaCarousel: "carousel",
    prev: "Previous slide",
    next: "Next slide",
    slides: [
      {
        title: "Lead capture",
        text: "Bring leads from your site, forms, Telegram, email, and other sources into one place.",
        image: "1.webp",
      },
      {
        title: "CRM & sales pipelines",
        text: "Set up clients, statuses, tasks, and pipeline stages the way you sell.",
        image: "2.webp",
      },
      {
        title: "Client portals",
        text: "Build portals for customers, staff, or partners with the right features and roles.",
        image: "3.webp",
      },
      {
        title: "Admin panels",
        text: "Internal tools for leads, users, orders, content, and operations—tailored to your process.",
        image: "4.webp",
      },
      {
        title: "Notifications & reminders",
        text: "Automated alerts in Telegram, email, or inside your product.",
        image: "5.webp",
      },
      {
        title: "Reporting & analytics",
        text: "Dashboards and reports for the KPIs that matter.",
        image: "6.webp",
      },
      {
        title: "Payments & documents",
        text: "Payments, statuses, confirmations, documents, and post-payment logic.",
        image: "7.webp",
      },
      {
        title: "External integrations",
        text: "Connect site, CRM, Telegram, spreadsheets, payments, APIs, and more.",
        image: "8.webp",
      },
    ],
  },
  examples: {
    title: "Leads, portals, notifications, and payments in one flow.",
    body: "One system ties channels and leads, statuses and the customer journey, portals and admin, records and messages—without manual re-entry or lost inquiries.",
    srOnly: "One connected product flow",
  },
  ecosystemLabels: [
    "Telegram",
    "Email",
    "CRM",
    "Sheets",
    "WhatsApp",
    "Notion",
    "Calendar",
    "Tasks",
    "Payments",
    "Documents",
    "Reports",
    "Automation",
    "Notifications",
  ],
  results: {
    title: "What you get when we’re done",
    folderLabel: "Delivery folder",
    folderMeta: (count) => `${count} deliverables after the project`,
    cta: "See what we could build for you",
    items: [
      "A clear structure for the future system",
      "A prototype of screens and logic",
      "A web service or internal tool for your process",
      "An admin panel to operate it",
      "Integrations with the services you need",
      "Notifications, statuses, and automated actions",
      "Launch support and a path to iterate",
    ],
  },
  whyTivonix: {
    bandTitle: "Automation shaped around your business",
    points: [
      {
        title: "Not just a site—a working system",
        text: "We think end-to-end: leads, data, users, processes, admin, integrations, and what comes after launch.",
      },
      {
        title: "Plain-language explanations",
        text: "No jargon overload—what to build, why it matters, and how it helps the business.",
      },
      {
        title: "You can start with an MVP",
        text: "You don’t need the full platform on day one; a first working version often wins, then we grow it step by step.",
      },
      {
        title: "We own the full process",
        text: "Structure, design, development, integrations, testing, and launch—one team.",
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "How much does business automation cost?",
        a: "It depends on scope: roles, screens, logic, integrations, and scenarios. After a short discovery we can give a budget range.",
      },
      {
        q: "How long does development take?",
        a: "It varies with complexity. Smaller systems ship faster; larger ones need more phases. Starting with an MVP is often best.",
      },
      {
        q: "Can we automate just one process?",
        a: "Yes—and often that’s ideal. For example, automate leads first, then add portals, analytics, or payments later.",
      },
      {
        q: "Do you integrate Telegram, payments, and other services?",
        a: "Yes—Telegram, email, payments, CRM, spreadsheets, APIs, and more.",
      },
      {
        q: "SaaS product or custom build?",
        a: "For generic tasks, SaaS can work. For unique logic and processes, custom usually fits better.",
      },
      {
        q: "Do I need a full technical specification?",
        a: "No. A plain-language description is enough to start—we help shape structure and the first milestone.",
      },
    ],
  },
  ctaBlock: {
    title: "We’ll show what automation can look like for you",
    body: "Tell us how your business runs today. We’ll map processes, spot automation wins, and propose a clear path—from a simple internal tool to a full web service.",
    primary: "Book a consultation",
    secondary: "Message on Telegram",
    footnote: "We usually reply within a day with a sensible first step.",
  },
  common: { imageFallback: "Image coming soon" },
};

const zh: AutomationPageCopy = {
  seo: {
    title: "业务自动化 — TIVONIX",
    description:
      "流程自动化、CRM、客户门户、管理后台与贴合真实业务流的集成。",
  },
  schemaServiceName: "TIVONIX 业务自动化",
  hero: {
    h1Line1: "我们自动化工作流",
    h1Line2: "服务您的业务",
    subtitle:
      "我们帮您减少手工、连接工具，并理顺线索、客户、报表与内部流程。",
    microCtaTelegram: "Telegram",
    microCtaEmail: "邮箱",
    microCtaEmailSubject: "业务自动化咨询",
    badges: ["免费介绍通话", "快速梳理需求", "清晰的启动计划"],
    ctaDiscuss: "沟通自动化",
    ctaCases: "查看案例",
    heroImgAlt: "自动化业务流程示意",
  },
  signs: {
    sectionTitle: "何时该自动化您的流程",
    sectionLead:
      "自动化很少是「以后再说」— 当业务陷入混乱、手工过载与失控时就该上。",
    ariaList: "该上自动化的信号",
    items: [
      {
        number: "01",
        title: "线索流失",
        text: "咨询来自多渠道却无法汇入一处 — 有的丢失，有的处理太晚。",
        image: "1.webp",
      },
      {
        number: "02",
        title: "客户靠手工跟踪",
        text: "上下文散落在表格、聊天与笔记里，客户故事支离破碎。",
        image: "2.webp",
      },
      {
        number: "03",
        title: "手工复制数据",
        text: "同一数据在 CRM、表格、邮件与文档间反复录入 — 慢且易错。",
        image: "3.webp",
      },
      {
        number: "04",
        title: "没有清晰分析",
        text: "指标分散在各处；看懂业务只能手工拼报表。",
        image: "4.webp",
      },
      {
        number: "05",
        title: "重复的客户问题",
        text: "团队反复回答同一类消息，而不是去成交与增长。",
        image: "5.webp",
      },
      {
        number: "06",
        title: "重复任务过多",
        text: "状态、通知、提醒、报表与交接仍靠手工，尽管本可自动运行。",
        image: "6.webp",
      },
      {
        number: "07",
        title: "现成工具不合适",
        text: "您的业务有自己的规则；标准产品很少覆盖全流程。",
        image: "7.webp",
      },
    ],
  },
  pain: {
    title: "企业在哪里丢失线索、时间与金钱",
    lead: "当工作分散在 CRM、表格与即时通讯中，团队靠手工运转，客户从缝隙溜走。",
    items: [
      {
        title: "手工迁移数据",
        text: "信息在表格、CRM、邮件与聊天间复制 — 造成错误、重复与缺口。",
        image: "1.webp",
      },
      {
        title: "线索流失",
        text: "当线索来自多渠道且未统一，部分咨询会丢失或处理太晚。",
        image: "2.webp",
      },
      {
        title: "没有透明分析",
        text: "数据分散；看清现状只能靠手工报表。",
        image: "3.webp",
      },
    ],
  },
  why: {
    h2Line1: "我们自动化工作流",
    h2Line2: "服务您的业务",
    subtitle: "自动化减少琐事、加快线索处理，并给出清晰过程管控。",
    benefits: [
      {
        title: "减少手工操作",
        text: "工具间的例行搬运自动化 — 团队少复制粘贴出错。",
      },
      {
        title: "更快处理线索",
        text: "每条咨询进入同一系统，带状态与通知 — 不会死在聊天线程里。",
      },
      {
        title: "清晰的过程管控",
        text: "阶段、任务与报表集中一处 — 不再靠临时表格仪表盘。",
      },
      {
        title: "更好的团队体验",
        text: "角色、权限与流程贴合您的逻辑 — 每人在正确界面工作。",
      },
      {
        title: "有更多时间增长",
        text: "团队聚焦产品与客户，重复工作在后台运行。",
      },
      {
        title: "更少数据错误",
        text: "统一处理模型与自动步骤，减少重复与脏数据。",
      },
    ],
  },
  features: {
    title: "您可以自动化什么",
    ariaRegion: "自动化主题",
    ariaCarousel: "carousel",
    prev: "上一张",
    next: "下一张",
    slides: [
      {
        title: "线索获取",
        text: "把网站、表单、Telegram、邮件及其他来源的线索汇入一处。",
        image: "1.webp",
      },
      {
        title: "CRM 与销售漏斗",
        text: "按您的销售方式配置客户、状态、任务与漏斗阶段。",
        image: "2.webp",
      },
      {
        title: "客户门户",
        text: "为客户、员工或伙伴打造具备合适功能与角色的门户。",
        image: "3.webp",
      },
      {
        title: "管理后台",
        text: "面向线索、用户、订单、内容与运营的内部工具 — 贴合您的流程。",
        image: "4.webp",
      },
      {
        title: "通知与提醒",
        text: "在 Telegram、邮件或产品内自动通知。",
        image: "5.webp",
      },
      {
        title: "报表与分析",
        text: "面向关键 KPI 的仪表盘与报表。",
        image: "6.webp",
      },
      {
        title: "支付与文档",
        text: "支付、状态、确认、文档与支付后逻辑。",
        image: "7.webp",
      },
      {
        title: "外部集成",
        text: "连接网站、CRM、Telegram、表格、支付、API 等。",
        image: "8.webp",
      },
    ],
  },
  examples: {
    title: "线索、门户、通知与支付在一条链路。",
    body: "一套系统连接渠道与线索、状态与客户旅程、门户与管理端、记录与消息 — 无需手工重录或丢失咨询。",
    srOnly: "贯通的产品流程",
  },
  ecosystemLabels: [
    "Telegram",
    "邮箱",
    "CRM",
    "表格",
    "WhatsApp",
    "Notion",
    "日历",
    "任务",
    "Payments",
    "文档",
    "报表",
    "自动化",
    "通知",
  ],
  results: {
    title: "交付完成后您得到什么",
    folderLabel: "交付文件夹",
    folderMeta: (count) => `${count} deliverables after the project`,
    cta: "看看我们可以为您做什么",
    items: [
      "未来系统的清晰结构",
      "页面与逻辑原型",
      "服务您流程的 Web 服务或内部工具",
      "可运营的管理后台",
      "对接您需要的服务",
      "通知、状态与自动动作",
      "上线支持与迭代路径",
    ],
  },
  whyTivonix: {
    bandTitle: "围绕您业务定制的自动化",
    points: [
      {
        title: "不只是网站——是能跑通的系统",
        text: "端到端思考：线索、数据、用户、流程、管理、集成，以及上线之后。",
      },
      {
        title: "通俗易懂的说明",
        text: "不堆砌术语 — 做什么、为什么重要、如何帮到业务。",
      },
      {
        title: "可以从 MVP 开始",
        text: "第一天不必上完整平台；先交付可运行第一版，再逐步扩展。",
      },
      {
        title: "我们负责全流程",
        text: "结构、设计、开发、集成、测试与上线 — 同一团队。",
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "业务自动化多少钱？",
        a: "取决于范围：角色、页面、逻辑、集成与场景。短暂梳理后可给出预算区间。",
      },
      {
        q: "开发需要多久？",
        a: "取决于复杂度。小系统更快交付；大系统需要更多阶段。从 MVP 开始往往最好。",
      },
      {
        q: "可以只自动化一个流程吗？",
        a: "可以 — 而且常常是理想路径。例如先自动化线索，再加门户、分析或支付。",
      },
      {
        q: "是否对接 Telegram、支付及其他服务？",
        a: "可以 — Telegram、邮件、支付、CRM、表格、API 等。",
      },
      {
        q: "SaaS 产品还是定制开发？",
        a: "通用任务可用 SaaS。独特逻辑与流程通常更适合定制。",
      },
      {
        q: "需要完整技术规格书吗？",
        a: "不需要。通俗描述即可开工 — 我们帮您梳理结构与首个里程碑。",
      },
    ],
  },
  ctaBlock: {
    title: "我们会展示适合您的自动化形态",
    body: "告诉我们业务现状。我们梳理流程、找出自动化机会，并提出清晰路径 — 从简单内部工具到完整 Web 服务。",
    primary: "预约咨询",
    secondary: "通过 Telegram 联系",
    footnote: "通常一天内回复，并给出合理的第一步。",
  },
  common: { imageFallback: "图片即将上线" },
};

export function getAutomationPageCopy(lang: Lang): AutomationPageCopy {
  if (lang === "zh") return zh;
  return lang === "en" ? en : ru;
}

/** Папка картинок для блока «Когда пора» */
export const AUTOMATION_SIGNS_IMG_DIR = "/images/avtomatizaciya-biznesa/Когда уже пора";
