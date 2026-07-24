import type { Lang } from "../i18n/LangProvider";
export type ProjectStatus = "live" | "wip";

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  /** Оригинал отзыва (напр. арабский) — показывается выше перевода */
  textAr?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitleRu: string;
  subtitleEn: string;
  detailsRu: string;
  detailsEn: string;
  domain?: string;
  tags: string[];
  cover?: string;
  /** Горизонтальная лента скриншотов на странице кейса */
  gallery?: string[];
  status?: ProjectStatus;
  outcomes?: string[];
  stack?: string[];
  testimonial?: Testimonial;
};

const UPC_DOMAIN = "https://upc.watch/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const LOGOVO_DOMAIN = "https://www.logovo24.by/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const SLOTTY_DOMAIN = "https://slotty.of.by/book";
const SPLITON_DOMAIN = "https://spliton.io/app";
const TIVONIXPANEL_DOMAIN = "https://tivonixpanel-production.up.railway.app/login";

/** Публичные кейсы на /projects (остальные скрыты, но остаются в каталоге) */
export const PUBLIC_PROJECT_IDS = [
  "tivonixpanel",
  "spliton",
  "slotty",
  "headmind",
  "logovo",
] as const;

const SLOTTY_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/slotty/${i + 1}.webp`);
const SPLITON_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/spliton/g${i + 1}.webp`);
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
        testimonial: {
          name: isRu ? "Артём К." : "Artem K.",
          role: isRu ? "Один из основателей TIVONIX" : "Co-founder, TIVONIX",
          text: isRu
            ? "Раньше статусы размазывались по чатам, выплаты сидели в таблицах. С панелью открыл кабинет и сразу понятно, где сделка и что дальше. Без воды, просто работает."
            : "Statuses used to live in chats, payouts in spreadsheets. With the panel you open the dashboard and know where the deal is. No fluff, it just works.",
        },
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
          "Сайт сети шиномонтажа LOGOVO в Минске: Figma → Next.js, 4 филиала, запись, карта, B2B — под ключ за 1 600 BYN, команда TIVONIX.",
        subtitleEn:
          "Website for LOGOVO tire network in Minsk: Figma → Next.js, 4 branches, booking, map, B2B — turnkey for 1,600 BYN by TIVONIX.",
        subtitleZh:
          "明斯克 LOGOVO 轮胎网络网站：Figma → Next.js，4 个分支机构，预订，地图，B2B — TIVONIX 交钥匙工程 1,600 BYN。",
        detailsRu:
          "Зачем это\n" +
          "Шиномонтаж выбирают не в кресле — **с дороги, одной рукой, пока мигает индикатор**. Если адрес, часы и «записаться» прячутся на трёх экранах — клиент уедет к тому, кто ответил быстрее.\n\n" +
          "Заказчик — **ООО «Логово»** (сеть шиномонтажа в Минске, УНП 193616584): **4 филиала**, два работают **24/7**, безнал для автопарков и такси, полный контур услуг — от шиномонтажа и правки дисков до хранения и кондиционера. Бюджет проекта — **1 600 BYN** ([[≈ 42 800 ₽]] / [[≈ 560 $]]). Сайт собрала **команда TIVONIX** под ключ — не шаблон и не «отдали архив».\n\n" +
          "Как работает\n" +
          "Человек с телефона открывает **logovo24.by** → услуга → филиал на карте / режим → **записаться** или **позвонить**. Автопарк идёт в B2B: безнал, единый прайс, документы на четырёх точках — без переписки «пришлите счёт».\n\n" +
          "Что внутри\n" +
          "Весь продукт сделали мы: **дизайн в Figma** (структура, mobile-first, CTA «с дороги»), потом разработка на **Next.js 16 + TypeScript + Tailwind v4** — статический экспорт под shared-хостинг. Не конструктор: ручная вёрстка, Leaflet-карта с геолокацией «найти меня», калькулятор «комплекс 4 колёса», до/после, отзывы, скидки, кейсы, FAQ, SEO (schema AutoRepair, sitemap, OG).\n\n" +
          "**11 услуг** с отдельными страницами и прайсом: шиномонтаж, грузовой, правка и покраска дисков, аргон, прокол, вулканизация, балансировка, проточка, хранение, кондиционер. **4 адреса** (Лещинского и Логойский тракт — 24/7; Гурского и Дзержинского — дневной режим). B2B-блок: такси / логистика / флоты, бейдж **75+ клиентов**. Запись: форма → mailto на сеть. Sticky-бар на мобиле: позвонить / записаться.\n\n" +
          "Визуал — светлая система **LOGOVO × Awesomic**: canvas `#f4f4f5`, ember-оранжевый `#ff5a00` только на CTA и бейджах 24/7, тёмные obsidian-блоки для контраста, крупные pill-кнопки, radius карточек 36px. Mobile-first — основной трафик с дороги.\n\n" +
          "Запуск под ключ\n" +
          "Помогли с **доменом logovo24.by**, **сами** подняли хостинг (**hoster.by** / cPanel), выгрузили статику `out/`, настроили прод. Полный цикл: идея → Figma → код → деплой.\n\n" +
          "Итог\n" +
          "Не «сайт за тысячу». **Рабочий инструмент сети LOGOVO** за [[≈ 560 $]]: запись, карта, B2B, дизайн и прод на **logovo24.by** — сделала команда TIVONIX.\n",
        detailsEn:
          "Why it matters\n" +
          "Tire service isn’t chosen from a couch — it’s chosen **from the road, one-handed, while a warning light blinks**. If address, hours and “book” hide across three screens, the client drives to whoever answers faster.\n\n" +
          "Client — **LOGOVO LLC** (Minsk tire network, UNP 193616584): **4 branches**, two open **24/7**, fleet billing for taxi and logistics, full service loop — fitting, wheel repair/paint, storage, A/C and more. Project budget — **1,600 BYN** ([[≈ 42,800 ₽]] / [[≈ $560]]). Built **turnkey by the TIVONIX team** — not a template, not “here’s a zip”.\n\n" +
          "How it works\n" +
          "Someone opens **logovo24.by** on a phone → service → branch on the map / hours → **book** or **call**. Fleets go to B2B: invoices, unified pricing, docs across four locations — no “send the contract” threads.\n\n" +
          "What’s inside\n" +
          "We built the whole product: **Figma design** (structure, mobile-first, on-the-road CTAs), then **Next.js 16 + TypeScript + Tailwind v4** — static export for shared hosting. No page builder: handmade layout, Leaflet map with “find me” geolocation, “4 wheels package” calculator, before/after, reviews, discounts, cases, FAQ, SEO (AutoRepair schema, sitemap, OG).\n\n" +
          "**11 services** with dedicated pages and pricing: fitting, commercial, wheel repair/paint, argon, puncture, vulcanizing, balancing, brake disc machining, storage, A/C. **4 addresses** (Leshchinskogo and Logoyskiy trakt — 24/7; Gurskogo and Dzerzhinskogo — daytime). B2B block: taxi / logistics / fleets, **75+ clients** badge. Booking: form → mailto to the network. Sticky mobile bar: call / book.\n\n" +
          "Visual system — light **LOGOVO × Awesomic**: canvas `#f4f4f5`, ember orange `#ff5a00` only on CTAs and 24/7 badges, dark obsidian blocks for contrast, large pill buttons, 36px card radius. Mobile-first — most traffic comes from the road.\n\n" +
          "Turnkey launch\n" +
          "We helped with the **logovo24.by** domain, **set up hosting ourselves** (**hoster.by** / cPanel), shipped the `out/` static build, wired production. Full cycle: idea → Figma → code → deploy.\n\n" +
          "Outcome\n" +
          "Not a “thousand-buck site”. A **working tool for the LOGOVO network** for [[≈ $560]]: booking, map, B2B, design and prod on **logovo24.by** — by the TIVONIX team.\n",
        detailsZh:
          "为什么这很重要\n轮胎保养不是在沙发上选择的，而是**在路上单手选择，同时警告灯闪烁**。如果地址、营业时间和“预订”隐藏在三个屏幕上，客户就会开车去找谁回答得更快。\n\n客户 — **LOGOVO LLC**（明斯克轮胎网络，UNP 193616584）：**4 个分支机构**，两个开放 **24/7**，出租车和物流车队计费，全方位服务循环 - 装配、车轮维修/喷漆、存储、空调等。项目预算 — **1,600 BYN** ([[≈ 42,800 ₽]] / [[≈ $560]])。 **由 TIVONIX 团队构建** — 不是模板，也不是“这是一个 zip”。\n\n它是如何运作的\n有人在电话上打开 **logovo24.by** → 服务 → 地图/时间上的分支 → **预订** 或 **致电**。车队转向 B2B：发票、统一定价、跨四个地点的文档 — 没有“发送合同”线程。\n\n里面有什么\n我们构建了整个产品：**Figma 设计**（结构、移动优先、路上 CTA），然后是**Next.js 16 + TypeScript + Tailwind v4** - 用于共享托管的静态导出。无页面构建器：手工布局、带有“找到我”地理位置的传单地图、“4 轮套餐”计算器、之前/之后、评论、折扣、案例、常见问题解答、SEO（自动修复架构、站点地图、OG）。\n\n**11 项服务** 与 ded所示页面和定价：装配、商业、车轮维修/喷漆、氩气、穿刺、硫化、平衡、制动盘加工、存储、空调。 **4 个地址**（Leshchinskogo 和 Logoyskiy trakt — 24/7；Gurskogo 和 Dzerzhinskogo — 白天）。 B2B 区块：出租车/物流/车队，**75+ 客户**徽章。预订：表格→邮寄至网络。粘性移动栏：通话/预订。\n\n视觉系统 - 浅 **LOGOVO × Awesomic**：画布“#f4f4f5”，仅在 CTA 和 24/7 徽章上使用琥珀橙色“#ff5a00”，深色黑曜石块用于对比，大药丸按钮，36px 卡片半径。移动优先——大部分流量来自道路。\n\n交钥匙启动\n我们帮助 **logovo24.by** 域，**设置我们自己的托管**（**hoster.by** / cPanel），运送 `out/` 静态构建、有线生产。完整周期：想法→Figma→代码→部署。\n\n结果\n不是“千元网站”。 **LOGOVO 网络的工作工具**，售价 [[≈ 560 美元]]：在 **logovo24.by** 上进行预订、地图、B2B、设计和产品 — 由 TIVONIX 团队提供。",
        domain: LOGOVO_DOMAIN,
        status: "live",
        tags: ["Website", "Next.js", "Local Business", "Booking", "B2B", "Figma"],
        cover: "/images/project-priew/logovo.webp",
        outcomes: [
          isRu
            ? "Бюджет **1 600 BYN** ([[≈ 42 800 ₽]] / [[≈ 560 $]])"
            : "Budget **1,600 BYN** ([[≈ 42,800 ₽]] / [[≈ $560]])",
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
          "Корпоративный сайт ООО «Хэдмайнд»: Figma → WordPress + Elementor, хостинг и домен headmind.ru — бюджет 100 000 ₽.",
        subtitleEn:
          "Corporate site for Headmind: Figma → WordPress + Elementor, hosting and domain headmind.ru — budget 100,000 ₽.",
        subtitleZh:
          "Headmind 的公司网站：Figma → WordPress + Elementor，托管和域名 headmind.ru — 预算 100,000 ₽。",
        detailsRu:
          "Зачем это\n" +
          "ООО «Хэдмайнд» — консалтинг по трансформации бизнеса: стратегия, цифровизация, оргдизайн, производство, контракты. В B2B часто **теряют сделку на первом касании**, если сайт говорит «обо всём и ни о чём». Нужен был сайт, который спокойно шлют в первом сообщении.\n\n" +
          "Заказчик — **Евгений Беликов**, основатель и генеральный директор ООО «Хэдмайнд» (соучредитель — Виталий Петровский). Бюджет — **100 000 ₽** ([[≈ 1 280 $]]). Прод: **headmind.ru**.\n\n" +
          "Как работает\n" +
          "Посетитель проходит короткий маршрут: **услуги** → **подход / экспертиза** → **команда** → **контакт / заявка**. На каждом шаге понятно, кто вы и чем сильны. CTA стоит там, где человек уже готов написать.\n\n" +
          "Что внутри\n" +
          "Сначала **макеты в Figma**: несколько визуальных вариантов на выбор — пока заказчику не «зашло». Потом дизайн и сборка на **WordPress + Elementor**: услуги (трансформация, цифровизация, HR, производство, контракты, продажи), команда, доверие, формы заявки.\n\n" +
          "Под ключ: подобрали и подключили **хостинг**, купили/привязали **домен headmind.ru**, выкатили в прод, настроили админку WordPress, чтобы контент правили сами. Стек не «с нуля на React» — осознанный выбор: быстрый запуск, удобное редактирование, спокойный B2B-сайт.\n\n" +
          "Что сделали\n" +
          "Figma (выборка вариантов) → дизайн → WordPress/Elementor → хостинг + домен → живой **headmind.ru**. Упаковали экспертизу в маршрут до заявки.\n\n" +
          "Итог\n" +
          "Не шаблон «поставьте логотип». **Корпоративный сайт под ключ** для Евгения Беликова / ООО «Хэдмайнд»: 100 000 ₽, Figma → WP, домен и хостинг — можно открыть и проверить самому.\n",
        detailsEn:
          "Why it matters\n" +
          "Headmind is a business-transformation consultancy: strategy, digitalization, org design, production, contracts. In B2B you often **lose the deal on first contact** if the site says everything and nothing. They needed a site you can send in the first message.\n\n" +
          "Client — **Evgeniy Belikov**, founder and CEO of Headmind (co-founder — Vitaliy Petrovsky). Budget — **100,000 ₽** ([[≈ $1,280]]). Live: **headmind.ru**.\n\n" +
          "How it works\n" +
          "A visitor follows a short path: **services** → **approach / expertise** → **team** → **contact / lead**. At every step it’s clear who you are and why you’re strong. CTAs sit where people are already ready to write.\n\n" +
          "What’s inside\n" +
          "First **Figma mockups**: several visual directions until the client picked a favourite. Then design and build on **WordPress + Elementor**: services (transformation, digitalization, HR, production, contracts, sales), team, trust, lead forms.\n\n" +
          "Turnkey: hosting set up, **domain headmind.ru** connected, shipped to production, WordPress admin ready so they can edit content themselves. Not a custom React build on purpose — fast launch, easy editing, a calm B2B site.\n\n" +
          "What we delivered\n" +
          "Figma (variant selection) → design → WordPress/Elementor → hosting + domain → live **headmind.ru**. Expertise packaged into a path to a lead.\n\n" +
          "Outcome\n" +
          "Not a “drop your logo” template. A **turnkey corporate site** for Evgeniy Belikov / Headmind: 100,000 ₽, Figma → WP, domain and hosting — open it and check yourself.\n",
        detailsZh:
          "为什么这很重要\nHeadadmind 是一家业务转型咨询公司：战略、数字化、组织设计、生产、合同。在 B2B 中，如果网站什么都说了，但什么也没说，你常常**在第一次接触时就失去了交易**。他们需要一个您可以在第一条消息中发送的网站。\n\n客户 — **Evgeniy Belikov**，Headmind 创始人兼首席执行官（联合创始人 — Vitaliy Petrovsky）。预算 — **100,000 ₽** ([[≈ $1,280]])。直播：**headmind.ru**。\n\n它是如何运作的\n访客遵循一条简短的路径：**服务**→**方法/专业知识**→**团队**→**联系人/领导**。每一步都清楚你是谁以及你为何强大。 CTA 位于人们已经准备好写作的地方。\n\n里面有什么\n首先**Figma 模型**：几个视觉方向，直到客户选择了最喜欢的。然后在 **WordPress + Elementor** 上进行设计和构建：服务（转型、数字化、人力资源、生产、合同、销售）、团队、信任、潜在客户表单。\n\n统包：托管设置、**域名 headmind.ru** 连接、交付生产、WordPress 管理员准备就绪，以便他们可以自己编辑内容。不是专门定制的 React 构建——快速启动、轻松编辑、平静的 B2B 网站。\n\n我们交付了什么\nFigma（变体选择）→设计→WordPress/Elementor → 托管 + 域名 → 直播 **headmind.ru**。专业知识融入了通往潜在客户的道路。\n\n结果\n不是“放弃您的徽标”模板。 Evgeniy Belikov / Headadmind 的 **交钥匙企业网站**：100,000 ₽，Figma → WP、域名和托管 - 打开它并自行检查。",
        domain: HEADMIND_DOMAIN,
        status: "live",
        tags: ["B2B", "WordPress", "Elementor", "Figma", "Corporate"],
        cover: "/images/project-priew/headmind.webp",
        outcomes: [
          isRu
            ? "Заказчик **Евгений Беликов** · бюджет [[≈ 1 280 $]]"
            : "Client **Evgeniy Belikov** · budget [[≈ $1,280]]",
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
          "Полный маркетплейс записи к мастерам: каталог с фильтрами и картой, Telegram Mini App, кабинет мастера (SaaS Free/Pro), platform-admin, bePaid — на Railway, домен slotty.of.by.",
        subtitleEn:
          "Full booking marketplace for masters: filtered catalog + map, Telegram Mini App, master SaaS cabinet (Free/Pro), platform admin, bePaid — on Railway, domain slotty.of.by.",
        subtitleZh:
          "大师的完整预订市场：过滤目录 + 地图、Telegram Mini App、大师 SaaS 柜（免费/专业版）、平台管理、bePaid — on Railway、域名 slotty.of.by。",
        detailsRu:
          "Зачем это\n" +
          "Запись к мастеру до сих пор часто живёт в **Direct и WhatsApp**: «есть на завтра?», «а через час?», «ой, забыла напомнить». Клиент устаёт писать. Мастер устаёт отвечать. Слоты пропадают в тишине чата.\n\n" +
          "Нужен был не черновик и не «кнопка записаться», а **полный маркетплейс**: каталог с жёсткой фильтрацией, карта, путь клиента, SaaS-кабинет мастера, роли, platform-admin, оплаты, уведомления и прод. Заказчик — **Виктория Д.** Бюджет — 230 000 ₽ ([[≈ 2 940 $]]). Срок — **3 недели**.\n\n" +
          "Как работает\n" +
          "Клиент открывает **slotty.of.by** (сайт или Telegram Mini App) → каталог → фильтры / карта → мастер → услуга → **свободный слот** → подтверждение. Код записи, напоминания в Telegram и email — без звонков.\n" +
          "Мастер в кабинете ведёт профиль, портфолио, адрес, услуги, акции, расписание, заявки и клиентов; тариф Free или Pro.\n" +
          "Platform-admin модерирует мастеров, записи, биллинг, платежи bePaid, рассылки и журнал — платформой можно рулить уже сейчас.\n\n" +
          "Что внутри\n" +
          "Это **крупная разработка**, не лендинг с формой. Фронт: React + TypeScript + Vite + Tailwind. Бэкенд: Express API, PostgreSQL (**88 миграций**), JWT-сессии. Прод: **два сервиса на Railway** (web + api), домен **slotty.of.by** — подсказали, где купить домен, подняли хостинг, привязали DNS и выкатили в бой. Плюс Telegram Bot / Mini App, Google Auth, email (Resend), карты (Leaflet / OSM, опционально Яндекс), платежи **bePaid** (BYN), Sentry, SEO-prerender.\n\n" +
          "Маркетплейс для клиента: **6 категорий** (маникюр, барберы, брови/ресницы, массаж, фитнес, тату). Каталог — не «список карточек», а полноценный поиск: все / популярные / акции / новинки, текстовый поиск, **карта с геосортировкой**.\n\n" +
          "Фильтры: сортировка (рекомендации, популярность, ближайший слот, расстояние, рейтинг, цена ↑↓, отзывы); дата (сегодня / завтра / неделя / выходные / точный день); время суток и слайдер часов; визит в салоне или на дому; длительность; цена в BYN; рейтинг от 4.5 / 4.7 / 4.9; число отзывов; только верифицированные; только с акциями; только с онлайн-записью. Запись: дата → слот → комментарий → референс-фото → успех с кодом **SL-…**. Профиль клиента: записи, избранное, уведомления, настройки, отзыв после визита.\n\n" +
          "Кабинет мастера — отдельный SaaS: сегодня / заявки / расписание / услуги (каталог, цены, пакеты, акции) / профиль и портфолио / клиенты / репутация / биллинг / уведомления (десятки типов событий). Онбординг в **8 шагов**: категории → профиль → адрес на карте → услуги → доверие → превью → тариф. Тарифы: Free (лимиты) / Pro / trial 7 дней — оплата bePaid или ручной перевод.\n\n" +
          "Platform-admin: обзор, заявки (категории, удаления, спонсорство, жалобы), поддержка, статус системы, пользователи, мастера, услуги, записи (в т.ч. проблемные отмены), биллинг и промокоды, платежи bePaid, рассылки, аудит. Роли: **client / master / platform_admin**. Auth: email, Google, Telegram — с телефона и с компьютера.\n\n" +
          "Сложные куски, которые обычно «ломают» сроки: concurrent booking и слоты, pending expiry, auto-complete, споры по записи; entitlements Free/Pro; очередь уведомлений; multi-identity auth; серверный каталог с 20+ параметрами фильтра и Pro-boost в рекомендациях.\n\n" +
          "Что сделали\n" +
          "Дизайн + разработка под ключ: маркетплейс, кабинеты, админка, интеграции, домен и хостинг. Продукт на **slotty.of.by** — **скоро запуск к настоящим клиентам и мастерам**.\n\n" +
          "Итог\n" +
          "Не демо «посмотрите идею». **Полный маркетплейс записи** с фильтрами, картой, Mini App, SaaS мастера и platform-admin. Виктория Д., [[≈ 2 940 $]], 3 недели — и живой прод, куда можно зайти и проверить самому.\n",
        detailsEn:
          "Why it matters\n" +
          "Booking a master still often lives in **DMs and WhatsApp**: “free tomorrow?”, “in an hour?”, “oops, forgot to remind”. Clients get tired of typing. Masters get tired of answering. Slots vanish into chat silence.\n\n" +
          "This wasn’t a draft or a “book now” button. It needed a **full marketplace**: filtered catalog, map, client path, master SaaS cabinet, roles, platform admin, payments, notifications and production. Client — **Victoria D.** Budget — 230,000 ₽ ([[≈ $2,940]]). Timeline — **3 weeks**.\n\n" +
          "How it works\n" +
          "Client opens **slotty.of.by** (web or Telegram Mini App) → catalog → filters / map → master → service → **open slot** → confirm. Booking code, Telegram + email reminders — no calls.\n" +
          "Masters run profile, portfolio, address, services, promos, schedule, requests and clients; Free or Pro plan.\n" +
          "Platform admin moderates masters, bookings, billing, bePaid payments, broadcasts and audit — the platform is operable now.\n\n" +
          "What’s inside\n" +
          "A **large build**, not a landing with a form. Frontend: React + TypeScript + Vite + Tailwind. Backend: Express API, PostgreSQL (**88 migrations**), JWT sessions. Production: **two Railway services** (web + api), domain **slotty.of.by** — we advised where to buy the domain, set up hosting, pointed DNS and shipped live. Plus Telegram Bot / Mini App, Google Auth, email (Resend), maps (Leaflet / OSM, optional Yandex), **bePaid** (BYN), Sentry, SEO prerender.\n\n" +
          "Client marketplace: **6 categories** (manicure, barbers, brows/lashes, massage, fitness, tattoo). Catalog isn’t a flat card list — full search: all / popular / promos / new, text search, **map with geo sort**.\n\n" +
          "Filters: sort (recommended, popular, soonest, distance, rating, price ↑↓, reviews); date (today / tomorrow / week / weekend / exact day); time of day + hour slider; studio or at-home; duration; BYN price; rating from 4.5 / 4.7 / 4.9; review count; verified only; promos only; online booking only. Booking: date → slot → comment → reference photos → success with code **SL-…**. Client profile: appointments, favorites, notifications, settings, post-visit review.\n\n" +
          "Master cabinet is a separate SaaS: today / requests / schedule / services (catalog, prices, bundles, promos) / profile & portfolio / clients / reputation / billing / notifications (dozens of event types). **8-step** onboarding: categories → profile → map address → services → trust → preview → plan. Plans: Free (limits) / Pro / 7-day trial — bePaid or manual transfer.\n\n" +
          "Platform admin: overview, requests (category changes, deletions, sponsorship, reports), support, system status, users, masters, services, bookings (incl. problem cancellations), billing & promo codes, bePaid payments, broadcasts, audit. Roles: **client / master / platform_admin**. Auth: email, Google, Telegram — phone or desktop.\n\n" +
          "Hard pieces that usually blow timelines: concurrent booking & slots, pending expiry, auto-complete, booking disputes; Free/Pro entitlements; notification job queue; multi-identity auth; server catalog with 20+ filter params and Pro boost in recommendations.\n\n" +
          "What we delivered\n" +
          "Design + turnkey build: marketplace, cabinets, admin, integrations, domain and hosting. Live on **slotty.of.by** — **soon launching to real clients and masters**.\n\n" +
          "Outcome\n" +
          "Not a “look at the idea” demo. A **full booking marketplace** with filters, map, Mini App, master SaaS and platform admin. Victoria D., [[≈ $2,940]], 3 weeks — and a live prod you can open and check yourself.\n",
        detailsZh:
          "为什么这很重要\n预订大师仍然经常存在于**DM和WhatsApp**中：“明天有空吗？”，“一个小时后？”，“哎呀，忘了提醒”。客户厌倦了打字。大师们厌倦了回答。老虎机消失在聊天的沉默中。\n\n这不是草稿或“立即预订”按钮。它需要一个**完整的市场**：过滤目录、地图、客户路径、主 SaaS 柜、角色、平台管理、支付、通知和生产。客户 — **Victoria D.** 预算 — 230,000 ₽ ([[≈ $2,940]])。时间表 — **3 周**。\n\n它是如何运作的\n客户端打开**slotty.of.by**（网络或Telegram迷你应用程序）→目录→过滤器/地图→主→服务→**打开插槽**→确认。预订代码、电报 + 电子邮件提醒 — 无需致电。\n大师运行简介、投资组合、地址、服务、促销、时间表、请求和客户；免费或专业计划。\n平台管理员负责管理、预订、计费、bePaid 付款、广播和审计——该平台现已可运行。\n\n里面有什么\n**大型建筑**，而不是带有形式的平台。前端：React + TypeScript + Vite + Tailwind。后端：Express API、PostgreSQL（**88 迁移**）、JWT 会话。生产：**两个铁路服务**（Web + API），域名**slotty.of.by** - 我们建议d 在哪里购买域名、设置托管、指向 DNS 并实时发货。加上 Telegram Bot / Mini App、Google Auth、电子邮件（重新发送）、地图（传单 / OSM、可选 Yandex）、**bePaid** (BYN)、Sentry、SEO 预渲染。\n\n客户市场：**6 个类别**（美甲、理发、眉毛/睫毛、按摩、健身、纹身）。目录不是平面卡片列表 - 完整搜索：所有/流行/促销/新，文本搜索，**带地理排序的地图**。\n\n过滤器：排序（推荐、热门、最快、距离、评分、价格↑↓、评论）；日期（今天/明天/周/周末/确切日期）；一天中的时间+小时滑块；工作室或家里；期间; BYN 价格；评分从 4.5 / 4.7 / 4.9 起；评论计数；仅经过验证；仅促销；仅限网上预订。预订：日期→时段→评论→参考照片→使用代码**SL-…**成功。客户资料：约会、收藏夹、通知、设置、访问后回顾。\n\n主柜是一个单独的 SaaS：今天/请求/时间表/服务（目录、价格、捆绑、促销）/配置文件和投资组合/客户/声誉/计费/通知（数十种事件类型）。 **8步**入职：类别→个人资料→地图地址→服务→信任→预览→计划。计划：免费（限制）/ Pro / 7 天试用 — 付费或手动转账。\n\n平台管理：概述、请求（类别更改、删除、赞助、报告）、支持、系统状态、用户、主、服务、预订（包括问题取消）、计费和促销代码、bePaid 付款、广播、审计。角色：**客户端/主控/平台管理员**。身份验证：电子邮件、Google、Telegram - 手机或桌面。\n\n通常会破坏时间线的困难部分：并发预订和时段、待到期、自动完成、预订争议；免费/专业版权利；通知作业队列；多重身份验证；具有 20 多个过滤器参数和专业增强推荐的服务器目录。\n\n我们交付了什么\n设计+交钥匙构建：市场、橱柜、管理、集成、域名和托管。在 **slotty.of.by** 上直播 — **即将向真正的客户和大师推出**。\n\n结果\n不是“看看这个想法”的演示。 **完整的预订市场**，包含过滤器、地图、迷你应用程序、主 SaaS 和平台管理。 Victoria D.，[[≈ $2,940]]，3 周 — 以及您可以自己打开并检查的实时产品。",
        domain: SLOTTY_DOMAIN,
        status: "live",
        tags: ["Marketplace", "Booking", "Beauty", "SaaS", "Telegram", "Admin Panel"],
        cover: "/images/project-priew/slotty.webp",
        gallery: SLOTTY_GALLERY,
        outcomes: [
          isRu
            ? "**Полный маркетплейс** за 3 недели — не MVP"
            : "**Full marketplace** in 3 weeks — not an MVP",
          isRu
            ? "Каталог с **фильтрами + карта** · Mini App · Free/Pro"
            : "Catalog with **filters + map** · Mini App · Free/Pro",
          isRu
            ? "Домен **slotty.of.by** · хостинг Railway (web + api)"
            : "Domain **slotty.of.by** · Railway hosting (web + api)",
          isRu
            ? "Виктория Д. · [[≈ 2 940 $]] · скоро запуск к живым клиентам"
            : "Victoria D. · [[≈ $2,940]] · soon launching to live clients",
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
            ? "Мне нужен был нормальный маркетплейс: фильтры, кабинет мастера, админка. Не демо. За три недели собрали на нашем домене, уже можно звать реальных клиентов."
            : "I needed a real marketplace: filters, master cabinet, admin. Not a demo. In three weeks it was on our domain and ready for real clients.",
        },
      },

      // 8) SPLITON — финтех-платформа для музыкальных активов
      {
        id: "spliton",
        title: "Spliton",
        subtitleRu:
          "Финтех-платформа для долей в музыке: каталог, первичный и вторичный рынок, кошелёк USDT, ledger, compliance и operator portal — продукт с инвестором и живым сопровождением.",
        subtitleEn:
          "Fintech platform for music shares: catalog, primary & secondary market, USDT wallet, ledger, compliance and operator portal — investor-backed product with ongoing support.",
        subtitleZh:
          "音乐股票的金融科技平台：目录、一级和二级市场、USDT 钱包、账本、合规性和运营商门户——投资者支持的产品，并提供持续支持。",
        detailsRu:
          "Зачем это\n" +
          "Музыкальные активы — не лендинг с кнопкой «купить». Здесь **реальные деньги**, роли, согласия, депозиты и выводы должны сходиться без дыр: confirm → processing → result. Один сбой на выплате или consent — и доверие кончается быстрее любого релиза.\n\n" +
          "Нужна была не «админка на коленке», а **полноценная биржа долей**: кабинет инвестора, operator portal, ledger, treasury, KYC/AML, споры, публичный trust center. Мы собрали это end-to-end — и **до сих пор сопровождаем** продукт в бою.\n\n" +
          "Как работает\n" +
          "Инвестор регистрируется, проходит согласия и при необходимости KYC, пополняет баланс в **USDT (TRC20)**.\n" +
          "Дальше: выбирает релиз в каталоге → изучает data room → покупает доли (UNT) на первичке → видит позиции и начисления в кабинете → при желании торгует на **вторичном рынке** (стакан, лимитные заявки) → выводит средства через проверку treasury.\n" +
          "Оператор ведёт депозиты, выводы, compliance, релизы, рефералов, споры и публичный статус системы — всё из admin-портала.\n\n" +
          "Что внутри\n" +
          "Это **крупный продукт в одном репозитории**, не одностраничный сайт. Клиентская часть на Next.js, сервер на NestJS, база PostgreSQL через Prisma, автотесты на критичные денежные сценарии.\n\n" +
          "Кабинет инвестора: каталог релизов, покупка долей, портфель и метрики, кошелёк (пополнение, вывод, история, выписки), **вторичный рынок со сложным биржевым стаканом** и лимитными заявками, калькулятор, новости, поддержка и центр споров, реферальная и партнёрская программы, VIP.\n\n" +
          "Публичная часть: лендинг продукта, **центр доверия** (учёт операций, статус сервисов, документы), страница статуса системы, комиссии, юридические тексты, справочный центр.\n\n" +
          "Портал оператора — отдельная **огромная админ-панель** для команды платформы: не пара экранов, а десятки разделов управления. Главный обзор, задачи операторов, пользователи и роли, треки и раунды, артисты, лейблы, жанры.\n\n" +
          "Финансы: кошельки, пополнения, **выплаты**, позиции, доход и доход платформы, казначейство, платёжные реквизиты. Рынок: вторичный рынок, сделки, подозрительные операции. Операции: поддержка, споры, комплаенс, KYC, юридические тексты, рефералы и партнёры.\n\n" +
          "Аналитика с **графиками**: финансы, пользователи, треки, рынок, доход, риски, операции. Плюс отчёты и выгрузки, новости, справочный центр, статус системы, уведомления, журнал аудита действий сотрудников. Роли: супер-админ, бухгалтер, контент, поддержка, комплаенс, бизнес-аналитик.\n\n" +
          "Финансовое ядро: внутренний учёт операций с двойной записью, сверки, комиссии платформы, автоматизация депозитов в сети TRON, политика горячего и холодного кошелька, регламенты инцидентов. Интерфейс на acid lime `#b7f500` — как в живом продукте.\n\n" +
          "Языки: интерфейс полностью на **четырёх языках** — русский, английский, испанский, португальский.\n\n" +
          "Что сделали\n" +
          "Спроектировали и собрали весь контур: дизайн, фронтенд, бэкенд, база, комплаенс, автотесты и продакшен-операции. Продукт запущен, в него зашёл инвестор на [[200 000 $]], платформа в работе — **TIVONIX продолжает поддержку и развитие**.\n\n" +
          "Итог\n" +
          "Не демо и не презентация. **Живая финтех-платформа** с кабинетом инвестора, сложной биржей долей и огромной админкой под выплаты, графики и операционное управление. Сопровождаем до сих пор.\n",
        detailsEn:
          "Why it matters\n" +
          "Music assets aren’t a landing page with a buy button. **Real money**, roles, consents, deposits and withdrawals have to lock without holes: confirm → processing → result. One payout or consent failure — and trust dies faster than any release.\n\n" +
          "This wasn’t a “quick admin”. It needed a **full share exchange**: investor cabinet, operator portal, ledger, treasury, KYC/AML, disputes, public trust center. We built it end-to-end — and **still support** it in production.\n\n" +
          "How it works\n" +
          "An investor signs up, accepts policies, completes KYC when required, and tops up in **USDT (TRC20)**.\n" +
          "Then: pick a release in the catalog → review the data room → buy shares (UNT) on primary → track positions and accruals → optionally trade on the **secondary market** (order book, limit orders) → withdraw through treasury checks.\n" +
          "Operators run deposits, withdrawals, compliance, releases, referrals, disputes and public system status — all from the admin portal.\n\n" +
          "What’s inside\n" +
          "A **large product in one repository**, not a single-page site. Client app on Next.js, server on NestJS, PostgreSQL via Prisma, automated tests on critical money flows.\n\n" +
          "Investor cabinet: release catalog, share purchase, portfolio and metrics, wallet (deposit, withdraw, history, statements), **secondary market with a complex order book** and limit orders, calculator, news, support and dispute center, referral and partner programs, VIP.\n\n" +
          "Public surface: product landing, **trust center** (operations ledger, service status, documents), system status page, fees, legal pages, help center.\n\n" +
          "The operator portal is a **huge admin panel** for the platform team: not a few screens, but dozens of management sections. Executive overview, operator tasks, users and roles, tracks and rounds, artists, labels, genres.\n\n" +
          "Finance: wallets, deposits, **payouts**, holdings, revenue and platform revenue, treasury, payment requisites. Market: secondary market, trades, suspicious activity. Operations: support, disputes, compliance, KYC, legal texts, referrals and partners.\n\n" +
          "Analytics with **charts**: finance, users, tracks, market, revenue, risk, operations. Plus reports and exports, news, help center, system status, notifications, staff audit log. Roles: super admin, accountant, content, support, compliance, business analyst.\n\n" +
          "Financial core: internal double-entry operations ledger, reconciliation, platform fees, TRON deposit automation, hot/cold wallet policy, incident runbooks. Interface on acid lime `#b7f500` — matching the live product.\n\n" +
          "Languages: the interface is fully localized in **four languages** — Russian, English, Spanish, Portuguese.\n\n" +
          "What we delivered\n" +
          "Designed and shipped the full loop: design, frontend, backend, database, compliance, automated tests and production ops. The product is live, backed by an investor at [[$200,000]], and **TIVONIX still supports and evolves** it.\n\n" +
          "Outcome\n" +
          "Not a demo and not a deck. A **live fintech platform** with an investor cabinet, a complex share exchange and a huge admin for payouts, charts and day-to-day operations. Still supported.\n",
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
            ? "Полный финтех-контур: кабинет + биржа долей + портал оператора"
            : "Full fintech loop: cabinet + share exchange + operator portal",
          isRu
            ? "Огромная админка: выплаты, казначейство, графики, комплаенс"
            : "Huge admin: payouts, treasury, charts, compliance",
          isRu
            ? "Учёт операций, KYC, центр доверия, USDT TRC20"
            : "Operations ledger, KYC, trust center, USDT TRC20",
          isRu
            ? "Инвестор [[200 000 $]] · продукт в продакшене"
            : "Investor [[$200,000]] · live in production",
          isRu
            ? "**TIVONIX сопровождает** платформу до сих пор"
            : "**TIVONIX still supports** the platform",
          isRu
            ? "4 языка: русский, английский, испанский, португальский"
            : "4 languages: Russian, English, Spanish, Portuguese",
          isRu
            ? "Сложный биржевой стакан на вторичном рынке"
            : "Complex order book on the secondary market",
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
            ? "У Spliton тяжёлая начинка: доли, кошелёк, выплаты, большая админка. Собрали целиком, выкатили в прод и не пропали. С ними спокойно идти дальше."
            : "Spliton is heavy: shares, wallet, payouts, a big admin. They built the full stack, shipped to production, and stayed around. Easy to keep going with them.",
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

/** All catalog projects that have a client testimonial (incl. non-public cases). */
export function projectsWithTestimonials(isRu: boolean): Project[] {
  return buildAllProjects(isRu).filter((p) => Boolean(p.testimonial));
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
