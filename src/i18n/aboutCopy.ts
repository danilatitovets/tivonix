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

export function aboutCopy(lang: Lang) {
  return lang === "en" ? COPY_EN : COPY_RU;
}

export function aboutPath(lang: Lang) {
  return lang === "en" ? "/en/about" : "/about";
}
