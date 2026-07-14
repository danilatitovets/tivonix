import type { Lang } from "./LangProvider";

export type ProcessStep =
  | { kind: "bullets"; title: string; items: string[] }
  | { kind: "search"; title: string; query: string; hint?: string };

export function landingCopy(lang: Lang) {
  const isRu = lang === "ru";
  return isRu ? COPY_RU : COPY_EN;
}

const COPY_RU = {
  hero: {
    titleLines: ["Сайты, боты и сервисы,", "чтобы заявки не терялись"],
    scrollStages: [
      {
        headline: "Сайты, боты и веб-сервисы, которые помогают получать заявки",
        lead: "Разбираем задачу, предлагаем решение и запускаем продукт под ключ: лендинг, бот, CRM, кабинет или автоматизацию.",
      },
      {
        headline: "Заявки приходят в разные места — и теряются",
        lead: "Сайт, Telegram, Instagram, звонки, таблица. Менеджер забывает ответить — клиент уходит.",
      },
      {
        headline: "Собираем систему, где заявка не теряется",
        lead: "Клиент оставил заявку — команда сразу видит её в Telegram или CRM и знает, кто отвечает и что делать дальше.",
      },
    ],
    subtitle:
      "Делаем сайты, Telegram-ботов, CRM, админ-панели и веб-сервисы под конкретную задачу бизнеса — чтобы заявки не терялись и команда работала без ручного хаоса.",
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Посмотреть, что делаем",
    micro: "Ответим в течение дня • Первая консультация бесплатно • Можно начать с идеи",
    flowNodes: ["Заявка", "Обработка", "Telegram", "CRM"],
    flowNodeHints: ["С сайта", "Автообработка", "Уведомление", "В CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["Лендинг", "Форма", "Telegram"],
    flowAnalysis: {
      headline: "Задача разобрана",
      lead: "Лендинг принимает трафик, форма сохраняет контакт, Telegram сразу уведомляет команду — заявка не зависает в переписке.",
      routeLabel: "Маршрут:",
      routeText: "сайт → форма → Telegram → CRM.",
      modulesLabel: "Состав:",
    },
    flowTelegramDetail: {
      sourceLabel: "Источник",
      sourceValue: "форма на лендинге",
      actionLabel: "Действие",
      actionValue: "менеджер получил уведомление — заявка не потерялась",
    },
    flowCrmDetail: {
      summary: "Заявка в CRM. Статус и ответственный на месте — не нужно искать по чатам и таблицам.",
    },
    flowScenarios: [
      {
        prompt: "Нужен лендинг для рекламы",
        chips: ["Лендинг", "Форма", "Telegram"],
        notify: "Уведомление отправлено в Telegram",
        result: {
          kind: "crm" as const,
          title: "Новая заявка",
          lines: [
            { label: "Имя", value: "Анна" },
            { label: "Услуга", value: "Лендинг" },
            { label: "Статус", value: "Новая" },
          ],
        },
      },
      {
        prompt: "Хочу Telegram-бота для заявок",
        chips: ["Telegram", "Автоматизация", "Уведомления"],
        notify: "Уведомление отправлено в Telegram",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Сообщение", value: "Новая заявка с сайта" },
            { label: "Имя", value: "Анна" },
            { label: "Телефон", value: "+375 ••• •• 42" },
          ],
        },
      },
      {
        prompt: "Нужен сайт + уведомления в Telegram",
        chips: ["Лендинг", "Форма", "Telegram", "Уведомления"],
        notify: "Уведомление отправлено в Telegram",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Сообщение", value: "Заявка с формы сайта" },
            { label: "Имя", value: "Мария" },
            { label: "Услуга", value: "Консультация" },
          ],
        },
      },
      {
        prompt: "Нужна система записи для клиентов",
        chips: ["Форма", "CRM", "Уведомления"],
        notify: "Заявка добавлена в CRM",
        result: {
          kind: "crm" as const,
          title: "Новая заявка",
          lines: [
            { label: "Имя", value: "Елена" },
            { label: "Услуга", value: "Запись на услугу" },
            { label: "Статус", value: "Новая" },
          ],
        },
      },
      {
        prompt: "Хотим автоматизировать обработку заявок",
        chips: ["Автоматизация", "CRM", "Telegram"],
        notify: "Статус обновлён",
        result: {
          kind: "crm" as const,
          title: "Новая заявка",
          lines: [
            { label: "Имя", value: "Дмитрий" },
            { label: "Услуга", value: "Автоматизация" },
            { label: "Статус", value: "В работе" },
          ],
        },
      },
    ],
    visualStatus: [
      { main: "Собираем систему заявок…", sub: "Лендинг, форма, Telegram" },
      { main: "Новая заявка получена", sub: "Уведомление отправлено в Telegram" },
      { main: "Заявка в мини-CRM", sub: "Статус: в работе" },
    ],
  },
  pain: {
    title: "Почему заявки теряются",
    titleLines: ["Почему заявки", "теряются"],
    subtitle: "Обычно дело не в продукте, а в том, что нет нормальной системы приёма и обработки.",
    hoverCta: "Как закрываем",
    items: [
      {
        title: "Заявки в разных местах",
        text: "Сайт, Telegram, Instagram, звонки, email — всё в разных окнах. Непонятно, кто уже ответил.",
        solution: "Собираем обращения в одно место: форма, бот, CRM или админка — команда видит все заявки сразу.",
      },
      {
        title: "Ответили слишком поздно",
        text: "Клиент написал утром, менеджер увидел вечером. К этому моменту он уже записался к другим.",
        solution: "Уведомления в Telegram или email — заявка не ждёт в переписке.",
      },
      {
        title: "Нет статусов",
        text: "Непонятно, кто новый, кто ждёт ответа, кто записан, а кто просто потерялся.",
        solution: "Статусы в CRM или таблице: новая → в работе → записан → оплачен.",
      },
      {
        title: "Всё держится на одном человеке",
        text: "Блокнот, Excel или память администратора. Он вышел из чата — процесс встал.",
        solution: "Процесс в системе: заявки идут по правилам, а не по памяти одного человека.",
      },
      {
        title: "Реклама идёт, заявки теряются",
        text: "Трафик есть, форма есть, но дальше заявка снова уходит в ручную обработку без контроля.",
        solution: "Лендинг + форма + Telegram + CRM — заявка сразу попадает в работу, а не в заметки.",
      },
    ],
  },
  offer: {
    title: "Что мы делаем",
    featured: {
      badge: "TIVONIX",
      title: "Собираем то, через что приходят заявки",
      text: "Сайт, бот, CRM или кабинет — под вашу задачу. Сначала смотрим, где клиенты теряются, потом запускаем рабочую связку без лишнего.",
      linkText: "Рассказать о задаче",
      footer: "От идеи до запуска — с вами на каждом шаге",
    },
    metrics: [
      {
        title: "Сайт под рекламу",
        text: "Лендинг и форма: клиент оставляет заявку с рекламы или Instagram.",
      },
      {
        title: "Telegram-бот",
        text: "Заявка сразу у команды в Telegram — без поиска по чатам.",
      },
      {
        title: "CRM или панель",
        text: "Видно статусы: новая, в работе, записан, оплачен — и кто отвечает.",
      },
      {
        title: "Личный кабинет",
        text: "Клиенты и сотрудники работают в одном понятном интерфейсе.",
      },
      {
        title: "Автоматизация",
        text: "Меньше ручных таблиц и переписок — больше стабильного процесса.",
      },
    ],
    ctaBar: {
      title: "Соберём систему, где заявки не теряются.",
      primary: "Обсудить проект",
      secondary: "Рассчитать проект",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — AI в продуктах для бизнеса",
    centerBadge: "TIVONIX AI",
    headline: "Подключаем AI там, где он реально экономит время: ответы, разбор заявок, поддержка",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["AI-боты", "Автоответы", "Разбор заявок", "CRM", "Поддержка", "Аналитика"],
  },
  flow: {
    label: "Схема",
    title: "Как работает система",
    titleMuted: "от заявки до результата — без потерь по пути",
    steps: [
      {
        label: "Заявка",
        title: "Клиент оставляет заявку",
        desc: "На сайте, в форме, боте или с рекламы",
      },
      {
        label: "Telegram",
        title: "Команда получает уведомление",
        desc: "В Telegram или на email — сразу, без задержки",
      },
      {
        label: "CRM",
        title: "Заявка попадает в CRM",
        desc: "В таблицу, мини-CRM или админ-панель",
      },
      {
        label: "Статус",
        title: "У заявки есть статус",
        desc: "Новая → в работе → записан → оплачен",
      },
      {
        label: "Результат",
        title: "Понятно, что делать дальше",
        desc: "Есть ответственный — клиент не теряется",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "Тарифы",
    title: "Планы запуска",
    more: "Подробнее",
  },
  compare: {
    title: "Мы делаем не страницу, а рабочую систему заявок",
    subtitle: "Чтобы заявка не зависала в переписке — от формы до CRM и команды.",
    regular: {
      title: "Обычный сайт",
      headline: "Форма есть — дальше вручную",
      items: ["Есть текст", "Есть кнопка", "Есть форма", "Дальше — в чаты и таблицы"],
    },
    chaosTags: ["Заявка потерялась", "Нет статуса", "Вручную в Excel", "Ответили через день"],
    hover: {
      chaosMessages: [
        { channel: "Instagram", text: "Здравствуйте, сколько стоит?", time: "сейчас" },
        { channel: "Telegram", text: "Можно записаться на завтра?", time: "4 мин" },
        { channel: "WhatsApp", text: "А в субботу работаете?", time: "11 мин" },
        { channel: "Сайт", text: "Оставил заявку на сайте", time: "18 мин" },
        { channel: "Звонок", text: "Пропущенный звонок", time: "25 мин" },
        { channel: "Instagram", text: "??? вы тут?", time: "38 мин" },
        { channel: "Telegram", text: "Жду ответ уже час", time: "1 ч" },
        { channel: "Email", text: "Re: запрос с формы", time: "вчера" },
        { channel: "WhatsApp", text: "Есть окно сегодня вечером?", time: "1 ч" },
        { channel: "Сайт", text: "Нужен расчёт под ключ", time: "2 ч" },
        { channel: "Instagram", text: "Скиньте прайс, пожалуйста", time: "3 ч" },
        { channel: "Telegram", text: "Перезвоните, срочно", time: "4 ч" },
        { channel: "Звонок", text: "2 пропущенных", time: "5 ч" },
        { channel: "Email", text: "Fwd: коммерческое предложение", time: "6 ч" },
      ],
      crm: {
        title: "TIVONIX CRM",
        sidebar: [
          { label: "Заявки", active: true, count: 4 },
          { label: "Клиенты", active: false },
          { label: "Календарь", active: false },
          { label: "Отчёты", active: false },
        ],
        leadsTitle: "Заявки",
        leads: [
          {
            name: "Анна К.",
            source: "Сайт",
            preview: "Запись на консультацию",
            time: "2 мин",
            status: "Новая",
            tone: "new" as const,
          },
          {
            name: "Игорь П.",
            source: "Telegram",
            preview: "Нужен расчёт проекта",
            time: "14 мин",
            status: "В работе",
            tone: "progress" as const,
          },
          {
            name: "Салон Lux",
            source: "Instagram",
            preview: "Онлайн-запись на пятницу",
            time: "32 мин",
            status: "Записан",
            tone: "done" as const,
          },
          {
            name: "Олег М.",
            source: "Форма",
            preview: "Оплата подтверждена",
            time: "1 ч",
            status: "Оплачен",
            tone: "paid" as const,
          },
        ],
      },
    },
    tivonix: {
      title: "TIVONIX-система",
      headline: "Заявка под контролем",
      badge: "Заявка не висит в переписке — команда видит следующий шаг",
      items: [
        "Заявка не теряется",
        "Приходит в Telegram или email",
        "Попадает в CRM или таблицу",
        "Имеет статус и ответственного",
        "Команда понимает, что делать",
        "Можно наращивать рекламу без хаоса",
      ],
    },
  },
  cases: {
    badge: "Новый кейс",
    cta: "Хочу похожую систему",
    viewCase: "Смотреть кейс",
    openProduct: "Открыть продукт",
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
    title: "Как проходит работа",
    steps: [
      {
        kind: "bullets",
        title: "Разбираем задачу",
        items: [
          "Что хотите получить на выходе",
          "Откуда сейчас приходят заявки",
          "Что уже есть: сайт, CRM, мессенджеры",
          "Где команда теряет время",
        ],
      },
      {
        kind: "search",
        title: "Предлагаем решение",
        query: "что лучше — сайт, бот, CRM или кабинет для моей задачи",
        hint: "Смотрим, что подойдёт под ваш объём и сроки",
      },
      {
        kind: "bullets",
        title: "Собираем дизайн и логику",
        items: [
          "Ключевые экраны и путь клиента",
          "Сценарии для менеджера и команды",
          "UI под ваш бренд",
        ],
      },
      {
        kind: "bullets",
        title: "Разрабатываем продукт",
        items: [
          "Фронтенд и логика заявок",
          "База данных и роли доступа",
          "Проверяем сценарии до запуска",
        ],
      },
      {
        kind: "bullets",
        title: "Подключаем заявки, оплату, CRM или Telegram",
        items: [
          "Формы и точки входа",
          "Интеграции с мессенджерами и почтой",
          "Оплата, таблицы, аналитика",
        ],
      },
      {
        kind: "bullets",
        title: "Запускаем и помогаем проверить",
        items: [
          "Публикуем и смотрим на реальных заявках",
          "Показываем команде, как работать",
          "Остаёмся на связи после запуска",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "Расскажите, что хотите запустить или автоматизировать",
    subtitle: "Посмотрим задачу и предложим понятный первый шаг: сайт, бот, CRM, кабинет или MVP.",
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Получить разбор задачи",
    micro: "Ответим в течение дня • Первая консультация бесплатно",
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
    titleLines: ["Websites, bots and services", "so leads don't get lost"],
    scrollStages: [
      {
        headline: "Websites, bots and web apps that help you capture leads",
        lead: "We review your task, suggest a solution and launch it end-to-end: landing page, bot, CRM, client area or automation.",
      },
      {
        headline: "Leads arrive in different places — and get lost",
        lead: "Website, Telegram, Instagram, calls, spreadsheets. A manager forgets to reply — the client leaves.",
      },
      {
        headline: "We build a system where leads stay tracked",
        lead: "A client submits a request — your team sees it in Telegram or CRM right away and knows who owns it and what to do next.",
      },
    ],
    subtitle:
      "We build websites, Telegram bots, CRMs, admin panels and web services for real business tasks — so leads don't slip away and your team isn't stuck in manual chaos.",
    ctaPrimary: "Discuss the project",
    ctaSecondary: "See what we build",
    micro: "We reply within a day • First consultation is free • You can start with just an idea",
    flowNodes: ["Lead", "Processing", "Telegram", "CRM"],
    flowNodeHints: ["From site", "Auto", "Alert", "In CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["Landing", "Form", "Telegram"],
    flowAnalysis: {
      headline: "Task reviewed",
      lead: "The landing captures traffic, the form saves contact details, Telegram alerts your team — the lead doesn't sit in a chat thread.",
      routeLabel: "Route:",
      routeText: "site → form → Telegram → CRM.",
      modulesLabel: "Stack:",
    },
    flowTelegramDetail: {
      sourceLabel: "Source",
      sourceValue: "landing page form",
      actionLabel: "Action",
      actionValue: "manager got the alert — lead not lost",
    },
    flowCrmDetail: {
      summary: "Lead in CRM. Status and owner are clear — no digging through chats and spreadsheets.",
    },
    flowScenarios: [
      {
        prompt: "Need a landing page for ads",
        chips: ["Landing", "Form", "Telegram"],
        notify: "Notification sent to Telegram",
        result: {
          kind: "crm" as const,
          title: "New lead",
          lines: [
            { label: "Name", value: "Anna" },
            { label: "Service", value: "Landing page" },
            { label: "Status", value: "New" },
          ],
        },
      },
      {
        prompt: "Want a Telegram bot for leads",
        chips: ["Telegram", "Automation", "Alerts"],
        notify: "Notification sent to Telegram",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Message", value: "New lead from website" },
            { label: "Name", value: "Anna" },
            { label: "Phone", value: "+1 ••• •• 42" },
          ],
        },
      },
      {
        prompt: "Need a site + Telegram alerts",
        chips: ["Landing", "Form", "Telegram", "Alerts"],
        notify: "Notification sent to Telegram",
        result: {
          kind: "telegram" as const,
          title: "Telegram",
          lines: [
            { label: "Message", value: "Lead from website form" },
            { label: "Name", value: "Maria" },
            { label: "Service", value: "Consultation" },
          ],
        },
      },
      {
        prompt: "Need a booking system for clients",
        chips: ["Form", "CRM", "Alerts"],
        notify: "Lead added to CRM",
        result: {
          kind: "crm" as const,
          title: "New lead",
          lines: [
            { label: "Name", value: "Elena" },
            { label: "Service", value: "Appointment" },
            { label: "Status", value: "New" },
          ],
        },
      },
      {
        prompt: "Want to automate lead handling",
        chips: ["Automation", "CRM", "Telegram"],
        notify: "Status updated",
        result: {
          kind: "crm" as const,
          title: "New lead",
          lines: [
            { label: "Name", value: "Dmitry" },
            { label: "Service", value: "Automation" },
            { label: "Status", value: "In progress" },
          ],
        },
      },
    ],
    visualStatus: [
      { main: "Building your lead system…", sub: "Landing, form, Telegram" },
      { main: "New lead received", sub: "Notification sent to Telegram" },
      { main: "Lead in mini-CRM", sub: "Status: in progress" },
    ],
  },
  pain: {
    title: "Why leads get lost",
    titleLines: ["Why leads", "get lost"],
    subtitle: "Usually it's not the product — it's the lack of a proper intake and follow-up system.",
    hoverCta: "How we fix it",
    items: [
      {
        title: "Leads in different places",
        text: "Website, Telegram, Instagram, calls, email — all in separate windows. Unclear who already replied.",
        solution: "We pull inquiries into one place: form, bot, CRM or admin panel — the team sees every lead at once.",
      },
      {
        title: "Reply came too late",
        text: "A client wrote in the morning, the manager saw it in the evening. By then they booked elsewhere.",
        solution: "Telegram or email alerts — leads don't wait in chat threads.",
      },
      {
        title: "No statuses",
        text: "Unclear who is new, who is waiting, who is booked, and who simply fell through.",
        solution: "Statuses in CRM or a sheet: new → in progress → booked → paid.",
      },
      {
        title: "Everything depends on one person",
        text: "A notebook, Excel or the admin's memory. They go offline — the process stops.",
        solution: "The process lives in the system: leads move by rules, not one person's memory.",
      },
      {
        title: "Ads run, leads get lost",
        text: "Traffic is there, the form is there, but after submit everything goes back to manual handling.",
        solution: "Landing + form + Telegram + CRM — every lead enters the workflow immediately.",
      },
    ],
  },
  offer: {
    title: "What we build",
    featured: {
      badge: "TIVONIX",
      title: "We build the tools that capture your leads",
      text: "A website, bot, CRM, or client portal — matched to your task. First we find where leads get lost, then we ship a working setup without extra fluff.",
      linkText: "Tell us about your task",
      footer: "From idea to launch — with you at every step",
    },
    metrics: [
      {
        title: "Ad landing pages",
        text: "A landing page and form so leads come in from ads or Instagram.",
      },
      {
        title: "Telegram bots",
        text: "Leads reach the team in Telegram right away — no digging through chats.",
      },
      {
        title: "CRM or admin panel",
        text: "Clear statuses: new, in progress, booked, paid — and who owns each lead.",
      },
      {
        title: "Client portals",
        text: "Clients and your team work in one clear interface.",
      },
      {
        title: "Automation",
        text: "Fewer manual sheets and message threads — a steadier process.",
      },
    ],
    ctaBar: {
      title: "We'll build a system where leads don't get lost.",
      primary: "Discuss the project",
      secondary: "Get an estimate",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — AI in business products",
    centerBadge: "TIVONIX AI",
    headline: "We add AI where it actually saves time: replies, lead triage, support",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["AI bots", "Auto-replies", "Lead triage", "CRM", "Support", "Analytics"],
  },
  flow: {
    label: "Flow",
    title: "How the system works",
    titleMuted: "from lead to result — without losses along the way",
    steps: [
      {
        label: "Lead",
        title: "Client submits a request",
        desc: "On the site, in a form, bot or from ads",
      },
      {
        label: "Telegram",
        title: "Team gets an alert",
        desc: "In Telegram or email — right away",
      },
      {
        label: "CRM",
        title: "Lead lands in CRM",
        desc: "In a sheet, mini-CRM or admin panel",
      },
      {
        label: "Status",
        title: "Lead gets a status",
        desc: "New → in progress → booked → paid",
      },
      {
        label: "Result",
        title: "Clear what to do next",
        desc: "There's an owner — the client isn't lost",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "Pricing",
    title: "Launch plans",
    more: "Learn more",
  },
  compare: {
    title: "We build a working lead system — not just a page",
    subtitle: "So leads don't sit in chat threads — from form to CRM and your team.",
    regular: {
      title: "Typical website",
      headline: "Form submitted — then manual chaos",
      items: ["Some text", "A button", "A form", "Then — chats and spreadsheets"],
    },
    chaosTags: ["Lead lost", "No status", "Manual spreadsheet", "Reply next day"],
    hover: {
      chaosMessages: [
        { channel: "Instagram", text: "Hi, how much is it?", time: "now" },
        { channel: "Telegram", text: "Can I book for tomorrow?", time: "4 min" },
        { channel: "WhatsApp", text: "Are you open Saturday?", time: "11 min" },
        { channel: "Website", text: "Submitted the form", time: "18 min" },
        { channel: "Call", text: "Missed call", time: "25 min" },
        { channel: "Instagram", text: "??? anyone there?", time: "38 min" },
        { channel: "Telegram", text: "Waiting an hour already", time: "1 hr" },
        { channel: "Email", text: "Re: form inquiry", time: "yesterday" },
        { channel: "WhatsApp", text: "Any slot tonight?", time: "1 hr" },
        { channel: "Website", text: "Need a full quote", time: "2 hr" },
        { channel: "Instagram", text: "Please send pricing", time: "3 hr" },
        { channel: "Telegram", text: "Call me back, urgent", time: "4 hr" },
        { channel: "Call", text: "2 missed calls", time: "5 hr" },
        { channel: "Email", text: "Fwd: proposal request", time: "6 hr" },
      ],
      crm: {
        title: "TIVONIX CRM",
        sidebar: [
          { label: "Leads", active: true, count: 4 },
          { label: "Clients", active: false },
          { label: "Calendar", active: false },
          { label: "Reports", active: false },
        ],
        leadsTitle: "Leads",
        leads: [
          {
            name: "Anna K.",
            source: "Website",
            preview: "Book a consultation",
            time: "2 min",
            status: "New",
            tone: "new" as const,
          },
          {
            name: "Igor P.",
            source: "Telegram",
            preview: "Need a project estimate",
            time: "14 min",
            status: "In progress",
            tone: "progress" as const,
          },
          {
            name: "Lux Salon",
            source: "Instagram",
            preview: "Online booking for Friday",
            time: "32 min",
            status: "Booked",
            tone: "done" as const,
          },
          {
            name: "Oleg M.",
            source: "Form",
            preview: "Payment confirmed",
            time: "1 hr",
            status: "Paid",
            tone: "paid" as const,
          },
        ],
      },
    },
    tivonix: {
      title: "TIVONIX system",
      headline: "Lead under control",
      badge: "Lead doesn't sit in chat — the team sees the next step",
      items: [
        "Lead is not lost",
        "Arrives in Telegram or email",
        "Lands in CRM or a sheet",
        "Has a status and owner",
        "Team knows what to do",
        "You can scale ads without chaos",
      ],
    },
  },
  cases: {
    badge: "New case",
    cta: "I want a similar system",
    viewCase: "View case",
    openProduct: "Open product",
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
  },
  audience: {
    badge: "TIVONIX",
    title: "Who we help",
    subtitle:
      "Businesses that need more than a pretty site — a working system: leads, bookings, statuses, payments or a client area.",
    callouts: {
      left: {
        text: "Leads reach the manager in under a minute — not buried in chats or tomorrow's spreadsheet.",
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
        text: "Telegram alerts, statuses — clients don't wait and leave.",
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
      { title: "Online schools and courses", desc: "Registration, payments, student area and learning statuses" },
      { title: "Experts and consultants", desc: "Leads from landing straight to Telegram and CRM" },
      { title: "Startups and MVPs", desc: "Fast product launch with the modules you need — nothing extra" },
      { title: "Agencies and teams", desc: "Ad landing pages with a working lead funnel" },
      { title: "Small business", desc: "When leads are handled manually — and that's already getting in the way" },
    ],
  },
  process: {
    title: "How we work",
    steps: [
      {
        kind: "bullets",
        title: "We review the task",
        items: [
          "What outcome you need",
          "Where leads come from today",
          "What already exists: site, CRM, messengers",
          "Where the team loses time",
        ],
      },
      {
        kind: "search",
        title: "We suggest a solution",
        query: "what fits better — website, bot, CRM or client area for my task",
        hint: "We look at scope and timeline — not buzzwords",
      },
      {
        kind: "bullets",
        title: "We shape design and logic",
        items: [
          "Key screens and client journey",
          "Scenarios for managers and the team",
          "UI aligned with your brand",
        ],
      },
      {
        kind: "bullets",
        title: "We build the product",
        items: [
          "Frontend and lead logic",
          "Database and access roles",
          "We test scenarios before launch",
        ],
      },
      {
        kind: "bullets",
        title: "We connect leads, payments, CRM or Telegram",
        items: [
          "Forms and entry points",
          "Messenger and email integrations",
          "Payments, sheets, analytics",
        ],
      },
      {
        kind: "bullets",
        title: "We launch and help you verify",
        items: [
          "Go live and check with real leads",
          "Walk the team through daily use",
          "Stay in touch after launch",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "Tell us what you want to launch or automate",
    subtitle: "We'll review the task and suggest a clear first step: site, bot, CRM, client area or MVP.",
    ctaPrimary: "Discuss the project",
    ctaSecondary: "Get a task review",
    micro: "We reply within a day • First consultation is free",
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
      title: "Client area and admin",
      subtitle: "Client portal + team panel + payments",
      forWho: "When you need a full web service: registration, client area, statuses, payments.",
      cta: "Discuss the service",
      bullets: [
        "Registration",
        "Client area",
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
