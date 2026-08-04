import { useCallback, useState } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import MilesealHero from "../components/mileseal/MilesealHero";
import MilesealDemo from "../components/mileseal/MilesealDemo";
import MilesealValueSections from "../components/mileseal/MilesealValueSections";
import MilesealScopeForm from "../components/mileseal/MilesealScopeForm";
import { useLang } from "../i18n/LangProvider";
import { milesealCopy } from "../i18n/milesealCopy";
import { ogLocaleFor } from "../i18n/pick";
import type { ScopeFormPrefill } from "../data/milesealDemo";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export default function MilesealPage() {
  const { lang } = useLang();
  const copy = milesealCopy(lang);
  const [formOpen, setFormOpen] = useState(false);
  const [prefill, setPrefill] = useState<ScopeFormPrefill | null>(null);
  const [formKey, setFormKey] = useState(0);

  const openReview = useCallback((nextPrefill?: ScopeFormPrefill | null) => {
    setPrefill(nextPrefill ?? null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
    requestAnimationFrame(() => scrollToId("scope-review"));
  }, []);

  return (
    <div className="landing-caldera min-h-screen bg-black">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath="/mileseal"
        ogLocalePrimary={ogLocaleFor(lang)}
        hreflang={false}
      />
      <Header />
      <main>
        <MilesealHero
          onTryDemo={() => scrollToId("demo")}
          onRequestReview={() => openReview()}
        />
        <MilesealDemo onSendForReview={openReview} />
        <MilesealValueSections />
        <MilesealScopeForm
          formOpen={formOpen}
          onOpenForm={() => openReview()}
          prefill={prefill}
          formKey={formKey}
        />
      </main>
      <Footer />
    </div>
  );
}
