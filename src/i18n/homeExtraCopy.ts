import type { Lang } from "./LangProvider";

/** Copy for new / rewritten home sections (RU + EN). */
export function homeExtraCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "ru" ? COPY_RU : COPY_EN;
}

const COPY_RU = {
  trust: {
    ariaLabel: "Почему можно доверять",
    items: [
      "Договор и фиксация объёма до старта",
      "Поэтапная оплата по частям работы",
      "Передача исходного кода и доступов",
      "Гарантийные исправления ошибок после запуска",
      "Письменные отчёты о прогрессе",
    ],
  },
  featured: {
    eyebrow: "Проекты",
    title: "Три кейса из портфолио",
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
            id: "neo-terminal",
            type: "AI Commerce · RetailTech",
            problem:
              "Розничные данные живут в разных местах: каталоги, ERP, сообщения, склады и таблицы. Клиенты ждут ответа, пока команда вручную сшивает одну и ту же информацию по каналам.",
            solution:
              "Собрали единый коммерческий слой: загрузка каталога, склад, продажи с AI, Smart City, B2B-закупки, омниканальные диалоги, checkout, доставка и операции мерчанта.",
            result:
              "Одна операционная система коммерции, где товары, остатки, диалоги, заказы и бизнес-процессы живут на одном слое данных.",
            modules: [
              "AI Seller",
              "Smart Inventory",
              "B2B",
              "Smart City",
              "Omnichannel",
              "Merchant OS",
            ],
          },
          {
            id: "spliton",
            type: "Веб-продукт · FinTech",
        problem:
          "Нужна была финтех-платформа для долей в музыке — не лендинг, а полноценный продукт с деньгами, ролями и комплаенсом.",
        solution:
          "Собрали каталог релизов, кабинеты, KYC, платежи, вторичный рынок и портал оператора.",
        result:
          "Финтех-платформа: кабинеты, роли, KYC, платежи и вторичный рынок. Поддерживается TIVONIX.",
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
          "Платформа на slotty.of.by: запись без звонков, кабинеты и платежи в одной системе.",
        modules: [
          "Каталог",
          "Карта",
          "Слоты",
          "Кабинет мастера",
          "Telegram",
          "bePaid",
        ],
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
      "Contract and scope fixed before kickoff",
      "Staged payment by work milestones",
      "Source code and access handover",
      "Warranty bug fixes after launch",
      "Written progress reports",
    ],
  },
  featured: {
    eyebrow: "Projects",
    title: "Three portfolio case studies",
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
            id: "neo-terminal",
            type: "AI Commerce · RetailTech",
            problem:
              "Retail data lives in different places: product catalogs, ERP systems, messages, warehouses and spreadsheets. Customers wait for answers while teams manually reconnect the same information across channels.",
            solution:
              "We built a unified commerce layer with catalog ingestion, inventory, AI-assisted selling, Smart City discovery, B2B procurement, omnichannel conversations, checkout, delivery and merchant operations.",
            result:
              "One commerce operating system where products, stock, conversations, orders and business workflows share the same data layer.",
            modules: [
              "AI Seller",
              "Smart Inventory",
              "B2B",
              "Smart City",
              "Omnichannel",
              "Merchant OS",
            ],
          },
          {
            id: "spliton",
            type: "Web product · FinTech",
        problem:
          "Needed a fintech platform for music shares — a full product with money flows, roles and compliance, not a landing page.",
        solution:
          "Built release catalog, portals, KYC, payments, secondary market and an operator portal.",
        result:
          "Fintech platform: portals, roles, KYC, payments and a secondary market. Supported by TIVONIX.",
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
          "Needed more than a “book now” landing — a booking platform with catalog, slots, service provider portal and payments.",
        solution:
          "Built filtered catalog + map, Telegram Mini App, Free/Pro service provider portal, admin and bePaid.",
        result:
          "Platform on slotty.of.by: book without calls, portals and payments in one system.",
        modules: [
          "Catalog",
          "Map",
          "Slots",
          "Service provider portal",
          "Telegram",
          "bePaid",
        ],
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
      { value: "100%", label: "Code and access yours" },
      { value: "BY · RU", label: "Where we ship" },
    ],
  },
  mobileSticky: {
    label: "Get an estimate",
  },
} as const;

