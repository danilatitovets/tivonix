import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LangProvider";
import { pathForLang } from "../../lib/localePaths";
import { trackEvent } from "../../lib/analytics";
import { buildProjects, projectSubtitle } from "../../data/projectsCatalog";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import "./productLanding.css";

type Copy = {
  nav: { work: string; capabilities: string; approach: string; about: string; cta: string };
  hero: { eyebrow: string; titleA: string; titleB: string; body: string; primary: string; secondary: string; note: string };
  system: { kicker: string; title: string; body: string; labels: string[]; foot: string };
  work: { kicker: string; title: string; body: string; open: string; all: string };
  capabilities: {
    kicker: string;
    title: string;
    body: string;
    items: Array<{ index: string; title: string; body: string; examples: string }>;
  };
  proof: { statement: string; details: string[] };
  approach: {
    kicker: string;
    title: string;
    body: string;
    steps: Array<{ index: string; title: string; body: string }>;
  };
  brief: { kicker: string; title: string; body: string; button: string; aside: string };
  final: { kicker: string; title: string; body: string; button: string; projects: string };
  footer: { descriptor: string; work: string; contact: string; company: string; rights: string };
};

const copyRu: Copy = {
  nav: {
    work: "Проекты",
    capabilities: "Что строим",
    approach: "Подход",
    about: "Компания",
    cta: "Обсудить продукт",
  },
  hero: {
    eyebrow: "Product engineering company",
    titleA: "Программные системы,",
    titleB: "на которых работает бизнес.",
    body:
      "Проектируем и разрабатываем customer-facing продукты, внутренние платформы и AI-системы — от архитектуры до production.",
    primary: "Обсудить продукт",
    secondary: "Посмотреть проекты",
    note: "Strategy · Product · Design · Engineering · Production",
  },
  system: {
    kicker: "Один software layer",
    title: "Не набор экранов. Система, в которой части работают вместе.",
    body:
      "Клиентский продукт, операции, платежи, данные и автоматизация проектируются как один контур — с понятными границами, ролями и интеграциями.",
    labels: ["Customers", "Operations", "Payments", "Data", "AI", "Automation"],
    foot: "TIVONIX проектирует связность между слоями, а не добавляет интеграции постфактум.",
  },
  work: {
    kicker: "Selected systems",
    title: "Работа, которую можно открыть.",
    body:
      "Показываем продукт, контекст и инженерную глубину. Без выдуманных KPI и декоративных кейсов.",
    open: "Открыть кейс",
    all: "Все проекты",
  },
  capabilities: {
    kicker: "Capabilities",
    title: "От продукта для клиентов до software внутри компании.",
    body:
      "Берём ответственность за product logic и engineering system целиком, а не только за реализацию отдельных экранов.",
    items: [
      {
        index: "01",
        title: "Product engineering",
        body: "SaaS, marketplaces, fintech, client portals и web products с реальной бизнес-логикой.",
        examples: "Product architecture · UX · Frontend · Backend · QA · Release",
      },
      {
        index: "02",
        title: "Business systems",
        body: "CRM, admin panels, operational software и внутренние инструменты под конкретный процесс компании.",
        examples: "RBAC · Workflows · Audit · Reporting · Back office",
      },
      {
        index: "03",
        title: "AI & automation",
        body: "AI-функции и automation там, где они сокращают ручную работу или улучшают продукт — не ради AI-бейджа.",
        examples: "Agents · RAG · Evals · Queues · Human-in-the-loop",
      },
      {
        index: "04",
        title: "Integrations & platform",
        body: "Платежи, Telegram, external APIs, data flows и инфраструктура с нормальными failure modes.",
        examples: "Payments · APIs · Webhooks · Observability · Infrastructure",
      },
    ],
  },
  proof: {
    statement: "Senior engineering без agency sprawl.",
    details: [
      "Founder-led product decisions",
      "Production code, не handoff-макеты",
      "Исходники и доступы у клиента",
      "Scope фиксируется до разработки",
    ],
  },
  approach: {
    kicker: "How we work",
    title: "Сначала уменьшаем неопределённость. Потом пишем код.",
    body:
      "Сильная разработка начинается не с количества функций, а с правильной границы первой версии и решений, которые не придётся выбрасывать после запуска.",
    steps: [
      {
        index: "01",
        title: "Frame the product",
        body: "Фиксируем пользователей, ключевой workflow, ограничения и критерий успеха первой версии.",
      },
      {
        index: "02",
        title: "Design the system",
        body: "Проектируем UX, data model, integrations и технические риски в одном контексте.",
      },
      {
        index: "03",
        title: "Ship in slices",
        body: "Делаем небольшими проверяемыми релизами с рабочим продуктом на каждом значимом этапе.",
      },
      {
        index: "04",
        title: "Run it in production",
        body: "Тестируем, наблюдаем, исправляем реальные bottlenecks и передаём систему без vendor lock-in.",
      },
    ],
  },
  brief: {
    kicker: "Start with the problem",
    title: "Опишите, что должно работать.",
    body:
      "Не нужен готовый ТЗ. Достаточно контекста: кто будет пользоваться системой, что сейчас ломается и какой результат нужен бизнесу.",
    button: "Разобрать задачу",
    aside: "В ответ — вопросы по scope, рискам и реалистичный следующий шаг. Не фиктивная fixed estimate из одного абзаца.",
  },
  final: {
    kicker: "Build with TIVONIX",
    title: "Есть продукт или система, которую важно сделать правильно?",
    body: "Покажите контекст. Мы скажем, где начинается разумный первый релиз и что потребуется для production.",
    button: "Начать разговор",
    projects: "Сначала посмотреть работу",
  },
  footer: {
    descriptor: "Product engineering company",
    work: "Projects",
    contact: "Contact",
    company: "About",
    rights: "TIVONIX. Software that runs the business.",
  },
};

