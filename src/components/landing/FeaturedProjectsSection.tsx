import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { findProjectBySlug } from "../../data/projectsCatalog";
import { trackEvent } from "../../lib/analytics";

const AUTO_MS = 5500;

export default function FeaturedProjectsSection() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const copy = homeExtraCopy(lang);
  const items = copy.featured.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      const len = items.length;
      if (len === 0) return;
      setIndex(((next % len) + len) % len);
    },
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [paused, items.length, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const item = items[index];
  const project = item ? findProjectBySlug(item.id, isRu) : undefined;
  if (!item || !project) return null;

  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const cover = project.cover ?? "";

  return (
    <Section
      id="featured-projects"
      className="scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16 lg:!py-20"
    >
      <Container>
        <Reveal className="mx-auto mb-8 max-w-[40rem] text-center sm:mb-10">
          <h2 className="mx-auto text-center font-hero text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance">
            {isRu ? "Три живые результата" : "Three live results"}
          </h2>
        </Reveal>

        <Reveal>
          <div
            className="featured-case-carousel relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
            onTouchStart={(e) => {
              touchX.current = e.changedTouches[0]?.clientX ?? null;
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX;
              touchX.current = null;
              setPaused(false);
              if (start == null || end == null) return;
              const delta = end - start;
              if (Math.abs(delta) < 48) return;
              go(delta < 0 ? index + 1 : index - 1);
            }}
          >
            <article className="case-split case-split--no-tabs" key={item.id}>
              <div className="case-split__visual">
                {cover ? (
                  <img
                    src={cover}
                    alt={project.title}
                    loading="eager"
                    decoding="async"
                    className="case-split__img"
                    width={960}
                    height={640}
                  />
                ) : null}
                <div className="case-split__visual-overlay" aria-hidden />
              </div>

              <div className="case-split__grid">
                <div className="case-split__visual-gap" aria-hidden />

                <div className="case-split__content">
                  <span className="case-split__badge">{item.type}</span>

                  <h3 className="mt-4 font-hero text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                    <Link
                      to={`/projects/${project.id}`}
                      onClick={() =>
                        trackEvent("project_open", {
                          project: project.id,
                          source: "featured",
                        })
                      }
                      className="transition-colors hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-white/48 sm:text-[15px]">
                    {subtitle}
                  </p>

                  <div className="mt-6 space-y-3 text-[13.5px] leading-relaxed text-white/62">
                    <p>
                      <span className="font-medium text-white/78">
                        {copy.featured.problem}
                      </span>{" "}
                      {item.problem}
                    </p>
                    <p>
                      <span className="font-medium text-white/78">
                        {copy.featured.solution}
                      </span>{" "}
                      {item.solution}
                    </p>
                    <p>
                      <span className="font-medium text-white/78">
                        {copy.featured.resultLabel}
                      </span>{" "}
                      {item.result}
                    </p>
                  </div>

                  <div className="case-split__chips mt-5">
                    {item.modules.map((m) => (
                      <span key={m} className="case-split__chip">
                        {m}
                      </span>
                    ))}
                  </div>

                  {project.domain ? (
                    <a
                      href={project.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("project_live_open", {
                          project: project.id,
                          source: "featured",
                        })
                      }
                      className="mt-6 inline-flex text-[13px] font-medium text-[#FF9A3D] transition-colors hover:text-[#FFB06A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70"
                    >
                      {copy.featured.openLive} →
                    </a>
                  ) : null}
                </div>
              </div>
            </article>

            <div
              className="mt-6 flex items-center justify-center gap-2"
              role="tablist"
              aria-label={isRu ? "Кейсы" : "Cases"}
            >
              {items.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={slide.id}
                  onClick={() => setIndex(i)}
                  className="relative h-1 w-10 overflow-hidden rounded-full bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70 sm:w-12"
                >
                  {i === index ? (
                    <span
                      key={`${slide.id}-${index}`}
                      className="featured-case-line-fill absolute inset-0 rounded-full bg-[#FF6B2C]"
                      style={
                        {
                          animationDuration: `${AUTO_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        } as CSSProperties
                      }
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
