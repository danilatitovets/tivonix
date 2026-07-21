import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import {
  isPublicProjectId,
  projectsWithTestimonials,
  type Project,
} from "../../data/projectsCatalog";

/** Same photos as home pricing cards */
const PLANS_IMG = `/images/${encodeURIComponent("планы")}`;
const PLAN_PHOTOS = [1, 2, 3, 4, 5].map((n) => `${PLANS_IMG}/${n}.png`);
const SPEED_PX_PER_SEC = 38;

function initialsFromName(name: string) {
  const parts = name.replace(/[«»""]/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function TestimonialCard({
  project,
  photo,
  viewCase,
  ownProduct,
}: {
  project: Project;
  photo: string;
  viewCase: string;
  ownProduct: string;
}) {
  const t = project.testimonial!;
  const showCase = isPublicProjectId(project.id);
  const isOwn = project.id === "tivonixpanel";
  const cardStyle = { "--card-photo": `url("${photo}")` } as CSSProperties;

  return (
    <article className="home-testimonials__card" style={cardStyle}>
      <div className="home-testimonials__card-bg" aria-hidden />
      <div className="home-testimonials__card-veil" aria-hidden />
      <div className="home-testimonials__card-body">
        <span className="home-testimonials__avatar" aria-hidden>
          {initialsFromName(t.name)}
        </span>
        <div className="home-testimonials__content">
          <div className="home-testimonials__meta">
            <p className="home-testimonials__name">{t.name}</p>
            <p className="home-testimonials__role">{t.role}</p>
          </div>
          <p className="home-testimonials__text">{t.text}</p>
          <div className="home-testimonials__foot">
            {isOwn ? (
              <span className="home-testimonials__muted">{ownProduct}</span>
            ) : showCase ? (
              <Link to={`/projects/${project.id}`} className="home-testimonials__case">
                {viewCase}: {project.title}
              </Link>
            ) : (
              <span className="home-testimonials__muted">{project.title}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HomeTestimonialsSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);
  const items = projectsWithTestimonials(lang === "ru");
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [holding, setHolding] = useState(false);
  const holdingRef = useRef(false);
  const inViewRef = useRef(true);
  const reducedRef = useRef(false);

  useEffect(() => {
    holdingRef.current = holding;
  }, [holding]);

  useEffect(() => {
    const scroller = marqueeRef.current;
    const track = trackRef.current;
    if (!scroller || !track || typeof window === "undefined") return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;

    let raf = 0;
    let lastTs = 0;
    let halfWidth = 0;

    const measure = () => {
      halfWidth = track.scrollWidth / 2;
    };

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop);
      if (!lastTs) lastTs = ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      if (holdingRef.current || !inViewRef.current) return;
      if (halfWidth <= 0) measure();
      if (halfWidth <= 0) return;

      scroller.scrollLeft += SPEED_PX_PER_SEC * dt;
      if (scroller.scrollLeft >= halfWidth) {
        scroller.scrollLeft -= halfWidth;
      }
    };

    measure();
    raf = requestAnimationFrame(loop);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(track);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(scroller);

    const onScroll = () => {
      if (halfWidth <= 0) return;
      // Keep infinite loop when user drags past the seam
      if (scroller.scrollLeft >= halfWidth) {
        scroller.scrollLeft -= halfWidth;
      } else if (scroller.scrollLeft <= 0) {
        scroller.scrollLeft += halfWidth;
      }
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  if (items.length === 0) return null;

  const sequence = [...items, ...items];

  const pause = (e: ReactPointerEvent<HTMLDivElement>) => {
    setHolding(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };
  const resume = () => setHolding(false);

  return (
    <Section
      id="testimonials"
      className="home-testimonials scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16"
    >
      <Container>
        <Reveal className="mx-auto max-w-[36rem] text-center">
          <h2 className="font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white">
            {copy.testimonials.title}
          </h2>
        </Reveal>
      </Container>

      <div
        ref={marqueeRef}
        className={[
          "home-testimonials__marquee mt-10",
          holding ? "is-holding" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={copy.testimonials.title}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
        onLostPointerCapture={resume}
      >
        <div ref={trackRef} className="home-testimonials__track">
          {sequence.map((project, i) => (
            <TestimonialCard
              key={`${project.id}-${i}`}
              project={project}
              photo={PLAN_PHOTOS[i % PLAN_PHOTOS.length]}
              viewCase={copy.testimonials.viewCase}
              ownProduct={copy.testimonials.ownProduct}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
