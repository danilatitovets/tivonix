import { Link, useLocation } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { useLang } from "../i18n/LangProvider";
import {
  servicePageCopy,
  servicePageIdFromPath,
  type ServicePageId,
} from "../i18n/servicePagesCopy";
import { canonicalPathForLang } from "../lib/localePaths";

type Props = { pageId?: ServicePageId };

export default function ServiceLandingPage({ pageId: pageIdProp }: Props) {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const pageId = pageIdProp ?? servicePageIdFromPath(pathname);

  if (!pageId) {
    return null;
  }

  const copy = servicePageCopy(pageId, lang);
  const canonicalPath = pathname.replace(/\/+$/, "") || pathname;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath={canonicalPath}
        ogLocalePrimary={lang === "zh" ? "zh_CN" : lang === "en" ? "en_US" : "ru_RU"}
        hreflang={pageId === "websites" || pageId === "mvp" || pageId === "automation"}
      />
      <Header />
      <main>
        <Section className="pt-8 sm:pt-10 pb-8">
          <Container>
            <h1 className="text-[32px] sm:text-[46px] font-[850] tracking-[-0.03em] text-white leading-[1.08]">
              {copy.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-7 text-white/72">{copy.lead}</p>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/62">{copy.offer}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LeadCTAButton source="service_websites" variant="primary" size="lg">
                {copy.cta}
              </LeadCTAButton>
            </div>
          </Container>
        </Section>

        <Section className="py-8">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">
              {copy.process.title}
            </h2>
            <ol className="mt-4 grid gap-2 text-white/74 list-decimal pl-5">
              {copy.process.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section className="py-8">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">
              {copy.cases.title}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {copy.cases.items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={lang === "en" && !item.href.startsWith("/en") ? `/en${item.href}` : item.href}
                    className="inline-flex rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/30 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section className="py-8">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">
              {copy.pricing.title}
            </h2>
            <p className="mt-4 max-w-3xl text-white/74 leading-7">{copy.pricing.body}</p>
          </Container>
        </Section>

        <Section className="py-8 pb-14">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">FAQ</h2>
            <dl className="mt-4 grid gap-4 max-w-3xl">
              {copy.faq.map((item) => (
                <div key={item.q}>
                  <dt className="text-[15px] font-semibold text-white/90">{item.q}</dt>
                  <dd className="mt-1 text-[14px] leading-7 text-white/65">{item.a}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
