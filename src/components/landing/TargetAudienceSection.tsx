import {
  Building2,
  GraduationCap,
  Megaphone,
  Rocket,
  Scissors,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";

const AUDIENCE_ICONS: LucideIcon[] = [
  Scissors,
  Wrench,
  GraduationCap,
  UserRound,
  Rocket,
  Megaphone,
  Building2,
];

export default function TargetAudienceSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const lastIndex = copy.audience.items.length - 1;

  return (
    <Section
      id="audience"
      className="audience-section scroll-mt-[var(--tivonix-header-spacer)] border-t border-white/[0.06] py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal>
          <header className="audience-section__head">
            <h2 className="font-hero text-[clamp(1.85rem,4.2vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              {copy.audience.title}
            </h2>
          </header>
        </Reveal>

        <Reveal delay={80} className="audience-grid mt-10 sm:mt-12">
          {copy.audience.items.map((item, index) => {
            const Icon = AUDIENCE_ICONS[index] ?? Building2;

            return (
              <article
                key={item.title}
                className={[
                  "audience-card",
                  index === lastIndex ? "audience-card--tail" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="audience-card__visual" aria-hidden>
                  <div className="audience-card__glow" />
                  <Icon className="audience-card__hero-icon" strokeWidth={1.35} />
                </div>

                <div className="audience-card__body">
                  <div className="audience-card__label">
                    <Icon className="audience-card__label-icon" strokeWidth={1.75} aria-hidden />
                    <h3 className="audience-card__title">{item.title}</h3>
                  </div>
                  <p className="audience-card__desc">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
