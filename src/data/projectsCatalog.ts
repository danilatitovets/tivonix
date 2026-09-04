import type { Lang } from "../i18n/LangProvider";
import { partnerPanelLoginUrl } from "../lib/partnerPanel";
export type ProjectStatus = "live" | "wip" | "pilot";

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  /** Оригинал отзыва (напр. арабский) — показывается выше перевода */
  textAr?: string;
  /** Черновик до согласования формулировки — не показываем в домашней ленте отзывов */
  draft?: boolean;
};

export type Project = {
  id: string;
  title: string;
  subtitleRu: string;
  subtitleEn: string;
  subtitleZh?: string;
  detailsRu: string;
  detailsEn: string;
  detailsZh?: string;
  domain?: string;
  tags: string[];
  /** Короткая категория на карточке /projects; иначе берётся tags[0] */
  category?: string;
  cover?: string;
  /** Горизонтальная лента скриншотов на странице кейса */
  gallery?: string[];
  status?: ProjectStatus;
  outcomes?: string[];
  stack?: string[];
  testimonial?: Testimonial;
  roleRu?: string;
  roleEn?: string;
  seoTitleRu?: string;
  seoTitleEn?: string;
  seoDescriptionRu?: string;
  seoDescriptionEn?: string;
};

const UPC_DOMAIN = "https://upc.watch/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const LOGOVO_DOMAIN = "https://www.logovo24.by/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const SLOTTY_DOMAIN = "https://slotty.of.by/book";
const SPLITON_DOMAIN = "https://www.spliton.io/";
const NEO_TERMINAL_DOMAIN = "https://neo-terminal.ru/";
const TIVONIXPANEL_DOMAIN = partnerPanelLoginUrl();

/** Публичные кейсы на /projects (остальные скрыты, но остаются в каталоге) */
export const PUBLIC_PROJECT_IDS = [
  "neo-terminal",
  "spliton",
  "slotty",
  "headmind",
  "logovo",
] as const;

const SLOTTY_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/slotty/${i + 1}.webp`);
const SPLITON_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/spliton/g${i + 1}.webp`);
const NEO_TERMINAL_GALLERY = Array.from(
  { length: 9 },
  (_, i) => `/images/project-priew/neo-terminal/${i + 1}.webp`
);
const TIVONIXPANEL_GALLERY = [
  "/images/project-priew/tivonixpanel/1.webp",
  "/images/project-priew/tivonixpanel/2.webp",
  "/images/project-priew/tivonixpanel/3.webp",
  "/images/project-priew/tivonixpanel/4.webp",
  "/images/project-priew/tivonixpanel/5.webp",
  "/images/project-priew/tivonixpanel/6.webp",
  "/images/project-priew/tivonixpanel/7.webp",
  "/images/project-priew/tivonixpanel/8.webp",
];

