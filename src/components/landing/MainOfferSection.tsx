import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { LANDING_HEADLINE_CLASS } from "../../lib/landingLayout";
import { TG_BOT_URL } from "../../constants/links";

type Metric = {
  title: string;
  text: string;
};

type OfferSlice = 1 | 2 | 3 | 4 | 5 | 6;

type CardReveal = {
  bg: number;
  text: number;
};

const OFFER_MOSAIC_BG = `/images/${encodeURI("как рабоает/пп/блоки/ffon.webp")}`;
const OFFER_BOTTOM_MOBILE_BG = `/images/${encodeURI("как рабоает/пп/6.webp")}`;
const TOP_ENTER_STAGGER_MS = 130;
const TOP_ENTER_DURATION_MS = 820;
const REVEAL_DELAY_MS = 200;
const REVEAL_DURATION_MS = 2800;
const OFFER_MOBILE_MAX_WIDTH = 1023;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function getAccumulatedScroll(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node = el.parentElement;

  while (node && node !== root) {
    x += node.scrollLeft;
    y += node.scrollTop;
    node = node.parentElement;
  }

  return { x, y };
}

function useOfferMosaicBackground(mosaicRef: React.RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic) return;

    const update = () => {
      const mosaicRect = mosaic.getBoundingClientRect();
      if (mosaicRect.width <= 0 || mosaicRect.height <= 0) return;

      const rowBottom = mosaic.querySelector(".offer-mosaic__row-bottom");
      const isMobile = window.innerWidth < 1024;
      const gridW =
        isMobile && rowBottom
          ? Math.max(mosaicRect.width, rowBottom.scrollWidth)
          : mosaicRect.width;
      const gridH = mosaicRect.height;

      mosaic.style.setProperty("--offer-grid-w", `${gridW}px`);
      mosaic.style.setProperty("--offer-grid-h", `${gridH}px`);

      mosaic.querySelectorAll<HTMLElement>("[data-offer-slice]").forEach((card) => {
        const inBottomRow = card.closest(".offer-mosaic__row-bottom") !== null;
        if (isMobile && inBottomRow) {
          card.style.removeProperty("--offer-bg-w");
          card.style.removeProperty("--offer-bg-h");
          card.style.removeProperty("--offer-bg-pos-x");
          card.style.removeProperty("--offer-bg-pos-y");
          return;
        }

        const cardRect = card.getBoundingClientRect();
        const scroll = getAccumulatedScroll(card, mosaic);
        const posX = cardRect.left - mosaicRect.left + scroll.x;
        const posY = cardRect.top - mosaicRect.top + scroll.y;

        card.style.setProperty("--offer-bg-w", `${gridW}px`);
        card.style.setProperty("--offer-bg-h", `${gridH}px`);
        card.style.setProperty("--offer-bg-pos-x", `${-posX}px`);
        card.style.setProperty("--offer-bg-pos-y", `${-posY}px`);
      });
    };

    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    scheduleUpdate();

    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(mosaic);

    window.addEventListener("resize", scheduleUpdate);
    document.fonts?.ready.then(scheduleUpdate).catch(() => undefined);

    const rowBottom = mosaic.querySelector(".offer-mosaic__row-bottom");
    rowBottom?.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      rowBottom?.removeEventListener("scroll", scheduleUpdate);
    };
  }, [mosaicRef]);
}

