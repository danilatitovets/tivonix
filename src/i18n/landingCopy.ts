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
    eyebrow: "САЙТЫ · CRM · БОТЫ · ВЕБ-СЕРВИСЫ",
    titleLines: ["Собираем сайты и системы,", "в которых заявки не теряются"],
    titleHighlight: "заявки не теряются",
    scrollStages: [
      {
        headline: "Собираем сайты и системы, в которых заявки не теряются",
        headlineLines: ["Собираем сайты и системы,", "в которых заявки не теряются"],
        headlineBefore: "Собираем сайты и системы,",
        headlineAccent: "в которых заявки не теряются",
        headlineAfter: "",
        lead: "Разрабатываем лендинги, Telegram-ботов, CRM, личные кабинеты и MVP — и связываем их в единый процесс: от первого обращения до оплаты и результата.",
      },
      {
        headline: "Форма отправлена. А что происходит дальше?",
        headlineLines: ["Форма отправлена.", "А что происходит дальше?"],
        headlineBefore: "Форма отправлена.",
        headlineAccent: "А что происходит дальше?",
        headlineAfter: "",
        lead: "Когда обращения остаются в чатах, почте и таблицах, команда отвечает поздно, забывает клиентов и не понимает следующий шаг.",
      },
      {
        headline: "Одна заявка. Один понятный процесс",
        headlineLines: ["Одна заявка.", "Один понятный процесс"],
        headlineBefore: "Одна заявка.",
        headlineAccent: "Один понятный процесс",
        headlineAfter: "",
        lead: "Связываем сайт, Telegram, CRM, таблицы и внутренние сервисы так, чтобы команда сразу видела клиента, статус и следующий шаг.",
      },
    ],
    subtitle:
      "Разрабатываем лендинги, Telegram-ботов, CRM, личные кабинеты и MVP — и связываем их в единый процесс: от первого обращения до оплаты и результата.",
    ctaPrimary: "Получить оценку проекта",
    ctaSecondary: "Посмотреть живые проекты",
    micro: "Ответим в течение рабочего дня · Работаем по этапам · Передаём исходники и доступы",
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
    title: "Пока заявка живёт в чатах — процесс ломается",
    titleLines: ["Пока заявка живёт в чатах", "процесс ломается"],
    subtitle:
      "Когда обращения остаются в чатах, почте и таблицах, команда отвечает поздно, забывает клиентов и не понимает следующий шаг.",
    hoverCta: "Как закрываем",
    items: [
      {
        title: "Никто не назначен",
        text: "Заявка пришла, но ответственный не выбран — она зависает, пока кто-то случайно не откроет чат.",
        solution: "Автоназначение или правило маршрутизации: заявка сразу попадает к нужному человеку.",
      },
      {
        title: "Ответили слишком поздно",
        text: "Менеджер увидел обращение вечером. К этому моменту клиент уже ушёл к тем, кто ответил быстрее.",
        solution: "Мгновенные уведомления в Telegram или email — заявка не ждёт в переписке.",
      },
      {
        title: "Статус неизвестен",
        text: "Непонятно, кто новый, кто ждёт оценки, кто в работе, а кто уже оплатил.",
        solution: "Статусы в CRM или таблице: новая → в работе → оценка отправлена → оплачена.",
      },
      {
        title: "Клиент пишет повторно",
        text: "Человеку приходится напоминать о себе, потому что команда потеряла нить диалога.",
        solution: "История и следующий шаг видны в системе — без поиска по чатам.",
      },
    ],
  },
  offer: {
    title: "Услуги и продукты",
    featured: {
      badge: "TIVONIX",
      title: "Не только лендинги: сайты, учёт, боты и веб-продукты",
      text: "Собираем то, через что приходят заявки и работают пользователи: от страницы под рекламу до сервиса с ролями и платежами.",
      linkText: "Рассказать о задаче",
      footer: "Фиксируем объём до старта и показываем результат по этапам",
    },
    metrics: [
      {
        title: "Сайты и лендинги",
        text: "Страницы, которые объясняют предложение, собирают обращения и передают их команде.",
      },
      {
        title: "Телеграм боты",
        text: "Боты принимают заявки, задают вопросы, уведомляют сотрудников и показывают клиенту следующий шаг.",
      },
      {
        title: "Админ панели и учёт",
        text: "Компактные системы под ваш процесс: статусы, ответственные, история, роли и отчёты.",
      },
      {
        title: "Личные кабинеты",
        text: "Интерфейсы для клиентов, партнёров и сотрудников с авторизацией, документами, оплатой и историей.",
      },
      {
        title: "Сервисы и автоматизация",
        text: "Первая версия продукта с ролями и платежами или связка форм, ботов, таблиц и учёта без ручного переноса.",
      },
    ],
    ctaBar: {
      title: "Соберём систему, где заявки не теряются — или первую версию продукта.",
      primary: "Получить оценку",
      secondary: "Рассчитать проект",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — AI в продуктах для бизнеса",
    centerBadge: "TIVONIX AI",
    headline: "AI там, где он действительно экономит время",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["Разбор заявок", "Документы", "Черновики ответов", "CRM", "Поддержка"],
  },
  flow: {
    label: "Решение",
    title: "Форма отправлена. А что происходит дальше?",
    titleMuted:
      "Нормальный путь: заявка сохраняется, команда получает сигнал, есть ответственный, статус и следующий шаг — без поиска по чатам.",
    steps: [
      {
        label: "Заявка",
        title: "Клиент оставляет обращение",
        desc: "С сайта, бота, рекламы или формы",
      },
      {
        label: "Уведомление",
        title: "Команда получает сигнал",
        desc: "В Telegram или на email — сразу",
      },
      {
        label: "Ответственный",
        title: "Назначается владелец",
        desc: "Понятно, кто отвечает за заявку",
      },
      {
        label: "Статус",
        title: "Статус всегда актуален",
        desc: "Новая → в работе → оценка → оплата",
      },
      {
        label: "Оплата",
        title: "Сделка доходит до результата",
        desc: "Без потери контекста по пути",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "Тарифы",
    title: "Планы запуска",
    more: "Подробнее",
  },
  compare: {
    title: "Обычный сайт и система TIVONIX",
    subtitle: "Разница не в «красивой странице», а в том, что происходит после отправки формы.",
    regular: {
      title: "Обычный сайт",
      headline: "Форма есть — дальше вручную",
      items: [
        "Форма отправлена",
        "Письмо лежит во входящих",
        "Статус неизвестен",
        "Ответственный не назначен",
        "Данные переносятся вручную",
      ],
    },
    chaosTags: ["Заявка теряется", "Нет статуса", "Excel вручную", "Ответ на следующий день"],
    tivonix: {
      title: "Система TIVONIX",
      headline: "Заявка под контролем",
      badge: "Заявка не висит в переписке — команда видит следующий шаг",
      items: [
        "Заявка сразу приходит в нужный канал",
        "Автоматически создаётся запись",
        "Назначается ответственный",
        "Команда видит статус",
        "Руководитель видит результат",
      ],
    },
    cta: "Разобрать мой процесс",
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
    title: "Как проходит работа",
    steps: [
      {
        kind: "bullets",
        title: "Разбираем задачу",
        items: [
          "Определяем пользователей, основной сценарий и результат первой версии.",
        ],
      },
      {
        kind: "bullets",
        title: "Фиксируем объём",
        items: [
          "Согласовываем функции, этапы, сроки, стоимость и формат связи.",
        ],
      },
      {
        kind: "bullets",
        title: "Показываем прототип или структуру",
        items: [
          "До разработки проверяем логику экранов и ключевой путь пользователя.",
        ],
      },
      {
        kind: "bullets",
        title: "Разрабатываем по этапам",
        items: [
          "После каждого этапа показываем рабочий результат и собираем обратную связь.",
        ],
      },
      {
        kind: "bullets",
        title: "Тестируем и запускаем",
        items: [
          "Проверяем мобильную версию, формы, роли, интеграции и основные сценарии.",
        ],
      },
      {
        kind: "bullets",
        title: "Передаём и поддерживаем",
        items: [
          "Передаём исходники, доступы и инструкции. После запуска исправляем выявленные ошибки в рамках согласованной гарантии.",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "Расскажите, что нужно запустить",
    subtitle:
      "Опишите задачу своими словами. Мы разберём её и отправим предварительный план, срок и диапазон стоимости.",
    ctaPrimary: "Получить оценку",
    ctaSecondary: "Посмотреть проекты",
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
    eyebrow: "WEBSITES · CRM · BOTS · WEB APPS",
    titleLines: ["We build sites and systems", "where leads do not get lost"],
    titleHighlight: "leads do not get lost",
    scrollStages: [
      {
        headline: "We build sites and systems where leads do not get lost",
        headlineLines: ["We build sites and systems", "where leads do not get lost"],
        headlineBefore: "We build sites and systems",
        headlineAccent: "where leads do not get lost",
        headlineAfter: "",
        lead: "We develop landing pages, Telegram bots, CRMs, client portals and MVPs — and connect them into one process: from first inquiry to payment and result.",
      },
      {
        headline: "The form was submitted. What happens next?",
        headlineLines: ["The form was submitted.", "What happens next?"],
        headlineBefore: "The form was submitted.",
        headlineAccent: "What happens next?",
        headlineAfter: "",
        lead: "When inquiries live in chats, inboxes and spreadsheets, the team replies late, forgets clients and does not know the next step.",
      },
      {
        headline: "One lead. One clear process",
        headlineLines: ["One lead.", "One clear process"],
        headlineBefore: "One lead.",
        headlineAccent: "One clear process",
        headlineAfter: "",
        lead: "We connect the site, Telegram, CRM, sheets and internal tools so the team sees the client, status and next step right away.",
      },
    ],
    subtitle:
      "We develop landing pages, Telegram bots, CRMs, client portals and MVPs — and connect them into one process: from first inquiry to payment and result.",
    ctaPrimary: "Get a project estimate",
    ctaSecondary: "See live projects",
    micro: "We reply within a business day · Phased delivery · Source code and access handed over",
    flowNodes: ["Lead", "Processing", "Telegram", "CRM"],
    flowNodeHints: ["From site", "Auto", "Alert", "In CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["Landing", "Form", "Telegram"],
    flowAnalysis: {
      headline: "Task reviewed",
      lead: "The landing captures traffic, the form saves contact details, Telegram alerts your team — the lead doesn’t sit in a chat thread.",
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
    title: "While leads live in chats — the process breaks",
    titleLines: ["While leads live in chats", "the process breaks"],
    subtitle:
      "When inquiries live in chats, inboxes and spreadsheets, the team replies late, forgets clients and doesn’t know the next step.",
    hoverCta: "How we fix it",
    items: [
      {
        title: "No owner assigned",
        text: "The lead arrived, but nobody owns it — it sits until someone opens the chat by chance.",
        solution: "Auto-assignment or routing rules: the lead goes to the right person immediately.",
      },
      {
        title: "Reply came too late",
        text: "The manager saw it in the evening. By then the client already went to whoever answered faster.",
        solution: "Instant Telegram or email alerts — leads don’t wait in threads.",
      },
      {
        title: "Status unknown",
        text: "Unclear who is new, who waits for a quote, who is in progress, and who already paid.",
        solution: "Statuses in CRM or a sheet: new → in progress → quote sent → paid.",
      },
      {
        title: "Client has to follow up",
        text: "People have to remind you about themselves because the team lost the thread.",
        solution: "History and next step stay visible in the system — no chat archaeology.",
      },
    ],
  },
  offer: {
    title: "Services and products",
    featured: {
      badge: "TIVONIX",
      title: "Not only landing pages — sites, CRM, bots and web products",
      text: "We build what captures leads and runs users: from an ad page to SaaS with roles and payments.",
      linkText: "Tell us about your task",
      footer: "We lock scope before start — and show results by stage",
    },
    metrics: [
      {
        title: "Websites and landing pages",
        text: "Pages that explain the offer, capture inquiries and hand them to your team.",
      },
      {
        title: "Telegram bots",
        text: "Bots take leads, ask questions, alert staff and show the client the next step.",
      },
      {
        title: "CRM and admin panels",
        text: "Compact systems for your process: statuses, owners, history, roles and reports.",
      },
      {
        title: "Client portals",
        text: "Interfaces for clients, partners and staff with auth, documents, payments and history.",
      },
      {
        title: "SaaS, MVP and automation",
        text: "A first product version with roles and payments — or forms, Telegram, sheets and CRM without manual hopping.",
      },
    ],
    ctaBar: {
      title: "We’ll build a system where leads don’t get lost — or a first product version.",
      primary: "Get an estimate",
      secondary: "Estimate the project",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — AI in business products",
    centerBadge: "TIVONIX AI",
    headline: "AI where it actually saves time",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["Lead triage", "Documents", "Reply drafts", "CRM", "Support"],
  },
  flow: {
    label: "Solution",
    title: "Form submitted. What happens next?",
    titleMuted:
      "The right path: the lead is saved, the team gets a signal, someone owns it, status and next step stay clear — without digging through chats.",
    steps: [
      {
        label: "Lead",
        title: "Client submits a request",
        desc: "From the site, bot, ads or a form",
      },
      {
        label: "Alert",
        title: "Team gets a signal",
        desc: "In Telegram or email — immediately",
      },
      {
        label: "Owner",
        title: "An owner is assigned",
        desc: "Clear who is responsible",
      },
      {
        label: "Status",
        title: "Status stays up to date",
        desc: "New → in progress → quote → paid",
      },
      {
        label: "Payment",
        title: "The deal reaches a result",
        desc: "Without losing context along the way",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "Pricing",
    title: "Launch plans",
    more: "Learn more",
  },
  compare: {
    title: "Typical website vs TIVONIX system",
    subtitle: "The difference isn’t a prettier page — it’s what happens after the form is submitted.",
    regular: {
      title: "Typical website",
      headline: "Form submitted — then manual work",
      items: [
        "Form submitted",
        "Email sits in the inbox",
        "Status unknown",
        "No owner assigned",
        "Data moved by hand",
      ],
    },
    chaosTags: ["Lead gets lost", "No status", "Manual Excel", "Reply the next day"],
    tivonix: {
      title: "TIVONIX system",
      headline: "Lead under control",
      badge: "Lead doesn’t sit in chat — the team sees the next step",
      items: [
        "Lead arrives in the right channel",
        "A record is created automatically",
        "An owner is assigned",
        "The team sees the status",
        "Leadership sees the result",
      ],
    },
    cta: "Map my process",
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
      "Businesses that need more than a pretty site — a working system: leads, bookings, statuses, payments or a client area.",
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
      { title: "Online schools and courses", desc: "Registration, payments, student area and learning statuses" },
      { title: "Experts and consultants", desc: "Leads from landing straight to Telegram and CRM" },
      { title: "Startups and MVPs", desc: "Fast product launch with the modules you need — nothing extra" },
      { title: "Agencies and teams", desc: "Ad landing pages with a working lead funnel" },
      { title: "Small business", desc: "When leads are handled manually — and that’s already getting in the way" },
    ],
  },
  process: {
    title: "How we work",
    steps: [
      {
        kind: "bullets",
        title: "We clarify the task",
        items: [
          "We define users, the core scenario and the first-version outcome.",
        ],
      },
      {
        kind: "bullets",
        title: "We lock the scope",
        items: [
          "We agree on features, stages, timeline, cost and how we communicate.",
        ],
      },
      {
        kind: "bullets",
        title: "We show a prototype or structure",
        items: [
          "Before build we validate screen logic and the key user path.",
        ],
      },
      {
        kind: "bullets",
        title: "We develop in stages",
        items: [
          "After each stage we show a working result and gather feedback.",
        ],
      },
      {
        kind: "bullets",
        title: "We test and launch",
        items: [
          "We check mobile, forms, roles, integrations and core flows.",
        ],
      },
      {
        kind: "bullets",
        title: "We hand over and support",
        items: [
          "We hand over source code, access and instructions. After launch we fix issues found within the agreed warranty.",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "Tell us what you need to launch",
    subtitle:
      "Describe the task in your own words. We’ll review it and send a preliminary plan, timeline and cost range.",
    ctaPrimary: "Get an estimate",
    ctaSecondary: "See projects",
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

const COPY_ZH = {
  hero: {
    eyebrow: "网站 · CRM · 机器人 · Web 应用",
    titleLines: ["我们打造网站与系统", "线索不会丢失"],
    titleHighlight: "线索不会丢失",
    scrollStages: [
      {
        headline: "打造线索不丢失的网站与业务系统",
        headlineLines: ["我们打造网站与系统", "线索不会丢失"],
        headlineBefore: "我们打造网站与系统",
        headlineAccent: "线索不会丢失",
        headlineAfter: "",
        lead: "我们开发落地页、Telegram 机器人、CRM、客户门户与 MVP — 并连成一体流程：从首次咨询到付款与结果。",
      },
      {
        headline: "表单已提交。接下来会发生什么？",
        headlineLines: ["表单已提交。", "接下来会发生什么？"],
        headlineBefore: "表单已提交。",
        headlineAccent: "接下来会发生什么？",
        headlineAfter: "",
        lead: "当咨询散落在聊天、收件箱与表格中，团队回复慢、忘记客户，也不知道下一步。",
      },
      {
        headline: "一条线索。一套清晰流程",
        headlineLines: ["一条线索。", "一套清晰流程"],
        headlineBefore: "一条线索。",
        headlineAccent: "一套清晰流程",
        headlineAfter: "",
        lead: "我们连接网站、Telegram、CRM、表格与内部工具，让团队立刻看到客户、状态与下一步。",
      },
    ],
    subtitle:
      "我们开发落地页、Telegram 机器人、CRM、客户门户与 MVP — 并连成一体流程：从首次咨询到付款与结果。",
    ctaPrimary: "获取项目评估",
    ctaSecondary: "查看已上线项目",
    micro: "工作日内回复 · 分阶段交付 · 移交源代码与权限",
    flowNodes: ["线索", "处理中", "Telegram", "CRM"],
    flowNodeHints: ["来自网站", "自动", "通知", "进入 CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["落地页", "表单", "Telegram"],
    flowAnalysis: {
      headline: "任务已梳理",
      lead: "落地页承接流量，表单保存联系方式，Telegram 通知团队 — 线索不会埋在聊天线程里。",
      routeLabel: "路径：",
      routeText: "网站 → 表单 → Telegram → CRM。",
      modulesLabel: "模块：",
    },
    flowTelegramDetail: {
      sourceLabel: "来源",
      sourceValue: "落地页表单",
      actionLabel: "动作",
      actionValue: "经理已收到通知 — 线索未丢失",
    },
    flowCrmDetail: {
      summary: "线索进入 CRM。状态与负责人清晰 — 不必翻聊天和表格。",
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
      { main: "迷你 CRM 领域的领先者", sub: "状态：进行中" },
    ],
  },
  pain: {
    title: "线索散落在聊天里 — 流程就会断",
    titleLines: ["当线索散落在聊天里", "流程就会断裂"],
    subtitle:
      "当咨询散落在聊天、收件箱与表格中，团队回复慢、忘记客户，也不知道下一步。",
    hoverCta: "我们如何解决",
    items: [
      {
        title: "未指定负责人",
        text: "线索到了，但无人负责 — 直到有人偶然打开聊天。",
        solution: "自动分配或路由规则：线索立即到达正确负责人。",
      },
      {
        title: "回复太晚",
        text: "经理晚上才看到。那时客户已经去了回复更快的地方。",
        solution: "即时 Telegram 或邮件通知 — 线索不等待。",
      },
      {
        title: "状态未知",
        text: "不清楚谁是新建、谁在等报价、谁在跟进、谁已付款。",
        solution: "CRM 或表格中的状态：新建 → 跟进中 → 已报价 → 已付款。",
      },
      {
        title: "客户不得不自己催促",
        text: "客户不得不自我提醒，因为团队丢了跟进线索。",
        solution: "历史与下一步在系统中可见 — 不必翻聊天考古。",
      },
    ],
  },
  offer: {
    title: "服务与产品",
    featured: {
      badge: "TIVONIX",
      title: "不只是落地页 — 还有网站、CRM、机器人与 Web 产品",
      text: "我们做能获客并服务用户的系统：从广告页到带角色与支付的 SaaS。",
      linkText: "告诉我们您的需求",
      footer: "开工前锁定范围 — 按阶段展示成果",
    },
    metrics: [
      {
        title: "网站与落地页",
        text: "讲清产品、捕获咨询并交给团队的页面。",
      },
      {
        title: "Telegram 机器人",
        text: "机器人接线索、提问、通知员工，并向客户展示下一步。",
      },
      {
        title: "CRM 与管理后台",
        text: "贴合您流程的精简系统：状态、负责人、历史、角色与报表。",
      },
      {
        title: "客户门户",
        text: "面向客户、伙伴与员工的界面：认证、文档、支付与历史。",
      },
      {
        title: "SaaS、MVP 与自动化",
        text: "带角色与支付的产品第一版 — 或表单、Telegram、表格与 CRM，无需手工跳转。",
      },
    ],
    ctaBar: {
      title: "我们会打造线索不丢失的系统 — 或产品第一版。",
      primary: "获取评估",
      secondary: "评估项目",
    },
  },
  ai: {
    ariaLabel: "TIVONIX — 业务产品中的 AI",
    centerBadge: "TIVONIX AI",
    headline: "真正省时间的 AI",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["线索分流", "文档", "回复草稿", "CRM", "支持"],
  },
  flow: {
    label: "方案",
    title: "表单已提交。接下来呢？",
    titleMuted:
      "正确路径：线索被保存、团队收到信号、有人负责、状态与下一步清晰 — 不必翻聊天。",
    steps: [
      {
        label: "线索",
        title: "客户提交需求",
        desc: "来自网站、机器人、广告或表单",
      },
      {
        label: "通知",
        title: "团队收到信号",
        desc: "在 Telegram 或邮件中 — 即时",
      },
      {
        label: "负责人",
        title: "已指定负责人",
        desc: "责任人清晰",
      },
      {
        label: "状态",
        title: "状态保持更新",
        desc: "新建 → 跟进中 → 已报价 → 已付款",
      },
      {
        label: "支付",
        title: "成交落到结果",
        desc: "全程不丢上下文",
      },
    ],
  },
  pricingTeaser: {
    eyebrow: "价格",
    title: "启动方案",
    more: "了解更多",
  },
  compare: {
    title: "普通网站 vs TIVONIX 系统",
    subtitle: "差别不在页面更好看 — 而在表单提交之后发生什么。",
    regular: {
      title: "普通网站",
      headline: "表单提交后 — 仍靠手工",
      items: [
        "表单已提交",
        "邮件堆在收件箱",
        "状态未知",
        "未指定负责人",
        "数据靠手工搬运",
      ],
    },
    chaosTags: ["线索丢失", "无状态", "手工 Excel", "第二天再回复"],
    tivonix: {
      title: "TIVONIX 系统",
      headline: "线索可控",
      badge: "线索不会埋在聊天里 — 团队看得见下一步",
      items: [
        "线索进入正确渠道",
        "自动创建记录",
        "已指定负责人",
        "团队能看到状态",
        "管理层看得到结果",
      ],
    },
    cta: "梳理我的流程",
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
      "需要的不只是好看官网，而是能跑通业务的系统：线索、预约、状态、支付或客户后台。白俄罗斯技术团队 TIVONIX，助力进入白俄罗斯与 EAEU 市场。",
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
    title: "我们如何协作",
    steps: [
      {
        kind: "bullets",
        title: "明确需求",
        items: [
          "明确用户、核心场景与第一版结果。",
        ],
      },
      {
        kind: "bullets",
        title: "锁定范围",
        items: [
          "约定功能、阶段、周期、费用与沟通方式。",
        ],
      },
      {
        kind: "bullets",
        title: "展示原型或结构",
        items: [
          "开发前校验页面逻辑与关键用户路径。",
        ],
      },
      {
        kind: "bullets",
        title: "分阶段开发",
        items: [
          "每个阶段展示可运行成果并收集反馈。",
        ],
      },
      {
        kind: "bullets",
        title: "测试并上线",
        items: [
          "检查移动端、表单、角色、集成与核心流程。",
        ],
      },
      {
        kind: "bullets",
        title: "移交并持续支持",
        items: [
          "移交源代码、权限与说明。上线后在约定保修范围内修复问题。",
        ],
      },
    ] satisfies ProcessStep[],
  },
  finalCta: {
    title: "告诉我们您要启动什么",
    subtitle:
      "用自己的话描述需求。我们会梳理并发送初步方案、周期与费用区间。",
    ctaPrimary: "获取评估",
    ctaSecondary: "查看项目",
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
