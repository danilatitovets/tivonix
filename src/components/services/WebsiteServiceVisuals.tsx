import { useEffect, useMemo, useState } from "react";
import BgLoopVideo from "../ui/BgLoopVideo";
import Container from "../ui/Container";
import HoverRevealCards, { type CardItem } from "../ui/cards";
import { pickLoopSrc } from "../../lib/heroMedia";
import { WEBSITE_EXAMPLES } from "../../data/websiteExamples";
import { MVP_EXAMPLES } from "../../data/mvpExamples";
import { AUTOMATION_EXAMPLES } from "../../data/automationExamples";
import { useLang } from "../../i18n/LangProvider";
import { useLeadForm } from "../leads/useLeadForm";
import type { CtaSource } from "../../lib/analytics";

const PAGE_BG_DESKTOP = "/images/services/websites/page-bg.mp4";
const PAGE_BG_MOBILE = "/images/services/websites/page-bg-mobile.mp4";
const PAGE_BG_POSTER = "/images/services/websites/page-bg-poster.webp";

const AUTOMATION_BG_DESKTOP = "/images/services/automation/page-bg.mp4";
const AUTOMATION_BG_MOBILE = "/images/services/automation/page-bg-mobile.mp4";
const AUTOMATION_BG_POSTER = "/images/services/automation/page-bg-poster.webp";

const PORTAL_BG_DESKTOP = "/images/services/portal/page-bg.mp4";
const PORTAL_BG_MOBILE = "/images/services/portal/page-bg-mobile.mp4";
const PORTAL_BG_POSTER = "/images/services/portal/page-bg-poster.webp";

const PRICING_BG_DESKTOP = "/images/services/websites/pricing-bg.mp4?v=2";
const PRICING_BG_MOBILE = "/images/services/websites/pricing-bg-mobile.mp4?v=2";
const PRICING_BG_POSTER = "/images/services/websites/pricing-bg-poster.webp?v=2";

type PageBgProps = {
  desktop?: string;
  mobile?: string;
  poster?: string;
};

/** Full-bleed muted loop behind a service hero. */
export function WebsitePageBg({
  desktop = PAGE_BG_DESKTOP,
  mobile = PAGE_BG_MOBILE,
  poster = PAGE_BG_POSTER,
}: PageBgProps = {}) {
  const [src, setSrc] = useState(desktop);

  useEffect(() => {
    setSrc(pickLoopSrc(desktop, mobile));
  }, [desktop, mobile]);

  return (
    <div className="service-hero-bg pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0 origin-center scale-[1.2]"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.65) 52%, rgba(0,0,0,0.2) 70%, transparent 88%)",
          maskImage:
            "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.65) 52%, rgba(0,0,0,0.2) 70%, transparent 88%)",
        }}
      >
        <BgLoopVideo variant="hero" src={src} poster={poster} className="absolute inset-0" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 58% at 50% 30%, rgba(7,6,7,0.18) 0%, rgba(7,6,7,0.45) 48%, rgba(7,6,7,0.68) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,6,7,0) 0%, rgba(7,6,7,0.5) 25%, #070607 58%, #070607 100%)",
        }}
      />
    </div>
  );
}

export function AutomationPageBg() {
  return (
    <WebsitePageBg
      desktop={AUTOMATION_BG_DESKTOP}
      mobile={AUTOMATION_BG_MOBILE}
      poster={AUTOMATION_BG_POSTER}
    />
  );
}

export function PortalPageBg() {
  return (
    <WebsitePageBg
      desktop={PORTAL_BG_DESKTOP}
      mobile={PORTAL_BG_MOBILE}
      poster={PORTAL_BG_POSTER}
    />
  );
}

/** Muted loop inside the service pricing card. */
export function WebsitePricingBg() {
  const [src, setSrc] = useState(PRICING_BG_DESKTOP);

  useEffect(() => {
    setSrc(pickLoopSrc(PRICING_BG_DESKTOP, PRICING_BG_MOBILE));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <BgLoopVideo
        variant="form"
        src={src}
        poster={PRICING_BG_POSTER}
        className="absolute inset-0"
      />
    </div>
  );
}

type ExamplesProps = {
  title: string;
  lead: string;
  examples: Array<{ id: string; poster: string; src?: string }>;
  leadSource: CtaSource;
};

/** Full-bleed horizontal hover-reveal gallery of product demos. */
export function ServiceExamplesSection({
  title,
  lead,
  examples,
  leadSource,
}: ExamplesProps) {
  const { lang } = useLang();
  const { openLeadForm } = useLeadForm();
  const isRu = lang !== "en";

  const items: CardItem[] = useMemo(
    () =>
      examples.map((item, index) => ({
        id: item.id,
        title: String(index + 1).padStart(2, "0"),
        subtitle: "",
        imageUrl: item.poster,
        videoUrl: item.src,
        actionLabel: isRu ? "Заказать" : "Order",
        onAction: () => openLeadForm(leadSource),
      })),
    [examples, isRu, leadSource, openLeadForm]
  );

  return (
    <section className="bg-[#070607] pb-10 pt-8 sm:pb-14 sm:pt-12">
      <Container className="relative z-[1] pb-12 pt-4 sm:pb-14 sm:pt-6">
        <div className="max-w-[40rem] text-left">
          <h2 className="font-hero text-[clamp(1.45rem,3vw,2.1rem)] text-white">
            {title}
          </h2>
          <p className="mt-3 font-sans text-[15px] font-medium leading-7 text-white/60 sm:text-[16px]">
            {lead}
          </p>
        </div>
      </Container>

      <HoverRevealCards items={items} className="max-w-none" />
    </section>
  );
}

/** Landing demos for /sozdanie-sajtov */
export function WebsiteExamplesSection({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  return (
    <ServiceExamplesSection
      title={title}
      lead={lead}
      examples={WEBSITE_EXAMPLES}
      leadSource="service_websites"
    />
  );
}

/** MVP demos for /razrabotka-mvp */
export function MvpExamplesSection({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  return (
    <ServiceExamplesSection
      title={title}
      lead={lead}
      examples={MVP_EXAMPLES}
      leadSource="service_mvp"
    />
  );
}

/** Portal / cabinet demos for /razrabotka-lichnogo-kabineta */
export function PortalExamplesSection({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  return (
    <ServiceExamplesSection
      title={title}
      lead={lead}
      examples={MVP_EXAMPLES}
      leadSource="service_portal"
    />
  );
}

/** Automation demos for /avtomatizaciya-biznesa — MVP clips + project covers */
export function AutomationExamplesSection({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  return (
    <ServiceExamplesSection
      title={title}
      lead={lead}
      examples={AUTOMATION_EXAMPLES}
      leadSource="service_automation"
    />
  );
}
