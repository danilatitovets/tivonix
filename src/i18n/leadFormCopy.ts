import type { Lang } from "./LangProvider";
import type { BudgetId } from "../lib/leads";

export function leadFormCopy(lang: Lang) {
  const isRu = lang === "ru";
  return isRu ? COPY_RU : COPY_EN;
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

const COPY_RU = {
  title: "Обсудить задачу",
  subtitle: "Коротко опишите задачу — отвечу указанным способом.",
  name: "Имя",
  nameOptional: "необязательно",
  contact: "Как связаться",
  contactHint: "Email, Telegram или телефон",
  contactPh: "email, @username или +375…",
  task: "Описание задачи",
  taskPh: "Что нужно сделать?",
  budget: "Бюджет",
  budgetOptional: "необязательно",
  budgets: BUDGET_RU,
  consent:
    "Согласен(на) с политикой обработки персональных данных",
  privacyLabel: "Политика",
  privacyHref: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
  send: "Отправить заявку",
  sending: "Отправляю…",
  close: "Закрыть",
  cancel: "Отмена",
  errors: {
    contact: "Укажите email, Telegram или телефон.",
    task: "Кратко опишите задачу (хотя бы пару слов).",
    consent: "Нужно согласие с политикой конфиденциальности.",
  },
  success: "Спасибо! Заявка отправлена. Я свяжусь с вами указанным способом.",
  errorTitle: "Не удалось отправить заявку",
  errorBody: "Можно написать напрямую:",
  fallbackEmail: "Написать на tivoonix@gmail.com",
  fallbackTelegram: "Открыть чат @TIVONIX",
  altTelegram: "Или написать в Telegram",
  altBot: "Telegram-бот",
  altEmail: "Email",
  sticky: "Обсудить задачу",
  ctaDiscuss: "Обсудить задачу",
  ctaEstimate: "Получить оценку проекта",
  ctaProjects: "Есть похожая задача? Обсудить проект",
  selectedPlan: "Выбранный план",
  clearPlan: "Без плана",
  planHint: "Заявка по тарифу — можно уточнить детали ниже.",
};

const COPY_EN = {
  title: "Discuss your task",
  subtitle: "Briefly describe the task — I’ll reply via your preferred channel.",
  name: "Name",
  nameOptional: "optional",
  contact: "How to reach you",
  contactHint: "Email, Telegram, or phone",
  contactPh: "email, @username, or phone",
  task: "Task description",
  taskPh: "What do you need?",
  budget: "Budget",
  budgetOptional: "optional",
  budgets: BUDGET_EN,
  consent: "I agree to the privacy policy",
  privacyLabel: "Privacy policy",
  privacyHref: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  send: "Send request",
  sending: "Sending…",
  close: "Close",
  cancel: "Cancel",
  errors: {
    contact: "Enter an email, Telegram, or phone number.",
    task: "Briefly describe the task (a few words).",
    consent: "Please accept the privacy policy.",
  },
  success: "Thanks! Your request was sent. I’ll contact you via the channel you provided.",
  errorTitle: "Couldn’t send the request",
  errorBody: "You can reach out directly:",
  fallbackEmail: "Email tivoonix@gmail.com",
  fallbackTelegram: "Open chat @TIVONIX",
  altTelegram: "Or message on Telegram",
  altBot: "Telegram bot",
  altEmail: "Email",
  sticky: "Discuss task",
  ctaDiscuss: "Discuss the task",
  ctaEstimate: "Get a project estimate",
  ctaProjects: "Have a similar task? Let’s discuss",
  selectedPlan: "Selected plan",
  clearPlan: "No plan",
  planHint: "Request for this plan — add details below.",
};
