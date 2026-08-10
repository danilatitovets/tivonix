import type { Lang } from "./LangProvider";
import type { MilesealDemoExample, ScopeFormPrefill } from "../data/milesealDemo";

export type MilesealCopy = {
  seo: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    tryDemo: string;
    requestReview: string;
  };
  demo: {
    title: string;
    helper: string;
    scopeLabel: string;
    requestLabel: string;
    analyze: string;
    analyzing: string;
    editExample: string;
    restoreExample: string;
    customNotice: string;
    sendHumanReview: string;
    hoursLabel: string;
    valueLabel: string;
    generateCr: string;
    copy: string;
    copied: string;
    startOver: string;
  };
  pain: {
    badge: string;
    title: string;
    cards: Array<{ title: string; text: string }>;
  };
  steps: {
    badge: string;
    title: string;
    items: Array<{ n: string; title: string; text: string }>;
  };
  cta: {
    title: string;
    text: string;
    openForm: string;
    name: string;
    email: string;
    agency: string;
    clientRequest: string;
    agreedScope: string;
    consent: string;
    privacy: string;
    send: string;
    sending: string;
    successBadge: string;
    successTitle: string;
    successText: string;
    errEmail: string;
    errRequest: string;
    errScope: string;
    errConsent: string;
    errNetwork: string;
    errGeneric: string;
  };
  caseTeaser: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  footnote: string;
  examples: MilesealDemoExample[];
};

const EXAMPLES_EN: MilesealDemoExample[] = [
  {
    id: "homepage-authors",
    label: "Homepage + author pages",
    scope:
      "Homepage redesign and one revision round for a marketing site. Article migration and author pages are excluded. Workspace demo only — not the 56-hour Content Migration case study.",
    request: "Please also migrate 84 articles and create individual author pages.",
    result: {
      status: "Out of scope",
      hoursValue: "14–18 hours",
      costValue: "$840–$1,080",
      timelineValue: "3–5 days",
      confidence: "High",
      reason: "Content migration and author pages were not included in the agreed project scope.",
      recommendation: "Get written approval before work begins.",
      effortItems: [
        "Content inventory & mapping — 4–5 hours",
        "Article migration & redirects — 6–8 hours",
        "Author pages & QA — 4–5 hours",
      ],
      changeRequest:
        "This request is outside the originally agreed project scope because content migration and author pages were not included. We estimate an additional 14–18 hours of work. The estimated cost is $840–$1,080. Please confirm the updated scope, timeline, and budget before implementation begins.",
      changeRequestSoft:
        "Happy to help with the content migration and author pages — they weren’t part of the original scope. We estimate about 14–18 extra hours ($840–$1,080). Could you confirm the updated scope, timeline, and budget before we start?",
      changeRequestFormal:
        "Following a review of the agreed project scope, content migration and author pages fall outside the current deliverables. Additional effort is estimated at 14–18 hours, with an indicative cost of $840–$1,080. Written confirmation of the revised scope, timeline, and budget is required prior to implementation.",
    },
  },
  {
    id: "integrations",
    label: "Extra integrations",
    scope:
      "Marketing site redesign with CMS, contact forms, and analytics setup. Third-party API integrations are not included.",
    request:
      "Please also connect Salesforce CRM, Stripe payments, and Zapier webhooks for lead sync.",
    result: {
      status: "Out of scope",
      hoursValue: "22–30 hours",
      costValue: "$1,320–$1,800",
      timelineValue: "5–8 days",
      confidence: "High",
      reason: "CRM, payments, and webhook integrations were never included in the agreed scope.",
      recommendation: "Pause work until the client approves a written change request.",
      effortItems: [
        "Salesforce CRM sync — 8–10 hours",
        "Stripe payments — 6–8 hours",
        "Zapier webhooks — 4–6 hours",
        "QA, docs & handover — 4–6 hours",
      ],
      changeRequest:
        "This request is outside the originally agreed project scope because Salesforce, Stripe, and Zapier integrations were not included. We estimate an additional 22–30 hours of work. The estimated cost is $1,320–$1,800. Please confirm the updated scope, timeline, and budget before implementation begins.",
      changeRequestSoft:
        "We can support the Salesforce, Stripe, and Zapier connections — these integrations sit outside the current scope. Roughly 22–30 extra hours ($1,320–$1,800). Please confirm the updated scope, timeline, and budget before we proceed.",
      changeRequestFormal:
        "Upon review of the agreed scope, Salesforce, Stripe, and Zapier integrations are not included in the current deliverables. Estimated additional effort is 22–30 hours at an indicative cost of $1,320–$1,800. Implementation shall commence only after written approval of the revised scope, timeline, and budget.",
    },
  },
  {
    id: "revisions",
    label: "Additional revisions",
    scope: "Brand landing page with two design revision rounds included. Dark mode is not included.",
    request:
      "We need three more full revision rounds after the included ones, plus a complete dark mode version.",
    result: {
      status: "Out of scope",
      hoursValue: "10–14 hours",
      costValue: "$600–$840",
      timelineValue: "2–4 days",
      confidence: "High",
      reason: "Extra revision rounds and dark mode were not included in the agreed project scope.",
      recommendation: "Get written approval before work begins.",
      effortItems: [
        "Three extra revision rounds — 6–8 hours",
        "Dark mode design & implementation — 3–4 hours",
        "QA across breakpoints — 1–2 hours",
      ],
      changeRequest:
        "This request is outside the originally agreed project scope because additional revision rounds and dark mode were not included. We estimate an additional 10–14 hours of work. The estimated cost is $600–$840. Please confirm the updated scope, timeline, and budget before implementation begins.",
      changeRequestSoft:
        "Glad to continue with more revision rounds and a dark mode version — both sit outside the included scope. We estimate about 10–14 extra hours ($600–$840). Please confirm the updated scope, timeline, and budget before we start.",
      changeRequestFormal:
        "Additional revision rounds and a dark mode version fall outside the agreed deliverables. Estimated additional effort is 10–14 hours, with an indicative cost of $600–$840. Written approval of the revised scope, timeline, and budget is required before work proceeds.",
    },
  },
];

