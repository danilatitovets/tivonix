import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SEO } from "../components/SEO";
import MilesealWorkspace from "../components/mileseal/MilesealWorkspace";
import { useLang } from "../i18n/LangProvider";
import { milesealCopy } from "../i18n/milesealCopy";
import { ogLocaleFor } from "../i18n/pick";
import type { ScopeFormPrefill } from "../data/milesealDemo";

export default function MilesealPage() {
  const { lang } = useLang();
  const copy = milesealCopy(lang);
  const [searchParams, setSearchParams] = useSearchParams();
  const openManualFromQuery = searchParams.get("manual") === "1";
  const [formOpen, setFormOpen] = useState(openManualFromQuery);
  const [prefill, setPrefill] = useState<ScopeFormPrefill | null>(null);
  const [formKey, setFormKey] = useState(0);

  const openReview = useCallback((nextPrefill?: ScopeFormPrefill | null) => {
    setPrefill(nextPrefill ?? null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
  }, []);

  // Strip ?manual=1 from the URL after first paint (opens form via initial state).
  useEffect(() => {
    if (!openManualFromQuery) return;
    const next = new URLSearchParams(searchParams);
    if (!next.has("manual")) return;
    next.delete("manual");
    setSearchParams(next, { replace: true });
  }, [openManualFromQuery, searchParams, setSearchParams]);

  return (
    <>
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath="/mileseal"
        ogLocalePrimary={ogLocaleFor(lang)}
        hreflang={false}
      />
      <MilesealWorkspace
        onRequestManualReview={openReview}
        formOpen={formOpen}
        formKey={formKey}
        prefill={prefill}
        onCloseForm={closeForm}
      />
    </>
  );
}
