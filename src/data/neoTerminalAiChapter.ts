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
  src?: string;
  altRu: string;
  altEn: string;
  captionRu: string;
  captionEn: string;
};

/** Screenshot slots under /projects/terminal-neo/ai/ */
export const NEO_AI_SHOTS: NeoAiShot[] = [
  {
    id: "cover",
    src: "/projects/terminal-neo/ai/ai-global-assistant.png",
    altRu: "Пустой экран AI-консультанта Neo Terminal: чем помочь",
    altEn: "Neo Terminal AI consultant empty state: how can I help",
    captionRu: "AI-консультант работает поверх существующего интерфейса магазина.",
    captionEn: "The AI consultant sits on top of the existing storefront UI.",
  },
  {
    id: "nl-search",
    src: "/projects/terminal-neo/ai/ai-followup.png",
    altRu: "Поиск «Пена Titan» с карточками товаров из каталога",
    altEn: "Search for Titan foam with real catalog product cards",
    captionRu: "Поиск понимает товар и бренд; результаты приходят из реального каталога.",
    captionEn: "Search understands product and brand; results come from the live catalog.",
  },
  {
    id: "followup",
    src: "/projects/terminal-neo/ai/ai-product-expert.png",
    altRu: "Follow-up «характеристики» с контекстом выбранного товара",
    altEn: "Follow-up “characteristics” with selected product context",
    captionRu: "Контекст сохраняется между сообщениями — разговор продолжается, а не новый поиск.",
    captionEn: "Context persists across turns — the shopper continues the conversation.",
  },
  {
    id: "typo",
    altRu: "Разговорный запрос с опечаткой и уточнением типа товара",
    altEn: "Typo / colloquial query with product-type clarification",
    captionRu: "Опечатки и разговорные формулировки не требуют точного названия SKU.",
    captionEn: "Typos and colloquial phrasing do not require the exact SKU name.",
  },
  {
    id: "product-expert",
    altRu: "Product Page Expert: вопрос по характеристике конкретной карточки",
    altEn: "Product Page Expert: attribute question on a specific product card",
    captionRu: "Если характеристики нет в данных товара, консультант не придумывает её.",
    captionEn: "If the attribute is missing from product facts, the consultant does not invent it.",
  },
  {
    id: "price",
    altRu: "Ограничение по бюджету «что есть до 500 ₽»",
    altEn: "Budget constraint “what’s available under 500 ₽”",
    captionRu: "AI понимает ограничения по бюджету и применяет их к текущему контексту.",
    captionEn: "The AI applies budget constraints to the current conversation context.",
  },
];

