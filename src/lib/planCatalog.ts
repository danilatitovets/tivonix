import type { PlanId } from "./pricingData";

/** План или сценарий «помочь выбрать» на /plans */
export type PlanLeadId = PlanId | "help";

export type PlanCtaAction = "modal";

export type PlanCatalogEntry = {
  id: PlanLeadId;
  /** Отображаемое имя (EN; для RU см. pricingCopy) */
  name: string;
  tagline: { ru: string; en: string; zh: string };
  /** Deep link payload (?start=...) */
  telegramPayload: string;
  /** Подпись источника в уведомлении админу */
  adminSource: string;
  ctaAction: PlanCtaAction;
};

/**
 * Единая карта планов для /plans и формы заявки.
 * Все CTA на /plans открывают форму на сайте.
 */
export const PLAN_CATALOG: Record<PlanLeadId, PlanCatalogEntry> = {
  start: {
    id: "start",
    name: "Start",
    tagline: {
      ru: "Лендинг + заявки + Telegram",
      en: "Landing page + leads + Telegram",
      zh: "落地页 + 线索 + Telegram",
    },
    telegramPayload: "plan_start",
    adminSource: "Start (/plans)",
    ctaAction: "modal",
  },
  growth: {
    id: "growth",
    name: "Growth",
    tagline: {
      ru: "Система заявок + Telegram + мини-CRM",
      en: "Lead system + Telegram + mini-CRM",
      zh: "线索系统 + Telegram + 迷你 CRM",
    },
    telegramPayload: "plan_growth",
    adminSource: "Growth (/plans)",
    ctaAction: "modal",
  },
  product: {
    id: "product",
    name: "Product",
    tagline: {
      ru: "Веб-сервис, кабинет, админка, оплата",
      en: "Web service, client area, admin, payments",
      zh: "Web 服务、客户后台、管理端、支付",
    },
    telegramPayload: "plan_product",
    adminSource: "Product (/plans)",
    ctaAction: "modal",
  },
  custom: {
    id: "custom",
    name: "Custom",
    tagline: {
      ru: "Автоматизация, AI и индивидуальное решение",
      en: "Automation, AI and a custom build",
      zh: "自动化、AI 与定制方案",
    },
    telegramPayload: "plan_custom",
    adminSource: "Custom (/plans)",
    ctaAction: "modal",
  },
  help: {
    id: "help",
    name: "Help",
    tagline: {
      ru: "Подбор подходящего формата запуска",
      en: "Finding the right launch format",
      zh: "选择合适的启动形式",
    },
    telegramPayload: "plan_help",
    adminSource: "Help (/plans)",
    ctaAction: "modal",
  },
};

export const PLAN_TELEGRAM_PAYLOADS: Record<PlanId, string> = {
  start: PLAN_CATALOG.start.telegramPayload,
  growth: PLAN_CATALOG.growth.telegramPayload,
  product: PLAN_CATALOG.product.telegramPayload,
  custom: PLAN_CATALOG.custom.telegramPayload,
};

export const HELP_TELEGRAM_PAYLOAD = PLAN_CATALOG.help.telegramPayload;

/** Payload для /partners white-label / referral */
export const PARTNER_AGENCY_TELEGRAM_PAYLOAD = "partner_agency";

export function getPlanCtaAction(planId: PlanId): PlanCtaAction {
  return PLAN_CATALOG[planId].ctaAction;
}

export function getPlanTelegramPayload(planId: PlanLeadId): string {
  return PLAN_CATALOG[planId].telegramPayload;
}

export function getPlanAdminSource(planId: PlanLeadId): string {
  return PLAN_CATALOG[planId].adminSource;
}

/** Payload → подпись для админ-уведомлений (синхронизировано с api/_bot.ts) */
export const TELEGRAM_PAYLOAD_ADMIN_SOURCE: Record<string, string> = {
  ...Object.fromEntries(
    Object.values(PLAN_CATALOG).map((entry) => [entry.telegramPayload, entry.adminSource])
  ),
  [PARTNER_AGENCY_TELEGRAM_PAYLOAD]: "Partners (/partners)",
};
