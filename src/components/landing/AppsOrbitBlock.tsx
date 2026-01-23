// src/components/landing/AppsOrbitBlock.tsx
import React,
  {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
  } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang, type Lang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const IMG = "/images/gen.webp";
const TG_URL = "https://t.me/TIVONIX";
const EMAIL = "tivoonix@gmail.com";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

const appear = (on: boolean) =>
  cx(
    "will-change-[opacity,transform]",
    "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
  );

const delay = (ms: number): CSSProperties =>
  ({ ["transitionDelay" as any]: `${ms}ms` } as CSSProperties);

const COPY = {
  ru: {
    eyebrow: "SaaS • MVP • Лендинги",
    h: "Запустим ваш продукт быстрее",
    p: "UX/UI + фронтенд: от идеи до дизайна и вёрстки. Напишите 2–3 строки — вернусь с форматом, вилкой бюджета и следующими шагами.",
    pCompact:
      "UX/UI + фронтенд: от идеи до дизайна и вёрстки. Напишите 2–3 строки — отвечу с форматом и следующими шагами.",
    trust: "Отвечаю в течение дня • 15 минут созвона — бесплатно",
    tg: "Написать в Telegram",
    emailBtnLabel: "Открыть в Gmail",
    emailAria: "Открыть Gmail",
  },
  en: {
    eyebrow: "SaaS • MVP • Landing pages",
    h: "Launch your product faster",
    p: "UX/UI + frontend: from idea to design and build. Send 2–3 lines — I’ll reply with the best format, a rough budget range, and next steps.",
    pCompact:
      "UX/UI + frontend: from idea to design and build. Send 2–3 lines — I’ll reply with next steps.",
    trust: "I reply within a day • Free 15-min intro call",
    tg: "Write on Telegram",
    emailBtnLabel: "Open in Gmail",
    emailAria: "Open Gmail compose",
  },
} as const;

const HERO_STYLES = `
  .gmailBtn{
    border-radius:18px;
    border:1px solid rgba(255,255,255,0.25);
    background:rgba(0,0,0,0.35);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    transition:transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .gmailBtn:hover{
    transform:translateY(-1px);
    background:rgba(255,255,255,0.06);
    border-color:rgba(255,255,255,0.30);
  }
  .gmailBtn:active{ transform:translateY(0px); }

  .tgBtn{
    border-radius:18px;
    border:1px solid rgba(255,255,255,0.18);
    background:rgba(0,0,0,0.34);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    transition:transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .tgBtn:hover{
    transform:translateY(-1px);
    background:rgba(255,255,255,0.06);
    border-color:rgba(255,255,255,0.26);
  }
  .tgBtn:active{ transform:translateY(0px); }
`;

// Текст письма и тема — как в Hero
function buildMailBody(lang: Lang) {
  if (lang === "ru") {
    return (
      "Здравствуйте!\n\n" +
      "Хочу получить оценку разработки.\n\n" +
      "1) Что нужно сделать (1–2 предложения):\n- \n\n" +
      "2) Ключевые функции:\n- \n- \n- \n\n" +
      "3) Есть ли дизайн/ТЗ/прототип:\n- \n\n" +
      "4) Сроки / бюджет (если есть):\n- \n\n" +
      "Контакты для связи:\n- \n\n" +
      "Спасибо!"
    );
  }

  return (
    "Hi!\n\n" +
    "I'd like to get an estimate.\n\n" +
    "1) What we’re building (1–2 sentences):\n- \n\n" +
    "2) Key features:\n- \n- \n- \n\n" +
    "3) Do you have design/spec/prototype:\n- \n\n" +
    "4) Timeline / budget (if any):\n- \n\n" +
    "Contact details:\n- \n\n" +
    "Thank you!"
  );
}

function getSubject(lang: Lang) {
  return lang === "ru"
    ? "Запрос оценки с сайта TIVONIX"
    : "TIVONIX inquiry: estimate";
}

