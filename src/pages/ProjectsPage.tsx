// src/pages/ProjectsPage.tsx
import { useEffect, useMemo, type CSSProperties } from "react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Headerdouble";
import { useLang } from "../i18n/LangProvider";
const HERO_IMG = "/images/hero.png";
const PROJECTS_BG = "/images/projects-bg.png";
const HEADER_H = 72;

const UPC_DOMAIN = "https://upc.promo/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  text: string;
};

type Project = {
  id: string;
  title: string;
  subtitleRu: string;
  subtitleEn: string;
  domain: string;
  demoUrl?: string;
  tags: string[];
  cover?: string;
  testimonial?: Testimonial;
};

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

type Style = CSSProperties & Record<string, any>;
const s = (v: Record<string, any>) => v as Style;

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

function DomainPill({ href }: { href: string }) {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const clean = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const openLabel = isRu ? "Открыть" : "Open";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "group inline-flex items-center gap-2",
        "rounded-2xl px-4 py-2",
        "border border-white/12 bg-black/30 backdrop-blur-xl",
        "text-white/85 hover:text-white transition",
        "shadow-[0_14px_60px_rgba(0,0,0,0.40)]"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-[#FF9A3D]/80 shadow-[0_0_0_4px_rgba(255,154,61,0.12)]" />
      <span className="text-[13px] font-[650] tracking-tight">{clean}</span>
      <span className="ml-1 text-[#FF9A3D]/80 group-hover:text-[#FF6A1A] transition">
        •
      </span>
      <span className="text-[12px] text-white/55 group-hover:text-white/70 transition">
        {openLabel}
      </span>
    </a>
  );
}

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const labelProject = isRu ? "ПРОЕКТ" : "PROJECT";
  const demoLabel = isRu ? "Демо" : "Demo";
  const contactLabel = isRu ? "Написать" : "Contact";
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;

  return (
    <div
      data-parallax
      data-parallax-amp={String(14 + idx * 4)}
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "border border-white/10 bg-white/[0.06] backdrop-blur-2xl",
        "shadow-[0_30px_120px_rgba(0,0,0,0.55)]",
        "will-change-transform"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={HERO_IMG}
          alt=""
          className={cx(
            "absolute inset-0 h-full w-full object-cover",
            "opacity-[0.30] blur-[10px] scale-[1.08]"
          )}
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={s({
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.80), rgba(0,0,0,0.92))," +
              "radial-gradient(900px 520px at 18% 8%, rgba(255,154,61,0.20) 0%, rgba(0,0,0,0) 40%)," +
              "radial-gradient(820px 520px at 88% 22%, rgba(255,106,26,0.16) 0%, rgba(0,0,0,0) 60%)",
          })}
        />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>

      <div className="relative z-10 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="text-[12px] tracking-[0.22em] text-white/45">
            {labelProject}
          </div>
          <div className="mt-2 text-[22px] sm:text-[26px] font-[760] tracking-tight text-white/95 leading-[1.1]">
            {p.title}
          </div>
          <div className="mt-2 text-[14px] sm:text-[15px] text-white/65 leading-relaxed max-w-[52ch]">
            {subtitle}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className={cx(
                  "inline-flex items-center rounded-2xl px-3 py-1",
                  "border border-white/10 bg-white/[0.05]",
                  "text-[12px] text-white/70"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <DomainPill href={p.domain} />
            <div className="hidden sm:flex items-center gap-2">
              {p.demoUrl ? (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(
                    "inline-flex h-10 items-center justify-center rounded-2xl px-5",
                    "text-[13px] font-[750] text-black",
                    "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                    "shadow-[0_16px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition"
                  )}
                >
                  {demoLabel}
                </a>
              ) : null}
            </div>
          </div>

          <div className="sm:hidden flex gap-2">
            {p.demoUrl ? (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noreferrer"
                className={cx(
                  "flex-1 inline-flex h-10 items-center justify-center rounded-2xl px-5",
                  "text-[13px] font-[750] text-black",
                  "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                  "shadow-[0_16px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition"
                )}
              >
                {demoLabel}
              </a>
            ) : null}
            <a
              href="#contact"
              className={cx(
                "flex-1 inline-flex h-10 items-center justify-center rounded-2xl px-5",
                "border border-white/14 bg-white/5 backdrop-blur",
                "text-[13px] font-[650] text-white/80 hover:bg-white/7 transition"
              )}
            >
              {contactLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreCard({ primaryHref }: { primaryHref: string }) {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const soonLabel = isRu ? "СКОРО" : "SOON";
  const title = isRu ? "Дальше — больше" : "More coming soon";
  const body = isRu
    ? "Скоро добавим новые кейсы и страницы. Сейчас оставили только рабочие ссылки."
    : "More case studies and pages are coming soon. For now we only show live production links.";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "border border-white/10 bg-white/[0.06] backdrop-blur-2xl",
        "shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
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
        <div className="text-[12px] tracking-[0.22em] text-white/45">
          {soonLabel}
        </div>
        <div className="mt-2 text-[22px] sm:text-[28px] font-[800] tracking-tight text-white/95 leading-[1.1]">
          {title}
        </div>
        <div className="mt-2 text-[14px] sm:text-[15px] text-white/65 leading-relaxed max-w-[70ch]">
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

  const projects = useMemo<Project[]>(
    () => [
      {
        id: "upc",
        title: "UPC Promo",
        subtitleRu:
          "Промо-лендинг: премиум-визуал, секции, анимации, адаптив, быстрые загрузки и аккуратная типографика.",
        subtitleEn:
          "Promo landing: premium visuals, sections, animations, responsive layout, fast loading and clean typography.",
        domain: UPC_DOMAIN,
        tags: ["Landing", "Vite", "React", "Tailwind", "Performance"],
        cover: "/images/project-cover-upc.jpg",
      },
      {
        id: "payclip",
        title: "PayClip",
        subtitleRu:
          "Платёжный продукт: быстрый онбординг, лендинг под конверсию, аккуратная сетка и сильный визуал.",
        subtitleEn:
          "Payment product: fast onboarding, conversion-focused landing, precise grid and strong visuals.",
        domain: PAYCLIP_DOMAIN,
        tags: ["Fintech", "Landing", "UI/UX", "React", "Tailwind"],
        cover: "/images/project-cover-payclip.jpg",
      },
    ],
    []
  );

  const gmailLabel = isRu ? "Написать на Gmail" : "Email via Gmail";
  const tgLabel = isRu ? "Написать в Telegram" : "Message in Telegram";

  return (
    <div
      className="relative min-h-screen"
      style={s({ "--headerH": `${HEADER_H}px` })}
    >
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

                <p className="mt-4 max-w-[70ch] text-white/68 text-[15px] sm:text-[16px] leading-relaxed">
                  {isRu
                    ? "Сейчас показываем только живые домены: "
                    : "Right now we only show live domains: "}
                  <span className="text-white/90 font-[650]">upc.promo</span>
                  {isRu ? " и " : " and "}
                  <span className="text-white/90 font-[650]">usepayclip.com</span>.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tivoonix@gmail.com&su=%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20(SaaS%2FMVP)"
                    target="_blank"
                    rel="noreferrer"
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "border border-white/14 bg-white/5 backdrop-blur",
                      "text-[14px] font-[650] text-white/85 hover:bg-white/7 transition whitespace-nowrap"
                    )}
                  >
                    {gmailLabel}
                  </a>

                  <a
                    href="https://t.me/TIVONIX"
                    target="_blank"
                    rel="noreferrer"
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
                <ProjectCard key={p.id} p={p} idx={idx} />
              ))}

              <MoreCard primaryHref={UPC_DOMAIN} />

              <div id="contact" className="pt-2" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