export function neoAiCopy(lang: Lang) {
  const en = lang !== "ru";
  return {
    eyebrow: en ? "TERMINAL NEO / AI COMMERCE" : "TERMINAL NEO / AI COMMERCE",
    badge: en ? "AI Extension" : "AI Extension",
    heading: en
      ? "An AI consultant that works on top of a real catalog"
      : "AI-консультант, который работает поверх реального каталога",
    lead: en
      ? "For Neo Terminal, TIVONIX built a separate AI Commerce layer: shoppers can describe a product in plain language, mistype a brand, set a budget, or ask about a specific card — the system keeps context, retrieves catalog positions, and answers only from confirmed data."
      : "Для Neo Terminal команда TIVONIX разработала отдельный AI Commerce слой: пользователь может описать товар обычными словами, ошибиться в названии, уточнить бюджет или задать вопрос по конкретной карточке — система понимает контекст, находит позиции в каталоге и отвечает только на основе реальных данных.",
    problemTitle: en
      ? "Ordinary search expects people to know what to type"
      : "Обычный поиск требует знать, что именно вводить",
    problemBody: en
      ? "In a catalog of thousands of SKUs, shoppers rarely write a perfect query. Classic search sees strings. AI Commerce Consultant has to see intent, product, attributes, and conversation context."
      : "В каталоге на тысячи SKU человек редко пишет идеальный поисковый запрос. Классический поиск видит строки. AI Commerce Consultant должен видеть намерение, товар, параметры и контекст разговора.",
    queryChips: en
      ? ["need tape", "Titan foam", "20m extension cord", "what’s under 500 ₽", "is the second cheaper?", "ok for outdoor use?"]
      : ["нужнен скотч", "пена Titan", "удленитель 20 метров", "что есть до 500 ₽", "а второй дешевле?", "подойдёт ли это для улицы?"],
    modesTitle: en ? "Two product modes" : "Два режима продукта",
    globalTitle: en ? "Global Catalog Assistant" : "Global Catalog Assistant",
    globalBody: en
      ? "A floating consultant over the whole store catalog: natural language, typos, brands, attributes, price constraints, multi-product asks, follow-ups, product cards, comparison, and cart actions."
      : "Плавающий консультант по всему каталогу магазина: естественный язык, опечатки, бренды, характеристики, бюджет, несколько товаров в одном запросе, follow-up, карточки, сравнение и действия корзины.",
    globalExampleUser: en ? "Titan foam under 500 ₽" : "Пена Titan до 500 ₽",
    globalExampleAi: en
      ? "Understands product + brand + budget → retrieves real SKUs → shows cards → continues the dialogue."
      : "Понимает товар + бренд + бюджет → ищет реальные позиции → показывает карточки → продолжает диалог.",
    productTitle: en ? "Product Page Expert" : "Product Page Expert",
    productBody: en
      ? "On a product page the consultant receives that SKU’s context and answers only from confirmed facts."
      : "На карточке товара консультант получает контекст конкретной позиции и отвечает только по подтверждённым данным.",
    productExamples: en
      ? ["Can it be used at −30°?", "Is there a warranty?", "Suitable outdoors?", "What volume?"]
      : ["Можно использовать в −30?", "Есть гарантия?", "Подойдёт для улицы?", "Какой объём?"],
    productKey: en
      ? "The AI understands the question. The backend confirms the fact."
      : "AI понимает вопрос. Backend подтверждает факт.",
    flowTitle: en ? "Conversation, not a new search each time" : "Разговор, а не новый поиск каждый раз",
    flowSteps: en
      ? [
          { who: "Shopper", text: "Need tape" },
          { who: "AI", text: "Which kind: packing, masking, or double-sided?" },
          { who: "Shopper", text: "and the second one?" },
          { who: "AI", text: "Returns facts for the second card from catalog data." },
          { who: "Shopper", text: "which is cheaper?" },
          { who: "AI", text: "Compares confirmed prices — no invented numbers." },
          { who: "Shopper", text: "what’s under 500 ₽?" },
          { who: "AI", text: "Refreshes the selection with the budget constraint." },
        ]
      : [
          { who: "Покупатель", text: "Нужен скотч" },
          { who: "AI", text: "Какой нужен: упаковочный, малярный или двухсторонний?" },
          { who: "Покупатель", text: "а второй?" },
          { who: "AI", text: "Отдаёт данные второй карточки из каталога." },
          { who: "Покупатель", text: "какой дешевле?" },
          { who: "AI", text: "Сравнивает подтверждённые цены — без выдуманных цифр." },
          { who: "Покупатель", text: "что есть до 500 ₽?" },
          { who: "AI", text: "Обновляет подборку с ограничением по бюджету." },
        ],
    archTitle: en
      ? "AI on top of the catalog — not instead of it"
      : "AI поверх каталога, а не вместо каталога",
    archSteps: en
      ? [
          "Customer message",
          "Input normalization",
          "Intent + entities + constraints",
          "Conversation context",
          "Hybrid catalog retrieval",
          "Product ranking",
          "Product facts / evidence",
          "Natural response",
          "Product cards / actions",
        ]
      : [
          "Сообщение покупателя",
          "Нормализация ввода",
          "Intent + сущности + ограничения",
          "Контекст разговора",
          "Гибридный поиск по каталогу",
          "Ранжирование товаров",
          "Факты / evidence",
          "Естественный ответ",
          "Карточки / действия",
        ],
    archNote: en
      ? "The LLM handles language understanding. The catalog and backend remain the source of truth for price, stock, and product facts."
      : "LLM отвечает за понимание языка. Каталог и backend остаются источником правды для цены, остатка и характеристик.",
    reliabilityTitle: en
      ? "AI must not invent a product"
      : "AI не должен придумывать товар",
    reliabilityLead: en
      ? "For commerce, good prose is not enough. A wrong price, stock level, or attribute is a business error — so generation is used for language, and commercial facts are confirmed by the system."
      : "Для commerce-сценария хорошего текста недостаточно. Ошибка в цене, наличии или характеристике — это уже бизнес-ошибка. Поэтому генеративная модель используется для понимания запроса, а коммерческие факты подтверждаются системой.",
    principles: en
      ? [
          "Evidence-bound answers",
          "Backend-confirmed price & stock",
          "No cross-merchant data",
          "Structured conversation state",
          "Rules fallback",
          "Tenant isolation",
          "Internal identifiers never exposed",
          "No silent cart writes",
        ]
      : [
          "Ответы только с evidence",
          "Цена и остаток — с backend",
          "Без данных чужих магазинов",
          "Структурированное состояние диалога",
          "Fallback на правила",
          "Изоляция tenant",
          "Внутренние ID не утекают наружу",
          "Без тихой записи в корзину",
        ],
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
        label: en ? "allowed hallucinated product facts" : "допустимых выдуманных фактов о товаре",
      },
      {
        value: String(NEO_AI_METRICS.modes),
        label: en ? "modes: Global + Product Expert" : "режима: Global + Product Expert",
      },
    ],
    shotsTitle: en ? "AI Commerce in the product UI" : "AI Commerce в интерфейсе продукта",
    resultTitle: en ? "What this adds to Neo Terminal" : "Что это добавляет Neo Terminal",
    resultBody: en
      ? "Neo Terminal now covers more than catalog and merchant operations. On top of that stack sits a reusable AI Commerce module: people can search and refine products in natural language while the system binds the dialogue to real catalog data and store actions."
      : "Neo Terminal теперь закрывает не только каталог и операционный контур магазина. Поверх него работает отдельный AI Commerce модуль: человек может искать и уточнять товары обычным языком, а система связывает диалог с реальными данными каталога и действиями магазина.",
    resultPoints: en
      ? [
          "AI Commerce layer on top of the catalog",
          "Global Assistant + Product Page Expert",
          "Natural language, context, and typo understanding",
          "Evidence-bound product answers",
          "Product cards + commerce actions",
          "Embeddable SaaS-ready architecture",
        ]
      : [
          "AI Commerce слой поверх каталога",
          "Global Assistant + Product Page Expert",
          "Естественный язык, контекст и опечатки",
          "Ответы только по подтверждённым фактам",
          "Карточки товаров + commerce actions",
          "Встраиваемая SaaS-архитектура",
        ],
    ctaPilot: en ? "Open AI Pilot →" : "Открыть AI Pilot →",
    ctaPilotNote: en ? "Internal pilot · neo-terminal.ru/ai-pilot" : "Internal pilot · neo-terminal.ru/ai-pilot",
    ctaContact: en ? "Request AI demo access" : "Запросить доступ к AI demo",
    pendingShot: en ? "Screenshot slot — asset pending" : "Слот скриншота — файл ещё не загружен",
  };
}
