import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { aboutCopy, aboutPath } from "../../i18n/aboutCopy";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { getStableViewportHeight } from "../../lib/stableViewport";

const LOGO = "/images/tivonix-logo-white.webp";
const LOGO_COLORS = ["#ffffff", "#FF9A3D", "#FF5C00"] as const;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function mixColors(progress: number) {
  const n = LOGO_COLORS.length - 1;
  const scaled = Math.min(1, Math.max(0, progress)) * n;
  const i = Math.min(n - 1, Math.floor(scaled));
  const t = scaled - i;
  const a = hexToRgb(LOGO_COLORS[i]);
  const b = hexToRgb(LOGO_COLORS[i + 1]);
  return `rgb(${Math.round(a.r + (b.r - a.r) * t)}, ${Math.round(a.g + (b.g - a.g) * t)}, ${Math.round(a.b + (b.b - a.b) * t)})`;
}

function splitWords(text: string) {
  return text.split(/(\s+)/).filter(Boolean);
}

/** Chargeflow-style company story — word reveal gray → white on scroll. */
export default function FounderSection() {
  const { lang } = useLang();
  const about = aboutCopy(lang);
  const team = homeExtraCopy(lang).team;
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  const storyText = about.story.paragraphs.join(" ");
  const words = useMemo(() => splitWords(storyText), [storyText]);

  useEffect(() => {
    const section = sectionRef.current;
    const story = storyRef.current;
    const logo = logoRef.current;
    if (!section || !story || typeof window === "undefined") return;

    const wordEls = Array.from(story.querySelectorAll<HTMLElement>(".landing-story__word"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      wordEls.forEach((w) => {
        w.style.setProperty("--w", "1");
      });
      if (logo) logo.style.backgroundColor = mixColors(0.5);
      return;
    }

    let active = false;
    let raf = 0;
    let lastLogo = -1;

    const update = () => {
      raf = 0;
      if (!active) return;

      const vh = getStableViewportHeight();
      const sRect = section.getBoundingClientRect();
      const raw = Math.min(1, Math.max(0, (vh * 0.75 - sRect.top) / (sRect.height + vh * 0.35)));
      const logoKey = Math.round(raw * 40);
      if (logo && logoKey !== lastLogo) {
        lastLogo = logoKey;
        logo.style.backgroundColor = mixColors(raw);
      }

      // Words above ~65% viewport → white; below bottom → gray
      const whiteLine = vh * 0.62;
      const grayLine = vh * 0.98;
      const span = grayLine - whiteLine || 1;

      for (let i = 0; i < wordEls.length; i++) {
        const y = wordEls[i].getBoundingClientRect().top + wordEls[i].offsetHeight * 0.35;
        const t = Math.min(1, Math.max(0, (grayLine - y) / span));
        wordEls[i].style.setProperty("--w", (Math.round(t * 25) / 25).toFixed(2));
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
      { root: null, rootMargin: "15% 0px", threshold: 0 },
    );
    io.observe(section);

    // Kick once after layout
    active = true;
    schedule();
    requestAnimationFrame(() => schedule());

    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      active = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [words]);

  return (
    <Section
      ref={sectionRef}
      id="about"
      className="landing-story-section scroll-mt-[var(--tivonix-header-spacer)] !py-16 sm:!py-24"
    >
      <Container>
        <div className="mx-auto max-w-[42rem] text-center">
          <Link
            to={lang === "en" ? "/en" : lang === "zh" ? "/zh" : "/"}
            className="mb-8 inline-flex justify-center sm:mb-10"
            aria-label="TIVONIX"
          >
            <span
              ref={logoRef}
              className="landing-story-section__logo"
              role="img"
              aria-label="TIVONIX"
              style={{
                backgroundColor: LOGO_COLORS[0],
                WebkitMaskImage: `url(${LOGO})`,
                maskImage: `url(${LOGO})`,
              }}
            />
          </Link>

          <h2 className="font-hero text-[clamp(1.85rem,5vw,3.1rem)] font-semibold uppercase leading-[1.05] tracking-[-0.04em] text-white text-balance">
            {about.hero.title}
          </h2>

          <div className="mt-8 flex justify-center">
            <Link
              to={aboutPath(lang)}
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#FF9A3D] px-7 py-3.5 text-[14px] font-semibold uppercase tracking-[0.04em] text-black transition hover:bg-[#ff8a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {team.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div className="landing-story-section__rule mx-auto mt-12 max-w-[28rem]" aria-hidden />
        </div>

        <div ref={storyRef} className="landing-story mx-auto mt-12 w-full max-w-[68rem]" lang={lang}>
          <p className="landing-story__p">
            {words.map((token, wi) =>
              /^\s+$/.test(token) ? (
                <span key={wi}> </span>
              ) : (
                <span key={wi} className="landing-story__word">
                  {token}
                </span>
              ),
            )}
          </p>
        </div>
      </Container>
    </Section>
  );
}
