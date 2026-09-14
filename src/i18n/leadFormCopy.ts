import type { Lang } from "./LangProvider";
import type { BudgetId, ProductTypeId, TimelineId } from "../lib/leads";

export function leadFormCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "ru" ? COPY_RU : COPY_EN;
}

const BUDGET_RU: { id: BudgetId; label: string }[] = [
  { id: "", label: "Не выбран" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "$5,000–20,000" },
  { id: "from_20000", label: "$20,000+" },
  { id: "unknown", label: "пока не знаю" },
];

const BUDGET_EN: { id: BudgetId; label: string }[] = [
  { id: "", label: "Not selected" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "$5,000–20,000" },
  { id: "from_20000", label: "$20,000+" },
  { id: "unknown", label: "not sure yet" },
];

const BUDGET_ZH: { id: BudgetId; label: string }[] = [
  { id: "", label: "未选择" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "$5,000–20,000" },
  { id: "from_20000", label: "$20,000+" },
  { id: "unknown", label: "暂时不确定" },
];

const PRODUCT_TYPES_RU: { id: ProductTypeId; label: string }[] = [
  { id: "saas", label: "SaaS / MVP" },
  { id: "marketplace", label: "Маркетплейс" },
  { id: "fintech", label: "Финтех / платежи" },
  { id: "internal_system", label: "Внутренняя система" },
  { id: "crm_erp", label: "CRM / ERP" },
  { id: "telegram", label: "Продукт в Телеграме" },
  { id: "ai_automation", label: "AI / автоматизация" },
  { id: "website_funnel", label: "Сайт + заявки" },
  { id: "other", label: "Другое" },
];

const PRODUCT_TYPES_EN: { id: ProductTypeId; label: string }[] = [
  { id: "saas", label: "SaaS / MVP" },
  { id: "marketplace", label: "Marketplace" },
  { id: "fintech", label: "FinTech / payments" },
  { id: "internal_system", label: "Internal system" },
  { id: "crm_erp", label: "CRM / ERP-like" },
  { id: "telegram", label: "Telegram product" },
  { id: "ai_automation", label: "AI / automation" },
  { id: "website_funnel", label: "Website + lead flow" },
  { id: "other", label: "Other" },
];

const PRODUCT_TYPES_ZH: { id: ProductTypeId; label: string }[] = [
  { id: "saas", label: "SaaS / MVP" },
  { id: "marketplace", label: "市场平台" },
  { id: "fintech", label: "金融科技 / 支付" },
  { id: "internal_system", label: "内部系统" },
  { id: "crm_erp", label: "CRM / 类 ERP" },
  { id: "telegram", label: "Telegram 产品" },
  { id: "ai_automation", label: "AI / 自动化" },
  { id: "website_funnel", label: "网站 + 线索流程" },
  { id: "other", label: "其他" },
];

const TIMELINES_RU: { id: TimelineId; label: string }[] = [
  { id: "asap", label: "как можно быстрее" },
  { id: "month", label: "в течение месяца" },
  { id: "quarter", label: "1–3 месяца" },
  { id: "flexible", label: "гибко" },
];

const TIMELINES_EN: { id: TimelineId; label: string }[] = [
  { id: "asap", label: "as soon as possible" },
  { id: "month", label: "within a month" },
  { id: "quarter", label: "1–3 months" },
  { id: "flexible", label: "flexible" },
];

const TIMELINES_ZH: { id: TimelineId; label: string }[] = [
  { id: "asap", label: "尽快" },
  { id: "month", label: "一个月内" },
  { id: "quarter", label: "1–3 个月" },
  { id: "flexible", label: "时间灵活" },
];

const COPY_RU = {
  title: "Короткий бриф по продукту",
  subtitle:
    "За 1–2 минуты опишите продукт, пользователей и главный сценарий. В ответ пришлём следующий шаг, риски, срок и диапазон стоимости.",
  productType: "Тип продукта",
  productTypeOptional: "можно уточнить позже",
  productTypes: PRODUCT_TYPES_RU,
  users: "Пользователи / роли",
  usersPh: "Например: клиент, менеджер, админ, партнёр…",
  name: "Имя",
  nameOptional: "необязательно",
  contact: "Телеграм, почта или другой контакт",
  contactHint: "Почта, Телеграм или телефон",
  contactPh: "почта, @username или +375…",
  task: "Главный сценарий / задача",
  taskPh: "Что должно происходить в системе: от входа пользователя до результата?",
  integrations: "Интеграции / существующие системы",
  integrationsPh: "Платежи, Телеграм, CRM, таблицы, API, старый сайт…",
  timeline: "Срок",
  timelines: TIMELINES_RU,
  budget: "Бюджетный контекст",
  budgetOptional: "необязательно",
  budgets: BUDGET_RU,
  consent:
    "Согласен(на) с политикой обработки персональных данных",
  privacyLabel: "Политика",
  privacyHref: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
  send: "Отправить бриф",
  sending: "Отправляю…",
  sent: "Отправлено",
  close: "Закрыть",
  cancel: "Отмена",
  errors: {
    contact: "Укажите почту, Телеграм или телефон.",
    task: "Опишите главный сценарий или задачу (хотя бы пару слов).",
    consent: "Нужно согласие с политикой конфиденциальности.",
  },
  successTitle: "Бриф получен",
  success:
    "Изучим задачу и ответим по указанному контакту в течение рабочего дня.",
  successCase: "Посмотреть похожий кейс",
  successHome: "Вернуться на главную",
  errorTitle: "Не удалось отправить заявку",
  errorBody: "Можно написать напрямую:",
  fallbackEmail: "Написать на tivoonix@gmail.com",
  fallbackTelegram: "Открыть чат @TIVONIX",
  altTelegram: "Или написать в Телеграм",
  altBot: "Бот в Телеграме",
  altEmail: "Почта",
  sticky: "Получить оценку",
  ctaDiscuss: "Оценить проект",
  ctaEstimate: "Получить оценку проекта",
  ctaSimilarProject: "Предложить такой же проект",
  ctaProjects: "Есть похожая задача? Обсудить проект",
  selectedPlan: "Выбранный план",
  clearPlan: "Без плана",
  planHint: "Заявка по тарифу — можно уточнить детали ниже.",
  formNote:
    "Ответим в течение рабочего дня. Созвон не обязателен. Контакты не передаём третьим лицам.",
};

