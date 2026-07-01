// src/pages/ProjectsPage.tsx
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Header";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { buildProjects, type Project } from "../data/projectsCatalog";
import { cx, projectPreviewSrc, ProjectPreviewFrame, s } from "./projectBlocks";

const HeroWebGLBg = lazy(() => import("../components/landing/HeroWebGLBg"));

const HEADER_H = 72;

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

function ProjectGridCard({ p, isRu }: { p: Project; isRu: boolean }) {
  const wip = p.status === "wip";
  const domainClean = p.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article className="group min-w-0">
      <Link
        to={`/projects/${p.id}`}
        className="block min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/50 rounded-xl"
        aria-label={isRu ? `Кейс ${p.title}` : `Case study ${p.title}`}
      >
        <div
          className={cx(
            "overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]",
            "transition duration-300 group-hover:border-white/[0.14] group-hover:bg-white/[0.05]"
          )}
        >
          <ProjectPreviewFrame src={projectPreviewSrc(p)} variant="grid" />
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to={`/projects/${p.id}`}
            className="block min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/50 rounded"
          >
            <h2 className="truncate text-[15px] font-[700] tracking-[-0.02em] text-white/[0.92] transition group-hover:text-white">
              {p.title}
            </h2>
          </Link>
          {domainClean && !wip ? (
            <p className="mt-0.5 truncate text-[12px] text-white/42">{domainClean}</p>
          ) : (
            <p className="mt-0.5 text-[12px] text-white/38">
              {isRu ? "В разработке" : "In progress"}
            </p>
          )}
        </div>

        {wip ? (
          <span className="shrink-0 rounded-md border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">
            WIP
          </span>
        ) : p.domain ? (
          <a
            href={p.domain}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              "shrink-0 inline-flex items-center gap-1 rounded-md border border-white/[0.08]",
              "bg-white/[0.04] px-2 py-1 text-[11px] font-[600] text-white/55",
              "transition hover:border-white/[0.14] hover:text-white/80"
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
  const isRu = lang === "ru";
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  useEffect(() => {
    setMounted(true);
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
  const heroSubtitle = isRu
    ? `Подборка из ${projects.length} продуктов TIVONIX: живые домены, MVP, веб-сервисы и Telegram-боты — с разбором задач, стека и результата.`
    : `A curated set of ${projects.length} TIVONIX products: live domains, MVPs, web services and Telegram bots — with tasks, stack and outcomes.`;
  const allLabel = isRu ? "Все" : "All";
  const ctaLabel = isRu ? "Обсудить проект" : "Discuss a project";
  const emptyLabel = isRu ? "Пока нет проектов в этой категории." : "No projects in this category yet.";

  return (
    <div className="relative min-h-screen" style={s({ "--headerH": `${HEADER_H}px` })}>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/projects"
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
      />
      <Header />

      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 overflow-hidden bg-black">
          <div className="absolute inset-0 h-full w-full scale-[1.03] will-change-transform">
            {mounted ? (
              <Suspense fallback={null}>
                <HeroWebGLBg />
              </Suspense>
            ) : null}
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.62),rgba(0,0,0,0.94))]" />
      </div>

      <Section className="pt-[calc(var(--headerH)+28px)] sm:pt-[calc(var(--headerH)+36px)] pb-20">
        <Container className="max-w-[1180px]">
          <header className="mx-auto max-w-[720px] text-center">
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-[800] tracking-[-0.04em] text-white leading-[1.05]">
              {heroTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-[58ch] text-[15px] sm:text-[16px] leading-[1.65] text-white/52">
              {heroSubtitle}
            </p>

            <a
              href="https://t.me/TIVONIX"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "mt-7 inline-flex h-11 items-center justify-center rounded-full px-6",
                "text-[14px] font-[750] text-black",
                "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                "hover:brightness-105 transition"
              )}
            >
              {ctaLabel}
            </a>
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
                className={cx(
                  "shrink-0 rounded-full border px-4 py-2 text-[13px] font-[600] transition",
                  activeFilter === ALL_FILTER
                    ? "border-white/[0.22] bg-white/[0.1] text-white"
                    : "border-white/[0.1] bg-transparent text-white/55 hover:border-white/[0.16] hover:text-white/78"
                )}
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
                  className={cx(
                    "shrink-0 rounded-full border px-4 py-2 text-[13px] font-[600] transition",
                    activeFilter === tag
                      ? "border-white/[0.22] bg-white/[0.1] text-white"
                      : "border-white/[0.1] bg-transparent text-white/55 hover:border-white/[0.16] hover:text-white/78"
                  )}
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

          <p className="mt-14 text-center text-[13px] text-white/35">
            {isRu
              ? "Новые кейсы добавляем по мере запуска продуктов."
              : "We add new case studies as products go live."}
          </p>
        </Container>
      </Section>
    </div>
  );
}
