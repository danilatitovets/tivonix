import type { Lang } from "./LangProvider";
import type { BudgetId } from "../lib/leads";

export function leadFormCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "ru" ? COPY_RU : COPY_EN;
}

const BUDGET_RU: { id: BudgetId; label: string }[] = [
  { id: "", label: "Не выбран" },
  { id: "under_500", label: "до $500" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "от $5,000" },
  { id: "unknown", label: "пока не знаю" },
];

const BUDGET_EN: { id: BudgetId; label: string }[] = [
  { id: "", label: "Not selected" },
  { id: "under_500", label: "under $500" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "from $5,000" },
  { id: "unknown", label: "not sure yet" },
];

const BUDGET_ZH: { id: BudgetId; label: string }[] = [
  { id: "", label: "未选择" },
  { id: "under_500", label: "低于 $500" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "$5,000 起" },
  { id: "unknown", label: "暂时不确定" },
];

const COPY_RU = {
  title: "Расскажите, что нужно запустить",
  subtitle:
    "Опишите задачу своими словами. Мы разберём её и отправим предварительный план, срок и диапазон стоимости.",
  name: "Имя",
  nameOptional: "необязательно",
  contact: "Telegram, email или другой контакт",
  contactHint: "Email, Telegram или телефон",
  contactPh: "email, @username или +375…",
  task: "Описание задачи",
  taskPh: "Что нужно сделать?",
  budget: "Примерный бюджет",
  budgetOptional: "необязательно",
  budgets: BUDGET_RU,
  consent:
    "Согласен(на) с политикой обработки персональных данных",
  privacyLabel: "Политика",
  privacyHref: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
  send: "Получить предварительную оценку",
  sending: "Отправляю…",
  sent: "Отправлено",
  close: "Закрыть",
  cancel: "Отмена",
  errors: {
    contact: "Укажите email, Telegram или телефон.",
    task: "Кратко опишите задачу (хотя бы пару слов).",
    consent: "Нужно согласие с политикой конфиденциальности.",
  },
  successTitle: "Заявка получена",
  success:
    "Изучим задачу и ответим по указанному контакту в течение рабочего дня.",
  successCase: "Посмотреть похожий кейс",
  successHome: "Вернуться на главную",
  errorTitle: "Не удалось отправить заявку",
  errorBody: "Можно написать напрямую:",
  fallbackEmail: "Написать на tivoonix@gmail.com",
  fallbackTelegram: "Открыть чат @TIVONIX",
  altTelegram: "Или написать в Telegram",
  altBot: "Telegram-бот",
  altEmail: "Email",
  sticky: "Получить оценку",
  ctaDiscuss: "Оценить проект",
  ctaEstimate: "Получить оценку проекта",
  ctaProjects: "Есть похожая задача? Обсудить проект",
  selectedPlan: "Выбранный план",
  clearPlan: "Без плана",
  planHint: "Заявка по тарифу — можно уточнить детали ниже.",
  formNote:
    "Ответим в течение рабочего дня. Созвон не обязателен. Контакты не передаём третьим лицам.",
};

const COPY_EN = {
  title: "Tell us what you need to launch",
  subtitle:
    "Describe the task in your own words. We\u2019ll review it and send a preliminary plan, timeline and cost range.",
  name: "Name",
  nameOptional: "optional",
  contact: "Telegram, email or another contact",
  contactHint: "Email, Telegram, or phone",
  contactPh: "email, @username, or phone",
  task: "Task description",
  taskPh: "What do you need?",
  budget: "Approximate budget",
  budgetOptional: "optional",
  budgets: BUDGET_EN,
  consent: "I agree to the privacy policy",
  privacyLabel: "Privacy policy",
  privacyHref: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  send: "Get a preliminary estimate",
  sending: "Sending…",
  sent: "Sent",
  close: "Close",
  cancel: "Cancel",
  errors: {
    contact: "Enter an email, Telegram, or phone number.",
    task: "Briefly describe the task (a few words).",
    consent: "Please accept the privacy policy.",
  },
  successTitle: "Request received",
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
  ctaProjects: "Have a similar task? Let’s discuss",
  selectedPlan: "Selected plan",
  clearPlan: "No plan",
  planHint: "Request for this plan — add details below.",
  formNote:
    "We reply within a business day. A call is optional. We don\u2019t share contacts with third parties.",
};

const COPY_ZH = {
  title: "告诉我们您要启动什么",
  subtitle:
    "用自己的话描述需求。我们会梳理任务，并发送初步方案、周期与费用区间。",
  name: "姓名",
  nameOptional: "选填",
  contact: "Telegram、邮箱或其他联系方式",
  contactHint: "邮箱、Telegram 或电话",
  contactPh: "邮箱、@username 或电话",
  task: "需求描述",
  taskPh: "您需要做什么？",
  budget: "大致预算",
  budgetOptional: "选填",
  budgets: BUDGET_ZH,
  consent: "我同意个人信息处理政策",
  privacyLabel: "隐私政策",
  privacyHref: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  send: "获取初步评估",
  sending: "提交中…",
  sent: "已发送",
  close: "关闭",
  cancel: "取消",
  errors: {
    contact: "请填写邮箱、Telegram 或电话。",
    task: "请简要描述需求（至少几个字）。",
    consent: "需要同意隐私政策。",
  },
  successTitle: "已收到您的需求",
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
  ctaProjects: "有类似需求？一起来谈",
  selectedPlan: "已选方案",
  clearPlan: "不选方案",
  planHint: "按该套餐提交 — 可在下方补充细节。",
  formNote:
    "我们会在一个工作日内回复。通话非必须。联系方式不会提供给第三方。",
};
