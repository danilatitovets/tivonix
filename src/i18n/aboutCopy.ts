import type { Lang } from "./LangProvider";

const COPY_RU = {
  seo: {
    title: "О компании — TIVONIX",
    description:
      "TIVONIX — продуктовая инженерия под руководством основателя: SaaS, финтех, маркетплейсы, внутренние платформы, AI-автоматизация и запуск боевых систем.",
  },
  hero: {
    title: "Продуктовая инженерия от основателя",
    titleLines: ["Продуктовая", "инженерия", "от основателя"],
    cta: "Обсудить продукт",
  },
  story: {
    paragraphs: [
      "TIVONIX вырос из простой проблемы: бизнесу часто продают отдельные куски — дизайн, клиентскую часть, серверную часть, бота, админку — а за рабочий результат между ними никто не отвечает.",
      "Работа под руководством основателя оставляет ответственность в одном месте. Данила Титовец отвечает за формулировку продукта, архитектуру, разработку, интеграции, тестирование, запуск и передачу системы.",
      "TIVONIX строит SaaS, финтех, маркетплейсы, системы уровня CRM/ERP, кабинеты клиентов, продукты в Телеграме и AI-автоматизацию. Сначала объём и риски, потом код. После запуска исходники, доступы и понятная передача остаются у клиента.",
    ],
  },
  mission: {
    label: "Миссия",
    title: "Запускать системы, которые работают",
    text: "Помогаем компаниям превращать сложную задачу в понятный продукт: пользователи, роли, данные, интеграции, запуск и передача в одном процессе.",
  },
  vision: {
    label: "Видение",
    title: "Один технический владелец результата",
    text: "Клиенту не нужен набор подрядчиков, которые передают друг другу ответственность. Ему нужен человек, который держит продуктовую логику, архитектуру и запуск вместе.",
  },
  values: {
    label: "Ценности",
    title: "Скорость, ясность и ответственность",
    text: "Так мы работаем на каждом проекте — от первого сообщения до передачи доступов.",
    items: [
      {
        title: "Скорость",
        text: "Быстрый старт и короткие итерации: промежуточный результат видно уже в первые недели, а не в конце.",
      },
      {
        title: "Ясность",
        text: "Фиксируем объём, сроки и границы до старта. Понятно, что входит в работу и что остаётся на следующий этап.",
      },
      {
        title: "Ответственность",
        text: "Отвечаем за результат: сценарии заявок, статусы и ключевые пути пользователя проверяем до релиза.",
      },
      {
        title: "Прозрачность",
        text: "Передаём код и доступы. Конфиденциальность и контроль над системой остаются у вас.",
      },
    ],
  },
  why: {
    title: "Почему TIVONIX",
    text: "TIVONIX соединяет продукт, UX, серверную часть, интеграции и релиз в один контур ответственности.",
    cta: "Обсудить продукт",
    items: [
      {
        key: "experience",
        title: "Опыт",
        text: "Делаем живые проекты: финтех, маркетплейсы, AI-коммерция, кабинеты клиентов, админки, платежи и мини-приложения в Телеграме.",
      },
      {
        key: "expertise",
        title: "Экспертиза",
        text: "Умеем упрощать сложное: роли, процессы, статусы, модель данных, интеграции и крайние случаи при запуске.",
      },
      {
        key: "innovation",
        title: "Технологии",
        text: "Современный стек, AI только там, где он экономит время, и осторожная архитектура без ненужного веса.",
      },
      {
        key: "team",
        title: "Ответственность основателя",
        text: "Решения по объёму, архитектуре, релизу и передаче не размазаны по безликой студии.",
      },
    ],
  },
  people: {
    title: "Как закрываются роли в проекте",
    text: "Реальная модель: Данила держит техническую ответственность, а внутри проекта закрываются нужные роли.",
    members: [
      { id: "product", initials: "PX", name: "Продукт и UX", role: "Постановка, сценарии, интерфейсы" },
      { id: "frontend", initials: "FE", name: "Клиентская часть", role: "React, состояния, адаптив, скорость" },
      { id: "backend", initials: "BE", name: "Серверная часть и данные", role: "API, база, роли, интеграции" },
      { id: "quality", initials: "QA", name: "Качество", role: "Сценарии, формы, ошибки, доступность" },
      { id: "release", initials: "RL", name: "Релиз", role: "Развёртывание, окружения, SEO, передача" },
      { id: "support", initials: "PS", name: "Поддержка", role: "Запуск, гарантия, развитие" },
    ],
  },
  join: {
    cta: "Начать разговор",
  },
} as const;

