import type { Lang } from "./LangProvider";

const COPY_RU = {
  seo: {
    title: "О компании — TIVONIX",
    description:
      "TIVONIX — продуктовая команда: сайты, заявки, кабинеты и автоматизация. Зачем мы начали, миссия, ценности и почему с нами работают.",
  },
  hero: {
    title: "Системы, в которых заявки не теряются",
    titleLines: ["Системы,", "в которых", "заявки не", "теряются"],
    cta: "Обсудить задачу",
  },
  story: {
    paragraphs: [
      "Форма на сайте есть. А дальше часто начинается хаос: письма во входящих, статусы в голове, Excel вручную, и никто не знает, кто взял заявку. Из этой боли и вырос TIVONIX. Не из презентации.",
      "Мы сами собирали для бизнеса цепочки от сайта до Telegram, CRM и кабинета. Видели, где всё ломается. Поэтому делаем не красивую страницу ради галочки, а рабочую систему.",
      "Сегодня запускаем лендинги под заявки, mini-CRM, личные кабинеты и MVP. С понятным объёмом, сроками и ответом за результат. Собираем состав под задачу, показываем ход работы и отдаём код с доступами. Система живёт у вас, а не в чужом кабинете.",
    ],
  },
  mission: {
    label: "Миссия",
    title: "Автоматизировать рутину вокруг клиента",
    text: "Мы помогаем бизнесу убрать ручной перенос заявок и хаос в коммуникациях — чтобы команда занималась продажами и продуктом, а не поиском «кто взял лид».",
  },
  vision: {
    label: "Видение",
    title: "Понятный цифровой контур для любого масштаба",
    text: "От локального бизнеса до веб-сервиса: один процесс от первого касания до статуса в системе. Без лишней разработки ради галочки — только то, что двигает деньги и скорость ответа.",
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
    text: "Мы соединяем продукт, интеграции и запуск — чтобы вы росли, а не тонули в спорах «где заявка».",
    cta: "Обсудить задачу",
    items: [
      {
        key: "experience",
        title: "Опыт",
        text: "Делаем живые проекты: от лендинга с Telegram до fintech и маркетплейсов с кабинетами и оплатой.",
      },
      {
        key: "expertise",
        title: "Экспертиза",
        text: "Умеем упрощать сложное: маршруты заявок, роли, статусы, интеграции — без лишней архитектуры.",
      },
      {
        key: "innovation",
        title: "Технологии",
        text: "Современный стек, AI там, где он экономит время, и автоматизация рутины вокруг клиента.",
      },
      {
        key: "team",
        title: "Команда",
        text: "Дизайн, разработка, QA и запуск в одной связке. Состав под задачу — без безликой «студии на аутсорсе».",
      },
    ],
  },
  people: {
    title: "Это мы",
    text: "Роли, которые реально закрывают проект — от идеи до продакшена.",
    members: [
      { id: "danila", initials: "ДТ", name: "Данила Т.", role: "Архитектура и full-stack" },
      { id: "anna", initials: "АК", name: "Анна К.", role: "UI/UX дизайн" },
      { id: "maxim", initials: "МС", name: "Максим С.", role: "Frontend" },
      { id: "igor", initials: "ИВ", name: "Игорь В.", role: "Backend" },
      { id: "elena", initials: "ЕН", name: "Елена Н.", role: "QA и тестирование" },
      { id: "roman", initials: "РП", name: "Роман П.", role: "Проджект-менеджмент" },
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
      "TIVONIX is a product team: sites, lead flows, portals and automation. Why we started, our mission, values and how we work.",
  },
  hero: {
    title: "Systems where leads don’t get lost",
    titleLines: ["Systems", "where leads", "don’t get", "lost"],
    cta: "Discuss your task",
  },
  story: {
    paragraphs: [
      "The form on the site works. Then chaos often starts: inbox noise, status in someone’s head, Excel by hand, and nobody knows who took the lead. That’s the pain TIVONIX grew from. Not a pitch deck.",
      "We kept building chains from site to Telegram, CRM and portal for real businesses. We saw where things break. So we don’t ship a pretty page for the checkbox. We ship a system that works.",
      "Today we launch lead pages, mini-CRM, client portals and MVPs. Clear scope, clear timelines, clear ownership of the result. We assemble the right people for the job, show progress as we go, and hand over code and access. The system lives with you, not in someone else’s account.",
    ],
  },
  mission: {
    label: "Mission",
    title: "Automate the busywork around the customer",
    text: "We help teams stop manually moving leads and losing context — so people sell and build product instead of hunting “who took that lead”.",
  },
  vision: {
    label: "Vision",
    title: "A clear digital loop at any scale",
    text: "From local business to a web product: one path from first touch to a status in the system. No vanity scope — only what moves money and response speed.",
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
    text: "We connect product, integrations and launch — so you grow instead of arguing “where is the lead”.",
    cta: "Discuss your task",
    items: [
      {
        key: "experience",
        title: "Experience",
        text: "Live projects from Telegram lead capture to fintech and marketplaces with portals and payments.",
      },
      {
        key: "expertise",
        title: "Expertise",
        text: "We simplify the hard parts: routing, roles, statuses, integrations — without overbuilt architecture.",
      },
      {
        key: "innovation",
        title: "Technology",
        text: "Modern stack, AI where it saves time, and automation around the customer journey.",
      },
      {
        key: "team",
        title: "Team",
        text: "Design, engineering, QA and launch together. The right mix for the task — not a faceless outsourcing shop.",
      },
    ],
  },
  people: {
    title: "This is us",
    text: "Roles that actually ship the project — from idea to production.",
    members: [
      { id: "danila", initials: "DT", name: "Danila T.", role: "Architecture & full-stack" },
      { id: "anna", initials: "AK", name: "Anna K.", role: "UI/UX design" },
      { id: "maxim", initials: "MS", name: "Maxim S.", role: "Frontend" },
      { id: "igor", initials: "IV", name: "Igor V.", role: "Backend" },
      { id: "elena", initials: "EN", name: "Elena N.", role: "QA & testing" },
      { id: "roman", initials: "RP", name: "Roman P.", role: "Project management" },
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
      "TIVONIX 是白俄罗斯产品团队：网站、线索流程、客户后台与自动化。我们如何起步、使命、价值观，以及为何客户选择与我们合作。",
  },
  hero: {
    title: "线索不再丢失的业务系统",
    titleLines: ["让线索", "不再", "流失的", "系统"],
    cta: "沟通您的需求",
  },
  story: {
    paragraphs: [
      "网站上有表单，但接下来往往是混乱：邮件堆在收件箱、状态只在某个人脑子里、Excel 手工维护，谁也不知道谁接了这条线索。TIVONIX 正是从这种痛点成长起来的——不是从路演 PPT。",
      "我们为真实业务搭建过从网站到 Telegram、CRM 与客户后台的链路，清楚哪里会断。所以我们不做「好看就交差」的页面，而是交付能跑通的系统。",
      "如今我们交付获客落地页、mini-CRM、客户后台与 MVP。范围清晰、周期清晰、结果可追责。按任务组队、过程可见，并移交代码与权限。系统留在您这边，而不是锁在别人的账号里。",
    ],
  },
  mission: {
    label: "使命",
    title: "自动化围绕客户的琐碎工作",
    text: "帮助团队停止手工搬线索、丢失上下文——让人去成交与打磨产品，而不是天天找「谁接了那条线索」。",
  },
  vision: {
    label: "愿景",
    title: "任意规模下清晰的数字化闭环",
    text: "从本地生意到 Web 产品：从第一次触达到系统中的状态，一条路径走通。不做虚荣功能——只做推动成交与响应速度的部分。",
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
    text: "我们把产品、集成与上线连成一体——让您专注增长，而不是争论「线索去哪了」。",
    cta: "沟通您的需求",
    items: [
      {
        key: "experience",
        title: "经验",
        text: "从 Telegram 获客到金融科技与带后台/支付的市场平台——都是已上线项目。",
      },
      {
        key: "expertise",
        title: "专长",
        text: "把难点做简单：路由、角色、状态、集成——不做过度架构。",
      },
      {
        key: "innovation",
        title: "技术",
        text: "现代技术栈，在真正省时间的地方用 AI，并自动化客户旅程中的琐事。",
      },
      {
        key: "team",
        title: "团队",
        text: "设计、工程、QA 与上线一体协作。按任务组队——不是无名外包作坊。",
      },
    ],
  },
  people: {
    title: "我们是谁",
    text: "真正把项目从想法推到生产的角色。",
    members: [
      { id: "danila", initials: "DT", name: "Danila T.", role: "架构与全栈" },
      { id: "anna", initials: "AK", name: "Anna K.", role: "UI/UX 设计" },
      { id: "maxim", initials: "MS", name: "Maxim S.", role: "前端" },
      { id: "igor", initials: "IV", name: "Igor V.", role: "后端" },
      { id: "elena", initials: "EN", name: "Elena N.", role: "QA 与测试" },
      { id: "roman", initials: "RP", name: "Roman P.", role: "项目管理" },
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
