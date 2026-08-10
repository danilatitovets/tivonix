import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { ctaClass } from "../leads/ctaStyles";
import { useLang } from "../../i18n/LangProvider";
import { pathForLang } from "../../lib/localePaths";
import { milesealCaseTeaser, publishedMilesealCases } from "../../data/milesealCases";

export default function MilesealCaseTeaser() {
  const { lang } = useLang();
  const cases = publishedMilesealCases();

  if (cases.length === 0) return null;

  return (
    <Section className="bg-black !py-12 sm:!py-16">
      <Container>
        <div className="space-y-6">
          {cases.map((entry, index) => {
            const copy = milesealCaseTeaser(entry, lang);
            return (
              <Reveal key={entry.slug} delay={index * 80}>
                <div className="overflow-hidden rounded-[24px] bg-[#0c0c0c] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
                  <span className="inline-flex items-center rounded-full bg-[rgba(255,138,30,0.16)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffae66]">
                    {copy.eyebrow}
                  </span>
                  <h2 className="mt-5 max-w-[36rem] font-hero text-[clamp(1.75rem,4.2vw,2.75rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance">
                    {copy.title}
                  </h2>
                  <p className="mt-4 max-w-[38rem] font-sans text-[15px] font-medium leading-[1.55] text-white/60 sm:text-[16px]">
                    {copy.description}
                  </p>
                  <div className="mt-7">
                    <Link to={pathForLang(entry.path, lang)} className={ctaClass("primary", "lg")}>
                      {copy.cta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
