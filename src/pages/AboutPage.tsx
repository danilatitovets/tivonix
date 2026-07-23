import { useEffect, useMemo, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { aboutCopy } from "../i18n/aboutCopy";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { trackEvent } from "../lib/analytics";

const LOGO = "/images/tivonix-logo-white.webp";
const JOIN_BG = "/images/1.png";
const AVATAR = "/favicon-192.png";

function splitWords(text: string) {
  return text.split(/(\s+)/).filter(Boolean);
}

function WhyIcon({ kind }: { kind: string }) {
  const common = {
    viewBox: "0 0 72 72",
    className: "about-why__icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    "aria-hidden": true as const,
  };

  if (kind === "experience") {
    return (
      <svg {...common}>
        <circle cx="36" cy="36" r="5.5" />
        <circle cx="36" cy="36" r="14" />
        <circle cx="36" cy="36" r="23" opacity="0.75" />
        <circle cx="36" cy="36" r="31" opacity="0.4" />
      </svg>
    );
  }
  if (kind === "expertise") {
    return (
      <svg {...common}>
        <circle cx="26" cy="34" r="13" />
        <circle cx="46" cy="34" r="13" />
        <circle cx="36" cy="46" r="13" />
      </svg>
    );
  }
  if (kind === "innovation") {
    return (
      <svg {...common}>
        <circle cx="36" cy="36" r="28" opacity="0.45" />
        <ellipse cx="36" cy="36" rx="12" ry="28" />
        <path d="M10 36h52M14 24h44M14 48h44" strokeLinecap="round" opacity="0.85" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="36" cy="18" r="4.5" />
      <circle cx="20" cy="32" r="4.5" />
      <circle cx="52" cy="32" r="4.5" />
      <circle cx="24" cy="50" r="4" />
      <circle cx="48" cy="50" r="4" />
      <circle cx="36" cy="36" r="3.5" />
      <path d="M36 22.5V32.5M24 35l8 3M48 35l-8 3M28 47l5-7M44 47l-5-7" opacity="0.55" />
    </svg>
  );
}

export default function AboutPage() {
  const { lang } = useLang();
  const copy = aboutCopy(lang);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const footerTrackRef = useRef<SVGRectElement>(null);
  const footerRunnerRef = useRef<SVGRectElement>(null);
  const lineCount = copy.hero.titleLines.length;
  const storyText = useMemo(() => copy.story.paragraphs.join(" "), [copy.story.paragraphs]);
  const storyWords = useMemo(() => splitWords(storyText), [storyText]);

  useEffect(() => {
    const box = footerRef.current;
    const track = footerTrackRef.current;
    const runner = footerRunnerRef.current;
    if (!box || !track || !runner || typeof window === "undefined") return;

    const sync = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      const inset = 1;
      const rw = Math.max(0, w - inset * 2);
      const rh = Math.max(0, h - inset * 2);
      const styles = getComputedStyle(box);
      const parsedRadius = Number.parseFloat(styles.borderTopLeftRadius) || 24;
      const radius = Math.min(parsedRadius - inset, rw / 2, rh / 2);
      for (const node of [track, runner]) {
        node.setAttribute("x", String(inset));
        node.setAttribute("y", String(inset));
        node.setAttribute("width", String(rw));
        node.setAttribute("height", String(rh));
        node.setAttribute("rx", String(Math.max(0, radius)));
        node.setAttribute("ry", String(Math.max(0, radius)));
      }
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(box);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--hero-p", "1");
      el.dataset.cta = "1";
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      const p = Math.min(1, Math.max(0, scrolled / travel));
      el.style.setProperty("--hero-p", p.toFixed(4));
      el.dataset.cta = p > 0.88 ? "1" : "0";
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    if (!story || typeof window === "undefined") return;
    const wordEls = Array.from(story.querySelectorAll<HTMLElement>(".about-story__word"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      wordEls.forEach((w) => w.style.setProperty("--w", "1"));
      return;
    }

    let active = false;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!active) return;
      const vh = window.innerHeight;
      const whiteLine = vh * 0.55;
      const grayLine = vh * 0.96;
      const span = grayLine - whiteLine || 1;
      for (let i = 0; i < wordEls.length; i++) {
        const y = wordEls[i].getBoundingClientRect().top + wordEls[i].offsetHeight * 0.35;
        const t = Math.min(1, Math.max(0, (grayLine - y) / span));
        wordEls[i].style.setProperty("--w", (Math.round(t * 28) / 28).toFixed(2));
      }
    };
    const schedule = () => {
      if (raf || !active) return;
      raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) schedule();
      },
      { root: null, rootMargin: "12% 0px", threshold: 0 }
    );
    io.observe(story);
    active = true;
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      active = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [storyWords]);

  useEffect(() => {
    const el = peopleRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 899px)");

    if (reduced) {
      el.style.setProperty("--spread", "1");
      el.dataset.formed = "1";
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * (mobile.matches ? 0.9 : 0.92);
      const end = vh * (mobile.matches ? 0.18 : 0.08);
      const t = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const eased = t * t * (3 - 2 * t);
      el.style.setProperty("--spread", eased.toFixed(3));
      el.dataset.formed = eased > 0.55 ? "1" : "0";
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div className="about-caldera min-h-screen">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath={lang === "en" ? "/en/about" : "/about"}
        ogLocalePrimary={lang === "en" ? "en_US" : "ru_RU"}
        hreflang
      />

      <Header />

      <div className="about-caldera__mesh" aria-hidden>
        <svg className="about-caldera__mesh-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aboutPageGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fc5000" />
              <stop offset="50%" stopColor="#ff7a33" />
              <stop offset="100%" stopColor="#fc5000" />
            </linearGradient>
          </defs>

          {/* Left vertical dashed spine → into footer block */}
          <path
            className="about-caldera__mesh-track"
            vectorEffect="non-scaling-stroke"
            d="M 6 0 V 18 C 6 22 4 24 8 28 C 14 34 4 38 8 44 C 12 50 5 54 7 62 C 9 70 4 74 7 82 C 8 86 6 88 6 90"
          />
          {/* Right vertical dashed spine → into footer block */}
          <path
            className="about-caldera__mesh-track"
            vectorEffect="non-scaling-stroke"
            d="M 94 0 V 16 C 94 20 96 24 92 28 C 86 34 96 38 92 44 C 88 50 95 54 93 62 C 91 70 96 74 93 82 C 92 86 94 88 94 90"
          />
          {/* Soft mid arcs across page */}
          <path
            className="about-caldera__mesh-track about-caldera__mesh-track--soft"
            vectorEffect="non-scaling-stroke"
            d="M 0 22 H 28 C 36 22 40 18 50 18 C 60 18 64 22 72 22 H 100"
          />
          <path
            className="about-caldera__mesh-track about-caldera__mesh-track--soft"
            vectorEffect="non-scaling-stroke"
            d="M 0 48 H 22 C 32 48 38 54 50 54 C 62 54 68 48 78 48 H 100"
          />
          <path
            className="about-caldera__mesh-track about-caldera__mesh-track--soft"
            vectorEffect="non-scaling-stroke"
            d="M 0 74 H 26 C 34 74 40 70 50 70 C 60 70 66 74 74 74 H 100"
          />

          <path
            className="about-caldera__mesh-runner"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            d="M 6 0 V 18 C 6 22 4 24 8 28 C 14 34 4 38 8 44 C 12 50 5 54 7 62 C 9 70 4 74 7 82 C 8 86 6 88 6 90"
          />
          <path
            className="about-caldera__mesh-runner about-caldera__mesh-runner--delay"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            d="M 94 0 V 16 C 94 20 96 24 92 28 C 86 34 96 38 92 44 C 88 50 95 54 93 62 C 91 70 96 74 93 82 C 92 86 94 88 94 90"
          />
        </svg>
      </div>

      <main className="overflow-x-clip">
        <section
          ref={heroRef}
          className="about-hero about-hero--lines relative"
          style={{ ["--hero-lines" as string]: lineCount }}
        >
          <div className="about-hero__pin">
            <div className="about-hero__rail" aria-hidden>
              <svg
                className="about-hero__svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="aboutHeroGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fc5000" />
                    <stop offset="50%" stopColor="#ff7a33" />
                    <stop offset="100%" stopColor="#fc5000" />
                  </linearGradient>
                </defs>

                <path
                  className="about-hero__track"
                  d="M -20 200 H 360 C 480 200 540 90 720 90 C 900 90 960 200 1080 200 H 1460"
                />
                <path
                  className="about-hero__runner"
                  pathLength="1"
                  d="M -20 200 H 360 C 480 200 540 90 720 90 C 900 90 960 200 1080 200 H 1460"
                />
              </svg>
            </div>

            <Container className="relative z-[2] text-center">
              <p className="about-caldera__tag mx-auto mb-6">
                {lang === "zh" ? "我们的故事" : lang === "en" ? "Our story" : "Наша история"}
              </p>
              <div
                className="about-hero__logo mx-auto mb-7 sm:mb-8"
                role="img"
                aria-label="TIVONIX"
                style={{
                  backgroundColor: "var(--caldera-ember)",
                  WebkitMaskImage: `url(${LOGO})`,
                  maskImage: `url(${LOGO})`,
                }}
              />
              <h1 className="about-caldera__display about-hero__title mx-auto">
                <span className="sr-only">{copy.hero.title}</span>
                {copy.hero.titleLines.map((line, i) => (
                  <span
                    key={line}
                    className="about-hero__line"
                    style={{ ["--i" as string]: i }}
                    aria-hidden
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <div className="about-hero__cta mt-8 flex justify-center">
                <LeadCTAButton
                  source="founder"
                  variant="primary"
                  size="lg"
                  className="about-caldera__btn"
                  onClick={() => trackEvent("service_cta_click", { section: "about_hero" })}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {copy.hero.cta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </LeadCTAButton>
              </div>
            </Container>
          </div>
        </section>

        <section className="about-caldera__section about-story-section scroll-mt-[var(--tivonix-header-spacer)] pt-0">
          <Container className="relative z-[2]">
            <div ref={storyRef} className="about-story" lang={lang}>
              <p className="about-story__text">
                {storyWords.map((token, i) =>
                  /^\s+$/.test(token) ? (
                    <span key={`s-${i}`}> </span>
                  ) : (
                    <span key={`w-${i}`} className="about-story__word">
                      {token}
                    </span>
                  )
                )}
              </p>
            </div>
          </Container>
        </section>

        <section className="about-caldera__section scroll-mt-[var(--tivonix-header-spacer)]">
          <Container>
            <div className="about-caldera__trio">
              {[copy.mission, copy.vision, copy.values].map((block) => (
                <article key={block.label} className="about-caldera__card">
                  <span className="about-caldera__sulfur">{block.label}</span>
                  <h2 className="about-caldera__h">{block.title}</h2>
                  <p className="about-caldera__body">{block.text}</p>
                </article>
              ))}
            </div>

            <ul className="about-values">
              {copy.values.items.map((item) => (
                <li key={item.title} className="about-values__item">
                  <p className="about-caldera__h about-caldera__h--sm">{item.title}</p>
                  <p className="about-caldera__body about-caldera__body--sm">{item.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="about-why-section about-caldera__section scroll-mt-[var(--tivonix-header-spacer)]">
          <Container>
            <div className="about-why__head">
              <h2 className="about-caldera__display about-caldera__display--section">
                {copy.why.title}
              </h2>
              <p className="about-caldera__body about-why__lead">{copy.why.text}</p>
            </div>

            <div className="about-why">
              {copy.why.items.map((item) => (
                <article key={item.key} className="about-why__item">
                  <div className="about-why__icon-wrap">
                    <WhyIcon kind={item.key} />
                  </div>
                  <h3 className="about-caldera__h about-caldera__h--sm">{item.title}</h3>
                  <p className="about-caldera__body about-caldera__body--sm">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-14 flex justify-center sm:mt-16">
              <LeadCTAButton
                source="founder"
                variant="primary"
                size="lg"
                className="about-caldera__btn"
                onClick={() => trackEvent("service_cta_click", { section: "about_why" })}
              >
                <span className="inline-flex items-center gap-1.5">
                  {copy.why.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </LeadCTAButton>
            </div>
          </Container>
        </section>

        <section
          ref={peopleRef}
          className="about-people about-caldera__section about-caldera__section--last scroll-mt-[var(--tivonix-header-spacer)]"
          style={{ ["--spread" as string]: 0 }}
        >
          <Container>
            <div className="mx-auto max-w-[40rem] text-center">
              <h2 className="about-caldera__display about-caldera__display--section about-caldera__display--center">
                {copy.people.title}
              </h2>
              <p className="about-caldera__body mt-4">{copy.people.text}</p>
            </div>

            <div className="about-people__stage mt-12 sm:mt-14">
              <ul className="about-people__side about-people__side--left">
                {copy.people.members.slice(0, 3).map((m, i) => (
                  <li key={m.id} className="about-people__item" style={{ ["--i" as string]: i }}>
                    <div className="about-people__avatar" aria-hidden>
                      <img src={AVATAR} alt="" width={96} height={96} draggable={false} />
                    </div>
                    <p className="about-people__name">{m.name}</p>
                    <p className="about-people__role">{m.role}</p>
                  </li>
                ))}
              </ul>

              <div className="about-people__shot">
                <div className="about-join">
                  <img
                    src={JOIN_BG}
                    alt=""
                    className="about-join__bg"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <div className="about-join__shade" aria-hidden />
                  <div className="about-join__cta relative z-[4] flex min-h-[inherit] items-end justify-center pb-6 pt-36 sm:pb-8 sm:pt-44">
                    <LeadCTAButton
                      source="founder"
                      variant="white"
                      size="lg"
                      className="about-caldera__btn about-caldera__btn--chalk"
                      onClick={() => trackEvent("service_cta_click", { section: "about_join" })}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {copy.join.cta}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </LeadCTAButton>
                  </div>
                </div>
              </div>

              <ul className="about-people__side about-people__side--right">
                {copy.people.members.slice(3, 6).map((m, i) => (
                  <li key={m.id} className="about-people__item" style={{ ["--i" as string]: i }}>
                    <div className="about-people__avatar" aria-hidden>
                      <img src={AVATAR} alt="" width={96} height={96} draggable={false} />
                    </div>
                    <p className="about-people__name">{m.name}</p>
                    <p className="about-people__role">{m.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>

      <div className="about-footer-wrap">
        {/* Vertical mesh continues into the block corners */}
        <div className="about-footer__leads" aria-hidden>
          <span className="about-footer__lead about-footer__lead--l" />
          <span className="about-footer__lead about-footer__lead--r" />
        </div>
        <div className="about-footer" ref={footerRef}>
          <svg className="about-footer__frame" aria-hidden>
            <defs>
              <linearGradient id="aboutFooterGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fc5000" />
                <stop offset="50%" stopColor="#ff7a33" />
                <stop offset="100%" stopColor="#fc5000" />
              </linearGradient>
            </defs>
            <rect ref={footerTrackRef} className="about-footer__track" x="1" y="1" width="0" height="0" rx="39" ry="39" />
            <rect
              ref={footerRunnerRef}
              className="about-footer__runner"
              pathLength="1"
              x="1"
              y="1"
              width="0"
              height="0"
              rx="39"
              ry="39"
            />
          </svg>
          <div className="about-footer__clip">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
