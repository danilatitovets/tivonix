import {
  getPlanTelegramPayload,
  HELP_TELEGRAM_PAYLOAD,
  PARTNER_AGENCY_TELEGRAM_PAYLOAD,
  type PlanLeadId,
} from "../lib/planCatalog";
import type { PlanId } from "../lib/pricingData";

/** Базовая ссылка на Telegram-бота для заявок */
export const TG_BOT_BASE_URL = "https://t.me/tivonixtech_leads_bot";

/** Официальный Telegram-контакт для CTA (@TIVONIX). Канал @TIVONIXX — не используем в ссылках сайта. */
export const TG_CHANNEL_URL = "https://t.me/TIVONIX";

/** Deep link по умолчанию (калькулятор / квиз бота) */
export const TG_BOT_URL = buildTelegramBotUrl("calc");

/**
 * Собрать ссылку на бота.
 * Без payload — просто открыть чат с ботом.
 * С payload — deep link ?start=...
 */
export function buildTelegramBotUrl(startPayload?: string): string {
  if (!startPayload) return TG_BOT_BASE_URL;
  return `${TG_BOT_BASE_URL}?start=${encodeURIComponent(startPayload)}`;
}

/** Ссылка на бота с префиллом текста (без start-параметра) */
export function buildTelegramTextUrl(text: string): string {
  return `${TG_BOT_BASE_URL}?text=${encodeURIComponent(text)}`;
}

/** Deep link для плана или help-сценария со страницы /plans */
export function buildPlanTelegramUrl(planId: PlanLeadId): string {
  return buildTelegramBotUrl(getPlanTelegramPayload(planId));
}

/** Deep link для конкретного тарифа (PlanId) */
export function buildPricingPlanTelegramUrl(planId: PlanId): string {
  return buildPlanTelegramUrl(planId);
}

export function buildHelpPlanTelegramUrl(): string {
  return buildTelegramBotUrl(HELP_TELEGRAM_PAYLOAD);
}

/** Deep link для партнёрской / white-label заявки со страницы /partners */
export const PARTNER_AGENCY_TELEGRAM_URL = buildTelegramBotUrl(PARTNER_AGENCY_TELEGRAM_PAYLOAD);

export function buildPartnerAgencyTelegramUrl(): string {
  return PARTNER_AGENCY_TELEGRAM_URL;
}
