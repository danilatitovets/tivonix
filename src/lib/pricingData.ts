export type PlanId = "start" | "growth" | "product" | "custom";

export type CellKind = "yes" | "no" | "option" | "basic" | "text";

export type ComparisonCell = {
  kind: CellKind;
  textKey?: string;
};

export type ComparisonRow = {
  id: string;
  values: Record<PlanId, ComparisonCell>;
};

export type ComparisonGroup = {
  id: string;
  rows: ComparisonRow[];
};

export const PLAN_IDS: PlanId[] = ["start", "growth", "product", "custom"];

export const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    id: "core",
    rows: [
      { id: "landing", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "responsive", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "form", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "contactButtons", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "telegramNotify", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "emailNotify", values: { start: { kind: "option" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
    ],
  },
  {
    id: "crm",
    rows: [
      { id: "leadStorage", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "leadTable", values: { start: { kind: "option" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "miniCrm", values: { start: { kind: "no" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "statuses", values: { start: { kind: "no" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "history", values: { start: { kind: "no" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "roles", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
    ],
  },
  {
    id: "product",
    rows: [
      { id: "cabinet", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "admin", values: { start: { kind: "no" }, growth: { kind: "basic" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "auth", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "database", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "booking", values: { start: { kind: "option" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "payments", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
    ],
  },
  {
    id: "automation",
    rows: [
      { id: "autoNotify", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "integrations", values: { start: { kind: "no" }, growth: { kind: "basic" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "aiBot", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "option" }, custom: { kind: "yes" } } },
      { id: "aiLeads", values: { start: { kind: "no" }, growth: { kind: "no" }, product: { kind: "option" }, custom: { kind: "yes" } } },
      { id: "documents", values: { start: { kind: "no" }, growth: { kind: "no" }, product: { kind: "option" }, custom: { kind: "yes" } } },
      { id: "customFlows", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
    ],
  },
  {
    id: "launch",
    rows: [
      { id: "domain", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "deploy", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "guide", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "testing", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      {
        id: "support",
        values: {
          start: { kind: "text", textKey: "support7" },
          growth: { kind: "text", textKey: "support14" },
          product: { kind: "text", textKey: "support30" },
          custom: { kind: "text", textKey: "supportCustom" },
        },
      },
    ],
  },
];

import type { PlanCtaAction } from "./planCatalog";
import { getPlanCtaAction, PLAN_TELEGRAM_PAYLOADS } from "./planCatalog";

export type { PlanCtaAction } from "./planCatalog";

export type PlanConfig = {
  id: PlanId;
  badgeKey?: "popular" | "product";
  highlight?: boolean;
  ctaAction: PlanCtaAction;
};

/** @deprecated Используйте PLAN_TELEGRAM_PAYLOADS из planCatalog */
export const PLAN_TELEGRAM_START = PLAN_TELEGRAM_PAYLOADS;

export const PLANS: PlanConfig[] = [
  { id: "start", ctaAction: getPlanCtaAction("start") },
  { id: "growth", badgeKey: "popular", highlight: true, ctaAction: getPlanCtaAction("growth") },
  { id: "product", badgeKey: "product", ctaAction: getPlanCtaAction("product") },
  { id: "custom", ctaAction: getPlanCtaAction("custom") },
];
