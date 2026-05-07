// src/pages/ProjectsPage.tsx
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Header";
import HeroWebGLBg from "../components/landing/HeroWebGLBg";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { buildProjects, type Project } from "../data/projectsCatalog";
import {
  cx,
  DomainPill,
  projectPreviewSrc,
  ProjectPreviewFrame,
  s,
} from "./projectBlocks";

const HEADER_H = 72;

const GMAIL_EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent("tivoonix@gmail.com")}` +
  `&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

function useParallaxCards() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (!els.length) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;

      for (const el of els) {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const p = 1 - clamp(mid / vh, 0, 1);
        const amp = Number(el.dataset.parallaxAmp || 16);
        const y = (p - 0.5) * amp * -1.1;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

function ProjectCard({
  p,
  idx,
  isRu,
}: {
  p: Project;
  idx: number;
  isRu: boolean;
}) {
  const labelProject = isRu ? "Проект" : "Project";
  const moreLabel = isRu ? "Подробнее" : "Details";
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const wip = p.status === "wip";

  return (
    <div
      data-parallax
      data-parallax-amp={String(14 + idx * 4)}
      className={cx(
        "relative overflow-hidden rounded-[24px]",
        "border border-white/[0.06] bg-white/[0.04] backdrop-blur-2xl",
        "will-change-transform"
      )}
    >
      <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8">
        <ProjectPreviewFrame src={projectPreviewSrc(p)} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:items-start lg:gap-x-12">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
              {labelProject}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-[1.375rem] sm:text-[1.625rem] font-[780] tracking-[-0.03em] text-white/[0.94] leading-[1.12]">
                {p.title}
              </h2>
              {wip ? (
                <span
                  className={cx(
                    "inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.05]",
                    "px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/48"
                  )}
                >
                  WIP
                </span>
              ) : null}
            </div>

            <p className="mt-4 max-w-[60ch] text-[14px] sm:text-[15px] font-[450] leading-[1.62] text-white/[0.58]">
              {subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2.5 lg:shrink-0">
            <DomainPill href={p.domain} status={p.status ?? "live"} isRu={isRu} />

            <Link
              to={`/projects/${p.id}`}
              className={cx(
                "flex h-11 w-full items-center justify-center rounded-xl px-5",
                "border-0 bg-[#FF9A3D] text-[13px] font-[650] text-black",
                "transition-colors hover:bg-[#FFAC5C] active:bg-[#F08A2E]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55"
              )}
              aria-label={
                isRu
                  ? `Подробнее о проекте ${p.title}`
                  : `More details about ${p.title}`
              }
            >
              {moreLabel}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6">
          <ul className="flex list-none flex-wrap gap-x-2 gap-y-2 p-0" role="list">
            {p.tags.map((tag) => (
              <li key={tag}>
                <span
                  className={cx(
                    "inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.05]",
                    "px-2.5 py-1 text-[11px] font-[550] tracking-wide text-white/[0.68]"
                  )}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MoreCard({ isRu }: { isRu: boolean }) {
  const soonLabel = isRu ? "Дальше" : "Next";
  const title = isRu ? "Дальше — больше" : "More coming soon";
  const body = isRu
    ? "Добавим новые кейсы и продукты. Сейчас показываем живые домены + то, что в активной разработке."
    : "We’ll add more case studies and products. For now we show live domains + what’s in active development.";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[24px]",
        "border border-white/[0.06] bg-white/[0.04] backdrop-blur-2xl"
      )}
    >
      <div className="p-6 sm:p-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
          {soonLabel}
        </div>
        <div className="mt-3 text-[1.375rem] sm:text-[1.625rem] font-[780] tracking-[-0.03em] text-white/[0.94] leading-[1.12]">
          {title}
        </div>
        <div className="mt-4 max-w-[60ch] text-[14px] sm:text-[15px] leading-[1.62] text-white/[0.58]">
          {body}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  useParallaxCards();
  const { lang } = useLang();
  const isRu = lang === "ru";
  const projects = useMemo(() => buildProjects(isRu), [isRu]);

  const gmailLabel = "Gmail";
  const tgLabel = "Telegram";

  const seoTitle = isRu ? "Портфолио и кейсы — TIVONIX" : "Portfolio & case studies — TIVONIX";
  const seoDescription = isRu
    ? "Кейсы TIVONIX: разработка сайтов, лендингов, SaaS и MVP на React. Живые проекты — от идеи до запуска и поддержки."
    : "TIVONIX case studies: websites, landings, SaaS and MVPs on React. Live work from idea to launch and support.";

  return (
    <div className="relative min-h-screen" style={s({ "--headerH": `${HEADER_H}px` })}>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/projects"
        localizedPath="/projects"
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
      />
      <Header />

      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 overflow-hidden bg-black">
          <div className="absolute inset-0 h-full w-full scale-[1.03] will-change-transform">
            <HeroWebGLBg />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" />
        <div
          className="absolute inset-0"
          style={s({
            background:
              "radial-gradient(1200px 650px at 18% 12%, rgba(255,154,61,0.18), transparent 60%)," +
              "radial-gradient(900px 520px at 85% 20%, rgba(255,106,26,0.14), transparent 62%)",
          })}
        />
      </div>

      <Section className="pt-[calc(var(--headerH)+20px)] sm:pt-[calc(var(--headerH)+28px)] pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-10">
            <div className="lg:sticky lg:top-[calc(var(--headerH)+14px)] lg:self-start">
              <div className="max-w-[520px]">
                <h1 className="mt-7 text-[34px] sm:text-[48px] font-[800] tracking-[-0.03em] text-white leading-[1.05]">
                  {isRu ? "Проекты " : "Projects "}
                  <span className="bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                    TIVONIX
                  </span>
                </h1>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={GMAIL_EMAIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "border-0 bg-white/[0.10] backdrop-blur",
                      "text-[14px] font-[650] text-white/85 hover:bg-white/[0.14] transition whitespace-nowrap"
                    )}
                  >
                    {gmailLabel}
                  </a>

                  <a
                    href="https://t.me/TIVONIX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "text-[14px] font-[750] text-black whitespace-nowrap",
                      "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                      "shadow-[0_18px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition"
                    )}
                  >
                    {tgLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((p, idx) => (
                <ProjectCard key={p.id} p={p} idx={idx} isRu={isRu} />
              ))}

              <MoreCard isRu={isRu} />
              <div id="contact" className="pt-2" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