function buildAllProjects(isRu: boolean): Project[] {
  return [
      // 0) TIVONIX PANEL — партнёрская панель
      {
        id: "tivonixpanel",
        title: "Tivonix Panel",
        subtitleRu:
          "Партнёрская панель TIVONIX: сделки, статусы, проекты и выплаты — один кабинет вместо хаоса в чатах и таблицах.",
        subtitleEn:
          "TIVONIX partner panel: deals, statuses, projects and payouts — one dashboard instead of chaos in chats and spreadsheets.",
        subtitleZh:
          "TIVONIX 合作伙伴面板：交易、状态、项目和付款 - 一个仪表板，而不是聊天和电子表格中的混乱。",
        detailsRu:
          "Формат: партнёрская панель / SaaS-кабинет\n\n" +
          "Зачем это\n" +
          "Партнёрство редко разваливается из‑за оффера. Оно сыпется, когда **никто не видит картину**: где заявка, на каком этапе сделка, когда выплата. Пока правда живёт в Telegram и Excel — каждый день начинается с «напомни» и скринов в полночь.\n\n" +
          "Мы собрали **кабинет, в который заходят сами**: регистрация, вход, статусы, проекты и выплаты в одном месте. Не слайд «как будет», а инструмент, который уже ведёт деньги и доверие.\n\n" +
          "Как работает\n" +
          "Партнёр регистрируется, выбирает модель — **Referral** или **White-label** — и после модерации получает доступ в кабинет.\n" +
          "Дальше цикл простой: передал задачу → видит статус → понимает следующий шаг → отслеживает выплату. Одна панель вместо чатов, таблиц и «напомни, пожалуйста».\n\n" +
          "Что внутри\n" +
          "Это полноценный **кабинет партнёрской сети**, не лендинг. Слева тёмный сайдбар: главная, клиенты, партнёры, сделки, выплаты, отчёты, настройки, юр. профили, заявки партнёров и журнал действий.\n\n" +
          "На **главной** — живые KPI: клиенты, партнёры, закрытые сделки, сумма продаж, начисленные комиссии и «к выплате», плюс графики по дням и месяцам, воронка по статусам, топ партнёров, источников и услуг. Данные обновляются в реальном времени.\n\n" +
          "В **клиентах** — база компаний и контактов, которых партнёры передают в работу: поиск, вкладки статусов (на проверке / одобрено / в работе / закрыт / дубли), фильтры по партнёру, услуге, источнику, бюджету и дате, добавление клиента и выгрузка в Excel.\n\n" +
          "В **партнёрах** — сеть целиком: активность, клиенты, сделки, продажи, комиссия и баланс. Отдельно — заявки на вход (Referral / White-label) и модерация. **Выплаты** и комиссии живут в панели, без сторонних таблиц. UI собран под ежедневную работу, а не под презентацию.\n\n" +
          "Что сделали\n" +
          "Разработка TIVONIX — **1 неделя**. Спроектировали структуру под реальный партнёрский процесс, собрали регистрацию, логин и сделки, довели UI (сетка, статусы, **пустые состояния**) и выкатили в продакшен на Railway.\n\n" +
          "Итог\n" +
          "Живая панель, куда партнёры **заходят сами** — ведут сделки и видят выплаты. Не презентация «как будет», а продукт, который уже в работе.\n",
        detailsEn:
          "Format: partner panel / SaaS dashboard\n\n" +
          "Why it matters\n" +
          "Partnerships rarely die on the offer. They die when **nobody shares the same picture**: where’s the request, what stage is the deal, when’s the payout. While truth lives in chats and spreadsheets, every day starts with “remind me” and midnight screenshots.\n\n" +
          "We built a **cabinet people actually open**: registration, login, statuses, projects and payouts in one place. Not a “how it will look” slide — a tool that already moves money and trust.\n\n" +
          "How it works\n" +
          "A partner signs up, picks **Referral** or **White-label**, and gets access after moderation.\n" +
          "Then the loop is simple: submit a task → see the status → know the next step → track the payout. One cabinet instead of chats, spreadsheets and “please remind me”.\n\n" +
          "What’s inside\n" +
          "A full **partner-network cabinet**, not a landing page. Dark sidebar on the left: home, clients, partners, deals, payouts, reports, settings, legal profiles, partner applications and an activity log.\n\n" +
          "**Home** shows live KPIs: clients, partners, closed deals, sales total, accrued commissions and “to be paid”, plus charts by day and month, a status funnel, top partners, sources and services. Data updates in real time.\n\n" +
          "**Clients** is the database of companies and contacts partners hand over: search, status tabs (under review / approved / in work / closed / duplicates), filters by partner, service, source, budget and date, add-client and Excel export.\n\n" +
          "**Partners** is the whole network: activity, clients, deals, sales, commission and balance. Separately — join requests (Referral / White-label) and moderation. **Payouts** and commissions live in the panel, no side spreadsheets. UI built for daily work, not for a deck.\n\n" +
          "What we delivered\n" +
          "TIVONIX build — **1 week**. Designed the partner workflow, shipped registration, login and deals, polished UI (grid, statuses, **empty states**) and went live on Railway.\n\n" +
          "Outcome\n" +
          "A live panel partners **actually open** — they run deals and see payouts. Not a “how it will look” demo, but a product already in use.\n",
        detailsZh:
          "格式：合作伙伴面板/SaaS 仪表板\n\n为什么这很重要\n合作伙伴关系很少会因为这个提议而消亡。当**没有人分享相同的图片**时，他们就会消亡：请求在哪里，交易处于什么阶段，何时付款。虽然真相存在于聊天和电子表格中，但每天都是从“提醒我”和午夜屏幕截图开始的。\n\n我们建立了一个**人们实际打开的内阁**：注册、登录、状态、项目和付款都集中在一个地方。不是一张“看起来如何”的幻灯片——一种已经转移资金和信任的工具。\n\n它是如何运作的\n合作伙伴注册，选择**推荐**或**白标**，并在审核后获得访问权限。\n然后循环很简单：提交任务→查看状态→知道下一步→跟踪支付。一个内阁，而不是聊天、电子表格和“请提醒我”。\n\n里面有什么\n完整的**合作伙伴网络柜**，而不是登陆页面。左侧深色侧边栏：主页、客户、合作伙伴、交易、支出、报告、设置、法律概况、合作伙伴申请和活动日志。\n\n**主页**显示实时 KPI：客户、合作伙伴、已完成的交易、销售总额、应计佣金和“待支付”，以及按日和月列出的图表、状态漏斗、顶级合作伙伴、来源和服务。数据实时更新时间。\n\n**客户**是公司和联系人合作伙伴移交的数据库：搜索、状态选项卡（正在审查/已批准/正在工作/已关闭/重复）、按合作伙伴、服务、来源、预算和日期进行过滤、添加客户和 Excel 导出。\n\n**合作伙伴**是整个网络：活动、客户、交易、销售、佣金和余额。分别 — 加入请求（推荐/白标签）和审核。 **付款**和佣金位于面板中，没有辅助电子表格。 UI 是为日常工作而不是为甲板而构建的。\n\n我们交付了什么\nTIVONIX 构建 — **1 周**。设计合作伙伴工作流程，交付注册、登录和交易，完善 UI（网格、状态、**空状态**）并在 Railway 上上线。\n\n结果\n现场小组合作伙伴**实际上是开放的** - 他们进行交易并查看付款。不是“它看起来如何”演示，而是已经在使用的产品。",
        domain: TIVONIXPANEL_DOMAIN,
        status: "live",
        tags: ["SaaS", "Admin Panel", "Partners", "Dashboard", "UI/UX"],
        cover: `/images/${encodeURI("обложки")}/tivonixpanel.webp`,
        gallery: TIVONIXPANEL_GALLERY,
        outcomes: [
          isRu
            ? "**Кабинет** с логином и онбордингом"
            : "**Dashboard** with login and onboarding",
          isRu
            ? "Сделки, проекты и **выплаты** в одном месте"
            : "Deals, projects and **payouts** in one place",
          isRu
            ? "Модели **Referral** и **White-label**"
            : "**Referral** and **White-label** models",
          isRu
            ? "Продукт **в продакшене** на Railway"
            : "Product **live** on Railway",
          isRu ? "Собрали за **1 неделю**" : "Shipped in **1 week**",
        ],
        stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Railway"],
      },

      // 1) LABEL0S — 3 days
      {
        id: "labelos",
        title: "LabelOS",
        subtitleRu:
          "SaaS для музыкальных лейблов: отчёты, рассылка, шаблоны и контроль выплат.",
        subtitleEn:
          "SaaS for music labels: reporting, email delivery, templates and payout control.",
        detailsRu:
          "Срок: 3 дня\n\n" +
          "Цель\n" +
          "• Быстро собрать внятный промо-лендинг продукта и зафиксировать ценностное предложение.\n\n" +
          "Что сделали\n" +
          "• Сформировали структуру и блоки: Hero → проблемы → решение → возможности → сценарии → CTA\n" +
          "• Привели типографику к премиум-стилю: иерархия, ритм, воздух, читабельность\n" +
          "• Собрали адаптивную вёрстку (mobile-first) и аккуратные интерактивные состояния\n" +
          "• Оптимизировали загрузку: lazy-графика, корректные размеры, аккуратные фоны\n\n" +
          "Особенности\n" +
          "• Чёткий фокус на конверсию: короткие формулировки, сильный CTA, логичная структура\n" +
          "• Минимум “воды” — только то, что отвечает на вопросы клиента\n",
        detailsEn:
          "Timeline: 3 days\n\n" +
          "Goal\n" +
          "• Build a clear promo landing and solidify the value proposition fast.\n\n" +
          "What we did\n" +
          "• Designed the page structure: Hero → pain points → solution → features → flows → CTA\n" +
          "• Refined premium typography: hierarchy, rhythm, spacing, readability\n" +
          "• Built responsive layout (mobile-first) with clean interactive states\n" +
          "• Improved loading: lazy assets, correct sizing, polished background layers\n\n" +
          "Highlights\n" +
          "• Conversion-first copy and structure\n" +
          "• No fluff — only what answers buyer questions\n",
        domain: LABELOS_DOMAIN,
        status: "live",
        tags: ["SaaS", "Landing", "UI/UX", "React", "Tailwind"],
        cover: "/images/project-priew/labelo.webp",
        outcomes: [
          isRu
            ? "Готовый промо-лендинг за 3 дня"
            : "Promo landing delivered in 3 days",
          isRu ? "Чёткая структура под конверсию" : "Conversion-focused structure",
          isRu ? "Адаптив + оптимизация загрузки" : "Responsive + optimized loading",
        ],
        stack: ["React", "Tailwind", "Vite"],
      },

      // 1b) LOGOVO — сеть шиномонтажа · https://www.logovo24.by/
      {
        id: "logovo",
        title: "LOGOVO",
        subtitleRu:
          "Сайт сети шиномонтажа LOGOVO в Минске: Figma → Next.js, 4 филиала, запись, карта, B2B — под ключ, команда TIVONIX.",
        subtitleEn:
          "Website for LOGOVO tire network in Minsk: Figma → Next.js, 4 branches, booking, map, B2B — turnkey by TIVONIX.",
        subtitleZh:
          "明斯克 LOGOVO 轮胎网络网站：Figma → Next.js，4 个分支机构，预订，地图，B2B — TIVONIX 交钥匙工程。",
        detailsRu:
          "Зачем это\n" +
          "Шиномонтаж выбирают не в кресле — **с дороги, одной рукой, пока мигает индикатор**. Если адрес, часы и «записаться» прячутся на трёх экранах — клиент уедет к тому, кто ответил быстрее.\n\n" +
          "Заказчик — **ООО «Логово»** (сеть шиномонтажа в Минске, УНП 193616584): **4 филиала**, два работают **24/7**, безнал для автопарков и такси, полный контур услуг — от шиномонтажа и правки дисков до хранения и кондиционера. Сайт собрала **команда TIVONIX** под ключ — не шаблон и не «отдали архив».\n\n" +
          "Как работает\n" +
          "Человек с телефона открывает **logovo24.by** → услуга → филиал на карте / режим → **записаться** или **позвонить**. Автопарк идёт в B2B: безнал, единый прайс, документы на четырёх точках — без переписки «пришлите счёт».\n\n" +
          "Что внутри\n" +
          "Весь продукт сделали мы: **дизайн в Figma** (структура, mobile-first, CTA «с дороги»), потом разработка на **Next.js 16 + TypeScript + Tailwind v4** — статический экспорт под shared-хостинг. Не конструктор: ручная вёрстка, Leaflet-карта с геолокацией «найти меня», калькулятор «комплекс 4 колёса», до/после, отзывы, скидки, кейсы, FAQ, SEO (schema AutoRepair, sitemap, OG).\n\n" +
          "**11 услуг** с отдельными страницами и прайсом: шиномонтаж, грузовой, правка и покраска дисков, аргон, прокол, вулканизация, балансировка, проточка, хранение, кондиционер. **4 адреса** (Лещинского и Логойский тракт — 24/7; Гурского и Дзержинского — дневной режим). B2B-блок: такси / логистика / флоты, бейдж **75+ клиентов**. Запись: форма → mailto на сеть. Sticky-бар на мобиле: позвонить / записаться.\n\n" +
          "Визуал — светлая система **LOGOVO × Awesomic**: canvas `#f4f4f5`, ember-оранжевый `#ff5a00` только на CTA и бейджах 24/7, тёмные obsidian-блоки для контраста, крупные pill-кнопки, radius карточек 36px. Mobile-first — основной трафик с дороги.\n\n" +
          "Запуск под ключ\n" +
          "Помогли с **доменом logovo24.by**, **сами** подняли хостинг (**hoster.by** / cPanel), выгрузили статику `out/`, настроили прод. Полный цикл: идея → Figma → код → деплой.\n\n" +
          "Итог\n" +
          "Не «сайт за тысячу». **Рабочий инструмент сети LOGOVO**: запись, карта, B2B, дизайн и прод на **logovo24.by** — сделала команда TIVONIX.\n",
        detailsEn:
          "Why it matters\n" +
          "Tire service isn’t chosen from a couch — it’s chosen **from the road, one-handed, while a warning light blinks**. If address, hours and “book” hide across three screens, the client drives to whoever answers faster.\n\n" +
          "Client — **LOGOVO LLC** (Minsk tire network, UNP 193616584): **4 branches**, two open **24/7**, fleet billing for taxi and logistics, full service loop — fitting, wheel repair/paint, storage, A/C and more. Built **turnkey by the TIVONIX team** — not a template, not “here’s a zip”.\n\n" +
          "How it works\n" +
          "Someone opens **logovo24.by** on a phone → service → branch on the map / hours → **book** or **call**. Fleets go to B2B: invoices, unified pricing, docs across four locations — no “send the contract” threads.\n\n" +
          "What’s inside\n" +
          "We built the whole product: **Figma design** (structure, mobile-first, on-the-road CTAs), then **Next.js 16 + TypeScript + Tailwind v4** — static export for shared hosting. No page builder: handmade layout, Leaflet map with “find me” geolocation, “4 wheels package” calculator, before/after, reviews, discounts, cases, FAQ, SEO (AutoRepair schema, sitemap, OG).\n\n" +
          "**11 services** with dedicated pages and pricing: fitting, commercial, wheel repair/paint, argon, puncture, vulcanizing, balancing, brake disc machining, storage, A/C. **4 addresses** (Leshchinskogo and Logoyskiy trakt — 24/7; Gurskogo and Dzerzhinskogo — daytime). B2B block: taxi / logistics / fleets, **75+ clients** badge. Booking: form → mailto to the network. Sticky mobile bar: call / book.\n\n" +
          "Visual system — light **LOGOVO × Awesomic**: canvas `#f4f4f5`, ember orange `#ff5a00` only on CTAs and 24/7 badges, dark obsidian blocks for contrast, large pill buttons, 36px card radius. Mobile-first — most traffic comes from the road.\n\n" +
          "Turnkey launch\n" +
          "We helped with the **logovo24.by** domain, **set up hosting ourselves** (**hoster.by** / cPanel), shipped the `out/` static build, wired production. Full cycle: idea → Figma → code → deploy.\n\n" +
          "Outcome\n" +
          "Not a “thousand-buck site”. A **working tool for the LOGOVO network**: booking, map, B2B, design and prod on **logovo24.by** — by the TIVONIX team.\n",
        detailsZh:
          "为什么这很重要\n轮胎保养不是在沙发上选择的，而是**在路上单手选择，同时警告灯闪烁**。如果地址、营业时间和“预订”隐藏在三个屏幕上，客户就会开车去找谁回答得更快。\n\n客户 — **LOGOVO LLC**（明斯克轮胎网络，UNP 193616584）：**4 个分支机构**，两个开放 **24/7**，出租车和物流车队计费，全方位服务循环 - 装配、车轮维修/喷漆、存储、空调等。 **由 TIVONIX 团队构建** — 不是模板，也不是“这是一个 zip”。\n\n它是如何运作的\n有人在电话上打开 **logovo24.by** → 服务 → 地图/时间上的分支 → **预订** 或 **致电**。车队转向 B2B：发票、统一定价、跨四个地点的文档 — 没有“发送合同”线程。\n\n里面有什么\n我们构建了整个产品：**Figma 设计**（结构、移动优先、路上 CTA），然后是**Next.js 16 + TypeScript + Tailwind v4** - 用于共享托管的静态导出。无页面构建器：手工布局、带有“找到我”地理位置的传单地图、“4 轮套餐”计算器、之前/之后、评论、折扣、案例、常见问题解答、SEO（自动修复架构、站点地图、OG）。\n\n**11 项服务** 与 ded所示页面和定价：装配、商业、车轮维修/喷漆、氩气、穿刺、硫化、平衡、制动盘加工、存储、空调。 **4 个地址**（Leshchinskogo 和 Logoyskiy trakt — 24/7；Gurskogo 和 Dzerzhinskogo — 白天）。 B2B 区块：出租车/物流/车队，**75+ 客户**徽章。预订：表格→邮寄至网络。粘性移动栏：通话/预订。\n\n视觉系统 - 浅 **LOGOVO × Awesomic**：画布“#f4f4f5”，仅在 CTA 和 24/7 徽章上使用琥珀橙色“#ff5a00”，深色黑曜石块用于对比，大药丸按钮，36px 卡片半径。移动优先——大部分流量来自道路。\n\n交钥匙启动\n我们帮助 **logovo24.by** 域，**设置我们自己的托管**（**hoster.by** / cPanel），运送 `out/` 静态构建、有线生产。完整周期：想法→Figma→代码→部署。\n\n结果\n不是“千元网站”。 **LOGOVO 网络的工作工具**：在 **logovo24.by** 上进行预订、地图、B2B、设计和产品 — 由 TIVONIX 团队提供。",
        domain: LOGOVO_DOMAIN,
        status: "live",
        tags: ["Website", "Next.js", "Local Business", "Booking", "B2B", "Figma"],
        cover: "/images/project-priew/logovo.webp",
        outcomes: [
          isRu
            ? "Рабочий сайт сети на **logovo24.by**"
            : "Live network site on **logovo24.by**",
          isRu
            ? "**TIVONIX** под ключ: Figma → Next.js → hoster.by"
            : "**TIVONIX** turnkey: Figma → Next.js → hoster.by",
          isRu
            ? "**4 филиала** · два **24/7** · 11 услуг · B2B"
            : "**4 branches** · two **24/7** · 11 services · B2B",
          isRu
            ? "Карта Leaflet · запись · калькулятор · SEO"
            : "Leaflet map · booking · calculator · SEO",
        ],
        stack: ["Next.js", "TypeScript", "Tailwind", "Leaflet", "Figma", "hoster.by"],
        testimonial: {
          name: isRu ? "ООО «Логово»" : "LOGOVO LLC",
          role: isRu
            ? "Сеть шиномонтажа · Минск · 4 филиала"
            : "Tire-service network · Minsk · 4 branches",
          text: isRu
            ? "Хотели сайт, с которого человек с дороги сразу пишет или звонит, а не ищет адреса по кругу. Ребята сделали всё под ключ: дизайн, разработку, домен. Четыре точки, запись, безнал для автопарков. Сайт уже в работе."
            : "We wanted a site where people can book or call right from the road, not hunt for addresses. The team did the full thing: design, build, domain. Four locations, booking, fleet billing. Site is live.",
        },
      },

      // 2) UPC — SaaS MVP (client: ИП Безбородых И.В.) · https://upc.watch/
      {
        id: "upc",
        title: "UPC",
        subtitleRu:
          "SaaS MVP: подключаешь трек к TikTok, делишься ссылкой — монетизируешь просмотры, когда ролик набирает охват.",
        subtitleEn:
          "SaaS MVP: attach your sound on TikTok, share a link — monetize views as the clip gains traction.",
        detailsRu:
          "Продукт: SaaS / MVP (не одностраничный лендинг)\n\n" +
          "Идея\n" +
          "• Артист или правообладатель подключает трек к ролику в TikTok и получает ссылку на отслеживание\n" +
          "• Доход завязан на просмотрах и охвате: чем устойчивее набирает видео, тем сильнее монетизация сценария\n\n" +
          "Заказчик\n" +
          "• ИП Безбородых И.В.\n" +
          "Контакт/представитель\n" +
          "• Виктор Безбородых — Founder & CEO MIN.ECO (music distribution ecosystem)\n\n" +
          "Что сделали\n" +
          "• Собрали продуктовый интерфейс и логику сценария «трек → ссылка → метрики»\n" +
          "• Премиум-подача UI: сетка, типографика, анимации без перегруза\n" +
          "• Адаптив, микровзаимодействия, скорость загрузки\n" +
          "• Backend на Supabase/Postgres под учёт, интеграции и рост функциональности\n\n" +
          "Результат\n" +
          "• Живой MVP на upc.watch с понятным циклом монетизации для коротких видео\n",
        detailsEn:
          "Product: SaaS / MVP (not a single-page marketing-only site)\n\n" +
          "Concept\n" +
          "• The rights holder connects a track to a TikTok video and gets a tracking link\n" +
          "• Revenue ties to views and reach — stronger traction means a stronger monetization path\n\n" +
          "Client\n" +
          "• IE Bezborodykh I.V.\n" +
          "• INN 261709192509\n" +
          "• OGRNIP 325200000025627\n" +
          "Contact/rep\n" +
          "• Viktor Bezborodykh — Founder & CEO of MIN.ECO (music distribution ecosystem)\n\n" +
          "What we did\n" +
          "• Product UI and flows: track → link → metrics\n" +
          "• Premium UI craft: grid, typography, motion without clutter\n" +
          "• Responsive layout, micro-interactions, fast loading\n" +
          "• Supabase/Postgres backend for data, integrations and feature growth\n\n" +
          "Outcome\n" +
          "• Live MVP at upc.watch with a clear short-video monetization loop\n",
        domain: UPC_DOMAIN,
        status: "live",
        tags: ["SaaS", "MVP", "React", "TypeScript", "Supabase"],
        cover: "/images/project-priew/upcwatc.webp",
        outcomes: [
          isRu ? "MVP с циклом трек → ссылка → монетизация просмотров" : "MVP loop: track → link → view-based monetization",
          isRu ? "Премиум UI + стабильная скорость" : "Premium UI + solid performance",
          isRu ? "База Supabase/Postgres под масштаб продукта" : "Supabase/Postgres foundation to scale the product",
        ],
        stack: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind",
          "Supabase",
          "PostgreSQL",
        ],
        testimonial: {
          name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
          role: isRu ? "Founder & CEO MIN.ECO" : "Founder & CEO, MIN.ECO",
          text: isRu
            ? "Сделали быстро и аккуратно. Сайт выглядит дорого, без ощущения шаблона. По срокам тоже всё нормально."
            : "Fast and neat. The site looks premium, not like a template. Timeline was fine too.",
        },
      },

      // 3) PAYCLIP — 2 weeks (client: ИП Безбородых И.В.)
      {
        id: "payclip",
        title: "PayClip",
        subtitleRu:
          "Платёжный продукт: лендинг под конверсию + онбординг. Быстро доводит до действия.",
        subtitleEn: "Payment product: conversion landing + onboarding.",
        detailsRu:
          "Срок: 2 недели\n\n" +
          "Заказчик\n" +
          "• ИП Безбородых И.В.\n" +
          "Контакт/представитель\n" +
          "• Виктор Безбородых — Founder & CEO MIN.ECO\n\n" +
          "Цель\n" +
          "• Сделать продуктовую посадочную + онбординг, чтобы быстрее доводить пользователя до действия.\n\n" +
          "Что сделали за 2 недели\n" +
          "• Спроектировали структуру под лиды: оффер → доверие → сценарии → CTA\n" +
          "• Собрали чистый UI: сетка, отступы, контраст, типографика\n" +
          "• Протянули ключевые пользовательские сценарии (онбординг/первые шаги)\n" +
          "• Добавили состояния/валидации/микровзаимодействия\n" +
          "• Сделали адаптив и проверили кроссбраузерность\n\n" +
          "Результат\n" +
          "• Понятная посадочная + онбординг, меньше вопросов у пользователей, выше конверсия в контакт\n",
        detailsEn:
          "Timeline: 2 weeks\n\n" +
          "Client\n" +
          "• IE Bezborodykh I.V.\n" +
          "• INN 261709192509\n" +
          "• OGRNIP 325200000025627\n" +
          "Contact/rep\n" +
          "• Viktor Bezborodykh — Founder & CEO, MIN.ECO\n\n" +
          "Goal\n" +
          "• Build a product landing + onboarding to move users to action faster.\n\n" +
          "What we delivered in 2 weeks\n" +
          "• Lead-oriented structure: offer → trust → flows → CTA\n" +
          "• Clean UI: grid, spacing, contrast, typography\n" +
          "• Core user flows (onboarding / first steps)\n" +
          "• States, validation, micro-interactions\n" +
          "• Responsive layout + cross-browser checks\n\n" +
          "Result\n" +
          "• Clear landing + onboarding, fewer user questions, better conversion to contact\n",
        domain: PAYCLIP_DOMAIN,
        status: "live",
        tags: ["Fintech", "Landing", "Onboarding", "UI/UX", "Conversion"],
        cover: "/images/project-priew/payslip.webp",
        outcomes: [
          isRu ? "Сделано за 2 недели" : "Delivered in 2 weeks",
          isRu ? "Структура под конверсию" : "Conversion-driven structure",
          isRu ? "Онбординг и сценарии" : "Onboarding and user flows",
        ],
        stack: ["React", "TypeScript", "Tailwind", "API"],
        testimonial: {
          name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
          role: isRu ? "Founder & CEO MIN.ECO" : "Founder & CEO, MIN.ECO",
          text: isRu
            ? "Пишем в чат, правки прилетают быстро. Без лишней воды, результатом довольны."
            : "We message them, edits come back fast. Straight talk, happy with the result.",
        },
      },

      // 4) HEADMIND — корпоративный сайт на WordPress
      {
        id: "headmind",
        title: "Headmind",
        subtitleRu:
          "Корпоративный сайт ООО «Хэдмайнд»: Figma → WordPress + Elementor, хостинг и домен headmind.ru.",
        subtitleEn:
          "Corporate site for Headmind: Figma → WordPress + Elementor, hosting and domain headmind.ru.",
        subtitleZh:
          "Headmind 的公司网站：Figma → WordPress + Elementor，托管和域名 headmind.ru。",
        detailsRu:
          "Контекст клиента\n" +
          "ООО «Хэдмайнд» — консалтинг по трансформации бизнеса: стратегия, цифровизация, оргдизайн, производство, контракты. Заказчик — **Евгений Беликов**, основатель и генеральный директор.\n\n" +
          "Задача\n" +
          "В B2B часто теряют внимание на первом касании, если сайт не объясняет услуги и экспертизу. Нужен корпоративный сайт, который можно спокойно отправить в первом сообщении.\n\n" +
          "Что сделала TIVONIX\n" +
          "Макеты в **Figma** (несколько визуальных вариантов на выбор) → дизайн и сборка на **WordPress + Elementor**: услуги, команда, доверие, формы заявки. Подключили хостинг и домен **headmind.ru**, настроили админку для самостоятельного редактирования контента.\n\n" +
          "Зона ответственности TIVONIX\n" +
          "Дизайн-направление, WordPress-реализация, хостинг, домен, деплой и передача проекта.\n\n" +
          "Подтверждённый результат\n" +
          "Корпоративный сайт с маршрутом **услуги → команда → заявка** на домене headmind.ru.\n\n" +
          "Технологии\n" +
          "Figma, WordPress, Elementor, хостинг, DNS.\n\n" +
          "Текущий статус\n" +
          "Сдан. Внешний сайт: headmind.ru.\n\n" +
          "Следующий шаг\n" +
          "Откройте кейс или перейдите на headmind.ru, чтобы оценить структуру и подачу.\n",
        detailsEn:
          "Client context\n" +
          "Headmind LLC — business transformation consultancy: strategy, digitalization, org design, production, contracts. Client — **Evgeniy Belikov**, founder and CEO.\n\n" +
          "Challenge\n" +
          "In B2B you lose attention on first contact if the site doesn’t explain services and expertise. They needed a corporate site safe to send in the first message.\n\n" +
          "What TIVONIX delivered\n" +
          "**Figma** mockups (several visual options) → design and build on **WordPress + Elementor**: services, team, trust blocks, lead forms. Hosting and **headmind.ru** domain connected; WordPress admin set up for self-service content edits.\n\n" +
          "TIVONIX responsibility\n" +
          "Design direction, WordPress implementation, hosting, domain, deployment and project handover.\n\n" +
          "Verified result\n" +
          "Corporate site with a clear path **services → team → lead** on headmind.ru.\n\n" +
          "Technology\n" +
          "Figma, WordPress, Elementor, hosting, DNS.\n\n" +
          "Current status\n" +
          "Delivered. External site: headmind.ru.\n\n" +
          "Next step\n" +
          "Open the case or visit headmind.ru to review structure and presentation.\n",
        detailsZh:
          "为什么这很重要\nHeadadmind 是一家业务转型咨询公司：战略、数字化、组织设计、生产、合同。在 B2B 中，如果网站什么都说了，但什么也没说，你常常**在第一次接触时就失去了交易**。他们需要一个您可以在第一条消息中发送的网站。\n\n客户 — **Evgeniy Belikov**，Headmind 创始人兼首席执行官（联合创始人 — Vitaliy Petrovsky）。直播：**headmind.ru**。\n\n它是如何运作的\n访客遵循一条简短的路径：**服务**→**方法/专业知识**→**团队**→**联系人/领导**。每一步都清楚你是谁以及你为何强大。 CTA 位于人们已经准备好写作的地方。\n\n里面有什么\n首先**Figma 模型**：几个视觉方向，直到客户选择了最喜欢的。然后在 **WordPress + Elementor** 上进行设计和构建：服务（转型、数字化、人力资源、生产、合同、销售）、团队、信任、潜在客户表单。\n\n统包：托管设置、**域名 headmind.ru** 连接、交付生产、WordPress 管理员准备就绪，以便他们可以自己编辑内容。不是专门定制的 React 构建——快速启动、轻松编辑、平静的 B2B 网站。\n\n我们交付了什么\nFigma（变体选择）→设计→WordPress/Elementor → 托管 + 域名 → 直播 **headmind.ru**。专业知识融入了通往潜在客户的道路。\n\n结果\n不是“放弃您的徽标”模板。 Evgeniy Belikov / Headadmind 的 **交钥匙企业网站**：Figma → WP、域名和托管 - 打开它并自行检查。",
        domain: HEADMIND_DOMAIN,
        status: "live",
        tags: ["B2B", "WordPress", "Elementor", "Figma", "Corporate"],
        cover: "/images/project-priew/headmind.webp",
        outcomes: [
          isRu
            ? "Заказчик **Евгений Беликов** · Figma → WordPress"
            : "Client **Evgeniy Belikov** · Figma → WordPress",
          isRu
            ? "**Figma** (варианты) → **WordPress + Elementor**"
            : "**Figma** (variants) → **WordPress + Elementor**",
          isRu
            ? "Хостинг + домен **headmind.ru** под ключ"
            : "Hosting + domain **headmind.ru** turnkey",
          isRu
            ? "Маршрут услуг → команда → **заявка**"
            : "Path: services → team → **lead**",
        ],
        stack: ["Figma", "WordPress", "Elementor", "Hosting", "Domain"],
        testimonial: {
          name: isRu ? "Евгений Беликов" : "Evgeniy Belikov",
          role: isRu
            ? "Основатель и гендиректор, ООО «Хэдмайнд»"
            : "Founder & CEO, Headmind",
          text: isRu
            ? "Сначала кинули несколько макетов в Figma, мы выбрали свой. Потом WordPress, хостинг, домен. Теперь спокойно кидаем сайт клиенту на первом звонке."
            : "They sent a few Figma options, we picked one. Then WordPress, hosting, domain. Now we send the site on the first call without thinking twice.",
        },
      },

      // 7) SLOTTY — маркетплейс онлайн-записи к мастерам
      {
        id: "slotty",
        title: "Slotty",
        subtitleRu:
          "Маркетплейс онлайн-записи к мастерам: каталог с фильтрами и картой, Telegram Mini App, кабинет мастера (SaaS Free/Pro), platform-admin, bePaid — на Railway, домен slotty.of.by.",
        subtitleEn:
          "Booking marketplace for service providers: filtered catalog + map, Telegram Mini App, service provider portal (Free/Pro), platform admin, bePaid — on Railway, domain slotty.of.by.",
        subtitleZh:
          "大师的完整预订市场：过滤目录 + 地图、Telegram Mini App、大师 SaaS 柜（免费/专业版）、平台管理、bePaid — on Railway、域名 slotty.of.by。",
        detailsRu:
          "Контекст клиента\n" +
          "Заказчик — **Виктория Д.** Нужна платформа онлайн-записи к мастерам красоты и сервиса, а не лендинг с одной кнопкой.\n\n" +
          "Задача\n" +
          "Запись часто идёт через Direct и мессенджеры: клиент и мастер теряют время, слоты не видны. Нужны каталог, фильтры, карта, кабинет мастера, роли, platform-admin и оплаты в одной системе.\n\n" +
          "Что сделала TIVONIX\n" +
          "Дизайн и разработка под ключ: клиентский каталог с фильтрами и картой, Telegram Mini App, SaaS-кабинет мастера (Free/Pro), platform-admin, интеграция **bePaid**, домен **slotty.of.by**, деплой на **Railway** (web + api).\n\n" +
          "Зона ответственности TIVONIX\n" +
          "Продуктовая архитектура, UI/UX, фронтенд и бэкенд, база данных, интеграции, инфраструктура и выкладка на домен заказчика.\n\n" +
          "Подтверждённый результат\n" +
          "Рабочая платформа на slotty.of.by: каталог, запись по слотам, кабинеты мастера и администратора, Telegram Mini App.\n\n" +
          "Технологии\n" +
          "React, TypeScript, Vite, Tailwind, Express, PostgreSQL, Railway, Telegram Mini App, Google Auth, bePaid, Leaflet, Resend.\n\n" +
          "Текущий статус\n" +
          "Сдан. Поддерживается TIVONIX. Публичный запуск к клиентам и мастерам — на стороне заказчика.\n\n" +
          "Следующий шаг\n" +
          "Откройте slotty.of.by или кейс, чтобы посмотреть каталог, фильтры и сценарий записи.\n",
        detailsEn:
          "Client context\n" +
          "Client — **Victoria D.** Needed a booking platform for beauty and service providers — not a single-button landing page.\n\n" +
          "Challenge\n" +
          "Booking often happens in DMs and messengers: clients and providers lose time, slots stay invisible. The product needed catalog, filters, map, service provider portal, roles, platform admin and payments in one system.\n\n" +
          "What TIVONIX delivered\n" +
          "Turnkey design and build: client catalog with filters and map, Telegram Mini App, service provider portal (Free/Pro), platform admin, **bePaid** integration, **slotty.of.by** domain, **Railway** deployment (web + api).\n\n" +
          "TIVONIX responsibility\n" +
          "Product architecture, UI/UX, frontend and backend, database, integrations, infrastructure and deployment on the client’s domain.\n\n" +
          "Verified result\n" +
          "Working platform on slotty.of.by: catalog, slot-based booking, provider and admin portals, Telegram Mini App.\n\n" +
          "Technology\n" +
          "React, TypeScript, Vite, Tailwind, Express, PostgreSQL, Railway, Telegram Mini App, Google Auth, bePaid, Leaflet, Resend.\n\n" +
          "Current status\n" +
          "Delivered. Supported by TIVONIX. Public rollout to clients and providers is managed by the client.\n\n" +
          "Next step\n" +
          "Open slotty.of.by or the case page to review catalog, filters and the booking flow.\n",
        detailsZh:
          "为什么这很重要\n预订大师仍然经常存在于**DM和WhatsApp**中：“明天有空吗？”，“一个小时后？”，“哎呀，忘了提醒”。客户厌倦了打字。大师们厌倦了回答。老虎机消失在聊天的沉默中。\n\n这不是草稿或“立即预订”按钮。它需要一个**完整的市场**：过滤目录、地图、客户路径、主 SaaS 柜、角色、平台管理、支付、通知和生产。客户 — **Victoria D.** 时间表 — **3 周**。\n\n它是如何运作的\n客户端打开**slotty.of.by**（网络或Telegram迷你应用程序）→目录→过滤器/地图→主→服务→**打开插槽**→确认。预订代码、电报 + 电子邮件提醒 — 无需致电。\n大师运行简介、投资组合、地址、服务、促销、时间表、请求和客户；免费或专业计划。\n平台管理员负责管理、预订、计费、bePaid 付款、广播和审计——该平台现已可运行。\n\n里面有什么\n**大型建筑**，而不是带有形式的平台。前端：React + TypeScript + Vite + Tailwind。后端：Express API、PostgreSQL（**88 迁移**）、JWT 会话。生产：**两个铁路服务**（Web + API），域名**slotty.of.by** - 我们建议d 在哪里购买域名、设置托管、指向 DNS 并实时发货。加上 Telegram Bot / Mini App、Google Auth、电子邮件（重新发送）、地图（传单 / OSM、可选 Yandex）、**bePaid** (BYN)、Sentry、SEO 预渲染。\n\n客户市场：**6 个类别**（美甲、理发、眉毛/睫毛、按摩、健身、纹身）。目录不是平面卡片列表 - 完整搜索：所有/流行/促销/新，文本搜索，**带地理排序的地图**。\n\n过滤器：排序（推荐、热门、最快、距离、评分、价格↑↓、评论）；日期（今天/明天/周/周末/确切日期）；一天中的时间+小时滑块；工作室或家里；期间; BYN 价格；评分从 4.5 / 4.7 / 4.9 起；评论计数；仅经过验证；仅促销；仅限网上预订。预订：日期→时段→评论→参考照片→使用代码**SL-…**成功。客户资料：约会、收藏夹、通知、设置、访问后回顾。\n\n主柜是一个单独的 SaaS：今天/请求/时间表/服务（目录、价格、捆绑、促销）/配置文件和投资组合/客户/声誉/计费/通知（数十种事件类型）。 **8步**入职：类别→个人资料→地图地址→服务→信任→预览→计划。计划：免费（限制）/ Pro / 7 天试用 — 付费或手动转账。\n\n平台管理：概述、请求（类别更改、删除、赞助、报告）、支持、系统状态、用户、主、服务、预订（包括问题取消）、计费和促销代码、bePaid 付款、广播、审计。角色：**客户端/主控/平台管理员**。身份验证：电子邮件、Google、Telegram - 手机或桌面。\n\n通常会破坏时间线的困难部分：并发预订和时段、待到期、自动完成、预订争议；免费/专业版权利；通知作业队列；多重身份验证；具有 20 多个过滤器参数和专业增强推荐的服务器目录。\n\n我们交付了什么\n设计+交钥匙构建：市场、橱柜、管理、集成、域名和托管。在 **slotty.of.by** 上直播 — **即将向真正的客户和大师推出**。\n\n结果\n不是“看看这个想法”的演示。 **完整的预订市场**，包含过滤器、地图、迷你应用程序、主 SaaS 和平台管理。 Victoria D.，3 周 — 以及您可以自己打开并检查的实时产品。",
        domain: SLOTTY_DOMAIN,
        status: "live",
        tags: ["Marketplace", "Booking", "Beauty", "SaaS", "Telegram", "Admin Panel"],
        cover: "/images/project-priew/slotty.webp",
        gallery: SLOTTY_GALLERY,
        outcomes: [
          isRu
            ? "Каталог с **фильтрами и картой** · Mini App · Free/Pro"
            : "Catalog with **filters + map** · Mini App · Free/Pro",
          isRu
            ? "Домен **slotty.of.by** · Railway (web + api)"
            : "Domain **slotty.of.by** · Railway (web + api)",
          isRu
            ? "Кабинет мастера и platform-admin"
            : "Service provider portal and platform admin",
          isRu
            ? "**Поддерживается TIVONIX**"
            : "**Supported by TIVONIX**",
        ],
        stack: [
          "React",
          "TypeScript",
          "Vite",
          "Express",
          "PostgreSQL",
          "Railway",
          "Telegram Mini App",
          "Google Auth",
          "bePaid",
          "Leaflet",
          "Resend",
        ],
        testimonial: {
          name: isRu ? "Виктория Д." : "Victoria D.",
          role: isRu ? "Заказчик Slotty" : "Slotty client",
          text: isRu
            ? "Нужен был нормальный маркетплейс: фильтры, кабинет мастера, админка. Собрали на нашем домене — уже можно показывать реальным клиентам."
            : "I needed a real marketplace: filters, service provider portal, admin. They built it on our domain — ready to show real clients.",
        },
      },

      // 8) NEO TERMINAL — AI commerce operating system
      {
        id: "neo-terminal",
        title: "Neo Terminal",
        category: "AI Commerce · RetailTech",
        subtitleRu:
          "AI-платформа коммерции, которая связывает каталоги, склад, диалоги с клиентами, B2B-закупки, checkout, доставку и операционку бизнеса в одну систему.",
        subtitleEn:
          "AI commerce platform that connects product catalogs, inventory, customer conversations, B2B procurement, checkout, delivery and business automation in one operating system.",
        subtitleZh:
          "AI 商业平台：将商品目录、库存、客户对话、B2B 采购、结算、配送与业务运营连成一套操作系统。",
        detailsRu:
          "Контекст клиента\n" +
          "Neo Terminal — AI-платформа коммерции, которую TIVONIX проектирует и разрабатывает как модульный продукт для розницы и B2B.\n\n" +
          "Задача\n" +
          "Коммерция часто ломается между системами: каталог, склад, мессенджеры, B2B-файлы и доставка живут отдельно. Нужен один коммерческий слой вместо разрозненных интерфейсов.\n\n" +
          "Что сделала TIVONIX\n" +
          "Merchant OS, Catalog & Data Hub, Smart Inventory, AI Seller, Smart City, B2B Procurement, Omnichannel, Terminal Pay, Delivery & Courier OS, аналитика и platform admin. Импорт из YML, XLSX, CSV, CommerceML и коннекторов в единую товарную модель.\n\n" +
          "Зона ответственности TIVONIX\n" +
          "Архитектура продукта, UX/UI, фронтенд, бэкенд, модель данных, границы AI-оркестрации, интеграции, тестирование и инфраструктура деплоя.\n\n" +
          "Подтверждённый результат\n" +
          "Модульная платформа, где каталог, остатки, диалоги, заказы и операции мерчанта работают на одном слое данных. AI-ответы обрабатываются как недоверенные; действия ограничены серверными правилами.\n\n" +
          "Технологии\n" +
          "React, TypeScript, NestJS, PostgreSQL, Prisma, Redis, BullMQ, pgvector, Playwright, Docker.\n\n" +
          "Текущий статус\n" +
          "Продукт в продакшене на **neo-terminal.ru**. Внешние провайдеры (платежи, мессенджеры, ERP, AI, устройства) — явные границы интеграций, включаются при внедрении.\n\n" +
          "Следующий шаг\n" +
          "Откройте продукт на **neo-terminal.ru** или кейс TIVONIX, чтобы посмотреть архитектуру и модули.\n",
        detailsEn:
          "Client context\n" +
          "Neo Terminal is an AI commerce platform TIVONIX is designing and building as a modular product for retail and B2B.\n\n" +
          "Challenge\n" +
          "Commerce often breaks between systems: catalog, inventory, messengers, B2B files and delivery live separately. The product needed one commerce layer instead of isolated interfaces.\n\n" +
          "What TIVONIX delivered\n" +
          "Merchant OS, Catalog & Data Hub, Smart Inventory, AI Seller, Smart City, B2B Procurement, Omnichannel, Terminal Pay, Delivery & Courier OS, analytics and platform admin. Ingestion from YML, XLSX, CSV, CommerceML and connectors into one product model.\n\n" +
          "TIVONIX responsibility\n" +
          "Product architecture, UX/UI, frontend, backend, data model, AI orchestration boundaries, integrations, testing and deployment infrastructure.\n\n" +
          "Verified result\n" +
          "A modular platform where catalog, stock, conversations, orders and merchant operations share one data layer. AI output is treated as untrusted; actions stay constrained by server-side rules.\n\n" +
          "Technology\n" +
          "React, TypeScript, NestJS, PostgreSQL, Prisma, Redis, BullMQ, pgvector, Playwright, Docker.\n\n" +
          "Current status\n" +
          "Live product on **neo-terminal.ru**. External providers (payments, messengers, ERP, AI, devices) are explicit integration boundaries and are enabled during deployment.\n\n" +
          "Next step\n" +
          "Open the product at **neo-terminal.ru** or the TIVONIX case to review architecture and modules.\n",
        detailsZh:
          "为什么重要\n" +
          "现代商业很少因为没有网站而失败。它失败在**系统之间**。\n\n" +
          "目录在一处，库存在另一处。客户在即时通讯里提问。B2B 采购发来 Excel。经理手工核对库存。市场部用另一套数据。配送要等有人再次复制订单才开始。\n\n" +
          "每一处断裂都会增加延迟，并多出一个交易可能中断的点。\n\n" +
          "Neo Terminal 被设计成整条链路的操作层。我们没有再加一个孤立界面，而是把商品数据、库存、客户互动、交易与运营连到**同一套商业模型**上。\n\n" +
          "如何运作\n" +
          "商家从 YML、XLSX、CSV、CommerceML 或可用的 ERP 连接器导入目录。Neo Terminal 将商品、规格、SKU、价格、媒体与库存规范化为同一模型，并驱动发现、AI 辅助对话、商家运营、仓储与 B2B 采购。外部服务保持为适配器，而不是事实来源。\n\n" +
          "里面有什么\n" +
          "**Merchant OS、Catalog & Data Hub、Smart Inventory、AI Seller、Smart City、B2B、Omnichannel、Terminal Pay、Delivery、分析与平台管理** — 一套模块化商业平台，而不是互不相连的原型。客户端 React + TypeScript，API 层 NestJS，PostgreSQL / Prisma，Redis 与 BullMQ，需要语义检索时使用 pgvector。\n\n" +
          "内部产品表面已完成可测试范围的运行时验收。外部支付、消息、ERP、AI 与设备提供商仍是明确的集成边界，在部署阶段用真实环境启用并验证。\n\n" +
          "我们交付了什么\n" +
          "TIVONIX 端到端设计并开发 Neo Terminal：产品架构、UX/UI、前后端、数据模型、商业核心、AI 边界、集成架构、商家工具、客户界面、B2B 流程、测试与部署。\n\n" +
          "结果\n" +
          "一套试点就绪的 AI 商业操作系统，把从目录到履约的完整商业路径放进同一架构。\n",
        domain: NEO_TERMINAL_DOMAIN,
        status: "live",
        tags: [
          "AI",
          "Commerce",
          "SaaS",
          "RetailTech",
          "B2B",
          "Marketplace",
          "Omnichannel",
          "React",
          "NestJS",
          "PostgreSQL",
          "UI/UX",
          "Admin Panel",
        ],
        cover: "/images/project-priew/neo-terminal.webp",
        gallery: NEO_TERMINAL_GALLERY,
        roleRu: "Продуктовый дизайн и разработка под ключ",
        roleEn: "End-to-end product design and development",
        seoTitleRu: "Neo Terminal — AI-операционная система коммерции | TIVONIX",
        seoTitleEn: "Neo Terminal — AI Commerce Operating System | TIVONIX",
        seoDescriptionRu:
          "Neo Terminal — AI-платформа коммерции, которую собрала TIVONIX: каталог и склад, Smart City, продажи с AI, B2B-закупки, омниканал, checkout, доставка и инструменты мерчанта.",
        seoDescriptionEn:
          "Neo Terminal is an AI commerce platform built by TIVONIX: catalog and inventory infrastructure, Smart City, AI-assisted sales, B2B procurement, omnichannel operations, checkout, delivery and merchant tools.",
        outcomes: [
          isRu
            ? "Одна коммерческая модель от каталога до заказа"
            : "One commerce model from catalog to order",
          isRu
            ? "Merchant OS + клиентский Smart City"
            : "Merchant OS + customer Smart City",
          isRu
            ? "AI Seller + Smart Inventory"
            : "AI Seller + Smart Inventory",
          isRu
            ? "Архитектура YML, XLSX, CSV, CommerceML и коннекторов"
            : "YML, XLSX, CSV, CommerceML and connector architecture",
          isRu
            ? "B2B-закупки и сценарии коммерческих предложений"
            : "B2B procurement and quote workflows",
          isRu
            ? "Омниканал, доставка и Courier OS"
            : "Omnichannel, delivery and Courier OS",
          isRu
            ? "Платформенная админка, аналитика и автоматизация"
            : "Platform admin, analytics and automation",
        ],
        stack: [
          "React",
          "TypeScript",
          "Vite",
          "NestJS",
          "PostgreSQL",
          "Prisma",
          "Redis",
          "BullMQ",
          "pgvector",
          "Playwright",
          "Docker",
        ],
        testimonial: {
          name: isRu ? "Дмитрий Валериевич" : "Dmitry",
          role: isRu ? "Сооснователь, Neo Terminal" : "Co-founder, Neo Terminal",
          text: isRu
            ? "Neo Terminal — большой продукт, а не сайт и не обёртка над AI. Нужно было связать каталоги, склад, AI, B2B, заказы, клиентские сценарии и платформенные операции в одну систему. TIVONIX взяли продукт целиком, глубоко вошли в бизнес-логику и доводили платформу, пока ключевые сценарии не заработали как единый продукт. Для меня важно, что команда не останавливается на красивом интерфейсе — они заходят в архитектуру, тесты и те детали, от которых зависит, можно ли системой пользоваться в бизнесе."
            : "Neo Terminal is a big product, not a website or a simple AI wrapper. The team had to connect catalogs, inventory, AI, B2B, orders, customer flows and platform operations into one system. TIVONIX took responsibility for the product end to end, went deep into the business logic and kept pushing the platform until the core flows worked as one product. What I value most is that the team does not stop at a good-looking interface — they go into architecture, testing and the details that actually decide whether the system can be used in business.",
          draft: true,
        },
      },

      // 9) SPLITON — финтех-платформа для музыкальных активов
      {
        id: "spliton",
        title: "Spliton",
        subtitleRu:
          "Финтех-платформа для долей в музыке: каталог, первичный и вторичный рынок, кошелёк USDT, ledger, compliance и operator portal — продукт с сопровождением TIVONIX.",
        subtitleEn:
          "Fintech platform for music shares: catalog, primary & secondary market, USDT wallet, ledger, compliance and operator portal — supported by TIVONIX.",
        subtitleZh:
          "音乐股票的金融科技平台：目录、一级和二级市场、USDT 钱包、账本、合规性和运营商门户——投资者支持的产品，并提供持续支持。",
        detailsRu:
          "Контекст клиента\n" +
          "Spliton — платформа для инвестирования в доли музыкальных релизов. Заказчик — **Виктор Безбородых**, основатель MIN.ECO.\n\n" +
          "Задача\n" +
          "Нужен продукт с денежными потоками, ролями, согласиями, KYC и операторским управлением — не лендинг с кнопкой «купить». Сценарии пополнения, покупки долей, вторичного рынка и вывода должны быть прозрачны для пользователя и команды.\n\n" +
          "Что сделала TIVONIX\n" +
          "Кабинет инвестора, operator portal, ledger, treasury, KYC/AML, вторичный рынок, публичный trust center, автотесты на критичные денежные сценарии. Дизайн, фронтенд (Next.js), бэкенд (NestJS), база (PostgreSQL/Prisma), деплой и операционные процедуры.\n\n" +
          "Зона ответственности TIVONIX\n" +
          "Продуктовая архитектура, UI/UX, разработка, комплаенс-контуры в продукте, тестирование и сопровождение после запуска.\n\n" +
          "Подтверждённый результат\n" +
          "Платформа на spliton.io: каталог релизов, покупка долей, кошелёк USDT (TRC20), вторичный рынок, operator portal с финансовыми и операционными разделами.\n\n" +
          "Технологии\n" +
          "Next.js, React, TypeScript, NestJS, PostgreSQL, Prisma, Supabase, Playwright, i18n (RU, EN, ES, PT).\n\n" +
          "Текущий статус\n" +
          "Сдан. Поддерживается TIVONIX.\n\n" +
          "Следующий шаг\n" +
          "Откройте spliton.io или кейс, чтобы посмотреть публичную часть и структуру продукта.\n",
        detailsEn:
          "Client context\n" +
          "Spliton — a platform for investing in shares of music releases. Client — **Viktor Bezborodykh**, founder of MIN.ECO.\n\n" +
          "Challenge\n" +
          "They needed a product with money flows, roles, consents, KYC and operator tooling — not a landing page with a buy button. Deposit, share purchase, secondary market and withdrawal flows had to be clear for users and the operations team.\n\n" +
          "What TIVONIX delivered\n" +
          "Investor portal, operator portal, ledger, treasury, KYC/AML, secondary market, public trust center, automated tests on critical money flows. Design, frontend (Next.js), backend (NestJS), database (PostgreSQL/Prisma), deployment and operational runbooks.\n\n" +
          "TIVONIX responsibility\n" +
          "Product architecture, UI/UX, engineering, compliance flows in the product, testing and post-launch support.\n\n" +
          "Verified result\n" +
          "Platform on spliton.io: release catalog, share purchase, USDT (TRC20) wallet, secondary market, operator portal with finance and operations sections.\n\n" +
          "Technology\n" +
          "Next.js, React, TypeScript, NestJS, PostgreSQL, Prisma, Supabase, Playwright, i18n (RU, EN, ES, PT).\n\n" +
          "Current status\n" +
          "Delivered. Supported by TIVONIX.\n\n" +
          "Next step\n" +
          "Open spliton.io or the case page to review the public surface and product structure.\n",
        detailsZh:
          "为什么这很重要\n音乐资产不是带有购买按钮的登陆页面。 **真实货币**，角色、同意、存款和取款必须无漏洞锁定：确认→处理→结果。一旦付款或同意失败，信任就会比任何释放更快地消失。\n\n这不是一个“快速管理”。它需要**完整的股份交换**：投资者内阁、运营商门户、账本、财务、KYC/AML、争议、公共信任中心。我们端到端地构建了它，并且**仍然在生产中支持**它。\n\n它是如何运作的\n投资者注册、接受保单、在需要时完成 KYC，并充值 **USDT (TRC20)**。\n然后：在目录中选择一个版本→审查数据室→在主要市场购买股票（UNT）→跟踪头寸和应计费用→可选择在**二级市场**（订单簿、限价订单）进行交易→通过财务检查提取。\n运营商可以通过管理门户管理存款、取款、合规、发布、推荐、争议和公共系统状态。\n\n里面有什么\n**一个存储库中的大型产品**，而不是单页网站。 Next.js 上的客户端应用程序，NestJS 上的服务器，通过 Prisma 的 PostgreSQL，对关键资金流的自动测试。\n\n投资者柜：发布目录、股份申购、投资tfolio 和指标、钱包（存款、取款、历史记录、报表）、**具有复杂订单簿**和限价订单的二级市场、计算器、新闻、支持和争议中心、推荐和合作伙伴计划、VIP。\n\n公共面：产品登陆、**信任中心**（运营账本、服务状态、文档）、系统状态页面、费用、法律页面、帮助中心。\n\n运营商门户对于平台团队来说是一个**巨大的管理面板**：不是几个屏幕，而是数十个管理部分。执行概述、操作员任务、用户和角色、曲目和回合、艺术家、唱片公司、流派。\n\n金融：钱包、存款、**支出**、持有、收入和平台收入、金库、支付必需品。市场：二级市场、交易、可疑活动。运营：支持、争议、合规、KYC、法律文本、推荐和合作伙伴。\n\n使用**图表**进行分析：财务、用户、轨迹、市场、收入、风险、运营。加上报告和导出、新闻、帮助中心、系统状态、通知、员工审核日志。角色：超级管理员、会计师、内容、支持、合规、业务分析师。\n\n财务核心：内部复式记账操作账本、对账、平台费用、波场充值自动化、热/冷钱包政策、事件操作手册。酸性石灰“#b7f500”上的界面 — 与实时产品匹配。\n\n语言：界面完全本地化为**四种语言**——俄语、英语、西班牙语、葡萄牙语。\n\n我们交付了什么\n设计并交付完整的循环：设计、前端、后端、数据库、合规性、自动化测试和生产操作。该产品已上线，由 [[200,000 美元]] 的投资者支持，**TIVONIX 仍然支持并发展**它。\n\n结果\n不是演示，也不是套牌。一个**实时金融科技平台**，拥有投资者内阁、复杂的股票交易所以及庞大的支付、图表和日常运营管理系统。还是支持的。",
        domain: SPLITON_DOMAIN,
        status: "live",
        tags: [
          "FinTech",
          "Marketplace",
          "SaaS",
          "MusicTech",
          "React",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "UI/UX",
          "Admin Panel",
          "Compliance",
        ],
        cover: "/images/project-priew/spliton.webp",
        gallery: SPLITON_GALLERY,
        outcomes: [
          isRu
            ? "Кабинет инвестора + вторичный рынок + operator portal"
            : "Investor portal + secondary market + operator portal",
          isRu
            ? "Operator portal: выплаты, казначейство, комплаенс"
            : "Operator portal: payouts, treasury, compliance",
          isRu
            ? "Учёт операций, KYC, центр доверия, USDT TRC20"
            : "Operations ledger, KYC, trust center, USDT TRC20",
          isRu
            ? "**Поддерживается TIVONIX**"
            : "**Supported by TIVONIX**",
          isRu
            ? "4 языка: русский, английский, испанский, португальский"
            : "4 languages: Russian, English, Spanish, Portuguese",
        ],
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind",
          "NestJS",
          "PostgreSQL",
          "Supabase",
          "Prisma",
          "Playwright",
          "i18n",
        ],
        testimonial: {
          name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
          role: isRu ? "Основатель MIN.ECO" : "Founder & CEO, MIN.ECO",
          text: isRu
            ? "У Spliton тяжёлая начинка: доли, кошелёк, выплаты, operator portal. Собрали целиком, выкатили и остались на сопровождении."
            : "Spliton is heavy: shares, wallet, payouts, operator portal. They built the full stack, shipped it and stayed for support.",
        },
      },
  ];
}

