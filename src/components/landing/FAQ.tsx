import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang, type Lang } from "../../i18n/LangProvider";
import { t3 } from "../../i18n/pick";

type FaqItem = {
  id: string;
  q: { ru: string; en: string; zh: string };
  a: { ru: string; en: string; zh: string };
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "price",
    q: {
      ru: "Сколько стоит разработка?",
      en: "How much does development cost?",
      zh: "开发费用是多少？",
    },
    a: {
      ru: "Стоимость зависит от экранов, ролей, интеграций и бизнес-логики. После разбора задачи отправляем предварительный план, срок и диапазон стоимости. До старта фиксируем объём.",
      en: "Cost depends on screens, roles, integrations and business logic. After reviewing the task we send a preliminary plan, timeline and cost range. Scope is locked before we start.",
      zh: "费用取决于页面数量、角色、集成与业务逻辑。梳理需求后，我们会发送初步方案、周期与费用区间。开工前锁定范围。",
    },
  },
  {
    id: "time",
    q: {
      ru: "Сколько занимает запуск?",
      en: "How long does a launch take?",
      zh: "上线需要多久？",
    },
    a: {
      ru: "Start — от 7 рабочих дней, Growth — от 2 недель, Product — от 4 недель. Срок зависит от объёма и скорости согласований.",
      en: "Start — from 7 business days, Growth — from 2 weeks, Product — from 4 weeks. Timeline depends on scope and how fast decisions are made.",
      zh: "Start — 起 7 个工作日，Growth — 起 2 周，Product — 起 4 周。周期取决于范围与确认速度。",
    },
  },
  {
    id: "pay",
    q: {
      ru: "Как проходит оплата?",
      en: "How does payment work?",
      zh: "如何付款？",
    },
    a: {
      ru: "Работаем по этапам. Сначала согласуем объём и стоимость этапа, затем оплата и старт. Полный сложный SaaS не входит автоматически в базовый Product.",
      en: "We work in stages. First we agree on stage scope and cost, then payment and start. A full complex SaaS is not automatically included in the base Product plan.",
      zh: "按阶段合作。先确认阶段范围与费用，再付款开工。完整复杂 SaaS 不会自动包含在基础 Product 方案中。",
    },
  },
  {
    id: "small",
    q: {
      ru: "Можно ли начать с небольшой версии?",
      en: "Can we start with a small version?",
      zh: "可以从小版本开始吗？",
    },
    a: {
      ru: "Да. Часто лучше начать с лендинга, бота, формы и уведомлений, а потом добавить CRM, кабинет или интеграции.",
      en: "Yes. Often it’s better to start with a landing page, bot, form and alerts, then add CRM, a portal or integrations.",
      zh: "可以。通常更好先从落地页、机器人、表单与通知开始，再加 CRM、客户后台或集成。",
    },
  },
  {
    id: "source",
    q: {
      ru: "Кто получает исходники и доступы?",
      en: "Who gets the source code and access?",
      zh: "谁获得源代码与权限？",
    },
    a: {
      ru: "Исходный код и доступы передаются клиенту. Условия передачи фиксируем до старта этапа.",
      en: "Source code and access are handed over to the client. Handover terms are fixed before the stage starts.",
      zh: "源代码与权限移交给客户。移交条款在阶段开始前确认。",
    },
  },
  {
    id: "after",
    q: {
      ru: "Что происходит после запуска?",
      en: "What happens after launch?",
      zh: "上线之后会怎样？",
    },
    a: {
      ru: "Проверяем ключевые сценарии, передаём инструкции. Выявленные ошибки исправляем в рамках согласованной гарантии. Дальнейшая поддержка обсуждается отдельно.",
      en: "We check key flows and hand over instructions. Issues found are fixed within the agreed warranty. Ongoing support is discussed separately.",
      zh: "我们校验关键流程并移交说明。发现问题在约定保修范围内修复。后续支持另行商议。",
    },
  },
  {
    id: "existing",
    q: {
      ru: "Работаете ли вы с существующим проектом?",
      en: "Do you work with an existing project?",
      zh: "可以在现有项目上继续吗？",
    },
    a: {
      ru: "Да. Можем доработать сайт, подключить Telegram, CRM, статусы, кабинет или автоматизацию к уже запущенному продукту.",
      en: "Yes. We can extend a site, connect Telegram, CRM, statuses, a portal or automation to a product already live.",
      zh: "可以。我们能在已上线产品上扩展网站、对接 Telegram、CRM、状态、客户后台或自动化。",
    },
  },
  {
    id: "start",
    q: {
      ru: "Как начать работу?",
      en: "How do we start?",
      zh: "如何开始合作？",
    },
    a: {
      ru: "Опишите задачу в форме на сайте. Мы разберём её и ответим в течение рабочего дня с планом и диапазоном стоимости. Созвон не обязателен.",
      en: "Describe the task in the site form. We’ll review it and reply within a business day with a plan and cost range. A call is optional.",
      zh: "在网站表单中描述需求。我们会在一个工作日内回复方案与费用区间。通话非必须。",
    },
  },
];

function pickFaq(lang: Lang, map: { ru: string; en: string; zh: string }) {
  return map[lang];
}

function FaqRow({
  item,
  open,
  onToggle,
  lang,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  lang: Lang;
}) {
  const panelId = useId();
  const buttonId = useId();
  const q = pickFaq(lang, item.q);
  const a = pickFaq(lang, item.a);

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
  const title = t3(lang, "Частые вопросы", "FAQ", "常见问题");

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
                onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
