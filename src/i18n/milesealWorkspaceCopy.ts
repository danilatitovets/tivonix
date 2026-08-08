import type { Lang } from "./LangProvider";

export type MilesealWorkspaceCopy = {
  demoBadge: string;
  betaBadge: string;
  newAnalysis: string;
  demoAnalyses: string;
  demoTag: string;
  requestManualReview: string;
  openCaseStudy: string;
  backToTivonix: string;
  topDemoScenario: string;
  topCustomReview: string;
  openArtifact: string;
  reset: string;
  collapseSidebar: string;
  expandSidebar: string;
  closeNav: string;
  openNav: string;
  emptyTitle: string;
  emptyDescription: string;
  introMessage: string;
  scopePreviewTitle: string;
  scopeProject: string;
  analyseRequest: string;
  analyzingTitle: string;
  progressSteps: string[];
  composerPlaceholder: string;
  composerSend: string;
  scopeChipPrefix: string;
  outsideScopeTitle: string;
  metrics: { effort: string; cost: string; timeline: string; confidence: string };
  whyTitle: string;
  effortTitle: string;
  excerptsTitle: string;
  whyBulletsPreset: string[];
  includedInScope: string;
  notInScope: string;
  newWorkstream: string;
  needsApproval: string;
  openChangeRequest: string;
  copySummary: string;
  makeSofter: string;
  makeFormal: string;
  resetWording: string;
  toneLabel: string;
  toneSoft: string;
  toneNeutral: string;
  toneFormal: string;
  actionsLabel: string;
  resetAnalysis: string;
  artifactTitle: string;
  artifactEmpty: string;
  artifactEmptyTitle: string;
  artifactEmptyAction: string;
  artifactStatus: string;
  copy: string;
  copied: string;
  copyError: string;
  downloadPdf: string;
  downloadingPdf: string;
  pdfError: string;
  closeArtifact: string;
  customNotice: string;
  sendManual: string;
  manualTitle: string;
  manualText: string;
  demoAnalysisLabel: string;
  manualReviewLabel: string;
  skipToContent: string;
  statusOutside: string;
};

