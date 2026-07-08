import { Suspense, lazy, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { buildProjects } from "../../data/projectsCatalog";

const HeroWebGLBg = lazy(() => import("./HeroWebGLBg"));

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const SMOKE_BASE =
  "radial-gradient(120% 90% at 55% 35%, rgba(255,154,61,0.18) 0%, rgba(255,106,26,0.10) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)";

const ORANGE_LAYER =
  "linear-gradient(180deg,rgba(255,174,87,0.34)_0%,rgba(255,138,30,0.22)_38%,rgba(255,120,48,0.12)_72%,rgba(0,0,0,0.14)_100%)";

const SECTION_STYLES = `
  .newCaseSmokeField{
    position:absolute;
    inset:0;
    overflow:hidden;
    pointer-events:none;
  }

  .newCaseSmokeDrift{
    position:absolute;
    left:-8%;
    right:-8%;
    top:-30%;
    bottom:-30%;
    animation:newCaseSmokeFall 22s linear infinite;
    will-change:transform;
  }

  @keyframes newCaseSmokeFall{
    from{ transform:translateY(-6%); }
    to{ transform:translateY(6%); }
  }

  .newCaseSmokeStripes{
    position:absolute;
    inset:0;
    opacity:0.92;
    -webkit-mask-image:
      linear-gradient(180deg, transparent 0%, #000 14%, #000 78%, transparent 100%),
      repeating-linear-gradient(90deg, #000 0px, #000 96px, transparent 96px, transparent 120px);
    mask-image:
      linear-gradient(180deg, transparent 0%, #000 14%, #000 78%, transparent 100%),
      repeating-linear-gradient(90deg, #000 0px, #000 96px, transparent 96px, transparent 120px);
    -webkit-mask-composite:source-in;
    mask-composite:intersect;
  }

  .newCaseTopFade{
    position:absolute;
    inset:0;
    background:linear-gradient(180deg, #000 0%, rgba(0,0,0,0.72) 12%, transparent 28%, transparent 88%, #000 100%);
    pointer-events:none;
  }

  .newCaseTitle{
    font-family:"Instrument Sans", Inter, system-ui, sans-serif;
    font-size:clamp(4.5rem, 11vw, 8.5rem);
    font-weight:600;
    line-height:0.88;
    letter-spacing:-0.04em;
    text-transform:uppercase;
    color:rgba(255,255,255,0.98);
  }

  @media (max-width: 640px){
    .newCaseTitle{
      font-size:clamp(3.2rem, 18vw, 4.2rem);
    }
  }

  @media (prefers-reduced-motion: reduce){
    .newCaseSmokeDrift{ animation:none; }
  }
`;

function SmokeLayer({ active }: { active: boolean }) {
  if (!active) return <div className="absolute inset-0" style={{ background: SMOKE_BASE }} />;

  return (
    <>
      <div className="absolute inset-0" style={{ background: SMOKE_BASE }} />
      <div className="absolute inset-[-12%] scale-[1.05] opacity-[0.78]">
        <Suspense fallback={null}>
          <HeroWebGLBg interactive={false} quality="low" />
        </Suspense>
      </div>
      <div className="absolute inset-0 opacity-[0.82]" style={{ background: ORANGE_LAYER }} />
    </>
  );
}

export default function NewCaseSection() {
  const { dict, lang } = useLang();
  const copy = dict.newCase;
  const isRu = lang === "ru";
  const sectionRef = useRef<HTMLElement | null>(null);
  const coverWrapRef = useRef<HTMLDivElement | null>(null);
  const [smokeOn, setSmokeOn] = useState(false);
  const [coverZoom, setCoverZoom] = useState(1);

  const spliton = buildProjects(isRu).find((p) => p.id === "spliton");
  const subtitle = spliton ? (isRu ? spliton.subtitleRu : spliton.subtitleEn) : "";
  const cover = spliton?.cover ?? "/images/project-priew/spliton.png";
  const domain = spliton?.domain?.replace(/^https?:\/\//, "") ?? "spliton.io/app";
  const outcome = spliton?.outcomes?.[0] ?? "";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSmokeOn(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => setSmokeOn(!!entries[0]?.isIntersecting),
      { root: null, rootMargin: "120px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const wrap = coverWrapRef.current;
    if (!wrap || typeof window === "undefined") return;

    const mobileMq = window.matchMedia("(max-width: 639px)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCoverZoom = () => {
      if (!mobileMq.matches || reducedMq.matches) {
        setCoverZoom(1);
        return;
      }

      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = clamp01((viewport - rect.top) / (viewport * 0.82));
      setCoverZoom(1 + progress * 0.14);
    };

    updateCoverZoom();
    window.addEventListener("scroll", updateCoverZoom, { passive: true });
    window.addEventListener("resize", updateCoverZoom);
    mobileMq.addEventListener("change", updateCoverZoom);
    reducedMq.addEventListener("change", updateCoverZoom);

    return () => {
      window.removeEventListener("scroll", updateCoverZoom);
      window.removeEventListener("resize", updateCoverZoom);
      mobileMq.removeEventListener("change", updateCoverZoom);
      reducedMq.removeEventListener("change", updateCoverZoom);
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <Section className="newCase relative overflow-hidden bg-black !py-0 sm:!py-0">
      <style>{SECTION_STYLES}</style>

      <div className="newCaseSmokeField" aria-hidden>
        <div className="newCaseSmokeStripes">
          <div className="newCaseSmokeDrift">
            <SmokeLayer active={smokeOn} />
          </div>
        </div>
        <div className="newCaseTopFade" />
      </div>

      <Container>
        <div className="relative z-10 grid items-end gap-10 py-16 pl-3 sm:py-20 sm:pl-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-24">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FF9A3D]/90">
              {copy.label}
            </p>
            <h2 className="newCaseTitle mt-3">{copy.title}</h2>
          </div>

          {spliton ? (
            <article className="min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-black/50 backdrop-blur-[2px]">
                <div ref={coverWrapRef} className="relative aspect-[16/10] overflow-hidden bg-black">
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.9]"
                    style={
                      {
                        WebkitMaskImage:
                          "radial-gradient(ellipse 82% 78% at 50% 42%, #fff 0%, #fff 30%, rgba(255,255,255,0.2) 68%, transparent 82%)",
                        maskImage:
                          "radial-gradient(ellipse 82% 78% at 50% 42%, #fff 0%, #fff 30%, rgba(255,255,255,0.2) 68%, transparent 82%)",
                      } as CSSProperties
                    }
                  >
                    <div className="absolute inset-[-18%] opacity-90" style={{ background: SMOKE_BASE }} />
                    {smokeOn ? (
                      <div className="absolute inset-[-10%] scale-[1.06] opacity-[0.72]">
                        <Suspense fallback={null}>
                          <HeroWebGLBg interactive={false} quality="low" />
                        </Suspense>
                      </div>
                    ) : null}
                  </div>

                  <img
                    src={cover}
                    alt={spliton.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="relative z-[2] h-full w-full object-cover object-top opacity-[0.96] will-change-transform max-sm:origin-[center_28%]"
                    style={{ transform: `scale(${coverZoom})` }}
                  />
                  <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="border-t border-white/[0.07] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-hero text-[22px] font-semibold tracking-[-0.03em] text-white sm:text-[26px]">
                      {spliton.title}
                    </h3>
                    <span className="rounded-full bg-[#FF8A1E]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFAE66]">
                      {copy.live}
                    </span>
                  </div>

                  <p className="mt-1 text-[13px] text-white/45">{domain}</p>

                  <p className="mt-4 line-clamp-3 text-[14px] leading-[1.65] text-white/72 sm:text-[15px]">
                    {subtitle}
                  </p>

                  {outcome ? (
                    <p className="mt-3 text-[13px] leading-relaxed text-white/50">{outcome}</p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/projects/${spliton.id}`}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[14px] font-semibold text-black transition hover:bg-white/95"
                    >
                      {copy.cta}
                    </Link>
                    {spliton.domain ? (
                      <a
                        href={spliton.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-[14px] font-semibold text-white/88 transition hover:border-white/35 hover:text-white"
                      >
                        {copy.ctaExternal}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </Container>
      </Section>
    </div>
  );
}