const COPY_EN = {
  title: "Short product brief",
  subtitle:
    "In 1–2 minutes, describe the product, users and main workflow. We\u2019ll reply with the next step, risks, timeline and cost range.",
  productType: "Product type",
  productTypeOptional: "you can refine later",
  productTypes: PRODUCT_TYPES_EN,
  users: "Users / roles",
  usersPh: "Example: customer, manager, admin, partner…",
  name: "Name",
  nameOptional: "optional",
  contact: "Telegram, email or another contact",
  contactHint: "Email, Telegram, or phone",
  contactPh: "email, @username, or phone",
  task: "Main workflow / task",
  taskPh: "What should happen in the system, from user entry to result?",
  integrations: "Integrations / existing systems",
  integrationsPh: "Payments, Telegram, CRM, sheets, API, old website…",
  timeline: "Timeline",
  timelines: TIMELINES_EN,
  budget: "Budget context",
  budgetOptional: "optional",
  budgets: BUDGET_EN,
  consent: "I agree to the privacy policy",
  privacyLabel: "Privacy policy",
  privacyHref: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  send: "Send brief",
  sending: "Sending…",
  sent: "Sent",
  close: "Close",
  cancel: "Cancel",
  errors: {
    contact: "Enter an email, Telegram, or phone number.",
    task: "Briefly describe the main workflow or task.",
    consent: "Please accept the privacy policy.",
  },
  successTitle: "Brief received",
  success:
    "We\u2019ll review the task and reply via your contact within a business day.",
  successCase: "See a similar case",
  successHome: "Back to home",
  errorTitle: "Couldn\u2019t send the request",
  errorBody: "You can reach out directly:",
  fallbackEmail: "Email tivoonix@gmail.com",
  fallbackTelegram: "Open chat @TIVONIX",
  altTelegram: "Or message on Telegram",
  altBot: "Telegram bot",
  altEmail: "Email",
  sticky: "Get an estimate",
  ctaDiscuss: "Estimate project",
  ctaEstimate: "Get a project estimate",
  ctaSimilarProject: "Propose a similar project",
  ctaProjects: "Have a similar task? Let’s discuss",
  selectedPlan: "Selected plan",
  clearPlan: "No plan",
  planHint: "Request for this plan — add details below.",
  formNote:
    "We reply within a business day. A call is optional. We don\u2019t share contacts with third parties.",
};

const COPY_ZH = {
  title: "简短产品 brief",
  subtitle:
    "用 1–2 分钟描述产品、用户和核心流程。我们会回复下一步、风险、周期与费用区间。",
  productType: "产品类型",
  productTypeOptional: "之后可再补充",
  productTypes: PRODUCT_TYPES_ZH,
  users: "用户 / 角色",
  usersPh: "例如：客户、经理、管理员、合作伙伴…",
  name: "姓名",
  nameOptional: "选填",
  contact: "Telegram、邮箱或其他联系方式",
  contactHint: "邮箱、Telegram 或电话",
  contactPh: "邮箱、@username 或电话",
  task: "核心流程 / 任务",
  taskPh: "系统中应该发生什么：从用户进入到结果？",
  integrations: "集成 / 现有系统",
  integrationsPh: "支付、Telegram、CRM、表格、API、旧网站…",
  timeline: "时间计划",
  timelines: TIMELINES_ZH,
  budget: "预算背景",
  budgetOptional: "选填",
  budgets: BUDGET_ZH,
  consent: "我同意个人信息处理政策",
  privacyLabel: "隐私政策",
  privacyHref: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  send: "发送 brief",
  sending: "提交中…",
  sent: "已发送",
  close: "关闭",
  cancel: "取消",
  errors: {
    contact: "请填写邮箱、Telegram 或电话。",
    task: "请简要描述核心流程或任务。",
    consent: "需要同意隐私政策。",
  },
  successTitle: "已收到 brief",
  success: "我们将评估任务，并在一个工作日内通过您预留的联系方式回复。",
  successCase: "查看类似案例",
  successHome: "返回首页",
  errorTitle: "提交失败",
  errorBody: "您也可以直接联系我们：",
  fallbackEmail: "发送邮件至 tivoonix@gmail.com",
  fallbackTelegram: "打开聊天 @TIVONIX",
  altTelegram: "或通过 Telegram 联系",
  altBot: "Telegram 机器人",
  altEmail: "邮箱",
  sticky: "获取评估",
  ctaDiscuss: "评估项目",
  ctaEstimate: "获取项目评估",
  ctaSimilarProject: "提交类似项目",
  ctaProjects: "有类似需求？一起来谈",
  selectedPlan: "已选方案",
  clearPlan: "不选方案",
  planHint: "按该套餐提交 — 可在下方补充细节。",
  formNote:
    "我们会在一个工作日内回复。通话非必须。联系方式不会提供给第三方。",
};
