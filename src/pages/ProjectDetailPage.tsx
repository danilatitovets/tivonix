// src/pages/ProjectDetailPage.tsx
import { useMemo } from "react";
import type { ReactNode } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Header";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { findProjectBySlug } from "../data/projectsCatalog";
import { cx, projectPreviewSrc, ProjectPreviewFrame, s } from "./projectBlocks";

const HEADER_H = 72;

const BULLET_RE = /^[•\-]\s*/;

function clipMetaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max - 1);
  const i = slice.lastIndexOf(" ");
  return `${(i > 70 ? slice.slice(0, i) : slice).trimEnd()}…`;
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38">{label}</div>
      <div className="min-w-0 text-[14px] leading-snug text-white/[0.88]">{children}</div>
    </div>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
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

/** Заголовки секций + абзацы + списки (как в каталоге). */
function ProjectDetailBody({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim());
  const nodes: ReactNode[] = [];
  let i = 0;
  let k = 0;
  let firstHeading = true;

  const nextNonEmpty = (from: number) => {
    for (let j = from; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t) return { j, t };
    }
    return null;
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      i++;
      continue;
    }

    if (BULLET_RE.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const L = lines[i].trim();
        if (!L) break;
        if (!BULLET_RE.test(L)) break;
        items.push(L.replace(BULLET_RE, ""));
        i++;
      }
      nodes.push(
        <ul key={k++} className="mb-8 list-none space-y-2.5 pl-0">
          {items.map((item, idx) => (
            <li key={`${idx}-${item.slice(0, 48)}`} className="flex gap-3 text-[15px] leading-[1.65] text-white/[0.72]">
              <span className="mt-[0.52em] h-1 w-1 shrink-0 rounded-full bg-white/32" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    const nxt = nextNonEmpty(i + 1);
    if (nxt && BULLET_RE.test(nxt.t)) {
      nodes.push(
        <h3
          key={k++}
          className={cx(
            "mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40",
            firstHeading ? "mt-0" : "mt-10"
          )}
        >
          {line}
        </h3>
      );
      firstHeading = false;
      i++;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length) {
      const L = lines[i].trim();
      if (!L) break;
      if (BULLET_RE.test(L)) break;
      para.push(L);
      i++;
    }
    if (para.length) {
      nodes.push(
        <p
          key={k++}
          className="mb-5 text-[15px] leading-[1.65] text-white/[0.72] whitespace-pre-line last:mb-0"
        >
          {para.join("\n")}
        </p>
      );
    }
  }

  return <div className="text-left">{nodes}</div>;
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const isRu = lang === "ru";

  const project = useMemo(() => findProjectBySlug(slug, isRu), [slug, isRu]);

  const backLabel = isRu ? "Все проекты" : "All projects";
  const pageEyebrow = isRu ? "Проект" : "Project";
  const resultsLabel = isRu ? "Результаты" : "Outcomes";
  const stackLabel = isRu ? "Стек" : "Stack";
  const domainLabel = isRu ? "Домен" : "Domain";
  const statusLabel = isRu ? "Статус" : "Status";
  const tagsLabel = isRu ? "Теги" : "Tags";
  const liveLabel = isRu ? "В продакшене" : "Live";
  const wipLabel = isRu ? "В разработке" : "In progress";
  const openSiteLabel = isRu ? "Открыть сайт" : "Open website";
  const estimateLabel = isRu ? "Оценка за 24 часа" : "Estimate in 24h";
  const websiteSoonLabel = isRu ? "Сайт скоро" : "Website soon";

  if (!slug) return <Navigate to="/projects" replace />;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const details = isRu ? project.detailsRu : project.detailsEn;
  const seoTitle = `${project.title} — ${isRu ? "кейс TIVONIX" : "TIVONIX case study"}`;
  const seoDescription = clipMetaDescription(
    subtitle +
      (isRu
        ? " Студия TIVONIX: веб-разработка, лендинги, продукты и MVP."
        : " TIVONIX studio: web development, landings, products and MVPs.")
  );
  const wip = project.status === "wip";
  const domainClean = project.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";
  const coverSrc = projectPreviewSrc(project);

  const coverBlurStyle = s({
    transform: "translate(-50%, -50%) scale(1.12)",
    filter: "blur(40px)",
    WebkitFilter: "blur(40px)",
    opacity: 0.58,
  });

  return (
    <div className="relative min-h-screen" style={s({ "--headerH": `${HEADER_H}px` })}>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/projects/${project.id}`}
        localizedPath={`/projects/${project.id}`}
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
      />

      {/*
        Не используем -z-10: fixed-слой уходит под фон body (#000) и визуально «пропадает».
        z-0 + контент z-10 — фон и blur всегда между body и страницей.
      */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <img
          src={coverSrc}
          alt=""
          className="absolute left-1/2 top-1/2 h-full min-h-[120%] w-full min-w-[120%] object-cover object-center"
          style={coverBlurStyle}
          draggable={false}
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.72)_0%,rgba(0,0,0,0.88)_50%,rgba(0,0,0,0.93)_100%)]" />
      </div>

      <div className="relative z-10">
      <Header />

      <Section className="pt-[calc(var(--headerH)+16px)] sm:pt-[calc(var(--headerH)+24px)] pb-24">
        <Container>
          <div className="w-full text-left">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <Link
                to="/projects"
                className="inline-flex w-fit items-center gap-2 text-[13px] font-[650] text-white/50 hover:text-white/80 transition"
              >
                <span aria-hidden className="text-white/35">
                  ←
                </span>
                {backLabel}
              </Link>
              <p className="text-[13px] font-semibold tracking-tight text-white/80">{pageEyebrow}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,400px)] lg:gap-10 xl:grid-cols-[minmax(0,1.25fr)_420px] xl:gap-12">
              <div className="order-2 min-w-0 lg:order-1">
                <ProjectPreviewFrame src={projectPreviewSrc(project)} />
              </div>

              <div className="order-1 min-w-0 space-y-8 lg:order-2 lg:pt-1">
                <header className="space-y-3">
                  <h1 className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-[800] tracking-[-0.03em] text-white leading-[1.1]">
                    {project.title}
                  </h1>
                  <p className="text-[15px] leading-[1.55] text-white/58">{subtitle}</p>
                </header>

                <div className="space-y-6 border-t border-white/[0.08] pt-6">
                  <MetaRow label={domainLabel}>
                    {project.domain && !wip ? (
                      <a
                        href={project.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex max-w-full items-center gap-2 font-[500] text-white/90 underline decoration-white/20 underline-offset-2 transition hover:decoration-white/45"
                      >
                        <span className="truncate">{domainClean}</span>
                        <ExternalIcon className="shrink-0 text-white/45 transition group-hover:text-white/70" />
                      </a>
                    ) : (
                      <span className="text-white/45">{websiteSoonLabel}</span>
                    )}
                  </MetaRow>

                  <MetaRow label={statusLabel}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={cx(
                          "h-2 w-2 shrink-0 rounded-full",
                          wip ? "bg-amber-400/90" : "bg-emerald-400/90"
                        )}
                      />
                      {wip ? wipLabel : liveLabel}
                    </span>
                  </MetaRow>

                  <MetaRow label={tagsLabel}>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[12px] font-[500] text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </MetaRow>

                  {project.stack?.length ? (
                    <MetaRow label={stackLabel}>
                      <span className="text-white/75">{project.stack.join(" · ")}</span>
                    </MetaRow>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-6">
                  {project.domain && !wip ? (
                    <a
                      href={project.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                        "bg-white text-[14px] font-[700] text-neutral-900 hover:bg-white/90 transition"
                      )}
                    >
                      {openSiteLabel}
                    </a>
                  ) : (
                    <div
                      className={cx(
                        "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                        "border border-white/[0.1] bg-white/[0.05] text-[14px] font-[700] text-white/45"
                      )}
                    >
                      {websiteSoonLabel}
                    </div>
                  )}

                  <a
                    href="https://t.me/TIVONIX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                      "text-[14px] font-[800] text-black",
                      "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                      "hover:brightness-105 transition"
                    )}
                  >
                    {estimateLabel}
                  </a>

                  <p className="text-[12px] leading-relaxed text-white/38">
                    {isRu ? (
                      <>
                        Напиши: <span className="text-white/52">что делаем</span>,{" "}
                        <span className="text-white/52">срок</span>, <span className="text-white/52">пример</span>.
                      </>
                    ) : (
                      <>
                        Message: <span className="text-white/52">what to build</span>,{" "}
                        <span className="text-white/52">timeline</span>, <span className="text-white/52">reference</span>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <article className="mt-14 border-t border-white/[0.08] pt-12 lg:mt-16 lg:pt-14">
              <ProjectDetailBody text={details} />

              {project.outcomes?.length ? (
                <div className="mt-12 border-t border-white/[0.08] pt-10">
                  <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">{resultsLabel}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {project.outcomes.map((x) => (
                      <li key={x} className="flex gap-3 text-[15px] leading-[1.6] text-white/[0.72]">
                        <span className="mt-[0.52em] h-1 w-1 shrink-0 rounded-full bg-white/32" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.testimonial ? (
                <figure className="mt-12 border-l-2 border-white/[0.12] pl-5">
                  <blockquote className="text-[15px] leading-[1.65] text-white/[0.74]">
                    “{project.testimonial.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-[13px] text-white/45">
                    <span className="font-[650] text-white/70">{project.testimonial.name}</span>
                    {" — "}
                    {project.testimonial.role}
                  </figcaption>
                </figure>
              ) : null}
            </article>
          </div>
        </Container>
      </Section>
      </div>
    </div>
  );
}
