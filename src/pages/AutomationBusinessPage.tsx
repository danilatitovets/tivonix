import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  LayoutDashboard,
  Plus,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/landing/Header";
import AutomationSignsScrollSection from "../components/landing/AutomationSignsScrollSection";
import AutomationEcosystemMap from "../components/landing/AutomationEcosystemMap";
import PainPointsBlock from "../components/landing/PainPointsBlock";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import { SEO } from "../components/SEO";
import { useLeadForm } from "../components/leads/useLeadForm";
import { trackTelegramBotClick, trackTelegramDirectClick } from "../lib/analytics";
import {
  AUTOMATION_SIGNS_IMG_DIR,
  getAutomationPageCopy,
  type AutomationPageCopy,
} from "../i18n/automationPageCopy";
import { automationTypo } from "../i18n/automationTypography";
import { useLang } from "../i18n/LangProvider";
import { TG_BOT_URL } from "../constants/links";

const AUTOMATION_HERO_IMG = "/images/avtomatizaciya-biznesa/hero.webp";
const AUTOMATION_CONTACT_EMAIL = "tivoonix@gmail.com";
const WHY_TIVONIX_BAND_IMG = "/images/sunset.webp";
const TIVONIX_LOGO_MARK = "/images/tivonix-logo-icon.webp";
const HeroWebGLBg = lazy(() => import("../components/landing/HeroWebGLBg"));
const PAIN_POINTS_IMG_DIR = "/images/avtomatizaciya-biznesa/Где бизнес теряет";

type HeroWebGLQuality = "low" | "high";

function usePrefetchHeroWebGL() {
  useEffect(() => {
    void import("../components/landing/HeroWebGLBg");
  }, []);
}

const WHY_AUTOMATION_SMOKE_BASE =
  "radial-gradient(120% 90% at 55% 35%, rgba(255,154,61,0.18) 0%, rgba(255,106,26,0.10) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)";

const WHY_AUTOMATION_ORANGE_LAYER =
  "linear-gradient(180deg,rgba(255,174,87,0.34)_0%,rgba(255,138,30,0.22)_38%,rgba(255,120,48,0.12)_72%,rgba(0,0,0,0.14)_100%)";

/**
 * WebGL теперь не привязан к desktop.
 * Он включается и на телефоне, но только когда блок рядом с экраном.
 */
function SmokeWebGLLayer({
  className,
  quality = "low",
  opaqueBuffer = false,
}: {
  className: string;
  quality?: HeroWebGLQuality;
  opaqueBuffer?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        rootMargin: "260px 0px 260px 0px",
        threshold: 0.01,
      }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <Suspense fallback={null}>
          <HeroWebGLBg interactive={false} quality={quality} opaqueBuffer={opaqueBuffer} />
        </Suspense>
      ) : null}
    </div>
  );
}

function HeroTextSmokeBg() {
  return (
    <div
      className="pointer-events-none relative isolate h-[500px] w-full overflow-hidden rounded-b-[40px] bg-black sm:h-[540px] sm:rounded-b-[52px]"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: WHY_AUTOMATION_SMOKE_BASE }} />

      <SmokeWebGLLayer
        className="absolute inset-0 h-full w-full scale-[1.03] bg-black opacity-100"
        quality="high"
        opaqueBuffer
      />

      <div className="absolute inset-0 z-[1]" style={{ background: WHY_AUTOMATION_ORANGE_LAYER }} />

      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_46%,rgba(0,0,0,0.86)_100%)]" />
    </div>
  );
}

const AUTOMATION_FEATURES_IMG_DIR =
  "/images/avtomatizaciya-biznesa/Что можно автоматизировать";

const whyAutomationBenefitIcons: { icon: LucideIcon; iconColor: string }[] = [
  { icon: Bot, iconColor: "#38BDF8" },
  { icon: Zap, iconColor: "#FACC15" },
  { icon: LayoutDashboard, iconColor: "#C084FC" },
  { icon: Users, iconColor: "#4ADE80" },
  { icon: TrendingUp, iconColor: "#FB923C" },
  { icon: ShieldCheck, iconColor: "#2DD4BF" },
];