const EXAMPLES_RU: MilesealDemoExample[] = [
  {
    id: "homepage-authors",
    label: "Главная + страницы авторов",
    scope:
      "Редизайн главной и один раунд правок для маркетингового сайта. Миграция статей и страницы авторов не входят в объём. Только демо workspace — не кейс Content Migration на 56 часов.",
    request: "Пожалуйста, ещё перенесите 84 статьи и сделайте отдельные страницы авторов.",
    result: {
      status: "Вне объёма",
      hoursValue: "14–18 часов",
      costValue: "$840–$1,080",
      timelineValue: "3–5 дней",
      confidence: "Высокая",
      reason: "Миграция контента и страницы авторов не входили в согласованный объём проекта.",
      recommendation: "Получите письменное согласование до начала работ.",
      effortItems: [
        "Инвентаризация и карта контента — 4–5 часов",
        "Миграция статей и редиректы — 6–8 часов",
        "Страницы авторов и проверка — 4–5 часов",
      ],
      changeRequest:
        "Этот запрос выходит за изначально согласованный объём проекта, потому что миграция контента и страницы авторов не были включены. Оценка дополнительной работы — 14–18 часов. Ориентировочная стоимость — $840–$1,080. Пожалуйста, подтвердите обновлённый объём, сроки и бюджет до начала реализации.",
      changeRequestSoft:
        "С миграцией контента и страницами авторов с удовольствием поможем — в исходный объём они не входили. Ориентир: ещё 14–18 часов ($840–$1,080). Подтвердите, пожалуйста, обновлённый объём, сроки и бюджет до старта.",
      changeRequestFormal:
        "По итогам сверки с согласованным объёмом проекта миграция контента и страницы авторов не входят в текущие результаты. Оценка дополнительной работы — 14–18 часов, ориентировочная стоимость — $840–$1,080. Реализация возможна после письменного подтверждения обновлённого объёма, сроков и бюджета.",
    },
  },
  {
    id: "integrations",
    label: "Доп. интеграции",
    scope:
      "Редизайн маркетингового сайта: CMS, формы и аналитика. Интеграции со сторонними API не входят.",
    request:
      "Подключите ещё Salesforce CRM, оплату Stripe и вебхуки Zapier для синхронизации лидов.",
    result: {
      status: "Вне объёма",
      hoursValue: "22–30 часов",
      costValue: "$1,320–$1,800",
      timelineValue: "5–8 дней",
      confidence: "Высокая",
      reason: "CRM, платежи и вебхуки изначально не входили в согласованный объём.",
      recommendation: "Не начинайте работу, пока клиент не утвердит запрос на изменение письменно.",
      effortItems: [
        "Синхронизация Salesforce CRM — 8–10 часов",
        "Оплата Stripe — 6–8 часов",
        "Вебхуки Zapier — 4–6 часов",
        "Проверка, документация и передача — 4–6 часов",
      ],
      changeRequest:
        "Этот запрос выходит за изначально согласованный объём проекта, потому что интеграции Salesforce, Stripe и Zapier не были включены. Оценка дополнительной работы — 22–30 часов. Ориентировочная стоимость — $1,320–$1,800. Пожалуйста, подтвердите обновлённый объём, сроки и бюджет до начала реализации.",
      changeRequestSoft:
        "Подключения Salesforce, Stripe и Zapier можем взять — в текущий объём эти интеграции не входят. Ориентир: ещё 22–30 часов ($1,320–$1,800). Подтвердите обновлённый объём, сроки и бюджет, и продолжим.",
      changeRequestFormal:
        "Согласно согласованному объёму, интеграции Salesforce, Stripe и Zapier не входят в текущие результаты. Оценка дополнительной работы — 22–30 часов, ориентировочная стоимость — $1,320–$1,800. Работы начинаются только после письменного утверждения обновлённого объёма, сроков и бюджета.",
    },
  },
  {
    id: "revisions",
    label: "Доп. правки",
    scope: "Бренд-лендинг с двумя раундами дизайн-правок. Тёмная тема не входит.",
    request:
      "Нужны ещё три полных раунда правок после включённых, плюс полноценная тёмная версия.",
    result: {
      status: "Вне объёма",
      hoursValue: "10–14 часов",
      costValue: "$600–$840",
      timelineValue: "2–4 дня",
      confidence: "Высокая",
      reason: "Дополнительные раунды правок и тёмная тема не входили в согласованный объём.",
      recommendation: "Получите письменное согласование до начала работ.",
      effortItems: [
        "Три дополнительных раунда правок — 6–8 часов",
        "Дизайн и внедрение тёмной темы — 3–4 часа",
        "Проверка на разных экранах — 1–2 часа",
      ],
      changeRequest:
        "Этот запрос выходит за изначально согласованный объём проекта, потому что дополнительные раунды правок и тёмная тема не были включены. Оценка дополнительной работы — 10–14 часов. Ориентировочная стоимость — $600–$840. Пожалуйста, подтвердите обновлённый объём, сроки и бюджет до начала реализации.",
      changeRequestSoft:
        "Дополнительные раунды правок и тёмную тему готовы сделать — в согласованный объём они не входят. Ориентир: ещё 10–14 часов ($600–$840). Подтвердите обновлённый объём, сроки и бюджет до старта.",
      changeRequestFormal:
        "Дополнительные раунды правок и тёмная тема не входят в согласованные результаты. Оценка дополнительной работы — 10–14 часов, ориентировочная стоимость — $600–$840. Для продолжения требуется письменное подтверждение обновлённого объёма, сроков и бюджета.",
    },
  },
];

