import type { Lang } from "./LangProvider";

export type CaseTone = "neutral" | "soft" | "formal";

export type MilesealCaseCopy = {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    runExample: string;
    viewOutput: string;
  };
  steps: {
    scope: string;
    request: string;
    analysis: string;
  };
  workspace: {
    id: string;
    scopeLabel: string;
    requestLabel: string;
    docTitle: string;
    meta: Array<{ label: string; value: string }>;
    scopeExcerpt: string;
    scopeHighlight: string;
    clientRequest: string;
    rateLabel: string;
    rateSuffix: string;
    capacityLabel: string;
    capacitySuffix: string;
    rateError: string;
    capacityError: string;
    analyse: string;
    analyzing: string;
    reset: string;
  };
  progress: {
    label: string;
    steps: string[];
  };
  result: {
    id: string;
    status: string;
    title: string;
    description: string;
    metrics: {
      confidenceValue: string;
    };
    reasonsTitle: string;
    reasons: string[];
    breakdownTitle: string;
    breakdown: Array<{ label: string; hours: number }>;
    totalLabel: string;
    calcCost: string;
    calcDays: string;
  };
  changeRequest: {
    eyebrow: string;
    title: string;
    description: string;
    docKind: string;
    docTitle: string;
    projectLabel: string;
    projectValue: string;
    statusLabel: string;
    statusValue: string;
    effortLabel: string;
    costLabel: string;
    timelineLabel: string;
    approval: string;
    tones: {
      neutral: string;
      soft: string;
      formal: string;
    };
    bodies: Record<CaseTone, string>;
    copy: string;
    copied: string;
    copyError: string;
    downloadPdf: string;
    makeSofter: string;
    makeFormal: string;
    resetWording: string;
  };
  finalCta: {
    title: string;
    text: string;
    primary: string;
    secondary: string;
  };
  footer: {
    privacy: string;
    contact: string;
    copyright: string;
  };
};

export const CASE_ADDITIONAL_HOURS = 40;
export const CASE_DEFAULT_RATE = 70;
export const CASE_DEFAULT_CAPACITY = 8;
export const CASE_RATE_MIN = 10;
export const CASE_RATE_MAX = 500;
export const CASE_CAPACITY_MIN = 1;
export const CASE_CAPACITY_MAX = 24;

export function caseAdditionalCost(rate: number): number {
  return CASE_ADDITIONAL_HOURS * rate;
}

export function caseTimelineDays(capacity: number): number {
  const safe = Math.max(CASE_CAPACITY_MIN, capacity);
  return Math.ceil(CASE_ADDITIONAL_HOURS / safe);
}

export function formatGbp(amount: number, lang: Lang): string {
  const rounded = Math.round(amount);
  if (lang === "en") {
    return `£${rounded.toLocaleString("en-GB")}`;
  }
  if (lang === "ru") {
    return `£${rounded.toLocaleString("ru-RU")}`;
  }
  return `£${rounded.toLocaleString("en-GB")}`;
}

/** Russian plural forms: one / few / many */
function ruPlural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(Math.trunc(n)) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}

export function formatCaseHours(n: number, lang: Lang): string {
  if (lang === "ru") return `${n} ${ruPlural(n, "час", "часа", "часов")}`;
  if (lang === "zh") return `${n} 小时`;
  return `${n} ${n === 1 ? "hour" : "hours"}`;
}

export function formatCaseBusinessDays(n: number, lang: Lang, withPlus = false): string {
  const prefix = withPlus ? "+" : "";
  if (lang === "ru") {
    return `${prefix}${n} ${ruPlural(n, "рабочий день", "рабочих дня", "рабочих дней")}`;
  }
  if (lang === "zh") return `${prefix}${n} 个工作日`;
  return `${prefix}${n} ${n === 1 ? "business day" : "business days"}`;
}