function DotList({
  items,
  variant = "grid",
  tossIn = false,
}: {
  items: string[];
  variant?: "grid" | "stack";
  tossIn?: boolean;
}) {
  const ulRef = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(!tossIn);

  useEffect(() => {
    if (!tossIn) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const el = ulRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setRevealed(true);
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [tossIn]);

  const ulClass =
    variant === "stack"
      ? "mx-auto flex w-full max-w-xl flex-col gap-3.5"
      : "grid gap-3.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3.5";

  return (
    <ul ref={tossIn ? ulRef : undefined} className={ulClass}>
      {items.map((item, i) => (
        <li
          key={item}
          className={
            "flex items-start gap-3 text-[14.5px] leading-[1.75] text-white/78 sm:text-[15px] " +
            (tossIn
              ? revealed
                ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-[0.52s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
                : "-translate-y-7 opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-0"
              : "")
          }
          style={
            tossIn && revealed
              ? ({ transitionDelay: `${i * 72}ms` } as CSSProperties)
              : undefined
          }
        >
          <Check
            className="mt-[3px] h-[1.05em] w-[1.05em] shrink-0 text-[#FF9A3D]"
            strokeWidth={2.5}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AutomationHero({ t }: { t: AutomationPageCopy }) {
  const [b1, b2, b3] = t.hero.badges;
  const { openLeadForm } = useLeadForm();

  return (
    <Section className="relative overflow-x-hidden overflow-y-visible pb-16 pt-0 sm:pb-20">
      <div className="relative z-10">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden px-4 py-8 text-center sm:px-8 sm:py-10">
              <h1 className={`relative z-10 mt-5 ${automationTypo.h1}`}>
                <span className="block">{t.hero.h1Line1}</span>
                <span className="block">{t.hero.h1Line2}</span>
              </h1>

              <p className="relative z-10 mx-auto mt-8 max-w-[40rem] text-[17px] font-medium leading-[1.55] text-white/85 sm:text-[19px] sm:leading-[1.6] lg:text-[20px]">
                {t.hero.subtitle}
              </p>

              <div className="relative z-10 mx-auto mt-5 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openLeadForm("service_automation")}
                  className="inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold tracking-tight text-neutral-900 shadow-sm transition hover:bg-white/92 active:translate-y-px sm:px-5 sm:text-[14px]"
                >
                  {t.hero.microCtaTelegram}
                </button>
                <a
                  href={TG_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTelegramBotClick()}
                  className="inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white/[0.12] px-4 text-[13px] font-semibold tracking-tight text-white/90 ring-1 ring-white/15 transition hover:bg-white/[0.18] active:translate-y-px sm:px-5 sm:text-[14px]"
                >
                  Telegram
                </a>
                <a
                  href={`mailto:${AUTOMATION_CONTACT_EMAIL}?subject=${encodeURIComponent(t.hero.microCtaEmailSubject)}`}
                  className="inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white/[0.12] px-4 text-[13px] font-semibold tracking-tight text-white/90 ring-1 ring-white/15 transition hover:bg-white/[0.18] active:translate-y-px sm:px-5 sm:text-[14px]"
                >
                  {t.hero.microCtaEmail}
                </a>
              </div>
            </div>

            <div className="mt-[8rem] text-center sm:mt-7 md:mt-9 lg:mt-10">
              <div className="mt-[calc(3.25rem+12px)] flex flex-wrap justify-center gap-3 text-[13px] sm:mt-3 sm:text-[14px]">
                <span className="rounded-full bg-[#FF8A1E]/20 px-4 py-1.5 text-[#FFB55C]">{b1}</span>
                <span className="rounded-full bg-[#FF8A1E]/20 px-4 py-1.5 text-[#FFB55C]">{b2}</span>
                <span className="rounded-full bg-[#FF8A1E]/20 px-4 py-1.5 text-[#FFB55C]">{b3}</span>
              </div>
            </div>

            <div className="relative left-1/2 mt-16 w-[109vw] max-w-none -translate-x-1/2 bg-black px-0 sm:left-auto sm:mx-auto sm:mt-20 sm:w-full sm:max-w-[min(100%,1280px)] sm:translate-x-0 sm:px-2">
              <img
                src={AUTOMATION_HERO_IMG}
                alt={t.hero.heroImgAlt}
                loading="eager"
                decoding="async"
                draggable={false}
                className="h-[55vw] min-h-[268px] w-full object-cover sm:h-auto sm:min-h-0 sm:rounded-none"
              />

              <div className="mt-5 flex justify-center px-4 sm:absolute sm:inset-x-0 sm:bottom-6 sm:mt-0">
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => openLeadForm("service_automation")}
                    className="inline-flex h-[56px] items-center justify-center rounded-2xl bg-[#FF8A1E] px-7 text-[16px] font-[780] tracking-[-0.01em] text-black shadow-[0_18px_70px_rgba(0,0,0,.55)] transition hover:opacity-95 active:translate-y-px sm:h-[60px] sm:px-9 sm:text-[17px]"
                  >
                    {t.hero.ctaDiscuss}
                  </button>

                  <Link
                    to="/projects"
                    className="inline-flex h-[56px] items-center justify-center rounded-2xl bg-white/[0.08] px-7 text-[16px] font-[780] text-white/90 transition hover:bg-white/[0.13] active:translate-y-px sm:h-[60px] sm:px-8 sm:text-[17px]"
                  >
                    {t.hero.ctaCases}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function WhyBenefitCardSmoke({
  seed,
  icon: Icon,
  iconColor,
}: {
  seed: number;
  icon: LucideIcon;
  iconColor: string;
}) {
  const ax = 48 + (seed % 3) * 10;
  const ay = 30 + (seed % 4) * 10;

  const base = `radial-gradient(120% 90% at ${ax}% ${ay}%, rgba(255,154,61,0.3) 0%, rgba(255,106,26,0.18) 36%, rgba(0,0,0,0) 64%), linear-gradient(180deg, #000000 0%, #030303 100%)`;

  return (
    <div className="relative isolate aspect-[4/3] w-full overflow-hidden bg-black">
      <div className="absolute inset-0" style={{ background: base }} aria-hidden />

      <div className="absolute inset-0 z-[1]" style={{ background: WHY_AUTOMATION_ORANGE_LAYER }} aria-hidden />

      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.16)_46%,rgba(0,0,0,0.86)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center">
        <div
          className="flex h-[132px] w-[132px] items-center justify-center rounded-[22%] bg-[#1a1a1a] sm:h-40 sm:w-40"
          style={
            {
              boxShadow: `0 18px 52px rgb(0 0 0 / 0.5), 0 0 48px ${iconColor}`,
            } as CSSProperties
          }
        >
          <Icon
            className="h-[68px] w-[68px] sm:h-20 sm:w-20"
            style={{ color: iconColor } as CSSProperties}
            strokeWidth={1.35}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function AutomationSlideTextSmokeBg({ seed, webGl }: { seed: number; webGl: boolean }) {
  const ax = 48 + (seed % 3) * 10;
  const ay = 30 + (seed % 4) * 10;

  const base = `radial-gradient(120% 90% at ${ax}% ${ay}%, rgba(255,154,61,0.22) 0%, rgba(255,106,26,0.13) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: base }} />

      {webGl ? (
        <SmokeWebGLLayer
          className="absolute inset-0 z-0 h-full w-full scale-[1.04] opacity-[0.72]"
          quality="low"
        />
      ) : null}

      <div className="absolute inset-0 z-[1]" style={{ background: WHY_AUTOMATION_ORANGE_LAYER }} />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.14)_44%,rgba(0,0,0,0.88)_100%)]" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-br from-black/45 via-black/20 to-transparent" />
    </div>
  );
}

function AutomationCTASmokeBg() {
  const seed = 2;
  const ax = 48 + (seed % 3) * 10;
  const ay = 30 + (seed % 4) * 10;

  const base = `radial-gradient(120% 90% at ${ax}% ${ay}%, rgba(255,154,61,0.24) 0%, rgba(255,106,26,0.14) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]" aria-hidden>
      <div className="absolute inset-0 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,138,30,0.16),rgba(255,138,30,0.04))]" />
      <div className="absolute inset-0 rounded-[30px]" style={{ background: base }} />

      <SmokeWebGLLayer
        className="absolute inset-0 z-0 h-full w-full scale-[1.04] rounded-[30px] opacity-[0.68]"
        quality="low"
      />

      <div className="absolute inset-0 z-[1] rounded-[30px]" style={{ background: WHY_AUTOMATION_ORANGE_LAYER }} />

      <div className="absolute inset-0 z-[2] rounded-[30px] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-0 z-[3] rounded-[30px] bg-gradient-to-br from-black/32 via-black/12 to-transparent" />
    </div>
  );
}

function WhyAutomation({ t }: { t: AutomationPageCopy }) {
  return (
    <Section className="relative scroll-mt-[92px] overflow-x-visible bg-black py-16 sm:scroll-mt-[100px] sm:py-20 xl:scroll-mt-[104px]">
      <Container>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center py-2 text-center sm:py-4">
          <h2 className={automationTypo.h2}>
            <span className="block">{t.why.h2Line1}</span>
            <span className="block">{t.why.h2Line2}</span>
          </h2>

          <p className="mt-6 max-w-[48rem] text-[19px] leading-[1.64] text-white/84 sm:text-[22px] sm:leading-[1.58]">
            {t.why.subtitle}
          </p>
        </div>
      </Container>

      <div
        className="no-scrollbar relative z-[1] mt-10 min-w-0 w-full overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex w-max min-w-0 flex-nowrap gap-4 pr-4 pl-[max(1rem,calc((100vw-72rem)/2+1rem))] sm:gap-5 sm:pr-6 sm:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:gap-4 xl:gap-5">
          {whyAutomationBenefitIcons.map((meta, index) => {
            const benefit = t.why.benefits[index];
            if (!benefit) return null;

            return (
              <article
                key={benefit.title}
                className="isolate flex min-h-0 w-[min(82vw,19rem)] shrink-0 flex-col overflow-hidden rounded-2xl bg-white/[0.05] sm:w-[19rem]"
              >
                <WhyBenefitCardSmoke seed={index} icon={meta.icon} iconColor={meta.iconColor} />

                <div className="p-5 sm:p-6">
                  <h3 className={automationTypo.h3}>{benefit.title}</h3>

                  <p className="mt-2.5 text-[16px] leading-[1.7] text-white/82 sm:text-[17px]">
                    {benefit.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function AutomationFeatureSlideImage({
  src,
  alt,
  className,
  imageFallback,
}: {
  src: string;
  alt: string;
  className?: string;
  imageFallback: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-center text-[13px] text-white/40 " +
          (className ?? "")
        }
        role="img"
        aria-label={alt}
      >
        {imageFallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function AutomationFeatures({ t }: { t: AutomationPageCopy }) {
  const slides = t.features.slides;
  const n = slides.length;
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  const syncActiveFromScroll = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const mid = root.scrollLeft + root.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < n; i++) {
      const el = slideRefs.current[i];
      if (!el) continue;

      const cMid = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(cMid - mid);

      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }

    setActive(best);
  }, [n]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    let raf = 0;

    const onScroll = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        raf = 0;
        syncActiveFromScroll();
      });
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);
    syncActiveFromScroll();

    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [syncActiveFromScroll]);

  const scrollToIndex = (i: number) => {
    const el = slideRefs.current[((i % n) + n) % n];

    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <Section className="overflow-visible bg-black py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-2 text-center sm:py-4">
          <h2 className={automationTypo.h2}>{t.features.title}</h2>
        </div>
      </Container>

      <div
        className="mt-10 w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={scrollerRef}
        role="region"
        aria-roledescription={t.features.ariaCarousel}
        aria-label={t.features.ariaRegion}
        style={
          {
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingLeft: "max(0.75rem, calc((100% - min(96vw, 80rem)) / 2))",
            paddingRight: "max(0.75rem, calc((100% - min(96vw, 80rem)) / 2))",
          } as CSSProperties
        }
      >
        <div className="flex w-max gap-2 sm:gap-3">
          {slides.map((item, i) => {
            const imgSrc = encodeURI(`${AUTOMATION_FEATURES_IMG_DIR}/${item.image}`);
            const isActive = i === active;

            return (
              <article
                key={item.title}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className={
                  "w-[min(96vw,80rem)] shrink-0 snap-center snap-always overflow-hidden rounded-[24px] bg-black shadow-[0_28px_90px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-500 ease-out sm:rounded-[28px] " +
                  (isActive
                    ? "z-[1] scale-100 opacity-100"
                    : "z-0 scale-[0.94] opacity-[0.5] sm:scale-[0.96] sm:opacity-[0.58]")
                }
                style={{ transformOrigin: "center center" } as CSSProperties}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="flex min-h-[min(84vw,36rem)] flex-col lg:h-[min(68vh,680px)] lg:min-h-[min(68vh,680px)] lg:flex-row lg:items-stretch">
                  <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden px-7 pb-11 pt-9 sm:px-12 sm:pb-14 sm:pt-11 lg:h-full lg:w-1/2 lg:max-w-none lg:flex-none lg:shrink-0 lg:py-14 lg:pl-14 lg:pr-12">
                    <AutomationSlideTextSmokeBg seed={i} webGl={isActive} />

                    <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                      <div className="shrink-0">
                        <img
                          src={TIVONIX_LOGO_MARK}
                          alt="TIVONIX"
                          width={44}
                          height={44}
                          decoding="async"
                          className="h-10 w-10 object-contain opacity-[0.96] sm:h-11 sm:w-11"
                        />
                      </div>

                      <div className="mt-10 flex flex-1 flex-col justify-center sm:mt-11 lg:mt-12">
                        <h3 className={`max-w-none ${automationTypo.h3Lg}`}>{item.title}</h3>

                        <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.72] text-white/62 sm:mt-7 sm:text-[19px] sm:leading-[1.74] lg:mt-8 lg:text-[21px] lg:leading-[1.72]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative isolate z-0 min-h-[min(92vw,32rem)] w-full flex-1 bg-[#0a0a0a] sm:min-h-[min(64vw,28rem)] lg:h-full lg:min-h-0 lg:w-1/2 lg:flex-none lg:min-w-0">
                    <div className="absolute inset-3 z-0 sm:inset-4 lg:inset-0">
                      <AutomationFeatureSlideImage
                        src={imgSrc}
                        alt={item.title}
                        imageFallback={t.common.imageFallback}
                        className="pointer-events-none h-full w-full object-contain object-center lg:object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <Container>
          <div className="flex justify-center sm:justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={t.features.prev}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14] active:scale-[0.97]"
                onClick={() => scrollToIndex(active - 1)}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>

              <button
                type="button"
                aria-label={t.features.next}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14] active:scale-[0.97]"
                onClick={() => scrollToIndex(active + 1)}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function RealExamples({ t }: { t: AutomationPageCopy }) {
  return (
    <Section className="relative overflow-hidden bg-black py-16 sm:py-20">
      <Container>
        <div className="relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center py-2 text-center sm:py-4 lg:max-w-4xl">
            <p className="sr-only">{t.examples.srOnly}</p>

            <h2 className={`${automationTypo.h2} max-w-[56rem]`} aria-label={t.examples.title}>
              {t.examples.title}
            </h2>

            <p className="mt-6 max-w-[40rem] text-[15px] leading-[1.65] text-white/72 sm:text-[17px] sm:leading-[1.6]">
              {t.examples.body}
            </p>
          </div>

          <div className="relative mt-12 sm:mt-14 lg:mt-16">
            <AutomationEcosystemMap
              logoSrc={TIVONIX_LOGO_MARK}
              smokeBase={WHY_AUTOMATION_SMOKE_BASE}
              orangeLayer={WHY_AUTOMATION_ORANGE_LAYER}
              badgeLabels={t.ecosystemLabels}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ResultsSection({ t }: { t: AutomationPageCopy }) {
  const { openLeadForm } = useLeadForm();
  const items = t.results.items;
  const count = items.length;

  return (
    <Section className="bg-black py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-2 text-center sm:py-4">
          <h2 id="automation-results-heading" className={automationTypo.h2}>
            {t.results.title}
          </h2>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[min(100%,26rem)] sm:max-w-[32rem] lg:max-w-[36rem]">
          <div className="relative z-20 flex justify-center sm:justify-start sm:pl-1">
            <div className="inline-flex items-center gap-2.5 rounded-t-2xl bg-[linear-gradient(180deg,rgba(32,32,32,0.98),rgba(12,12,12,0.99))] px-5 py-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.42)] sm:gap-3 sm:rounded-t-[18px] sm:px-6 sm:py-3">
              <FolderOpen className="h-6 w-6 shrink-0 text-[#FF9A3D] sm:h-7 sm:w-7" strokeWidth={1.85} aria-hidden />

              <div className="text-left leading-tight">
                <p className="font-display text-[11px] font-[760] uppercase tracking-[0.16em] text-[#FFB56C]/95 sm:text-[12px]">
                  {t.results.folderLabel}
                </p>

                <p className="mt-0.5 text-[12px] font-[550] text-white/45 sm:text-[13px]">
                  {t.results.folderMeta(count)}
                </p>
              </div>
            </div>
          </div>

          <article
            className="relative z-10 -mt-1 overflow-hidden rounded-[22px] rounded-tl-sm bg-[linear-gradient(165deg,rgba(28,28,28,0.97)_0%,rgba(8,8,8,0.99)_55%)] shadow-[0_28px_72px_rgba(0,0,0,0.52)] sm:rounded-[26px] sm:rounded-tl-md"
            aria-labelledby="automation-results-heading"
          >
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <DotList items={items} variant="stack" tossIn />
            </div>

            <div className="flex justify-center bg-black/35 px-5 py-6 sm:px-8 sm:py-7">
              <button
                type="button"
                onClick={() => openLeadForm("service_automation")}
                className="inline-flex h-[50px] w-full max-w-[min(100%,20rem)] items-center justify-center rounded-2xl bg-[#FF8A1E] px-6 text-[15px] font-[780] tracking-[-0.01em] text-black shadow-[0_14px_44px_rgba(255,106,40,0.28)] transition hover:opacity-95 active:translate-y-px sm:h-[54px] sm:max-w-none sm:px-10 sm:text-[16px]"
              >
                {t.results.cta}
              </button>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}

function WhyTivonix({ t }: { t: AutomationPageCopy }) {
  const points = t.whyTivonix.points;

  return (
    <Section className="relative overflow-hidden bg-black !pt-6 !pb-12 sm:!pt-8 sm:!pb-16">
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-black">
        <div className="relative isolate h-56 overflow-hidden bg-black sm:h-64 lg:h-72">
          <img
            src={WHY_TIVONIX_BAND_IMG}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />

          <div
            className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/75"
            aria-hidden
          />

          <div
            className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_95%_80%_at_50%_45%,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.82)_100%)]"
            aria-hidden
          />

          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
            <Container>
              <h2 className={`mx-auto max-w-[44rem] text-center ${automationTypo.h2}`}>
                {t.whyTivonix.bandTitle}
              </h2>
            </Container>
          </div>
        </div>
      </div>

      <Container>
        <div className="relative z-10 -mt-3 sm:-mt-5 lg:-mt-6">
          <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
            {points.map((item, index) => (
              <article
                key={item.title}
                className="relative min-h-[17rem] overflow-hidden bg-[#050505] px-6 py-7 sm:px-8 sm:py-8"
              >
                <div className="mb-7 text-[12px] font-[850] uppercase tracking-[0.18em] text-[#ff8a1e]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className={`max-w-[28rem] ${automationTypo.h3Lg}`}>{item.title}</h3>

                <p className="mt-5 max-w-[31rem] text-[15px] font-[600] leading-[1.7] text-white/76 sm:text-[17px]">
                  {item.text}
                </p>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff7a1a]/75 to-transparent"
                />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function AutomationFaqPlusHaze({ expanded }: { expanded: boolean }) {
  const base = "linear-gradient(180deg, #101010 0%, #050505 100%)";

  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      <span className="relative h-12 w-12 overflow-hidden rounded-full bg-black shadow-[0_0_18px_rgba(0,0,0,0.36)] ring-1 ring-white/[0.14]">
        <span className="absolute inset-0" style={{ background: base }} aria-hidden />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/[0.03] to-transparent" aria-hidden />

        <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center">
          <Plus
            className={`h-[19px] w-[19px] text-white transition-transform duration-300 ease-out ${expanded ? "rotate-45" : ""}`}
            strokeWidth={2}
            aria-hidden
          />
        </div>
      </span>
    </span>
  );
}

function AutomationFAQ({ t }: { t: AutomationPageCopy }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = t.faq.items;

  return (
    <Section className="bg-black py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={automationTypo.h2}>{t.faq.title}</h2>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:mt-10 sm:gap-3.5">
          {faqs.map((item, index) => {
            const active = open === index;

            return (
              <article
                key={item.q}
                className={
                  "overflow-hidden rounded-3xl bg-[#1a1a1a] px-5 py-4 ring-1 transition-[background-color,box-shadow] duration-300 ease-out sm:px-6 sm:py-[1.125rem] " +
                  (active
                    ? "ring-white/[0.14] shadow-[0_12px_36px_rgba(0,0,0,0.34)]"
                    : "ring-white/[0.07] shadow-none")
                }
              >
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpen((prev) => (prev === index ? null : index))}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="min-w-0 pt-1 font-display text-[16px] font-[760] leading-snug tracking-[-0.02em] text-white sm:text-[17px]">
                    {item.q}
                  </span>

                  <AutomationFaqPlusHaze expanded={active} />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                    active ? "mt-2.5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-left text-[14.5px] leading-[1.75] text-white/65 sm:text-[15px] sm:leading-[1.72]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function AutomationCTA({ t }: { t: AutomationPageCopy }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[30px] border border-white/[0.09] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-10">
          <AutomationCTASmokeBg />

          <div className="relative z-10">
            <img
              src={TIVONIX_LOGO_MARK}
              alt="TIVONIX"
              width={52}
              height={52}
              decoding="async"
              className="h-11 w-11 object-contain opacity-[0.96] sm:h-[52px] sm:w-[52px]"
            />

            <h2 className={`mt-5 ${automationTypo.h2}`}>{t.ctaBlock.title}</h2>

            <p className="mt-4 max-w-[78ch] text-[15px] leading-[1.75] text-white/72 sm:text-[16.5px]">
              {t.ctaBlock.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openLeadForm("service_automation")}
                className="inline-flex h-[54px] items-center justify-center rounded-2xl bg-[#FF8A1E] px-6 text-[15px] font-[780] tracking-[-0.01em] text-black shadow-[0_18px_70px_rgba(0,0,0,.55)] transition hover:opacity-95 active:translate-y-px sm:h-[58px] sm:px-8 sm:text-[16px]"
              >
                {t.ctaBlock.primary}
              </button>

              <a
                href="https://t.me/TIVONIX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackTelegramDirectClick()}
                className="inline-flex h-[54px] items-center justify-center rounded-2xl bg-white/[0.08] px-6 text-[15px] font-[780] text-white/90 transition hover:bg-white/[0.13] active:translate-y-px sm:h-[58px] sm:px-7 sm:text-[16px]"
              >
                {t.ctaBlock.secondary}
              </a>
            </div>

            <p className="mt-4 text-[13px] leading-[1.65] text-white/58 sm:text-[13.5px]">
              {t.ctaBlock.footnote}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function AutomationBusinessPage() {
  usePrefetchHeroWebGL();

  const { lang } = useLang();
  const t = useMemo(() => getAutomationPageCopy(lang), [lang]);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: t.schemaServiceName,
      serviceType: "Automation and custom web systems",
      provider: { "@type": "Organization", name: "TIVONIX" },
      areaServed: "CIS",
      url: "https://tivonix.tech/avtomatizaciya-biznesa",
    }),
    [t.schemaServiceName]
  );

  return (
    <div className="relative min-h-screen bg-black font-sans antialiased">
      <div className="relative z-10 isolate">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
          <HeroTextSmokeBg />
        </div>

        <SEO
          title={t.seo.title}
          description={t.seo.description}
          canonicalPath="/avtomatizaciya-biznesa"
          schemaJsonLd={schema}
          ogLocalePrimary={lang === "en" ? "en_US" : "ru_RU"}
        />

        <Header />

        <main className="relative z-10 min-w-0 overflow-x-visible">
          <AutomationHero t={t} />

          <AutomationSignsScrollSection
            smokeBase={WHY_AUTOMATION_SMOKE_BASE}
            orangeLayer={WHY_AUTOMATION_ORANGE_LAYER}
            imageDir={AUTOMATION_SIGNS_IMG_DIR}
            sectionTitle={t.signs.sectionTitle}
            sectionLead={t.signs.sectionLead}
            ariaList={t.signs.ariaList}
            items={t.signs.items}
          />

          <WhyAutomation t={t} />

          <PainPointsBlock
            items={t.pain.items}
            imageDir={PAIN_POINTS_IMG_DIR}
            smokeBase={WHY_AUTOMATION_SMOKE_BASE}
            orangeLayer={WHY_AUTOMATION_ORANGE_LAYER}
            sectionTitle={t.pain.title}
            sectionLead={t.pain.lead}
          />

          <AutomationFeatures t={t} />

          <RealExamples t={t} />

          <ResultsSection t={t} />

          <WhyTivonix t={t} />

          <AutomationFAQ t={t} />

          <AutomationCTA t={t} />
        </main>

        <Footer />
      </div>
    </div>
  );
}