const COPY_EN = {
  seo: {
    title: "About — TIVONIX",
    description:
      "TIVONIX is a founder-led product engineering company for SaaS, FinTech, marketplaces, internal platforms, AI automation and production software systems.",
  },
  hero: {
    title: "Founder-led product engineering",
    titleLines: ["Founder-led", "product", "engineering"],
    cta: "Discuss the product",
  },
  story: {
    paragraphs: [
      "TIVONIX grew from a simple problem: companies are often sold separate pieces — design, frontend, backend, a bot, an admin panel — while nobody owns the working outcome between them.",
      "The founder-led model keeps ownership in one place. Danila Titovets owns product framing, architecture, engineering, integrations, QA, release and system handover.",
      "TIVONIX builds SaaS, fintech, marketplaces, CRM/ERP-like systems, client portals, Telegram products and AI automation. Scope and risks first, code second. After launch: source code, access and clear handover stay with the client.",
    ],
  },
  mission: {
    label: "Mission",
    title: "Ship working software systems",
    text: "We help companies turn complex tasks into clear products: users, roles, data, integrations, production and handover in one process.",
  },
  vision: {
    label: "Vision",
    title: "One technical owner for the outcome",
    text: "Clients do not need a chain of vendors passing responsibility around. They need one person keeping product logic, architecture and launch together.",
  },
  values: {
    label: "Values",
    title: "Speed, clarity, accountability",
    text: "How we work on every project — from the first message to handing over access.",
    items: [
      {
        title: "Speed",
        text: "Fast kickoff and short iterations: you see intermediate progress in the first weeks, not only at the end.",
      },
      {
        title: "Clarity",
        text: "We lock scope, timeline and boundaries before start. What’s in and what’s next is explicit.",
      },
      {
        title: "Accountability",
        text: "We own the outcome: lead flows, statuses and key user paths are checked before release.",
      },
      {
        title: "Transparency",
        text: "We hand over code and access. Privacy and control of the system stay with you.",
      },
    ],
  },
  why: {
    title: "Why TIVONIX",
    text: "TIVONIX connects product, UX, backend, integrations and release in one ownership loop.",
    cta: "Discuss the product",
    items: [
      {
        key: "experience",
        title: "Experience",
        text: "Live projects across fintech, marketplaces, AI commerce, client portals, admin panels, payments and Telegram Mini Apps.",
      },
      {
        key: "expertise",
        title: "Expertise",
        text: "We simplify hard parts: roles, workflows, statuses, data models, integrations and production edge cases.",
      },
      {
        key: "innovation",
        title: "Technology",
        text: "Modern stack, AI only where it saves time, and careful architecture without unnecessary weight.",
      },
      {
        key: "team",
        title: "Founder-led ownership",
        text: "Scope, architecture, release and handover decisions are not blurred across a faceless studio.",
      },
    ],
  },
  people: {
    title: "How delivery is covered",
    text: "The real model: Danila keeps technical ownership, and the project covers the delivery functions the scope requires.",
    members: [
      { id: "product", initials: "PX", name: "Product & UX", role: "Framing, scenarios, interfaces" },
      { id: "frontend", initials: "FE", name: "Frontend", role: "React, states, responsive, performance" },
      { id: "backend", initials: "BE", name: "Backend & data", role: "API, database, roles, integrations" },
      { id: "quality", initials: "QA", name: "Quality", role: "Flows, forms, errors, accessibility" },
      { id: "release", initials: "RL", name: "Release", role: "Deploy, env, SEO, handover" },
      { id: "support", initials: "PS", name: "Support", role: "Launch, warranty, evolution" },
    ],
  },
  join: {
    cta: "Start the conversation",
  },
} as const;

