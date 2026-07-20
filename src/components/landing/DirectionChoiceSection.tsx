import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { useLeadForm } from "../leads/useLeadForm";
import { trackEvent } from "../../lib/analytics";

type DirectionKey = "leads" | "product";
type StackItem = ReturnType<typeof homeExtraCopy>["direction"]["leads"]["stack"][number];

function DirectionMock({
  item,
  active,
  isRu,
}: {
  item: StackItem;
  active: boolean;
  isRu: boolean;
}) {
  const cls = ["direction-mock", `direction-mock--${item.mock}`, active ? "is-on" : ""].join(" ");

  if (item.mock === "form") {
    return (
      <div className={cls} aria-hidden>
        <div className="direction-mock__site">
          <div className="direction-mock__site-bg" aria-hidden>
            <div className="direction-mock__site-nav">
              <b />
              <em />
              <em />
              <i />
            </div>
            <div className="direction-mock__site-hero" />
            <div className="direction-mock__site-grid">
              <span />
              <span />
              <span />
            </div>
            <div className="direction-mock__site-lines">
              <b />
              <b />
              <b />
            </div>
          </div>
          <div className="direction-mock__site-veil" aria-hidden />

          <div className="direction-mock__modal">
            <p className="direction-mock__modal-title">
              {isRu ? "Оставить заявку" : "Leave a request"}
            </p>
            <p className="direction-mock__modal-lead">
              {isRu ? "Ответим в течение дня" : "We’ll reply within a day"}
            </p>
            <label className="direction-mock__field">
              <span>{isRu ? "Имя" : "Name"}</span>
              <div className="direction-mock__input">
                <span className="direction-mock__type direction-mock__type--a">{item.mockName}</span>
                <i className="direction-mock__caret direction-mock__caret--a" />
              </div>
            </label>
            <label className="direction-mock__field">
              <span>{isRu ? "Телефон" : "Phone"}</span>
              <div className="direction-mock__input">
                <span className="direction-mock__type direction-mock__type--b">{item.mockContact}</span>
                <i className="direction-mock__caret direction-mock__caret--b" />
              </div>
            </label>
            <div className="direction-mock__btn">
              <span>{item.mockSubmit}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.mock === "bot") {
    const leadName = isRu ? "Иван" : "Alex";
    const phone = isRu ? "+375 29 000-00-00" : "+1 555 010-2030";
    return (
      <div className={cls} aria-hidden>
        <div className="direction-mock__tg">
          <aside className="direction-mock__tg-list">
            <div className="direction-mock__tg-search" />
            <div className="direction-mock__tg-chat is-muted">
              <i className="direction-mock__tg-ava direction-mock__tg-ava--a" />
              <div>
                <b>MRKT Support</b>
                <em>{isRu ? "Ок, приняли" : "Got it"}</em>
              </div>
            </div>
            <div className="direction-mock__tg-chat is-active">
              <i className="direction-mock__tg-ava direction-mock__tg-ava--bot">
                <SiTelegram size={12} />
              </i>
              <div>
                <b>TIVONIX Bot</b>
                <em>{item.mockName}</em>
              </div>
              <span className="direction-mock__tg-badge">1</span>
            </div>
            <div className="direction-mock__tg-chat is-muted">
              <i className="direction-mock__tg-ava direction-mock__tg-ava--b" />
              <div>
                <b>Team</b>
                <em>{isRu ? "Созвон в 15:00" : "Call at 3pm"}</em>
              </div>
            </div>
          </aside>

          <div className="direction-mock__tg-pane">
            <header className="direction-mock__tg-header">
              <i className="direction-mock__tg-ava direction-mock__tg-ava--bot">
                <SiTelegram size={13} />
              </i>
              <div>
                <strong>TIVONIX Bot</strong>
                <em>{isRu ? "бот" : "bot"}</em>
              </div>
            </header>

            <div className="direction-mock__tg-feed">
              <div className="direction-mock__tg-bubble">
                <p className="direction-mock__tg-title">{item.mockName}</p>
                <p className="direction-mock__tg-text">
                  {isRu ? "Имя" : "Name"}: <b>{leadName}</b>
                  <br />
                  {isRu ? "Телефон" : "Phone"}: <b>{phone}</b>
                  <br />
                  {isRu ? "Источник" : "Source"}: {isRu ? "сайт" : "website"}
                </p>
                <div className="direction-mock__tg-card">
                  <span>{isRu ? "Открыть в CRM" : "Open in CRM"}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </div>
                <div className="direction-mock__tg-meta">
                  <em>{item.mockSubmit}</em>
                </div>
              </div>
            </div>

            <div className="direction-mock__tg-input">
              <span>{isRu ? "Сообщение..." : "Message..."}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.mock === "crm") {
    const leadName = isRu ? "Иван" : "Alex";
    return (
      <div className={cls} aria-hidden>
        <div className="direction-mock__crm">
          <aside className="direction-mock__crm-side">
            <div className="direction-mock__crm-brand">CRM</div>
            <nav className="direction-mock__crm-nav">
              <span className="is-active">{isRu ? "Заявки" : "Leads"}</span>
              <span>{isRu ? "Клиенты" : "Clients"}</span>
              <span>{isRu ? "Задачи" : "Tasks"}</span>
              <span>{isRu ? "Отчёты" : "Reports"}</span>
            </nav>
            <div className="direction-mock__crm-side-user">
              <i>A</i>
              <em>Anna</em>
            </div>
          </aside>

          <div className="direction-mock__crm-main">
            <header className="direction-mock__crm-header">
              <div>
                <strong>{isRu ? "Заявки" : "Leads"}</strong>
                <em>{isRu ? "Новые и в работе" : "New & in progress"}</em>
              </div>
              <div className="direction-mock__crm-actions">
                <span />
                <b>{isRu ? "Добавить" : "Add"}</b>
              </div>
            </header>

            <div className="direction-mock__crm-toolbar">
              <span className="is-on">{isRu ? "Все" : "All"}</span>
              <span>{isRu ? "Новые" : "New"}</span>
              <span>{isRu ? "В работе" : "Active"}</span>
            </div>

            <div className="direction-mock__crm-board">
              <div className="direction-mock__crm-cols" aria-hidden>
                <div className="direction-mock__crm-col">
                  <p>{isRu ? "Новые" : "New"}</p>
                  <div className="direction-mock__crm-ghost" />
                </div>
                <div className="direction-mock__crm-col is-focus">
                  <p>{isRu ? "В работе" : "In progress"}</p>
                  <article className="direction-mock__crm-card">
                    <div className="direction-mock__crm-card-top">
                      <b>{leadName}</b>
                      <span className="direction-mock__crm-status">{item.mockSubmit}</span>
                    </div>
                    <p className="direction-mock__crm-card-meta">
                      {isRu ? "Источник: сайт" : "Source: website"}
                    </p>
                    <div className="direction-mock__crm-card-owner">
                      <i>{(item.mockContact || "A").slice(0, 1)}</i>
                      <em>{item.mockContact}</em>
                    </div>
                  </article>
                </div>
                <div className="direction-mock__crm-col">
                  <p>{isRu ? "Закрыто" : "Done"}</p>
                  <div className="direction-mock__crm-ghost" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.mock === "mvp") {
    return (
      <div className={cls} aria-hidden>
        <div className="direction-mock__app">
          <aside className="direction-mock__app-side">
            <div className="direction-mock__app-brand">MVP</div>
            <nav className="direction-mock__app-nav">
              <span className="is-active">{item.mockName}</span>
              <span>{isRu ? "Задачи" : "Tasks"}</span>
              <span>{isRu ? "Команда" : "Team"}</span>
              <span>{isRu ? "Настройки" : "Settings"}</span>
            </nav>
          </aside>

          <div className="direction-mock__app-main">
            <header className="direction-mock__app-header">
              <div>
                <strong>{item.mockName}</strong>
                <em>{item.mockContact}</em>
              </div>
              <b className="direction-mock__app-live">{item.mockSubmit}</b>
            </header>

            <div className="direction-mock__app-stats">
              <div className="direction-mock__app-stat">
                <em>{isRu ? "Активные" : "Active"}</em>
                <strong>12</strong>
              </div>
              <div className="direction-mock__app-stat">
                <em>{isRu ? "Готово" : "Done"}</em>
                <strong>48</strong>
              </div>
              <div className="direction-mock__app-stat">
                <em>{isRu ? "Рост" : "Growth"}</em>
                <strong>+18%</strong>
              </div>
            </div>

            <div className="direction-mock__bars">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.mock === "cabinet") {
    const roles = [
      { name: item.mockName, access: isRu ? "Смотрит" : "View" },
      { name: item.mockContact, access: isRu ? "Редактирует" : "Edit" },
      { name: item.mockSubmit, access: isRu ? "Полный" : "Full" },
    ];
    return (
      <div className={cls} aria-hidden>
        <div className="direction-mock__app">
          <aside className="direction-mock__app-side">
            <div className="direction-mock__app-brand">{isRu ? "Кабинет" : "Portal"}</div>
            <nav className="direction-mock__app-nav">
              <span className="is-active">{isRu ? "Роли" : "Roles"}</span>
              <span>{isRu ? "Пользователи" : "Users"}</span>
              <span>{isRu ? "Доступы" : "Access"}</span>
            </nav>
          </aside>

          <div className="direction-mock__app-main">
            <header className="direction-mock__app-header">
              <div>
                <strong>{isRu ? "Роли и доступы" : "Roles & access"}</strong>
                <em>{isRu ? "Кто что видит" : "Who sees what"}</em>
              </div>
              <span className="direction-mock__app-chip">{isRu ? "3 роли" : "3 roles"}</span>
            </header>

            <div className="direction-mock__roles">
              {roles.map((role) => (
                <div key={role.name} className="direction-mock__role">
                  <i />
                  <div>
                    <b>{role.name}</b>
                    <em>{role.access}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cls} aria-hidden>
      <div className="direction-mock__app">
        <aside className="direction-mock__app-side">
          <div className="direction-mock__app-brand">{isRu ? "Биллинг" : "Billing"}</div>
          <nav className="direction-mock__app-nav">
            <span className="is-active">{isRu ? "Оплата" : "Checkout"}</span>
            <span>{isRu ? "Планы" : "Plans"}</span>
            <span>{isRu ? "История" : "History"}</span>
          </nav>
        </aside>

        <div className="direction-mock__app-main">
          <header className="direction-mock__app-header">
            <div>
              <strong>{item.mockName}</strong>
              <em>{isRu ? "Безопасный платёж" : "Secure checkout"}</em>
            </div>
          </header>

          <div className="direction-mock__pay">
            <div className="direction-mock__pay-row">
              <span>{isRu ? "Тариф Pro" : "Pro plan"}</span>
              <strong>{item.mockContact}</strong>
            </div>
            <div className="direction-mock__pay-card" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="direction-mock__pay-btn">{isRu ? "Оплатить" : "Pay now"}</div>
            <em className="direction-mock__pay-ok">
              <Check className="h-3.5 w-3.5" strokeWidth={2.75} />
              {item.mockSubmit}
            </em>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackPanel({
  panelKey,
  source,
  data,
  accent,
  isRu,
}: {
  panelKey: DirectionKey;
  source: "direction_leads" | "direction_product";
  data: ReturnType<typeof homeExtraCopy>["direction"]["leads"];
  accent?: boolean;
  isRu: boolean;
}) {
  const { openLeadForm } = useLeadForm();
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setActive(nodes.length - 1);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { root: null, threshold: [0.35, 0.55, 0.75], rootMargin: "-28% 0px -35% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [data.stack.length]);

  return (
    <div
      className={[
        "direction-cu__panel",
        accent ? "direction-cu__panel--accent" : "",
      ].join(" ")}
    >
      <Container>
        <div className="direction-cu__grid">
          <div className="direction-cu__copy">
            <h2 className="direction-cu__title" key={data.stack[active]?.headline}>
              {data.stack[active]?.headline ?? data.title}
            </h2>

            <button
              type="button"
              className="direction-cu__cta group"
              onClick={() => {
                trackEvent("service_cta_click", { direction: panelKey });
                openLeadForm(source);
              }}
            >
              {data.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          </div>

          <div className="direction-cu__stack">
            {data.stack.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={[
                  "direction-cu__stack-item",
                  i === active ? "is-active" : "",
                ].join(" ")}
              >
                <DirectionMock item={item} active={i === active} isRu={isRu} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function DirectionChoiceSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);
  const isRu = lang === "ru";

  return (
    <Section
      id="directions"
      className="direction-cu scroll-mt-[var(--tivonix-header-spacer)] !py-0"
    >
      <StackPanel
        panelKey="leads"
        source="direction_leads"
        data={copy.direction.leads}
        isRu={isRu}
      />
      <StackPanel
        panelKey="product"
        source="direction_product"
        data={copy.direction.product}
        accent
        isRu={isRu}
      />
    </Section>
  );
}
