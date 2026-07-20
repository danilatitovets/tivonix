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
    titleLines: ["Пока заявка живёт в чатах —", "процесс ломается"],
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
    ctaSecondary: "Написать в Telegram",
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
    titleLines: ["We build sites and systems", "where leads don't get lost"],
    titleHighlight: "leads don't get lost",
    scrollStages: [
      {
        headline: "We build sites and systems where leads don't get lost",
        headlineLines: ["We build sites and systems", "where leads don't get lost"],
        headlineBefore: "We build sites and systems",
        headlineAccent: "where leads don't get lost",
        headlineAfter: "",
        lead: "We develop landing pages, Telegram bots, CRMs, client portals and MVPs — and connect them into one process: from first inquiry to payment and result.",
      },
      {
        headline: "The form was submitted. What happens next?",
        headlineLines: ["The form was submitted.", "What happens next?"],
        headlineBefore: "The form was submitted.",
        headlineAccent: "What happens next?",
        headlineAfter: "",
        lead: "When inquiries live in chats, inboxes and spreadsheets, the team replies late, forgets clients and doesn't know the next step.",
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
    title: "While leads live in chats — the process breaks",
    titleLines: ["While leads live in chats —", "the process breaks"],
    subtitle:
      "When inquiries live in chats, inboxes and spreadsheets, the team replies late, forgets clients and doesn't know the next step.",
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
        solution: "Instant Telegram or email alerts — leads don't wait in threads.",
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
      title: "We'll build a system where leads don't get lost — or a first product version.",
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
    subtitle: "The difference isn't a prettier page — it's what happens after the form is submitted.",
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
      badge: "Lead doesn't sit in chat — the team sees the next step",
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
      "Describe the task in your own words. We'll review it and send a preliminary plan, timeline and cost range.",
    ctaPrimary: "Get an estimate",
    ctaSecondary: "Message on Telegram",
    micro: "We reply within a business day. A call is optional. We don't share contacts with third parties.",
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