export function buildProjects(isRu: boolean): Project[] {
  const all = buildAllProjects(isRu);
  return PUBLIC_PROJECT_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );
}

function isInternalTestimonial(p: Project): boolean {
  if (p.id === "tivonixpanel") return true;
  const t = p.testimonial;
  if (!t) return false;
  const role = t.role.toLowerCase();
  return (
    role.includes("tivonix") &&
    (role.includes("co-founder") ||
      role.includes("основател") ||
      role.includes("соучред"))
  );
}

/** All catalog projects that have a client testimonial (incl. non-public cases). */
export function projectsWithTestimonials(isRu: boolean): Project[] {
  return buildAllProjects(isRu).filter(
    (p) =>
      Boolean(p.testimonial) &&
      !p.testimonial?.draft &&
      !isInternalTestimonial(p)
  );
}

export function isProjectSiteOpen(p: Project): boolean {
  return Boolean(p.domain) && p.status !== "wip";
}

export function isPublicProjectId(id: string): boolean {
  return (PUBLIC_PROJECT_IDS as readonly string[]).includes(id);
}

export function findProjectBySlug(slug: string | undefined, isRu: boolean): Project | undefined {
  if (!slug) return undefined;
  return buildProjects(isRu).find((p) => p.id === slug);
}

/** Стабильный список id для sitemap и канонических путей /projects/:id */
export function allProjectIds(): string[] {
  return buildProjects(true).map((p) => p.id);
}



export function projectSubtitle(p: Project, lang: Lang): string {
  if (lang === "zh") return p.subtitleZh ?? p.subtitleEn;
  return lang === "ru" ? p.subtitleRu : p.subtitleEn;
}

export function projectDetails(p: Project, lang: Lang): string {
  if (lang === "zh") return p.detailsZh ?? p.detailsEn;
  return lang === "ru" ? p.detailsRu : p.detailsEn;
}
