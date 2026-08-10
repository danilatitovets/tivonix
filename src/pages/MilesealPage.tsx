import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SEO } from "../components/SEO";
import MilesealCommercialLanding from "../components/mileseal/MilesealCommercialLanding";
import MilesealWorkspace from "../components/mileseal/MilesealWorkspace";
import type { MilesealLeadVariant } from "../lib/milesealLeadSubmit";
import { useLang } from "../i18n/LangProvider";
import { milesealCopy } from "../i18n/milesealCopy";
import { ogLocaleFor } from "../i18n/pick";
import { pathForLang } from "../lib/localePaths";
import { MILESEAL_OG_IMAGE } from "../lib/milesealOg";
import { trackMilesealManualReviewOpened } from "../lib/analytics";
import type { ScopeFormPrefill } from "../data/milesealDemo";

function scrollToScopeReview(): void {
  const anchor = document.getElementById("scope-review");
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  document.getElementById("mileseal-workspace")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function MilesealPage() {
  const { lang } = useLang();
  const location = useLocation();
  const copy = milesealCopy(lang);
  const canonicalPath = pathForLang(location.pathname, lang);
  const caseStudyPath = pathForLang("/mileseal/cases/content-migration", lang);
  const isEnCommercial = lang === "en";
  const [searchParams, setSearchParams] = useSearchParams();
  const openManualFromQuery = searchParams.get("manual") === "1";
  const [formOpen, setFormOpen] = useState(openManualFromQuery);
  const [formVariant, setFormVariant] = useState<MilesealLeadVariant>("review");
  const [prefill, setPrefill] = useState<ScopeFormPrefill | null>(null);
  const [formInitialStep, setFormInitialStep] = useState<
    "welcome" | "request" | "scope" | "contact" | "review"
  >("request");
  const [formKey, setFormKey] = useState(0);
  const formOpenerRef = useRef<HTMLButtonElement>(null);
  const hashHandled = useRef(false);

  const openReview = useCallback((nextPrefill?: ScopeFormPrefill | null) => {
    setFormVariant("review");
    setFormInitialStep(nextPrefill ? "request" : "request");
    setPrefill(nextPrefill ?? null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
    trackMilesealManualReviewOpened({ variant: "review" });
  }, []);

  const openAudit = useCallback((nextPrefill?: ScopeFormPrefill | null) => {
    setFormVariant("audit");
    setFormInitialStep("request");
    setPrefill(nextPrefill ?? null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
    trackMilesealManualReviewOpened({ variant: "audit" });
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
  }, []);

  const openReviewFromHero = useCallback(() => {
    scrollToScopeReview();
    window.setTimeout(() => openReview(), 320);
  }, [openReview]);

  // Strip ?manual=1 from the URL after first paint (opens form via initial state).
  useEffect(() => {
    if (!openManualFromQuery) return;
    const next = new URLSearchParams(searchParams);
    if (!next.has("manual")) return;
    next.delete("manual");
    setSearchParams(next, { replace: true });
    trackMilesealManualReviewOpened({ variant: "review", source: "query" });
  }, [openManualFromQuery, searchParams, setSearchParams]);

  useEffect(() => {
    if (hashHandled.current) return;
    const hash = location.hash.replace("#", "");
    if (hash !== "scope-review") return;
    hashHandled.current = true;
    scrollToScopeReview();
    window.setTimeout(() => openReview(), 320);
  }, [location.hash, openReview]);

  return (
    <>
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath={canonicalPath}
        ogLocalePrimary={ogLocaleFor(lang)}
        ogImage={isEnCommercial ? MILESEAL_OG_IMAGE : undefined}
        ogTitle={isEnCommercial ? copy.seo.title : undefined}
        ogDescription={isEnCommercial ? copy.seo.description : undefined}
        hreflang
      />
      {isEnCommercial ? (
        <div className="min-h-screen bg-black">
          <MilesealCommercialLanding
            caseStudyPath={caseStudyPath}
            onRequestReview={openReviewFromHero}
            onRequestAudit={() => {
              scrollToScopeReview();
              window.setTimeout(() => openAudit(), 320);
            }}
            reviewOpenerRef={formOpenerRef}
          />
          <section id="mileseal-workspace" aria-label="MileSeal workspace">
            <MilesealWorkspace
              layout="section"
              onRequestManualReview={openReview}
              formOpen={formOpen}
              formKey={formKey}
              formVariant={formVariant}
              prefill={prefill}
              onCloseForm={closeForm}
              formOpenerRef={formOpenerRef}
              formInitialStep={formInitialStep}
            />
          </section>
        </div>
      ) : (
        <MilesealWorkspace
          onRequestManualReview={openReview}
          formOpen={formOpen}
          formKey={formKey}
          formVariant={formVariant}
          prefill={prefill}
          onCloseForm={closeForm}
          formOpenerRef={formOpenerRef}
          formInitialStep={formInitialStep}
        />
      )}
    </>
  );
}
