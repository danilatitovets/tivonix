import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import PillActionBar from "../ui/PillActionBar";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { buildProjects, projectSubtitle } from "../../data/projectsCatalog";
import { useLeadForm } from "../leads/useLeadForm";
import { getStableViewportHeight } from "../../lib/stableViewport";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function useCaseCoverPan(blockRef: RefObject<HTMLDivElement | null>) {
  const [coverX, setCoverX] = useState(38);

  useEffect(() => {
    const el = blockRef.current;
    if (!el || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let lastX = 38;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = getStableViewportHeight();
      const total = Math.max(1, rect.height + vh * 0.35);
      const scrolled = vh * 0.82 - rect.top;
      const progress = clamp01(scrolled / total);
      const wide = window.innerWidth >= 1024;
      const start = wide ? 32 : 40;
      const end = wide ? 48 : 55;
      const target = reduced ? (wide ? 38 : 45) : start + (end - start) * progress;
      if (Math.abs(target - lastX) < 0.15) return;
      lastX = target;
      setCoverX(target);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [blockRef]);

  return coverX;
}

export default function CasesSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const { openLeadForm } = useLeadForm();
  const isRu = lang === "ru";
  const [activeTab, setActiveTab] = useState("view");
  const caseBlockRef = useRef<HTMLDivElement>(null);
  const coverX = useCaseCoverPan(caseBlockRef);

  const featured = buildProjects(isRu).find((p) => p.id === "tivonixpanel");
  if (!featured) return null;

  const subtitle = projectSubtitle(featured, lang);
  const caseCopy = copy.cases.tivonixpanel;

  const caseTabs = useMemo(() => {
    const tabs = [
      {
        id: "view",
        label: copy.cases.viewCase,
        to: `/projects/${featured.id}`,
      },
    ];
    if (featured.domain) {
      tabs.push({
        id: "product",
        label: copy.cases.openProduct,
        href: featured.domain,
      });
    }
    tabs.push({
      id: "cta",
      label: copy.cases.discussSimilar,
      onClick: () => openLeadForm("cases"),
    });
    return tabs;
  }, [
    copy.cases.discussSimilar,
    copy.cases.openProduct,
    copy.cases.viewCase,
    featured.domain,
    featured.id,
    openLeadForm,
  ]);

  const CASE_COVER = `/images/${encodeURI("обложки")}/tivonixpanel.webp`;

  return (
    <Section id="cases" className="scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="case-split">
            <div className="case-split__visual">
              <img
                src={CASE_COVER}
                alt={featured.title}
                loading="lazy"
                decoding="async"
                className="case-split__img"
                style={{ objectPosition: `${coverX}% 45%` }}
              />
              <div className="case-split__visual-overlay" aria-hidden />
            </div>

            <div ref={caseBlockRef} className="case-split__grid">
              <div className="case-split__visual-gap" aria-hidden />

              <div className="case-split__content">
                <span className="case-split__badge">{copy.cases.badge}</span>
                {"ownProduct" in caseCopy && caseCopy.ownProduct ? (
                  <p className="mt-2 text-[12px] font-medium text-[#FF9A3D]/85">
                    {caseCopy.ownProduct}
                  </p>
                ) : null}

                <h2 className="mt-4 font-hero text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                  {featured.title}
                </h2>

                <p className="mt-3 text-[14px] leading-relaxed text-white/48 sm:text-[15px]">{subtitle}</p>

                <div className="mt-6 space-y-3 text-[13.5px] leading-relaxed text-white/62">
                  <p>
                    <span className="font-medium text-white/78">
                      {isRu ? "Проблема:" : "Problem:"}
                    </span>{" "}
                    {caseCopy.need}
                  </p>
                  <p>
                    <span className="font-medium text-white/78">
                      {isRu ? "Решение:" : "Solution:"}
                    </span>{" "}
                    {caseCopy.done}
                  </p>
                  <p>
                    <span className="font-medium text-white/78">
                      {isRu ? "Результат:" : "Result:"}
                    </span>{" "}
                    {isRu
                      ? "Живая партнёрская панель в продакшене: сделки, статусы и выплаты в одном кабинете."
                      : "Live partner panel in production: deals, statuses and payouts in one cabinet."}
                  </p>
                </div>

                <div className="case-split__chips mt-5">
                  {caseCopy.modules.map((m) => (
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
