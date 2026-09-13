import type { Lang } from "./LangProvider";

const COPY_RU = {
  seo: {
    title: "О TIVONIX — founder-led product engineering company",
    description:
      "TIVONIX проектирует и разрабатывает SaaS, fintech, marketplaces и бизнес-системы — от product scope и архитектуры до production и передачи доступов.",
  },
  hero: {
    title: "Инженерная ответственность от идеи до production",
    titleLines: ["От идеи", "до production", "с одним", "owner"],
    cta: "Обсудить продукт",
  },
  story: {
    paragraphs: [
      "TIVONIX вырос не из модели «делаем сайты». Практически в каждом серьёзном проекте интерфейс — только видимая часть системы: за ним роли и права, данные, интеграции, платежи, административные процессы, ошибки и эксплуатация.",
      "Поэтому мы начинаем не с количества экранов. Сначала фиксируем пользователей, ключевой workflow, границы первой версии и технические риски. Затем проектируем UX и архитектуру как одну систему и доводим её до рабочего production-релиза.",
      "Ключевые продуктовые и инженерные решения остаются founder-led. Под конкретный scope подключаются необходимые функции. Клиент получает production code, исходники, доступы и систему, которую можно поддерживать и развивать без искусственного vendor lock-in.",
    ],
  },
  mission: {
    label: "Принцип",
    title: "Строить систему, а не набор экранов",
    text: "Пользовательский продукт, операции, данные и интеграции должны работать как один контур. Мы проектируем связи между ними до того, как они становятся production-проблемами.",
  },
  vision: {
    label: "Фокус",
    title: "Сложный software должен оставаться управляемым",
    text: "Наша задача — уменьшить неопределённость, выбрать разумную границу первой версии и заложить решения, которые не придётся выбрасывать сразу после запуска.",
  },
  values: {
    label: "Как работаем",
    title: "Ownership, ясность и инженерная дисциплина",
    text: "Не набор абстрактных ценностей, а правила, по которым принимаются решения в проекте.",
    items: [
      {
        title: "Scope до кода",
        text: "Фиксируем пользователей, критические сценарии, ограничения и границы релиза до того, как разработка начинает создавать sunk cost.",
      },
      {
        title: "Production-first",
        text: "Думаем о данных, ролях, failure modes, миграциях, деплое и поддержке раньше, чем система становится сложной в эксплуатации.",
      },
      {
        title: "Проверяемые итерации",
        text: "Двигаемся небольшими релизами, где можно проверить продуктовую логику и технические решения до следующего слоя сложности.",
      },
      {
        title: "Контроль у клиента",
        text: "Передаём исходники и доступы. Архитектура и инфраструктура не должны удерживать клиента искусственным vendor lock-in.",
      },
    ],
  },
  why: {
    title: "Почему TIVONIX",
    text: "Мы полезны там, где недостаточно просто сверстать интерфейс — нужно понять продукт, спроектировать систему и отвечать за то, как она работает после релиза.",
    cta: "Разобрать задачу",
    items: [
      {
        key: "experience",
        title: "Реальные продуктовые контуры",
        text: "В портфолио есть fintech, marketplaces, кабинеты, operator/admin systems, Telegram Mini Apps, платежи, роли и интеграции — не только marketing pages.",
      },
      {
        key: "expertise",
        title: "Product + engineering в одном контексте",
        text: "UX, data model, permissions, integrations и delivery decisions принимаются вместе, а не передаются по цепочке между несвязанными подрядчиками.",
      },
      {
        key: "innovation",
        title: "AI без декоративного слоя",
        text: "Используем AI и automation только там, где можно показать конкретный workflow, контроль качества и бизнес-пользу.",
      },
      {
        key: "team",
        title: "Founder-led ownership",
        text: "Критические решения не уходят в безликий delivery layer. За product scope и техническую связность отвечает senior owner.",
      },
    ],
  },
  people: {
    title: "Как устроен delivery",
    text: "Не публикуем декоративный список команды. Есть подтверждённый founder-led owner, а необходимые функции подключаются под фактический scope проекта.",
    members: [
      { id: "danila", initials: "ДТ", name: "Данила Титовец", role: "Founder · Product architecture · Full-stack" },
      { id: "product", initials: "01", name: "Product & UX", role: "Flows · interfaces · design system" },
      { id: "frontend", initials: "02", name: "Frontend engineering", role: "Web · responsive · performance" },
      { id: "backend", initials: "03", name: "Backend & data", role: "API · data model · integrations" },
      { id: "quality", initials: "04", name: "Quality & release", role: "QA · tests · deployment checks" },
      { id: "operations", initials: "05", name: "Production support", role: "Observability · incidents · handover" },
    ],
  },
  join: { cta: "Обсудить продукт" },
} as const;

