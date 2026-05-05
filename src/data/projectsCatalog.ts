export type ProjectStatus = "live" | "wip";

export type Testimonial = {
  name: string;
  role: string;
  text: string;
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
  status?: ProjectStatus;
  outcomes?: string[];
  stack?: string[];
  testimonial?: Testimonial;
};

const UPC_DOMAIN = "https://upc.promo/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const LOGOVO_DOMAIN = "https://logovo24.by/";

export function buildProjects(isRu: boolean): Project[] {
  return [
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
        cover: "/images/project-priew/labelOS.png",
        outcomes: [
          isRu
            ? "Готовый промо-лендинг за 3 дня"
            : "Promo landing delivered in 3 days",
          isRu ? "Чёткая структура под конверсию" : "Conversion-focused structure",
          isRu ? "Адаптив + оптимизация загрузки" : "Responsive + optimized loading",
        ],
        stack: ["React", "Tailwind", "Vite"],
      },

      // 2) UPC — promo landing (client: ИП Безбородых И.В.)
      {
        id: "upc",
        title: "UPC Promo",
        subtitleRu:
          "Промо-лендинг + инфраструктура: премиум-визуал, анимации, скорость, интеграции.",
        subtitleEn:
          "Promo landing + infra: premium visuals, animations, speed and integrations.",
        detailsRu:
          "Формат: промо-лендинг + интеграции\n\n" +
          "Заказчик\n" +
          "• ИП Безбородых И.В.\n" +
          "Контакт/представитель\n" +
          "• Виктор Безбородых — Founder & CEO MIN.ECO (music distribution ecosystem)\n\n" +
          "Цель\n" +
          "• Сделать презентацию продукта в премиум-подаче и подготовить основу для дальнейшего роста.\n\n" +
          "Что сделали\n" +
          "• Проработали сетку, типографику и визуальную иерархию\n" +
          "• Добавили анимации и эффекты без перегруза UI\n" +
          "• Настроили адаптив + микровзаимодействия\n" +
          "• Подключили backend-инфраструктуру (Supabase/Postgres) для дальнейших сценариев\n" +
          "• Оптимизировали графику и фоновые слои для скорости\n\n" +
          "Результат\n" +
          "• Страница выглядит дорого, читается легко и работает быстро\n",
        detailsEn:
          "Format: promo landing + integrations\n\n" +
          "Client\n" +
          "• IE Bezborodykh I.V.\n" +
          "• INN 261709192509\n" +
          "• OGRNIP 325200000025627\n" +
          "Contact/rep\n" +
          "• Viktor Bezborodykh — Founder & CEO of MIN.ECO (music distribution ecosystem)\n\n" +
          "Goal\n" +
          "• Present the product with a premium look and lay the foundation for future growth.\n\n" +
          "What we did\n" +
          "• Built a precise grid, typography and section hierarchy\n" +
          "• Added subtle animations without UI overload\n" +
          "• Implemented responsive layout and micro-interactions\n" +
          "• Connected infra (Supabase/Postgres) for future product flows\n" +
          "• Optimized visuals and background layers for performance\n\n" +
          "Result\n" +
          "• Premium look, high readability, fast loading\n",
        domain: UPC_DOMAIN,
        status: "live",
        tags: ["Landing", "React", "TypeScript", "Supabase", "Performance"],
        cover: "/images/project-priew/upcpromo.png",
        outcomes: [
          isRu ? "Премиум-подача без перегруза" : "Premium visuals without clutter",
          isRu ? "Анимации + стабильная скорость" : "Animations + stable performance",
          isRu ? "Готовая база под интеграции" : "Infra-ready for integrations",
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
            ? "Сделали быстро, аккуратно и с правильным ощущением премиума. Отдельно — за скорость и структуру."
            : "Fast, clean delivery with a premium feel. Great performance and structure.",
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
        cover: "/images/project-priew/usepayslip.png",
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
            ? "Коммуникация — по делу, быстро вносят правки, результатом довольны."
            : "Clear communication, fast iterations, happy with the result.",
        },
      },

      // 4) HEADMIND — closed case (stack: HTML/CSS/JS ES6)
      {
        id: "headmind",
        title: "Headmind",
        subtitleRu:
          "Корпоративный сайт: услуги, команда, доверие и лид-ген под B2B.",
        subtitleEn:
          "Corporate website: services structure, team credibility and B2B lead-gen.",
        detailsRu:
          "Формат: корпоративный сайт / презентация услуг\n\n" +
          "Цель\n" +
          "• Упаковать экспертизу и сделать сайт, который объясняет «кто мы», «что делаем» и приводит заявки.\n\n" +
          "Что сделали\n" +
          "• Собрали информационную архитектуру: услуги → подход → кейсы → команда → контакт\n" +
          "• Упростили формулировки и усилили доверие: акценты на опыте, ролях, результатах\n" +
          "• Собрали верстку: чистая типографика, адаптив, скорость загрузки\n" +
          "• Настроили CTA и точки захвата (контакты/формы)\n\n" +
          "Заказчики\n" +
          "• Евгений Беликов — основатель и генеральный директор ООО «Хэдмайнд»\n" +
          "• Виталий Петровский — партнёр, соучредитель ООО «Хэдмайнд»\n",
        detailsEn:
          "Format: corporate website / services showcase\n\n" +
          "Goal\n" +
          "• Package expertise into a clear website that explains who they are, what they do, and generates leads.\n\n" +
          "What we did\n" +
          "• Built information architecture: services → approach → cases → team → contact\n" +
          "• Improved clarity + trust: experience, roles, outcomes\n" +
          "• Clean responsive layout, fast loading\n" +
          "• CTA and lead capture points (contacts/forms)\n\n" +
          "Clients\n" +
          "• Evgeniy Belikov — Founder & CEO\n" +
          "• Vitaliy Petrovskiy — Partner & Co-founder\n",
        domain: HEADMIND_DOMAIN,
        status: "live",
        tags: ["B2B", "Website", "UI/UX", "Structure", "Conversion"],
        cover: "/images/project-priew/headmed.png",
        outcomes: [
          isRu ? "Понятная упаковка услуг и подхода" : "Clear services & approach packaging",
          isRu ? "Усиление доверия через команду и структуру" : "Stronger trust via team + structure",
          isRu ? "CTA и точки лид-генерации" : "CTA and lead capture points",
        ],
        stack: ["HTML", "CSS", "JavaScript (ES6)"],
        testimonial: {
          name: isRu
            ? "Евгений Беликов / Виталий Петровский"
            : "Evgeniy Belikov / Vitaliy Petrovskiy",
          role: isRu ? "ООО «Хэдмайнд»" : "Headmind",
          text: isRu
            ? "Собрали структуру и подачу так, что сайт стал понятнее для клиентов и лучше ведёт к заявке."
            : "The structure and messaging became clearer, and the site now drives leads more effectively.",
        },
      },

      // 5) LOGOVO — сеть шиномонтажа (Минск), визуал в духе «космос» под бренд
      {
        id: "logovo",
        title: "LOGOVO",
        subtitleRu:
          "Сеть шиномонтажа в Минске: услуги, адреса, прайс, кейсы и запись — в премиальной «космической» подаче бренда.",
        subtitleEn:
          "Minsk tire-service network: services, locations, pricing, cases and booking — premium “cosmic” brand look.",
        detailsRu:
          "Формат: многостраничный промо-сайт сети\n" +
          "Срок: 12 дней\n\n" +
          "Заказчик\n" +
          "• LOGOVO — шиномонтаж и сопутствующие услуги, несколько точек в Минске\n" +
          "• Соцсети: Instagram @Logovo_mnsk\n\n" +
          "Цель\n" +
          "• Показать сервис «уровня студии»: скорость, точность, честность — и довести до записи без лишнего шума.\n" +
          "• Визуально попасть в фирменный стиль: тёмная премиум-подача с «космической» эстетикой (как просили), без дешёвого китча.\n\n" +
          "Что сделали\n" +
          "• Собрали структуру: услуги и акценты → прейскурант → адреса → кейсы → команда → отзывы → FAQ → контакты\n" +
          "• Проработали типографику, сетку и анимации: глубина, ритм, плавные переходы — ощущение дорогого сервиса\n" +
          "• Сделали сильный mobile-first: запись и цены читаются с телефона за секунды\n" +
          "• Усилили доверие: реальные сценарии (кейсы), люди, отзывы, понятные ответы в FAQ\n\n" +
          "Результат\n" +
          "• Сайт работает как витрина сети и подводит к действию: выбрать услугу, понять цену, записаться или связаться\n",
        detailsEn:
          "Format: multi-page promo site for a service network\n" +
          "Timeline: 12 days\n\n" +
          "Client\n" +
          "• LOGOVO — tire service and related work, multiple locations in Minsk\n" +
          "• Social: Instagram @Logovo_mnsk\n\n" +
          "Goals\n" +
          "• Communicate a premium, studio-like experience: speed, precision, honesty — and drive bookings without noise.\n" +
          "• Match the brand direction: dark premium look with a “cosmic” aesthetic (as requested), avoiding cheap clichés.\n\n" +
          "What we delivered\n" +
          "• IA: services → pricing → locations → cases → team → reviews → FAQ → contacts\n" +
          "• Typography, grid and motion: depth, rhythm, smooth transitions — premium service feel\n" +
          "• Strong mobile-first: pricing and booking paths readable in seconds on a phone\n" +
          "• Trust: real-world scenarios (cases), people, reviews, clear FAQ answers\n\n" +
          "Outcome\n" +
          "• The site acts as a storefront for the network and pushes action: pick a service, understand pricing, book or contact\n",
        domain: LOGOVO_DOMAIN,
        status: "live",
        tags: [
          "Landing",
          "React",
          "TypeScript",
          "Framer Motion",
          "Automotive",
        ],
        cover: "/images/project-priew/logovo.png",
        outcomes: [
          isRu ? "Сделано за 12 дней" : "Delivered in 12 days",
          isRu
            ? "Структура под услуги, прайс и запись"
            : "Structure for services, pricing and booking",
          isRu
            ? "«Космический» премиум-визуал под бренд"
            : "“Cosmic” premium visuals aligned with the brand",
          isRu
            ? "Кейсы, команда и отзывы для доверия"
            : "Cases, team and reviews for trust",
        ],
        stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
        testimonial: {
          name: isRu ? "Команда LOGOVO" : "LOGOVO team",
          role: isRu
            ? "Сеть шиномонтажа · Минск"
            : "Tire service network · Minsk",
          text: isRu
            ? "Нужен был сайт, который ощущается как мы: не «ещё один шиномонтаж», а сервис с характером. Космическая тема ожила без дешёвого блеска — глубина, тёмная палитра, сочная типографика. С телефона всё предельно ясно: цена, что входит, куда приехать. В сезон это прямо деньги — люди не теряются, а доходят до записи."
            : "We needed a site that feels like us — not “just another tire shop”, but a brand with character. The cosmic theme landed without cheap glitter: depth, a dark palette, strong typography. On mobile everything is obvious — pricing, what’s included, where to go. In peak season that’s revenue: people don’t get lost, they get to booking.",
        },
      },
  ];
}

export function findProjectBySlug(slug: string | undefined, isRu: boolean): Project | undefined {
  if (!slug) return undefined;
  return buildProjects(isRu).find((p) => p.id === slug);
}