function buildGmailUrl(to: string, subject: string, body: string) {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

export default function AppsOrbitBlock() {
  const { lang } = useLang();
  const t = lang === "ru" ? COPY.ru : COPY.en;

  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(reducedMotion);

  const screenRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [mobileScale, setMobileScale] = useState(1);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const gmailUrl = useMemo(() => {
    const subject = getSubject(lang as Lang);
    const body = buildMailBody(lang as Lang);
    return buildGmailUrl(EMAIL, subject, body);
  }, [lang]);

  // Авто-подгон по высоте на мобилке
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;

    const compute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const screen = screenRef.current;
        const content = contentRef.current;
        if (!screen || !content) return;

        const isMobile = window.matchMedia("(max-width: 639px)").matches;

        if (!isMobile) {
          setMobileScale(1);
          setCompact(false);
          return;
        }

        setCompact(false);

        requestAnimationFrame(() => {
          const screen2 = screenRef.current;
          const content2 = contentRef.current;
          if (!screen2 || !content2) return;

          const H = screen2.clientHeight;
          const needed = content2.scrollHeight;
          const safety = 10;
          const ratio = (H - safety) / Math.max(1, needed);

          if (ratio >= 1) {
            setMobileScale(1);
            return;
          }

          if (ratio < 0.92) {
            setCompact(true);

            requestAnimationFrame(() => {
              const screen3 = screenRef.current;
              const content3 = contentRef.current;
              if (!screen3 || !content3) return;

              const H3 = screen3.clientHeight;
              const needed3 = content3.scrollHeight;
              const ratio3 = (H3 - safety) / Math.max(1, needed3);
              const s = Math.max(0.88, Math.min(1, ratio3));
              setMobileScale(s);
            });

            return;
          }

          const s = Math.max(0.92, Math.min(1, ratio));
          setMobileScale(s);
        });
      });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", compute);
    };
  }, [lang]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const screen = screenRef.current;
    const content = contentRef.current;
    if (!screen || !content) return;

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;

    const H = screen.clientHeight;
    const needed = content.scrollHeight;
    const safety = 10;
    const ratio = (H - safety) / Math.max(1, needed);

    if (ratio >= 1) setMobileScale(1);
    else setMobileScale(Math.max(0.88, Math.min(1, ratio)));
  }, [compact]);

  return (
    <Section className="bg-black py-10 sm:py-12 lg:py-14">
      {/* локальные стили для кнопок */}
      <style>{HERO_STYLES}</style>

      <Container>
        <div
          ref={rootRef}
          className={cx("mx-auto max-w-6xl", appear(visible))}
          style={delay(30)}
        >
          <div
            className={cx(
              "relative overflow-hidden rounded-[28px]",
              "border border-white/10",
              "bg-black"
            )}
            style={{ height: "clamp(680px, 145vw, 900px)" } as CSSProperties}
          >
            {/* Фон-фото */}
            <div className="absolute inset-0 z-0">
              <img
                src={IMG}
                alt=""
                draggable={false}
                width={1536}
                height={1024}
                decoding="async"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 42%" } as CSSProperties}
              />
            </div>

            {/* Область экрана ноута */}
            <div
              ref={screenRef}
              className={cx(
                "absolute z-10",
                "inset-[25%_6%_20%_6%]", // mobile
                "sm:inset-[28%_18%_26%_18%]" // desktop
              )}
            >
              <div className="flex h-full w-full items-center justify-center text-center">
                <div
                  ref={contentRef}
                  className="w-full max-w-[60ch] px-2 sm:px-0"
                  style={
                    {
                      transform:
                        mobileScale < 1 ? `scale(${mobileScale})` : undefined,
                      transformOrigin: "center center",
                    } as CSSProperties
                  }
                >
                  {/* только текст */}
                  <div className="px-1 sm:px-0">
                    <div className="text-[10.5px] sm:text-[13px] tracking-[0.22em] uppercase text-white/70">
                      {t.eyebrow}
                    </div>

                    <h2 className="mt-2.5 text-balance text-[20px] font-[850] leading-[1.06] tracking-[-0.02em] text-white sm:mt-4 sm:text-[40px]">
                      {t.h}
                    </h2>

                    <p className="mt-2.5 text-pretty text-[12.8px] leading-[1.55] text-white/80 sm:mt-4 sm:text-[16px] sm:leading-[1.6]">
                      {compact ? t.pCompact : t.p}
                    </p>

                    <div
                      className={cx(
                        "mt-2.5 text-[11.5px] text-white/60 sm:mt-4 sm:text-[12.5px]",
                        compact ? "hidden sm:block" : "block"
                      )}
                    >
                      {t.trust}
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                      {/* Gmail (левая кнопка) */}
                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t.emailAria}
                        className={cx(
                          "gmailBtn block w-full",
                          "px-6 py-[13px] sm:py-[16px]",
                          "text-center font-[750] tracking-[-0.01em]",
                          "text-[14.5px] sm:text-[16px]",
                          "text-white/92",
                          "transition active:translate-y-[1px]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        )}
                      >
                        {t.emailBtnLabel}
                      </a>

                      {/* Telegram (правая кнопка, оранжевая) */}
                      <a
                        href={TG_URL}
                        target="_blank"
                        rel="noreferrer"
                        className={cx(
                          "group relative block w-full",
                          "rounded-2xl px-6 py-[13px] sm:py-[16px]",
                          "text-center font-[750] tracking-[-0.01em]",
                          "text-[14.5px] sm:text-[16px]",
                          "text-black",
                          "shadow-[0_18px_70px_rgba(0,0,0,.55)]",
                          "transition active:translate-y-[1px]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        )}
                        style={{
                          background:
                            "linear-gradient(180deg, #FFB020 0%, #FF7A18 45%, #FF5A12 100%)",
                        }}
                      >
                        <span className="relative z-10">{t.tg}</span>
                        <span
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition duration-300 group-hover:opacity-70"
                          style={{
                            background:
                              "radial-gradient(700px 120px at 50% 30%, rgba(255,176,32,0.65), rgba(0,0,0,0))",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* тонкий внутренний ринг */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/8" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