const EXAMPLES_ZH: MilesealDemoExample[] = [
  {
    id: "homepage-authors",
    label: "首页 + 作者页",
    scope:
      "营销网站首页改版与一个修订轮次。文章迁移与作者页不在范围内。仅为 workspace 演示——不是 56 小时的 Content Migration 案例。",
    request: "请再迁移 84 篇文章，并创建独立作者页。",
    result: {
      status: "超出范围",
      hoursValue: "14–18 小时",
      costValue: "$840–$1,080",
      timelineValue: "3–5 天",
      confidence: "高",
      reason: "内容迁移与作者页未包含在已约定项目范围内。",
      recommendation: "开始前请先取得书面确认。",
      effortItems: [
        "内容盘点与映射 — 4–5 小时",
        "文章迁移与重定向 — 6–8 小时",
        "作者页与验收 — 4–5 小时",
      ],
      changeRequest:
        "该请求超出最初约定的项目范围，因为内容迁移与作者页未被包含。我们预估额外工作量为 14–18 小时，费用约 $840–$1,080。请在实施前确认更新后的范围、时间表与预算。",
      changeRequestSoft:
        "内容迁移与作者页我们很乐意支持——它们不在原始范围内。预估约额外 14–18 小时（$840–$1,080）。开工前请确认更新后的范围、时间表与预算。",
      changeRequestFormal:
        "经对照已约定项目范围，内容迁移与作者页不属于当前交付物。额外工作量预估为 14–18 小时，费用约 $840–$1,080。实施前须取得对更新范围、时间表与预算的书面确认。",
    },
  },
  {
    id: "integrations",
    label: "额外集成",
    scope: "营销站改版：CMS、表单与分析。第三方 API 集成不包含在内。",
    request: "请再接入 Salesforce CRM、Stripe 支付，以及用于线索同步的 Zapier Webhook。",
    result: {
      status: "超出范围",
      hoursValue: "22–30 小时",
      costValue: "$1,320–$1,800",
      timelineValue: "5–8 天",
      confidence: "高",
      reason: "CRM、支付与 Webhook 集成从未包含在约定范围内。",
      recommendation: "在客户书面批准变更请求前，请暂停实施。",
      effortItems: [
        "Salesforce CRM 同步 — 8–10 小时",
        "Stripe 支付 — 6–8 小时",
        "Zapier Webhook — 4–6 小时",
        "验收、文档与交接 — 4–6 小时",
      ],
      changeRequest:
        "该请求超出最初约定的项目范围，因为 Salesforce、Stripe 与 Zapier 集成未被包含。我们预估额外工作量为 22–30 小时，费用约 $1,320–$1,800。请在实施前确认更新后的范围、时间表与预算。",
      changeRequestSoft:
        "Salesforce、Stripe 与 Zapier 接入我们可以支持——这些集成不在当前范围内。预估约额外 22–30 小时（$1,320–$1,800）。请确认更新后的范围、时间表与预算后再继续。",
      changeRequestFormal:
        "根据已约定范围，Salesforce、Stripe 与 Zapier 集成不属于当前交付物。额外工作量预估为 22–30 小时，费用约 $1,320–$1,800。须在书面批准更新范围、时间表与预算后方可实施。",
    },
  },
  {
    id: "revisions",
    label: "额外修改",
    scope: "品牌落地页含两轮设计修改。深色模式不包含。",
    request: "在已包含的两轮之外，还需要三轮完整修改，并交付完整深色模式版本。",
    result: {
      status: "超出范围",
      hoursValue: "10–14 小时",
      costValue: "$600–$840",
      timelineValue: "2–4 天",
      confidence: "高",
      reason: "额外修改轮次与深色模式未包含在已约定项目范围内。",
      recommendation: "开始前请先取得书面确认。",
      effortItems: [
        "额外三轮完整修改 — 6–8 小时",
        "深色模式设计与实现 — 3–4 小时",
        "多端验收 — 1–2 小时",
      ],
      changeRequest:
        "该请求超出最初约定的项目范围，因为额外修改轮次与深色模式未被包含。我们预估额外工作量为 10–14 小时，费用约 $600–$840。请在实施前确认更新后的范围、时间表与预算。",
      changeRequestSoft:
        "额外修改轮次与深色模式我们都可以做——它们不在已包含范围内。预估约额外 10–14 小时（$600–$840）。开工前请确认更新后的范围、时间表与预算。",
      changeRequestFormal:
        "额外修改轮次与深色模式不属于已约定交付物。额外工作量预估为 10–14 小时，费用约 $600–$840。继续实施前须取得对更新范围、时间表与预算的书面批准。",
    },
  },
];

