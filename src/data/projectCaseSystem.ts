/** Визуальные токены кейса — палитра в формате design-system досье */

export type CaseSwatchGroup = "brand" | "neutral";

export type CaseSwatch = {
  name: string;
  hex: string;
  group: CaseSwatchGroup;
  roleRu: string;
  roleEn: string;
};

export type ProjectCaseSystem = {
  palette: CaseSwatch[];
  /** Короткий tagline под названием */
  moodRu: string;
  moodEn: string;
  /** Развёрнутое «атмосферное» описание как у Mercury */
  storyRu: string;
  storyEn: string;
  /** Логотип бренда кейса */
  logo?: string;
  /** cover — заполняет squircle; contain — целиком влезает (вертикальные логотипы) */
  logoFit?: "cover" | "contain";
};


export const PROJECT_CASE_SYSTEM: Record<string, ProjectCaseSystem> = {
  "neo-terminal": {
    moodRu: "AI-операционная система коммерции — от каталога до сделки",
    moodEn: "AI commerce operating system — from catalog to transaction",
    storyRu:
      "Коммерция ломается, когда каталог говорит одно, склад — другое, клиент пишет в мессенджер, а менеджер вручную сшивает всё это вместе.\n\n" +
      "Neo Terminal собран вокруг другой модели: товарные данные, остатки, клиенты, диалоги, заказы и операции живут на **одном коммерческом слое**.\n\n" +
      "Это не ещё одна витрина и не чат-бот, прикрученный к каталогу. Neo Terminal объединяет Merchant OS, клиентский Smart City, продажи с поддержкой AI, склад, B2B-закупки, омниканальные диалоги, checkout, доставку, аналитику и операционную автоматизацию в одном продукте.\n\n" +
      "Система принимает коммерческие данные из YML, XLSX, CSV, CommerceML и коннекторов, нормализует их в одну товарную модель и отдаёт те же данные в поиск, AI-сценарии, склад и инструменты мерчанта.\n\n" +
      "Платформа собрана так, чтобы закрывать полный путь: **каталог → discovery → диалог → решение → корзина → транзакция → фулфилмент → аналитика**.",
    storyEn:
      "Commerce breaks when the catalog says one thing, the warehouse says another, a customer asks a question in a messenger, and the manager has to connect everything manually.\n\n" +
      "Neo Terminal was designed around a different model: product data, stock, customers, conversations, orders and operations live on **one commerce layer**.\n\n" +
      "It is not another storefront and not a chatbot attached to a catalog. Neo Terminal combines a Merchant OS, customer-facing Smart City, AI-assisted sales, inventory workflows, B2B procurement, omnichannel conversations, checkout, delivery, analytics and operational automation in one product.\n\n" +
      "The system can ingest commerce data from YML, XLSX, CSV, CommerceML and connector-based sources, normalize it into one product model and make the same data available to customer search, AI workflows, warehouse operations and merchant tools.\n\n" +
      "The result is a platform designed to connect the full path: **catalog → discovery → conversation → decision → cart → transaction → fulfillment → analytics**.",
    logo: "/images/project-logos/neo-terminal.webp",
    logoFit: "contain",
    palette: [
      {
        name: "Terminal Orange",
        hex: "#ff5a00",
        group: "brand",
        roleRu:
          "Основной акцент Neo Terminal: активные состояния, выбранная навигация, интеллектуальные действия и ключевые сигналы продукта.",
        roleEn:
          "Primary Neo Terminal accent for active states, selected navigation, intelligent actions and key product signals.",
      },
      {
        name: "Terminal Paper",
        hex: "#ffffff",
        group: "neutral",
        roleRu: "Основная поверхность интерфейса и холст контента.",
        roleEn: "Primary interface surface and content canvas.",
      },
      {
        name: "Cloud",
        hex: "#f5f5f5",
        group: "neutral",
        roleRu: "Фон приложения и вторичные области страниц.",
        roleEn: "Application background and secondary page areas.",
      },
      {
        name: "Soft Surface",
        hex: "#fafafa",
        group: "neutral",
        roleRu: "Тихие панели, группы контролов и мягкое отделение контента.",
        roleEn: "Quiet panels, grouped controls and subtle content separation.",
      },
      {
        name: "Terminal Ink",
        hex: "#0a0a0a",
        group: "neutral",
        roleRu: "Основная типографика, навигация и главные действия.",
        roleEn: "Primary typography, navigation and main actions.",
      },
      {
        name: "Muted Graphite",
        hex: "#737373",
        group: "neutral",
        roleRu: "Вторичные подписи, метаданные и вспомогательная информация.",
        roleEn: "Secondary labels, metadata and supporting information.",
      },
      {
        name: "Hairline",
        hex: "#e5e5e5",
        group: "neutral",
        roleRu: "Тонкие разделители и границы интерфейса.",
        roleEn: "Subtle separators and interface boundaries.",
      },
      {
        name: "Signal Soft",
        hex: "#fff1e8",
        group: "neutral",
        roleRu: "Мягкий оранжевый контекст для выбранных и интеллектуальных состояний.",
        roleEn: "Soft orange context for selected and intelligent states.",
      },
      {
        name: "Danger",
        hex: "#e7000b",
        group: "neutral",
        roleRu: "Деструктивные действия и критические ошибки.",
        roleEn: "Destructive actions and critical error states.",
      },
    ],
  },
  tivonixpanel: {
    moodRu: "Партнёрский кабинет без хаоса в чатах",
    moodEn: "Partner cabinet without chat chaos",
    storyRu:
      "Партнёрство сыпется не на оффере — на слепых зонах: где заявка, какой этап, когда выплата. Пока правда в Telegram и Excel — каждый день начинается с «напомни». Мы собрали кабинет, в который заходят сами: статусы, проекты и выплаты на тёмном canvas с одним оранжевым акцентом.",
    storyEn:
      "Partnerships don’t die on the offer — they die on blind spots: where’s the request, what stage, when’s the payout. While truth lives in chats and spreadsheets, every day starts with “remind me”. We built a cabinet people actually open: statuses, projects and payouts on a dark canvas with one orange accent.",
    logo: "/images/project-logos/tivonixpanel.png",
    palette: [
      {
        name: "Signal Orange",
        hex: "#FF6B2C",
        group: "brand",
        roleRu:
          "Единственный акцент: кнопки, статусы «в работе», ключевые CTA и точки внимания в кабинете.",
        roleEn:
          "The only accent: filled buttons, in-progress statuses, primary CTAs and focus moments in the cabinet.",
      },
      {
        name: "Void Canvas",
        hex: "#0a0a0b",
        group: "neutral",
        roleRu: "Основной фон страницы, hero-оверлей и «чёрное поле» вокруг панелей.",
        roleEn: "Dominant page background, hero overlay and the black field around panels.",
      },
      {
        name: "Graphite Card",
        hex: "#1c1c1f",
        group: "neutral",
        roleRu: "Поверхности карточек и секций — на шаг светлее canvas, без жёстких границ.",
        roleEn: "Card and section surfaces — one step lighter than the canvas, no hard borders.",
      },
      {
        name: "Obsidian Control",
        hex: "#27272b",
        group: "neutral",
        roleRu: "Вторичные кнопки, инпуты и тихие интерактивные зоны.",
        roleEn: "Secondary buttons, inputs and quiet interactive surfaces.",
      },
      {
        name: "Ash Text",
        hex: "#8a8a8e",
        group: "neutral",
        roleRu: "Вторичный текст, подписи к полям, вспомогательные лейблы.",
        roleEn: "Muted body copy, field labels and helper text.",
      },
      {
        name: "Ivory Text",
        hex: "#f2f2f2",
        group: "neutral",
        roleRu: "Заголовки, основной текст и иконки на тёмном фоне.",
        roleEn: "Headlines, primary text and icons on dark surfaces.",
      },
      {
        name: "Pure White",
        hex: "#ffffff",
        group: "neutral",
        roleRu: "Текст и иконки на оранжевых primary-кнопках — максимальный контраст.",
        roleEn: "Text and icon fills on orange primary buttons for maximum contrast.",
      },
    ],
  },
  spliton: {
    moodRu: "Биржа долей в музыке — полный финтех-контур",
    moodEn: "Music-share exchange — full fintech loop",
    storyRu:
      "Музыкальные активы — не кнопка «купить». Деньги, согласия, пополнения и статусы должны сходиться **без дыр**: подтверждение → обработка → результат. Один сбой на выплате — и доверие кончается быстрее любого релиза.\n\n" +
      "Spliton — живая **биржа долей**: каталог релизов, покупка на первичном рынке, сложный вторичный рынок со стаканом и лимитными заявками, кошелёк USDT, внутренний учёт операций, KYC, центр доверия и портал оператора. Не слайд «как будет» — продукт, где интерфейс, финансы и комплаенс в одной системе.\n\n" +
      "Интерфейс полностью на **четырёх языках**: русский, английский, испанский, португальский. В платформу зашёл инвестор на [[200 000 $]]. Мы собрали продукт целиком — включая **огромную админку** под выплаты, казначейство и аналитику с графиками — и **до сих пор сопровождаем**. Acid lime `#b7f500` на чёрном фоне — как на живом spliton.io.",
    storyEn:
      "Music assets aren’t a buy button. Money, consents, deposits and statuses have to lock **without holes**: confirm → processing → result. One payout failure — and trust dies faster than any release.\n\n" +
      "Spliton is a live **share exchange**: release catalog, primary-market purchase, a complex secondary market with an order book and limit orders, USDT wallet, internal operations ledger, KYC, trust center and operator portal. Not a “how it will look” slide — a product where interface, finance and compliance live in one system.\n\n" +
      "The interface is fully localized in **four languages**: Russian, English, Spanish, Portuguese. The platform is backed by an investor at [[$200,000]]. We shipped the full product — including a **huge admin** for payouts, treasury and analytics with charts — and **still support it**. Acid lime `#b7f500` on black — matching live spliton.io.",
    logo: "/images/project-logos/spliton.webp",
    palette: [
      {
        name: "Acid Lime",
        hex: "#b7f500",
        group: "brand",
        roleRu:
          "Primary Spliton: кнопки покупки, активные статусы, графики и ключевые CTA на тёмном UI.",
        roleEn:
          "Spliton primary: buy buttons, active statuses, sparklines and key CTAs on dark UI.",
      },
      {
        name: "Void Black",
        hex: "#000000",
        group: "neutral",
        roleRu: "Основной canvas страниц доверия, кабинета и маркетинга.",
        roleEn: "Main canvas for trust pages, cabinet and marketing.",
      },
      {
        name: "Ink Surface",
        hex: "#141414",
        group: "neutral",
        roleRu: "Карточки кабинета, ledger-блоки и приподнятые панели.",
        roleEn: "Cabinet cards, ledger blocks and elevated panels.",
      },
      {
        name: "Control Gray",
        hex: "#161616",
        group: "neutral",
        roleRu: "Вторичные поверхности, инпуты и тихие акцентные зоны.",
        roleEn: "Secondary surfaces, inputs and quiet accent areas.",
      },
      {
        name: "Muted Text",
        hex: "#7a7a7a",
        group: "neutral",
        roleRu: "Вторичные подписи, метаданные операций и helper-текст.",
        roleEn: "Secondary labels, operation metadata and helper text.",
      },
      {
        name: "Ivory Signal",
        hex: "#e4e4e4",
        group: "neutral",
        roleRu: "Основной текст, суммы USDT и навигация.",
        roleEn: "Primary text, USDT amounts and navigation.",
      },
      {
        name: "Ink on Lime",
        hex: "#060606",
        group: "neutral",
        roleRu: "Текст и иконки на Acid Lime кнопках — максимальный контраст.",
        roleEn: "Text and icons on Acid Lime buttons — maximum contrast.",
      },
    ],
  },
  slotty: {
    moodRu: "Полный маркетплейс записи — фильтры, карта, SaaS мастера",
    moodEn: "Full booking marketplace — filters, map, master SaaS",
    storyRu:
      "Не «кнопка записаться». **Маркетплейс**: каталог с жёсткими фильтрами и картой, Telegram Mini App, кабинет мастера Free/Pro, platform-admin, bePaid.\n\n" +
      "Заказчик — **Виктория Д.** Срок — **3 недели**. React + Express + PostgreSQL, прод на **Railway**, домен **slotty.of.by** — подсказали, где купить, подняли хостинг, выкатили.\n\n" +
      "Скоро запуск к **настоящим клиентам и мастерам**. Зайти и проверить можно самому: слот видно сразу, без Direct.",
    storyEn:
      "Not a “book now” button. A **marketplace**: filtered catalog + map, Telegram Mini App, master Free/Pro cabinet, platform admin, bePaid.\n\n" +
      "Client — **Victoria D.** Timeline — **3 weeks**. React + Express + PostgreSQL, production on **Railway**, domain **slotty.of.by** — we advised where to buy, set up hosting, shipped live.\n\n" +
      "Soon launching to **real clients and masters**. You can open it yourself: the slot is visible right away — no DMs.",
    logo: "/images/project-logos/slotty.png",
    palette: [
      {
        name: "Rose Brand",
        hex: "#F47C8C",
        group: "brand",
        roleRu:
          "Основной бренд Slotty: кнопки, бордеры и акценты в каталоге и записи.",
        roleEn:
          "Core Slotty brand: buttons, borders and accents across catalog and booking.",
      },
      {
        name: "Hot Pink",
        hex: "#FF5F7A",
        group: "brand",
        roleRu: "Яркий CTA и hover: «записаться», подтверждение слота, живые акценты.",
        roleEn: "Bright CTA and hover: book, confirm a slot, live accent moments.",
      },
      {
        name: "Blush Canvas",
        hex: "#FFF1F4",
        group: "neutral",
        roleRu: "Мягкий розовый фон секций лендинга и подложек карточек.",
        roleEn: "Soft pink wash for landing sections and card underlays.",
      },
      {
        name: "Dusty Rose",
        hex: "#E29595",
        group: "neutral",
        roleRu: "Приглушённые бордеры и вторичные розовые обводки UI.",
        roleEn: "Muted borders and secondary rose outlines in the UI.",
      },
      {
        name: "Ink",
        hex: "#111827",
        group: "neutral",
        roleRu: "Тёмный текст и чёрные CTA на светлом интерфейсе.",
        roleEn: "Dark copy and black CTAs on the light interface.",
      },
      {
        name: "Mist",
        hex: "#EBEBEB",
        group: "neutral",
        roleRu: "Нейтральные поверхности, разделители и спокойные фоны.",
        roleEn: "Neutral surfaces, dividers and quiet backgrounds.",
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        group: "neutral",
        roleRu: "Основной холст продукта и текст на розовых кнопках.",
        roleEn: "Primary product canvas and text on pink buttons.",
      },
    ],
  },
  headmind: {
    moodRu: "Корпоративный сайт — Figma → WordPress под ключ",
    moodEn: "Corporate site — Figma → WordPress turnkey",
    storyRu:
      "Заказчик — **Евгений Беликов**, основатель и гендиректор ООО «Хэдмайнд».\n\n" +
      "Сначала макеты в **Figma** (несколько вариантов на выбор), потом сборка на **WordPress + Elementor**, хостинг и домен **headmind.ru**. Сайт, который спокойно шлют в первом B2B-сообщении.",
    storyEn:
      "Client — **Evgeniy Belikov**, founder and CEO of Headmind.\n\n" +
      "First **Figma** mockups (several options), then **WordPress + Elementor**, hosting and domain **headmind.ru**. A site you can send in the first B2B message.",
    logo: "/images/project-logos/headmind.png",
    palette: [
      {
        name: "Ocean Accent",
        hex: "#0A7EA8",
        group: "brand",
        roleRu: "Брендовый акцент сайта: CTA, ссылки и фокус в маршруте к заявке.",
        roleEn: "Site brand accent: CTAs, links and focus along the lead path.",
      },
      {
        name: "Deep Ocean",
        hex: "#075F7F",
        group: "brand",
        roleRu: "Hover и усиление акцента на кнопках и активных состояниях.",
        roleEn: "Hover and stronger accent on buttons and active states.",
      },
      {
        name: "Slate Canvas",
        hex: "#0F172A",
        group: "neutral",
        roleRu: "Тёмный холст секций и спокойный корпоративный фон.",
        roleEn: "Dark section canvas and calm corporate background.",
      },
      {
        name: "Ink",
        hex: "#111827",
        group: "neutral",
        roleRu: "Основной текст и заголовки на светлых блоках.",
        roleEn: "Primary text and headlines on light blocks.",
      },
      {
        name: "Warm Graphite",
        hex: "#2E2828",
        group: "neutral",
        roleRu: "Тёмные поверхности карточек и вторичных панелей.",
        roleEn: "Dark card surfaces and secondary panels.",
      },
      {
        name: "Steel Text",
        hex: "#6B7280",
        group: "neutral",
        roleRu: "Вторичный текст: роли команды и подписи к услугам.",
        roleEn: "Secondary copy: team roles and service captions.",
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        group: "neutral",
        roleRu: "Светлые секции и текст на акцентных кнопках.",
        roleEn: "Light sections and text on accent buttons.",
      },
    ],
  },
  logovo: {
    moodRu: "Сеть шиномонтажа LOGOVO — сайт под ключ",
    moodEn: "LOGOVO tire network — turnkey site",
    storyRu:
      "Заказчик — **ООО «Логово»**, Минск: **4 филиала**, два **24/7**.\n\n" +
      "Собрала **команда TIVONIX**: Figma → Next.js → домен и hoster.by. Светлый Awesomic-canvas, ember `#ff5a00` на CTA — запись с дороги за минуту.",
    storyEn:
      "Client — **LOGOVO LLC**, Minsk: **4 branches**, two **24/7**.\n\n" +
      "Built by the **TIVONIX team**: Figma → Next.js → domain and hoster.by. Light Awesomic canvas, ember `#ff5a00` on CTAs — book from the road in a minute.",
    logo: "/images/project-logos/logovo.png",
    logoFit: "contain",
    palette: [
      {
        name: "Ember",
        hex: "#FF5A00",
        group: "brand",
        roleRu: "Главный акцент продакшена: «Записаться», бейджи 24/7 и CTA с дороги.",
        roleEn: "Production primary: Book, 24/7 badges and on-the-road CTAs.",
      },
      {
        name: "Ember Hover",
        hex: "#E65200",
        group: "brand",
        roleRu: "Hover оранжевых кнопок — чуть темнее ember.",
        roleEn: "Orange button hover — a shade darker than ember.",
      },
      {
        name: "Paper Canvas",
        hex: "#F4F4F5",
        group: "neutral",
        roleRu: "Светлый фон страниц Awesomic — основной холст сайта.",
        roleEn: "Light Awesomic page background — the site’s main canvas.",
      },
      {
        name: "Obsidian",
        hex: "#09090B",
        group: "neutral",
        roleRu: "Тёмные CTA-блоки, футер и контрастные секции.",
        roleEn: "Dark CTA blocks, footer and contrast sections.",
      },
      {
        name: "Graphite",
        hex: "#18181B",
        group: "neutral",
        roleRu: "Основной текст body на светлом canvas.",
        roleEn: "Primary body text on the light canvas.",
      },
      {
        name: "Cloud",
        hex: "#ECECEE",
        group: "neutral",
        roleRu: "Карточки услуг, вторичные кнопки и мягкие панели.",
        roleEn: "Service cards, secondary buttons and soft panels.",
      },
      {
        name: "Snow",
        hex: "#FFFFFF",
        group: "neutral",
        roleRu: "Белые поверхности и текст на ember-кнопках.",
        roleEn: "White surfaces and text on ember buttons.",
      },
    ],
  },
  labelos: {
    moodRu: "Премиум-лендинг лейбла",
    moodEn: "Premium label landing",
    storyRu:
      "Короткий промо-лендинг под конверсию: типографика, ритм и ясный оффер без воды. Тёмный canvas и один violet-акцент на CTA.",
    storyEn:
      "A short conversion landing: type, rhythm and a clear offer without fluff. Dark canvas and one violet accent on CTAs.",
    palette: [
      {
        name: "Violet Accent",
        hex: "#8b5cf6",
        group: "brand",
        roleRu: "Акцент конверсии: primary CTA и выделенные product-моменты.",
        roleEn: "Conversion accent: primary CTAs and highlighted product moments.",
      },
      {
        name: "Ink Canvas",
        hex: "#0a0a0b",
        group: "neutral",
        roleRu: "Фон промо-лендинга и тёмные секции.",
        roleEn: "Promo landing background and dark sections.",
      },
      {
        name: "Panel",
        hex: "#161618",
        group: "neutral",
        roleRu: "Карточки возможностей и сценариев.",
        roleEn: "Feature and flow cards.",
      },
      {
        name: "Muted Text",
        hex: "#a1a1aa",
        group: "neutral",
        roleRu: "Вторичный текст и пояснения к офферу.",
        roleEn: "Secondary copy and offer explanations.",
      },
      {
        name: "Ivory Text",
        hex: "#f2f2f2",
        group: "neutral",
        roleRu: "Display-заголовки и основной UI-текст.",
        roleEn: "Display headlines and primary UI text.",
      },
    ],
  },
  upc: {
    moodRu: "SaaS MVP: трек → ссылка → просмотры",
    moodEn: "SaaS MVP: track → link → views",
    storyRu:
      "Продуктовый интерфейс под монетизацию коротких видео: подключаешь трек, делишься ссылкой, следишь за охватом. Тёмная оболочка метрик и яркий Pulse-акцент на действие.",
    storyEn:
      "Product UI for short-video monetization: attach a track, share a link, track reach. Dark metrics shell and a vivid Pulse accent on action.",
    palette: [
      {
        name: "TikTok Pulse",
        hex: "#fe2c55",
        group: "brand",
        roleRu: "Энергия продукта: primary CTA и акцент на цикле монетизации.",
        roleEn: "Product energy: primary CTAs and accent on the monetization loop.",
      },
      {
        name: "Void Canvas",
        hex: "#09090b",
        group: "neutral",
        roleRu: "Фон SaaS-интерфейса и тёмная оболочка метрик.",
        roleEn: "SaaS interface background and dark metrics shell.",
      },
      {
        name: "Card",
        hex: "#18181b",
        group: "neutral",
        roleRu: "Карточки треков, ссылок и метрик.",
        roleEn: "Track, link and metrics cards.",
      },
      {
        name: "Cyan Cue",
        hex: "#25f4ee",
        group: "neutral",
        roleRu: "Вторичный акцент рядом с Pulse — лёгкие highlights.",
        roleEn: "Secondary accent beside Pulse — light highlights.",
      },
      {
        name: "Ivory Text",
        hex: "#fafafa",
        group: "neutral",
        roleRu: "Заголовки и основной текст продукта.",
        roleEn: "Titles and primary product text.",
      },
    ],
  },
  payclip: {
    moodRu: "Платежи: лендинг + онбординг",
    moodEn: "Payments: landing + onboarding",
    storyRu:
      "Посадочная и онбординг, которые быстрее доводят до действия. Clip Blue на primary, спокойные нейтрали вокруг форм и статусов оплаты.",
    storyEn:
      "Landing and onboarding that move users to action faster. Clip Blue on primary, calm neutrals around forms and payment statuses.",
    palette: [
      {
        name: "Clip Blue",
        hex: "#3b82f6",
        group: "brand",
        roleRu: "Primary для онбординга и платежных действий.",
        roleEn: "Primary for onboarding and payment actions.",
      },
      {
        name: "Night Canvas",
        hex: "#0a0a0c",
        group: "neutral",
        roleRu: "Фон посадочной и онбординг-экранов.",
        roleEn: "Landing and onboarding screen background.",
      },
      {
        name: "Graphite Form",
        hex: "#1c1c22",
        group: "neutral",
        roleRu: "Фоны форм и вторичные поверхности.",
        roleEn: "Form backgrounds and secondary surfaces.",
      },
      {
        name: "Success Mint",
        hex: "#34d399",
        group: "neutral",
        roleRu: "Успешная оплата и позитивные статусы.",
        roleEn: "Successful payment and positive statuses.",
      },
      {
        name: "Ivory Text",
        hex: "#f0f0f2",
        group: "neutral",
        roleRu: "Основной текст и лейблы в онбординге.",
        roleEn: "Primary text and labels in onboarding.",
      },
    ],
  },
};

export function getProjectCaseSystem(id: string): ProjectCaseSystem | undefined {
  return PROJECT_CASE_SYSTEM[id];
}
