// src/pages/ProjectDetailPage.tsx — Case System: досье кейса, не стена текста
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Header from "../components/landing/Header";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { buildProjects, findProjectBySlug, type Project } from "../data/projectsCatalog";
import { getProjectCaseSystem, type CaseSwatch } from "../data/projectCaseSystem";
import { cx, projectPreviewSrc, ProjectGalleryStrip, s } from "./projectBlocks";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { leadFormCopy } from "../i18n/leadFormCopy";
import { trackProjectView } from "../lib/analytics";
import { buildProjectCaseSchema } from "../lib/schema";
import { pathForLang } from "../lib/localePaths";
import type { Lang } from "../i18n/LangProvider";

const HEADER_H = 72;
const CANONICAL_ORIGIN = "https://tivonix.tech";

const BULLET_RE = /^[•\-]\s*/;
const LEAD_META_RE = /^(Формат|Срок|Format|Timeline|Продукт|Product)\s*:/i;

const BODY =
  "font-sans text-[16px] font-medium leading-[1.55] tracking-normal text-[#c3c3cc] sm:text-[17px]";
const H2 =
  "font-hero text-[clamp(1.55rem,2.8vw,2.1rem)] font-normal uppercase tracking-[0.02em] leading-[1.05] text-[#ededf3]";

function clipMetaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max - 1);
  const i = slice.lastIndexOf(" ");
  return `${(i > 70 ? slice.slice(0, i) : slice).trimEnd()}…`;
}

function absoluteAssetUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${CANONICAL_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

function isSectionHeading(line: string) {
  const t = line.trim();
  if (!t || BULLET_RE.test(t) || LEAD_META_RE.test(t)) return false;
  if (t.length > 72) return false;
  if (/[.!?…]$/.test(t)) return false;
  if ((t.match(/[,;:—]/g) || []).length >= 2) return false;
  return true;
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

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          return (
            <span key={idx} className="font-[600] text-[#b7f500]">
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-[600] text-[#ededf3]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 border-t border-white/[0.06] py-3.5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 sm:py-5 sm:items-start">
      <dt className="text-[12px] font-[500] tracking-normal text-[#8a8a8e] sm:text-[13px]">{label}</dt>
      <dd className="min-w-0 text-[14px] font-[400] leading-[1.45] tracking-normal text-[#ededf3] sm:text-[15px]">
        {children}
      </dd>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#1c1c1f] px-2.5 py-1 text-[11px] font-[500] tracking-normal text-[#c3c3cc] sm:px-3.5 sm:py-1.5 sm:text-[12px]">
      {children}
    </span>
  );
}

/** Shorten long hosts (e.g. Railway) for narrow screens — full URL stays in href. */
function formatDomainLabel(domainClean: string): string {
  const slash = domainClean.indexOf("/");
  const host = slash >= 0 ? domainClean.slice(0, slash) : domainClean;
  const path = slash >= 0 ? domainClean.slice(slash) : "";
  const pathSuffix = path === "/login" || path === "/" ? "" : path;

  if (host.length <= 32) return host + pathSuffix;

  const railway = host.match(/^([^.]+)\.(?:up\.)?railway\.app$/i);
  if (railway) {
    let slug = railway[1].replace(/-(production|prod|staging|dev)$/i, "");
    if (slug.length > 18) slug = `${slug.slice(0, 16)}…`;
    return `${slug}.railway.app${pathSuffix}`;
  }

  const parts = host.split(".");
  if (parts.length >= 3) {
    const head = parts[0].length > 16 ? `${parts[0].slice(0, 14)}…` : parts[0];
    return `${head}.${parts.slice(-2).join(".")}${pathSuffix}`;
  }

  return `${host.slice(0, 28)}…${pathSuffix}`;
}

function FeatureGrid({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid list-none gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-4">
      {items.map((item, idx) => (
        <li
          key={`${idx}-${item.slice(0, 40)}`}
          className="rounded-[12px] bg-[#1c1c1f] px-4 py-3.5 text-[14px] font-[400] leading-[1.45] text-[#c3c3cc] sm:px-5 sm:py-4 sm:text-[16px]"
        >
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}

function CaseBrandIntro({
  title,
  mood,
  story,
  logo,
  logoFit = "cover",
  domain,
  domainClean,
  wip,
}: {
  title: string;
  mood: string;
  story: string;
  logo?: string;
  logoFit?: "cover" | "contain";
  domain?: string;
  domainClean: string;
  wip: boolean;
}) {
  const storyParas = story.split(/\n\n+/).map((para, idx) => (
    <p key={idx}>
      <RichText text={para} />
    </p>
  ));

  const renderLogo = (size: "mobile" | "desktop") =>
    logo ? (
      <div
        className={cx(
          "overflow-hidden bg-black",
          size === "desktop"
            ? cx(
                "shrink-0 rounded-[16px]",
                logoFit === "contain" ? "h-[5.25rem] w-16" : "h-16 w-16"
              )
            : cx(
                "mb-4 rounded-[12px] lg:hidden",
                logoFit === "contain" ? "h-12 w-10" : "h-11 w-11"
              )
        )}
      >
        <img
          src={logo}
          alt=""
          className={cx(
            "h-full w-full object-center",
            logoFit === "contain" ? "object-contain" : "object-cover"
          )}
          draggable={false}
          decoding="async"
        />
      </div>
    ) : null;

  return (
    <header>
      {/* Desktop: title + mood + logo. Mobile skips mood (already in hero). */}
      <div className="hidden items-start justify-between gap-6 lg:flex">
        <div className="min-w-0 flex-1">
          <h2 className="font-hero text-[clamp(1.85rem,4vw,2.75rem)] font-normal uppercase tracking-[0.02em] leading-[1.05] text-[#ededf3]">
            {title}
          </h2>
          <p className="mt-3 text-[18px] font-[400] leading-snug text-[#c3c3cc]">{mood}</p>
        </div>
        {renderLogo("desktop")}
      </div>

      {renderLogo("mobile")}

      <div className={cx("max-w-[42rem] space-y-3.5 sm:space-y-4 lg:mt-8", BODY)}>
        {storyParas}
      </div>

      {domain && !wip ? (
        <a
          href={domain}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex max-w-full items-center gap-2 text-[14px] font-[500] text-[#c3c3cc] transition hover:text-white sm:mt-8 sm:text-[15px]"
          title={domainClean}
        >
          <ExternalIcon className="shrink-0 text-[#8a8a8e]" />
          <span className="truncate">{formatDomainLabel(domainClean)}</span>
        </a>
      ) : null}
    </header>
  );
}

function ColorPalette({
  swatches,
  isRu,
}: {
  swatches: CaseSwatch[];
  isRu: boolean;
}) {
  const brand = swatches.filter((s) => s.group === "brand");
  const neutrals = swatches.filter((s) => s.group === "neutral");

  return (
    <section className="mb-12 scroll-mt-28 sm:mb-[72px]" aria-labelledby="case-palette">
      <h2 id="case-palette" className={H2}>
        {isRu ? "Палитра" : "Color Palette"}
      </h2>

      {brand.length ? (
        <div className="mt-7 sm:mt-10">
          <p className="text-[13px] font-[500] text-[#8a8a8e]">
            {isRu ? "Бренд" : "Brand"}
          </p>
          <div className="mt-3 space-y-6 sm:mt-4 sm:space-y-8">
            {brand.map((sw) => (
              <PaletteSwatch key={sw.hex + sw.name} swatch={sw} isRu={isRu} wide />
            ))}
          </div>
        </div>
      ) : null}

      {neutrals.length ? (
        <div className="mt-9 sm:mt-12">
          <p className="text-[13px] font-[500] text-[#8a8a8e]">
            {isRu ? "Нейтрали" : "Neutrals"}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-6 sm:mt-4 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4">
            {neutrals.map((sw) => (
              <PaletteSwatch key={sw.hex + sw.name} swatch={sw} isRu={isRu} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PaletteSwatch({
  swatch,
  isRu,
  wide,
}: {
  swatch: CaseSwatch;
  isRu: boolean;
  wide?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isLight = luminance(swatch.hex) > 0.55;
  const copyLabel = isRu ? "Копировать" : "Copy";
  const copiedLabel = isRu ? "Скопировано" : "Copied";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(swatch.hex);
    } catch {
      const el = document.createElement("textarea");
      el.value = swatch.hex;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={cx("min-w-0", wide && "max-w-xl")}>
      <button
        type="button"
        onClick={onCopy}
        className={cx(
          "group relative w-full overflow-hidden rounded-2xl ring-1 ring-white/[0.06]",
          "outline-none transition focus-visible:ring-2 focus-visible:ring-[#FF6B2C]/55",
          wide ? "h-16 sm:h-[72px]" : "h-14 sm:h-16"
        )}
        style={{ backgroundColor: swatch.hex }}
        aria-label={`${copyLabel} ${swatch.name} ${swatch.hex}`}
        title={`${copyLabel} ${swatch.hex}`}
      >
        <span
          className={cx(
            "pointer-events-none absolute inset-0 rounded-2xl",
            isLight ? "ring-1 ring-inset ring-black/10" : "ring-1 ring-inset ring-white/[0.04]"
          )}
          aria-hidden
        />
        <span
          className={cx(
            "absolute right-3 top-1/2 z-[1] -translate-y-1/2",
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
            "text-[11px] font-[600] tracking-normal backdrop-blur-sm",
            "opacity-100 transition duration-150 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100",
            isLight
              ? "bg-black/55 text-white"
              : "bg-white/90 text-[#171719]"
          )}
        >
          <CopyIcon className="h-3 w-3 shrink-0" />
          {copied ? copiedLabel : copyLabel}
        </span>
      </button>
      <p className="mt-3 text-[15px] font-medium tracking-normal text-[#ededf3] sm:text-[16px]">
        {swatch.name}
      </p>
      <button
        type="button"
        onClick={onCopy}
        className="mt-0.5 font-mono text-[12px] tabular-nums text-[#8a8a8e] transition hover:text-[#ededf3]"
      >
        {copied ? copiedLabel : swatch.hex}
      </button>
      <p className="mt-2 max-w-[36ch] text-[13px] leading-[1.45] text-[#78787d] sm:text-[14px]">
        {isRu ? swatch.roleRu : swatch.roleEn}
      </p>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 15V7a2 2 0 0 1 2-2h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  if (h.length !== 6) return 0;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

type ParsedBlock =
  | { type: "meta"; label: string; value: string }
  | { type: "prose"; paragraphs: string[] }
  | { type: "section"; title: string; paragraphs?: string[]; bullets?: string[] }
  | { type: "bullets"; items: string[] };

function parseCaseBody(text: string): ParsedBlock[] {
  const lines = text.split("\n").map((l) => l.trim());
  const blocks: ParsedBlock[] = [];
  let i = 0;

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

    if (LEAD_META_RE.test(line)) {
      const colon = line.indexOf(":");
      const label = colon >= 0 ? line.slice(0, colon).trim() : line;
      const value = colon >= 0 ? line.slice(colon + 1).trim() : "";
      blocks.push({ type: "meta", label, value });
      i++;
      continue;
    }

    if (BULLET_RE.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const L = lines[i].trim();
        if (!L || !BULLET_RE.test(L)) break;
        items.push(L.replace(BULLET_RE, ""));
        i++;
      }
      blocks.push({ type: "bullets", items });
      continue;
    }

    const nxt = nextNonEmpty(i + 1);
    const heading =
      isSectionHeading(line) && nxt && (BULLET_RE.test(nxt.t) || !isSectionHeading(nxt.t));

    if (heading) {
      const title = line;
      i++;
      while (i < lines.length && !lines[i].trim()) i++;

      if (i < lines.length && BULLET_RE.test(lines[i].trim())) {
        const items: string[] = [];
        while (i < lines.length) {
          const L = lines[i].trim();
          if (!L || !BULLET_RE.test(L)) break;
          items.push(L.replace(BULLET_RE, ""));
          i++;
        }
        blocks.push({ type: "section", title, bullets: items });
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
        blocks.push({ type: "section", title, paragraphs: para });
      }
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
    if (para.length) blocks.push({ type: "prose", paragraphs: para });
  }

  return blocks;
}

function CaseDetailBody({
  text,
  isRu,
  palette,
}: {
  text: string;
  isRu: boolean;
  palette?: CaseSwatch[];
}) {
  const blocks = useMemo(() => parseCaseBody(text), [text]);
  const rest = blocks.filter((b) => b.type !== "meta");

  let contentIndex = 0;
  const nodes: ReactNode[] = [];

  if (palette?.length) {
    nodes.push(<ColorPalette key="palette" swatches={palette} isRu={isRu} />);
  }

  for (const block of rest) {
    contentIndex++;

    if (block.type === "prose") {
      nodes.push(
        <div key={`prose-${contentIndex}`} className="mb-12 max-w-[42rem] space-y-4 last:mb-0 sm:mb-14">
          {block.paragraphs.map((p, idx) => (
            <p key={idx} className={BODY}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      );
    } else if (block.type === "bullets") {
      nodes.push(
        <div key={`bullets-${contentIndex}`} className="mb-14 sm:mb-16">
          <FeatureGrid items={block.items} />
        </div>
      );
    } else if (block.type === "section") {
      const isOutcome = /^(итог|outcome|результат|result)/i.test(block.title);
      nodes.push(
        <section
          key={`section-${contentIndex}`}
          className="mb-12 scroll-mt-28 border-t border-white/[0.06] pt-8 sm:mb-[72px] sm:pt-12"
        >
          <h2 className={H2}>{block.title}</h2>
          {block.paragraphs?.length ? (
            <div className={cx("mt-5 max-w-[42rem] space-y-4", isOutcome && "text-[#ededf3]")}>
              {block.paragraphs.map((p, idx) => (
                <p key={idx} className={BODY}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          ) : null}
          {block.bullets?.length ? <FeatureGrid items={block.bullets} /> : null}
        </section>
      );
    }
  }

  return <div className="text-left">{nodes}</div>;
}

function OutcomesBlock({
  items,
  isRu,
}: {
  items: string[];
  isRu: boolean;
}) {
  return (
    <section id="outcomes" className="mt-4 scroll-mt-28 sm:mt-6">
      <h2 className={H2}>{isRu ? "Что получили" : "Outcomes"}</h2>
      <ol className="mt-6 list-none space-y-0 divide-y divide-white/[0.06] sm:mt-8">
        {items.map((item, idx) => (
          <li key={`${idx}-${item.slice(0, 32)}`} className="flex gap-4 py-4 first:pt-0 last:pb-0 sm:gap-8 sm:py-5">
            <span className="font-hero w-7 shrink-0 text-[16px] font-normal tabular-nums tracking-[0.02em] text-[#8a8a8e] sm:w-8 sm:text-[18px]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <p className="min-w-0 text-[15px] font-[400] leading-[1.45] text-[#c3c3cc] sm:text-[18px]">
              <RichText text={item} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MoreLikeThis({
  currentId,
  lang,
}: {
  currentId: string;
  lang: Lang;
}) {
  const isRu = lang === "ru";
  const others = useMemo(
    () => buildProjects(isRu).filter((p) => p.id !== currentId).slice(0, 4),
    [currentId, isRu]
  );

  if (!others.length) return null;

  const title = isRu ? "Ещё проекты" : "More like this";

  return (
    <section className="mt-14 sm:mt-24" aria-labelledby="more-like-this">
      <h2
        id="more-like-this"
        className="mb-6 font-hero text-[clamp(1.35rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-[#ededf3] sm:mb-10"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
        {others.map((p) => (
          <MoreProjectCard key={p.id} project={p} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function MoreProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const isRu = lang === "ru";
  const cover = projectPreviewSrc(project);
  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;

  return (
    <Link to={pathForLang(`/projects/${project.id}`, lang)} className="group block min-w-0 outline-none">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#141416]">
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="mt-4 flex items-start gap-3">
        <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1c1c1f]">
          <img src={cover} alt="" className="h-full w-full object-cover" draggable={false} />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-medium tracking-normal text-[#ededf3] transition group-hover:text-white">
            {project.title}
          </p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.45] tracking-normal text-[#8a8a8e]">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const isRu = lang === "ru";

  const project = useMemo(() => findProjectBySlug(slug, isRu), [slug, isRu]);
  const caseSystem = project ? getProjectCaseSystem(project.id) : undefined;

  useEffect(() => {
    if (project?.id) trackProjectView(project.id);
  }, [project?.id]);

  const backLabel = isRu ? "Все проекты" : "All projects";
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
  const detailsLabel = isRu ? "Подробнее" : "Details";

  if (!slug) return <Navigate to={pathForLang("/projects", lang)} replace />;
  if (!project) return <Navigate to={pathForLang("/projects", lang)} replace />;

  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const details = isRu ? project.detailsRu : project.detailsEn;
  const mood = caseSystem ? (isRu ? caseSystem.moodRu : caseSystem.moodEn) : null;
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
  const coverAbsolute = absoluteAssetUrl(coverSrc);

  const schemaJsonLd = buildProjectCaseSchema({
    id: project.id,
    title: project.title,
    description: seoDescription,
    coverUrl: coverAbsolute,
    domain: project.domain,
    tags: project.tags,
    stack: project.stack,
    lang,
  });

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-[#0a0a0b]"
      style={s({ "--headerH": `${HEADER_H}px` })}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/projects/${project.id}`}
        ogImage={coverAbsolute}
        ogType="article"
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
        schemaJsonLd={schemaJsonLd}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <img
          src={coverSrc}
          alt=""
          className="absolute left-1/2 top-[-10%] h-[110%] w-[110%] max-w-none -translate-x-1/2 object-cover object-center opacity-40"
          style={s({
            filter: "blur(56px) saturate(1.08) brightness(0.55)",
            WebkitFilter: "blur(56px) saturate(1.08) brightness(0.55)",
          })}
          draggable={false}
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#0a0a0b]/78" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.55)_0%,rgba(10,10,11,0.92)_55%,#0a0a0b_100%)]" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="pt-[calc(var(--headerH)+16px)] pb-20 sm:pt-[calc(var(--headerH)+32px)] sm:pb-36">
          <Container>
            <div className="mt-4 flex flex-col gap-1 sm:mt-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <Link
                to={pathForLang("/projects", lang)}
                className="inline-flex w-fit items-center gap-2 text-[13px] font-[500] tracking-normal text-[#8a8a8e] transition hover:text-[#ededf3]"
              >
                <span aria-hidden>←</span>
                {backLabel}
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 items-start gap-8 sm:mt-8 sm:gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.88fr)] lg:gap-14 xl:gap-16">
              <div className="order-1 min-w-0">
                <figure className="relative w-full overflow-hidden rounded-[12px] bg-[#141416]">
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src={coverSrc}
                      alt={`${project.title} — ${isRu ? "обложка кейса" : "case cover"}`}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      draggable={false}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </figure>

                {project.gallery?.length ? (
                  <div className="mt-5 sm:mt-8">
                    <ProjectGalleryStrip images={project.gallery} isRu={isRu} />
                  </div>
                ) : null}
              </div>

              <div className="order-2 min-w-0 lg:pt-1">
                <header className="space-y-3 sm:space-y-4">
                  <h1 className="font-hero text-[clamp(1.85rem,4.2vw,2.75rem)] font-normal uppercase tracking-[0.02em] leading-[1.02] text-[#ededf3]">
                    {project.title}
                  </h1>
                  <p className={cx("max-w-[36ch]", BODY)}>{mood ?? subtitle}</p>
                  {mood ? (
                    <p className="max-w-[40ch] text-[13px] leading-relaxed text-[#8a8a8e] sm:text-[14px]">{subtitle}</p>
                  ) : null}
                </header>

                <dl className="mt-6 sm:mt-8">
                  <SpecRow label={domainLabel}>
                    {project.domain && !wip ? (
                      <a
                        href={project.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-2 transition hover:text-white"
                      >
                        <span className="truncate">{formatDomainLabel(domainClean)}</span>
                        <ExternalIcon className="shrink-0 text-[#8a8a8e]" />
                      </a>
                    ) : (
                      <span className="text-[#8a8a8e]">{websiteSoonLabel}</span>
                    )}
                  </SpecRow>

                  <SpecRow label={statusLabel}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={cx(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          wip ? "bg-amber-400/90" : "bg-emerald-400/90"
                        )}
                      />
                      {wip ? wipLabel : liveLabel}
                    </span>
                  </SpecRow>

                  <SpecRow label={roleLabel}>{roleValue}</SpecRow>

                  <SpecRow label={tagsLabel}>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <Pill key={tag}>{tag}</Pill>
                      ))}
                    </div>
                  </SpecRow>

                  {project.stack?.length ? (
                    <SpecRow label={stackLabel}>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.stack.map((tech) => (
                          <Pill key={tech}>{tech}</Pill>
                        ))}
                      </div>
                    </SpecRow>
                  ) : null}
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4">
                  {project.domain && !wip ? (
                    <a
                      href={project.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#FF6B2C] px-6 text-[15px] font-medium tracking-normal text-white transition hover:bg-[#ff7d45] sm:h-[52px]"
                    >
                      {openSiteLabel}
                    </a>
                  ) : (
                    <div className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1c1c1f] px-6 text-[15px] font-medium tracking-normal text-[#8a8a8e] sm:h-[52px]">
                      {websiteSoonLabel}
                    </div>
                  )}

                  <LeadCTAButton
                    source="project_page"
                    variant="plain"
                    className="!h-12 w-full !rounded-full !border !border-white/15 !bg-transparent !px-6 !text-[15px] !font-medium !tracking-normal !text-[#ededf3] hover:!border-white/25 hover:!bg-white/[0.03] hover:!text-white sm:!h-auto sm:!min-h-0 sm:!rounded-none sm:!border-0 sm:!px-0 sm:!py-1 sm:hover:!bg-transparent sm:hover:!text-white/75"
                  >
                    {leadFormCopy(lang).ctaDiscuss}
                  </LeadCTAButton>

                  <p className="text-left text-[12px] leading-relaxed tracking-normal text-[#8a8a8e] sm:text-[13px]">
                    {isRu ? (
                      <>
                        Напиши: <span className="text-[#c3c3cc]">что делаем</span>,{" "}
                        <span className="text-[#c3c3cc]">срок</span>,{" "}
                        <span className="text-[#c3c3cc]">пример</span>.
                      </>
                    ) : (
                      <>
                        Message: <span className="text-[#c3c3cc]">what to build</span>,{" "}
                        <span className="text-[#c3c3cc]">timeline</span>,{" "}
                        <span className="text-[#c3c3cc]">reference</span>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <article
              className="mt-12 max-w-[52rem] sm:mt-[72px] lg:mt-24"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <meta itemProp="name" content={project.title} />
              <meta itemProp="description" content={subtitle} />
              <link itemProp="url" href={`${CANONICAL_ORIGIN}/projects/${project.id}`} />

              <div className="mb-8 border-b border-white/[0.06] pb-8 sm:mb-12 sm:pb-12">
                {caseSystem ? (
                  <CaseBrandIntro
                    title={project.title}
                    mood={isRu ? caseSystem.moodRu : caseSystem.moodEn}
                    story={isRu ? caseSystem.storyRu : caseSystem.storyEn}
                    logo={caseSystem.logo}
                    logoFit={caseSystem.logoFit}
                    domain={project.domain}
                    domainClean={domainClean}
                    wip={wip}
                  />
                ) : (
                  <>
                    <h2 className={H2}>{detailsLabel}</h2>
                    <p className="mt-3 max-w-[40rem] text-[15px] leading-relaxed text-[#8a8a8e]">
                      {isRu
                        ? "Как устроен продукт: смысл, сценарии, интерфейс и токены."
                        : "How the product is built: intent, flows, interface and tokens."}
                    </p>
                  </>
                )}
              </div>

              <CaseDetailBody
                text={details}
                isRu={isRu}
                palette={caseSystem?.palette}
              />

              {project.outcomes?.length ? (
                <OutcomesBlock items={project.outcomes} isRu={isRu} />
              ) : null}

              {project.testimonial ? (
                <figure className="mt-12 max-w-[42rem] border-t border-white/[0.06] pt-8 sm:mt-[72px] sm:pt-12">
                  <p className="text-[13px] font-[500] tracking-normal text-[#8a8a8e]">
                    {isRu ? "Отзыв · 5 из 5" : "Review · 5 of 5"}
                  </p>
                  {project.testimonial.textAr ? (
                    <>
                      <blockquote
                        className="mt-3 text-[16px] font-[400] leading-[1.65] tracking-[0.005em] text-[#c3c3cc] sm:mt-4 sm:text-[20px] sm:leading-[1.7]"
                        dir="rtl"
                        lang="ar"
                      >
                        “{project.testimonial.textAr}”
                      </blockquote>
                      <p className="mt-4 text-[12px] font-[500] tracking-normal text-[#8a8a8e] sm:mt-5">
                        {isRu ? "Расшифровка" : "Translation"}
                      </p>
                      <blockquote className="mt-2 text-[15px] font-[400] leading-[1.5] tracking-[0.005em] text-[#a8a8b0] sm:text-[17px]">
                        “{project.testimonial.text}”
                      </blockquote>
                    </>
                  ) : (
                    <blockquote className="mt-3 text-[16px] font-[400] leading-[1.5] tracking-[0.005em] text-[#c3c3cc] sm:mt-4 sm:text-[20px]">
                      “{project.testimonial.text}”
                    </blockquote>
                  )}
                  <figcaption className="mt-4 text-[13px] tracking-normal text-[#8a8a8e] sm:mt-5">
                    <span className="font-medium text-[#ededf3]">{project.testimonial.name}</span>
                    <span className="mx-1.5 text-white/20">·</span>
                    {project.testimonial.role}
                  </figcaption>
                </figure>
              ) : null}
            </article>

            <MoreLikeThis currentId={project.id} lang={lang} />
          </Container>
        </main>
      </div>
    </div>
  );
}
