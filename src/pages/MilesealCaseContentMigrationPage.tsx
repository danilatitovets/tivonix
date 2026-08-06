import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import MilesealCaseStudy from "../components/mileseal/MilesealCaseStudy";
import { useLang } from "../i18n/LangProvider";
import { milesealCaseCopy } from "../i18n/milesealCaseCopy";
import { ogLocaleFor } from "../i18n/pick";

export default function MilesealCaseContentMigrationPage() {
  const { lang } = useLang();
  const copy = milesealCaseCopy(lang);

  return (
    <div className="landing-caldera min-h-screen bg-[#0a0a0a]">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        ogTitle={copy.seo.ogTitle}
        ogDescription={copy.seo.ogDescription}
        canonicalPath="/mileseal/cases/content-migration"
        ogLocalePrimary={ogLocaleFor(lang)}
        hreflang={false}
      />
      <Header />
      <main>
        <MilesealCaseStudy />
      </main>
      <Footer />
    </div>
  );
}
