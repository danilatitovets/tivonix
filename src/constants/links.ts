/** Базовая ссылка на Telegram-бота для заявок */
export const TG_BOT_BASE_URL = "https://t.me/tivonixtech_leads_bot";

/** Старый канал/чат TIVONIX — для соцсетей в футере и т.п. */
export const TG_CHANNEL_URL = "https://t.me/TIVONIX";

/** Deep link по умолчанию (калькулятор / квиз бота) */
export const TG_BOT_URL = `${TG_BOT_BASE_URL}?start=calc`;

/** Собрать корректный deep link бота через параметр start */
export function buildTelegramBotUrl(startPayload: string): string {
  return `${TG_BOT_BASE_URL}?start=${encodeURIComponent(startPayload)}`;
}
