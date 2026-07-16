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
import { cx, projectPreviewSrc, ProjectPreviewFrame, ProjectGalleryStrip, s } from "./projectBlocks";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { leadFormCopy } from "../i18n/leadFormCopy";
import { trackProjectView } from "../lib/analytics";
import { useEffect } from "react";

const HEADER_H = 72;

const BULLET_RE = /^[•\-]\s*/;
const LEAD_META_RE = /^(Формат|Срок|Format|Timeline)\s*:/i;

function clipMetaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max - 1);
  const i = slice.lastIndexOf(" ");
  return `${(i > 70 ? slice.slice(0, i) : slice).trimEnd()}…`;
}

function isSectionHeading(line: string) {
  const t = line.trim();
  if (!t || BULLET_RE.test(t) || LEAD_META_RE.test(t)) return false;
  if (t.length > 72) return false;
  if (/[.!?…]$/.test(t)) return false;
  // Одно предложение / заголовок секции, а не абзац с запятыми-развёрнутым текстом
  if ((t.match(/[,;:—]/g) || []).length >= 2) return false;
  return true;
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

/** Инлайн: **важное** → жирный акцент, остальной текст спокойнее. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-[700] text-white/[0.92]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}

function DetailBulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-none space-y-2.5">
      {items.map((item, idx) => (
        <li
          key={`${idx}-${item.slice(0, 48)}`}
          className="text-[15px] leading-[1.7] text-white/[0.66] sm:text-[16px]"
        >
          <span className="mr-2.5 text-white/28 select-none" aria-hidden>
            —
          </span>
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}

/** Заголовки секций + абзацы + списки (как в каталоге). Без карточек и border. */
function ProjectDetailBody({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim());
  const nodes: ReactNode[] = [];
  let i = 0;
  let k = 0;

  const nextNonEmpty = (from: number) => {
    for (let j = from; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t) return { j, t };
    }
    return null;
  };

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // Intro meta: "Формат: …", "Срок: …"
    if (LEAD_META_RE.test(line)) {
      const colon = line.indexOf(":");
      const label = colon >= 0 ? line.slice(0, colon + 1) : line;
      const value = colon >= 0 ? line.slice(colon + 1).trim() : "";
      nodes.push(
        <p key={k++} className="mb-9 text-[13px] leading-snug text-white/48">
          <span className="font-[700] uppercase tracking-[0.14em] text-white/55">{label}</span>
          {value ? <span className="ml-2 font-[500] normal-case tracking-normal text-white/72">{value}</span> : null}
        </p>
      );
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
        <div key={k++} className="mb-9">
          <DetailBulletList items={items} />
        </div>
      );
      continue;
    }

    const nxt = nextNonEmpty(i + 1);
    const heading =
      isSectionHeading(line) &&
      nxt &&
      (BULLET_RE.test(nxt.t) || !isSectionHeading(nxt.t));

    if (heading) {
      const title = line;
      i++;
      while (i < lines.length && !lines[i].trim()) i++;

      let body: ReactNode = null;
      if (i < lines.length && BULLET_RE.test(lines[i].trim())) {
        const items: string[] = [];
        while (i < lines.length) {
          const L = lines[i].trim();
          if (!L) break;
          if (!BULLET_RE.test(L)) break;
          items.push(L.replace(BULLET_RE, ""));
          i++;
        }
        body = <DetailBulletList items={items} />;
      } else {
        const para: string[] = [];
        while (i < lines.length) {
          const L = lines[i].trim();
          if (!L) break;
          if (BULLET_RE.test(L)) break;
          if (isSectionHeading(L) && nextNonEmpty(i + 1)) break;
          para.push(L);
          i++;
        }
        if (para.length) {
          body = (
            <div className="mt-3 space-y-3">
              {para.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[15px] leading-[1.75] text-white/[0.66] sm:text-[16px]"
                >
                  <RichText text={p} />
                </p>
              ))}
            </div>
          );
        }
      }

      nodes.push(
        <section key={k++} className="mb-10 sm:mb-12">
          <h2 className="text-[clamp(1.2rem,2.2vw,1.55rem)] font-[780] tracking-[-0.03em] leading-[1.15] text-white">
            {title}
          </h2>
          {body}
        </section>
      );
      continue;
    }

    const para: string[] = [];
    while (i < lines.length) {
      const L = lines[i].trim();
      if (!L) break;
      if (BULLET_RE.test(L)) break;
      if (isSectionHeading(L) && nextNonEmpty(i + 1)) break;
      para.push(L);
      i++;
    }
    if (para.length) {
      nodes.push(
        <div key={k++} className="mb-8 space-y-3 last:mb-0">
          {para.map((p, idx) => (
            <p
              key={idx}
              className="text-[15px] leading-[1.75] text-white/[0.66] sm:text-[16px]"
            >
              <RichText text={p} />
            </p>
          ))}
        </div>
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

  useEffect(() => {
    if (project?.id) trackProjectView(project.id);
  }, [project?.id]);

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
  const websiteSoonLabel = isRu ? "Сайт скоро" : "Website soon";
  const roleLabel = isRu ? "Роль TIVONIX" : "TIVONIX role";
  const roleValue = isRu
    ? "Дизайн и разработка под ключ"
    : "End-to-end design and development";

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
                <ProjectPreviewFrame src={projectPreviewSrc(project)} variant="detail" />
                {project.gallery?.length ? (
                  <ProjectGalleryStrip images={project.gallery} isRu={isRu} />
                ) : null}
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

                  <MetaRow label={roleLabel}>
                    <span>{roleValue}</span>
                  </MetaRow>

                  <MetaRow label={tagsLabel}>
                    <span className="text-white/70">
                      {project.tags.map((tag, i) => (
                        <span key={tag}>
                          {i > 0 ? <span className="mx-1.5 text-white/25">·</span> : null}
                          {tag}
                        </span>
                      ))}
                    </span>
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

                  <LeadCTAButton
                    source="project_page"
                    variant="primary"
                    className="!h-11 w-full !rounded-lg !text-[14px] !font-[800]"
                  >
                    {leadFormCopy(lang).ctaDiscuss}
                  </LeadCTAButton>

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

            <article className="mt-14 max-w-[42rem] pt-2 lg:mt-16">
              <ProjectDetailBody text={details} />

              {project.outcomes?.length ? (
                <div className="mt-2 max-w-[42rem]">
                  <h2 className="text-[clamp(1.2rem,2.2vw,1.55rem)] font-[780] tracking-[-0.03em] leading-[1.15] text-white">
                    {resultsLabel}
                  </h2>
                  <DetailBulletList items={project.outcomes} />
                </div>
              ) : null}

              {project.testimonial ? (
                <figure className="mt-12 max-w-[42rem]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF9A3D]/85">
                    {isRu ? "Отзыв · 5 из 5" : "Review · 5 of 5"}
                  </p>
                  <blockquote className="mt-3 text-[16px] leading-[1.7] text-white/[0.78] sm:text-[17px]">
                    “{project.testimonial.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-[13px] text-white/40">
                    <span className="font-[700] text-white/72">{project.testimonial.name}</span>
                    <span className="mx-1.5 text-white/25">·</span>
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
