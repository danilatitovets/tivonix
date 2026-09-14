import type { Lang } from "../i18n/LangProvider";

/** Confirmed from neo-terminal-universal-ai reports (2026-09-14). */
export const NEO_AI_METRICS = {
  catalogSkus: 1629,
  benchmarkScenarios: 102,
  hallucinatedFacts: 0,
  modes: 2,
} as const;

export const NEO_AI_PILOT_URL = "https://neo-terminal.ru/ai-pilot/";

export type NeoAiShot = {
  id: string;
  src: string;
  altRu: string;
  altEn: string;
  captionRu: string;
  captionEn: string;
};

/** Real screenshots only — no empty placeholder tiles. */
export const NEO_AI_SHOTS: NeoAiShot[] = [
  {
    id: "cover",
    src: "/projects/terminal-neo/ai/ai-global-assistant.png",
    altRu: "AI-консультант Neo Terminal: экран «Чем помочь?»",
    altEn: "Neo Terminal AI consultant: “How can I help?” screen",
    captionRu: "AI-консультант работает поверх интерфейса магазина.",
    captionEn: "The AI consultant sits on top of the storefront UI.",
  },
  {
    id: "nl-search",
    src: "/projects/terminal-neo/ai/ai-followup.png",
    altRu: "Запрос «Пена Titan» и карточки из реального каталога",
    altEn: "“Titan foam” query with real catalog product cards",
    captionRu: "Поиск понимает товар и бренд; ответы — из каталога.",
    captionEn: "Search understands product and brand; answers come from the catalog.",
  },
  {
    id: "followup",
    src: "/projects/terminal-neo/ai/ai-product-expert.png",
    altRu: "Follow-up «характеристики» с контекстом товара",
    altEn: "Follow-up “characteristics” with product context",
    captionRu: "Контекст сохраняется — разговор продолжается.",
    captionEn: "Context persists — the conversation continues.",
  },
];

export function neoAiCopy(lang: Lang) {
  const en = lang !== "ru";
  return {
    eyebrow: "TERMINAL NEO / AI COMMERCE",
    heading: en
      ? "An AI consultant that works on top of a real catalog"
      : "AI-консультант, который работает поверх реального каталога",
    lead: en
      ? "For Neo Terminal, TIVONIX built a separate AI Commerce layer: shoppers describe a product in plain language, mistype a brand, set a budget, or ask about a card — the system keeps context and answers only from confirmed catalog data."
      : "Для Neo Terminal команда TIVONIX разработала отдельный AI Commerce слой: пользователь описывает товар обычными словами, ошибается в названии, уточняет бюджет или спрашивает по карточке — система держит контекст и отвечает только по реальным данным каталога.",
    queryChips: en
      ? ["need tape", "Titan foam", "20m extension cord", "under 500 ₽", "is the second cheaper?", "ok outdoors?"]
      : ["нужнен скотч", "пена Titan", "удленитель 20 метров", "что есть до 500 ₽", "а второй дешевле?", "подойдёт ли это для улицы?"],
    shotsTitle: en ? "In the product" : "В продукте",
    metrics: [
      {
        value: String(NEO_AI_METRICS.catalogSkus),
        label: en ? "SKUs in staging catalog" : "товаров в staging-каталоге",
      },
      {
        value: String(NEO_AI_METRICS.benchmarkScenarios),
        label: en ? "benchmark scenarios" : "benchmark-сценариев",
      },
      {
        value: String(NEO_AI_METRICS.hallucinatedFacts),
        label: en ? "hallucinated product facts allowed" : "выдуманных фактов о товаре",
      },
      {
        value: String(NEO_AI_METRICS.modes),
        label: en ? "modes: Global + Product Expert" : "режима: Global + Product Expert",
      },
    ],
    chatPlaceholder: en ? "Ask the AI consultant…" : "Спросить у ИИ…",
    chatAction: en ? "Open" : "Открыть",
    ctaPilot: en ? "Open AI Pilot →" : "Открыть AI Pilot →",
    ctaContact: en ? "Request AI demo access" : "Запросить доступ к AI demo",
  };
}
