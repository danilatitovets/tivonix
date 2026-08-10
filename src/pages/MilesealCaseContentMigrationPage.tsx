import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import MilesealCaseStudy from "../components/mileseal/MilesealCaseStudy";
import { useLang } from "../i18n/LangProvider";
import { milesealCaseCopy } from "../i18n/milesealCaseCopy";
import { ogLocaleFor } from "../i18n/pick";
import { MILESEAL_CASE_OG_IMAGE } from "../lib/milesealOg";
import { pathForLang } from "../lib/localePaths";
import { trackMilesealCaseOpened } from "../lib/analytics";

export default function MilesealCaseContentMigrationPage() {
  const { lang } = useLang();
  const location = useLocation();
  const copy = milesealCaseCopy(lang);
  const canonicalPath = pathForLang(location.pathname, lang);

  useEffect(() => {
    trackMilesealCaseOpened({ surface: "case_page" });
  }, []);

  return (    <div className="landing-caldera min-h-screen bg-[#0a0a0a]">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        ogTitle={copy.seo.ogTitle}
        ogDescription={copy.seo.ogDescription}
        canonicalPath={canonicalPath}
        ogLocalePrimary={ogLocaleFor(lang)}
        ogImage={lang === "en" ? MILESEAL_CASE_OG_IMAGE : undefined}
        hreflang
      />
      <Header />
      <main>
        <MilesealCaseStudy />
      </main>
      <Footer />
    </div>
  );
}
