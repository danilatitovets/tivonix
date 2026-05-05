// src/pages/ProjectsPage.tsx
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Header";
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

const PROJECTS_BG = "/images/projects-bg.png";
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
        "relative overflow-hidden rounded-[28px]",
        "border-0 bg-white/[0.05] backdrop-blur-2xl",
        "shadow-[0_20px_72px_rgba(0,0,0,0.42)]",
        "will-change-transform"
      )}
    >
      <div className="relative z-10 flex flex-col gap-7 p-5 sm:p-8">
        <ProjectPreviewFrame src={projectPreviewSrc(p)} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
          <div className="min-w-0 space-y-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {labelProject}
            </p>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-[22px] sm:text-[26px] font-[760] tracking-[-0.02em] text-white/95 leading-tight">
                {p.title}
              </h2>
              {wip ? (
                <span
                  className={cx(
                    "inline-flex items-center rounded-full px-2.5 py-0.5",
                    "border-0 bg-white/[0.08]",
                    "text-[10px] font-bold uppercase tracking-wider text-white/50"
                  )}
                >
                  WIP
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-[15px] leading-[1.55] text-white/65 max-w-[56ch]">
              {subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className={cx(
                    "inline-flex items-center rounded-full px-3 py-1.5",
                    "border-0 bg-white/[0.08]",
                    "text-[12px] text-white/70"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end lg:pt-1 shrink-0">
            <DomainPill
              href={p.domain}
              status={p.status ?? "live"}
              isRu={isRu}
            />

            <Link
              to={`/projects/${p.id}`}
              className={cx(
                "inline-flex h-11 min-w-[140px] items-center justify-center rounded-2xl px-6",
                "border-0 bg-white/[0.10] backdrop-blur",
                "text-[14px] font-[750] text-white/85 hover:bg-white/[0.14] transition whitespace-nowrap",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40"
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
        "relative overflow-hidden rounded-[28px]",
        "border-0 bg-white/[0.05] backdrop-blur-2xl",
        "shadow-[0_20px_72px_rgba(0,0,0,0.42)]"
      )}
    >
      <div
        className="pointer-events-none absolute -inset-10 opacity-70"
        style={s({
          background:
            "radial-gradient(520px 260px at 20% 25%, rgba(255,154,61,0.22), transparent 62%)," +
            "radial-gradient(520px 260px at 85% 15%, rgba(255,106,26,0.16), transparent 62%)",
        })}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 p-7 sm:p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {soonLabel}
        </div>
        <div className="mt-3 text-[22px] sm:text-[28px] font-[800] tracking-[-0.02em] text-white/95 leading-tight">
          {title}
        </div>
        <div className="mt-3 text-[15px] leading-[1.55] text-white/65 max-w-[70ch]">
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

  return (
    <div className="relative min-h-screen" style={s({ "--headerH": `${HEADER_H}px` })}>
      <SEO
        title="Проекты — TIVONIX"
        description="Портфолио и кейсы TIVONIX: лендинги, SaaS, MVP, веб-продукты. Разработка от идеи до запуска."
        canonicalPath="/projects"
      />
      <Header />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={PROJECTS_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_65%] opacity-55 blur-[6px]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65),rgba(0,0,0,0.95))]" />
        <div
          className="absolute inset-0"
          style={s({
            background:
              "radial-gradient(1200px 650px at 18% 12%, rgba(255,154,61,0.20), transparent 60%)," +
              "radial-gradient(900px 520px at 85% 20%, rgba(255,106,26,0.16), transparent 62%)",
          })}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" />
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
