import { AI_MODELS } from "../../lib/aiModels";

const MARQUEE_COPIES = 3;

/** Лента одинаковых блоков с логотипами — дублируется для бесконечного скролла. */
export default function AiLogoMarquee() {
  const items = Array.from({ length: MARQUEE_COPIES }, () => AI_MODELS).flat();

  return (
    <section className="ai-logo-marquee relative overflow-hidden bg-black py-6 sm:py-8" aria-hidden>
      <div className="ai-logo-marquee__track flex w-max gap-2.5 sm:gap-3">
        {items.map((model, index) => (
          <div
            key={`${model.id}-${index}`}
            className="ai-logo-marquee__cell flex shrink-0 items-center justify-center"
          >
            <img
              src={model.src}
              alt={model.name}
              className={[
                "ai-logo-img max-h-[60px] max-w-[112px] object-contain sm:max-h-[64px] sm:max-w-[124px]",
                model.brighten ? "ai-logo-img--bright" : "",
              ].join(" ")}
              style={{ transform: "scale(0.92)" }}
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
