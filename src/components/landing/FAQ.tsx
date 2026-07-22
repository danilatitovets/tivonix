// src/components/landing/FAQ.tsx — compact accessible FAQ
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

type FaqItem = {
  id: string;
  q: { ru: string; en: string };
  a: { ru: string; en: string };
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "price",
    q: { ru: "Сколько стоит разработка?", en: "How much does development cost?" },
    a: {
      ru: "Стоимость зависит от экранов, ролей, интеграций и бизнес-логики. После разбора задачи отправляем предварительный план, срок и диапазон стоимости. До старта фиксируем объём.",
      en: "Cost depends on screens, roles, integrations and business logic. After reviewing the task we send a preliminary plan, timeline and cost range. Scope is locked before we start.",
    },
  },
  {
    id: "time",
    q: { ru: "Сколько занимает запуск?", en: "How long does a launch take?" },
    a: {
      ru: "Start — от 7 рабочих дней, Growth — от 2 недель, Product — от 4 недель. Срок зависит от объёма и скорости согласований.",
      en: "Start — from 7 business days, Growth — from 2 weeks, Product — from 4 weeks. Timeline depends on scope and how fast decisions are made.",
    },
  },
  {
    id: "pay",
    q: { ru: "Как проходит оплата?", en: "How does payment work?" },
    a: {
      ru: "Работаем по этапам. Сначала согласуем объём и стоимость этапа, затем оплата и старт. Полный сложный SaaS не входит автоматически в базовый Product.",
      en: "We work in stages. First we agree on stage scope and cost, then payment and start. A full complex SaaS is not automatically included in the base Product plan.",
    },
  },
  {
    id: "small",
    q: { ru: "Можно ли начать с небольшой версии?", en: "Can we start with a small version?" },
    a: {
      ru: "Да. Часто лучше начать с лендинга, бота, формы и уведомлений, а потом добавить CRM, кабинет или интеграции.",
      en: "Yes. Often it’s better to start with a landing page, bot, form and alerts, then add CRM, a portal or integrations.",
    },
  },
  {
    id: "source",
    q: { ru: "Кто получает исходники и доступы?", en: "Who gets the source code and access?" },
    a: {
      ru: "Исходный код и доступы передаются клиенту. Условия передачи фиксируем до старта этапа.",
      en: "Source code and access are handed over to the client. Handover terms are fixed before the stage starts.",
    },
  },
  {
    id: "after",
    q: { ru: "Что происходит после запуска?", en: "What happens after launch?" },
    a: {
      ru: "Проверяем ключевые сценарии, передаём инструкции. Выявленные ошибки исправляем в рамках согласованной гарантии. Дальнейшая поддержка обсуждается отдельно.",
      en: "We check key flows and hand over instructions. Issues found are fixed within the agreed warranty. Ongoing support is discussed separately.",
    },
  },
  {
    id: "existing",
    q: { ru: "Работаете ли вы с существующим проектом?", en: "Do you work with an existing project?" },
    a: {
      ru: "Да. Можем доработать сайт, подключить Telegram, CRM, статусы, кабинет или автоматизацию к уже запущенному продукту.",
      en: "Yes. We can extend a site, connect Telegram, CRM, statuses, a portal or automation to a product already live.",
    },
  },
  {
    id: "start",
    q: { ru: "Как начать работу?", en: "How do we start?" },
    a: {
      ru: "Опишите задачу в форме на сайте. Мы разберём её и ответим в течение рабочего дня с планом и диапазоном стоимости. Созвон не обязателен.",
      en: "Describe the task in the site form. We’ll review it and reply within a business day with a plan and cost range. A call is optional.",
    },
  },
];

function FaqRow({
  item,
  open,
  onToggle,
  lang,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  lang: "ru" | "en";
}) {
  const panelId = useId();
  const buttonId = useId();
  const q = lang === "ru" ? item.q.ru : item.q.en;
  const a = lang === "ru" ? item.a.ru : item.a.en;

  return (
    <div className={`home-faq__item${open ? " is-open" : ""}`}>
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="home-faq__trigger"
        >
          <span className="home-faq__q">{q}</span>
          <ChevronDown
            className={`home-faq__chevron h-5 w-5 shrink-0${open ? " is-open" : ""}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="home-faq__panel"
      >
        {open ? <p className="home-faq__a">{a}</p> : null}
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { lang } = useLang();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const title = lang === "ru" ? "Частые вопросы" : "FAQ";

  return (
    <Section
      id="faq"
      className="home-faq scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16"
    >
      <Container>
        <div className="mx-auto max-w-[44rem]">
          <h2 className="text-center font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-semibold tracking-[-0.03em] text-white">
            {title}
          </h2>

          <div className="home-faq__list mt-8 sm:mt-10">
            {FAQ_ITEMS.map((item) => (
              <FaqRow
                key={item.id}
                item={item}
                lang={lang}
                open={openId === item.id}
                onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