const copyEn: Copy = {
  nav: {
    work: "Work",
    capabilities: "Capabilities",
    approach: "Approach",
    about: "Company",
    cta: "Start a project",
  },
  hero: {
    eyebrow: "Product engineering company",
    titleA: "Software that",
    titleB: "runs the business.",
    body:
      "We design and engineer customer products, internal platforms and AI-powered systems — from architecture to production.",
    primary: "Start a project",
    secondary: "Explore our work",
    note: "Strategy · Product · Design · Engineering · Production",
  },
  system: {
    kicker: "One software layer",
    title: "Not a collection of screens. A system whose parts work together.",
    body:
      "Customer experience, operations, payments, data and automation are designed as one operating system — with clear boundaries, ownership and integrations.",
    labels: ["Customers", "Operations", "Payments", "Data", "AI", "Automation"],
    foot: "TIVONIX designs the connections between layers instead of patching integrations on later.",
  },
  work: {
    kicker: "Selected systems",
    title: "Work you can actually open.",
    body:
      "We show the product, the context and the engineering depth. No invented KPIs. No decorative case studies.",
    open: "View case",
    all: "All projects",
  },
  capabilities: {
    kicker: "Capabilities",
    title: "From customer products to the software inside the company.",
    body:
      "We take responsibility for product logic and the engineering system as a whole — not just isolated screens.",
    items: [
      {
        index: "01",
        title: "Product engineering",
        body: "SaaS, marketplaces, fintech, client portals and web products with real business logic.",
        examples: "Product architecture · UX · Frontend · Backend · QA · Release",
      },
      {
        index: "02",
        title: "Business systems",
        body: "CRM, admin panels, operational software and internal tools shaped around the way the company actually works.",
        examples: "RBAC · Workflows · Audit · Reporting · Back office",
      },
      {
        index: "03",
        title: "AI & automation",
        body: "AI features and automation where they remove manual work or improve the product — never for the badge.",
        examples: "Agents · RAG · Evals · Queues · Human-in-the-loop",
      },
      {
        index: "04",
        title: "Integrations & platform",
        body: "Payments, Telegram, external APIs, data flows and infrastructure designed with real failure modes in mind.",
        examples: "Payments · APIs · Webhooks · Observability · Infrastructure",
      },
    ],
  },
  proof: {
    statement: "Senior engineering without agency sprawl.",
    details: [
      "Founder-led product decisions",
      "Production code, not handoff mockups",
      "Client owns source and access",
      "Scope is framed before development",
    ],
  },
  approach: {
    kicker: "How we work",
    title: "Reduce uncertainty first. Then write code.",
    body:
      "Strong engineering starts with the right boundary for the first release and decisions that will not need to be thrown away after launch.",
    steps: [
      {
        index: "01",
        title: "Frame the product",
        body: "Define the users, critical workflow, constraints and what the first release must prove.",
      },
      {
        index: "02",
        title: "Design the system",
        body: "Shape UX, data model, integrations and technical risk in the same conversation.",
      },
      {
        index: "03",
        title: "Ship in slices",
        body: "Deliver small, reviewable releases with working software at every meaningful checkpoint.",
      },
      {
        index: "04",
        title: "Run it in production",
        body: "Test, observe, fix real bottlenecks and hand over a system without vendor lock-in.",
      },
    ],
  },
  brief: {
    kicker: "Start with the problem",
    title: "Describe what needs to work.",
    body:
      "You do not need a finished specification. Tell us who uses the system, what breaks today and what the business needs to achieve.",
    button: "Describe your product",
    aside: "We respond with scope questions, risk and a realistic next step — not a fake fixed estimate from one paragraph.",
  },
  final: {
    kicker: "Build with TIVONIX",
    title: "Have a product or system that needs to be done right?",
    body: "Share the context. We will tell you where a responsible first release starts and what production will require.",
    button: "Start the conversation",
    projects: "See the work first",
  },
  footer: {
    descriptor: "Product engineering company",
    work: "Projects",
    contact: "Contact",
    company: "About",
    rights: "TIVONIX. Software that runs the business.",
  },
};