const COPY_ZH = {
  trust: {
    ariaLabel: "为什么可以信任我们",
    items: [
      "合同与范围在开工前锁定",
      "按阶段付款",
      "移交源代码与权限",
      "上线后保修修复",
      "书面进度报告",
    ],
  },
  featured: {
    eyebrow: "项目",
    title: "三个已上线成果",
    subtitle: "不同类型项目 — 从金融科技平台到本地生意。",
    viewCase: "查看案例",
    openLive: "打开线上项目",
    problem: "问题：",
    solution: "方案：",
    resultLabel: "结果：",
        prev: "上一个案例",
        next: "下一个案例",
        items: [
          {
            id: "neo-terminal",
            type: "AI Commerce · RetailTech",
            problem:
              "零售数据分散在目录、ERP、消息、仓库和表格里。客户在等回复，团队却在各渠道手工拼接同一份信息。",
            solution:
              "我们构建了统一的商业层：目录接入、库存、AI 辅助销售、Smart City、B2B 采购、全渠道对话、结算、配送与商家运营。",
            result:
              "一套商业操作系统：商品、库存、对话、订单与业务流程共享同一数据层。",
            modules: [
              "AI Seller",
              "Smart Inventory",
              "B2B",
              "Smart City",
              "Omnichannel",
              "Merchant OS",
            ],
          },
          {
            id: "spliton",
            type: "Web 产品 · 金融科技",
        problem:
          "需要音乐份额金融科技平台 — 含资金流、角色与合规的完整产品，不是落地页。",
        solution:
          "交付发行目录、门户、KYC、支付、二级市场与运营门户。",
        result:
          "已上线金融科技平台：门户、角色、KYC、支付与二级市场。",
        modules: [
          "门户",
          "KYC",
          "Payments",
          "二级市场",
          "管理",
          "i18n",
        ],
      },
      {
        id: "slotty",
        type: "市场平台 · 预约",
        problem:
          "需要的不只是「立即预约」落地页 — 而是含目录、时段、师傅后台与支付的预约市场。",
        solution:
          "交付带筛选目录 + 地图、Telegram Mini App、Free/Pro 师傅后台、管理端与 bePaid。",
        result:
          "slotty.of.by 市场平台：无需电话即可预约，后台与支付一体。",
        modules: [
          "目录",
          "地图",
          "时段",
          "师傅后台",
          "Telegram",
          "bePaid",
        ],
      },
    ],
  },
  direction: {
    eyebrow: "方向",
    title: "您要启动什么？",
    subtitle: "选择方向 — 我们梳理需求并建议第一步。",
    leads: {
      label: "线索",
      title: "每条线索一条链路",
      text: "网站、机器人与 CRM — 一条回复路径。",
      cta: "梳理路径",
      points: ["网站与落地页", "Telegram 机器人", "迷你 CRM"],
      stack: [
        {
          title: "网站",
          text: "表单 → 线索即时到达",
          headline: "用户填写表单",
          mock: "表单" as const,
          mockName: "Alex",
          mockContact: "+1 555 010-2030",
          mockSubmit: "发送",
        },
        {
          title: "机器人",
          text: "Telegram 通知",
          headline: "线索进入机器人",
          mock: "机器人" as const,
          mockName: "新线索",
          mockContact: "亚历克斯·现场",
          mockSubmit: "刚刚",
        },
        {
          title: "CRM",
          text: "已指定负责人",
          headline: "业主捡起它",
          mock: "crm" as const,
          mockName: "亚历克斯·现场",
          mockContact: "Anna",
          mockSubmit: "进行中",
        },
      ],
    },
    product: {
      label: "Product",
      title: "启动产品",
      text: "含门户、角色与支付的 MVP。",
      cta: "沟通 MVP",
      points: ["客户门户", "角色与权限", "Payments"],
      stack: [
        {
          title: "软件即服务/MVP",
          text: "首个可运行版本",
          headline: "交付第一版",
          mock: "mvp" as const,
          mockName: "仪表盘",
          mockContact: "12 项任务",
          mockSubmit: "已上线",
        },
        {
          title: "门户",
          text: "角色清晰不乱",
          headline: "门户中的角色与权限",
          mock: "cabinet" as const,
          mockName: "客户",
          mockContact: "经理",
          mockSubmit: "管理",
        },
        {
          title: "Payments",
          text: "含集成",
          headline: "完成支付对接",
          mock: "支付" as const,
          mockName: "支付",
          mockContact: "$49",
          mockSubmit: "已付款",
        },
      ],
    },
  },
  solution: {
    outcomes: [
      "线索不丢失",
      "已指定负责人",
      "下一步清晰可见",
    ],
  },
  aiScenarios: {
    title: "真正省时间的 AI",
    note: "按任务与数据要求选型 — 不为贴 logo 而加 AI。",
    items: [
      {
        title: "线索分流",
        text: "AI 识别主题、提取关键字段并把线索路由到正确负责人。",
      },
      {
        title: "文档处理",
        text: "系统读取文件、提取信息并填入正确字段。",
      },
      {
        title: "经理协助",
        text: "AI 在企业知识库中检索信息，并起草给客户的回复。",
      },
    ],
  },
  homePricing: {
    eyebrow: "价格",
    title: "清晰起步，没有空泛承诺",
    note: "价格取决于页面、角色、集成与业务逻辑。开工前锁定范围、阶段与费用。",
    allPlans: "对比全部方案",
    more: "详情",
    ctas: {
      start: "获取 Start 范围",
      growth: "评估 Growth",
      product: "评估 MVP",
      custom: "沟通 Custom",
    },
  },
  guarantees: {
    title: "开发前条款清晰",
    subtitle: "开工前把范围、周期、费用与职责写清楚。",
    items: [
      "阶段开始前锁定范围与费用",
      "工作拆成清晰阶段",
      "您能看到中间成果",
      "移交源代码与权限",
      "机密数据不会公开",
      "上线前校验关键流程",
      "支持条款事先约定",
    ],
  },
  founder: {
    title: "有真人负责项目 — 不是无名工作室",
    name: "Danila Titovets",
    role: "TIVONIX 创始人，全栈开发者",
    bio: "负责架构、开发与上线。按任务引入设计、前端、后端、移动与增长专家。",
    cta: "联系创始人",
  },
  team: {
    title: "团队为您的项目协作",
    text: "TIVONIX 是产品团队：设计、工程、QA 与上线一体闭环。按任务组队快速交付 — 把想法变成已上线结果。白俄罗斯技术团队，服务进入白俄罗斯与 EAEU 的企业。",
    cta: "关于公司",
    members: [
      { initials: "DT", name: "Danila T.", role: "架构与全栈" },
      { initials: "AK", name: "Anna K.", role: "UI/UX 设计" },
      { initials: "MS", name: "Maxim S.", role: "前端工程" },
      { initials: "IV", name: "Igor V.", role: "后端工程" },
      { initials: "EN", name: "Elena N.", role: "QA 与测试" },
      { initials: "RP", name: "Roman P.", role: "项目管理" },
    ],
  },
  testimonials: {
    eyebrow: "客户评价",
    title: "客户怎么说",
    viewCase: "案例",
    ownProduct: "TIVONIX 自有产品",
  },
  scale: {
    badge: "已上线系统",
    title: "交付线索不丢失的产品",
    seal: "从想法到上线",
    foot: "网站、Telegram、CRM、门户与 MVP 在同一闭环。锁定范围与周期，再移交代码与权限。",
    stats: [
      { value: "7+", label: "已上线项目" },
      { value: "100%", label: "代码与权限归您" },
      { value: "BY · RU", label: "交付地区" },
    ],
  },
  mobileSticky: {
    label: "获取评估",
  },
} as const;