const COPY_ZH = {
  seo: {
    title: "关于我们 — TIVONIX",
    description:
      "TIVONIX 是 founder-led product engineering company：SaaS、金融科技、市场平台、内部系统、AI 自动化与 production software systems。",
  },
  hero: {
    title: "Founder-led product engineering",
    titleLines: ["Founder-led", "product", "engineering"],
    cta: "沟通产品",
  },
  story: {
    paragraphs: [
      "TIVONIX 来自一个简单问题：很多公司买到的是分散部分——设计、前端、后端、机器人、管理端——但没人对这些部分之间的工作结果负责。",
      "Founder-led 模型把 ownership 放在一个地方。Danila Titovets 对产品梳理、架构、工程、集成、QA、上线与系统交接负责。",
      "TIVONIX 构建 SaaS、金融科技、市场平台、CRM/类 ERP、客户门户、Telegram 产品与 AI 自动化。先确认 scope 与风险，再写代码。上线后代码、权限与清晰交接留在客户手中。",
    ],
  },
  mission: {
    label: "使命",
    title: "交付可运行的软件系统",
    text: "帮助公司把复杂任务变成清晰产品：用户、角色、数据、集成、production 与交接在同一流程中完成。",
  },
  vision: {
    label: "愿景",
    title: "一个技术负责人对结果负责",
    text: "客户不需要一串互相交接责任的供应商，而需要一个人把产品逻辑、架构与上线放在一起。",
  },
  values: {
    label: "价值观",
    title: "速度、清晰、可追责",
    text: "每个项目都这样推进——从第一条消息到移交权限。",
    items: [
      {
        title: "速度",
        text: "快速启动、短迭代：前几周就能看到中间成果，而不是只在结尾才见结果。",
      },
      {
        title: "清晰",
        text: "开工前锁定范围、周期与边界。哪些在内、哪些留到下一阶段，写清楚。",
      },
      {
        title: "可追责",
        text: "对结果负责：线索流程、状态与关键用户路径在上线前完成校验。",
      },
      {
        title: "透明",
        text: "移交代码与权限。隐私与系统控制权留在您手中。",
      },
    ],
  },
  why: {
    title: "为什么选择 TIVONIX",
    text: "TIVONIX 把产品、UX、后端、集成与 release 放进同一个 ownership loop。",
    cta: "沟通产品",
    items: [
      {
        key: "experience",
        title: "经验",
        text: "已上线项目覆盖金融科技、市场平台、AI commerce、客户门户、管理端、支付与 Telegram Mini Apps。",
      },
      {
        key: "expertise",
        title: "专长",
        text: "把难点做简单：角色、流程、状态、数据模型、集成与 production 边界情况。",
      },
      {
        key: "innovation",
        title: "技术",
        text: "现代技术栈，只在真正省时间的地方使用 AI，避免不必要的复杂度。",
      },
      {
        key: "team",
        title: "Founder-led ownership",
        text: "Scope、architecture、release 与 handover 决策不会被无名工作室稀释。",
      },
    ],
  },
  people: {
    title: "Delivery 如何覆盖",
    text: "真实模型：Danila 保持技术 ownership，项目按 scope 覆盖所需 delivery functions。",
    members: [
      { id: "product", initials: "PX", name: "Product & UX", role: "梳理、场景、界面" },
      { id: "frontend", initials: "FE", name: "Frontend", role: "React、状态、响应式、性能" },
      { id: "backend", initials: "BE", name: "Backend & data", role: "API、数据库、角色、集成" },
      { id: "quality", initials: "QA", name: "Quality", role: "流程、表单、错误、可访问性" },
      { id: "release", initials: "RL", name: "Release", role: "部署、env、SEO、交接" },
      { id: "support", initials: "PS", name: "Support", role: "上线、保修、演进" },
    ],
  },
  join: {
    cta: "开始沟通",
  },
} as const;

export function aboutCopy(lang: Lang) {
  if (lang === "zh") return COPY_ZH;
  return lang === "en" ? COPY_EN : COPY_RU;
}

export function aboutPath(lang: Lang) {
  if (lang === "en") return "/en/about";
  if (lang === "zh") return "/zh/about";
  return "/about";
}
