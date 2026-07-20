// src/pages/ProjectsPage.tsx
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { buildProjects, type Project } from "../data/projectsCatalog";
import { cx, projectPreviewSrc, ProjectPreviewFrame } from "./projectBlocks";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { leadFormCopy } from "../i18n/leadFormCopy";
import { trackProjectView } from "../lib/analytics";
import { useEffect } from "react";

const ALL_FILTER = "all";

function collectTags(projects: Project[]) {
  const set = new Set<string>();
  for (const p of projects) {
    for (const tag of p.tags) set.add(tag);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

const filterPillClass = (active: boolean) =>
  cx(
    "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-[13px] font-medium transition",
    active
      ? "bg-[#3a3a3d] text-white"
      : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92"
  );

function ProjectGridCard({ p, isRu }: { p: Project; isRu: boolean }) {
  const wip = p.status === "wip";
  const domainClean = p.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const productType = p.tags[0] ?? (isRu ? "Проект" : "Project");
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const role = isRu ? "Роль TIVONIX: дизайн и разработка" : "TIVONIX role: design & development";

  return (
    <article className="group min-w-0">
      <Link
        to={`/projects/${p.id}`}
        className="block min-w-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={isRu ? `Кейс ${p.title}` : `Case study ${p.title}`}
      >
        <div className="overflow-hidden rounded-xl bg-[#1c1c1f] transition duration-300 group-hover:bg-[#262626]">
          <ProjectPreviewFrame src={projectPreviewSrc(p)} variant="grid" />
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
            {productType}
          </p>
          <Link
            to={`/projects/${p.id}`}
            className="block min-w-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45"
          >
            <h2 className="mt-1 truncate font-sans text-[15px] font-medium tracking-normal text-white/[0.92] transition group-hover:text-white">
              {p.title}
            </h2>
          </Link>
          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white/52">{subtitle}</p>
          <p className="mt-1.5 text-[11.5px] text-white/38">{role}</p>
          {p.stack?.length ? (
            <p className="mt-1.5 truncate text-[11px] text-white/35">
              {(p.stack ?? []).slice(0, 4).join(" · ")}
            </p>
          ) : null}
          {domainClean && !wip ? (
            <p className="mt-1 truncate text-[12px] text-white/40">{domainClean}</p>
          ) : (
            <p className="mt-1 text-[12px] text-white/40">
              {isRu ? "В разработке" : "In progress"}
            </p>
          )}
        </div>

        {wip ? (
          <span className="shrink-0 rounded-full bg-[#1c1c1f] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/48">
            WIP
          </span>
        ) : p.domain ? (
          <a
            href={p.domain}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              "shrink-0 inline-flex items-center gap-1 rounded-full",
              "bg-[#1c1c1f] px-2.5 py-1 text-[11px] font-medium text-white/58",
              "transition hover:bg-[#262626] hover:text-white/85"
            )}
            aria-label={isRu ? `Открыть ${p.title}` : `Open ${p.title}`}
          >
            <ExternalIcon className="opacity-70" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const isRu = lang === "ru";
  const isEnPath = pathname.startsWith("/en");
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const leadCopy = leadFormCopy(lang);

  useEffect(() => {
    trackProjectView("list");
  }, []);

  const projects = useMemo(() => buildProjects(isRu), [isRu]);
  const tags = useMemo(() => collectTags(projects), [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === ALL_FILTER) return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  const seoTitle = isRu
    ? "Проекты и кейсы TIVONIX — сайты, веб-сервисы и MVP"
    : "TIVONIX projects and case studies — websites, web services and MVP";
  const seoDescription = isRu
    ? "Посмотрите проекты TIVONIX: лендинги, веб-сервисы, личные кабинеты, админки, MVP и Telegram-интеграции для бизнеса."
    : "Explore TIVONIX projects: landings, web services, client areas, admin panels, MVPs and Telegram integrations for business.";

  const heroTitle = isRu ? "Проекты и кейсы" : "Projects and case studies";
  const allLabel = isRu ? "Все" : "All";
  const emptyLabel = isRu ? "Пока нет проектов в этой категории." : "No projects in this category yet.";

  return (
    <div className="min-h-screen overflow-x-clip bg-black">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={isEnPath ? "/en/projects" : "/projects"}
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
        hreflang
      />
      <Header />

      <main>
        <Section className="projects-page scroll-mt-[var(--tivonix-header-spacer)] !pb-20 !pt-[calc(var(--tivonix-header-spacer)+1.75rem)] sm:!pt-[calc(var(--tivonix-header-spacer)+2.25rem)]">
          <Container className="max-w-[1180px]">
            <header className="mx-auto max-w-[720px] text-center">
              <h1 className="font-hero text-[clamp(1.85rem,4.5vw,2.75rem)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-white">
                {heroTitle}
              </h1>
            </header>

            <div className="mt-10 sm:mt-12">
              <div
                className={cx(
                  "flex gap-2 overflow-x-auto pb-1 no-scrollbar",
                  "justify-start sm:flex-wrap sm:justify-center"
                )}
                role="tablist"
                aria-label={isRu ? "Фильтр проектов" : "Project filter"}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === ALL_FILTER}
                  onClick={() => setActiveFilter(ALL_FILTER)}
                  className={filterPillClass(activeFilter === ALL_FILTER)}
                >
                  {allLabel}
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === tag}
                    onClick={() => setActiveFilter(tag)}
                    className={filterPillClass(activeFilter === tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length ? (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProjectGridCard key={p.id} p={p} isRu={isRu} />
                ))}
              </div>
            ) : (
              <p className="mt-12 text-center text-[15px] text-white/45">{emptyLabel}</p>
            )}

            <div className="mt-16 flex flex-col items-center gap-3 text-center">
              <LeadCTAButton source="projects" variant="white" size="lg">
                {leadCopy.ctaProjects}
              </LeadCTAButton>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
