import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";

export default function TrustBarSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);

  return (
    <section
      aria-label={copy.trust.ariaLabel}
      className="border-y border-white/[0.06] bg-[#0a0a0a]"
    >
      <Container className="!py-0">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 sm:gap-x-10 sm:py-5 lg:justify-between lg:gap-x-4">
          {copy.trust.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[12.5px] leading-snug text-white/55 sm:text-[13.5px]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B2C]"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
