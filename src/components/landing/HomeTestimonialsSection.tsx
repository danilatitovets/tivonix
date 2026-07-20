import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-paused");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-paused", !entry.isIntersecting);
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  const sequence = [...items, ...items];

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
        className="home-testimonials__marquee mt-10"
        aria-label={copy.testimonials.title}
      >
        <div className="home-testimonials__track">
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
