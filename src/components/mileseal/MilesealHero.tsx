import Container from "../ui/Container";
import { ctaClass } from "../leads/ctaStyles";
import { useLang } from "../../i18n/LangProvider";
import { milesealCopy } from "../../i18n/milesealCopy";
import BgLoopVideo from "../ui/BgLoopVideo";

type Props = {
  onTryDemo: () => void;
  onRequestReview: () => void;
};

export default function MilesealHero({ onTryDemo, onRequestReview }: Props) {
  const { lang } = useLang();
  const copy = milesealCopy(lang).hero;

  return (
    <section className="relative isolate min-h-[min(88svh,880px)] overflow-hidden bg-black pt-[calc(var(--tivonix-header-spacer)+0.5rem)] pb-10 sm:pb-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden>
          <BgLoopVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_75%)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-[46rem] text-center">
          <span className="inline-flex items-center rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF9A3D] ring-1 ring-white/10">
            {copy.badge}
          </span>

          <h1 className="mt-6 font-hero text-[clamp(2.2rem,6.5vw,4.5rem)] font-normal uppercase leading-[0.92] tracking-[0.01em] text-white text-balance">
            {copy.title}
          </h1>

          <p className="mx-auto mt-5 max-w-[38rem] font-sans text-[15px] font-medium leading-[1.55] text-white/72 sm:mt-6 sm:text-[16px]">
            {copy.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <button type="button" onClick={onTryDemo} className={ctaClass("primary", "lg")}>
              {copy.tryDemo}
            </button>
            <button type="button" onClick={onRequestReview} className={ctaClass("secondary", "lg")}>
              {copy.requestReview}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