const COPY: Record<Lang, MilesealWorkspaceCopy> = {
  en: {
    demoBadge: "Demo",
    betaBadge: "Beta",
    newAnalysis: "New analysis",
    demoAnalyses: "Demo analyses",
    demoTag: "Demo",
    requestManualReview: "Request manual review",
    openCaseStudy: "Open case study",
    backToTivonix: "Back to TIVONIX",
    topDemoScenario: "Demo scenario",
    topCustomReview: "Custom review",
    openArtifact: "Open change request",
    reset: "Reset",
    collapseSidebar: "Collapse sidebar",
    expandSidebar: "Expand sidebar",
    closeNav: "Close navigation",
    openNav: "Open navigation",
    emptyTitle: "What changed after the scope was agreed?",
    emptyDescription:
      "Pick a demo scenario to see a full analysis, or paste an anonymized client request for a manual review by TIVONIX.",
    introMessage:
      "MileSeal compares a new client request with the agreed project scope, estimates extra effort, and drafts a change request you can send.",
    scopePreviewTitle: "Agreed scope",
    scopeProject: "Project scope",
    analyseRequest: "Analyse request",
    analyzingTitle: "Analysing scope change…",
    progressSteps: [
      "Reviewing the agreed scope",
      "Comparing the client request",
      "Identifying additional work",
      "Estimating cost and timeline",
      "Drafting the change request",
    ],
    composerPlaceholder: "Paste a new client request…",
    composerSend: "Send",
    scopeChipPrefix: "Scope",
    outsideScopeTitle: "This request is outside the agreed scope",
    metrics: {
      effort: "Extra effort",
      cost: "Estimated cost",
      timeline: "Timeline impact",
      confidence: "Confidence",
    },
    whyTitle: "Why it’s outside scope",
    effortTitle: "Effort breakdown",
    excerptsTitle: "Scope excerpts",
    whyBulletsPreset: [
      "The request was not included in the agreed deliverables.",
      "It creates additional work beyond the signed scope.",
      "Timeline and budget need a separate update.",
      "Written client approval is required before work starts.",
    ],
    includedInScope: "Included in scope",
    notInScope: "Not in scope",
    newWorkstream: "New workstream",
    needsApproval: "Needs approval",
    openChangeRequest: "Open change request",
    copySummary: "Copy summary",
    makeSofter: "Softer",
    makeFormal: "More formal",
    resetWording: "Reset wording",
    toneLabel: "Tone",
    toneSoft: "Soft",
    toneNeutral: "Default",
    toneFormal: "Formal",
    actionsLabel: "Export",
    resetAnalysis: "Reset analysis",
    artifactTitle: "Change request",
    artifactEmpty:
      "Choose a demo scenario on the left and run the analysis — a client-ready draft will land here.",
    artifactEmptyTitle: "Nothing here yet",
    artifactEmptyAction: "Open a demo scenario",
    artifactStatus: "Ready to send",
    copy: "Copy",
    copied: "Copied",
    copyError: "Could not copy. Please select the text manually.",
    downloadPdf: "Download PDF",
    downloadingPdf: "Preparing PDF…",
    pdfError: "Could not create the PDF. Please try again.",
    closeArtifact: "Close",
    customNotice:
      "Custom analysis is not available in this demo yet. Send the case for a manual review.",
    sendManual: "Send for manual review",
    manualTitle: "Manual scope review",
    manualText:
      "We’ll review your anonymized request against the agreed scope and reply with a clear read on what changed.",
    demoAnalysisLabel: "Demo analysis",
    manualReviewLabel: "Manual review",
    skipToContent: "Skip to content",
    statusOutside: "Outside scope",
  },
  ru: {
    demoBadge: "Демо",
    betaBadge: "Бета",
    newAnalysis: "Новый анализ",
    demoAnalyses: "Демо-сценарии",
    demoTag: "Демо",
    requestManualReview: "Запросить ручной разбор",
    openCaseStudy: "Открыть кейс",
    backToTivonix: "Назад в TIVONIX",
    topDemoScenario: "Демо-сценарий",
    topCustomReview: "Свой запрос",
    openArtifact: "Открыть запрос на изменение",
    reset: "Сбросить",
    collapseSidebar: "Свернуть боковую панель",
    expandSidebar: "Развернуть боковую панель",
    closeNav: "Закрыть меню",
    openNav: "Открыть меню",
    emptyTitle: "Что изменилось после согласования объёма?",
    emptyDescription:
      "Выберите демо-сценарий, чтобы увидеть полный разбор, или вставьте обезличенный запрос клиента — его разберёт команда TIVONIX вручную.",
    introMessage:
      "MileSeal сравнивает новый запрос клиента с согласованным объёмом проекта, оценивает доп. работу и готовит запрос на изменение, который можно отправить клиенту.",
    scopePreviewTitle: "Согласованный объём",
    scopeProject: "Объём проекта",
    analyseRequest: "Проанализировать запрос",
    analyzingTitle: "Разбираем изменение объёма…",
    progressSteps: [
      "Изучаем согласованный объём",
      "Сравниваем запрос клиента",
      "Определяем дополнительные работы",
      "Рассчитываем стоимость и сроки",
      "Формируем запрос на изменение",
    ],
    composerPlaceholder: "Вставьте новый запрос клиента…",
    composerSend: "Отправить",
    scopeChipPrefix: "Объём",
    outsideScopeTitle: "Этот запрос выходит за согласованный объём",
    metrics: {
      effort: "Доп. работа",
      cost: "Ориентировочная стоимость",
      timeline: "Влияние на сроки",
      confidence: "Уверенность",
    },
    whyTitle: "Почему это вне объёма",
    effortTitle: "Разбивка по работам",
    excerptsTitle: "Фрагменты объёма",
    whyBulletsPreset: [
      "Запрос не входил в согласованные результаты.",
      "Появляется дополнительная работа сверх подписанного объёма.",
      "Сроки и бюджет нужно обновить отдельно.",
      "До начала работ нужно письменное согласование клиента.",
    ],
    includedInScope: "Входит в объём",
    notInScope: "Не входит в объём",
    newWorkstream: "Новый поток работ",
    needsApproval: "Нужно согласование",
    openChangeRequest: "Открыть запрос на изменение",
    copySummary: "Скопировать итог",
    makeSofter: "Мягче",
    makeFormal: "Формальнее",
    resetWording: "Сбросить формулировку",
    toneLabel: "Тон",
    toneSoft: "Мягкий",
    toneNeutral: "Базовый",
    toneFormal: "Формальный",
    actionsLabel: "Экспорт",
    resetAnalysis: "Сбросить анализ",
    artifactTitle: "Запрос на изменение",
    artifactEmpty:
      "Выберите демо-сценарий слева и запустите анализ — сюда ляжет черновик для клиента.",
    artifactEmptyTitle: "Пока пусто",
    artifactEmptyAction: "Выбрать демо-сценарий",
    artifactStatus: "Готово к отправке",
    copy: "Скопировать",
    copied: "Скопировано",
    copyError: "Не удалось скопировать. Выделите текст вручную.",
    downloadPdf: "Скачать PDF",
    downloadingPdf: "Готовим PDF…",
    pdfError: "Не удалось создать PDF. Попробуйте ещё раз.",
    closeArtifact: "Закрыть",
    customNotice:
      "Разбор своего кейса в этой демонстрации пока недоступен. Отправьте запрос на ручной разбор.",
    sendManual: "Отправить на ручной разбор",
    manualTitle: "Ручной разбор объёма",
    manualText:
      "Мы сверим обезличенный запрос с согласованным объёмом и вернёмся с понятным выводом: что изменилось и как это оформить.",
    demoAnalysisLabel: "Демо-анализ",
    manualReviewLabel: "Ручной разбор",
    skipToContent: "Перейти к содержимому",
    statusOutside: "Вне объёма",
  },
  zh: {
    demoBadge: "演示",
    betaBadge: "Beta",
    newAnalysis: "新分析",
    demoAnalyses: "演示分析",
    demoTag: "演示",
    requestManualReview: "申请人工复核",
    openCaseStudy: "打开案例",
    backToTivonix: "返回 TIVONIX",
    topDemoScenario: "演示场景",
    topCustomReview: "自定义复核",
    openArtifact: "打开变更请求",
    reset: "重置",
    collapseSidebar: "收起侧栏",
    expandSidebar: "展开侧栏",
    closeNav: "关闭导航",
    openNav: "打开导航",
    emptyTitle: "范围约定之后，发生了什么变化？",
    emptyDescription:
      "选择演示场景查看完整分析，或粘贴脱敏后的客户请求，由 TIVONIX 团队人工复核。",
    introMessage:
      "MileSeal 会对照已约定项目范围检查新的客户请求，估算额外工作量，并起草可发给客户的变更请求。",
    scopePreviewTitle: "已约定范围",
    scopeProject: "项目范围",
    analyseRequest: "分析请求",
    analyzingTitle: "正在分析范围变更…",
    progressSteps: [
      "核对已约定范围",
      "对照客户请求",
      "识别额外工作",
      "估算费用与工期",
      "生成变更请求",
    ],
    composerPlaceholder: "粘贴新的客户请求…",
    composerSend: "发送",
    scopeChipPrefix: "范围",
    outsideScopeTitle: "该请求超出已约定范围",
    metrics: {
      effort: "额外工作量",
      cost: "预估费用",
      timeline: "工期影响",
      confidence: "置信度",
    },
    whyTitle: "为何超出范围",
    effortTitle: "工作量拆解",
    excerptsTitle: "范围摘录",
    whyBulletsPreset: [
      "该请求未包含在已约定交付物中。",
      "它会产生超出已签署范围的额外工作。",
      "工期与预算需要单独更新。",
      "开工前需取得客户书面批准。",
    ],
    includedInScope: "范围内",
    notInScope: "范围外",
    newWorkstream: "新工作流",
    needsApproval: "需批准",
    openChangeRequest: "打开变更请求",
    copySummary: "复制摘要",
    makeSofter: "更柔和",
    makeFormal: "更正式",
    resetWording: "重置措辞",
    toneLabel: "语气",
    toneSoft: "柔和",
    toneNeutral: "默认",
    toneFormal: "正式",
    actionsLabel: "导出",
    resetAnalysis: "重置分析",
    artifactTitle: "变更请求",
    artifactEmpty: "在左侧选择演示场景并运行分析——可发给客户的草稿会出现在这里。",
    artifactEmptyTitle: "暂无内容",
    artifactEmptyAction: "选择演示场景",
    artifactStatus: "可发送",
    copy: "复制",
    copied: "已复制",
    copyError: "无法复制。请手动选择文本。",
    downloadPdf: "下载 PDF",
    downloadingPdf: "正在生成 PDF…",
    pdfError: "无法生成 PDF，请重试。",
    closeArtifact: "关闭",
    customNotice: "此演示暂不支持自定义分析。请将案例发送给人工业务复核。",
    sendManual: "发送人工复核",
    manualTitle: "人工范围复核",
    manualText: "我们会对照已约定范围复核你的脱敏请求，并清楚说明哪些内容发生了变化。",
    demoAnalysisLabel: "演示分析",
    manualReviewLabel: "人工复核",
    skipToContent: "跳到主要内容",
    statusOutside: "超出范围",
  },
};

export function milesealWorkspaceCopy(lang: Lang): MilesealWorkspaceCopy {
  return COPY[lang] ?? COPY.en;
}
