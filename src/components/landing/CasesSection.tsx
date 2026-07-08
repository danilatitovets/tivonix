import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import PillActionBar from "../ui/PillActionBar";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { buildProjects } from "../../data/projectsCatalog";
import { TG_BOT_URL } from "../../constants/links";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function useCaseCoverPan(blockRef: RefObject<HTMLDivElement | null>) {
  const [coverX, setCoverX] = useState(36);

  useEffect(() => {
    const el = blockRef.current;
    if (!el || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height + vh * 0.35);
      const scrolled = vh * 0.82 - rect.top;
      const progress = clamp01(scrolled / total);
      const wide = window.innerWidth >= 1024;
      const start = wide ? 38 : 30;
      const end = wide ? 74 : 58;
      const target = reduced ? (wide ? 58 : 46) : start + (end - start) * progress;
      setCoverX(target);
    };

    let raf = 0;
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
  }, [blockRef]);

  return coverX;
}

export default function CasesSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const isRu = lang === "ru";
  const [activeTab, setActiveTab] = useState("view");
  const caseBlockRef = useRef<HTMLDivElement>(null);
  const coverX = useCaseCoverPan(caseBlockRef);

  const spliton = buildProjects(isRu).find((p) => p.id === "spliton");
  if (!spliton) return null;

  const subtitle = isRu ? spliton.subtitleRu : spliton.subtitleEn;

  const caseTabs = useMemo(() => {
    const tabs = [
      {
        id: "view",
        label: copy.cases.viewCase,
        to: `/projects/${spliton.id}`,
      },
    ];
    if (spliton.domain) {
      tabs.push({
        id: "product",
        label: copy.cases.openProduct,
        href: spliton.domain,
      });
    }
    tabs.push({
      id: "cta",
      label: copy.cases.cta,
      href: TG_BOT_URL,
    });
    return tabs;
  }, [copy.cases.cta, copy.cases.openProduct, copy.cases.viewCase, spliton.domain, spliton.id]);

  return (
    <Section id="cases" className="scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="case-split">
            <div className="case-split__visual">
              <img
                src={spliton.cover ?? "/images/project-priew/spliton.png"}
                alt={spliton.title}
                loading="lazy"
                decoding="async"
                className="case-split__img"
                style={{ objectPosition: `${coverX}% 58%` }}
              />
              <div className="case-split__visual-overlay" aria-hidden />
            </div>

            <div ref={caseBlockRef} className="case-split__grid">
              <div className="case-split__visual-gap" aria-hidden />

              <div className="case-split__content">
                <span className="case-split__badge">{copy.cases.badge}</span>

                <h2 className="mt-4 font-hero text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                  {spliton.title}
                </h2>

                <p className="mt-3 text-[14px] leading-relaxed text-white/48 sm:text-[15px]">{subtitle}</p>

                <div className="mt-6 space-y-3 text-[13.5px] leading-relaxed text-white/62">
                  <p>
                    <span className="font-medium text-white/78">{isRu ? "Задача:" : "Need:"}</span>{" "}
                    {copy.cases.spliton.need}
                  </p>
                  <p>
                    <span className="font-medium text-white/78">{isRu ? "Сделали:" : "Built:"}</span>{" "}
                    {copy.cases.spliton.done}
                  </p>
                </div>

                <div className="case-split__chips mt-5 flex flex-wrap gap-2">
                  {copy.cases.spliton.modules.map((m) => (
                    <span key={m} className="case-split__chip">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="case-split__tabs">
              <PillActionBar
                items={caseTabs}
                activeId={activeTab}
                onActiveChange={setActiveTab}
                className="case-split__tab-bar"
                ariaLabel={isRu ? "Действия с кейсом" : "Case actions"}
              />
            </div>
          </Reveal>
        </Container>
    </Section>
  );
}