const COPY: Record<Lang, MilesealCaseCopy> = {
  en: {
    seo: {
      title: "Content Migration Scope Creep Demo | MileSeal",
      description:
        "See how MileSeal compares a fixed-price project scope with a later client request, calculates 40 additional hours and prepares a client-ready change request.",
      ogTitle: "Is this client request inside the agreed scope?",
      ogDescription:
        "An interactive MileSeal demonstration: compare agreed scope with a later request and generate a client-ready change request.",
    },
    hero: {
      eyebrow: "MileSeal interactive demo",
      title: "Is this client request inside the agreed scope?",
      subtitle:
        "Compare an agreed project scope with a later client request and generate a client-ready change request.",
      runExample: "Run the example",
      viewOutput: "Download document",
    },
    steps: {
      scope: "Agreed scope",
      request: "Client request",
      analysis: "Analysis",
    },
    workspace: {
      id: "workspace",
      scopeLabel: "Agreed project scope",
      requestLabel: "New client request",
      docTitle: "Corporate Website Redesign",
      meta: [
        { label: "Fixed budget", value: "£15,000" },
        { label: "Timeline", value: "6 weeks" },
        { label: "Included", value: "Migration of 20 priority pages" },
        { label: "Excluded", value: "Existing blog archive" },
        { label: "Client responsibility", value: "All remaining archive content" },
      ],
      scopeExcerpt:
        "The agency will migrate twenty priority pages. Migration of the existing blog archive is excluded from the agreed deliverables.",
      scopeHighlight: "Blog archive migration is not included.",
      clientRequest:
        "Could you also migrate our 240 existing blog posts, including images, authors, categories, metadata and redirects? Most of it should be simple copy and paste.",
      rateLabel: "Agency rate",
      rateSuffix: "£/hour",
      capacityLabel: "Available team time",
      capacitySuffix: "hours/day",
      rateError: "Enter a rate between £10 and £500.",
      capacityError: "Enter capacity between 1 and 24 hours/day.",
      analyse: "Analyse request",
      analyzing: "Analysing…",
      reset: "Reset example",
    },
    progress: {
      label: "Analysis in progress",
      steps: [
        "Comparing against agreed scope",
        "Identifying additional work",
        "Calculating cost and timeline",
        "Preparing change request",
      ],
    },
    result: {
      id: "result",
      status: "Outside scope",
      title: "This request is outside the agreed scope",
      description:
        "The agreed migration covers 20 priority pages. The archive request was excluded and needs a separate change request.",
      metrics: {
        confidenceValue: "High confidence",
      },
      reasonsTitle: "Why it is outside scope",
      reasons: [
        "The agreement includes only 20 pages.",
        "The blog archive was explicitly excluded.",
        "Redirect work was not estimated.",
        "The request creates a separate QA workstream.",
        "Written client approval is required.",
      ],
      breakdownTitle: "Effort breakdown",
      breakdown: [
        { label: "Migration of 240 posts", hours: 24 },
        { label: "Images and metadata", hours: 5 },
        { label: "Legacy content audit", hours: 4 },
        { label: "Quality assurance", hours: 4 },
        { label: "URL mapping and redirects", hours: 3 },
      ],
      totalLabel: "Total",
      calcCost: "{hoursLabel} × {rate}/hour = {cost}",
      calcDays: "{hoursLabel} ÷ {capacity} hours/day = {daysLabel}",
    },
    changeRequest: {
      eyebrow: "Ready to send",
      title: "Client-ready change request",
      description: "Download the PDF or copy the wording for the client.",
      docKind: "Change request",
      docTitle: "Legacy Content Migration",
      projectLabel: "Project",
      projectValue: "Corporate Website Redesign",
      statusLabel: "Status",
      statusValue: "Awaiting client approval",
      effortLabel: "Additional effort",
      costLabel: "Additional cost",
      timelineLabel: "Timeline impact",
      approval: "Work will begin after written approval of this change request.",
      tones: {
        neutral: "Neutral",
        soft: "Softer",
        formal: "Formal",
      },
      bodies: {
        neutral:
          "The original project scope includes migration of 20 priority pages. The requested migration of 240 legacy blog posts, including images, metadata, categories, authors and URL redirects, represents additional work outside the agreed scope.",
        soft: "We would be happy to support the migration of the additional blog archive. As the agreed project scope currently covers 20 priority pages, the requested migration of 240 blog posts and related SEO data would need to be handled as an additional change request.",
        formal:
          "Following a review of the signed project scope, the requested migration of 240 legacy blog posts, including associated media, metadata, taxonomy and URL redirects, falls outside the currently agreed deliverables and requires separate written approval.",
      },
      copy: "Copy",
      copied: "Copied",
      copyError: "Could not copy. Please select the text manually.",
      downloadPdf: "Download PDF",
      makeSofter: "Softer",
      makeFormal: "More formal",
      resetWording: "Reset wording",
    },
    finalCta: {
      title: "Analyse your own request",
      text: "Use MileSeal to compare an agreed scope with a later client request and prepare a clear change request.",
      primary: "Open MileSeal",
      secondary: "Request a manual review",
    },
    footer: {
      privacy: "Privacy",
      contact: "Contact",
      copyright: "© 2026 TIVONIX",
    },
  },
  ru: {
    seo: {
      title: "Демо расползания объёма: миграция контента | MileSeal",
      description:
        "Как MileSeal сравнивает фиксированный объём проекта с новым запросом клиента, считает 40 дополнительных часов и готовит запрос на изменение.",
      ogTitle: "Входит ли новый запрос клиента в согласованный объём?",
      ogDescription:
        "Интерактивная демонстрация MileSeal: сравните согласованный объём с новым запросом и получите готовый запрос на изменение.",
    },
    hero: {
      eyebrow: "Интерактивное демо MileSeal",
      title: "Входит ли новый запрос клиента в согласованный объём?",
      subtitle:
        "Сравните согласованный объём проекта с новым запросом клиента и получите готовый запрос на изменение.",
      runExample: "Запустить пример",
      viewOutput: "Скачать документ",
    },
    steps: {
      scope: "Согласованный объём",
      request: "Запрос клиента",
      analysis: "Анализ",
    },
    workspace: {
      id: "workspace",
      scopeLabel: "Согласованный объём",
      requestLabel: "Новый запрос клиента",
      docTitle: "Редизайн корпоративного сайта",
      meta: [
        { label: "Фиксированный бюджет", value: "£15 000" },
        { label: "Срок", value: "6 недель" },
        { label: "Включено", value: "Миграция 20 приоритетных страниц" },
        { label: "Исключено", value: "Существующий архив блога" },
        { label: "Ответственность клиента", value: "Весь остальной архивный контент" },
      ],
      scopeExcerpt:
        "Агентство перенесёт двадцать приоритетных страниц. Миграция существующего архива блога исключена из согласованных работ.",
      scopeHighlight: "Миграция архива блога не входит в объём работ.",
      clientRequest:
        "А можете ещё перенести наши 240 существующих постов блога вместе с изображениями, авторами, категориями, метаданными и редиректами? Большая часть — это же просто копипаст.",
      rateLabel: "Ставка агентства",
      rateSuffix: "£/час",
      capacityLabel: "Доступное время команды",
      capacitySuffix: "часов/день",
      rateError: "Укажите ставку от £10 до £500.",
      capacityError: "Укажите от 1 до 24 часов в день.",
      analyse: "Проанализировать запрос",
      analyzing: "Анализ…",
      reset: "Сбросить пример",
    },
    progress: {
      label: "Идёт анализ",
      steps: [
        "Сравниваем с согласованным объёмом",
        "Определяем дополнительные работы",
        "Рассчитываем стоимость и сроки",
        "Формируем запрос на изменение",
      ],
    },
    result: {
      id: "result",
      status: "Вне объёма",
      title: "Запрос не входит в согласованный объём",
      description:
        "Согласованная миграция охватывает 20 приоритетных страниц. Запрос по архиву был исключён и требует отдельного согласования.",
      metrics: {
        confidenceValue: "Высокая уверенность",
      },
      reasonsTitle: "Почему запрос вне объёма",
      reasons: [
        "В соглашении только 20 страниц.",
        "Архив блога был явно исключён.",
        "Работы по редиректам не оценивались.",
        "Запрос создаёт отдельный поток QA.",
        "Нужно письменное согласование клиента.",
      ],
      breakdownTitle: "Расчёт трудозатрат",
      breakdown: [
        { label: "Миграция 240 постов", hours: 24 },
        { label: "Изображения и метаданные", hours: 5 },
        { label: "Аудит архивного контента", hours: 4 },
        { label: "Проверка качества", hours: 4 },
        { label: "Карта URL и редиректы", hours: 3 },
      ],
      totalLabel: "Итого",
      calcCost: "{hoursLabel} × {rate}/час = {cost}",
      calcDays: "{hoursLabel} ÷ {capacity} часов/день = {daysLabel}",
    },
    changeRequest: {
      eyebrow: "Готово к отправке",
      title: "Готовый запрос на изменение",
      description: "Скачайте PDF или скопируйте формулировку для клиента.",
      docKind: "Запрос на изменение",
      docTitle: "Миграция архивного контента",
      projectLabel: "Проект",
      projectValue: "Редизайн корпоративного сайта",
      statusLabel: "Статус",
      statusValue: "Ожидает согласования клиента",
      effortLabel: "Дополнительная работа",
      costLabel: "Дополнительная стоимость",
      timelineLabel: "Влияние на сроки",
      approval: "Работы начнутся после письменного утверждения этого запроса на изменение.",
      tones: {
        neutral: "Нейтральный",
        soft: "Мягче",
        formal: "Формальный",
      },
      bodies: {
        neutral:
          "Исходный объём проекта включает миграцию 20 приоритетных страниц. Запрошенная миграция 240 архивных постов блога, включая изображения, метаданные, категории, авторов и URL-редиректы, представляет дополнительную работу вне согласованного объёма.",
        soft: "Мы с радостью поддержим миграцию дополнительного архива блога. Поскольку согласованный объём сейчас покрывает 20 приоритетных страниц, запрошенный перенос 240 постов и связанных SEO-данных нужно оформить отдельным запросом на изменение.",
        formal:
          "По итогам проверки подписанного объёма проекта запрошенная миграция 240 архивных постов блога, включая связанные медиа, метаданные, таксономию и URL-редиректы, выходит за рамки согласованных результатов и требует отдельного письменного утверждения.",
      },
      copy: "Скопировать",
      copied: "Скопировано",
      copyError: "Не удалось скопировать. Выделите текст вручную.",
      downloadPdf: "Скачать PDF",
      makeSofter: "Смягчить",
      makeFormal: "Официальнее",
      resetWording: "Исходный текст",
    },
    finalCta: {
      title: "Проверьте собственный запрос",
      text: "Сравните согласованный объём с новым запросом клиента и подготовьте понятный запрос на изменение.",
      primary: "Открыть MileSeal",
      secondary: "Запросить ручной разбор",
    },
    footer: {
      privacy: "Конфиденциальность",
      contact: "Контакты",
      copyright: "© 2026 TIVONIX",
    },
  },
  zh: {
    seo: {
      title: "内容迁移范围蔓延演示 | MileSeal",
      description:
        "查看 MileSeal 如何对照固定价格项目范围与后续客户请求，计算额外 40 小时，并生成可发给客户的变更请求。",
      ogTitle: "这项客户请求是否在约定范围内？",
      ogDescription: "交互式 MileSeal 演示：对照约定范围与后续请求，生成可发给客户的变更请求。",
    },
    hero: {
      eyebrow: "MileSeal 交互演示",
      title: "这项客户请求是否在约定范围内？",
      subtitle: "对照约定项目范围与后续客户请求，生成可发给客户的变更请求。",
      runExample: "运行示例",
      viewOutput: "下载文档",
    },
    steps: {
      scope: "约定范围",
      request: "客户请求",
      analysis: "分析",
    },
    workspace: {
      id: "workspace",
      scopeLabel: "已约定项目范围",
      requestLabel: "新的客户请求",
      docTitle: "企业官网改版",
      meta: [
        { label: "固定预算", value: "£15,000" },
        { label: "工期", value: "6 周" },
        { label: "已包含", value: "迁移 20 个优先页面" },
        { label: "已排除", value: "现有博客存档" },
        { label: "客户责任", value: "其余全部存档内容" },
      ],
      scopeExcerpt: "代理商将迁移二十个优先页面。现有博客存档的迁移不在约定交付物之中。",
      scopeHighlight: "博客存档迁移不包含在工作范围内。",
      clientRequest:
        "能不能顺便迁移我们现有的 240 篇博客文章，包括图片、作者、分类、元数据和重定向？大部分应该就是简单复制粘贴吧。",
      rateLabel: "代理商费率",
      rateSuffix: "£/小时",
      capacityLabel: "团队可用时间",
      capacitySuffix: "小时/天",
      rateError: "请输入 £10 到 £500 之间的费率。",
      capacityError: "请输入每天 1 到 24 小时的产能。",
      analyse: "分析请求",
      analyzing: "分析中…",
      reset: "重置示例",
    },
    progress: {
      label: "正在分析",
      steps: [
        "对照约定范围",
        "识别额外工作",
        "计算成本与工期",
        "准备变更请求",
      ],
    },
    result: {
      id: "result",
      status: "超出范围",
      title: "该请求超出约定范围",
      description: "约定迁移仅覆盖 20 个优先页面。存档请求已被排除，需要单独变更请求。",
      metrics: {
        confidenceValue: "高置信度",
      },
      reasonsTitle: "为何判定为超出范围",
      reasons: [
        "协议仅包含 20 个页面。",
        "博客存档已被明确排除。",
        "重定向工作未被估价。",
        "该请求形成独立 QA 工作流。",
        "需要客户书面批准。",
      ],
      breakdownTitle: "工时测算",
      breakdown: [
        { label: "迁移 240 篇文章", hours: 24 },
        { label: "图片与元数据", hours: 5 },
        { label: "遗留内容审计", hours: 4 },
        { label: "质量保障", hours: 4 },
        { label: "URL 映射与重定向", hours: 3 },
      ],
      totalLabel: "合计",
      calcCost: "{hoursLabel} × {rate}/小时 = {cost}",
      calcDays: "{hoursLabel} ÷ {capacity} 小时/天 = {daysLabel}",
    },
    changeRequest: {
      eyebrow: "可发送",
      title: "可发给客户的变更请求",
      description: "下载 PDF 或复制措辞发给客户。",
      docKind: "变更请求",
      docTitle: "遗留内容迁移",
      projectLabel: "项目",
      projectValue: "企业官网改版",
      statusLabel: "状态",
      statusValue: "等待客户批准",
      effortLabel: "额外工作量",
      costLabel: "额外成本",
      timelineLabel: "工期影响",
      approval: "书面批准本变更请求后，方可开始工作。",
      tones: {
        neutral: "中性",
        soft: "更柔和",
        formal: "更正式",
      },
      bodies: {
        neutral:
          "原项目范围包含 20 个优先页面的迁移。所请求迁移 240 篇遗留博客文章（含图片、元数据、分类、作者与 URL 重定向），属于约定范围之外的额外工作。",
        soft: "我们很乐意支持额外博客存档的迁移。由于当前约定范围仅覆盖 20 个优先页面，所请求的 240 篇文章及相关 SEO 数据需要作为额外变更请求处理。",
        formal:
          "经核对已签署项目范围，所请求迁移 240 篇遗留博客文章（含相关媒体、元数据、分类体系与 URL 重定向）超出当前约定交付物，需另行取得书面批准。",
      },
      copy: "复制",
      copied: "已复制",
      copyError: "无法复制。请手动选择文本。",
      downloadPdf: "下载 PDF",
      makeSofter: "更柔和",
      makeFormal: "更正式",
      resetWording: "重置措辞",
    },
    finalCta: {
      title: "分析你自己的请求",
      text: "用 MileSeal 对照约定范围与后续客户请求，并准备清晰的变更请求。",
      primary: "打开 MileSeal",
      secondary: "申请人工复核",
    },
    footer: {
      privacy: "隐私",
      contact: "联系",
      copyright: "© 2026 TIVONIX",
    },
  },
};

export function milesealCaseCopy(lang: Lang): MilesealCaseCopy {
  return COPY[lang] ?? COPY.en;
}

export function milesealCaseChangeRequestPlainText(params: {
  copy: MilesealCaseCopy;
  tone: CaseTone;
  costLabel: string;
  timelineLabel: string;
  hoursLabel: string;
}): string {
  const { copy, tone, costLabel, timelineLabel, hoursLabel } = params;
  const cr = copy.changeRequest;
  return [
    cr.docKind.toUpperCase(),
    cr.docTitle,
    "",
    `${cr.projectLabel}: ${cr.projectValue}`,
    `${cr.statusLabel}: ${cr.statusValue}`,
    "",
    cr.bodies[tone],
    "",
    `${cr.effortLabel}: ${hoursLabel}`,
    `${cr.costLabel}: ${costLabel}`,
    `${cr.timelineLabel}: ${timelineLabel}`,
    "",
    cr.approval,
  ].join("\n");
}
