import type { Lang } from "./LangProvider";

export type WorkStartDecisionChoice =
  | "include"
  | "trade"
  | "delay"
  | "price"
  | "escalate";

export type WorkStartAuthorization = "approval_required" | "work_may_start";

export type WorkStartDecisionLabels = {
  title: string;
  subtitle: string;
  ownerLabel: string;
  ownerPlaceholder: string;
  decisionLabel: string;
  rationaleLabel: string;
  rationalePlaceholder: string;
  authorizationLabel: string;
  dateLabel: string;
  save: string;
  saving: string;
  saved: string;
  staleNotice: string;
  saveError: string;
  errOwner: string;
  errDecision: string;
  errRationale: string;
  errDate: string;
  errWorkMayStart: string;
  documentHeading: string;
  decisions: Record<WorkStartDecisionChoice, string>;
  authorization: Record<WorkStartAuthorization, string>;
};

const COPY: Record<Lang, WorkStartDecisionLabels> = {
  en: {
    title: "Work-Start Decision",
    subtitle: "Record who approved how work may proceed before delivery starts.",
    ownerLabel: "Decision Owner",
    ownerPlaceholder: "Name or role (e.g. Delivery lead)",
    decisionLabel: "Decision",
    rationaleLabel: "Rationale",
    rationalePlaceholder: "Why this decision was made",
    authorizationLabel: "Authorization",
    dateLabel: "Decision Date",
    save: "Save decision",
    saving: "Saving…",
    saved: "Decision saved",
    staleNotice: "Scope or request changed — decision reset to Approval required.",
    saveError: "Complete all required fields before saving.",
    errOwner: "Enter the decision owner.",
    errDecision: "Select a decision.",
    errRationale: "Enter a rationale.",
    errDate: "Enter the decision date.",
    errWorkMayStart:
      "Work may start only after Decision Owner, Decision, Rationale and Decision Date are filled.",
    documentHeading: "WORK-START DECISION",
    decisions: {
      include: "Include",
      trade: "Trade",
      delay: "Delay",
      price: "Price",
      escalate: "Escalate",
    },
    authorization: {
      approval_required: "Approval required",
      work_may_start: "Work may start",
    },
  },
  ru: {
    title: "Work-Start Decision",
    subtitle: "Зафиксируйте, кто и как разрешил начать работу до старта выполнения.",
    ownerLabel: "Decision Owner",
    ownerPlaceholder: "Имя или роль (например, Delivery lead)",
    decisionLabel: "Decision",
    rationaleLabel: "Rationale",
    rationalePlaceholder: "Почему принято это решение",
    authorizationLabel: "Authorization",
    dateLabel: "Decision Date",
    save: "Сохранить решение",
    saving: "Сохранение…",
    saved: "Решение сохранено",
    staleNotice: "Объём или запрос изменились — решение сброшено на Approval required.",
    saveError: "Заполните все обязательные поля перед сохранением.",
    errOwner: "Укажите decision owner.",
    errDecision: "Выберите decision.",
    errRationale: "Укажите rationale.",
    errDate: "Укажите decision date.",
    errWorkMayStart:
      "Work may start возможен только после заполнения Decision Owner, Decision, Rationale и Decision Date.",
    documentHeading: "WORK-START DECISION",
    decisions: {
      include: "Include",
      trade: "Trade",
      delay: "Delay",
      price: "Price",
      escalate: "Escalate",
    },
    authorization: {
      approval_required: "Approval required",
      work_may_start: "Work may start",
    },
  },
  zh: {
    title: "Work-Start Decision",
    subtitle: "在开始交付前记录谁批准了工作如何推进。",
    ownerLabel: "Decision Owner",
    ownerPlaceholder: "姓名或角色（例如 Delivery lead）",
    decisionLabel: "Decision",
    rationaleLabel: "Rationale",
    rationalePlaceholder: "为何做出此决定",
    authorizationLabel: "Authorization",
    dateLabel: "Decision Date",
    save: "保存决定",
    saving: "保存中…",
    saved: "决定已保存",
    staleNotice: "范围或请求已变更 — 决定已重置为 Approval required。",
    saveError: "保存前请填写所有必填字段。",
    errOwner: "请输入 decision owner。",
    errDecision: "请选择 decision。",
    errRationale: "请输入 rationale。",
    errDate: "请输入 decision date。",
    errWorkMayStart:
      "仅当 Decision Owner、Decision、Rationale 和 Decision Date 全部填写后才可选择 Work may start。",
    documentHeading: "WORK-START DECISION",
    decisions: {
      include: "Include",
      trade: "Trade",
      delay: "Delay",
      price: "Price",
      escalate: "Escalate",
    },
    authorization: {
      approval_required: "Approval required",
      work_may_start: "Work may start",
    },
  },
};

export function workStartDecisionCopy(lang: Lang): WorkStartDecisionLabels {
  return COPY[lang] ?? COPY.en;
}