function BrandMark() {
  return (
    <span className="tvx26-brand" aria-label="TIVONIX">
      <span className="tvx26-brand__word">TIVONIX</span>
      <span className="tvx26-brand__signal" aria-hidden="true" />
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="tvx26-section-label">
      <span className="tvx26-section-label__dot" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export default function ProductLanding() {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const c = lang === "ru" ? copyRu : copyEn;
  const isRu = lang === "ru";
  const projects = useMemo(() => buildProjects(isRu).slice(0, 3), [isRu]);
  const projectsPath = pathForLang("/projects", lang);
  const aboutPath = pathForLang("/about", lang);
  const contactsPath = pathForLang("/contacts", lang);
  const homePath = lang === "en" ? "/en" : lang === "zh" ? "/zh" : "/";
  const altLanguagePath = lang === "ru" ? "/en" : "/";
  const altLanguageLabel = lang === "ru" ? "EN" : "RU";

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="tvx26">
      <a className="tvx26-skip" href="#main-content">
        Skip to content
      </a>

      <header className="tvx26-header">
        <div className="tvx26-shell tvx26-header__inner">
          <Link to={homePath} className="tvx26-logo-link" aria-label="TIVONIX home">
            <BrandMark />
          </Link>

          <nav className="tvx26-nav" aria-label="Primary navigation">
            <Link to={projectsPath}>{c.nav.work}</Link>
            <a href="#capabilities" onClick={scrollTo("capabilities")}>{c.nav.capabilities}</a>
            <a href="#approach" onClick={scrollTo("approach")}>{c.nav.approach}</a>
            <Link to={aboutPath}>{c.nav.about}</Link>
          </nav>

          <div className="tvx26-header__actions">
            <Link className="tvx26-lang" to={altLanguagePath} aria-label={`Switch language to ${altLanguageLabel}`}>
              {altLanguageLabel}
            </Link>
            <LeadCTAButton
              source="header"
              variant="plain"
              className="tvx26-header-cta"
              onClick={() => trackEvent("contact_started", { source: "header" })}
            >
              {c.nav.cta}
            </LeadCTAButton>
            <button
              className="tvx26-menu-button"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="tvx26-mobile-nav">
            <div className="tvx26-shell tvx26-mobile-nav__inner">
              <Link to={projectsPath} onClick={() => setMenuOpen(false)}>{c.nav.work}</Link>
              <a href="#capabilities" onClick={scrollTo("capabilities")}>{c.nav.capabilities}</a>
              <a href="#approach" onClick={scrollTo("approach")}>{c.nav.approach}</a>
              <Link to={aboutPath} onClick={() => setMenuOpen(false)}>{c.nav.about}</Link>
              <LeadCTAButton
                source="header"
                variant="plain"
                className="tvx26-mobile-cta"
                onClick={() => {
                  setMenuOpen(false);
                  trackEvent("contact_started", { source: "mobile_menu" });
                }}
              >
                {c.nav.cta}
              </LeadCTAButton>
            </div>
          </div>
        ) : null}
      </header>

      <main id="main-content">
        <section className="tvx26-hero" id="hero">
          <div className="tvx26-shell tvx26-hero__grid">
            <div className="tvx26-hero__copy">
              <SectionLabel>{c.hero.eyebrow}</SectionLabel>
              <h1>
                <span>{c.hero.titleA}</span>
                <span className="tvx26-hero__title-muted">{c.hero.titleB}</span>
              </h1>
              <p className="tvx26-hero__body">{c.hero.body}</p>
              <div className="tvx26-hero__actions">
                <LeadCTAButton
                  source="hero"
                  variant="plain"
                  className="tvx26-button tvx26-button--primary"
                  onClick={() => trackEvent("hero_cta_clicked", { action: "start_project" })}
                >
                  <span>{c.hero.primary}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </LeadCTAButton>
                <Link
                  to={projectsPath}
                  className="tvx26-button tvx26-button--secondary"
                  onClick={() => trackEvent("hero_cta_clicked", { action: "view_projects" })}
                >
                  <span>{c.hero.secondary}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <p className="tvx26-hero__note">{c.hero.note}</p>
            </div>

            <div className="tvx26-system-visual" aria-label="TIVONIX system map">
              <div className="tvx26-system-visual__grid" aria-hidden="true" />
              <div className="tvx26-system-visual__status">
                <span className="tvx26-live-dot" />
                PRODUCT / SYSTEM
              </div>
              <div className="tvx26-system-visual__center">
                <span className="tvx26-system-visual__micro">ENGINEERED BY</span>
                <strong>TIVONIX</strong>
                <span className="tvx26-system-visual__line" />
                <span className="tvx26-system-visual__micro">PRODUCTION SOFTWARE</span>
              </div>
              {c.system.labels.map((label, index) => (
                <div className={`tvx26-node tvx26-node--${index + 1}`} key={label}>
                  <span className="tvx26-node__index">0{index + 1}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tvx26-system" aria-labelledby="system-title">
          <div className="tvx26-shell">
            <div className="tvx26-section-head tvx26-section-head--split">
              <SectionLabel>{c.system.kicker}</SectionLabel>
              <div>
                <h2 id="system-title">{c.system.title}</h2>
                <p>{c.system.body}</p>
              </div>
            </div>

            <div className="tvx26-layer-map">
              <div className="tvx26-layer-map__rail">
                <span>INPUT</span><span>CORE</span><span>OUTPUT</span>
              </div>
              <div className="tvx26-layer-map__flow">
                <div className="tvx26-layer-map__group tvx26-layer-map__group--input">
                  <span>Web</span><span>Telegram</span><span>Teams</span><span>APIs</span>
                </div>
                <div className="tvx26-layer-map__core">
                  <span className="tvx26-layer-map__core-label">TIVONIX / PRODUCT SYSTEM</span>
                  <div className="tvx26-layer-map__core-grid">
                    {c.system.labels.map((label) => <span key={label}>{label}</span>)}
                  </div>
                </div>
                <div className="tvx26-layer-map__group tvx26-layer-map__group--output">
                  <span>Product</span><span>Admin</span><span>Automation</span><span>Analytics</span>
                </div>
              </div>
              <p className="tvx26-layer-map__foot">{c.system.foot}</p>
            </div>
          </div>
        </section>

        <section className="tvx26-work" id="work" aria-labelledby="work-title">
          <div className="tvx26-shell">
            <div className="tvx26-section-head tvx26-section-head--work">
              <div>
                <SectionLabel>{c.work.kicker}</SectionLabel>
                <h2 id="work-title">{c.work.title}</h2>
              </div>
              <p>{c.work.body}</p>
            </div>

            <div className="tvx26-projects">
              {projects.map((project, index) => {
                const projectPath = pathForLang(`/projects/${project.id}`, lang);
                return (
                  <article className={`tvx26-project tvx26-project--${index + 1}`} key={project.id}>
                    <Link
                      to={projectPath}
                      className="tvx26-project__media"
                      onClick={() => trackEvent("project_opened", { project_id: project.id, source: "homepage" })}
                      aria-label={`${c.work.open}: ${project.title}`}
                    >
                      {project.cover ? (
                        <img src={project.cover} alt="" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                      ) : null}
                      <span className="tvx26-project__media-overlay" aria-hidden="true" />
                      <span className="tvx26-project__number">0{index + 1}</span>
                    </Link>
                    <div className="tvx26-project__meta">
                      <div>
                        <p className="tvx26-project__type">{project.tags.slice(0, 3).join(" · ")}</p>
                        <h3>{project.title}</h3>
                        <p className="tvx26-project__description">{projectSubtitle(project, lang)}</p>
                      </div>
                      <Link
                        to={projectPath}
                        className="tvx26-text-link"
                        onClick={() => trackEvent("case_study_opened", { project_id: project.id, source: "homepage" })}
                      >
                        {c.work.open}<ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="tvx26-work__footer">
              <Link className="tvx26-button tvx26-button--secondary" to={projectsPath}>
                {c.work.all}<ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="tvx26-capabilities" id="capabilities" aria-labelledby="capabilities-title">
          <div className="tvx26-shell">
            <div className="tvx26-section-head tvx26-section-head--split">
              <SectionLabel>{c.capabilities.kicker}</SectionLabel>
              <div>
                <h2 id="capabilities-title">{c.capabilities.title}</h2>
                <p>{c.capabilities.body}</p>
              </div>
            </div>

            <div className="tvx26-capability-list">
              {c.capabilities.items.map((item) => (
                <article className="tvx26-capability" key={item.index}>
                  <span className="tvx26-capability__index">{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="tvx26-capability__examples">{item.examples}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tvx26-proof" aria-label="TIVONIX delivery principles">
          <div className="tvx26-shell tvx26-proof__grid">
            <p className="tvx26-proof__statement">{c.proof.statement}</p>
            <div className="tvx26-proof__details">
              {c.proof.details.map((detail, index) => (
                <div key={detail}><span>0{index + 1}</span><p>{detail}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="tvx26-approach" id="approach" aria-labelledby="approach-title">
          <div className="tvx26-shell">
            <div className="tvx26-section-head tvx26-section-head--split">
              <SectionLabel>{c.approach.kicker}</SectionLabel>
              <div>
                <h2 id="approach-title">{c.approach.title}</h2>
                <p>{c.approach.body}</p>
              </div>
            </div>
            <div className="tvx26-steps">
              {c.approach.steps.map((step) => (
                <article className="tvx26-step" key={step.index}>
                  <span>{step.index}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tvx26-brief" aria-labelledby="brief-title">
          <div className="tvx26-shell tvx26-brief__card">
            <div className="tvx26-brief__copy">
              <SectionLabel>{c.brief.kicker}</SectionLabel>
              <h2 id="brief-title">{c.brief.title}</h2>
              <p>{c.brief.body}</p>
              <LeadCTAButton
                source="final_cta"
                variant="plain"
                className="tvx26-button tvx26-button--light"
                onClick={() => trackEvent("contact_started", { source: "system_brief" })}
              >
                {c.brief.button}<ArrowRight size={17} aria-hidden="true" />
              </LeadCTAButton>
            </div>
            <div className="tvx26-brief__console" aria-hidden="true">
              <div className="tvx26-brief__console-bar"><span /><span /><span /><em>system-brief.txt</em></div>
              <div className="tvx26-brief__console-body">
                <p><span>01</span> Who uses the system?</p>
                <p><span>02</span> What happens today?</p>
                <p><span>03</span> What must change?</p>
                <p><span>04</span> What cannot fail?</p>
                <div className="tvx26-console-cursor">_</div>
              </div>
              <p className="tvx26-brief__aside">{c.brief.aside}</p>
            </div>
          </div>
        </section>

        <section className="tvx26-final" aria-labelledby="final-title">
          <div className="tvx26-shell tvx26-final__inner">
            <SectionLabel>{c.final.kicker}</SectionLabel>
            <h2 id="final-title">{c.final.title}</h2>
            <p>{c.final.body}</p>
            <div className="tvx26-final__actions">
              <LeadCTAButton
                source="final_cta"
                variant="plain"
                className="tvx26-button tvx26-button--primary"
                onClick={() => trackEvent("contact_started", { source: "final_cta" })}
              >
                {c.final.button}<ArrowRight size={17} aria-hidden="true" />
              </LeadCTAButton>
              <Link className="tvx26-text-link tvx26-text-link--large" to={projectsPath}>{c.final.projects}<ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="tvx26-footer" id="site-footer">
        <div className="tvx26-shell tvx26-footer__top">
          <div>
            <BrandMark />
            <p>{c.footer.descriptor}</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link to={projectsPath}>{c.footer.work}</Link>
            <Link to={contactsPath}>{c.footer.contact}</Link>
            <Link to={aboutPath}>{c.footer.company}</Link>
          </nav>
        </div>
        <div className="tvx26-shell tvx26-footer__bottom">
          <span>© {new Date().getFullYear()} TIVONIX</span>
          <span>{c.footer.rights}</span>
        </div>
      </footer>
    </div>
  );
}