function useOfferSectionAnimation(
  mosaicRef: React.RefObject<HTMLDivElement | null>,
  bottomCardRefs: React.MutableRefObject<(HTMLElement | null)[]>
) {
  const [topVisible, setTopVisible] = useState<[boolean, boolean]>([false, false]);
  const [cardReveals, setCardReveals] = useState<CardReveal[]>([
    { bg: 0, text: 0 },
    { bg: 0, text: 0 },
    { bg: 0, text: 0 },
    { bg: 0, text: 0 },
  ]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startedRef = useRef(false);

  const finishInstant = useCallback(() => {
    setTopVisible([true, true]);
    setCardReveals([
      { bg: 1, text: 1 },
      { bg: 1, text: 1 },
      { bg: 1, text: 1 },
      { bg: 1, text: 1 },
    ]);
  }, []);

  const measureBottomRow = useCallback(() => {
    const mosaic = mosaicRef.current;
    const cards = bottomCardRefs.current.filter(Boolean) as HTMLElement[];
    if (!mosaic || cards.length === 0) return null;

    const mosaicRect = mosaic.getBoundingClientRect();
    const first = cards[0].getBoundingClientRect();
    const last = cards[cards.length - 1].getBoundingClientRect();

    const startX = first.left - mosaicRect.left;
    const endX = last.right - mosaicRect.left;

    return { startX, endX, mosaicRect, cards };
  }, [bottomCardRefs, mosaicRef]);

  const updateCardReveals = useCallback((progress: number) => {
    const measured = measureBottomRow();
    if (!measured) return;

    const { cards } = measured;
    const staggerSpan = 0.72;

    const next = cards.map((_, index) => {
      const start = (index / cards.length) * staggerSpan;
      const local = clamp((progress - start) / (1 - start + 0.18), 0, 1);
      const bgRaw = clamp(local / 0.58, 0, 1);
      const textRaw = clamp((local - 0.32) / 0.52, 0, 1);

      return {
        bg: easeOutCubic(bgRaw),
        text: easeOutCubic(textRaw),
      };
    });

    setCardReveals(next);
  }, [measureBottomRow]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia(`(max-width: ${OFFER_MOBILE_MAX_WIDTH}px)`).matches;
    setReducedMotion(reduced);

    const mosaic = mosaicRef.current;
    if (!mosaic) return;

    if (reduced || mobile) {
      finishInstant();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        window.setTimeout(() => setTopVisible([true, false]), 0);
        window.setTimeout(() => setTopVisible([true, true]), TOP_ENTER_STAGGER_MS);

        window.setTimeout(() => {
          const measured = measureBottomRow();
          if (!measured) {
            finishInstant();
            return;
          }

          updateCardReveals(0);

          const revealStart = performance.now();

          const tick = (now: number) => {
            const raw = clamp((now - revealStart) / REVEAL_DURATION_MS, 0, 1);
            updateCardReveals(easeOutCubic(raw));

            if (raw < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }, TOP_ENTER_DURATION_MS + REVEAL_DELAY_MS);
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(mosaic);
    return () => io.disconnect();
  }, [finishInstant, measureBottomRow, mosaicRef, updateCardReveals]);

  useEffect(() => {
    if (!topVisible[0]) return;

    const onResize = () => {
      const progress = cardReveals.every((c) => c.bg >= 1 && c.text >= 1)
        ? 1
        : clamp(cardReveals.reduce((max, c) => Math.max(max, c.bg), 0), 0, 1);
      updateCardReveals(progress);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cardReveals, measureBottomRow, topVisible, updateCardReveals]);

  return {
    topVisible,
    cardReveals,
    reducedMotion,
  };
}

function OfferBlockCard({
  slice,
  children,
  className,
  bgReveal = 1,
  textReveal = 1,
}: {
  slice: OfferSlice;
  children: ReactNode;
  className?: string;
  bgReveal?: number;
  textReveal?: number;
}) {
  return (
    <article
      data-offer-slice={slice}
      className={[
        "offer-block-card relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl",
        className ?? "",
      ].join(" ")}
      style={
        {
          ["--offer-bg-reveal" as string]: bgReveal,
          ["--offer-text-reveal" as string]: textReveal,
        } as React.CSSProperties
      }
    >
      <div className="offer-block-card__bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="offer-block-card__shade pointer-events-none absolute inset-0 bg-black"
        aria-hidden
      />
      <div className="offer-block-card__content relative z-10 flex min-h-0 flex-1 flex-col justify-between p-6 sm:p-7">
        {children}
      </div>
    </article>
  );
}

function MetricCard({
  slice,
  title,
  text,
  className,
  bgReveal,
  textReveal,
}: Metric & {
  slice: OfferSlice;
  className?: string;
  bgReveal?: number;
  textReveal?: number;
}) {
  return (
    <OfferBlockCard
      slice={slice}
      bgReveal={bgReveal}
      textReveal={textReveal}
      className={["min-h-[200px] sm:min-h-[220px] lg:min-h-0", className].filter(Boolean).join(" ")}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-6">
        <h3 className="font-hero text-[clamp(1.2rem,2.2vw,1.55rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white">
          {title}
        </h3>
        <p className="text-pretty text-[14px] leading-[1.55] text-white/55 sm:text-[15px] sm:leading-[1.6]">
          {text}
        </p>
      </div>
    </OfferBlockCard>
  );
}

function FeaturedCard({
  badge,
  title,
  text,
  linkText,
  footer,
  className,
  visible,
}: {
  badge: string;
  title: string;
  text: string;
  linkText: string;
  footer: string;
  className?: string;
  visible: boolean;
}) {
  return (
    <div
      className={[
        "offer-top-enter h-full w-full min-w-0",
        visible ? "offer-top-enter--visible" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <OfferBlockCard slice={1} className="h-full lg:min-h-0">
        <div className="text-[13px] font-semibold tracking-[0.14em] text-white/70 sm:text-[14px]">
          {badge}
        </div>

        <div className="my-4 max-w-[48ch] flex-1 sm:my-5 lg:my-4">
          <h3 className="font-hero text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-white/62 sm:mt-3.5 sm:text-[16px] sm:leading-[1.7]">
            {text}
          </p>
          <a
            href={TG_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex min-h-[2.5rem] items-center gap-1.5 text-[14px] font-medium text-white/85 transition hover:text-[#FFAE66]"
          >
            {linkText}
            <ArrowUpRight
              size={15}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>

        <p className="text-[13px] leading-snug text-white/45 sm:text-[14px]">{footer}</p>
      </OfferBlockCard>
    </div>
  );
}

export default function MainOfferSection() {
  const copy = landingCopy(useLang().lang);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const bottomCardRefs = useRef<(HTMLElement | null)[]>([]);
  useOfferMosaicBackground(mosaicRef);

  const { topVisible, cardReveals } = useOfferSectionAnimation(
    mosaicRef,
    bottomCardRefs
  );

  const [topMetric, ...bottomMetrics] = copy.offer.metrics;

  return (
    <Section
        id="offer"
        className="scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <Reveal delay={0}>
            <div className="min-w-0 text-center">
              <h2 className={`${LANDING_HEADLINE_CLASS} text-center text-balance`}>
                {copy.offer.title}
              </h2>
            </div>
          </Reveal>

          <div
            ref={mosaicRef}
            className="offer-mosaic relative mt-10 flex flex-col gap-2.5 sm:mt-12 sm:gap-4"
            style={{
              ["--offer-mosaic-image" as string]: `url("${OFFER_MOSAIC_BG}")`,
              ["--offer-mobile-bottom-image" as string]: `url("${OFFER_BOTTOM_MOBILE_BG}")`,
            }}
          >
            <div className="offer-mosaic__row-top grid grid-cols-1 gap-2.5 sm:gap-4">
              <div className="offer-mosaic__cell min-h-[220px] min-w-0 w-full sm:min-h-[240px] lg:col-span-8 lg:min-h-0">
                <FeaturedCard
                  badge={copy.offer.featured.badge}
                  title={copy.offer.featured.title}
                  text={copy.offer.featured.text}
                  linkText={copy.offer.featured.linkText}
                  footer={copy.offer.featured.footer}
                  visible={topVisible[0]}
                />
              </div>

              {topMetric ? (
                <div
                  className={[
                    "offer-mosaic__cell offer-top-enter min-h-[220px] sm:min-h-[240px] lg:col-span-4 lg:flex lg:min-h-0",
                    topVisible[1] ? "offer-top-enter--visible" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ transitionDelay: `${TOP_ENTER_STAGGER_MS}ms` } as CSSProperties}
                >
                  <MetricCard
                    slice={2}
                    {...topMetric}
                    className="w-full lg:h-full lg:min-h-0"
                  />
                </div>
              ) : null}
            </div>

            <div className="offer-mosaic__row-bottom grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {bottomMetrics.map((item, i) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    bottomCardRefs.current[i] = el;
                  }}
                  className="offer-mosaic__cell min-w-0 lg:col-span-3"
                >
                  <MetricCard
                    slice={(i + 3) as OfferSlice}
                    {...item}
                    bgReveal={cardReveals[i]?.bg ?? 0}
                    textReveal={cardReveals[i]?.text ?? 0}
                    className="h-full lg:min-h-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
    </Section>
  );
}
