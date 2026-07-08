import { Globe2, MapPin, Maximize2, type LucideIcon } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import TivonixGlobeCanvas from "./TivonixGlobeCanvas";
import AudienceMarquee from "./AudienceMarquee";

const PILLAR_ICONS: LucideIcon[] = [Globe2, MapPin, Maximize2];

export default function TivonixAudienceSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);

  return (
    <Section
      id="audience"
      className="tivonix-audience scroll-mt-[var(--tivonix-header-spacer)] bg-black !py-0"
    >
      <div className="tivonix-audience__frame">
        <Container className="relative z-[1] pt-14 sm:pt-16 lg:pt-20">
          <Reveal>
            <header className="tivonix-audience__head">
              <h2 className="tivonix-audience__title">{copy.audience.title}</h2>
              <p className="tivonix-audience__subtitle">{copy.audience.subtitle}</p>
            </header>
          </Reveal>

          <Reveal delay={80}>
            <div className="tivonix-audience__hero">
              <div className="tivonix-audience__globe-clip">
                <div className="tivonix-audience__globe-inner">
                  <TivonixGlobeCanvas pins={copy.audience.pins} />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>

        <Reveal delay={100}>
          <AudienceMarquee items={copy.audience.marquee} />
        </Reveal>

        <Reveal delay={120}>
          <div className="tivonix-audience__pillars-wrap">
            <Container>
              <div className="tivonix-audience__pillars">
                {copy.audience.pillars.map((pillar, index) => {
                  const Icon = PILLAR_ICONS[index] ?? Globe2;

                  return (
                    <article key={pillar.title} className="tivonix-audience__pillar">
                      <Icon className="tivonix-audience__pillar-icon" strokeWidth={1.5} aria-hidden />
                      <h3 className="tivonix-audience__pillar-title">{pillar.title}</h3>
                      <p className="tivonix-audience__pillar-text">{pillar.text}</p>
                    </article>
                  );
                })}
              </div>
            </Container>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