const COPY_EN = {
  seo: {
    title: "About TIVONIX — founder-led product engineering company",
    description:
      "TIVONIX designs and builds SaaS, fintech, marketplaces and business systems — from product scope and architecture to production and handover.",
  },
  hero: {
    title: "Engineering ownership from idea to production",
    titleLines: ["From idea", "to production", "with one", "owner"],
    cta: "Discuss your product",
  },
  story: {
    paragraphs: [
      "TIVONIX did not grow from a “we build websites” model. In serious products, the interface is only the visible layer. Behind it are roles and permissions, data, integrations, payments, operational workflows, failure modes and production constraints.",
      "That is why we do not start with a screen count. We first frame the users, the critical workflow, the first-release boundary and the technical risks. UX and architecture are then designed as one system and carried through to a working production release.",
      "Critical product and engineering decisions remain founder-led. The functions required by the actual scope are brought in around that ownership. The client receives production code, source, access and a system that can be maintained without artificial vendor lock-in.",
    ],
  },
  mission: {
    label: "Principle",
    title: "Build a system, not a collection of screens",
    text: "The customer product, operations, data and integrations need to work as one contour. We design the connections before they become production problems.",
  },
  vision: {
    label: "Focus",
    title: "Complex software should stay operable",
    text: "Our job is to reduce uncertainty, choose a sensible first-release boundary and make decisions that do not need to be thrown away immediately after launch.",
  },
  values: {
    label: "How we work",
    title: "Ownership, clarity and engineering discipline",
    text: "Not abstract values. These are the rules behind product and engineering decisions.",
    items: [
      { title: "Scope before code", text: "We define users, critical flows, constraints and release boundaries before implementation creates expensive sunk cost." },
      { title: "Production-first", text: "Data, roles, failure modes, migrations, deployment and support are considered before the system becomes difficult to operate." },
      { title: "Reviewable increments", text: "We ship in small enough slices to validate product logic and technical decisions before adding the next layer of complexity." },
      { title: "Client control", text: "Source and access are handed over. Architecture and infrastructure should not create artificial vendor lock-in." },
    ],
  },
  why: {
    title: "Why TIVONIX",
    text: "We are most useful when implementing screens is not enough — the product has to be understood, the system designed and its production behavior owned.",
    cta: "Review your problem",
    items: [
      { key: "experience", title: "Real product systems", text: "The portfolio includes fintech, marketplaces, portals, operator/admin systems, Telegram Mini Apps, payments, roles and integrations — not only marketing pages." },
      { key: "expertise", title: "Product + engineering in one context", text: "UX, data models, permissions, integrations and delivery decisions are made together rather than handed across disconnected vendors." },
      { key: "innovation", title: "AI without theatre", text: "We use AI and automation only where a concrete workflow, quality-control model and business value can be explained." },
      { key: "team", title: "Founder-led ownership", text: "Critical decisions do not disappear into a faceless delivery layer. A senior owner stays responsible for product scope and technical coherence." },
    ],
  },
  people: {
    title: "How delivery is structured",
    text: "We do not publish a decorative team roster. There is a verified founder-led owner, and the functions required by the actual project scope are added around that responsibility.",
    members: [
      { id: "danila", initials: "DT", name: "Danila Titovets", role: "Founder · Product architecture · Full-stack" },
      { id: "product", initials: "01", name: "Product & UX", role: "Flows · interfaces · design system" },
      { id: "frontend", initials: "02", name: "Frontend engineering", role: "Web · responsive · performance" },
      { id: "backend", initials: "03", name: "Backend & data", role: "API · data model · integrations" },
      { id: "quality", initials: "04", name: "Quality & release", role: "QA · tests · deployment checks" },
      { id: "operations", initials: "05", name: "Production support", role: "Observability · incidents · handover" },
    ],
  },
  join: { cta: "Discuss your product" },
} as const;