const COPY: Record<Lang, MilesealCopy> = {
  en: {
    seo: {
      title: "MileSeal — AI Scope Change Workspace",
      description:
        "Compare an agreed project scope with a new client request, assess delivery impact and generate a client-ready change request.",
    },
    hero: {
      badge: "A validation prototype by TIVONIX",
      title: "Stop scope creep before it becomes unpaid work.",
      subtitle:
        "Compare a client request against the agreed scope, estimate the extra effort, and generate a professional change request in seconds.",
      tryDemo: "Try the live demo",
      requestReview: "Request a scope review",
    },
    demo: {
      title: "See where the project scope changed",
      helper:
        "Choose a prepared agency scenario to see how MileSeal identifies unapproved work. Edit the example to request a human review.",
      scopeLabel: "Agreed project scope",
      requestLabel: "New client request",
      analyze: "Analyze scope change",
      analyzing: "Analyzing…",
      editExample: "Edit this example",
      restoreExample: "Restore example",
      customNotice: "Custom analysis is not available in this validation preview yet.",
      sendHumanReview: "Send this case for a human scope review",
      hoursLabel: "Extra hours",
      valueLabel: "Unapproved value",
      generateCr: "Generate change request",
      copy: "Copy to clipboard",
      copied: "Copied to clipboard",
      startOver: "Start over",
    },
    pain: {
      badge: "Margin leak",
      title: "Where agency margin disappears",
      cards: [
        {
          title: "Untracked client requests",
          text: "Side asks land in chat and email. Nobody logs them against the original brief.",
        },
        {
          title: "Work started before approval",
          text: "The team starts “just this one thing” — and the unpaid hours pile up quietly.",
        },
        {
          title: "Extra hours never invoiced",
          text: "By delivery, margin is gone. Scope creep already became free work.",
        },
      ],
    },
    steps: {
      badge: "Flow",
      title: "From client message to approved change request",
      items: [
        {
          n: "01",
          title: "Paste the agreed scope",
          text: "Drop in the signed brief or statement of work — the baseline you’re protecting.",
        },
        {
          n: "02",
          title: "Add the new client request",
          text: "Paste the message as it arrived. No cleanup needed for a first pass.",
        },
        {
          n: "03",
          title: "Review effort and request approval",
          text: "See the out-of-scope call, hours, cost band, and a ready change-request draft.",
        },
      ],
    },
    cta: {
      title: "Have a real scope-creep case?",
      text: "Send us one recent client request. We’ll review whether it created unapproved work and show you how MileSeal would handle it.",
      openForm: "Request a scope review",
      name: "Name",
      email: "Work email *",
      agency: "Agency name",
      clientRequest: "Recent client request *",
      agreedScope: "Agreed scope *",
      consent: "I agree to the processing of my data for this scope review.",
      privacy: "Privacy Policy",
      send: "Send for review",
      sending: "Sending…",
      successBadge: "Sent",
      successTitle: "Request received",
      successText:
        "Your request has been received. We’ll return the review within 24 hours.",
      errEmail: "Please enter a valid work email.",
      errRequest: "Please paste a recent client request.",
      errScope: "Please paste the agreed project scope.",
      errConsent: "Please confirm consent to process your data.",
      errNetwork: "Couldn’t send right now. Please try again or email tivoonix@gmail.com.",
      errGeneric: "Something went wrong. Please try again.",
    },
    caseTeaser: {
      eyebrow: "DEMONSTRATION CASE",
      title: "See how a “small” content request became 56 additional hours",
      description:
        "Follow the original scope, the later client request, MileSeal’s decision and the resulting change request.",
      cta: "View the full case",
    },
    footnote:
      "MileSeal is an early validation prototype by TIVONIX. Estimates are indicative and require human confirmation.",
    examples: EXAMPLES_EN,
  },
  ru: {
    seo: {
      title: "MileSeal — AI Scope Change Workspace",
      description:
        "Сравните согласованный объём проекта с новым запросом клиента, оцените влияние на сроки и стоимость и сформируйте готовый запрос на изменение. Это демонстрация: оценки ориентировочные и требуют проверки человеком.",
    },
    hero: {
      badge: "Прототип от TIVONIX",
      title: "Остановите расползание объёма, пока оно не стало бесплатной работой.",
      subtitle:
        "Сверьте запрос клиента с согласованным объёмом, оцените доп. усилия и за секунды получите профессиональный запрос на изменение.",
      tryDemo: "Попробовать демо",
      requestReview: "Запросить разбор объёма",
    },
    demo: {
      title: "Где изменился объём проекта",
      helper:
        "Выберите готовый сценарий агентства, чтобы увидеть, как MileSeal выявляет несогласованные работы. Отредактируйте пример, чтобы запросить ручной разбор.",
      scopeLabel: "Согласованный объём проекта",
      requestLabel: "Новый запрос клиента",
      analyze: "Проанализировать изменение",
      analyzing: "Анализ…",
      editExample: "Редактировать пример",
      restoreExample: "Вернуть пример",
      customNotice:
        "Анализ пользовательского кейса пока недоступен в этой демонстрационной версии.",
      sendHumanReview: "Отправить кейс на ручной разбор объёма",
      hoursLabel: "Доп. часы",
      valueLabel: "Неутверждённая сумма",
      generateCr: "Сгенерировать запрос на изменение",
      copy: "Скопировать",
      copied: "Скопировано в буфер",
      startOver: "Начать заново",
    },
    pain: {
      badge: "Утечка маржи",
      title: "Где агентство теряет маржу",
      cards: [
        {
          title: "Неучтенные запросы клиента",
          text: "Побочные просьбы оседают в чатах и почте. Их никто не сверяет с исходным брифом.",
        },
        {
          title: "Работа до согласования",
          text: "Команда берётся «только за это» — и неоплаченные часы тихо копятся.",
        },
        {
          title: "Доп. часы так и не выставили",
          text: "К сдаче маржа уже съедена. Расползание объёма превратилось в бесплатную работу.",
        },
      ],
    },
    steps: {
      badge: "Процесс",
      title: "От сообщения клиента до утверждённого запроса на изменение",
      items: [
        {
          n: "01",
          title: "Вставьте согласованный объём",
          text: "Добавьте подписанный бриф или договор — базу, которую вы защищаете.",
        },
        {
          n: "02",
          title: "Добавьте новый запрос клиента",
          text: "Вставьте сообщение как пришло. Для первого прохода чистить не нужно.",
        },
        {
          n: "03",
          title: "Оцените усилия и запросите согласование",
          text: "Увидите статус вне объёма, часы, вилку стоимости и готовый черновик запроса на изменение.",
        },
      ],
    },
    cta: {
      title: "Есть реальный кейс расползания объёма?",
      text: "Пришлите один недавний запрос клиента. Разберём, появилась ли неутверждённая работа, и покажем, как MileSeal это обработал бы.",
      openForm: "Запросить разбор объёма",
      name: "Имя",
      email: "Рабочий email *",
      agency: "Название агентства",
      clientRequest: "Недавний запрос клиента *",
      agreedScope: "Согласованный объём *",
      consent: "Согласен(на) на обработку данных для этого разбора объёма.",
      privacy: "Политика конфиденциальности",
      send: "Отправить на разбор",
      sending: "Отправляем…",
      successBadge: "Отправлено",
      successTitle: "Мы разберём ваш кейс",
      successText:
        "Спасибо — заявка на разбор получена. Вернёмся с понятным выводом: была ли работа неутверждённой и как MileSeal обработал бы её.",
      errEmail: "Укажите корректный рабочий email.",
      errRequest: "Вставьте недавний запрос клиента.",
      errScope: "Вставьте согласованный объём проекта.",
      errConsent: "Подтвердите согласие на обработку данных.",
      errNetwork: "Сейчас не удалось отправить. Попробуйте ещё раз или напишите на tivoonix@gmail.com.",
      errGeneric: "Что-то пошло не так. Попробуйте ещё раз.",
    },
    caseTeaser: {
      eyebrow: "ДЕМОНСТРАЦИОННЫЙ КЕЙС",
      title: "Как «небольшой» запрос на контент превратился в 56 дополнительных часов",
      description:
        "Посмотрите исходный объём, поздний запрос клиента, решение MileSeal и готовый запрос на изменение.",
      cta: "Смотреть полный кейс",
    },
    footnote:
      "MileSeal — ранний прототип от TIVONIX. Оценки ориентировочные и требуют подтверждения человеком.",
    examples: EXAMPLES_RU,
  },
  zh: {
    seo: {
      title: "MileSeal — AI Scope Change Workspace",
      description:
        "对照已约定的项目范围与新的客户请求，评估交付影响并生成可发给客户的变更请求。此为演示：估算仅供参考，需人工确认。",
    },
    hero: {
      badge: "TIVONIX 验证原型",
      title: "在范围蔓延变成免费加班前拦住它。",
      subtitle: "对照约定范围检查客户请求，估算额外工作量，并在数秒内生成专业变更请求。",
      tryDemo: "试用演示",
      requestReview: "申请范围复核",
    },
    demo: {
      title: "看清项目范围如何变化",
      helper:
        "选择一个预设代理场景，查看 MileSeal 如何识别未批准的工作。编辑示例以申请人工复核。",
      scopeLabel: "已约定项目范围",
      requestLabel: "新的客户请求",
      analyze: "分析范围变更",
      analyzing: "分析中…",
      editExample: "编辑此示例",
      restoreExample: "恢复示例",
      customNotice: "此验证预览暂不支持自定义分析。",
      sendHumanReview: "将此案例发送给人工范围复核",
      hoursLabel: "额外工时",
      valueLabel: "未批准金额",
      generateCr: "生成变更请求",
      copy: "复制到剪贴板",
      copied: "已复制到剪贴板",
      startOver: "重新开始",
    },
    pain: {
      badge: "利润流失",
      title: "代理商利润流失在哪里",
      cards: [
        {
          title: "未追踪的客户请求",
          text: "额外需求散落在聊天和邮件里，没人对照原始 brief 记录。",
        },
        {
          title: "未批准就开工",
          text: "团队先做“就这一件”——未付费工时悄悄累积。",
        },
        {
          title: "额外工时从未开票",
          text: "交付时利润已没。范围蔓延早变成免费劳动。",
        },
      ],
    },
    steps: {
      badge: "流程",
      title: "从客户消息到获批变更请求",
      items: [
        {
          n: "01",
          title: "粘贴已约定范围",
          text: "放入已签署 brief 或 SoW——你要保护的基线。",
        },
        {
          n: "02",
          title: "添加新的客户请求",
          text: "按原文粘贴消息。首轮无需整理。",
        },
        {
          n: "03",
          title: "复核工作量并请求批准",
          text: "看到超范围判定、工时、费用区间，以及现成变更请求草稿。",
        },
      ],
    },
    cta: {
      title: "有真实的范围蔓延案例？",
      text: "发给我们一条近期客户请求。我们会判断是否产生了未批准工作，并展示 MileSeal 会如何处理。",
      openForm: "申请范围复核",
      name: "姓名",
      email: "工作邮箱 *",
      agency: "代理商名称",
      clientRequest: "近期客户请求 *",
      agreedScope: "已约定范围 *",
      consent: "我同意为本次范围复核处理我的数据。",
      privacy: "隐私政策",
      send: "发送复核",
      sending: "发送中…",
      successBadge: "已发送",
      successTitle: "我们会复核你的案例",
      successText:
        "谢谢——范围复核请求已收到。我们会回复：工作是否未经批准，以及 MileSeal 会如何处理。",
      errEmail: "请输入有效的工作邮箱。",
      errRequest: "请粘贴近期客户请求。",
      errScope: "请粘贴已约定项目范围。",
      errConsent: "请确认同意处理数据。",
      errNetwork: "暂时无法发送。请重试或发邮件至 tivoonix@gmail.com。",
      errGeneric: "出错了，请重试。",
    },
    caseTeaser: {
      eyebrow: "演示案例",
      title: "看看一个“很小”的内容请求如何变成额外 56 小时",
      description: "跟随最初范围、后续客户请求、MileSeal 判定以及最终变更请求。",
      cta: "查看完整案例",
    },
    footnote: "MileSeal 是 TIVONIX 的早期验证原型。估算仅供参考，需人工确认。",
    examples: EXAMPLES_ZH,
  },
};

export function milesealCopy(lang: Lang): MilesealCopy {
  return COPY[lang] ?? COPY.en;
}

export function prefillFromExample(example: MilesealDemoExample): ScopeFormPrefill {
  return {
    scope: example.scope,
    request: example.request,
    changeRequest: example.result.changeRequest,
  };
}
