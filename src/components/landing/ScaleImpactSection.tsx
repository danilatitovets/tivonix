import { Globe2 } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { landingCopy } from "../../i18n/landingCopy";
import TivonixGlobeCanvas from "./TivonixGlobeCanvas";

/** Chargeflow-style scale block — stats left, globe right, TIVONIX orange. */
export default function ScaleImpactSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang).scale;
  const pins = landingCopy(lang).audience.pins;

  return (
    <Section
      id="scale"
      className="scale-impact scroll-mt-[var(--tivonix-header-spacer)] !py-14 sm:!py-18 lg:!py-20"
    >
      <Container>
        <div className="scale-impact__grid">
          <Reveal className="scale-impact__copy">
            <p className="scale-impact__badge">
              <Globe2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              {copy.badge}
            </p>
            <h2 className="scale-impact__title">{copy.title}</h2>

            <ul className="scale-impact__stats">
              {copy.stats.map((stat) => (
                <li key={stat.label} className="scale-impact__stat">
                  <p className="scale-impact__stat-value">{stat.value}</p>
                  <p className="scale-impact__stat-label">{stat.label}</p>
                </li>
              ))}
            </ul>

            <p className="scale-impact__foot">{copy.foot}</p>
          </Reveal>

          <Reveal delay={80} className="scale-impact__visual">
            <div className="scale-impact__globe">
              <TivonixGlobeCanvas pins={pins} />
            </div>
            <div className="scale-impact__seal" aria-hidden>
              <span>{copy.seal}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