const COPY_ZH = {
  seo: {
    title: "关于 TIVONIX — Founder-led Product Engineering",
    description:
      "TIVONIX 从产品范围和架构开始，设计并开发 SaaS、金融科技、Marketplace 与业务系统，直到 production 上线与交接。",
  },
  hero: {
    title: "从产品想法到 production 的工程责任",
    titleLines: ["从产品想法", "到 production", "由一个", "owner 负责"],
    cta: "讨论您的产品",
  },
  story: {
    paragraphs: [
      "TIVONIX 不是从“做网站”的模式成长起来的。对于真正的软件产品，界面只是可见的一层；背后还有权限、数据、集成、支付、运营流程、失败场景与 production 约束。",
      "因此我们不会从页面数量开始。先明确用户、关键 workflow、第一版边界与技术风险，再把 UX 与架构作为同一套系统设计，并推进到可运行的 production release。",
      "关键的产品与工程决策保持 founder-led。根据实际 scope 配置所需职能。客户最终获得 production code、源码、访问权限，以及不依赖人为 vendor lock-in 的可维护系统。",
    ],
  },
  mission: {
    label: "原则",
    title: "构建系统，而不是堆叠页面",
    text: "客户产品、运营、数据与集成需要形成一个整体。我们在它们变成 production 问题之前设计好连接关系。",
  },
  vision: {
    label: "重点",
    title: "复杂软件也必须保持可运营",
    text: "我们的任务是降低不确定性，选择合理的第一版边界，并避免上线后马上推翻关键技术决策。",
  },
  values: {
    label: "工作方式",
    title: "Ownership、清晰与工程纪律",
    text: "这不是抽象口号，而是项目中做决定的规则。",
    items: [
      { title: "先定 scope", text: "先明确用户、关键流程、约束与发布边界，再进入会产生 sunk cost 的实现阶段。" },
      { title: "Production-first", text: "在系统变复杂之前考虑数据、权限、failure modes、迁移、部署与支持。" },
      { title: "可验证迭代", text: "用足够小的 release 验证产品逻辑和技术决策，再增加下一层复杂度。" },
      { title: "客户掌控", text: "移交源码与访问权限，架构和基础设施不应制造人为 vendor lock-in。" },
    ],
  },
  why: {
    title: "为什么选择 TIVONIX",
    text: "当项目不只是实现界面，而是需要理解产品、设计系统并对 production 行为负责时，我们的价值最明显。",
    cta: "梳理您的需求",
    items: [
      { key: "experience", title: "真实产品系统", text: "项目覆盖 fintech、marketplace、portal、operator/admin system、Telegram Mini App、支付、权限与集成。" },
      { key: "expertise", title: "Product + engineering 同一上下文", text: "UX、数据模型、权限、集成与交付决策一起完成，而不是在不同供应商之间反复 handoff。" },
      { key: "innovation", title: "不做 AI 表演", text: "只有在能说明具体 workflow、质量控制和业务价值时才使用 AI 与 automation。" },
      { key: "team", title: "Founder-led ownership", text: "关键决策不会消失在匿名 delivery layer 中，senior owner 持续负责 scope 与技术一致性。" },
    ],
  },
  people: {
    title: "Delivery 如何组织",
    text: "我们不发布装饰性的团队名单。由可确认的 founder-led owner 负责核心决策，再按真实 scope 配置所需职能。",
    members: [
      { id: "danila", initials: "DT", name: "Danila Titovets", role: "Founder · Product architecture · Full-stack" },
      { id: "product", initials: "01", name: "Product & UX", role: "Flows · interfaces · design system" },
      { id: "frontend", initials: "02", name: "Frontend engineering", role: "Web · responsive · performance" },
      { id: "backend", initials: "03", name: "Backend & data", role: "API · data model · integrations" },
      { id: "quality", initials: "04", name: "Quality & release", role: "QA · tests · deployment checks" },
      { id: "operations", initials: "05", name: "Production support", role: "Observability · incidents · handover" },
    ],
  },
  join: { cta: "讨论您的产品" },
} as const;

export function aboutCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "ru" ? COPY_RU : COPY_EN;
}
